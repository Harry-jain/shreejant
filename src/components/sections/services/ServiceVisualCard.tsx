"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ServiceItem } from "@/types";
import {
  WebsitesDeveloperVisual,
  CustomWebAppsVisual,
  WebsiteAuditVisual,
  UIUXRedesignVisual,
} from "./ServiceVisualPanels";
import {
  VERIFIED_SERVICE_TECH,
  TechLogo,
} from "./ServiceTechLogos";

interface ServiceVisualCardProps {
  service: ServiceItem;
  variant?: "grid" | "stacked";
  index?: number;
  totalCards?: number;
}

export function ServiceVisualCard({
  service,
  variant = "grid",
  index = 0,
  totalCards = 3,
}: ServiceVisualCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Render the appropriate visual panel based on service id
  const renderVisual = () => {
    switch (service.id) {
      case "websites":
      case "ai-websites":
        return <WebsitesDeveloperVisual isCardHovered={isHovered} />;
      case "custom-web-apps":
        return <CustomWebAppsVisual isCardHovered={isHovered} />;
      case "website-audit":
        return <WebsiteAuditVisual isCardHovered={isHovered} />;
      case "ui-ux-redesign":
        return <UIUXRedesignVisual isCardHovered={isHovered} />;
      default:
        return <WebsitesDeveloperVisual isCardHovered={isHovered} />;
    }
  };

  const serviceNumber = service.number || `0${index + 1}`;
  const serviceLabel =
    service.label ||
    (service.id === "websites"
      ? "LATEST NEXT.JS SSR"
      : service.id === "custom-web-apps"
      ? "ENTERPRISE ARCHITECTURE"
      : service.id === "website-audit"
      ? "FORENSIC OPTIMIZATION"
      : "SPATIAL & CONVERSION UX");

  const tags = service.tags || [
    "Latest version Next JS SSR",
    "Sub-50ms TTFB",
    "100% Code Ownership",
    "Mobile-First",
  ];

  const proofPoint =
    service.proofPoint ||
    (service.id === "websites"
      ? "+340% average lead conversion vs legacy WordPress"
      : service.id === "custom-web-apps"
      ? "Zero recurring SaaS tax · Complete custom database IP"
      : service.id === "ui-ux-redesign"
      ? "+260% user engagement · 65% reduction in checkout drop-offs"
      : "Delivered in 48 hours · 100% fee credited back against build");

  const deliveryTime = service.deliveryTime || service.timeline || "7–10 Business Days";
  const ctaText =
    service.ctaText ||
    (service.id === "website-audit"
      ? "Request Audit (₹499)"
      : service.id === "custom-web-apps"
      ? "Engineer Your App"
      : service.id === "ui-ux-redesign"
      ? "Request UI/UX Redesign"
      : "Start Website Build");
  const ctaHref = service.ctaHref || `/contact?service=${service.slug}`;

  // =========================================================================
  // VARIANT: STACKED (Used on /services page)
  // Sticky, horizontal on desktop (visual on left, text on right), vertical on mobile.
  // =========================================================================
  if (variant === "stacked") {
    // Offset stacking: top: 96px + (index * 16px)
    const stickyTop = `calc(96px + ${index * 16}px)`;

    return (
      <div
        className="sticky w-full transition-all duration-300"
        style={{
          top: stickyTop,
          zIndex: index + 10,
        }}
      >
        <motion.div
          onMouseEnter={() => !prefersReducedMotion && setIsHovered(true)}
          onMouseLeave={() => !prefersReducedMotion && setIsHovered(false)}
          className="relative w-full rounded-[24px] sm:rounded-[32px] bg-[#0B0E19] border border-white/12 p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 hover:border-[#7C5CFC]/40"
        >
          {/* Subtle top glow accent */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[150px] bg-[#7C5CFC]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Desktop Horizontal (Visual Left, Text Right) / Mobile Vertical */}
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
            
            {/* Visual Panel: Left on desktop (w-[44%]), top on mobile */}
            <div className="w-full lg:w-[44%] h-[180px] sm:h-[220px] lg:h-[340px] rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-[#07090F] shadow-inner relative">
              {renderVisual()}
            </div>

            {/* Text Block: Right on desktop, bottom on mobile */}
            <div className="flex-1 flex flex-col justify-between">
              
              <div>
                {/* 1. Service Number & Label */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="font-mono text-xs font-bold text-[#A78BFA] px-2.5 py-0.5 rounded-full bg-[#7C5CFC]/20 border border-[#7C5CFC]/35">
                    {serviceNumber}
                  </span>
                  <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider font-semibold">
                    {serviceLabel}
                  </span>
                </div>

                {/* 2. Title */}
                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-4">
                  {service.title}
                </h3>

                {/* 4. Verified Technology Stack Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {(VERIFIED_SERVICE_TECH[
                    service.id === "websites" || service.id === "ai-websites"
                      ? "websites"
                      : service.id === "custom-web-apps"
                      ? "custom-web-apps"
                      : "website-audit"
                  ] || []).map((badge) => (
                    <div
                      key={badge.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#7C5CFC]/35 transition-colors"
                    >
                      <TechLogo id={badge.id} className="w-4 h-4 shrink-0" />
                      <span className="font-heading font-bold text-xs text-white">
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 5. Proof Point */}
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl mb-6">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{proofPoint}</span>
                </div>
              </div>

              {/* 6. Footer (Pinned to bottom via margin-top: auto) */}
              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4 text-[#A78BFA]" />
                  <span className="text-xs sm:text-sm font-heading font-semibold">
                    Delivery: <strong className="text-white">{deliveryTime}</strong>
                  </span>
                </div>

                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(124,92,252,0.45)] hover:shadow-[0_6px_28px_rgba(124,92,252,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT: GRID (Used on Homepage equal-height bento)
  // Height: 100%, visual panel on top (220px desktop, 180px mobile), text block below.
  // Footers pinned to bottom with margin-top: auto.
  // =========================================================================
  return (
    <div
      onMouseEnter={() => !prefersReducedMotion && setIsHovered(true)}
      onMouseLeave={() => !prefersReducedMotion && setIsHovered(false)}
      className="group h-full flex flex-col rounded-[24px] sm:rounded-[28px] bg-[#0E121E]/90 border border-white/10 hover:border-[#7C5CFC]/45 transition-all duration-300 p-6 sm:p-7 shadow-xl hover:shadow-[0_16px_40px_rgba(124,92,252,0.18)] select-none relative overflow-hidden backdrop-blur-xl"
    >
      {/* Subtle hover background glow */}
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#7C5CFC]/10 blur-3xl pointer-events-none group-hover:bg-[#7C5CFC]/20 transition-colors" />

      {/* 1. Visual Panel (Hero Showcase: 265px desktop, 225px mobile) */}
      <div className="w-full h-[225px] sm:h-[265px] rounded-2xl overflow-hidden shrink-0 mb-4 bg-[#07090F] border border-white/[0.08] relative shadow-inner">
        {renderVisual()}
      </div>

      {/* 2. Service Number & Category Tag */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[11px] font-bold text-[#A78BFA] px-2 py-0.5 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30">
          {serviceNumber}
        </span>
        <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider font-semibold">
          {serviceLabel}
        </span>
      </div>

      {/* 3. Title */}
      <h3 className="font-heading font-black text-xl sm:text-[22px] text-white tracking-tight mb-3 group-hover:text-[#F4F7FB] transition-colors">
        {service.title}
      </h3>

      {/* 4. Minimalist Tech Stack (Clean, subtle inline pills) */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        {(VERIFIED_SERVICE_TECH[
          service.id === "websites" || service.id === "ai-websites"
            ? "websites"
            : service.id === "custom-web-apps"
            ? "custom-web-apps"
            : "website-audit"
        ] || []).slice(0, 4).map((badge) => (
          <span
            key={badge.id}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] text-[10.5px] font-mono text-white/75"
          >
            <TechLogo id={badge.id} className="w-3 h-3 shrink-0 opacity-80" />
            <span>{badge.name}</span>
          </span>
        ))}
      </div>

      {/* 5. Footer (Pinned to bottom of card via margin-top: auto) */}
      <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex flex-col shrink-0">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
            Delivery
          </span>
          <span className="text-xs sm:text-sm font-heading font-bold text-white/95 whitespace-nowrap">
            {deliveryTime}
          </span>
        </div>

        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center gap-1.5 h-10 px-3.5 sm:px-4 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-semibold text-xs whitespace-nowrap shrink-0 shadow-[0_4px_16px_rgba(124,92,252,0.4)] hover:shadow-[0_6px_22px_rgba(124,92,252,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all"
        >
          <span>{ctaText}</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>
    </div>
  );
}

export default ServiceVisualCard;

