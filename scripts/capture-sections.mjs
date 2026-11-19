import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Capture Hero Section
  const heroEl = page.locator('section').first();
  await heroEl.screenshot({ path: '.taste-skill/after/hero-1440.png' });
  fs.copyFileSync('.taste-skill/after/hero-1440.png', 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/hero-1440.png');

  // Capture Demo Stack Section with scroll offset for fixed navbar
  await page.evaluate(() => {
    const el = document.getElementById('demos');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.taste-skill/after/demo-stack-1440.png', fullPage: false });
  fs.copyFileSync('.taste-skill/after/demo-stack-1440.png', 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/demo-stack-1440.png');

  // Mobile 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const heroMobile = page.locator('section').first();
  await heroMobile.screenshot({ path: '.taste-skill/after/hero-390.png' });
  fs.copyFileSync('.taste-skill/after/hero-390.png', 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/hero-390.png');

  const demoMobile = page.locator('#demos');
  await demoMobile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await demoMobile.screenshot({ path: '.taste-skill/after/demo-stack-390.png' });
  fs.copyFileSync('.taste-skill/after/demo-stack-390.png', 'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/demo-stack-390.png');

  await browser.close();
  console.log('Successfully captured section screenshots!');
}

main().catch(console.error);
