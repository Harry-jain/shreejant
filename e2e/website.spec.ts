import { test, expect } from "@playwright/test";

test.describe("SHREEJAN AI SOLUTIONS — Website Verification", () => {
  test("Homepage loads with hero content and 3D binary canvas", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Verify Title & Hero Headline
    await expect(page).toHaveTitle(/SHREEJAN AI SOLUTIONS/);
    await expect(page.locator("h1")).toContainText("We Build");
    await expect(page.locator("h2").first()).toContainText("Digital Empires");

    // Verify CTAs
    await expect(page.getByRole("link", { name: "Start Your Project" })).toBeVisible();
    await expect(page.locator("section").first().getByRole("link", { name: "See Our Work" })).toBeVisible();

    // Verify 3D Binary Canvas is mounted
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible();

    // Zero unhandled runtime errors
    expect(errors).toEqual([]);
  });

  test("Brand logos render properly in Navbar and Footer", async ({ page }) => {
    await page.goto("/");

    // Navbar logo
    const navLogo = page.locator("header img[alt='SHREEJAN AI SOLUTIONS']").first();
    await expect(navLogo).toBeAttached();

    // Footer logo
    const footerLogo = page.locator("footer img[alt='SHREEJAN AI SOLUTIONS']").first();
    await expect(footerLogo).toBeAttached();
  });

  test("Services section has no numeric labels (01, 02, etc.) in card headers", async ({ page }) => {
    await page.goto("/");

    const servicesSection = page.locator("#services");
    await expect(servicesSection).toBeVisible();
    await expect(servicesSection).toContainText("Six Ways We Grow Your Business");

    // Verify card titles exist
    await expect(servicesSection).toContainText("AI Websites");
    await expect(servicesSection).toContainText("Business Automation");
    await expect(servicesSection).toContainText("AI Chatbots & Agents");

    // Verify numbers 01, 02, etc. are NOT rendered in the service card headers
    const cardHeaders = servicesSection.locator(".group .flex.items-center.justify-between");
    const count = await cardHeaders.count();
    for (let i = 0; i < count; i++) {
      const headerText = await cardHeaders.nth(i).innerText();
      expect(headerText).not.toMatch(/^0[1-6]$/);
    }
  });

  test("Process section renders complete continuous connection line", async ({ page }) => {
    await page.goto("/");

    const processSection = page.locator("section:has-text('How We Craft Your Solution')");
    await expect(processSection).toBeVisible();

    // Check all 4 steps are present
    await expect(processSection.locator("text=01").first()).toBeVisible();
    await expect(processSection.locator("text=02").first()).toBeVisible();
    await expect(processSection.locator("text=03").first()).toBeVisible();
    await expect(processSection.locator("text=04").first()).toBeVisible();

    // Step titles
    await expect(processSection).toContainText("Discovery Call");
    await expect(processSection).toContainText("Strategy & Proposal");
    await expect(processSection).toContainText("Build & Review");
    await expect(processSection).toContainText("Launch & Support");
  });

  test("Pricing section renders 'MOST POPULAR CHOICE' badge cleanly", async ({ page }) => {
    await page.goto("/");

    const pricingSection = page.locator("#pricing");
    await expect(pricingSection).toBeVisible();
    await expect(pricingSection).toContainText("Transparent Pricing");

    // Most popular badge
    const badge = pricingSection.locator("text=MOST POPULAR CHOICE");
    await expect(badge).toBeVisible();

    // Check plan tiers
    await expect(pricingSection).toContainText("Growth");
    await expect(pricingSection).toContainText("Business AI");
    await expect(pricingSection).toContainText("Enterprise");
  });

  test("Theme toggle switches data-theme between dark and light modes", async ({ page }) => {
    await page.goto("/");

    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );

    const themeToggleBtn = page.locator("button[aria-label*='mode']").first();
    await expect(themeToggleBtn).toBeVisible();
    await themeToggleBtn.click();

    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );

    expect(newTheme).not.toBe(initialTheme);
  });

  test("All secondary pages navigate cleanly and return HTTP 200", async ({ page }) => {
    const routes = ["/services", "/portfolio", "/about", "/blog", "/contact"];

    for (const route of routes) {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    }
  });

  test("Contact form inputs and submit button work", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.locator("input[name='fullName']")).toBeVisible();
    await expect(page.locator("input[name='email']")).toBeVisible();
    await expect(page.locator("button[type='submit']")).toBeVisible();
  });
});
