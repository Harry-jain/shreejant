"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandWatermark } from "@/components/ui/BrandWatermark";
import { useLanguage } from "@/i18n";

export function BlogHero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-[clamp(80px,10vw,120px)] pb-16 text-center overflow-hidden">
      {/* Soft ambient background lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#7C5CFC]/15 via-[#7C5CFC]/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <BrandWatermark text="IDEAS" position="center" className="opacity-10" />
      <div className="relative z-10 site-container max-w-5xl mx-auto">
        <SectionHeading
          eyebrow={t("blog_page.hero_label")}
          title={
            <>
              {t("blog_page.hero_title_start")}{" "}
              <span className="inline-block bg-gradient-to-r from-[#A78BFA] via-[#7C5CFC] to-[#38BDF8] bg-clip-text text-transparent pb-1 pr-3 sm:pr-4 pl-1">
                {t("blog_page.hero_title_highlight")}
              </span>
            </>
          }
          subtitle={t("blog_page.hero_desc")}
          centered
          as="h1"
        />
      </div>
    </section>
  );
}
