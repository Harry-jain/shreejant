"use client";

import React from "react";
import { useLanguage } from "@/i18n";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = "",
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  const { lang } = useLanguage();
  const isLatin = lang === "en";

  const eyebrowClasses =
    "px-3.5 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] font-mono text-xs font-semibold uppercase tracking-wider mb-3 inline-flex items-center gap-2";

  const headingClasses =
    HeadingTag === "h1"
      ? "font-heading font-black text-[clamp(2.75rem,5.5vw,5.2rem)] leading-[1.08] text-white tracking-[-0.025em] px-1"
      : "font-heading font-black text-[clamp(2.1rem,3.8vw,3.5rem)] leading-[1.1] text-white tracking-[-0.025em] px-1";

  return (
    <div className={`space-y-3 ${centered ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && <span className={eyebrowClasses}>{eyebrow}</span>}
      <HeadingTag className={headingClasses}>{title}</HeadingTag>
      {subtitle && (
        <p className={`font-body text-[16px] sm:text-[18px] leading-[1.7] text-white/70 ${centered ? "max-w-3xl mx-auto" : "max-w-4xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
