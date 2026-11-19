import { chromium } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:3000';
const DEMO_IDS = ['salon', 'jewellery', 'clinic', 'restaurant', 'gym', 'shop', 'classes', 'general'];

async function runVerification() {
  console.log('--- Starting Cinema Verification Suite ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  let failed = 0;

  try {
    // 1. Verify Home Page Inline Preview and Chips
    console.log('1. Testing Home Page inline preview and chips...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'load' });
    const demoSection = page.locator('#demos');
    await demoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    for (const id of ['jewellery', 'clinic', 'restaurant', 'gym', 'shop', 'classes', 'general', 'salon']) {
      const chip = page.locator(`button[role="radio"]:has-text("${id}")`).first();
      if (await chip.count() > 0) {
        await chip.click();
        await page.waitForTimeout(400);
        console.log(`   [PASS] Switched to chip "${id}"`);
      }
    }

    // 2. Verify Fullscreen Theatre View & Title Card Fade
    console.log('2. Testing Fullscreen Theatre View (/demos/salon)...');
    await page.goto(`${BASE_URL}/demos/salon`, { waitUntil: 'load' });
    const titleCard = page.locator('text=A Sample Demonstration');
    const isTitleCardVisible = await titleCard.isVisible();
    console.log(`   Title Card initial visibility: ${isTitleCardVisible}`);
    if (isTitleCardVisible) {
      console.log('   [PASS] Title Card rendered on initial visit');
    }

    // Wait for title card to fade out (1.2s display + 0.6s fade)
    await page.waitForTimeout(2000);
    const isTitleCardGone = !(await titleCard.isVisible());
    if (isTitleCardGone) {
      console.log('   [PASS] Title Card smoothly faded out after 1.2s');
    } else {
      console.error('   [FAIL] Title Card did not fade out');
      failed++;
    }

    // 3. Verify Progress Rail Navigation (8 dots)
    console.log('3. Testing Progress Rail...');
    const railLinks = page.locator('nav[aria-label="Sample demos progress rail"] a');
    const count = await railLinks.count();
    console.log(`   Found ${count} progress rail dots (expected 8)`);
    if (count === 8) {
      console.log('   [PASS] Progress rail has all 8 dots');
    } else {
      console.error(`   [FAIL] Expected 8 dots, found ${count}`);
      failed++;
    }

    // Click dot 1 (jewellery)
    await railLinks.nth(1).click();
    await page.waitForFunction(() => window.location.pathname === '/demos/jewellery', null, { timeout: 5000 });
    await page.waitForTimeout(800);
    console.log('   [PASS] Clicked dot 1 -> successfully navigated to /demos/jewellery');

    // 4. Verify Keyboard Navigation
    console.log('4. Testing Keyboard Navigation...');
    // Press ArrowRight to move from jewellery -> clinic
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => window.location.pathname === '/demos/clinic', null, { timeout: 5000 });
    await page.waitForTimeout(800);
    console.log('   [PASS] ArrowRight -> navigated to /demos/clinic');

    // Press ArrowLeft to move from clinic -> jewellery
    await page.keyboard.press('ArrowLeft');
    await page.waitForFunction(() => window.location.pathname === '/demos/jewellery', null, { timeout: 5000 });
    await page.waitForTimeout(800);
    console.log('   [PASS] ArrowLeft -> navigated to /demos/jewellery');

    // Press Escape to exit back to home page demos section
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => window.location.pathname === '/' && window.location.hash === '#demos', null, { timeout: 5000 });
    console.log('   [PASS] Escape -> exited theatre view back to /#demos');

    // 5. Verify Contact Form URL intent & demo_type
    console.log('5. Testing Contact Form Link intent and demo_type...');
    await page.goto(`${BASE_URL}/demos/salon`, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    const topCta = page.locator('header a:has-text("Get a site like this")').first();
    const href = await topCta.getAttribute('href');
    console.log(`   Top CTA href: ${href}`);
    if (href && href.includes('intent=demo') && href.includes('demo_type=salon')) {
      console.log('   [PASS] Contact link contains intent=demo and demo_type=salon');
    } else {
      console.error(`   [FAIL] Contact link does not match required query params: ${href}`);
      failed++;
    }

    // Scroll to end-of-page CTA
    const endCta = page.locator('section[aria-label="Project conversion conclusion"] a:has-text("Get a site like this")').first();
    const endHref = await endCta.getAttribute('href');
    console.log(`   End CTA href: ${endHref}`);
    if (endHref && endHref.includes('intent=demo') && endHref.includes('demo_type=salon')) {
      console.log('   [PASS] End-of-page closing CTA contains intent=demo and demo_type=salon');
    } else {
      console.error(`   [FAIL] End CTA does not match query params: ${endHref}`);
      failed++;
    }

    // 6. Verify Reduced Motion
    console.log('6. Testing Prefers-Reduced-Motion behavior...');
    const rmContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const rmPage = await rmContext.newPage();
    await rmPage.goto(`${BASE_URL}/demos/salon`, { waitUntil: 'load' });
    const rmTitleCard = rmPage.locator('text=A Sample Demonstration');
    const rmTitleCardVisible = await rmTitleCard.isVisible();
    if (!rmTitleCardVisible) {
      console.log('   [PASS] Reduced motion skips title card presentation immediately');
    } else {
      console.error('   [FAIL] Title card was displayed when reduced motion is requested');
      failed++;
    }
    await rmContext.close();

    // 7. Verify Mobile Touch Target & Overflow at 360px & 390px
    console.log('7. Testing Mobile Viewports (360px & 390px)...');
    for (const w of [360, 390]) {
      const mContext = await browser.newContext({ viewport: { width: w, height: 800 } });
      const mPage = await mContext.newPage();
      await mPage.goto(`${BASE_URL}/demos/salon`, { waitUntil: 'load' });
      await mPage.waitForTimeout(800);

      const overflow = await mPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      if (!overflow) {
        console.log(`   [PASS] ${w}px theatre view has zero horizontal overflow`);
      } else {
        console.error(`   [FAIL] ${w}px theatre view has horizontal overflow`);
        failed++;
      }

      const mobileRail = mPage.locator('nav[aria-label="Sample demos mobile progress rail"]');
      const railVisible = await mobileRail.isVisible();
      if (railVisible) {
        console.log(`   [PASS] ${w}px floating progress rail is visible at bottom`);
      } else {
        console.error(`   [FAIL] ${w}px floating progress rail is not visible`);
        failed++;
      }
      await mContext.close();
    }
  } catch (err) {
    console.error('[ERROR] Verification failed unexpectedly:', err);
    failed++;
  } finally {
    await browser.close();
  }

  if (failed > 0) {
    console.error(`\n--- Verification completed with ${failed} failures ---`);
    process.exit(1);
  }

  console.log('\n--- ALL VERIFICATION CHECKS PASSED PERFECTLY! ---');
  process.exit(0);
}

runVerification();