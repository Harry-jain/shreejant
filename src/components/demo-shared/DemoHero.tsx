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
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-5"
                style={{
                  backgroundColor: `${palette.accent}18`,
                  color: palette.accent,
                  border: `1px solid ${palette.accent}35`,
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

              {/* Headline (Max 2 lines on desktop) */}
              <h1
                className="font-heading font-black text-3xl sm:text-5xl lg:text-[54px] tracking-tight leading-[1.08] mb-5"
                style={{ color: palette.ink }}
              >
                {headline}
              </h1>

              {/* Subhead (One line / clean) */}
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-sm sm:text-base border hover:scale-105 active:scale-95 transition-all"
                    style={{
                      borderColor: `${palette.ink}25`,
                      color: palette.ink,
                      backgroundColor: `${palette.surface}60`,
                    }}
                  >
                    <span>{secondaryCta.label}</span>
                  </a>
                )}
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Finished Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <FadeUp delay={0.15} className="w-full max-w-[460px]">
              <div
                className="relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border shadow-xl flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: palette.surface,
                  borderColor: `${palette.ink}15`,
                }}
              >
                {/* Subtle internal gradient aura */}
                <div
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                  style={{ backgroundColor: palette.accent }}
                />

                <div className="relative z-10 w-full flex items-center justify-center">
                  {visual}
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DemoHero;

