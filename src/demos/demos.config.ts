export type DemoId =
  | 'gym'
  | 'restaurant'
  | 'clinic'
  | 'salon'
  | 'jewellery'
  | 'shop'
  | 'classes'
  | 'enterprise'
  | 'general';

export type DemoConfig = {
  id: DemoId;
  labelKey: string;
  name: string;
  domain: string;
  tagline: string;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    accent: string;
  };
  fontId: string;
  hero: {
    title: string;
    sub: string;
    cta: string;
  };
  sections: string[];
};

export const DEMOS: DemoConfig[] = [
  {
    id: 'gym',
    labelKey: 'demo.type.gym',
    name: 'Ironforge Fitness',
    domain: 'ironforgefitness.shreejan.ai',
    tagline: 'High-Performance Strength & Conditioning',
    palette: {
      bg: '#0F1113',
      surface: '#181B1F',
      ink: '#F5F5F5',
      accent: '#E11D2E',
    },
    fontId: 'oswald',
    hero: {
      title: 'Heavy iron. Pure conditioning. Zero fluff.',
      sub: 'Train with structured progressive overload, calibrated Eleiko plates, and certified coaches in Nashik.',
      cta: 'Start trial',
    },
    sections: ['hero', 'pricing', 'timetable', 'whatsapp-bot', 'testimonials', 'trial', 'footer'],
  },
  {
    id: 'restaurant',
    labelKey: 'demo.type.restaurant',
    name: 'The Bombay Bistro',
    domain: 'bombaybistro.shreejan.ai',
    tagline: 'Coastal & Bombay Street Classics',
    palette: {
      bg: '#FBF6EE',
      surface: '#FFFFFF',
      ink: '#2A1A1A',
      accent: '#7A1F2B',
    },
    fontId: 'fraunces',
    hero: {
      title: 'Bombay flavours, slow-cooked since 2016.',
      sub: 'Coastal and Mumbai street classics, served in a warm, unhurried room in Nashik with authentic hand-pounded masalas.',
      cta: 'Reserve a table',
    },
    sections: ['hero', 'menu', 'whatsapp-concierge', 'reviews', 'reservation', 'footer'],
  },
  {
    id: 'clinic',
    labelKey: 'demo.type.clinic',
    name: 'Dr. Vora Clinic',
    domain: 'drvoraclinic.shreejan.ai',
    tagline: 'Specialist Dermatology & Family Care',
    palette: {
      bg: '#F4F9F9',
      surface: '#FFFFFF',
      ink: '#1E2A32',
      accent: '#0F8A8A',
    },
    fontId: 'source-sans',
    hero: {
      title: 'Specialist care, booked in under a minute.',
      sub: 'Dermatology and general medicine in Nashik. Book online, on WhatsApp, or walk in.',
      cta: 'Book appointment',
    },
    sections: ['hero', 'doctor', 'specialities', 'triage', 'appointment', 'footer'],
  },
  {
    id: 'salon',
    labelKey: 'demo.type.salon',
    name: 'Aura Studio',
    domain: 'aurastudio.shreejan.ai',
    tagline: 'Luxury Hair, Skin & Bridal Sanctuary',
    palette: {
      bg: '#FBF4EF',
      surface: '#FFFFFF',
      ink: '#2B1F1F',
      accent: '#A4565F',
    },
    fontId: 'dm-serif',
    hero: {
      title: 'Unapologetic luxury for hair, skin & bridal couture.',
      sub: 'A calm, private sanctuary where bespoke bridal styling and restorative hair therapies are performed unhurriedly.',
      cta: 'Book appointment',
    },
    sections: ['hero', 'treatments', 'bridal-ai', 'booking', 'testimonials', 'footer'],
  },
  {
    id: 'jewellery',
    labelKey: 'demo.type.jewellery',
    name: 'Kanak Heritage Jewels',
    domain: 'kanakjewels.shreejan.ai',
    tagline: 'BIS 916 Hallmarked Gold & Uncut Polki',
    palette: {
      bg: '#0B0B0C',
      surface: '#15151A',
      ink: '#F3EFE6',
      accent: '#C9A24B',
    },
    fontId: 'cormorant',
    hero: {
      title: 'Handcrafted jewellery, certified in gold.',
      sub: 'BIS hallmarked gold and polki pieces, designed in Pune and made to your measure with complete transparency.',
      cta: 'Explore collection',
    },
    sections: ['hero', 'collection', 'jewel-chat', 'reviews', 'enquiry', 'footer'],
  },
  {
    id: 'shop',
    labelKey: 'demo.type.shop',
    name: 'Anayra Everyday Essentials',
    domain: 'anayraessentials.shreejan.ai',
    tagline: 'Everyday Essentials & Wellness',
    palette: {
      bg: '#F7F8FA',
      surface: '#FFFFFF',
      ink: '#14161C',
      accent: '#3B3FD8',
    },
    fontId: 'poppins',
    hero: {
      title: 'Everyday essentials, delivered in 48 hours.',
      sub: 'Home, kitchen, and wellness products with COD, UPI autopay, and hassle-free returns within 7 days.',
      cta: 'Shop bestsellers',
    },
    sections: ['hero', 'products', 'order-ai', 'checkout', 'reviews', 'footer'],
  },
  {
    id: 'classes',
    labelKey: 'demo.type.classes',
    name: 'Zenith Academy',
    domain: 'zenithacademy.shreejan.ai',
    tagline: 'Dance, Fine Art, Music & Fitness Academy',
    palette: {
      bg: '#2A1B5C',
      surface: '#382575',
      ink: '#FFFFFF',
      accent: '#FFC93C',
    },
    fontId: 'lexend',
    hero: {
      title: 'Learn something new every week.',
      sub: 'Dance, art, music, and fitness classes for kids and adults in Nashik. Small batches, expert teachers.',
      cta: 'Book a trial class',
    },
    sections: ['hero', 'timetable', 'classes', 'instructors', 'trial-bot', 'trial-booking', 'footer'],
  },
  {
    id: 'enterprise',
    labelKey: 'demo.type.other',
    name: 'Nexus Enterprise AI',
    domain: 'nexusai.shreejan.ai',
    tagline: 'Enterprise Automation & Bespoke AI Platforms',
    palette: {
      bg: '#0B1B33',
      surface: '#112646',
      ink: '#F3F6FA',
      accent: '#2F6FD6',
    },
    fontId: 'inter',
    hero: {
      title: 'Operations software that runs while your team sleeps.',
      sub: 'Custom platforms, CRM and WhatsApp automation, and AI assistants built and integrated for mid-size businesses.',
      cta: 'Request a consultation',
    },
    sections: ['hero', 'clients', 'capabilities', 'workflow', 'architecture', 'consultation', 'footer'],
  },
];

export const DEMO_IDS = DEMOS.map((d) => d.id);

export function getDemoConfig(id: string): DemoConfig | undefined {
  if (id === 'general') {
    return DEMOS.find((d) => d.id === 'enterprise');
  }
  return DEMOS.find((d) => d.id === id);
}

export const CHIP_ORDER = [
  'gym',
  'restaurant',
  'clinic',
  'salon',
  'jewellery',
  'shop',
  'classes',
  'enterprise',
] as const;

export const OTHER_MAPS_TO: DemoId = 'enterprise';
