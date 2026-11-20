export interface ServiceItem {
  id: string;
  slug: string;
  number?: string;
  label?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  techStack: string[];
  tags?: string[];
  proofPoint?: string;
  deliveryTime?: string;
  ctaText?: string;
  ctaHref?: string;
  timeline: string;
  investmentTier: string;
  iconName: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: "Websites" | "AI Solutions" | "E-Commerce";
  summary: string;
  domainUrl: string;
  externalUrl?: string;
  results: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  featured: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  idealFor: string;
}

