"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PRIMARY_SERVICES } from "@/lib/services-data";
import { ServiceVisualCard } from "@/components/sections/services/ServiceVisualCard";

export function ServicesBentoSection() {
  return (
    <section id="services-grid" className="relative py-20 sm:py-28 overflow-hidden bg-transparent text-white">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle,rgba(124,92,252,0.12)_0%,transparent_70%)] blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="site-container-wide relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Engineering Services</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.025em] leading-[1.08]">
            Architectural Solutions Engineered for{" "}
            <span className="inline-block bg-gradient-to-r from-[#7C5CFC] via-[#A78BFA] to-[#38BDF8] bg-clip-text text-transparent pb-1 pr-2">
              Scale
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            From high-conversion latest Next.js version flagships to bespoke cloud web applications, spatial UI/UX redesigns, and forensic performance audits with 100% code ownership.
          </p>
        </div>

        {/* 
          Homepage Services Grid (Equal-Height Bento):
          - Large Desktop (≥1280px): four cards in a single row, all height 100%, align-items: stretch.
          - Desktop & Tablet (768px–1279px): two columns in a balanced 2x2 bento layout.
          - Mobile (<768px): single column, equal gaps of 24px (gap-6).
          - Footers pinned to bottom with margin-top: auto.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {PRIMARY_SERVICES.map((service, index) => {
            return (
              <div key={service.id} className="h-full col-span-1 flex flex-col">
                <ServiceVisualCard
                  service={service}
                  variant="grid"
                  index={index}
                  totalCards={PRIMARY_SERVICES.length}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ServicesBentoSection;

