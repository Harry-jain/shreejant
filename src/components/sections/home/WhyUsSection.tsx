"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function WhyUsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-us"
      className="relative w-full py-20 sm:py-28 md:py-36 lg:py-44 overflow-hidden flex items-center justify-center text-center select-none bg-transparent text-ink dark:text-white"
    >
      {/* 1. Subtle purple ambient glow behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] md:w-[750px] h-[220px] sm:h-[300px] md:h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,252,0.18)_0%,rgba(124,92,252,0.04)_50%,transparent_75%)] blur-[90px] sm:blur-[120px] -z-0"
      />

      <div className="relative z-10 site-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Subtle viewport entrance animation */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow Label: small, uppercase and letter-spaced */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/25 shadow-sm mb-6 sm:mb-8 md:mb-10">
            <span className="font-mono text-xs sm:text-[13px] font-medium tracking-[0.24em] uppercase text-[#7C5CFC] dark:text-[#A78BFA]">
              WHY SHREEJAN AI
            </span>
          </div>

          {/* Main Headline: Prominently across two lines with highlighted 'what's next.' */}
          <h2 className="font-heading font-black text-[clamp(2.35rem,6.2vw,5.5rem)] leading-[1.1] sm:leading-[1.08] tracking-[-0.035em] text-ink dark:text-[#F4F7FB]">
            <span className="block">Built for your business.</span>
            <span className="block mt-1 sm:mt-2.5">
              Ready for{" "}
              <span className="text-[#7C5CFC] dark:text-[#A78BFA] inline-block drop-shadow-[0_0_24px_rgba(124,92,252,0.45)]">
                what&apos;s next.
              </span>
            </span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyUsSection;
