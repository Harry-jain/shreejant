"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorld } from "@/context/WorldContext";
import { WORLDS } from "@/types/world";

export function WorldTransitionOverlay() {
  const { transitionState, targetWorld, config } = useWorld();

  const isTransitioning = transitionState !== "idle";
  const activeDestination = targetWorld ? WORLDS[targetWorld] : config;
  const colors = activeDestination.transitionColors;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {/* Layer 1: Background wipe */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor: colors[0] }}
            initial={{ x: "-100%" }}
            animate={{ x: transitionState === "covering" ? "0%" : "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Layer 2: Middle accent sweep */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor: colors[1] }}
            initial={{ x: "-100%" }}
            animate={{ x: transitionState === "covering" ? "0%" : "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Layer 3: Destination reveal wipe */}
          <motion.div
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-6"
            style={{ backgroundColor: colors[2] }}
            initial={{ x: "-100%" }}
            animate={{ x: transitionState === "covering" ? "0%" : "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* World Monogram Flash */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 select-none"
            >
              <div
                className="font-mono text-xs uppercase tracking-widest font-bold"
                style={{ color: colors[1] }}
              >
                ENTERING REALITY // {activeDestination.index}
              </div>
              <h2
                className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight"
                style={{ color: activeDestination.colors.text }}
              >
                {activeDestination.name}
              </h2>
              <p
                className="font-mono text-xs max-w-sm mx-auto"
                style={{ color: activeDestination.colors.muted }}
              >
                {activeDestination.tagline}
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
