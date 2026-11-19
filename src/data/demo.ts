export const DEMO_BRAND = {
  name: 'RATNAVALI',
  domainLabel: 'demo-jewellery.example',
};
// Owner: confirm RATNAVALI is not an existing real brand; rename here only if unsure.

export type PieceId = 'bridal' | 'solitaire' | 'jadau';

export type Piece = {
  id: PieceId;
  name: string;
  priceInr: number;
  blurb: string;
  art: 'necklace' | 'ring' | 'kada';
  image: null | { src: string; width: number; height: number; alt: string }; // owner-supplied local file, else null
};

export const PIECES: Piece[] = [
  {
    id: 'bridal',
    name: 'Imperial Bridal',
    priceInr: 4250000,
    art: 'necklace',
    image: null,
    blurb: 'A polki necklace set with uncut diamonds, finished by hand in gold.',
  },
  {
    id: 'solitaire',
    name: 'Rare Solitaire',
    priceInr: 2600000,
    art: 'ring',
    image: null,
    blurb: 'A natural diamond solitaire on a slim gold band, set high to catch the light.',
  },
  {
    id: 'jadau',
    name: 'Royal Jadau',
    priceInr: 1480000,
    art: 'kada',
    image: null,
    blurb: 'A jadau kada set with rubies and emeralds in the traditional kundan style.',
  },
];

export const HERO_IMAGE: null | { src: string; width: number; height: number; alt: string } = null; // else the necklace art

export const CONCIERGE_QA = [
  {
    q: 'Can I see a piece in person?',
    a: 'Yes. We can arrange a private viewing at your home or at our salon, at a time that suits you.',
  },
  {
    q: 'Do you make custom bridal sets?',
    a: 'Our karigars design each set around your outfit and family heirlooms. We start with a short conversation.',
  },
  {
    q: 'How are pieces insured and delivered?',
    a: 'Every order is insured from our vault to your door and handed over in person.',
  },
];

export type TransitStatus = 'inTransit' | 'customsCleared' | 'homeViewing';

export type FeedItem = {
  id: string;
  item: string;
  route: string;
  amount: string;
  status: TransitStatus;
  art: 'necklace' | 'ring' | 'kada';
};

export const DASHBOARD_SAMPLE = {
  title: 'Vault logistics',
  hub: 'Zaveri Bazaar central hub',
  role: 'Vault manager',
  kpis: [
    { id: 'transit', label: 'In transit', value: '4', note: 'GPS synced' },
    { id: 'clients', label: 'VIP clients', value: '1,420', note: '48 added this month' },
    { id: 'stock', label: 'Vault stock', value: '₹78.4 Crore', note: 'Fully insured' },
    { id: 'dispatch', label: 'Dispatched in 24 hours', value: '₹68.2 Lakhs', note: '7 dispatches' },
  ],
  trend: [12, 18, 15, 22, 30, 26, 34, 41],
  feed: [
    {
      id: 'RV-901',
      item: 'Imperial Nizam polki set',
      route: 'Zaveri Bazaar vault to Bandra salon',
      amount: '₹95.0 Lakhs',
      status: 'inTransit' as const,
      art: 'necklace' as const,
    },
    {
      id: 'RV-902',
      item: 'Two natural solitaires',
      route: 'Surat diamond bourse to Mumbai vault',
      amount: '₹2.10 Crore',
      status: 'customsCleared' as const,
      art: 'ring' as const,
    },
    {
      id: 'RV-903',
      item: 'Royal bridal trousseau set',
      route: "Bandra salon to the client's home",
      amount: '₹45.0 Lakhs',
      status: 'homeViewing' as const,
      art: 'kada' as const,
    },
  ],
};
