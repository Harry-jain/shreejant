import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { CTASection } from "@/components/sections/home/CTASection";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { getAllPortfolioProjects } from "@/lib/mdx";

export const metadata = constructMetadata({
  title: "Case Studies & Work Portfolio",
  description:
    "Explore measurable outcomes engineered by SHREEJAN AI: Autonomous salon booking engines, D2C headless commerce platforms, and CA firm automation agents across India.",
  canonicalUrl: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getAllPortfolioProjects();

  return (
    <div className="w-full">
      <PortfolioHero />

      <div className="site-container pb-28">
        <PortfolioGrid projects={projects} />
      </div>

      <GoldDivider />
      <CTASection />
    </div>
  );
}
