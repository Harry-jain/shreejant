"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";
import { GoldButton } from "@/components/ui/GoldButton";

interface PrimaryCtaProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "primary" | "ghost";
}

export function PrimaryCta({
  className = "",
  size = "md",
  href = "/contact",
  variant = "primary",
}: PrimaryCtaProps) {
  const { t } = useLanguage();

  const sizeClasses = {
    sm: "px-4 py-2 text-xs min-h-[44px]",
    md: "px-6 py-3 text-sm min-h-[44px]",
    lg: "px-8 py-4 text-base min-h-[48px]",
  };

  return (
    <GoldButton
      variant={variant}
      href={href}
      className={`${sizeClasses[size]} ${className}`}
    >
      <span>{t("cta.start")}</span>
      <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
    </GoldButton>
  );
}
