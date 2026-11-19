"use client";

import React from "react";
import { Globe, KeyRound, Server } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n";

export function TrustBar() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const pillars = [
    {
      icon: Globe,
      title: t("trust_bar.t1_title") || "Pan-India Delivery",
      subtitle: t("trust_bar.t1_sub") || "Mumbai HQ engineering serving forward-thinking businesses across India.",
    },
    {
      icon: KeyRound,
      title: t("trust_bar.t3_title") || "100% Code Ownership",
      subtitle: t("trust_bar.t3_sub") || "Zero vendor lock-in. Full source code, models, and databases belong to you.",
    },
    {
      icon: Server,
      title: t("trust_bar.t4_title") || "Autonomous Infra",
      subtitle: t("trust_bar.t4_sub") || "Edge deployed on latest version Next JS SSR with lightning fast <50ms TTFB worldwide.",
    },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 transition-colors duration-300 border-y border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.01] overflow-hidden">
      {/* Background ambient radial flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7C5CFC]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="site-container-wide relative z-10">
        {/* 3 Pillar Cards — SickDevs Studio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 sm:p-8 rounded-[24px] bg-white dark:bg-[#12151F] border border-black/10 dark:border-white/10 hover:border-[#7C5CFC]/40 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7C5CFC]/10 text-[#7C5CFC] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#7C5CFC] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-ink dark:text-white">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-ink/70 dark:text-white/70 mt-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
