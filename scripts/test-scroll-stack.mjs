import { chromium } from '@playwright/test';
import fs from 'node:fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. Capture Hero Section with subtle glow
  const heroEl = page.locator('section').first();
  await heroEl.screenshot({ path: '.taste-skill/after/hero-subtle-1440.png' });
  fs.copyFileSync(
    '.taste-skill/after/hero-subtle-1440.png',
    'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/hero-subtle-1440.png'
  );

  // 2. Locate #demos section
  const section = page.locator('#demos');
  const sectionBox = await section.boundingBox();
  console.log('Section bounding box:', sectionBox);

  if (!sectionBox) throw new Error('Section #demos not found');

  // Scroll down to where #demos docks (start of demos)
  const startScrollY = sectionBox.y + 10;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), startScrollY);
  await page.waitForTimeout(600);

  const activeNumber1 = await page.evaluate(() => {
    const activeBadge = document.querySelector('button[aria-label*="Jump to demo"] span[class*="text-[var(--cinema-accent)]"]');
    return activeBadge ? activeBadge.textContent.trim() : null;
  });
  console.log('Active number at start:', activeNumber1);

  await page.screenshot({ path: '.taste-skill/after/stack-scroll-pos1.png' });
  fs.copyFileSync(
    '.taste-skill/after/stack-scroll-pos1.png',
    'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/stack-scroll-pos1.png'
  );

  // Scroll down by 600px
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), startScrollY + 600);
  await page.waitForTimeout(600);

  const activeNumber2 = await page.evaluate(() => {
    const activeBadge = document.querySelector('button[aria-label*="Jump to demo"] span[class*="text-[var(--cinema-accent)]"]');
    return activeBadge ? activeBadge.textContent.trim() : null;
  });
  console.log('Active number after 600px scroll:', activeNumber2);

  await page.screenshot({ path: '.taste-skill/after/stack-scroll-pos2.png' });
  fs.copyFileSync(
    '.taste-skill/after/stack-scroll-pos2.png',
    'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/stack-scroll-pos2.png'
  );

  // Scroll down by 1400px
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), startScrollY + 1400);
  await page.waitForTimeout(600);

  const activeNumber3 = await page.evaluate(() => {
    const activeBadge = document.querySelector('button[aria-label*="Jump to demo"] span[class*="text-[var(--cinema-accent)]"]');
    return activeBadge ? activeBadge.textContent.trim() : null;
  });
  console.log('Active number after 1400px scroll:', activeNumber3);

  await page.screenshot({ path: '.taste-skill/after/stack-scroll-pos3.png' });
  fs.copyFileSync(
    '.taste-skill/after/stack-scroll-pos3.png',
    'C:/Users/AKSHAY/.gemini/antigravity/brain/eb821ca1-829e-42f2-a516-784e54289d3a/stack-scroll-pos3.png'
  );

  await browser.close();
  console.log('All scroll stack tests completed!');
}

main().catch(console.error);
