"use client";

import React, { useState, useRef, useEffect } from "react";
import { GymBarbellArt } from "@/app/demos/gym/components/GymBarbellArt";
import { CopperPotArt } from "@/app/demos/restaurant/components/CopperPotArt";
import { ClinicStethoscopeArt } from "@/app/demos/clinic/components/ClinicStethoscopeArt";
import { SalonArchArt } from "@/app/demos/salon/components/SalonArchArt";
import { JewelleryNecklaceArt } from "@/app/demos/jewellery/components/JewelleryNecklaceArt";
import { ShopProductCollageArt } from "@/app/demos/shop/components/ShopProductCollageArt";
import { ClassesStackedArt } from "@/app/demos/classes/components/ClassesStackedArt";
import { EnterpriseArchitectureArt } from "@/app/demos/enterprise/components/EnterpriseArchitectureArt";

interface DemoStackViewportProps {
  id: string;
  name: string;
  domain: string;
  tagline: string;
  isActive: boolean;
  scrollProgress: number;
}

const DEMO_META: Record<
  string,
  {
    headline: string;
    subhead: string;
    bg: string;
    text: string;
    accent: string;
    Art: React.ComponentType;
  }
> = {
  gym: {
    headline: "Heavy iron. Pure conditioning. Zero fluff.",
    subhead: "Calibrated Eleiko plates, progressive overload, and certified coaches in Nashik.",
    bg: "#0F1113",
    text: "#F5F5F5",
    accent: "#E11D2E",
    Art: GymBarbellArt,
  },
  restaurant: {
    headline: "Bombay flavours, slow-cooked since 2016.",
    subhead: "Coastal and Mumbai street classics served in a warm, unhurried room in Nashik.",
    bg: "#FBF6EE",
    text: "#2A1A1A",
    accent: "#7A1F2B",
    Art: CopperPotArt,
  },
  clinic: {
    headline: "Specialist care, booked in under a minute.",
    subhead: "Dermatology and general medicine in Nashik. Instant WhatsApp slot allocation.",
    bg: "#F4F9F9",
    text: "#1E2A32",
    accent: "#0F8A8A",
    Art: ClinicStethoscopeArt,
  },
  salon: {
    headline: "Unapologetic luxury for hair, skin & bridal couture.",
    subhead: "A calm, private sanctuary where bespoke bridal styling is performed unhurriedly.",
    bg: "#FBF4EF",
    text: "#2B1F1F",
    accent: "#A4565F",
    Art: SalonArchArt,
  },
  jewellery: {
    headline: "Handcrafted jewellery, certified in gold.",
    subhead: "BIS 916 hallmarked gold and polki pieces, designed in Pune and made to your measure.",
    bg: "#0B0B0C",
    text: "#F3EFE6",
    accent: "#C9A24B",
    Art: JewelleryNecklaceArt,
  },
  shop: {
    headline: "Everyday essentials, delivered in 48 hours.",
    subhead: "Home, kitchen, and wellness products with COD, UPI autopay, and 7-day returns.",
    bg: "#F7F8FA",
    text: "#14161C",
    accent: "#3B3FD8",
    Art: ShopProductCollageArt,
  },
  classes: {
    headline: "Learn something new every week.",
    subhead: "Dance, art, music, and fitness classes for kids and adults in Nashik.",
    bg: "#2A1B5C",
    text: "#FFFFFF",
    accent: "#FFC93C",
    Art: ClassesStackedArt,
  },
  enterprise: {
    headline: "Operations software that runs while your team sleeps.",
    subhead: "Custom platforms, CRM and WhatsApp automation, and AI assistants built for mid-size businesses.",
    bg: "#0B1B33",
    text: "#F3F6FA",
    accent: "#2F6FD6",
    Art: EnterpriseArchitectureArt,
  },
};

export function DemoStackViewport({
  id,
  name,
  domain,
  tagline,
  isActive,
  scrollProgress,
}: DemoStackViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1040);
  const [containerHeight, setContainerHeight] = useState(600);
  const [shouldMountIframe, setShouldMountIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const meta = DEMO_META[id] || DEMO_META.gym;
  const ArtComponent = meta.Art;

  // Window resize measurement (avoids firing continuous ResizeObserver callbacks during animation)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Delay mounting the live iframe until scrolling settles on the active card
  // This completely eliminates frame drops and scroll jitter during fast deck traversal
  useEffect(() => {
    if (!isActive) {
      setShouldMountIframe(false);
      setIframeLoaded(false);
      return;
    }
    const timer = setTimeout(() => {
      setShouldMountIframe(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [isActive]);

  // Compute fluid desktop scaling for 1200px reference website
  const baseWidth = 1200;
  const scale = Math.max(0.25, Math.min(1, containerWidth / baseWidth));
  const virtualHeight = Math.round(containerHeight / scale);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ backgroundColor: meta.bg }}
    >
      {/* 1. Redesigned Website Visual Hero Poster (Always crisp, instant load, zero lag) */}
      <div
        className={`absolute inset-0 flex items-center justify-between p-4 sm:p-8 lg:p-12 transition-opacity duration-500 ${
          iframeLoaded && isActive ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ color: meta.text }}
      >
        <div className="max-w-md sm:max-w-lg z-10 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider border"
              style={{
                backgroundColor: `${meta.accent}20`,
                borderColor: `${meta.accent}40`,
                color: meta.accent,
              }}
            >
              LIVE PROTOTYPE · 2026 EDITION
            </span>
          </div>

          <h3
            className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight"
            style={{ color: meta.text }}
          >
            {meta.headline}
          </h3>

          <p
            className="text-xs sm:text-sm leading-relaxed opacity-80 max-w-sm sm:max-w-md line-clamp-2 sm:line-clamp-3"
            style={{ color: meta.text }}
          >
            {meta.subhead}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shadow-md"
              style={{
                backgroundColor: meta.accent,
                color: id === "classes" || id === "jewellery" ? "#000000" : "#FFFFFF",
              }}
            >
              <span>Explore Live Flow</span>
              <span>→</span>
            </span>
            <span className="text-[11px] font-mono opacity-60 truncate">
              {domain}
            </span>
          </div>
        </div>

        {/* Finished Vector Artwork for this specific redesigned website */}
        <div className="w-1/2 max-w-[340px] lg:max-w-[420px] aspect-[4/3] shrink-0 hidden sm:flex items-center justify-center relative">
          <ArtComponent />
        </div>
      </div>

      {/* 2. Live Interactive Latest Version Next JS Website Iframe for Active Card */}
      {shouldMountIframe && (
        <iframe
          src={`/demos/${id}?embed=1`}
          title={`${name} live production website`}
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
          className={`absolute top-0 left-0 border-none pointer-events-none origin-top-left transition-opacity duration-500 ${
            iframeLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: `${baseWidth}px`,
            height: `${virtualHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      )}

      {/* Dark Scrim overlay on inactive background cards */}
      {!isActive && (
        <div className="absolute inset-0 bg-black/45 hover:bg-black/25 transition-colors backdrop-blur-[0.5px] pointer-events-none" />
      )}
    </div>
  );
}

