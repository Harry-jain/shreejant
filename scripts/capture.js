const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 850 } });

  // 1. Hero Section (Instant load, solid gleaming AI Neural Nexus)
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "screenshot-hero-light.png" });

  // 2. Services Section (Focused on Websites & Custom Web Apps)
  const services = page.locator("#services");
  await services.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "screenshot-services.png" });

  // 3. Process Section (Continuous unbroken line)
  const process = page.locator("section:has-text('How We Craft Your Solution')");
  await process.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "screenshot-process.png" });

  // 4. Footer Section (Only active services: Websites & Custom Web Apps)
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "screenshot-footer.png" });

  await browser.close();
  console.log("All screenshots captured successfully!");
})();
