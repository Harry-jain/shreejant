"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Target, ExternalLink } from "lucide-react";
import { Founder } from "@/lib/founders";
import initialFounders from "@/data/founders.json";

interface FounderShowcaseProps {
  initialData?: Founder[];
}

export function FounderShowcase({ initialData }: FounderShowcaseProps) {
  const [founders, setFounders] = useState<Founder[]>(
    initialData || (initialFounders as Founder[])
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [logoError, setLogoError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mobile Swipe References
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Client-side fetch to ensure live backend updates from /admin/founders
  useEffect(() => {
    async function loadFounders() {
      try {
        const res = await fetch("/api/founders");
        if (res.ok) {
          const data = await res.json();
          if (data.founders && data.founders.length > 0) {
            setFounders(data.founders);
          }
        }
      } catch (err) {
        // Fall back gracefully to initial data
      }
    }
    loadFounders();
  }, []);

  const totalFounders = founders?.length || 0;

  const handleNext = useCallback(() => {
    if (totalFounders === 0) return;
    setActiveIndex((prev) => (prev < totalFounders - 1 ? prev + 1 : 0));
  }, [totalFounders]);

  const handlePrev = useCallback(() => {
    if (totalFounders === 0) return;
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalFounders - 1));
  }, [totalFounders]);

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!founders || founders.length === 0) return null;

  const currentFounder = founders[activeIndex] || founders[0];

  return (
    <section
      id="leadership"
      aria-label="Founders & Systems Architects"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-transparent select-none"
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(124,92,252,0.12)_0%,rgba(56,189,248,0.04)_45%,transparent_70%)] blur-[120px] pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-5xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FOUNDERS & PRINCIPAL ARCHITECTS</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight shrink-0">
              The Minds Behind
            </h2>
            {!logoError ? (
              <div className="relative inline-flex items-center h-12 sm:h-16 md:h-20 w-52 sm:w-72 md:w-80 shrink-0 drop-shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
                <Image
                  src="/brand/logo-transparent.png"
                  alt="SHREEJAN AI SOLUTIONS"
                  fill
                  sizes="(max-width: 640px) 208px, 320px"
                  className="object-contain object-left border-0 outline-none"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="inline-block font-heading font-black text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-[#7C5CFC] via-[#A78BFA] to-[#38BDF8] bg-clip-text text-transparent pb-1 px-3">
                SHREEJAN AI
              </span>
            )}
          </div>
        </div>

        {/* Minimal Founder Selector Tabs with Animated Pill */}
        <div className="flex items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-white/[0.08] overflow-x-auto">
          {founders.map((f, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={f.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  isActive
                    ? "text-white font-bold shadow-[0_0_20px_rgba(124,92,252,0.5)]"
                    : "text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06]"
                }`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFounderPill"
                    className="absolute inset-0 bg-[#7C5CFC] rounded-full border border-[#9D84FF]/60"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-mono text-[11px] opacity-75">0{idx + 1}</span>
                <span className="relative z-10">{f.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Founder Showcase Composite */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-[32px] bg-gradient-to-b from-[#111626] via-[#0E121E] to-[#0A0D15] border border-white/12 p-6 sm:p-12 lg:p-16 overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
        >
          {/* Subtle ambient violet radial lighting inside card */}
          <div className="absolute top-1/3 left-1/4 w-[450px] h-[300px] bg-[#7C5CFC]/[0.09] rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT / CENTER: Layered Visual Composite (5 cols on desktop) */}
            <div className="lg:col-span-5 relative w-full h-[340px] sm:h-[460px] lg:h-[580px] flex items-end justify-center pt-4 sm:pt-8">
              
              {/* Subtle ambient lighting behind 3D character */}
              <div 
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" 
                aria-hidden="true"
              >
                <div className="w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.22)_0%,rgba(212,175,55,0.08)_45%,transparent_70%)] blur-[70px]" />
              </div>

              {/* Transparent 3D Character Portrait Cutout (Clean Foreground Cutout, Seamless Blend, NO background) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`portrait-${currentFounder.id}`}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -24, scale: prefersReducedMotion ? 1 : 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  className="relative z-10 w-full h-full flex items-end justify-center"
                >
                  {currentFounder.portrait_image ? (
                    <div className="relative w-full h-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] flex items-end justify-center">
                      <Image
                        src={currentFounder.portrait_image}
                        alt={currentFounder.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-contain object-bottom drop-shadow-[0_15px_35px_rgba(124,92,252,0.35)] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                        priority
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-56 h-72 rounded-2xl bg-[#13192B] border border-white/10 flex flex-col items-center justify-center text-white/40">
                      <span className="font-heading font-black text-5xl text-[#7C5CFC]">
                        {currentFounder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span className="text-xs font-mono mt-2 text-white/50">
                        SHREEJAN PARTNER
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* RIGHT: Layer 3 — Founder Name, Designation, and Structured Introduction (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${currentFounder.id}`}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -24 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Top Bar: Counter & Role Badge */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
                      <span className="font-bold text-white">0{activeIndex + 1}</span>
                      <span className="text-white/30">/</span>
                      <span className="text-white/40">0{totalFounders}</span>
                    </div>

                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono font-semibold uppercase tracking-wider">
                      {currentFounder.designation}
                    </div>
                  </div>

                  {/* Founder Name */}
                  <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                    {currentFounder.name}
                  </h3>

                  {/* Hook Quote Box */}
                  {(currentFounder.hook || currentFounder.short_intro) && (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white/90 text-sm sm:text-base font-medium leading-snug">
                      <span className="text-[#A78BFA] font-bold text-lg mr-1.5 leading-none">“</span>
                      <span>{currentFounder.hook || currentFounder.short_intro}</span>
                      <span className="text-[#A78BFA] font-bold text-lg ml-1.5 leading-none">”</span>
                    </div>
                  )}

                  {/* Bio Paragraphs with controlled compact spacing */}
                  <div className="space-y-2.5 font-body text-xs sm:text-sm text-white/75 leading-relaxed">
                    {currentFounder.paragraphs && currentFounder.paragraphs.length > 0 ? (
                      currentFounder.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))
                    ) : (
                      <p className="whitespace-pre-line">
                        {currentFounder.short_description ||
                          currentFounder.biography}
                      </p>
                    )}
                  </div>

                  {/* Structured Superpower & Weakness Callouts */}
                  {(currentFounder.superpower || currentFounder.weakness) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {currentFounder.superpower && (
                        <div className="p-3 rounded-xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/25 flex items-start gap-2.5 shadow-sm">
                          <Sparkles className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A78BFA] font-bold block">
                              Superpower
                            </span>
                            <span className="text-xs text-white/90 font-medium leading-snug mt-0.5 block">
                              {currentFounder.superpower}
                            </span>
                          </div>
                        </div>
                      )}

                      {currentFounder.weakness && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 shadow-sm">
                          <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                              Weakness
                            </span>
                            <span className="text-xs text-white/90 font-medium leading-snug mt-0.5 block">
                              {currentFounder.weakness}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Minimal Founder Switch Controls & Profile Link */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrev}
                        aria-label="Previous Founder"
                        className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-[#7C5CFC] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={handleNext}
                        aria-label="Next Founder"
                        className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-[#7C5CFC] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <span className="text-xs font-mono text-white/40">
                        Swipe or click to view
                      </span>
                    </div>

                    {currentFounder.github && (
                      <a
                        href={currentFounder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all hover:scale-105 active:scale-95"
                      >
                        <span>GitHub Profile</span>
                        <ExternalLink className="w-3 h-3 text-[#A78BFA]" />
                      </a>
                    )}
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default FounderShowcase;
