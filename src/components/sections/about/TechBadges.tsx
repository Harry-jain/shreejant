"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/i18n";

const BADGES = [
  "Latest version Next JS App Router",
  "React 19 Server Components",
  "TypeScript 5.7 Strict",
  "Tailwind CSS v4",
  "Three.js & WebGL 3D",
  "Framer Motion 12",
  "LangChain AI Agents",
  "Meta WhatsApp Cloud API",
  "Python & FastAPI",
  "PostgreSQL & pgvector",
  "Pinecone Vector Engine",
  "Vercel Edge Network",
  "Docker Containerization",
  "Razorpay UPI",
];

export function TechBadges() {
  const { t } = useLanguage();

  return (
    <section className="py-20 site-container text-center">
      <Badge size="sm" className="mb-4">
        {t("about_page.tech_philosophy")}
      </Badge>
      <h2
        className="font-heading font-extrabold text-[clamp(26px,3.2vw,40px)] text-brand-text mb-10 tracking-tight"
        style={{ textTransform: "none" }}
      >
        {t("about_page.tech_standards")}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
        {BADGES.map((b, idx) => (
          <span
            key={idx}
            className="px-4.5 py-2.5 rounded-[12px] text-xs sm:text-[13px] font-mono font-medium glass text-brand-text hover:border-[#7C5CFC]/50 hover:shadow-xs transition-all duration-200"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
