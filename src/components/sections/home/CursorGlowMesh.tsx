"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorGlowMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fixed deterministic initial coordinates for 100% hydration stability
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(300);

  // Smooth physics-based spring trailing
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only track when cursor is reasonably within or near the hero
      if (y >= -150 && y <= rect.height + 150) {
        mouseX.set(x);
        mouseY.set(y);
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Ambient Center Violet Flare */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(124,92,252,0.18)_0%,rgba(56,189,248,0.06)_40%,transparent_70%)] blur-[120px]" />

      {/* 2. Interactive Cursor-Tracking Spotlight Glow (Mounted on Client Only) */}
      {mounted ? (
        <>
          <motion.div
            className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full blur-[90px] transition-opacity duration-500"
            style={{
              x: springX,
              y: springY,
              opacity: isHovered ? 0.85 : 0.45,
              background:
                "radial-gradient(circle, rgba(124, 92, 252, 0.45) 0%, rgba(157, 132, 255, 0.25) 30%, rgba(56, 189, 248, 0.12) 55%, transparent 75%)",
            }}
          />

          {/* Secondary Cyan Micro-Highlight */}
          <motion.div
            className="absolute -top-[180px] -left-[180px] w-[360px] h-[360px] rounded-full blur-[60px] transition-opacity duration-700"
            style={{
              x: springX,
              y: springY,
              opacity: isHovered ? 0.7 : 0.25,
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(124, 92, 252, 0.2) 40%, transparent 70%)",
            }}
          />
        </>
      ) : (
        /* Static Pre-Hydration Glow to prevent layout shifts and SSR mismatches */
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[90px] opacity-45"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 92, 252, 0.45) 0%, rgba(157, 132, 255, 0.25) 30%, rgba(56, 189, 248, 0.12) 55%, transparent 75%)",
          }}
        />
      )}

      {/* 3. Bioluminescent Technical Dot Grid illuminated by the Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

      {/* 4. Deep Horizon Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,#090C15_85%)]" />
    </div>
  );
}

export default CursorGlowMesh;
