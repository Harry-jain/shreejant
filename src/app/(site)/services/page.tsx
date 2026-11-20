import React from "react";
import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesOverview } from "@/components/sections/services/ServicesOverview";
import { PricingSection } from "@/components/sections/services/PricingSection";
import { ScopeComparison } from "@/components/sections/services/ScopeComparison";
import { ServicesFAQ } from "@/components/sections/services/ServicesFAQ";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Services & Pricing | SHREEJAN AI SOLUTIONS — Mumbai Web Agency",
  description:
    "Transparent engineering packages for custom websites, web applications, and redesigns. Fixed pricing, realistic delivery timelines, milestone billing, and complete source code ownership for Indian businesses.",
  openGraph: {
    title: "Services & Pricing | SHREEJAN AI SOLUTIONS",
    description:
      "Explore fixed-scope web engineering packages from ₹14,999. Milestone billing, realistic delivery, and full code ownership for Indian business owners.",
    url: "https://shreejan.in/services",
    siteName: "SHREEJAN AI SOLUTIONS",
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-bg">
      <ServicesHero />
      <ServicesOverview />
      <PricingSection />
      <ScopeComparison />
      <ServicesFAQ />
      <ServicesCTA />
    </main>
  );
}
