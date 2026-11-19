"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Code2,
  Layers,
  Settings,
  Rocket,
  ShoppingCart,
  MessageSquare,
  CheckCircle2,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function SpotlightBanner() {
  const prefersReducedMotion = useReducedMotion();
  const [activeMilestone, setActiveMilestone] = useState<number>(3); // Default to Day 10 (Live)
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 5, y: -y * 5 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredMilestone(null);
    setHoveredFrame(null);
  };

  const milestones = [
    {
      day: "Day 1 – 3",
      title: "Architecture & Wireframe",
      subtitle: "Bespoke System Blueprint",
      icon: Layers,
      highlight: false,
    },
    {
      day: "Day 4 – 6",
      title: "Design & Build (Latest Next.js)",
      subtitle: "High-Velocity Handcraft",
      icon: Code2,
      highlight: false,
    },
    {
      day: "Day 7 – 9",
      title: "Integrations & Automation",
      subtitle: "Autonomous WhatsApp & Pay",
      icon: Settings,
      highlight: false,
    },
    {
      day: "Day 10",
      title: "Production Launch (Live)",
      subtitle: "Sub-50ms Mumbai Edge",
      icon: Rocket,
      highlight: true,
    },
  ];

  // Interactive Pop-up & Enlarge flags:
  // When milestone button or frame is hovered/clicked, that frame pops up & gets enlarged.
  // Smoothly reverts back to resting size and place when cursor moves away.
  const isFrame1Popped = hoveredFrame === 0 || hoveredMilestone === 0;
  const isFrame2Popped = hoveredFrame === 1 || (hoveredMilestone === 1 && (hoveredFrame === null || hoveredFrame === 1));
  const isFrame3Popped = hoveredFrame === 2 || (hoveredMilestone === 1 && hoveredFrame === 2);
  const isFrame4Popped = hoveredFrame === 3 || hoveredMilestone === 2;
  const isFrame5Popped = hoveredFrame === 4 || hoveredMilestone === 3;

  // Active beacon highlights
  const effectiveActive = hoveredMilestone ?? activeMilestone;
  const isBeacon1Active = effectiveActive === 0 || isFrame1Popped;
  const isBeacon2Active = effectiveActive === 1 || isFrame2Popped || isFrame3Popped;
  const isBeacon3Active = effectiveActive === 2 || isFrame4Popped;
  const isBeacon4Active = effectiveActive === 3 || isFrame5Popped;

  return (
    <section className="relative py-12 sm:py-20 lg:py-24 pb-28 sm:pb-24 lg:pb-24 overflow-x-clip select-none bg-transparent">
      <div className="site-container-wide">
        {/* Main 10-Day Sprint Container Card */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-[var(--sprint-card-bg)] border border-[var(--sprint-purple)]/30 p-6 sm:p-10 lg:p-12 pb-20 sm:pb-24 lg:pb-28 xl:pb-32 overflow-hidden shadow-[0_24px_80px_-16px_rgba(0,0,0,0.95)]"
        >
          {/* Perspective Floor Grid (Receding toward the horizon) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[48%] pointer-events-none opacity-40"
            style={{
              backgroundImage: `linear-gradient(to right, var(--sprint-grid-line) 1px, transparent 1px),
                                linear-gradient(to bottom, var(--sprint-grid-line) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 90% 70% at 65% 90%, black 20%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 70% at 65% 90%, black 20%, transparent 85%)",
            }}
          />

          {/* Ambient Lighting & Neon Glows */}
          <div
            aria-hidden="true"
            className="absolute -top-16 -left-16 w-[420px] h-[320px] bg-[var(--sprint-purple)]/[0.10] rounded-full blur-[110px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 right-1/4 w-[600px] h-[350px] bg-[var(--sprint-purple)]/[0.24] rounded-full blur-[120px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/3 right-10 w-[380px] h-[380px] bg-[var(--sprint-cyan)]/[0.08] rounded-full blur-[100px] pointer-events-none"
          />

          {/* LIVE Operational Badge (Right above the flagship tablet) */}
          <div className="absolute top-5 sm:top-7 right-5 sm:right-8 lg:right-10 z-20 flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[var(--sprint-emerald)]/10 border border-[var(--sprint-emerald)]/35 text-[var(--sprint-emerald)] shadow-[0_0_18px_rgba(16,185,129,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sprint-emerald)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sprint-emerald)]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              LIVE
            </span>
          </div>

          {/* Main Two-Column Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center pt-4 sm:pt-6 pb-2">
            
            {/* LEFT COLUMN: Editorial & Value Proposition */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              
              {/* Commitment Pill Eyebrow */}
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sprint-purple-subtle)] border border-[var(--sprint-purple)]/35 text-[var(--sprint-purple-bright)] font-mono text-[9px] sm:text-xs uppercase tracking-[0.16em] mb-5 sm:mb-6 overflow-visible"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--sprint-purple-bright)] animate-pulse shrink-0" />
                <span className="truncate">THE 10-DAY DIGITAL FLAGSHIP COMMITMENT</span>
              </motion.div>

              {/* Headline - Guaranteed no letter clipping */}
              <motion.h2
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-heading font-black text-3xl sm:text-5xl lg:text-[44px] xl:text-[54px] text-white leading-[1.22] sm:leading-[1.18] pt-2 pb-2 mb-5 sm:mb-6 pl-1 overflow-visible"
              >
                <span className="inline-block pt-1">Your</span> <span className="inline-block">Store</span>, Live in
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#7C5CFC] to-[#38BDF8] inline-block pr-2 pb-3.5 -mb-3.5">
                  10 Days
                </span>
                <span className="text-[#38BDF8] drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] inline-block">.</span>
              </motion.h2>

              {/* Supporting Copy */}
              <motion.p
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-body text-sm sm:text-base lg:text-[16px] text-white/75 leading-relaxed mb-7 sm:mb-8 font-normal max-w-lg"
              >
                A precision ten-day sprint from architectural wireframe to live
                production deployment. Handcrafted latest version Next JS speed, bespoke
                spatial luxury, and autonomous WhatsApp sales automation —
                delivered with zero agency bloat.
              </motion.p>

              {/* Primary CTA Button */}
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6 sm:mb-8"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#6847ED] hover:from-[#8B6DFD] hover:to-[#7859FA] text-white font-heading font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(124,92,252,0.5)] hover:shadow-[0_0_45px_rgba(124,92,252,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Commission Your 10-Day Build</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-white/60"
              >
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Guaranteed On-Time Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>100% Code Ownership</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Cinematic 10-Day Sprint Visualizer Console */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full pt-4 lg:pt-0">
              
              {/* Sprint Console Stage Window */}
              <div className="w-full max-w-[600px] flex flex-col items-center">
                
                {/* Active Showcase Frame */}
                <div className="w-full h-[290px] sm:h-[310px] rounded-2xl bg-[#090C16] border border-white/15 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-between p-3 sm:p-4 backdrop-blur-xl">
                  
                  {/* Subtle dynamic background glow */}
                  <div
                    className={`absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
                      effectiveActive === 0
                        ? "bg-[#7C5CFC]/20"
                        : effectiveActive === 1
                        ? "bg-[#38BDF8]/20"
                        : effectiveActive === 2
                        ? "bg-[#10B981]/20"
                        : "bg-gradient-to-tr from-[#7C5CFC]/25 to-[#38BDF8]/25"
                    }`}
                  />

                  {/* Stage Header / Window Bar */}
                  <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/[0.08] shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[8.5px] font-mono text-white/70">
                      <span className="text-[#38BDF8]">
                        {effectiveActive === 0 && "shreejan.ai/architecture"}
                        {effectiveActive === 1 && "app/flagship/page.tsx"}
                        {effectiveActive === 2 && "api/whatsapp/agent"}
                        {effectiveActive === 3 && "https://aura-studio.shreejan.ai"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        effectiveActive === 2 ? "bg-emerald-400" : "bg-[#7C5CFC]"
                      }`} />
                      <span className="text-[7.5px] font-mono uppercase font-bold text-white/80">
                        {effectiveActive === 0 && "STAGE 1: BLUEPRINT"}
                        {effectiveActive === 1 && "STAGE 2: LATEST NEXT.JS"}
                        {effectiveActive === 2 && "STAGE 3: 24/7 AI BOT"}
                        {effectiveActive === 3 && "STAGE 4: LIVE DEPLOY"}
                      </span>
                    </div>
                  </div>

                  {/* Main Stage Interactive Viewport */}
                  <div className="relative z-10 flex-1 my-2 overflow-hidden flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {/* MILESTONE 0: Architecture & Wireframe */}
                      {effectiveActive === 0 && (
                        <motion.div
                          key="milestone-0"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between py-1"
                        >
                          <div className="grid grid-cols-3 gap-2 text-center my-auto">
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center gap-1">
                              <Layers className="w-5 h-5 text-[#A78BFA]" />
                              <span className="font-heading font-bold text-[10px] text-white">App Router</span>
                              <span className="text-[7.5px] font-mono text-white/50">Latest Next.js Server Tree</span>
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center gap-1">
                              <Code2 className="w-5 h-5 text-[#38BDF8]" />
                              <span className="font-heading font-bold text-[10px] text-white">Prisma Schema</span>
                              <span className="text-[7.5px] font-mono text-white/50">PostgreSQL Type Safety</span>
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center gap-1">
                              <Zap className="w-5 h-5 text-amber-400" />
                              <span className="font-heading font-bold text-[10px] text-white">Mumbai Edge</span>
                              <span className="text-[7.5px] font-mono text-white/50">Sub-50ms Routing</span>
                            </div>
                          </div>

                          <div className="p-2 rounded-lg bg-white/[0.02] border border-dashed border-white/15 flex items-center justify-between text-[8px] font-mono text-white/70">
                            <span>SYSTEM ARCHITECTURE SPECS</span>
                            <span className="text-emerald-400 font-bold">✓ 100% BLUEPRINT VALIDATED</span>
                          </div>
                        </motion.div>
                      )}

                      {/* MILESTONE 1: Design & Build (Latest Next.js) */}
                      {effectiveActive === 1 && (
                        <motion.div
                          key="milestone-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="h-full grid grid-cols-12 gap-2.5 items-stretch py-1"
                        >
                          {/* Left: Code Editor */}
                          <div className="col-span-7 rounded-lg bg-[#07090F] border border-white/[0.08] p-2.5 font-mono text-[8px] leading-[1.4] flex flex-col justify-between">
                            <div className="space-y-0.5 text-left">
                              <div className="text-purple-400">export default async function Store() &#123;</div>
                              <div className="text-white/40 pl-2">const telemetry = await getEdgeData();</div>
                              <div className="text-purple-400 pl-2">return (</div>
                              <div className="text-pink-400 pl-4">&lt;SpatialShowcase</div>
                              <div className="text-sky-300 pl-6">edge=&quot;mumbai-bom&quot;</div>
                              <div className="text-amber-300 pl-6">render60fps=&#123;true&#125;</div>
                              <div className="text-pink-400 pl-4">/&gt;</div>
                              <div className="text-purple-400 pl-2">);</div>
                              <div className="text-purple-400">&#125;</div>
                            </div>
                            <div className="pt-1 border-t border-white/[0.06] flex items-center justify-between text-[7px] text-emerald-400 font-bold">
                              <span>LATEST NEXT.JS + REACT 19</span>
                              <span>0 ANY TYPES</span>
                            </div>
                          </div>

                          {/* Right: Spatial UI Components */}
                          <div className="col-span-5 rounded-lg bg-gradient-to-br from-white/[0.04] to-[#7C5CFC]/10 border border-white/[0.08] p-2.5 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[7.5px] text-purple-300">Spatial UI Tokens</span>
                              <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                            </div>
                            <div className="space-y-1.5 my-auto">
                              <div className="h-2 w-full rounded bg-white/20" />
                              <div className="h-6 rounded bg-[#7C5CFC] shadow-[0_0_12px_rgba(124,92,252,0.6)] flex items-center justify-center text-[8px] font-heading font-extrabold text-white">
                                Instant Checkout →
                              </div>
                            </div>
                            <div className="text-[7px] font-mono text-white/50 text-center">
                              WCAG 2.2 AA (8.4:1)
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* MILESTONE 2: Integrations & Automation */}
                      {effectiveActive === 2 && (
                        <motion.div
                          key="milestone-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between py-1"
                        >
                          <div className="space-y-1.5 my-auto">
                            {/* Customer Chat Bubble */}
                            <div className="flex items-start gap-1.5 max-w-[85%]">
                              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[8px] shrink-0 font-bold text-white">
                                C
                              </div>
                              <div className="p-2 rounded-xl rounded-tl-none bg-white/[0.05] border border-white/[0.08] text-[8px] font-body text-white/85">
                                Can I confirm the Bandra gym VIP pass via UPI right now?
                              </div>
                            </div>

                            {/* 24/7 AI Bot Response */}
                            <div className="flex items-start gap-1.5 max-w-[90%] ml-auto flex-row-reverse">
                              <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-[8px] shrink-0 text-white shadow-[0_0_8px_rgba(37,211,102,0.6)]">
                                ⚡
                              </div>
                              <div className="p-2 rounded-xl rounded-tr-none bg-[#25D366]/15 border border-[#25D366]/40 text-[8px] font-body text-emerald-200 text-left">
                                Instant pass reserved! Link: <strong className="text-white underline">titanpulse.fit/pass</strong> (Razorpay UPI QR & AutoPay active).
                              </div>
                            </div>
                          </div>

                          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between text-[7.5px] font-mono">
                            <span className="text-emerald-400 font-bold">✓ RAZORPAY UPI WEBHOOK: 200 OK</span>
                            <span className="text-white/60">AUTONOMOUS 24/7 SALES PIPELINE</span>
                          </div>
                        </motion.div>
                      )}

                      {/* MILESTONE 3: Production Launch (Live) */}
                      {effectiveActive === 3 && (
                        <motion.div
                          key="milestone-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="h-full grid grid-cols-12 gap-2 items-center py-1"
                        >
                          {/* Storefront Details */}
                          <div className="col-span-6 flex flex-col items-start text-left justify-between h-full py-1">
                            <div>
                              <span className="font-mono text-[7px] text-[#A78BFA] tracking-widest uppercase">
                                ANC WIRELESS STUDIO
                              </span>
                              <h4 className="font-heading font-black text-[13px] text-white tracking-tight leading-tight mt-0.5">
                                Spatial Pro Studio
                              </h4>
                              <div className="font-heading font-extrabold text-[13px] text-[#38BDF8] mt-1">
                                ₹29,990
                              </div>
                            </div>

                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--sprint-purple)] hover:bg-[#6847ED] text-white font-mono text-[8px] font-bold shadow-[0_0_15px_rgba(124,92,252,0.6)] transition-all"
                            >
                              <span>Buy Now</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>

                            <div className="flex items-center gap-2 text-[7px] font-mono text-emerald-400 font-bold">
                              <span>● 100/100 SPEED</span>
                              <span className="text-white/40">·</span>
                              <span>TTFB: 24MS</span>
                            </div>
                          </div>

                          {/* Luxury Visual Vector Graphic */}
                          <div className="col-span-6 relative flex items-center justify-center h-full">
                            <svg
                              className="w-full h-full max-h-[120px] drop-shadow-[0_10px_25px_rgba(124,92,252,0.5)]"
                              viewBox="0 0 160 140"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="80" cy="70" r="54" stroke="#7C5CFC" strokeWidth="1" opacity="0.35" strokeDasharray="3 3" />
                              <circle cx="80" cy="70" r="44" stroke="#38BDF8" strokeWidth="1.2" opacity="0.6" />
                              <path d="M 38,78 C 38,26 122,26 122,78" stroke="#A78BFA" strokeWidth="7" strokeLinecap="round" />
                              <path d="M 46,68 C 46,36 114,36 114,68" stroke="#1E2333" strokeWidth="3.5" strokeLinecap="round" />
                              <path d="M 38,72 L 38,88" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
                              <path d="M 122,72 L 122,88" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
                              <rect x="24" y="74" width="24" height="34" rx="10" fill="#3B0764" stroke="#7C5CFC" strokeWidth="1.8" />
                              <rect x="112" y="74" width="24" height="34" rx="10" fill="#3B0764" stroke="#7C5CFC" strokeWidth="1.8" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Stage Bottom Telemetry Bar */}
                  <div className="relative z-10 pt-1.5 border-t border-white/[0.08] flex items-center justify-between text-[7px] font-mono text-white/50 shrink-0">
                    <span className="text-white/70">
                      {effectiveActive === 0 && "ARCHITECTURE SPRINT · 100% IP CODE OWNERSHIP"}
                      {effectiveActive === 1 && "PRODUCTION LATEST NEXT.JS APP ROUTER CODE"}
                      {effectiveActive === 2 && "AUTONOMOUS REVENUE RECOVERY PIPELINE"}
                      {effectiveActive === 3 && "LIVE FLAGSHIP · ZERO RECURRING PLATFORM TAX"}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {effectiveActive === 3 ? "● LIVE IN PRODUCTION" : "SPRINT READY"}
                    </span>
                  </div>

                </div>

                {/* SPRINT TIMELINE SELECTOR: 4 Milestone Buttons */}
                <div className="w-full mt-4 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {milestones.map((ms, idx) => {
                      const IconComponent = ms.icon;
                      const isSelected = effectiveActive === idx;

                      return (
                        <button
                          key={ms.day}
                          type="button"
                          onClick={() => {
                            setActiveMilestone(idx);
                            setHoveredMilestone(null);
                          }}
                          onMouseEnter={() => setHoveredMilestone(idx)}
                          onMouseLeave={() => setHoveredMilestone(null)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "bg-white/[0.08] border-[#7C5CFC] shadow-[0_0_20px_rgba(124,92,252,0.35)] scale-[1.02]"
                              : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-[#7C5CFC] text-white"
                                : "bg-white/10 text-white/60"
                            }`}>
                              {ms.day}
                            </span>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isSelected ? "text-[#38BDF8]" : "text-white/40"
                            }`}>
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <h5 className="font-heading font-bold text-[11px] text-white leading-tight">
                            {ms.title}
                          </h5>
                          <span className="font-body text-[9px] text-white/50 truncate mt-0.5">
                            {ms.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SpotlightBanner;
