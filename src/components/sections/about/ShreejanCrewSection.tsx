"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Code2,
  Layers,
  Brain,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Palette,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
  Flame,
} from "lucide-react";

export interface CrewMember {
  id: "developer" | "creator" | "strategist";
  title: string;
  role: string;
  tagline: string;
  cardTagline: string;
  personality: string;
  image: string;
  accentColor: string;
  accentSecondary: string;
  borderClass: string;
  glowClass: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ComponentType<{ className?: string }>;
  floatingTopBadge: {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
    sub: string;
  };
  floatingBottomBadge: {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
  };
  skills: string[];
  stats: { label: string; value: string; unit: string }[];
  bio: string;
  philosophy: string;
  quote: string;
  serviceLink: { label: string; href: string };
}

const CREW_MEMBERS: CrewMember[] = [
  {
    id: "developer",
    title: "The Developer",
    role: "Lead Full-Stack Architect",
    tagline: "Turning complex ideas into working experiences.",
    cardTagline: "Codes, integrates, and brings ideas to life.",
    personality: "Curious, intelligent, technically sharp and slightly introverted.",
    image: "/crew/developer-character.png",
    accentColor: "#7C5CFC",
    accentSecondary: "#A78BFA",
    borderClass: "border-[#7C5CFC]/40 hover:border-[#A78BFA] group-hover:border-[#A78BFA]",
    glowClass: "shadow-[0_0_35px_rgba(124,92,252,0.35)]",
    badgeBg: "bg-[#7C5CFC]/15",
    badgeText: "text-[#A78BFA]",
    icon: Code2,
    floatingTopBadge: {
      icon: Terminal,
      text: "deploy({ edge: 'Mumbai' })",
      sub: "Latest version Next JS SSR",
    },
    floatingBottomBadge: {
      icon: Laptop,
      text: "⚡ 24ms TTFB Latency",
    },
    skills: [
      "Latest version Next JS App Router",
      "TypeScript 5.7",
      "PostgreSQL & Prisma",
      "Tailwind CSS v4",
      "Three.js Spatial Motion",
      "Server Actions",
    ],
    stats: [
      { label: "Edge Latency", value: "24", unit: "ms" },
      { label: "Core Vitals", value: "100", unit: "/100" },
      { label: "Uptime SLA", value: "99.98", unit: "%" },
    ],
    bio: "Obsessed with raw execution speed, fault-tolerant architectures, and microsecond-level edge renderers. He lives inside modern compiler trees, transforming enterprise requirements into high-velocity codebases with zero agency bloat.",
    philosophy:
      "Code should never be an afterthought. It is the invisible skeleton that determines whether your business thrives during viral traffic spikes or falls apart.",
    quote: "If your digital platform takes more than 100 milliseconds to render in Mumbai, we rebuild it from scratch.",
    serviceLink: {
      label: "Explore Websites & Architecture",
      href: "/services#websites",
    },
  },
  {
    id: "creator",
    title: "The Creator",
    role: "Principal Experience Designer",
    tagline: "Making digital experiences worth remembering.",
    cardTagline: "Designs, builds, and turns concepts into impactful products.",
    personality: "Energetic, imaginative, expressive and playful.",
    image: "/crew/creator-character.png",
    accentColor: "#38BDF8",
    accentSecondary: "#7DD3FC",
    borderClass: "border-[#38BDF8]/40 hover:border-[#7DD3FC] group-hover:border-[#7DD3FC]",
    glowClass: "shadow-[0_0_35px_rgba(56,189,248,0.35)]",
    badgeBg: "bg-[#38BDF8]/15",
    badgeText: "text-[#38BDF8]",
    icon: Layers,
    floatingTopBadge: {
      icon: Palette,
      text: "Spatial Luxury Design",
      sub: "WCAG 2.2 AAA",
    },
    floatingBottomBadge: {
      icon: Flame,
      text: "💡 +340% Lead Conversion",
    },
    skills: [
      "Spatial Luxury UI",
      "Framer Motion 12",
      "Conversion Psychology",
      "Design Systems & Tokens",
      "Bespoke 3D Art Direction",
      "Fluid Responsive Grids",
    ],
    stats: [
      { label: "Conversion Lift", value: "+340", unit: "%" },
      { label: "Bounce Reduction", value: "65", unit: "%" },
      { label: "WCAG Contrast", value: "8.4", unit: ":1" },
    ],
    bio: "Bridges the gap between raw technical power and sensory luxury. She crafts intuitive, high-status user journeys that captivate modern buyers and transform passive visitors into lifelong brand advocates.",
    philosophy:
      "A flagship website isn't a digital pamphlet; it's a cinematic boardroom presentation that commands authority from the very first scroll.",
    quote: "Design is not cosmetic decoration. It is high-conversion human psychology rendered in pixels.",
    serviceLink: {
      label: "Explore UI/UX Redesign",
      href: "/services#ui-ux",
    },
  },
  {
    id: "strategist",
    title: "The Strategist",
    role: "AI Solutions Strategist",
    tagline: "Turning intelligent thinking into meaningful impact.",
    cardTagline: "Explores AI, solves problems, and finds smarter ways forward.",
    personality: "Analytical, thoughtful, intelligent and visionary.",
    image: "/crew/strategist-character.png",
    accentColor: "#885CF6",
    accentSecondary: "#C084FC",
    borderClass: "border-[#885CF6]/40 hover:border-[#C084FC] group-hover:border-[#C084FC]",
    glowClass: "shadow-[0_0_35px_rgba(136,92,246,0.35)]",
    badgeBg: "bg-[#885CF6]/15",
    badgeText: "text-[#C084FC]",
    icon: Brain,
    floatingTopBadge: {
      icon: Cpu,
      text: "Autonomous Agent Hub",
      sub: "RAG & Telemetry",
    },
    floatingBottomBadge: {
      icon: Sparkles,
      text: "🤖 0% Monthly SaaS Tax",
    },
    skills: [
      "Autonomous Agent Workflows",
      "Enterprise RAG Pipelines",
      "WhatsApp Cloud Automation",
      "Bespoke Business Logic",
      "Data Sovereignty & Security",
      "Zero-SaaS Infrastructure",
    ],
    stats: [
      { label: "Inference Precision", value: "99.8", unit: "%" },
      { label: "SaaS Tax Saved", value: "100", unit: "%" },
      { label: "Audit Turnaround", value: "48", unit: "hrs" },
    ],
    bio: "Analyzes traditional business friction with mathematical precision. He engineers private, custom-hosted intelligence engines that autonomously triage leads, reconcile invoices, and eliminate bloated SaaS recurring bills.",
    philosophy:
      "Stop renting fragile third-party AI toys. Sovereign businesses build, own, and command their intellectual property directly.",
    quote: "Intelligence is meaningless without leverage. We give Indian business owners an unassailable unfair advantage.",
    serviceLink: {
      label: "Explore Web Apps & AI",
      href: "/services#web-apps",
    },
  },
];

