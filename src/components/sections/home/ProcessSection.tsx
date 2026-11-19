"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n";

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("process.s1_title") || "Discovery Call",
      subtitle: t("process.s1_sub") || "30-Minute Architecture Audit",
      description:
        t("process.s1_desc") ||
        "We unpack your business bottlenecks, evaluate current conversion drop-offs, and identify the highest-leverage AI opportunities for your market.",
    },
    {
      number: "02",
      title: t("process.s2_title") || "Strategy & Blueprint",
      subtitle: t("process.s2_sub") || "Fixed-Scope Architecture",
      description:
        t("process.s2_desc") ||
        "Within 48 hours, you receive a technical architecture roadmap, wireframes, fixed milestone timelines, and transparent investment terms.",
    },
    {
      number: "03",
      title: t("process.s3_title") || "Build & Review",
      subtitle: t("process.s3_sub") || "High-Velocity Development",
      description:
        t("process.s3_desc") ||
        "We engineer your platform with the latest version of Next.js, test responsive breakpoints, connect AI models, and host staging previews for iterative feedback.",
    },
    {
      number: "04",
      title: t("process.s4_title") || "Launch & Support",
      subtitle: t("process.s4_sub") || "Production Deployment",
      description:
        t("process.s4_desc") ||
        "We deploy to edge CDN, configure structured JSON-LD schemas, verify 95+ Core Web Vitals, and provide 30 days of complimentary engineering support.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative py-20 sm:py-28 overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#7C5CFC]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="site-container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 text-[#7C5CFC] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            {t("process.label") || "OUR BLUEPRINT"}
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-ink dark:text-white tracking-[-0.03em] leading-[1.08] mb-4">
            {t("process.title") || "How We Craft Your Solution"}
          </h2>
          <p className="font-body text-base sm:text-lg text-ink/70 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t("process.subtitle") ||
              "A battle-tested 4-stage engineering lifecycle designed to eliminate scope creep and deliver production-ready systems on time, every time."}
          </p>
        </div>

        {/* DESKTOP TIMELINE */}
        <div className="hidden lg:block relative py-12">
          {/* Continuous Circuit Connection Rail */}
          <div className="absolute top-[88px] left-[12.5%] right-[12.5%] -translate-y-1/2 h-[32px] pointer-events-none z-0">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#7C5CFC]/20 rounded-full" />
            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[2px] bg-gradient-to-r from-[#7C5CFC]/40 via-[#7C5CFC] to-[#38BDF8]/40 shadow-[0_0_12px_rgba(124,92,252,0.4)]" />

            {/* Traveling Data Pulse Packet Animation */}
            {!prefersReducedMotion && (
              <motion.div
                animate={{
                  left: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-[4px] rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#38BDF8] shadow-[0_0_16px_rgba(124,92,252,0.9)] z-20"
              />
            )}
          </div>

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center px-2 group"
              >
                {/* Technical Node Frame */}
                <div className="relative w-20 h-20 rounded-2xl border-2 border-[#7C5CFC]/40 bg-white dark:bg-[#12151F] flex items-center justify-center shadow-md transition-all duration-300 group-hover:border-[#7C5CFC] group-hover:shadow-[0_0_24px_rgba(124,92,252,0.35)] group-hover:-translate-y-1.5">
                  <div className="w-14 h-14 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col items-center justify-center transition-colors group-hover:bg-[#7C5CFC]/10">
                    <span className="font-mono font-bold text-lg text-[#7C5CFC] tracking-tight">
                      {step.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC]/60 mt-0.5 group-hover:bg-[#7C5CFC] group-hover:shadow-[0_0_6px_#7C5CFC] transition-all" />
                  </div>
                </div>

                {/* Step Details */}
                <div className="mt-8 space-y-1.5">
                  <h3 className="font-heading font-bold text-[18px] text-ink dark:text-white group-hover:text-[#7C5CFC] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <div className="font-mono text-[11px] font-semibold text-[#7C5CFC] tracking-[1px] uppercase">
                    {step.subtitle}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE & TABLET TIMELINE */}
        <div className="lg:hidden relative pl-8 sm:pl-12 space-y-6 my-6">
          <div className="absolute top-4 bottom-4 left-[18px] sm:left-[26px] w-[2px] bg-gradient-to-b from-[#7C5CFC] via-[#9D84FF] to-[#38BDF8] shadow-[0_0_12px_rgba(124,92,252,0.5)]" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex items-start gap-4 group">
              <div className="absolute -left-[28px] sm:-left-[36px] w-10 h-10 rounded-xl border-2 border-[#7C5CFC] bg-white dark:bg-[#12151F] flex items-center justify-center shrink-0 shadow-md">
                <span className="font-mono font-bold text-xs text-[#7C5CFC]">
                  {step.number}
                </span>
              </div>

              <div className="bg-white dark:bg-[#12151F] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 ml-4 w-full shadow-sm">
                <div className="font-mono text-[10.5px] font-semibold text-[#7C5CFC] uppercase tracking-wider mb-1">
                  {step.subtitle}
                </div>
                <h3 className="font-heading font-bold text-lg text-ink dark:text-white">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
