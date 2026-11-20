import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { WhatWeBuildSection } from "@/components/sections/home/WhatWeBuildSection";
import { DemosSection } from "@/components/sections/home/DemosSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { PricingSummarySection } from "@/components/sections/home/PricingSummarySection";
import { CTASection } from "@/components/sections/home/CTASection";

export const metadata: Metadata = {
  title: "SHREEJAN AI SOLUTIONS — Clean, Fast Websites for Mumbai Businesses",
  description:
    "We build modern, mobile-friendly websites and web applications for Mumbai businesses with clean code, fast loading speeds, and zero bloat.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <WhatWeBuildSection />
      <DemosSection />
      <ProcessSection />
      <PricingSummarySection />
      <CTASection />
    </div>
  );
}
