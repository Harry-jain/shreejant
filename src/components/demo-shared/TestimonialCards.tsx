"use client";

import React from "react";
import { Star } from "lucide-react";
import { FadeUp } from "./FadeUp";

export interface TestimonialItem {
  name: string;
  city: string;
  rating?: number;
  quote: string;
}

export interface TestimonialCardsProps {
  badge?: string;
  heading?: string;
  subhead?: string;
  testimonials: TestimonialItem[];
  palette: {
    bg: string;
    surface: string;
    ink: string;
    accent: string;
  };
}

export function TestimonialCards({
  badge = "CLIENT VERIFIED REVIEWS",
  heading = "Trusted by Leaders Across Maharashtra",
  subhead = "Real feedback from genuine clients and verified regulars.",
  testimonials,
  palette,
}: TestimonialCardsProps) {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <FadeUp>
            <span
              className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-3"
              style={{
                backgroundColor: `${palette.accent}18`,
                color: palette.accent,
                border: `1px solid ${palette.accent}30`,
              }}
            >
              {badge}
            </span>
            <h2
              className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-3"
              style={{ color: palette.ink }}
            >
              {heading}
            </h2>
            <p className="font-body text-sm sm:text-base opacity-75">
              {subhead}
            </p>
          </FadeUp>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.slice(0, 3).map((item, idx) => (
            <FadeUp key={idx} delay={idx * 0.1} className="h-full">
              <div
                className="h-full p-6 sm:p-7 rounded-[24px] border shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: palette.surface,
                  borderColor: `${palette.ink}15`,
                  color: palette.ink,
                }}
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Two-Sentence Quote */}
                  <p className="font-body text-sm sm:text-[15px] leading-relaxed opacity-85 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: `${palette.ink}12` }}>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-sm tracking-tight">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs opacity-60">
                      {item.city}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                    style={{ backgroundColor: `${palette.accent}20`, color: palette.accent }}
                  >
                    Verified
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TestimonialCards;

