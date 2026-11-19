"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CurvedRibbon() {
  const prefersReducedMotion = useReducedMotion();

  const textPhrase = "THE BOND BEHIND BRAND SUCCESS · SHREEJAN AI SOLUTIONS · DIGITAL FLAGSHIPS THAT CONVERT · ";

  return (
    <section className="relative w-full overflow-hidden py-6 sm:py-10 select-none">
      {/* Curved / Angled Violet Banner Background */}
      <div className="relative w-full -rotate-1 bg-[#7C5CFC] py-5 sm:py-8 shadow-[0_12px_36px_rgba(124,92,252,0.4)] overflow-hidden">
        
        {/* Subtle decorative wavy SVG border lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path
              d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Marquee ticker */}
        <div className="flex w-fit whitespace-nowrap">
          <motion.div
            className="flex items-center gap-6 text-white font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-[-0.01em] uppercase"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: ["0%", "-50%"],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span>{textPhrase}</span>
            <span>{textPhrase}</span>
            <span>{textPhrase}</span>
            <span>{textPhrase}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

