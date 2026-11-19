"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n";

export function ContactHero() {
  const { t } = useLanguage();

  return (
    <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono font-semibold uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{t("contact_page.label") || "Direct Studio Engagement"}</span>
      </div>
      <h1 className="font-heading font-black text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.12] tracking-[-0.025em] text-white">
        {t("contact_page.title_start") || "Let's Engineer Your"}{" "}
        <span className="inline-block bg-gradient-to-r from-[#7C5CFC] via-[#A78BFA] to-[#38BDF8] bg-clip-text text-transparent pb-1 pr-3 sm:pr-4 pl-1">
          {t("contact_page.title_highlight") || "Digital Empire"}
        </span>
      </h1>
      <p className="font-body text-[16px] sm:text-[18px] leading-[1.7] text-white/70 max-w-2xl mx-auto">
        {t("contact_page.subtitle") ||
          "Speak directly with our senior engineering architects in Mumbai. Fast turnaround in under one business day with a customized live prototype plan."}
      </p>
    </div>
  );
}

export default ContactHero;
