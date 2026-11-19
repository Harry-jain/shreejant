"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function SplashCurtain() {
  const [animating, setAnimating] = useState(false);
  const [curtainsUp, setCurtainsUp] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if splash was already seen in this session
    const seen = sessionStorage.getItem("sd_splash_seen") === "1";

    if (seen) {
      setVisible(false);
      return;
    }

    // Phase 1: Logo pulse & glow impact (0 to 650ms)
    // Phase 2: Smooth transition lift of curtains and logo dissolve (650ms)
    const liftTimer = setTimeout(() => {
      setAnimating(true);
    }, 650);

    const curtainTimer = setTimeout(() => {
      setCurtainsUp(true);
    }, 850);

    // Phase 3: Complete transition, reveal website, and unmount
    const cleanup = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("sd_splash_seen", "1");
    }, 1800);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(curtainTimer);
      clearTimeout(cleanup);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`sd-splash fixed inset-0 z-[100] overflow-hidden pointer-events-none select-none transition-opacity duration-700 ease-out ${
        curtainsUp ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to SHREEJAN AI SOLUTIONS"
    >
      {/* 5 Vertical Architectural Slat Curtains Sliding Gracefully Upward */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-full flex-1 bg-[#090C15] border-r border-white/[0.04] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: curtainsUp ? "translateY(-102%)" : "translateY(0%)",
              transitionDelay: `${i * 70}ms`,
            }}
          />
        ))}
      </div>

      {/* Atmospheric Ambient Glow & Radiant Reveal */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-700 ease-out"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "scale(1.08) translateY(-30px)" : "scale(1) translateY(0)",
        }}
      >
        {/* Pulsing Backlight Behind Logo */}
        <div className="absolute w-[450px] sm:w-[650px] h-[300px] sm:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.22)_0%,rgba(124,92,252,0.25)_45%,transparent_70%)] blur-[90px] pointer-events-none -z-10" />

        <div className="flex flex-col items-center gap-5 px-4 text-center">
          {/* Prominent Large Brand Mark */}
          <div className="relative w-72 h-20 sm:w-96 sm:h-28 md:w-[480px] md:h-36 drop-shadow-[0_10px_35px_rgba(124,92,252,0.35)]">
            <Image
              src="/brand/logo-transparent.png"
              alt="SHREEJAN AI SOLUTIONS"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#7C5CFC] animate-ping" />
            <p className="font-heading font-semibold text-xs sm:text-sm uppercase tracking-[0.32em] text-[#A78BFA]">
              Engineering Intelligence · Building Tomorrow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

