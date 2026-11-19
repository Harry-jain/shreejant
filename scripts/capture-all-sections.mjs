import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'screenshots-verification');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({
    executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  console.log('1. Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Hero Marquee Cards
  console.log('Capturing 1. Hero Marquee Cards...');
  // Scroll to hero bottom
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: path.join(OUT_DIR, '1-hero-marquee-after.png'),
    clip: { x: 0, y: 320, width: 1440, height: 600 }
  });
  console.log('Saved 1-hero-marquee-after.png');

  // 2. Spotlight Banner ("Your store, live in 10 days")
  console.log('Capturing 2. Spotlight Banner...');
  const bannerY = await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'Your Store, Live in')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) {
      const rect = el.closest('section').getBoundingClientRect();
      return window.scrollY + rect.top;
    }
    return 1000;
  });
  await page.evaluate((y) => window.scrollTo(0, y - 60), bannerY);
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: path.join(OUT_DIR, '2-spotlight-banner-after.png'),
    clip: { x: 0, y: 0, width: 1440, height: 800 }
  });
  console.log('Saved 2-spotlight-banner-after.png');

  // 3. Interactive Architecture Prototypes
  console.log('Capturing 3. Architecture Prototypes...');
  const demosY = await page.evaluate(() => {
    const el = document.getElementById('demos');
    if (el) {
      const rect = el.getBoundingClientRect();
      return window.scrollY + rect.top;
    }
    return 1700;
  });
  await page.evaluate((y) => window.scrollTo(0, y - 40), demosY);
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: path.join(OUT_DIR, '3-architecture-prototypes-after.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });
  console.log('Saved 3-architecture-prototypes-after.png');

  // 4. About Us (Founders)
  console.log('4. Navigating to http://localhost:3000/about...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const leadershipY = await page.evaluate(() => {
    const el = document.getElementById('leadership');
    if (el) {
      const rect = el.getBoundingClientRect();
      return window.scrollY + rect.top;
    }
    return 400;
  });
  await page.evaluate((y) => window.scrollTo(0, y - 50), leadershipY);
  await page.waitForTimeout(1000);
  await page.screenshot({ 
    path: path.join(OUT_DIR, '4-about-us-after.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 }
  });
  console.log('Saved 4-about-us-after.png');

  // 5. Contact Form
  console.log('5. Navigating to http://localhost:3000/contact...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: path.join(OUT_DIR, '5-contact-form-after.png'),
    clip: { x: 0, y: 80, width: 1440, height: 820 }
  });
  console.log('Saved 5-contact-form-after.png');

  console.log('SUCCESS: All 5 sections successfully captured!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
