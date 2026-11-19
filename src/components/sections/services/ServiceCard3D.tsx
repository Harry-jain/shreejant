"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Layers, ArrowRight, Sparkles, CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceItem } from "@/types";
import { useLanguage } from "@/i18n";
import { getPerfMode } from "@/lib/perf";

const DynamicJewelleryDemo = dynamic(
  () => import("@/components/demo/JewelleryHomeDemo").then((m) => m.JewelleryHomeDemo),
  {
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-white/70 rounded-2xl animate-pulse">
        <Sparkles className="w-8 h-8 text-[#A78BFA] mb-2" />
        <span className="text-sm font-heading font-medium text-brand-text">Loading interactive demo...</span>
      </div>
    ),
    ssr: false,
  }
);

const DynamicVaultDemo = dynamic(
  () => import("@/components/demo/VaultDashboardDemo").then((m) => m.VaultDashboardDemo),
  {
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-white/70 rounded-2xl animate-pulse">
        <Sparkles className="w-8 h-8 text-[#A78BFA] mb-2" />
        <span className="text-sm font-heading font-medium text-brand-text">Loading interactive demo...</span>
      </div>
    ),
    ssr: false,
  }
);

interface ServiceCard3DProps {
  service: ServiceItem;
  index: number;
}

export function ServiceCard3D({ service, index }: ServiceCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [demoMounted, setDemoMounted] = useState(false);
  const [isLite, setIsLite] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const checkPerf = () => setIsLite(getPerfMode() === 'lite');
    checkPerf();
    window.addEventListener('shreejan_perf_change', checkPerf);
    return () => window.removeEventListener('shreejan_perf_change', checkPerf);
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-8 h-8" />,
    Layers: <Layers className="w-8 h-8" />,
  };

  const getDeliverables = (serviceId: string, fallback: string[]) => {
    const key = serviceId === "ai-websites" ? "services_items.ai_websites" : "services_items.custom_web_apps";
    const localized = [1, 2, 3, 4, 5, 6].map((i) => t(`${key}.d${i}`));
    if (localized[0] && localized[0] !== `${key}.d1`) {
      return localized;
    }
    return fallback;
  };

  const getInvestmentTier = (_serviceId: string, fallback: string) => {
    const localized = t("services.tier_custom");
    if (localized && localized !== "services.tier_custom") {
      return localized;
    }
    return fallback || "Custom Quote";
  };

  const getTimeline = (serviceId: string, fallback: string) => {
    const key = serviceId === "ai-websites" ? "services_items.ai_websites" : "services_items.custom_web_apps";
    const localized = t(`${key}.timeline`);
    if (localized && localized !== `${key}.timeline`) {
      return localized;
    }
    return fallback;
  };

  const shouldRenderDemo = isHovered && (!isLite || demoMounted);

  return (
    <div
      id={service.id}
      className="scroll-mt-28 w-full [perspective:1400px]"
      onMouseEnter={() => !prefersReducedMotion && setIsHovered(true)}
      onMouseLeave={() => !prefersReducedMotion && setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
    >
      <motion.div
        className="relative w-full rounded-3xl border border-brand-border bg-brand-surface shadow-lg transition-all duration-500 [transform-style:preserve-3d]"
        animate={{
          rotateY: isHovered && !prefersReducedMotion ? 180 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* FRONT SIDE (0deg) */}
        <div className="p-8 sm:p-12 [backface-visibility:hidden]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-brand-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#7C5CFC]/15 text-[#A78BFA] flex items-center justify-center shrink-0">
                {iconMap[service.iconName] || <Globe className="w-8 h-8" />}
              </div>
              <div>
                <span className="text-xs font-tech font-semibold text-[#A78BFA] uppercase tracking-wider block mb-1">
                  Capability 0{index + 1}
                </span>
                <h3
                  className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-text tracking-tight"
                  style={{ textTransform: "none" }}
                >
                  {service.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-tech text-brand-muted">
              <div>
                Delivery: <strong className="text-brand-text">{getTimeline(service.id, service.timeline)}</strong>
              </div>
              <span>•</span>
              <div>
                Investment: <strong className="text-[#A78BFA]">{getInvestmentTier(service.id, service.investmentTier)}</strong>
              </div>
            </div>
          </div>

          <p className="font-body text-[16px] sm:text-[18px] leading-[1.7] text-brand-muted max-w-4xl mb-8">
            {service.shortDescription}
          </p>

          <div className="mb-8">
            <h4 className="font-mono text-xs text-[#A78BFA] uppercase tracking-wider mb-4">
              Architectural Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getDeliverables(service.id, service.deliverables).map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-brand-text">
                  <CheckCircle2 className="w-4 h-4 text-[#A78BFA] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-full bg-brand-bg text-brand-muted border border-brand-border"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-brand-border">
            <div className="flex items-center gap-2 text-xs font-heading font-medium text-[#A78BFA]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("services_page.flip_to_demo") || "Hover card to view live interactive demo ↷"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Button href={`/services/${service.slug}`} variant="ghost">
                {t("services_page.view_deep_dive")}
              </Button>
              <Button href="/contact?intent=demo" variant="primary" size="sm">
                {t("nav.book_demo") || "Book a demo"}
              </Button>
            </div>
          </div>
        </div>

        {/* BACK SIDE (180deg flipped) */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl border-2 border-[#7C5CFC]/50 bg-[#0C0F1A] p-6 sm:p-8 flex flex-col justify-between [backface-visibility:hidden] z-20 shadow-2xl overflow-hidden"
          style={{
            transform: "rotateY(180deg)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          {shouldRenderDemo || isHovered ? (
            service.id === "ai-websites" ? (
              <DynamicJewelleryDemo />
            ) : (
              <DynamicVaultDemo />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#121626] rounded-2xl border border-white/10">
              <Sparkles className="w-8 h-8 text-[#7C5CFC] mb-2 animate-pulse" />
              <span className="text-sm font-heading font-medium text-white">Loading interactive prototype...</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
