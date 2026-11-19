"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { BrandWatermark } from "@/components/ui/BrandWatermark";
import { AuditForm } from "@/components/sections/audit/AuditForm";
import { IndiaStrip } from "@/components/IndiaStrip";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { useLanguage } from "@/i18n";

export function AuditPageContent() {
  const { t } = useLanguage();

  return (
    <div className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)] overflow-hidden">
      <BrandWatermark text="AUDIT" position="top" className="opacity-10" />

      <div className="relative z-10 site-container space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge size="sm">{t("audit_page.badge")}</Badge>
          <h1
            className="font-heading font-bold text-[clamp(34px,4.5vw,52px)] leading-tight tracking-[-1px] text-brand-text"
            style={{ textTransform: "none" }}
          >
            {t("audit_page.title")}
          </h1>
          <p className="font-body text-base sm:text-lg text-brand-muted leading-relaxed">
            {t("audit_page.subtitle")}
          </p>
        </div>

        {/* Dedicated Audit Intake Form */}
        <AuditForm />

        <GoldDivider withDiamond />

        {/* Remote All-India Service Strip */}
        <IndiaStrip />
      </div>
    </div>
  );
}
