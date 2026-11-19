"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function GlobalCursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Deterministic initial coordinates for stable SSR hydration
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 600);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 3 : 300);

  // Fluid physics springs for organic trailing
  const springX = useSpring(mouseX, { stiffness: 85, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 85, damping: 22 });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 3);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Global Ambient Base Flare (Center Top) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(124,92,252,0.12)_0%,rgba(56,189,248,0.04)_45%,transparent_70%)] blur-[140px]" />

      {/* 2. Interactive Cursor-Tracking Spotlight Glow (Mounted on Client Only) */}
      {mounted ? (
        <>
          <motion.div
            className="fixed -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full blur-[100px] transition-opacity duration-500"
            style={{
              x: springX,
              y: springY,
              opacity: isHovered ? 0.75 : 0.35,
              background:
                "radial-gradient(circle, rgba(124, 92, 252, 0.4) 0%, rgba(157, 132, 255, 0.2) 30%, rgba(56, 189, 248, 0.08) 55%, transparent 75%)",
            }}
          />

          {/* Secondary Cyan Micro-Highlight Following Cursor */}
          <motion.div
            className="fixed -top-[160px] -left-[160px] w-[320px] h-[320px] rounded-full blur-[60px] transition-opacity duration-700"
            style={{
              x: springX,
              y: springY,
              opacity: isHovered ? 0.6 : 0.2,
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(124, 92, 252, 0.15) 45%, transparent 70%)",
            }}
          />
        </>
      ) : (
        <div
          className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[100px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 92, 252, 0.4) 0%, rgba(157, 132, 255, 0.2) 30%, rgba(56, 189, 248, 0.08) 55%, transparent 75%)",
          }}
        />
      )}

      {/* 3. Subtle Bioluminescent Technical Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
    </div>
  );
}

export default GlobalCursorGlow;

