"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryCta } from "@/components/PrimaryCta";
import { useLanguage } from "@/i18n";

export function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q8"), a: t("faq.a8") },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-[clamp(60px,8vw,100px)]">
      <div className="site-container-narrow">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionHeading
            eyebrow={t("faq.label")}
            title={t("faq.title")}
            subtitle={t("faq.subtitle")}
            centered
          />
        </div>

        <div className="space-y-4 mb-12">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <GlassCard
                key={idx}
                className="overflow-hidden p-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[44px] px-6 py-4 flex items-center justify-between text-left gap-4 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] cursor-pointer"
                >
                  <span className="font-heading font-medium text-base sm:text-lg text-brand-text">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7C5CFC] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 font-body text-sm sm:text-base text-ink/70 dark:text-white/70 leading-relaxed border-t border-black/10 dark:border-white/10">
                    {item.a}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        <div className="text-center">
          <p className="font-body text-sm text-brand-muted mb-4">
            {t("faq.more_questions")}
          </p>
          <PrimaryCta size="md" />
        </div>
      </div>
    </section>
  );
}
