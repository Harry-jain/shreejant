"use client";

import React from "react";
import { Cpu, Terminal, Code2, Database, Layers, Cloud, Zap, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n";

const ROW_1 = [
  { name: "Latest version Next JS", icon: Code2 },
  { name: "React 19", icon: Layers },
  { name: "TypeScript 5.7", icon: Terminal },
  { name: "Python", icon: Terminal },
  { name: "FastAPI", icon: Zap },
  { name: "PostgreSQL", icon: Database },
  { name: "OpenAI Models", icon: Sparkles },
  { name: "LangChain", icon: Cpu },
];

const ROW_2 = [
  { name: "Tailwind CSS v4", icon: Layers },
  { name: "Vercel Edge", icon: Cloud },
  { name: "Docker", icon: Terminal },
  { name: "Redis", icon: Database },
  { name: "Prisma ORM", icon: Database },
  { name: "Three.js r168", icon: Sparkles },
  { name: "Framer Motion", icon: Zap },
  { name: "Supabase", icon: Cloud },
];

export function TechStackSection() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)] overflow-hidden bg-transparent text-white">
      {/* Continuous Ambient Glow Flowing Through Tech Stack */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1150px] h-[450px] bg-[radial-gradient(circle,rgba(167,139,250,0.15)_0%,rgba(124,92,252,0.1)_40%,rgba(56,189,248,0.05)_65%,transparent_75%)] blur-[130px] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="site-container mb-14 text-center">
        <SectionHeading
          eyebrow={t("tech_stack.label")}
          title={t("tech_stack.title")}
          centered
        />
      </div>

      {/* Marquee Row 1 (Left to Right) with Soft Blended Edge Fade */}
      <div className="relative w-full overflow-hidden mb-5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee space-x-4">
          {[...ROW_1, ...ROW_1].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#0E121E]/90 border border-white/10 text-white shadow-md whitespace-nowrap hover:border-[#7C5CFC]/60 hover:shadow-[0_0_20px_rgba(124,92,252,0.25)] hover:scale-[1.02] transition-all duration-200 select-none"
              >
                <Icon className="w-4 h-4 text-[#A78BFA] shrink-0" />
                <span className="font-mono text-[13.5px] font-medium tracking-[0.3px] text-white/90">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Row 2 (Right to Left) with Soft Blended Edge Fade */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee-reverse space-x-4">
          {[...ROW_2, ...ROW_2].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#0E121E]/90 border border-white/10 text-white shadow-md whitespace-nowrap hover:border-[#7C5CFC]/60 hover:shadow-[0_0_20px_rgba(124,92,252,0.25)] hover:scale-[1.02] transition-all duration-200 select-none"
              >
                <Icon className="w-4 h-4 text-[#A78BFA] shrink-0" />
                <span className="font-mono text-[13.5px] font-medium tracking-[0.3px] text-white/90">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
