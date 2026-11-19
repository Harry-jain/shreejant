// Test estimate calculation with exact data
const PLANS = [
  { id: 'starter', launchPriceInr: 14999, regularPriceInr: 17999, languagesIncluded: 'en' },
  { id: 'growth', launchPriceInr: 27999, regularPriceInr: 33999, languagesIncluded: 'en+1' },
  { id: 'business', launchPriceInr: 47999, regularPriceInr: 57999, languagesIncluded: 'en+hi+mr' },
  { id: 'premium', launchPriceInr: 69999, regularPriceInr: 84999, languagesIncluded: 'en+hi+mr' },
  { id: 'custom', launchPriceInr: 94999, regularPriceInr: 109999, languagesIncluded: 'en+hi+mr' },
];

const ASSET_PACKS = [
  { id: 'basic', priceInr: 7999 },
  { id: 'complete', priceInr: 17999 },
];

const ADD_ONS = [
  { id: 'additional_page', priceInr: 1999 },
  { id: 'single_language', priceInr: 3999 },
  { id: 'both_languages', priceInr: 5999 },
  { id: 'google_business_seo', priceInr: 2999 },
  { id: 'domain_email', priceInr: 999 },
  { id: 'product_entry_25', priceInr: 1999 },
  { id: 'rush_delivery', percentAdd: 25 },
];

const RECURRING_PLANS = [
  { id: 'care_basic', pricePerMonthInr: 1499 },
  { id: 'care_plus', pricePerMonthInr: 2999 },
  { id: 'ai_maintenance', pricePerMonthInr: 2499 },
];

const OFFER = {
  launchSlotsTotal: 10,
  launchSlotsLeft: 10,
  audit: { priceInr: 499 },
};

function computeEstimate(selection, plans = PLANS, offer = OFFER) {
  const { planId } = selection;
  const isCustom = planId === 'custom';
  const plan = plans.find((p) => p.id === planId) || plans[0];
  const hasLaunchPricing = offer.launchSlotsLeft > 0;
  const basePriceInr = hasLaunchPricing ? plan.launchPriceInr : plan.regularPriceInr;

  if (isCustom) {
    return { totalOneTimeInr: 0, isCustom: true };
  }

  let contentPackInr = 0;
  if (selection.contentPack === 'basic') {
    contentPackInr = ASSET_PACKS.find((p) => p.id === 'basic')?.priceInr || 7999;
  } else if (selection.contentPack === 'complete') {
    contentPackInr = ASSET_PACKS.find((p) => p.id === 'complete')?.priceInr || 17999;
  }

  let languageCostInr = 0;
  const selectedLangCount = (selection.languages?.hindi ? 1 : 0) + (selection.languages?.marathi ? 1 : 0);
  const singleLangPrice = ADD_ONS.find((a) => a.id === 'single_language')?.priceInr || 3999;
  const bothLangPrice = ADD_ONS.find((a) => a.id === 'both_languages')?.priceInr || 5999;

  if (plan.languagesIncluded === 'en') {
    if (selectedLangCount === 2) {
      languageCostInr = bothLangPrice;
    } else if (selectedLangCount === 1) {
      languageCostInr = singleLangPrice;
    }
  } else if (plan.languagesIncluded === 'en+1') {
    if (selectedLangCount === 2) {
      languageCostInr = singleLangPrice;
    } else {
      languageCostInr = 0;
    }
  } else {
    languageCostInr = 0;
  }

  const additionalPagePrice = ADD_ONS.find((a) => a.id === 'additional_page')?.priceInr || 1999;
  const extraPages = Math.max(0, Math.min(10, selection.extraPages || 0));
  const extraPagesInr = extraPages * additionalPagePrice;

  const googleSeoPrice = ADD_ONS.find((a) => a.id === 'google_business_seo')?.priceInr || 2999;
  const googleBusinessSeoInr = selection.googleBusinessSeo ? googleSeoPrice : 0;

  const domainEmailPrice = ADD_ONS.find((a) => a.id === 'domain_email')?.priceInr || 999;
  const domainEmailInr = selection.domainEmail ? domainEmailPrice : 0;

  const supportsStore = planId === 'business' || planId === 'premium';
  const productEntryPrice = ADD_ONS.find((a) => a.id === 'product_entry_25')?.priceInr || 1999;
  const productUnits = supportsStore ? Math.max(0, Math.min(10, selection.productEntryUnits || 0)) : 0;
  const productEntryInr = productUnits * productEntryPrice;

  const subtotalInr =
    basePriceInr +
    contentPackInr +
    languageCostInr +
    extraPagesInr +
    googleBusinessSeoInr +
    domainEmailInr +
    productEntryInr;

  const rushDeliveryInr = selection.rushDelivery ? Math.round(subtotalInr * 0.25) : 0;
  const totalOneTimeInr = Math.round(subtotalInr + rushDeliveryInr);

  return { totalOneTimeInr, basePriceInr, subtotalInr, rushDeliveryInr };
}

const defaultSel = {
  planId: 'starter',
  contentPack: 'none',
  languages: { hindi: false, marathi: false },
  extraPages: 0,
  googleBusinessSeo: false,
  domainEmail: false,
  productEntryUnits: 0,
  rushDelivery: false,
  carePlan: 'none'
};

const tests = [
  { name: 'Starter alone', sel: { ...defaultSel, planId: 'starter' }, expected: 14999 },
  { name: 'Starter + HI + MR', sel: { ...defaultSel, planId: 'starter', languages: { hindi: true, marathi: true } }, expected: 20998 },
  { name: 'Growth + Complete pack', sel: { ...defaultSel, planId: 'growth', contentPack: 'complete' }, expected: 45998 },
  { name: 'Growth + HI + MR', sel: { ...defaultSel, planId: 'growth', languages: { hindi: true, marathi: true } }, expected: 31998 },
  { name: 'Business + 2 pages + 2 products', sel: { ...defaultSel, planId: 'business', extraPages: 2, productEntryUnits: 2 }, expected: 55995 },
  { name: 'Starter with rush', sel: { ...defaultSel, planId: 'starter', rushDelivery: true }, expected: 18749 },
  { name: 'launchSlotsLeft=0 Starter', sel: { ...defaultSel, planId: 'starter' }, offer: { ...OFFER, launchSlotsLeft: 0 }, expected: 17999 },
];

let allPassed = true;
for (const t of tests) {
  const res = computeEstimate(t.sel, PLANS, t.offer || OFFER);
  const pass = res.totalOneTimeInr === t.expected;
  console.log(`${t.name}: ₹${res.totalOneTimeInr} (expected ₹${t.expected}) -> ${pass ? 'PASS' : 'FAIL'}`);
  if (!pass) allPassed = false;
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('ALL ESTIMATE TESTS PASSED!');
}
