"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function DemoNudge() {
  return (
    <section
      className="relative w-full py-10 sm:py-12 border-y border-[#7C5CFC]/30 bg-gradient-to-r from-[#0A0D16] via-[#121626] to-[#0A0D16] overflow-hidden select-none"
      aria-label="Demo prompt"
    >
      {/* Background radial violet glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-36 bg-[#7C5CFC]/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 site-container-wide flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] font-mono text-[11px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>INTERACTIVE ARCHITECTURE SUITE</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white tracking-tight leading-snug">
            Not sure what you need? See a live architecture for your business.
          </h3>
          <p className="text-xs sm:text-sm text-white/75 font-body leading-relaxed">
            Explore 8 live, full-stack website prototypes built for Indian enterprises, or book a 1-on-1 architecture walkthrough with our engineering leads.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/#demos"
            className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(124,92,252,0.6)] hover:shadow-[0_0_55px_rgba(124,92,252,0.85)] hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            <span>Book a Live Demo</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DemoNudge;