"use client";

import React from "react";
import { FadeUp } from "./FadeUp";

export interface TrustStat {
  value: string;
  label: string;
}

export interface TrustStripProps {
  stats: TrustStat[];
  palette: {
    bg: string;
    surface: string;
    ink: string;
    accent: string;
  };
}

export function TrustStrip({ stats, palette }: TrustStripProps) {
  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-y" style={{ borderColor: `${palette.ink}12` }}>
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          {/* 4 Stats in a row on desktop, 2x2 on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3">
                <span
                  className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-none mb-1.5"
                  style={{ color: palette.accent }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-mono text-xs sm:text-[13px] uppercase tracking-wider opacity-70"
                  style={{ color: palette.ink }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default TrustStrip;

