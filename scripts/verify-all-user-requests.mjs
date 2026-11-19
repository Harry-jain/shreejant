import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Home Page Verification
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Capture Hero Section (Underline + TrustBar with no 4 KPI boxes)
  const heroSection = page.locator('section').first();
  await heroSection.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/hero-underline-1440.png'
  });
  console.log('Saved hero-underline-1440.png');

  // TrustBar (only 3 pillars, no 50+, 7-10d, 4.2Cr, 99.98%)
  const trustBar = page.locator('section:has-text("Serving Pan-India")').first();
  await trustBar.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await trustBar.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/trustbar-3pillars-1440.png'
  });
  console.log('Saved trustbar-3pillars-1440.png');

  // Spotlight Banner Interactive Highlights
  const spotlight = page.locator('section:has-text("THE 10-DAY DIGITAL FLAGSHIP COMMITMENT")').first();
  await spotlight.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Default state (Day 10 active)
  await spotlight.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/spotlight-day10-active-1440.png'
  });
  console.log('Saved spotlight-day10-active-1440.png');

  // Click Day 1-3
  await spotlight.locator('button:has-text("Day 1 – 3")').click();
  await page.waitForTimeout(500);
  await spotlight.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/spotlight-day1-active-1440.png'
  });
  console.log('Saved spotlight-day1-active-1440.png');

  // Click Day 7-9 (WhatsApp automation)
  await spotlight.locator('button:has-text("Day 7 – 9")').click();
  await page.waitForTimeout(500);
  await spotlight.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/spotlight-day7-active-1440.png'
  });
  console.log('Saved spotlight-day7-active-1440.png');

  // Demo Stack Showcase (Enlarged browser + clean cards with no floating inform)
  const demos = page.locator('#demos').first();
  await demos.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await demos.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/demo-stack-large-clean-1440.png'
  });
  console.log('Saved demo-stack-large-clean-1440.png');

  // 2. Blog Page Verification (/blog)
  await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const blogHero = page.locator('section').first();
  await blogHero.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/blog-header-violet-1440.png'
  });
  console.log('Saved blog-header-violet-1440.png');

  // 3. Services Page Verification (/services)
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const servicesHero = page.locator('section').first();
  await servicesHero.screenshot({
    path: 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/services-page-violet-1440.png'
  });
  console.log('Saved services-page-violet-1440.png');

  await browser.close();
}

main().catch(console.error);
