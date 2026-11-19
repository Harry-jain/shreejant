import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Inspect hero section elements
  const info = await page.evaluate(() => {
    const hero = document.querySelector('section');
    if (!hero) return { error: 'No hero found' };

    const layers = Array.from(hero.children).map((child, i) => {
      const style = window.getComputedStyle(child);
      return {
        index: i,
        tag: child.tagName,
        className: child.className,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        width: style.width,
        height: style.height,
        transform: style.transform,
        backgroundImage: style.backgroundImage ? style.backgroundImage.substring(0, 100) : 'none',
      };
    });

    const goldLine = document.querySelector('span[style*="heroGoldDrawLine"], span[style*="scaleX"]');
    const goldLineStyle = goldLine ? window.getComputedStyle(goldLine) : null;

    return {
      layers,
      goldLine: goldLineStyle ? {
        display: goldLineStyle.display,
        width: goldLineStyle.width,
        height: goldLineStyle.height,
        backgroundColor: goldLineStyle.backgroundColor,
        transform: goldLineStyle.transform,
        opacity: goldLineStyle.opacity,
      } : 'Not found',
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

main().catch(console.error);
