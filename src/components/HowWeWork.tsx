"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLanguage } from "@/i18n";
import { PhoneCall, FileText, Layout, Code2, Rocket } from "lucide-react";

export function HowWeWork() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: PhoneCall,
      title: t("how_we_work.step1_title"),
      desc: t("how_we_work.step1_desc"),
    },
    {
      num: "02",
      icon: FileText,
      title: t("how_we_work.step2_title"),
      desc: t("how_we_work.step2_desc"),
    },
    {
      num: "03",
      icon: Layout,
      title: t("how_we_work.step3_title"),
      desc: t("how_we_work.step3_desc"),
    },
    {
      num: "04",
      icon: Code2,
      title: t("how_we_work.step4_title"),
      desc: t("how_we_work.step4_desc"),
    },
    {
      num: "05",
      icon: Rocket,
      title: t("how_we_work.step5_title"),
      desc: t("how_we_work.step5_desc"),
    },
  ];

  return (
    <section id="process" className="relative py-[clamp(60px,8vw,100px)]">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionHeading
            eyebrow={t("how_we_work.label")}
            title={t("how_we_work.title")}
            subtitle={t("how_we_work.subtitle")}
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <GlassCard
                key={idx}
                className="p-6 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#7C5CFC]">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#7C5CFC]/15 text-[#7C5CFC] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-heading font-medium text-base text-brand-text mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
