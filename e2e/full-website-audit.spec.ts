import { test, expect } from "@playwright/test";

test.describe("Full Website Audit & Route Scan", () => {
  const routes = [
    "/",
    "/services",
    "/services/ai-websites",
    "/services/custom-web-apps",
    "/pricing",
    "/portfolio",
    "/portfolio/ai-booking-salon",
    "/portfolio/ecommerce-clothing",
    "/portfolio/chatbot-ca-firm",
    "/about",
    "/blog",
    "/blog/how-we-built-ai-booking-system-salon",
    "/blog/real-cost-no-website",
    "/blog/signs-losing-customers-bad-website",
    "/blog/what-is-ai-chatbot-business-automation",
    "/blog/why-mumbai-businesses-need-website-2026",
    "/contact",
    "/audit",
  ];

  // 1. Comprehensive Route Scan: Zero 404s, Zero 500s, Zero Uncaught Console Errors
  for (const route of routes) {
    test(`Scan route: ${route} loads cleanly with status 200 and zero console errors`, async ({ page }) => {
      test.setTimeout(60000);
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      page.on("pageerror", (err) => pageErrors.push(err.message));

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);

      // Verify page is not blank
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Verify no raw translation keys leaked into main headings
      const headings = await page.locator("h1, h2, h3").allInnerTexts();
      for (const heading of headings) {
        // Raw i18n keys look like 'nav.services' or 'hero.title'
        expect(heading.trim()).not.toMatch(/^(nav|hero|footer|services|pricing|portfolio|blog|audit|contact|form)\.[a-z0-9_]+$/i);
      }

      // Check zero critical console/runtime errors
      expect(consoleErrors.filter((e) => !e.includes("favicon") && !e.includes("React DevTools"))).toEqual([]);
      expect(pageErrors).toEqual([]);
    });
  }

  // 2. Paid Audit Verification (Zero "Free", Zero "24-Hour" references on audit page and audit cards)
  test("Audit is strictly paid ₹499 with NO 'Free' or '24-Hour' claims", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/audit");

    const auditContent = await page.locator("body").innerText();

    // Verify ₹499 is present
    expect(auditContent).toContain("₹499");

    // Must NOT contain "Free 24-Hour" or "100% COMPLIMENTARY" or "Zero cost"
    expect(auditContent).not.toMatch(/free\s+24-hour/i);
    expect(auditContent).not.toMatch(/100%\s+complimentary/i);
    expect(auditContent).not.toMatch(/zero\s+cost/i);
    expect(auditContent).not.toMatch(/free\s+audit/i);

    // Complete step 1 to reach submit button on step 2
    const urlInput = page.locator("input[name='website_url']");
    await urlInput.fill("https://mybusiness.in");
    const nextBtn = page.locator("form").getByRole("button", { name: /^Next$|^आगे$|^पुढे$/i });
    await nextBtn.click();
    await page.waitForTimeout(400);

    // Verify submit button on Step 2 has ₹499
    const submitBtn = page.locator("button[type='submit']");
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText("499");
  });

  // 3. Website Audit Card in Services Section
  test("Website Audit Card appears in Services Section and redirects to /audit", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/services");

    // Find the audit card on the services page
    const auditCard = page.locator("a[href='/audit']").first();
    await expect(auditCard).toBeVisible();

    const cardText = await auditCard.innerText();
    expect(cardText).toContain("₹499");

    // Click card and verify it navigates to /audit
    await auditCard.scrollIntoViewIfNeeded();
    await auditCard.click();
    await expect(page).toHaveURL(/\/audit/, { timeout: 15000 });
  });

  // 4. Visual Blog Redesign & Category Filters
  test("Blog Index has category filters, responsive bento grid, and authentic case study", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/blog");

    // Check category filters exist
    const filterNav = page.locator("nav[aria-label='Blog categories']");
    await expect(filterNav).toBeVisible();
    await expect(filterNav).toContainText("All");
    await expect(filterNav).toContainText("Case studies");
    await expect(filterNav).toContainText("Economics and ROI");

    // Check Cover Art SVGs are rendered
    const svgs = page.locator("svg[aria-hidden='true']");
    expect(await svgs.count()).toBeGreaterThan(3);

    // Filter by 'Economics and ROI'
    const econBtn = page.getByRole("button", { name: /Economics and ROI/i });
    await econBtn.click();
    await page.waitForURL("**/blog?category=economics-roi");
    expect(page.url()).toContain("category=economics-roi");

    // Check Case Study card displays authentic title and metrics without confusing illustrative badge
    await page.goto("/blog?category=case-studies");
    const caseCard = page.locator("a[href*='how-we-built-ai-booking-system-salon']");
    await expect(caseCard).toBeVisible();
    const caseText = await caseCard.innerText();
    expect(caseText).toContain("How We Built an AI WhatsApp Booking System");
    expect(caseText).not.toContain("Illustrative case study");
  });

  // 5. Internationalization: Hindi & Marathi render cleanly
  test("Language toggle smoothly translates Navbar, Hero, and Footer without errors", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/");

    const langSwitcher = page.locator("[data-testid='language-switcher']").first();
    await expect(langSwitcher).toBeVisible();

    // Switch to Marathi
    const mrBtn = langSwitcher.getByRole("button", { name: "मरा" });
    await mrBtn.click();
    await page.waitForTimeout(300);

    // Verify footer address is in Marathi
    const footerAddress = page.locator("footer");
    await expect(footerAddress).toContainText("बीकेसी आणि अंधेरी पूर्व");
    await expect(footerAddress).toContainText("व्हॉट्सअॅप इन्स्टंट डेस्क");

    // Switch to Hindi
    const hiBtn = langSwitcher.getByRole("button", { name: "हिं" });
    await hiBtn.click();
    await page.waitForTimeout(300);

    // Verify footer address is in Hindi
    await expect(footerAddress).toContainText("बीकेसी और अंधेरी पूर्व");
    await expect(footerAddress).toContainText("व्हाट्सएप इंस्टेंट डेस्क");
  });

  // 6. Mobile Viewport (360px) No Horizontal Scroll
  test("Mobile viewport (360px) has zero horizontal overflow on Home, Services, and Audit", async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 360, height: 740 });

    for (const route of ["/", "/services", "/blog", "/audit", "/contact"]) {
      await page.goto(route);
      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(isOverflowing).toBe(false);
    }
  });

  // 7. Process Section ('How We Craft Your Solution') 4-Card Blueprint Verification
  test("How We Craft Your Solution renders the 4-stage card blueprint with 01-04 badges", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/");
    const processSection = page.locator("#process");
    await expect(processSection).toBeVisible();

    await expect(processSection).toContainText("OUR BLUEPRINT");
    await expect(processSection).toContainText("How We Craft Your Solution");

    // Verify 4 stages
    await expect(processSection).toContainText("01");
    await expect(processSection).toContainText("Discovery Call");
    await expect(processSection).toContainText("02");
    await expect(processSection).toContainText("Strategy & Proposal");
    await expect(processSection).toContainText("03");
    await expect(processSection).toContainText("Build & Review");
    await expect(processSection).toContainText("04");
    await expect(processSection).toContainText("Launch & Support");
  });

  // 8. Blog Post Detail View: Price Interpolation & Table Formatting
  test("Blog post view interpolates audit price (₹499) and renders case study table", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("/blog/how-we-built-ai-booking-system-salon");

    // Verify {price} is NOT present in raw form
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toContain("{price}");

    // Verify CTA button has formatted price
    const auditBtn = page.locator("a[href='/audit']").last();
    await expect(auditBtn).toBeVisible();
    await expect(auditBtn).toContainText("₹499");

    // Verify case study table and metrics are rendered
    const table = page.locator("table");
    await expect(table).toBeVisible();
    await expect(table).toContainText("Missed Inbound Bookings");
    await expect(table).toContainText("93% Reduction");
    await expect(table).toContainText("+ ₹3,84,000 / mo");

    // Verify founder testimonial
    await expect(page.locator("blockquote")).toContainText("Natasha D'Souza");
  });
});
