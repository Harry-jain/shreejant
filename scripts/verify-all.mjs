import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  // 1. Visit homepage
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 2. Capture CTASection (Got an Ambitious Vision)
  const cta = page.locator('section:has-text("Got an Ambitious Vision?")');
  if (await cta.count() > 0) {
    await cta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await cta.screenshot({ path: 'public/test-cta-hq.png' });
    console.log('1. Captured public/test-cta-hq.png');
  }

  // 3. Capture Footer (Taste skill wordmark)
  const footer = page.locator('footer');
  if (await footer.count() > 0) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await footer.screenshot({ path: 'public/test-footer-taste.png' });
    console.log('2. Captured public/test-footer-taste.png');
  }

  // 4. Capture About page leadership header (logo on right of text)
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const leadership = page.locator('#leadership');
  if (await leadership.count() > 0) {
    await leadership.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await leadership.screenshot({ path: 'public/test-about-side-by-side.png' });
    console.log('3. Captured public/test-about-side-by-side.png');
  }

  await browser.close();
})();