export function ShreejanCrewSection() {
  const [activeId, setActiveId] = useState<"developer" | "creator" | "strategist">("developer");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // Mobile Swipe References
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeIndex = CREW_MEMBERS.findIndex((m) => m.id === activeId);

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndex + 1) % CREW_MEMBERS.length;
    setActiveId(CREW_MEMBERS[nextIdx].id);
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndex - 1 + CREW_MEMBERS.length) % CREW_MEMBERS.length;
    setActiveId(CREW_MEMBERS[prevIdx].id);
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="crew"
      aria-label="Meet the Shreejan Crew"
      className="relative w-full py-20 sm:py-28 lg:py-36 overflow-hidden bg-transparent select-none"
    >
      {/* Background Ambient Spotlight Effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,252,0.14)_0%,rgba(212,175,55,0.06)_40%,transparent_70%)] blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(circle,rgba(136,92,246,0.12)_0%,transparent_70%)] blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="site-container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono tracking-[0.2em] uppercase mb-5 shadow-[0_0_20px_rgba(124,92,252,0.18)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CORE HUMAN INNOVATION • SHREEJAN CREW</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight leading-[1.1]"
          >
            Meet the{" "}
            <span className="relative inline-block bg-gradient-to-r from-[#A78BFA] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent pb-1">
              Shreejan Crew
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-white/75 font-body max-w-2xl mx-auto leading-relaxed"
          >
            A team of curious minds, creative builders, and AI thinkers turning ambitious ideas into meaningful real-world digital experiences.
          </motion.p>

          {/* Mobile Crew Switcher Tabs */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-8 pt-2 overflow-x-auto">
            {CREW_MEMBERS.map((m) => {
              const isActive = activeId === m.id;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 shrink-0 ${
                    isActive
                      ? "text-white font-bold shadow-[0_0_20px_rgba(124,92,252,0.4)]"
                      : "text-white/60 hover:text-white bg-white/[0.03] border border-white/[0.08]"
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCrewTab"
                      className="absolute inset-0 rounded-full border"
                      style={{
                        backgroundColor: m.accentColor,
                        borderColor: m.accentSecondary,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10">{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP 3-COLUMN CREW SHOWCASE (Visible on lg+) */}
        {/* ============================================================ */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8 items-start">
          {CREW_MEMBERS.map((member, idx) => {
            const isHovered = hoveredId === member.id;
            const Icon = member.icon;
            const TopIcon = member.floatingTopBadge.icon;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: idx * 0.15 }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col rounded-3xl bg-gradient-to-b from-[#101423]/90 via-[#0C101A]/95 to-[#080B12] border border-white/[0.09] hover:border-white/20 p-5 xl:p-6 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_28px_80px_rgba(0,0,0,0.9)] overflow-hidden"
              >
                {/* Character-Specific Radial Ambient Aura */}
                <div
                  className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500"
                  style={{
                    backgroundColor: member.accentColor,
                    opacity: isHovered ? 0.28 : 0.12,
                  }}
                  aria-hidden="true"
                />

                {/* 1. TOP CHARACTER VISUAL STAGE */}
                <div className="relative w-full h-[330px] xl:h-[370px] flex items-end justify-center rounded-2xl bg-gradient-to-b from-[#14192B]/40 to-transparent p-2 overflow-hidden">
                  
                  {/* Floating Holographic Top Badge */}
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: isHovered ? -4 : [-2, 3, -2],
                          }
                    }
                    transition={{
                      repeat: prefersReducedMotion ? 0 : Infinity,
                      duration: 4 + idx,
                      ease: "easeInOut",
                    }}
                    className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090C15]/85 backdrop-blur-md border border-white/10 shadow-lg text-[11px] font-mono text-white/90"
                  >
                    <span style={{ color: member.accentColor }}>
                      <TopIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="truncate max-w-[170px]">{member.floatingTopBadge.text}</span>
                  </motion.div>

                  {/* Character Illustration with Smooth 2x Retina & Alpha Feathering */}
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: isHovered ? -8 : 0,
                            scale: isHovered ? 1.03 : 1,
                          }
                    }
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="relative z-10 w-full h-full max-h-[320px] xl:max-h-[360px] flex items-end justify-center"
                  >
                    <Image
                      src={member.image}
                      alt={`${member.title} - ${member.role}`}
                      width={680}
                      height={570}
                      sizes="(max-width: 1280px) 33vw, 420px"
                      className="w-auto h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-[1.03]"
                      priority
                    />
                  </motion.div>

                  {/* Floating Metric Pill At Bottom Right of Art Area */}
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            y: isHovered ? -2 : [2, -3, 2],
                          }
                    }
                    transition={{
                      repeat: prefersReducedMotion ? 0 : Infinity,
                      duration: 4.5 + idx * 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#090C15]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#A78BFA] shadow-md"
                  >
                    <span>{member.floatingBottomBadge.text}</span>
                  </motion.div>
                </div>

                {/* 2. BOTTOM INFO CARD (Matching reference layout) */}
                <div
                  className={`mt-4 relative rounded-2xl bg-[#090D18]/90 backdrop-blur-md border transition-all duration-300 p-5 flex flex-col justify-between min-h-[140px] ${
                    member.borderClass
                  } ${isHovered ? member.glowClass : ""}`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Character Icon with ambient back glow */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${member.accentColor}25`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Title & Card Tagline */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-bold text-lg xl:text-xl text-white tracking-tight">
                          {member.title}
                        </h3>
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="mt-1 font-body text-xs xl:text-sm text-white/70 leading-snug">
                        {member.cardTagline}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Quick Action / Dossier Launcher */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-white/40 tracking-wider uppercase text-[10px]">
                      {member.role}
                    </span>
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors group/btn py-1 px-2 -mr-2 rounded hover:bg-white/[0.05]"
                      aria-label={`View dossier for ${member.title}`}
                    >
                      <span className="text-[11px] underline underline-offset-4 decoration-white/30 group-hover/btn:decoration-white">
                        Dossier
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#A78BFA] group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE & TABLET CAROUSEL / SINGLE ACTIVE VIEW (< lg) */}
        {/* ============================================================ */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="lg:hidden relative w-full"
        >
          {CREW_MEMBERS.map((member, idx) => {
            if (member.id !== activeId) return null;
            const Icon = member.icon;
            const TopIcon = member.floatingTopBadge.icon;

            return (
              <AnimatePresence mode="wait" key={member.id}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="rounded-3xl bg-gradient-to-b from-[#111626] via-[#0E121E] to-[#0A0D15] border border-white/12 p-5 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden"
                >
                  {/* Visual Stage */}
                  <div className="relative w-full h-[320px] sm:h-[380px] flex items-end justify-center rounded-2xl bg-gradient-to-b from-[#14192B]/50 to-transparent p-2 overflow-hidden">
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090C15]/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90">
                      <span style={{ color: member.accentColor }}>
                        <TopIcon className="w-3.5 h-3.5" />
                      </span>
                      <span>{member.floatingTopBadge.text}</span>
                    </div>

                    <div className="relative z-10 w-full h-full flex items-end justify-center">
                      <Image
                        src={member.image}
                        alt={member.title}
                        width={680}
                        height={570}
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="w-auto h-full max-h-[310px] sm:max-h-[370px] object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                        priority
                      />
                    </div>

                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#090C15]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#A78BFA]">
                      <span>{member.floatingBottomBadge.text}</span>
                    </div>
                  </div>

                  {/* Info Card */}
                  <div
                    className={`mt-4 rounded-2xl bg-[#090D18]/90 border p-5 ${member.borderClass} ${member.glowClass}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                        style={{ backgroundColor: `${member.accentColor}25` }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-bold text-xl text-white">
                            {member.title}
                          </h3>
                          <span className="font-mono text-xs text-white/40">
                            0{idx + 1}/03
                          </span>
                        </div>
                        <p className="mt-1 font-body text-sm text-white/70">
                          {member.cardTagline}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          aria-label="Previous Crew Member"
                          className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white flex items-center justify-center active:scale-95 transition-transform"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleNext}
                          aria-label="Next Crew Member"
                          className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white flex items-center justify-center active:scale-95 transition-transform"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => setSelectedMember(member)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono tracking-wide"
                      >
                        <span>Read Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#A78BFA]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* INTERACTIVE DOSSIER MODAL / DETAILED SPECIFICATION */}
        {/* ============================================================ */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMember(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                aria-hidden="true"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0C101C] border border-white/15 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
                role="dialog"
                aria-modal="true"
                aria-label={`Dossier: ${selectedMember.title}`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close Dossier"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${selectedMember.accentColor}25` }}
                  >
                    <selectedMember.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#A78BFA] uppercase tracking-wider">
                      {selectedMember.role}
                    </div>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                      {selectedMember.title}
                    </h3>
                  </div>
                </div>

                {/* Quote / Tagline */}
                <blockquote
                  className="my-4 p-4 rounded-xl bg-white/[0.03] border-l-2 text-white/90 italic font-body text-sm sm:text-base leading-relaxed"
                  style={{ borderLeftColor: selectedMember.accentColor }}
                >
                  &ldquo;{selectedMember.quote}&rdquo;
                </blockquote>

                {/* Bio & Philosophy */}
                <div className="space-y-4 my-6">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-1">
                      Background & Discipline
                    </h4>
                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-1">
                      Operating Philosophy
                    </h4>
                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      {selectedMember.philosophy}
                    </p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 my-6 pt-4 border-t border-white/10">
                  {selectedMember.stats.map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                      <div className="font-mono font-bold text-lg sm:text-2xl text-white">
                        {s.value}
                        <span className="text-xs text-[#A78BFA] font-normal ml-0.5">{s.unit}</span>
                      </div>
                      <div className="font-mono text-[10px] text-white/50 uppercase mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Weapons / Tech Stack */}
                <div className="my-6">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-2">
                    Core Arsenal & Weapons
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-white/80"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={selectedMember.serviceLink.href}
                    onClick={() => setSelectedMember(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#5835E5] hover:from-[#8B6DFD] hover:to-[#6540F5] text-white text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(124,92,252,0.5)]"
                  >
                    <span>{selectedMember.serviceLink.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-xs font-mono text-white/50 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export default ShreejanCrewSection;
