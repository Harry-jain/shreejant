"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);
  const [canHover, setCanHover] = useState(false);

  // 1. Cursor Spotlight Pointer Tracking (Throttled via requestAnimationFrame)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setCanHover(hasHover);

    if (!hasHover || prefersReducedMotion) return;

    const hero = heroRef.current;
    if (!hero) return;

    let rafId: number | null = null;
    const handlePointerMove = (e: PointerEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        hero.style.setProperty("--mx", `${x}px`);
        hero.style.setProperty("--my", `${y}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[84vh] sm:min-h-[88vh] bg-transparent text-[#F4F7FB] overflow-hidden pt-36 sm:pt-44 lg:pt-48 pb-20 sm:pb-24 border-b border-white/[0.08] select-none flex flex-col justify-center items-center"
      style={{
        ["--mx" as any]: "50vw",
        ["--my" as any]: "320px",
      }}
    >
      {/* 1. Film Grain Layer (Static, 4% opacity, mix-blend-mode: overlay) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ffffff'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Atmospheric Perspective Floor Grid (Anchored to bottom, horizon at ~62% height) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] sm:h-[50%] lg:h-[52%] z-0 overflow-hidden"
        style={{
          perspective: "280px",
          perspectiveOrigin: "50% 0%",
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 16%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 16%, black 70%, transparent 100%)",
        }}
      >
        <div
          className="w-[200vw] -ml-[50vw] h-[250%] origin-top"
          style={{
            transform: "rotateX(73deg)",
            backgroundImage: `
              linear-gradient(to right, rgba(124, 92, 255, 0.30) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(124, 92, 255, 0.32) 1px, transparent 1px)
            `,
            backgroundSize: "64px 44px",
            animation: prefersReducedMotion ? "none" : "heroGridFloorScroll 24s linear infinite",
          }}
        />
      </div>

      {/* Horizon Soft Radial Light Glow (Subtle bloom centered on horizon, no hard line or edge) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[46%] sm:bottom-[48%] left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[150px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.22)_0%,rgba(124,92,255,0.06)_50%,transparent_75%)] blur-[40px] z-0"
      />

      {/* 3. Cursor Spotlight (~480px subtle radial light in purple token, follows pointer) */}
      {canHover && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-[480px] h-[480px] -ml-[240px] -mt-[240px] rounded-full z-0 will-change-transform hidden sm:block"
          style={{
            background: "radial-gradient(circle at center, rgba(124, 92, 252, 0.09) 0%, rgba(124, 92, 252, 0.03) 45%, transparent 70%)",
            transform: "translate3d(var(--mx, 50vw), var(--my, 320px), 0)",
            transition: "transform 0.4s ease-out",
          }}
        />
      )}

      {/* Central Architectural Lighting Cone */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1000px] h-[450px] sm:h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,252,0.18)_0%,rgba(56,189,248,0.06)_45%,transparent_70%)] blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="relative z-10 site-container-wide flex flex-col items-center text-center my-auto">

        {/* 1. Top Trust Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/12 backdrop-blur-xl text-xs font-mono shadow-sm mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/90 font-medium">MUMBAI GEN AI STUDIO</span>
          <span className="text-white/30">·</span>
          <span className="text-[#38BDF8] font-mono tracking-wide">LATEST NEXT.JS VERSION WEB FLAGSHIPS</span>
        </motion.div>

        {/* 2. High-Impact Monumental Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-5xl mx-auto mb-6 px-2"
        >
          <h1 className="font-heading font-black text-[clamp(2.6rem,7.4vw,6.6rem)] leading-[1.1] tracking-[-0.035em] text-white">
            <span>We Build Digital </span>
            <span className="relative inline-block mt-1 sm:mt-0">
              <span className="bg-gradient-to-r from-[#7C5CFC] via-[#A78BFA] to-[#38BDF8] bg-clip-text text-transparent pb-1 pr-3 sm:pr-4 inline-block">
                Empires
              </span>
              {/* Expressive hand-drawn brush underline accent from reference sketch */}
              <svg
                aria-hidden="true"
                className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 w-[104%] h-[16px] sm:h-[22px] pointer-events-none z-10 overflow-visible"
                viewBox="0 0 280 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="heroBrushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C5CFC" />
                    <stop offset="40%" stopColor="#A78BFA" />
                    <stop offset="75%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>
                </defs>

                {/* Primary hand-drawn expressive wave stroke with organic thickness */}
                <path
                  d="M 4 14 C 42 6, 92 18, 142 11 C 192 4, 240 16, 276 9"
                  stroke="url(#heroBrushGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 320,
                    strokeDashoffset: prefersReducedMotion ? 0 : 320,
                    animation: prefersReducedMotion
                      ? "none"
                      : "heroBrushDraw 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
                  }}
                />

                {/* Secondary fine sketched accent stroke (authentic double-stroke crayon look from reference) */}
                <path
                  d="M 16 18 C 65 11, 120 20, 185 13 C 228 8, 260 16, 272 13"
                  stroke="url(#heroBrushGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.75"
                  style={{
                    strokeDasharray: 320,
                    strokeDashoffset: prefersReducedMotion ? 0 : 320,
                    animation: prefersReducedMotion
                      ? "none"
                      : "heroBrushDraw 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards",
                  }}
                />
              </svg>
            </span>
          </h1>
        </motion.div>

        {/* 3. Concise Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-[16px] sm:text-[19px] lg:text-[21px] leading-[1.6] text-white/75 max-w-2xl mx-auto mb-10 font-normal"
        >
          Where creativity meets intelligence. We transform ambitious ideas into powerful digital products, intelligent automation, and experiences built for the future.
        </motion.p>

        {/* 4. Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-semibold text-base shadow-[0_4px_32px_rgba(124,92,252,0.5)] hover:shadow-[0_8px_40px_rgba(124,92,252,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/#demos"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-4 rounded-full bg-[#121626]/80 hover:bg-[#181D33] border border-white/15 hover:border-[#7C5CFC] text-white font-heading font-semibold text-sm sm:text-base backdrop-blur-xl shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#A78BFA] group-hover:rotate-12 transition-transform" />
            <span>Inspect Live Prototypes</span>
            <ChevronDown className="w-4 h-4 text-white/50 group-hover:translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* 5. Live Indian Enterprise Badges Pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-xs font-mono text-white/70"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Code Ownership</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#7C5CFC] font-bold">₹</span>
            <span>7–10 Day Sprint Guarantee</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default HeroSection;