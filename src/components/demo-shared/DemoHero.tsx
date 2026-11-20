"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeUp } from "./FadeUp";

export interface DemoHeroProps {
  eyebrow: string;
  marathiTagline?: string;
  headline: string;
  subhead: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  visual: React.ReactNode;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    accent: string;
  };
}

export function DemoHero({
  eyebrow,
  marathiTagline,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  visual,
  palette,
}: DemoHeroProps) {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Copy & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <FadeUp>
              {/* Eyebrow Pill */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-5 border"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  color: palette.accent,
                  borderColor: "rgba(0, 0, 0, 0.12)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </div>

              {/* Optional Marathi / Hindi Tagline */}
              {marathiTagline && (
                <span className="block font-serif text-xs sm:text-sm font-medium tracking-wide opacity-75 mb-3">
                  {marathiTagline}
                </span>
              )}

              {/* Headline */}
              <h1
                className="font-heading font-black text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.08] mb-5"
                style={{ color: palette.ink }}
              >
                {headline}
              </h1>

              {/* Subhead */}
              <p className="font-body text-base sm:text-lg opacity-80 leading-relaxed mb-8 max-w-xl">
                {subhead}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-heading font-bold text-sm sm:text-base text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundColor: palette.accent }}
                >
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-sm sm:text-base border border-current/20 hover:scale-105 active:scale-95 transition-all"
                    style={{
                      color: palette.ink,
                      backgroundColor: palette.surface,
                    }}
                  >
                    <span>{secondaryCta.label}</span>
                  </a>
                )}
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <FadeUp delay={0.2} className="w-full">
              <div
                className="rounded-3xl p-4 sm:p-6 border shadow-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: palette.surface,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                }}
              >
                {visual}
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DemoHero;
