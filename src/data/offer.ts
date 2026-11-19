// INTERNAL — not rendered publicly. Used by the owner for quotes.

export const OFFER = {
  launchSlotsTotal: 10,
  launchSlotsLeft: 10, // owner updates; 0 hides all launch pricing
  monthlyCapacity: 3,
  slotsLeftThisMonth: 3, // owner updates monthly
  freelancerRangeInr: null as null | [number, number], // owner must VERIFY with real quotes before filling
  gst: { registered: false, mode: 'exclusive' as 'inclusive' | 'exclusive', ratePct: 18 },
  hostingRenewalInr: null as null | number,
  checklistPdfPath: null as null | string,
  audit: {
    enabled: true,
    priceInr: 499,
    paymentLinkUrl: null as null | string, // owner pastes a Razorpay payment-link URL here
    deliveryWorkingDays: 3, // owner: only promise what you can deliver
    creditedToPackage: false, // owner may set true to credit ₹499 against any package
  },
};
