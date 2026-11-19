export const INDUSTRIES = [
  'salon',
  'jewellery',
  'clinic',
  'restaurant',
  'gym',
  'shop',
  'classes',
  'other',
] as const;

export type IndustrySlug = (typeof INDUSTRIES)[number];
