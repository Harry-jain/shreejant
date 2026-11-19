import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Move mouse to (300, 300)
  await page.mouse.move(300, 300);
  await page.waitForTimeout(500);

  const pos1 = await page.evaluate(() => {
    const el = document.querySelector('div[style*="radial-gradient"][style*="translate3d"]');
    return el ? window.getComputedStyle(el).transform : null;
  });

  // Move mouse to (1000, 450)
  await page.mouse.move(1000, 450);
  await page.waitForTimeout(500);

  const pos2 = await page.evaluate(() => {
    const el = document.querySelector('div[style*="radial-gradient"][style*="translate3d"]');
    return el ? window.getComputedStyle(el).transform : null;
  });

  console.log('Spotlight at (300, 300):', pos1);
  console.log('Spotlight at (1000, 450):', pos2);

  await browser.close();
}

main().catch(console.error);
