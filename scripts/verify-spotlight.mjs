import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page1440.waitForTimeout(1000);

  // Scroll to SpotlightBanner
  const spotlight = page1440.locator('text=Your Store, Live in').first();
  await spotlight.scrollIntoViewIfNeeded();
  await page1440.waitForTimeout(800);

  // Capture spotlight section
  const section = page1440.locator('section:has-text("THE 10-DAY DIGITAL FLAGSHIP COMMITMENT")').first();
  await section.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/spotlight-banner-1440.png'
  });
  console.log('Saved spotlight-banner-1440.png');

  // Also scroll to DemoStackShowcase to verify numbers on left and no bottom buttons
  const demoStack = page1440.locator('#demos').first();
  await demoStack.scrollIntoViewIfNeeded();
  await page1440.waitForTimeout(600);
  await demoStack.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/demo-stack-verified-1440.png'
  });
  console.log('Saved demo-stack-verified-1440.png');

  // 2. Mobile 390x844
  const page390 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page390.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page390.waitForTimeout(1000);

  const spotlight390 = page390.locator('text=Your Store, Live in').first();
  await spotlight390.scrollIntoViewIfNeeded();
  await page390.waitForTimeout(800);

  const section390 = page390.locator('section:has-text("THE 10-DAY DIGITAL FLAGSHIP COMMITMENT")').first();
  await section390.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/spotlight-banner-390.png'
  });
  console.log('Saved spotlight-banner-390.png');

  await browser.close();
}

main().catch(console.error);
