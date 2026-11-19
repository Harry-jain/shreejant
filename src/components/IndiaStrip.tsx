"use client";

import React from "react";
import { PhoneCall, MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function IndiaStrip() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: PhoneCall,
      title: t("india_strip.step1_title"),
      desc: t("india_strip.step1_desc"),
    },
    {
      icon: MessageSquare,
      title: t("india_strip.step2_title"),
      desc: t("india_strip.step2_desc"),
    },
    {
      icon: ExternalLink,
      title: t("india_strip.step3_title"),
      desc: t("india_strip.step3_desc"),
    },
    {
      icon: ShieldCheck,
      title: t("india_strip.step4_title"),
      desc: t("india_strip.step4_desc"),
    },
  ];

  return (
    <section className="relative w-full py-14 md:py-20">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeading
            eyebrow={t("india_strip.badge")}
            title={t("india_strip.title")}
            subtitle={t("india_strip.subtitle")}
            centered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <GlassCard
                key={idx}
                className="p-5 flex flex-col justify-start transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#7C5CFC]/15 text-[#7C5CFC] flex items-center justify-center mb-4 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className="font-heading font-medium text-base text-brand-text mb-1.5"
                  style={{ textTransform: "none" }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {step.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
