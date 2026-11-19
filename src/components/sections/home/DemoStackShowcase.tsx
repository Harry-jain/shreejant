"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ChevronUp,
  ChevronDown,
  Maximize2,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/brand";
import { DemoStackViewport } from "./DemoStackViewport";

export interface PrototypeItem {
  id: string;
  name: string;
  industry: string;
  domain: string;
  metric: string;
  image: string;
  tagline: string;
  categoryKey: string;
}

export const PROTOTYPES: PrototypeItem[] = [
  {
    id: "gym",
    name: "Ironforge Fitness",
    industry: "Fitness & Performance",
    categoryKey: "Gym",
    domain: "ironforgefitness.shreejan.ai",
    metric: "+185% Subscriptions · Trial Bot",
    image: "/assets/showcase/gym.webp",
    tagline: "High-yield membership conversion pipeline with automated trial booking.",
  },
  {
    id: "restaurant",
    name: "The Bombay Bistro",
    industry: "Fine Dining & Bar",
    categoryKey: "Restaurant",
    domain: "bombaybistro.shreejan.ai",
    metric: "1,400+ Tables/Mo · Zero No-Shows",
    image: "/assets/showcase/restaurant.webp",
    tagline: "Interactive chef tasting reservation with automated WhatsApp table confirmation.",
  },
  {
    id: "clinic",
    name: "Dr. Vora Clinic",
    industry: "Healthcare & AI OPD",
    categoryKey: "Clinic",
    domain: "drvoraclinic.shreejan.ai",
    metric: "99.4% Patient Match · Instant OPD",
    image: "/assets/showcase/clinic.webp",
    tagline: "HIPAA-compliant AI diagnostic intake with WhatsApp OPD appointment confirmation.",
  },
  {
    id: "salon",
    name: "Aura Studio",
    industry: "Luxury Salon & Spa",
    categoryKey: "Salon",
    domain: "aurastudio.shreejan.ai",
    metric: "+340% Bookings · 60s Flow",
    image: "/assets/showcase/salon.webp",
    tagline: "Organic bridal & hair appointments booked autonomously in under 60 seconds.",
  },
  {
    id: "jewellery",
    name: "Kanak Heritage Jewels",
    industry: "Luxury Jewelry",
    categoryKey: "Jewellery",
    domain: "kanakjewels.shreejan.ai",
    metric: "₹1.8Cr Vault Sales · Live Gold Rate",
    image: "/assets/showcase/jewellery.webp",
    tagline: "Certified hallmarked 22K gold & solitaire showcase with real-time rate ticker.",
  },
  {
    id: "shop",
    name: "Anayra Everyday Essentials",
    industry: "Everyday D2C Goods",
    categoryKey: "Shop",
    domain: "anayraessentials.shreejan.ai",
    metric: "48H Dispatch · Cash on Delivery",
    image: "/assets/showcase/shop.webp",
    tagline: "Everyday essentials delivered in 48 hours with instant COD & UPI checkout.",
  },
  {
    id: "classes",
    name: "Zenith Academy",
    industry: "EdTech & Academy",
    categoryKey: "Classes",
    domain: "zenithacademy.shreejan.ai",
    metric: "5,200+ Enrolled · Auto Assessment",
    image: "/assets/showcase/classes.webp",
    tagline: "Cohort registration portal with automated skill assessment and fee gateway.",
  },
  {
    id: "enterprise",
    name: "Nexus Enterprise AI",
    industry: "B2B Automation",
    categoryKey: "Enterprise",
    domain: "nexusai.shreejan.ai",
    metric: "24/7 Zero Human Drop · Lead Dispatch",
    image: "/assets/showcase/general.webp",
    tagline: "Autonomous sales qualification agent and real-time enterprise lead dispatch.",
  },
];

