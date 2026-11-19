"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/demo-shared/FadeUp";

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

interface GymPricingTableProps {
  tiers: PricingTier[];
}

export function GymPricingTable({ tiers }: GymPricingTableProps) {
  // Desktop order: Basic, Standard (popular), Premium
  // Mobile order: Standard first, then Basic, then Premium
  const basicTier = tiers.find((t) => t.id === "basic") || tiers[0];
  const standardTier = tiers.find((t) => t.id === "standard") || tiers[1];
  const premiumTier = tiers.find((t) => t.id === "premium") || tiers[2];

  return (
    <section id="pricing" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F1113]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <FadeUp>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-3 bg-[#E11D2E]/20 text-[#E11D2E] border border-[#E11D2E]/40">
              TRANSPARENT MEMBERSHIPS
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-3">
              No Hidden Fees. Real Results.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#9AA0A6]">
              All plans include locker access, app tracking, and bi-weekly workout programming.
            </p>
          </FadeUp>
        </div>

        {/* Desktop 3-Column Grid (Basic -> Standard -> Premium) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {[basicTier, standardTier, premiumTier].map((tier, idx) => {
            const isPopular = tier.popular;

            return (
              <FadeUp key={tier.id} delay={idx * 0.1} className="h-full">
                <div
                  className={`h-full rounded-[24px] p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? "bg-[#1C1F25] border-t-4 border-t-[#E11D2E] border-x border-b border-[#E11D2E]/50 shadow-[0_20px_50px_rgba(225,29,46,0.25)] md:-translate-y-3"
                      : "bg-[#181B1F] border border-white/10 hover:border-white/20 shadow-lg"
                  }`}
                >
                  <div>
                    {/* Header with popular badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9AA0A6]">
                        {tier.name}
                      </span>
                      {isPopular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E11D2E] text-white font-mono text-[10px] font-bold uppercase shadow">
                          Most Popular
                        </span>
                      )}
                    </div>

                    {/* Price in INR */}
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="font-heading font-black text-3xl sm:text-4xl text-white">
                        {tier.price}
                      </span>
                      <span className="font-mono text-xs text-[#9AA0A6]">
                        {tier.period}
                      </span>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F5F5]">
                          <Check className="w-4 h-4 text-[#E11D2E] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="#booking"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-full font-heading font-bold text-sm transition-all ${
                      isPopular
                        ? "bg-[#E11D2E] hover:bg-[#c21423] text-white shadow-lg hover:scale-105 active:scale-95"
                        : "bg-white/10 hover:bg-white/15 text-white"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Mobile View: Standard Athlete First, then Basic, then Premium */}
        <div className="grid md:hidden grid-cols-1 gap-6">
          {[standardTier, basicTier, premiumTier].map((tier) => {
            const isPopular = tier.popular;

            return (
              <div
                key={tier.id}
                className={`rounded-[24px] p-6 flex flex-col justify-between ${
                  isPopular
                    ? "bg-[#1C1F25] border-t-4 border-t-[#E11D2E] border-x border-b border-[#E11D2E]/50 shadow-[0_16px_36px_rgba(225,29,46,0.25)]"
                    : "bg-[#181B1F] border border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9AA0A6]">
                      {tier.name}
                    </span>
                    {isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E11D2E] text-white font-mono text-[10px] font-bold uppercase shadow">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="font-heading font-black text-3xl text-white">
                      {tier.price}
                    </span>
                    <span className="font-mono text-xs text-[#9AA0A6]">
                      {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#F5F5F5]">
                        <Check className="w-3.5 h-3.5 text-[#E11D2E] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#booking"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-full font-heading font-bold text-sm ${
                    isPopular ? "bg-[#E11D2E] text-white shadow" : "bg-white/10 text-white"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default GymPricingTable;

