import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ScrollStackedServices } from "@/components/sections/services/ScrollStackedServices";
import { CTASection } from "@/components/sections/home/CTASection";
import { GoldDivider } from "@/components/ui/GoldDivider";

export const metadata = constructMetadata({
  title: "AI Services & Engineering Solutions",
  description:
    "Explore our core architectural capabilities: Websites Developer, Custom Web App Development, Website Audit, and UI/UX Redesign for ambitious businesses across India.",
  canonicalUrl: "/services",
});

export default function ServicesPage() {
  return (
    <div className="w-full overflow-x-clip">
      {/* Header unchanged */}
      <ServicesHero />

      {/* Scroll-Stacked Cards */}
      <div className="pb-24 pt-6">
        <ScrollStackedServices />
      </div>

      <GoldDivider />
      {/* Footer / CTA unchanged */}
      <CTASection />
    </div>
  );
}