export function DemoStackShowcase() {
  // Default to index 3 ('salon') matching reference image
  const [activeIndex, setActiveIndex] = useState(3);
  const [scrollProgress, setScrollProgress] = useState(0.42);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync URL parameter if present on load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const demoParam = params.get("demo");
    if (demoParam) {
      const foundIdx = PROTOTYPES.findIndex((p) => p.id === demoParam);
      if (foundIdx !== -1) {
        setActiveIndex(foundIdx);
      }
    }
  }, []);

  // Scroll-driven Stack Progression: As user scrolls down the webpage, stack scrolls down
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) {
          ticking = false;
          return;
        }

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = el.offsetHeight - windowHeight;

        if (totalScrollable > 0) {
          // Check if sticky section is active in viewport
          if (rect.top <= 0 && rect.bottom >= windowHeight) {
            const currentScrolled = -rect.top;
            const progress = Math.min(1, Math.max(0, currentScrolled / totalScrollable));
            setScrollProgress(progress);

            const newIndex = Math.min(
              PROTOTYPES.length - 1,
              Math.max(0, Math.floor(progress * PROTOTYPES.length))
            );

            setActiveIndex((prev) => {
              if (prev !== newIndex) {
                return newIndex;
              }
              return prev;
            });
          } else if (rect.top > 0) {
            setActiveIndex(0);
          } else if (rect.bottom < windowHeight) {
            setActiveIndex(PROTOTYPES.length - 1);
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToItem = (idx: number) => {
    setActiveIndex(idx);

    if (typeof window !== "undefined" && sectionRef.current) {
      const el = sectionRef.current;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const totalScrollable = el.offsetHeight - window.innerHeight;

      if (totalScrollable > 0) {
        const targetScrollY = sectionTop + ((idx + 0.3) / PROTOTYPES.length) * totalScrollable;
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      }

      const url = new URL(window.location.href);
      url.searchParams.set("demo", PROTOTYPES[idx].id);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const handleSelectIndex = (idx: number) => {
    scrollToItem(idx);
  };

  const handleNext = useCallback(() => {
    const nextIdx = activeIndex < PROTOTYPES.length - 1 ? activeIndex + 1 : 0;
    scrollToItem(nextIdx);
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : PROTOTYPES.length - 1;
    scrollToItem(prevIdx);
  }, [activeIndex]);

  // Vertical Touch Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;
    const distance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext(); // Swipe up -> scroll down to next demo
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // Swipe down -> scroll up to prev demo
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };

  const activeItem = PROTOTYPES[activeIndex];

  return (
    <section
      id="demos"
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        }
      }}
      aria-label="Interactive Architecture Prototypes Vertical Stack"
      className="relative w-full h-[280vh] md:h-[320vh] bg-[var(--cinema-bg)] border-b border-[var(--cinema-border)] select-none focus:outline-none"
    >
      {/* Sticky Fullscreen Container: As you scroll down the page, stack scrolls down */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-3 sm:px-6 overflow-hidden">
        {/* Background ambient lighting cone */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[550px] bg-[radial-gradient(circle,rgba(124,92,252,0.18)_0%,rgba(56,189,248,0.05)_45%,transparent_70%)] blur-[140px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* 1. Top Section Header */}
        <div className="text-center max-w-3xl mx-auto px-2 space-y-2 sm:space-y-2.5 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--cinema-accent)]/15 border border-[var(--cinema-accent)]/30 text-[var(--cinema-accent)] font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE PRODUCTION ARCHITECTURES</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-[var(--cinema-ink)] tracking-[-0.03em] leading-tight">
            Interactive Architecture Prototypes
          </h2>
          <p className="font-body text-xs sm:text-sm text-[var(--cinema-ink-muted)] leading-relaxed max-w-xl mx-auto hidden sm:block">
            Scroll down the webpage to navigate through the live prototype stack, or click any number beside it.
          </p>

          {/* Mobile / Tablet Horizontal Numbers Stepper Rail (< lg) */}
          <div className="flex lg:hidden items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-full mx-auto pt-1">
            {PROTOTYPES.map((p, idx) => {
              const isSelected = activeIndex === idx;
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToItem(idx)}
                  className={`min-h-[34px] px-2.5 sm:px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[var(--cinema-accent)] text-white shadow-[0_0_16px_var(--cinema-glow)] scale-105"
                      : "bg-white/[0.04] text-white/50 hover:text-white/80 border border-white/10"
                  }`}
                >
                  <span>{numStr}</span>
                  <span className="hidden sm:inline ml-1 font-normal text-[10px] text-white/70">{p.categoryKey}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Middle Row: 3D Vertical Card Stack centered with Header + Name & N.O Column on Right Side */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8 my-auto">
          
          {/* Left Balance Spacer: Keeps the Center Card Stack mathematically dead-center under the Header Text */}
          <div className="hidden lg:block w-44 xl:w-48 shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Cards Carrier (Dead-Center Aligned with Section Header) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-5xl xl:max-w-6xl h-[460px] sm:h-[530px] md:h-[590px] lg:h-[650px] flex items-center justify-center overflow-visible mx-auto"
          >
            {/* Holographic Glowing Pedestal Stage Ring (Matching Reference Image) */}
            <div
              aria-hidden="true"
              className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 w-[480px] sm:w-[680px] lg:w-[820px] h-[130px] sm:h-[160px] pointer-events-none z-0"
            >
              <div
                className="w-full h-full rounded-full border border-[var(--color-brand)]/40 shadow-[0_0_50px_rgba(124,92,252,0.45),inset_0_0_30px_rgba(124,92,252,0.25)] bg-gradient-to-t from-[var(--color-brand)]/15 via-[var(--color-brand)]/5 to-transparent"
                style={{
                  transform: "perspective(500px) rotateX(75deg)",
                }}
              />
            </div>
            {PROTOTYPES.map((item, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;

              // Smooth Overlapping Depth Geometry with hardware-accelerated spring physics
              let translateY = "0px";
              let scale = 1;
              let zIndex = 40;
              let opacity = 1;
              let rotateX = 0;

              if (offset === 0) {
                // Front-most active card
                translateY = "0px";
                scale = 1;
                zIndex = 40;
                opacity = 1;
                rotateX = 0;
              } else if (offset === -1) {
                // Immediately above & behind
                translateY = isMobile ? "-45px" : "-72px";
                scale = isMobile ? 0.94 : 0.93;
                zIndex = 30;
                opacity = 0.78;
                rotateX = 2;
              } else if (offset === -2) {
                // Two steps above
                translateY = isMobile ? "-85px" : "-135px";
                scale = isMobile ? 0.88 : 0.86;
                zIndex = 20;
                opacity = 0.52;
                rotateX = 4;
              } else if (offset === -3) {
                // Top-most rear card
                translateY = isMobile ? "-120px" : "-190px";
                scale = isMobile ? 0.82 : 0.80;
                zIndex = 10;
                opacity = 0.32;
                rotateX = 6;
              } else if (offset < -3) {
                // Far rear (fade out smoothly without unmounting)
                translateY = isMobile ? "-150px" : "-240px";
                scale = 0.76;
                zIndex = 5;
                opacity = 0;
                rotateX = 8;
              } else if (offset === 1) {
                // Immediately below & front
                translateY = isMobile ? "45px" : "72px";
                scale = isMobile ? 0.94 : 0.93;
                zIndex = 32;
                opacity = 0.78;
                rotateX = -2;
              } else if (offset === 2) {
                // Two steps below
                translateY = isMobile ? "85px" : "135px";
                scale = isMobile ? 0.88 : 0.86;
                zIndex = 22;
                opacity = 0.52;
                rotateX = -4;
              } else if (offset === 3) {
                // Bottom-most card
                translateY = isMobile ? "120px" : "190px";
                scale = isMobile ? 0.82 : 0.80;
                zIndex = 12;
                opacity = 0.32;
                rotateX = -6;
              } else if (offset > 3) {
                // Far below (fade out smoothly without unmounting)
                translateY = isMobile ? "150px" : "240px";
                scale = 0.76;
                zIndex = 5;
                opacity = 0;
                rotateX = -8;
              }

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (!isActive) scrollToItem(index);
                  }}
                  initial={false}
                  animate={{
                    y: translateY,
                    scale,
                    opacity,
                    rotateX,
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 260,
                          damping: 28,
                          mass: 0.55,
                        }
                  }
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                    pointerEvents: opacity === 0 ? "none" : undefined,
                  }}
                  className={`absolute w-[96%] sm:w-[92%] md:w-[90%] lg:w-[92%] max-w-[960px] xl:max-w-[1040px] flex flex-col justify-center ${
                    isActive ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  {/* Browser Window Frame with Neon Purple Glow on Active Card */}
                  <div
                    className={`relative w-full aspect-[16/10] sm:aspect-[16/9.6] max-h-[440px] sm:max-h-[520px] md:max-h-[580px] lg:max-h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--stack-card-bg)] transition-colors duration-500 ${
                      isActive
                        ? "border-[2.5px] sm:border-[3px] border-[#7C5CFC] shadow-[0_0_42px_rgba(124,92,252,0.9),0_0_80px_rgba(124,92,252,0.45),0_24px_70px_rgba(0,0,0,0.95)] ring-1 ring-[#9E84FF]/40"
                        : "border border-white/12 shadow-[0_12px_36px_rgba(0,0,0,0.85)] hover:border-white/30"
                    }`}
                  >
                    {/* Browser Window Header Chrome */}
                    <div className="relative z-20 h-10 sm:h-12 bg-[var(--stack-header-bg)] border-b border-white/[0.08] px-2.5 sm:px-5 flex items-center justify-between gap-1.5 sm:gap-3">
                      {/* macOS Window Controls + Card Number Badge beside it */}
                      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[var(--stack-mac-red)] shrink-0" />
                          <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[var(--stack-mac-yellow)] shrink-0" />
                          <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[var(--stack-mac-green)] shrink-0" />
                        </div>
                        <div className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono font-bold text-white/90 whitespace-nowrap shrink-0">
                          NO. {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Centered URL Domain Capsule */}
                      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1 rounded-md bg-[var(--stack-viewport-bg)] border border-white/10 text-[10px] sm:text-xs font-mono text-white/90 min-w-0 max-w-[150px] sm:max-w-xs truncate">
                        <Lock className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{item.domain}</span>
                      </div>

                      {/* Launch Full Demo CTA (Opens Theatre View) */}
                      <Link
                        href={`/demos/${item.id}`}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 min-h-[28px] sm:min-h-[30px] px-2.5 sm:px-3.5 py-1 rounded-full text-[10.5px] sm:text-xs font-mono font-semibold transition-all shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)] ${
                          isActive
                            ? "bg-[var(--cinema-accent)] hover:bg-[var(--cinema-accent-hover)] text-white shadow-[0_2px_12px_rgba(124,92,252,0.5)] hover:scale-105"
                            : "bg-white/10 text-white/80 hover:bg-white/20"
                        }`}
                        onClick={(e) => {
                          if (!isActive) {
                            e.preventDefault();
                            scrollToItem(index);
                          }
                        }}
                        aria-label={`Open full theatre demo for ${item.name}`}
                      >
                        <span className="hidden sm:inline">Launch Prototype</span>
                        <span className="sm:hidden">Open</span>
                        <Maximize2 className="w-3 h-3 shrink-0" />
                      </Link>
                    </div>

                    {/* Browser Content Viewport (Redesigned Website Art & Scaled Live Viewport) */}
                    <div className="relative w-full h-[calc(100%-36px)] sm:h-[calc(100%-48px)] overflow-hidden bg-[var(--stack-viewport-bg)]">
                      <DemoStackViewport
                        id={item.id}
                        name={item.name}
                        domain={item.domain}
                        tagline={item.tagline}
                        isActive={isActive}
                        scrollProgress={scrollProgress}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Desktop Navigation Arrow Controls: Inside demo container, vertically centered on prototype right edge, at least 8px inside frame */}
            <div className="hidden md:flex absolute right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 items-center">
              {/* Up Arrow Button (Previous demo) */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous demo"
                className="w-10 h-10 rounded-full bg-[#121626]/80 hover:bg-[#181D33] border border-white/15 hover:border-[#7C5CFC] text-white flex items-center justify-center backdrop-blur-xl shadow-lg hover:shadow-[0_0_16px_rgba(124,92,252,0.45)] transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-white/15 disabled:hover:bg-[#121626]/80 disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C15]"
              >
                <ChevronUp className="w-4 h-4 text-[#A78BFA]" />
              </button>

              {/* Down Arrow Button (Next demo) */}
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === PROTOTYPES.length - 1}
                aria-label="Next demo"
                className="w-10 h-10 rounded-full bg-[#121626]/80 hover:bg-[#181D33] border border-white/15 hover:border-[#7C5CFC] text-white flex items-center justify-center backdrop-blur-xl shadow-lg hover:shadow-[0_0_16px_rgba(124,92,252,0.45)] transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-white/15 disabled:hover:bg-[#121626]/80 disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C15]"
              >
                <ChevronDown className="w-4 h-4 text-[#A78BFA]" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Arrow Controls: Below prototype, centered horizontally */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4 z-40">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous demo"
              className="w-10 h-10 rounded-full bg-[#121626]/80 hover:bg-[#181D33] border border-white/15 hover:border-[#7C5CFC] text-white flex items-center justify-center backdrop-blur-xl shadow-lg hover:shadow-[0_0_16px_rgba(124,92,252,0.45)] transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-white/15 disabled:hover:bg-[#121626]/80 disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C15]"
            >
              <ChevronUp className="w-4 h-4 text-[#A78BFA]" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === PROTOTYPES.length - 1}
              aria-label="Next demo"
              className="w-10 h-10 rounded-full bg-[#121626]/80 hover:bg-[#181D33] border border-white/15 hover:border-[#7C5CFC] text-white flex items-center justify-center backdrop-blur-xl shadow-lg hover:shadow-[0_0_16px_rgba(124,92,252,0.45)] transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-white/15 disabled:hover:bg-[#121626]/80 disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090C15]"
            >
              <ChevronDown className="w-4 h-4 text-[#A78BFA]" />
            </button>
          </div>

          {/* Name & N.O Column Placed on Right Side (Desktop lg:) */}
          <div className="hidden lg:flex flex-col gap-1.5 z-40 shrink-0 w-44 xl:w-48 py-2 select-none">
            {PROTOTYPES.map((p, idx) => {
              const isSelected = activeIndex === idx;
              const numStr = String(idx + 1).padStart(2, "0");
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToItem(idx)}
                  className={`group relative flex items-center justify-between px-3.5 py-2 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                    isSelected
                      ? "bg-[var(--cinema-surface)] border border-[var(--cinema-accent)] text-white shadow-[0_0_20px_var(--cinema-glow)] scale-[1.03]"
                      : "border border-white/5 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05] text-white/50 hover:text-white/90"
                  }`}
                  aria-label={`Jump to demo ${numStr}: ${p.name}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`font-mono text-xs font-bold transition-colors ${
                      isSelected ? "text-[var(--cinema-accent)]" : "text-white/40 group-hover:text-white/70"
                    }`}>
                      {numStr}
                    </span>
                    <span className="font-heading text-xs font-semibold tracking-tight truncate max-w-[95px]">
                      {p.categoryKey}
                    </span>
                  </div>
                  {isSelected ? (
                    <span className="w-2 h-2 rounded-full bg-[var(--cinema-accent)] shadow-[0_0_8px_var(--cinema-accent)] animate-pulse" />
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-white/30" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default DemoStackShowcase;
