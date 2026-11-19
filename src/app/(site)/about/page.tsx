import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { FounderShowcase } from "@/components/sections/about/FounderShowcase";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { getFounders } from "@/lib/founders";

export const metadata = constructMetadata({
  title: "About Us & Principal Architects | SHREEJAN AI SOLUTIONS",
  description:
    "Meet SHREEJAN AI SOLUTIONS: A boutique web and AI agency creating high-performance digital engines for modern businesses across India.",
  canonicalUrl: "/about",
});

export default async function AboutPage() {
  const founders = await getFounders();

  return (
    <div className="w-full">
      <AboutHero />
      <GoldDivider withDiamond />
      <FounderShowcase initialData={founders} />
    </div>
  );
}
