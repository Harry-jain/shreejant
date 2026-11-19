"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const verifiedList = TESTIMONIALS.filter((t) => t.verified === true);

  if (verifiedList.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-black/[0.02] dark:bg-white/[0.01]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#7C5CFC]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="site-container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 text-[#7C5CFC] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            Client Outcomes
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-ink dark:text-white tracking-[-0.04em] leading-[1.08]">
            Don&apos;t Take Our Word for It
          </h2>
          <p className="font-body text-base sm:text-lg text-ink/70 dark:text-white/70 mt-3 max-w-xl mx-auto">
            Real feedback from business owners and founders scaling with Shreejan AI infrastructure across India.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {verifiedList.map((item, idx) => {
            const isDarkCard = idx === 1;

            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-7 sm:p-8 rounded-[24px] border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#7C5CFC]/40 ${
                  isDarkCard
                    ? "bg-[#101420] text-white border-white/10"
                    : "bg-white dark:bg-[#12151F] text-ink dark:text-white border-black/10 dark:border-white/10"
                }`}
              >
                <div>
                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm tracking-widest mb-4">
                    ★★★★★
                  </div>

                  {/* Quote Text */}
                  <p className="font-body text-[16px] sm:text-[17px] leading-[1.6] tracking-[-0.01em] italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-base">
                      {item.name}
                    </h4>
                    <span className="font-mono text-xs opacity-70">
                      {item.businessType} · {item.city}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Verified Client" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
