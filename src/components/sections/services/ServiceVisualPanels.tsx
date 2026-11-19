"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  Layers,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Zap,
  Check,
} from "lucide-react";

// =========================================================================
// 1. WEBSITES DEVELOPER: MINIMALIST IRONFORGE FITNESS DEMO SHOWCASE
// Clean, bold, iconic visual featuring Ironforge Fitness (Nashik).
// Pure visual impact with high-contrast barbell art and zero nesting clutter.
// =========================================================================
export function WebsitesDeveloperVisual({ isCardHovered = false }: { isCardHovered?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const active = prefersReducedMotion || inView || isCardHovered;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between select-none overflow-hidden bg-gradient-to-br from-[#121418] via-[#0A0C0E] to-[#161214]"
    >
      {/* Ambient Crimson Energy Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(225,29,46,0.28)_0%,transparent_70%)] blur-[28px] pointer-events-none" />

      {/* Top Header: Brand & Live Indicator */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D2E] shadow-[0_0_8px_#E11D2E]" />
          <span className="font-heading font-black text-xs tracking-wider text-white">
            IRONFORGE FITNESS
          </span>
        </div>
        <span className="font-mono text-[9px] text-white/50 tracking-wider uppercase">
          ironforge.shreejan.ai
        </span>
      </div>

      {/* Center: Iconic Olympic Barbell Vector Art */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center text-center">
        <motion.div
          animate={active && !prefersReducedMotion ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-full max-w-[220px] h-[44px] flex items-center justify-center"
        >
          <svg viewBox="0 0 240 44" fill="none" className="w-full h-full drop-shadow-[0_6px_16px_rgba(225,29,46,0.5)]">
            {/* Stainless Steel Barbell Shaft */}
            <rect x="15" y="20" width="210" height="4" rx="2" fill="#8A929B" />
            {/* Knurled Grip Marks */}
            <line x1="65" y1="20" x2="65" y2="24" stroke="#181B1F" strokeWidth="1.5" />
            <line x1="85" y1="20" x2="85" y2="24" stroke="#181B1F" strokeWidth="1.5" />
            <line x1="155" y1="20" x2="155" y2="24" stroke="#181B1F" strokeWidth="1.5" />
            <line x1="175" y1="20" x2="175" y2="24" stroke="#181B1F" strokeWidth="1.5" />
            {/* Left Calibrated Plates (25kg Red Eleiko) */}
            <rect x="42" y="4" width="9" height="36" rx="3" fill="#E11D2E" stroke="#111317" strokeWidth="1" />
            <rect x="31" y="8" width="8" height="28" rx="2" fill="#252A30" stroke="#E11D2E" strokeWidth="0.8" />
            <rect x="22" y="12" width="6" height="20" rx="2" fill="#14171A" />
            {/* Right Calibrated Plates (25kg Red Eleiko) */}
            <rect x="189" y="4" width="9" height="36" rx="3" fill="#E11D2E" stroke="#111317" strokeWidth="1" />
            <rect x="201" y="8" width="8" height="28" rx="2" fill="#252A30" stroke="#E11D2E" strokeWidth="0.8" />
            <rect x="212" y="12" width="6" height="20" rx="2" fill="#14171A" />
          </svg>
        </motion.div>

        <h4 className="font-heading font-black text-sm sm:text-base text-white tracking-tight uppercase mt-2">
          Heavy Iron. <span className="text-[#E11D2E]">Zero Fluff.</span>
        </h4>
        <span className="font-body text-[10px] text-white/55 mt-0.5">
          Calibrated Eleiko Plates · 1,200+ Members
        </span>
      </div>

      {/* Bottom Metadata Strip */}
      <div className="relative z-10 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-white/60">
        <span className="text-white/80">Nashik Facility</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Sub-50ms Edge
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 2. CUSTOM WEB APPS: MINIMALIST IRONFORGE OS REVENUE TELEMETRY
// High-impact, clean telemetry dashboard for Ironforge Fitness:
// Real monthly fee collections, active members, and live PostgreSQL sync.
// =========================================================================
export function CustomWebAppsVisual({ isCardHovered = false }: { isCardHovered?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const active = prefersReducedMotion || inView || isCardHovered;

  const barHeights = active ? [42, 68, 55, 88, 96, 74, 98] : [20, 30, 25, 40, 35, 30, 45];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between select-none overflow-hidden bg-gradient-to-br from-[#101420] via-[#0A0D15] to-[#121626]"
    >
      {/* Ambient Violet/Cyan Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,transparent_70%)] blur-[28px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
          <span className="font-heading font-black text-xs tracking-wider text-white">
            IRONFORGE OS
          </span>
        </div>
        <span className="font-mono text-[9px] text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          DB SYNCED
        </span>
      </div>

      {/* Center: Big Confident Metrics & Revenue Bars */}
      <div className="relative z-10 my-auto py-2 flex flex-col justify-between">
        {/* KPI Numbers */}
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-[9px] font-mono text-white/50 uppercase block">Monthly Collections</span>
            <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">
              ₹18,40,000
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-white/50 uppercase block">Active Lifters</span>
            <span className="font-heading font-black text-base sm:text-lg text-[#38BDF8]">
              1,240 <span className="text-[10px] text-emerald-400 font-mono">+28</span>
            </span>
          </div>
        </div>

        {/* Minimalist Glowing Progress Bar Chart */}
        <div className="flex items-end justify-between gap-1.5 h-12 pt-1">
          {barHeights.map((h, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ height: `${h}%` }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: i * 0.05 }}
              className={`flex-1 rounded-t transition-colors ${
                i === 6
                  ? "bg-gradient-to-t from-[#7C5CFC] to-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="relative z-10 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-white/60">
        <span className="text-white/80">PostgreSQL + Prisma</span>
        <span className="text-white/50">Razorpay UPI Synced</span>
      </div>
    </div>
  );
}

// =========================================================================
// 3. WEBSITE AUDIT: MINIMALIST FORENSIC SPEED SCORECARD
// Bold, iconic 100/100 performance telemetry with Core Web Vitals.
// =========================================================================
export function WebsiteAuditVisual({ isCardHovered = false }: { isCardHovered?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const active = prefersReducedMotion || inView || isCardHovered;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between select-none overflow-hidden bg-gradient-to-br from-[#0C1614] via-[#09110F] to-[#0E1A17]"
    >
      {/* Ambient Emerald Energy Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(16,185,129,0.25)_0%,transparent_70%)] blur-[28px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-heading font-black text-xs tracking-wider text-white">
            FORENSIC AUDIT
          </span>
        </div>
        <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase">
          ALL PASS
        </span>
      </div>

      {/* Center: Big Confident 100 Speed Score */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-between gap-4">
        {/* Large Circular 100 Gauge */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
            <motion.circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 18}
              initial={false}
              animate={{ strokeDashoffset: active ? 0 : 2 * Math.PI * 18 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono font-black text-lg text-white">
            100
          </div>
        </div>

        {/* Speed Metrics */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/60">LCP Speed:</span>
            <span className="text-emerald-400 font-bold">0.38s</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/60">FID Latency:</span>
            <span className="text-emerald-400 font-bold">12ms</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/60">SEO Score:</span>
            <span className="text-emerald-400 font-bold">100/100</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="relative z-10 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-white/60">
        <span className="text-white/80">Google Lighthouse</span>
        <span className="text-emerald-400 font-bold">Core Web Vitals Pass</span>
      </div>
    </div>
  );
}

// =========================================================================
// 4. UI/UX REDESIGN: MINIMALIST SPATIAL DESIGN TOKENS
// Minimalist, high-contrast visual comparison & Figma tokens.
// =========================================================================
export function UIUXRedesignVisual({ isCardHovered = false }: { isCardHovered?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const active = prefersReducedMotion || inView || isCardHovered;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between select-none overflow-hidden bg-gradient-to-br from-[#161224] via-[#0D0B16] to-[#141220]"
    >
      {/* Ambient Violet Energy Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(168,85,247,0.25)_0%,transparent_70%)] blur-[28px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
          <span className="font-heading font-black text-xs tracking-wider text-white">
            SPATIAL UI/UX
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#C084FC] font-bold">
          FIGMA v2.4
        </span>
      </div>

      {/* Center: High-Contrast Spatial Button & Tokens */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center text-center">
        {/* Spatial UI Action Card */}
        <div className="w-full max-w-[210px] p-2.5 rounded-xl bg-gradient-to-br from-[#1E2338] to-[#121626] border border-[#7C5CFC]/40 shadow-[0_4px_20px_rgba(124,92,252,0.3)]">
          <div className="flex items-center justify-between mb-1 text-[8px] font-mono">
            <span className="text-purple-300">Spatial Interface</span>
            <span className="text-emerald-400 font-bold">100/100</span>
          </div>
          <div className="h-6 rounded-lg bg-[#7C5CFC] flex items-center justify-center text-[9px] font-heading font-extrabold text-white shadow-md">
            Convert Lead →
          </div>
        </div>

        {/* 4 Swatch Tokens */}
        <div className="flex items-center gap-2 mt-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC] shadow-[0_0_6px_#7C5CFC]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
          <span className="text-[8.5px] font-mono text-white/50 ml-1">Tokens Synced</span>
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="relative z-10 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-white/60">
        <span className="text-white/80">WCAG 2.2 AA (8.4:1)</span>
        <span className="text-[#C084FC] font-bold">Framer Motion</span>
      </div>
    </div>
  );
}
