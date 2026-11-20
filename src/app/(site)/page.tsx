import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ServicesExplorer } from "@/components/sections/home/ServicesExplorer";
import { SelectedWorkSection } from "@/components/sections/home/SelectedWorkSection";
import { SideQuestLab } from "@/components/sections/home/SideQuestLab";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { CraftStandardsSection } from "@/components/sections/home/CraftStandardsSection";
import { ClosingCTASection } from "@/components/sections/home/ClosingCTASection";
import { SignalGameSection } from "@/components/sections/home/signal-game/SignalGameSection";

export const metadata: Metadata = {
  title: "SHREEJAN // Digital Engineering Studio — Mumbai",
  description:
    "We build the digital systems behind ambitious businesses. Websites, intelligent automation, and custom digital platforms engineered with craft.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ServicesExplorer />
      <SelectedWorkSection />
      <SideQuestLab />
      <ProcessSection />
      <CraftStandardsSection />
      <ClosingCTASection />
      <SignalGameSection />
    </div>
  );
}
