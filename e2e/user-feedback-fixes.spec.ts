import { test, expect } from "@playwright/test";

test.describe("User Feedback Fixes & Quality Audits", () => {
  test("1. Language Switcher: High contrast, non-white text, dynamic translations", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");

    // Locate language switcher by testid
    const langSwitcher = page.locator("[data-testid='language-switcher']").first();
    await expect(langSwitcher).toBeVisible();

    // Verify all 3 options exist
    const enBtn = langSwitcher.getByRole("button", { name: "EN" });
    const hiBtn = langSwitcher.getByRole("button", { name: "हिं" });
    const mrBtn = langSwitcher.getByRole("button", { name: "मरा" });

    await expect(enBtn).toBeVisible();
    await expect(hiBtn).toBeVisible();
    await expect(mrBtn).toBeVisible();

    // Verify EN is active by default
    await expect(enBtn).toHaveAttribute("aria-pressed", "true");

    // Click Hindi ('हिं')
    await hiBtn.click();
    await page.waitForTimeout(300);
    await expect(hiBtn).toHaveAttribute("aria-pressed", "true");
    await expect(enBtn).toHaveAttribute("aria-pressed", "false");

    // Click Marathi ('मरा')
    await mrBtn.click();
    await page.waitForTimeout(300);
    await expect(mrBtn).toHaveAttribute("aria-pressed", "true");
    await expect(hiBtn).toHaveAttribute("aria-pressed", "false");

    // Switch back to English
    await enBtn.click();
    await page.waitForTimeout(300);
    await expect(enBtn).toHaveAttribute("aria-pressed", "true");

    expect(errors).toEqual([]);
  });

  test("2. Services Page: Ratnavali Luxury Jewels (Violet & White) in AI Websites & Custom Web Apps Vault", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/services");

    // Locate AI Websites Card
    const aiCard = page.locator("#ai-websites");
    await expect(aiCard).toBeVisible();

    // Verify front side is visible first
    await expect(aiCard.getByRole("heading", { name: "AI Websites" })).toBeVisible();

    // Hover over AI Websites Card
    await aiCard.hover();
    await page.waitForTimeout(700); // Allow spring rotation animation to settle

    // Assert Mac-style browser mockup is visible on the back with Ratnavali Luxury Jewels in violet/white
    await expect(aiCard.locator("text=https://ratnavali-jewels.com")).toBeVisible();
    await expect(aiCard.locator("text=0.8s LCP")).toBeVisible();
    await expect(aiCard.getByText("RATNAVALI", { exact: true })).toBeVisible();
    await expect(aiCard.locator("text=Imperial Polki & Certified Natural Solitaires")).toBeVisible();

    // Test clicking a featured jewelry piece
    const pieceBtn = aiCard.getByRole("button", { name: /The Koh-i-Noor|Rare Solitaire/i }).first();
    if (await pieceBtn.isVisible()) {
      await pieceBtn.click();
      await page.waitForTimeout(200);
      await expect(aiCard.locator("text=4.1ct D-Flawless Natural Diamond")).toBeVisible();
    }

    // Move cursor away to test un-hover flip back
    await page.mouse.move(0, 0);
    await page.waitForTimeout(700);

    // Front side should be visible again
    await expect(aiCard.getByRole("heading", { name: "AI Websites" })).toBeVisible();

    // Locate Custom Web Apps Card
    const appsCard = page.locator("#custom-web-apps");
    await expect(appsCard).toBeVisible();
    await expect(appsCard.getByRole("heading", { name: "Custom Web Apps" })).toBeVisible();

    // Hover over Custom Web Apps Card
    await appsCard.hover();
    await page.waitForTimeout(700);

    // Assert Mac browser mockup on Ratnavali Vault & Logistics in violet/white
    await expect(appsCard.locator("text=https://vault.ratnavali-jewels.com/logistics")).toBeVisible();
    await expect(appsCard.locator("text=RBAC LEVEL-4")).toBeVisible();
    await expect(appsCard.locator("text=Armored Vault Logistics & VIP Clientele Monitor")).toBeVisible();
    await expect(appsCard.locator("text=1,420 Clients")).toBeVisible();

    // Click Dispatch Transit simulation
    const dispatchBtn = appsCard.getByRole("button", { name: /Dispatch Transit/i });
    if (await dispatchBtn.isVisible()) {
      await dispatchBtn.click();
      await page.waitForTimeout(900);
      await expect(appsCard.locator("text=Jaipur Gem Atelier")).toBeVisible();
    }

    expect(errors).toEqual([]);
  });

  test("3. Contact Form: Only 2 services (no AI Automation Pipeline), Asset Pack pre-selection", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    // Navigate to contact with pre-selected plan and addon
    await page.goto("/contact?plan=growth&addon=complete-asset-pack");

    // Verify step 1 heading
    await expect(page.locator("h3:has-text('Select Architecture & Tier')")).toBeVisible();

    // Assert exactly 2 service cards are present
    const serviceButtons = page.locator("button:has(span:text-is('Digital Flagship')), button:has(span:text-is('Bespoke Full-Stack'))");
    await expect(serviceButtons).toHaveCount(2);

    // Verify AI Automation Pipeline is NOT present
    await expect(page.locator("text=AI Automation Pipeline")).not.toBeVisible();

    // Verify Asset Pack option button is present
    await expect(page.getByRole("button", { name: /Complete Asset Pack/i })).toBeVisible();

    // Verify dynamic investment ribbon includes the complete asset pack calculation
    const summaryRibbon = page.locator("[data-testid='investment-ribbon']");
    await expect(summaryRibbon).toBeVisible();
    await expect(summaryRibbon).toContainText("Growth Flagship");
    await expect(summaryRibbon).toContainText("Complete Asset Pack");
    await expect(summaryRibbon).toContainText("₹35,998"); // 27,999 + 7,999

    // Verify Micro-trust badges
    await expect(page.locator("text=100% NDA & Confidentiality")).toBeVisible();
    await expect(page.locator("text=Guaranteed 4-Hour Response SLA")).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("4. Pricing Page: Asset Packs Showcase and localization", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/pricing");

    // Verify Pricing Cards appear near top
    await expect(page.getByRole("heading", { name: "Starter" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Growth" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Business" }).first()).toBeVisible();

    // Verify Asset Packs Section
    await expect(page.locator("text=Basic Digital Asset Pack")).toBeVisible();
    await expect(page.locator("text=Complete Brand & Local SEO Pack")).toBeVisible();

    // Verify color swatches
    await expect(page.locator("text=#8A6214").first()).toBeVisible();
    await expect(page.locator("text=#0A1628").first()).toBeVisible();

    // Verify Google Business Profile preview card
    await expect(page.locator("text=Google Business Profile Optimization")).toBeVisible();
    await expect(page.locator("text=Top 3 Map Pack")).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("5. About Us Page: Leadership Team Names (Ankit Vishwakarma, Harsh Jain, Akshay Jankar)", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/about");

    // Verify the three leadership members
    await expect(page.locator("text=Ankit Vishwakarma")).toBeVisible();
    await expect(page.locator("text=Harsh Jain")).toBeVisible();
    await expect(page.locator("text=Akshay Jankar")).toBeVisible();

    expect(errors).toEqual([]);
  });
});
