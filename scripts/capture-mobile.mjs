import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'screenshots-verification', 'mobile');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function captureMobile() {
  const browser = await chromium.launch({
    executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });

  const page = await context.newPage();

  console.log('Mobile Home...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Hero marquee
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'm-1-hero-marquee.png') });

  // 2. Spotlight banner
  const bannerY = await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(., 'Your Store, Live in')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return el ? window.scrollY + el.closest('section').getBoundingClientRect().top : 1200;
  });
  await page.evaluate((y) => window.scrollTo(0, y - 40), bannerY);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'm-2-spotlight-banner.png') });

  // 3. Prototypes
  const demosY = await page.evaluate(() => {
    const el = document.getElementById('demos');
    return el ? window.scrollY + el.getBoundingClientRect().top : 1800;
  });
  await page.evaluate((y) => window.scrollTo(0, y - 30), demosY);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'm-3-prototypes.png') });

  // 4. About Us
  console.log('Mobile About...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const leadY = await page.evaluate(() => {
    const el = document.getElementById('leadership');
    return el ? window.scrollY + el.getBoundingClientRect().top : 400;
  });
  await page.evaluate((y) => window.scrollTo(0, y - 30), leadY);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'm-4-about-us.png') });

  // 5. Contact Form
  console.log('Mobile Contact...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'm-5-contact-form.png') });

  console.log('Mobile screenshots captured successfully!');
  await browser.close();
}

captureMobile().catch(console.error);

