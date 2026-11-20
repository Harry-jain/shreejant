export type DemoId = 'restaurant' | 'clinic' | 'salon';

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
    id: 'salon',
    labelKey: 'demo.type.salon',
    name: 'Aura Studio',
    domain: 'aurastudio.shreejan.ai',
    tagline: 'Luxury Hair, Skin & Bridal Sanctuary',
    palette: {
      bg: 'rgb(251, 244, 239)',
      surface: 'rgb(255, 255, 255)',
      ink: 'rgb(43, 31, 31)',
      accent: 'rgb(164, 86, 95)',
    },
    fontId: 'dm-serif',
    hero: {
      title: 'Unapologetic luxury for hair, skin & bridal couture.',
      sub: 'A calm, private sanctuary where bespoke bridal styling and restorative hair therapies are performed unhurriedly.',
      cta: 'Book appointment',
    },
    sections: ['hero', 'treatments', 'bridal-ai', 'booking', 'footer'],
  },
  {
    id: 'clinic',
    labelKey: 'demo.type.clinic',
    name: 'Dr. Vora Clinic',
    domain: 'drvoraclinic.shreejan.ai',
    tagline: 'Specialist Dermatology & Family Care',
    palette: {
      bg: 'rgb(244, 249, 249)',
      surface: 'rgb(255, 255, 255)',
      ink: 'rgb(30, 42, 50)',
      accent: 'rgb(15, 138, 138)',
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
    id: 'restaurant',
    labelKey: 'demo.type.restaurant',
    name: 'The Bombay Bistro',
    domain: 'bombaybistro.shreejan.ai',
    tagline: 'Coastal & Bombay Street Classics',
    palette: {
      bg: 'rgb(251, 246, 238)',
      surface: 'rgb(255, 255, 255)',
      ink: 'rgb(42, 26, 26)',
      accent: 'rgb(122, 31, 43)',
    },
    fontId: 'fraunces',
    hero: {
      title: 'Bombay flavours, slow-cooked since 2016.',
      sub: 'Coastal and Mumbai street classics, served in a warm, unhurried room in Nashik with authentic hand-pounded masalas.',
      cta: 'Reserve a table',
    },
    sections: ['hero', 'menu', 'whatsapp-concierge', 'reservation', 'footer'],
  },
];

export const DEMO_IDS = DEMOS.map((d) => d.id);

export function getDemoConfig(id: string): DemoConfig | undefined {
  return DEMOS.find((d) => d.id === id);
}

export const CHIP_ORDER = ['salon', 'clinic', 'restaurant'] as const;
