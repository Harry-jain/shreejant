// INTERNAL — not rendered publicly. Used by the owner for quotes.

export type PlanId = 'starter' | 'growth' | 'business' | 'premium' | 'custom';

export type Plan = {
  id: PlanId;
  launchPriceInr: number;
  regularPriceInr: number;
  priceFrom?: boolean;
  recommended?: boolean;
  deliveryDays: string;
  revisions: number;
  supportDays: number;
  languagesIncluded: 'en' | 'en+1' | 'en+hi+mr';
  paymentSplit: '50/50' | '40/30/30';
};

export const PLANS: Plan[] = [
  {
    id: 'starter',
    launchPriceInr: 14999,
    regularPriceInr: 17999,
    deliveryDays: '7-10',
    revisions: 3,
    supportDays: 30,
    languagesIncluded: 'en',
    paymentSplit: '50/50',
  },
  {
    id: 'growth',
    launchPriceInr: 27999,
    regularPriceInr: 33999,
    recommended: true,
    deliveryDays: '14-18',
    revisions: 3,
    supportDays: 45,
    languagesIncluded: 'en+1',
    paymentSplit: '50/50',
  },
  {
    id: 'business',
    launchPriceInr: 47999,
    regularPriceInr: 57999,
    deliveryDays: '21-28',
    revisions: 4,
    supportDays: 60,
    languagesIncluded: 'en+hi+mr',
    paymentSplit: '40/30/30',
  },
  {
    id: 'premium',
    launchPriceInr: 69999,
    regularPriceInr: 84999,
    deliveryDays: '28-35',
    revisions: 4,
    supportDays: 90,
    languagesIncluded: 'en+hi+mr',
    paymentSplit: '40/30/30',
  },
  {
    id: 'custom',
    launchPriceInr: 94999,
    regularPriceInr: 109999,
    priceFrom: true,
    deliveryDays: 'quoted',
    revisions: 5,
    supportDays: 30,
    languagesIncluded: 'en+hi+mr',
    paymentSplit: '40/30/30',
  },
];

export interface AssetPack {
  id: 'basic' | 'complete';
  priceInr: number;
}

export const ASSET_PACKS: AssetPack[] = [
  { id: 'basic', priceInr: 7999 },
  { id: 'complete', priceInr: 17999 },
];

export interface AddOn {
  id: string;
  priceInr?: number;
  priceRangeInr?: [number, number];
  percentAdd?: number;
  quoted?: boolean;
}

export const ADD_ONS: AddOn[] = [
  { id: 'extra_revision', priceInr: 1499 },
  { id: 'additional_page', priceInr: 1999 },
  { id: 'single_language', priceInr: 3999 },
  { id: 'both_languages', priceInr: 5999 },
  { id: 'google_business_seo', priceInr: 2999 },
  { id: 'domain_email', priceInr: 999 },
  { id: 'product_entry_25', priceInr: 1999 },
  { id: 'logo_branding', priceRangeInr: [2999, 4999] },
  { id: 'speed_optimization', priceInr: 2999 },
  { id: 'rush_delivery', percentAdd: 25 },
  { id: 'photography', quoted: true },
  { id: 'discovery_session', priceInr: 3499 },
];

export interface RecurringPlan {
  id: string;
  pricePerMonthInr: number;
}

export const RECURRING_PLANS: RecurringPlan[] = [
  { id: 'care_basic', pricePerMonthInr: 1499 },
  { id: 'care_plus', pricePerMonthInr: 2999 },
  { id: 'ai_maintenance', pricePerMonthInr: 2499 },
];

export const REFERRAL_REWARD = {
  starterInr: 999,
  growthAndAboveInr: 1999,
};
