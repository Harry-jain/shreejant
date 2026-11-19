"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function FloatingParticles({ count = 12 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 3 + (i % 4) * 2;
        const left = `${(i * 19) % 95}%`;
        const top = `${(i * 23) % 90}%`;
        const duration = 6 + (i % 5) * 3;
        const delay = (i % 4) * 1.5;

        return (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.15 }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-[#7C5CFC]"
            style={{
              width: size,
              height: size,
              left,
              top,
            }}
          />
        );
      })}
    </div>
  );
}

