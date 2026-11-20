"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useWorld } from "@/context/WorldContext";

export function WorldCursor() {
  const { config } = useWorld();
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if pointer is fine (mouse, trackpad)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "BUTTON" ||
        target?.tagName === "A" ||
        target?.closest("button") ||
        target?.closest("a") ||
        target?.getAttribute("role") === "button"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const cursorType = config.cursorType;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9990] hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {/* 1. Crosshair (Future Interface & Secret Lab) */}
      {cursorType === "crosshair" && (
        <div className="relative -top-3 -left-3">
          <div className="w-6 h-6 border border-accent/80 rounded-none flex items-center justify-center">
            <div className="w-1 h-1 bg-accent" />
          </div>
          <div className="absolute top-1/2 -left-2 w-1.5 h-[1px] bg-accent/80" />
          <div className="absolute top-1/2 -right-2 w-1.5 h-[1px] bg-accent/80" />
          <div className="absolute -top-2 left-1/2 w-[1px] h-1.5 bg-accent/80" />
          <div className="absolute -bottom-2 left-1/2 w-[1px] h-1.5 bg-accent/80" />
          {isPointer && (
            <span className="absolute top-7 left-3 font-mono text-[9px] uppercase px-1 py-0.2 bg-surface text-accent border border-accent/40 select-none">
              LOCK
            </span>
          )}
        </div>
      )}

      {/* 2. Ring (Playful Intelligence) */}
      {cursorType === "ring" && (
        <motion.div
          className="relative -top-4 -left-4 rounded-full border-2 border-accent"
          animate={{
            width: isPointer ? 44 : 32,
            height: isPointer ? 44 : 32,
            backgroundColor: isPointer ? "rgba(139, 92, 246, 0.15)" : "transparent",
          }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-accent" />
        </motion.div>
      )}

      {/* 3. Minimal / Bold (Mumbai Momentum) */}
      {cursorType === "minimal" && (
        <div className="relative -top-2.5 -left-2.5">
          <motion.div
            className="w-5 h-5 border-2 border-text bg-accent"
            animate={{
              rotate: isPointer ? 45 : 0,
              scale: isPointer ? 1.25 : 1,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* 4. Editorial Razor Line (Editorial Precision) */}
      {cursorType === "editorial" && (
        <div className="relative -top-3 -left-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-full h-[1px] bg-text" />
            <div className="h-full w-[1px] bg-text absolute" />
          </div>
        </div>
      )}

      {/* 5. Dot (Quiet Authority) */}
      {cursorType === "dot" && (
        <motion.div
          className="relative -top-3 -left-3 rounded-full border border-accent/60 bg-accent/20"
          animate={{
            width: isPointer ? 32 : 24,
            height: isPointer ? 32 : 24,
          }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-accent" />
        </motion.div>
      )}
    </motion.div>
  );
}
