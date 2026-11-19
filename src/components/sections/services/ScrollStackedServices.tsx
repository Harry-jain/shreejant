"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ServiceItem } from "@/types";
import { PRIMARY_SERVICES } from "@/lib/services-data";
import { ServiceVisualCard } from "./ServiceVisualCard";

interface StackedCardItemProps {
  service: ServiceItem;
  index: number;
  total: number;
}

function StackedCardItem({ service, index, total }: StackedCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking for stacking animation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Under card scales down to 0.96 and dims to 0.7 as the next card scrolls over it
  const isLast = index === total - 1;
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || isLast ? [1, 1] : [1, 0.96]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || isLast ? [1, 1] : [1, 0.7]
  );

  const stickyTop = 96 + index * 16;

  return (
    <div
      ref={cardRef}
      className="relative w-full mb-12 sm:mb-16 md:mb-20 last:mb-0"
      style={{ minHeight: "380px" }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: `${stickyTop}px`,
        }}
        className="md:sticky w-full transition-transform"
      >
        <ServiceVisualCard
          service={service}
          variant="stacked"
          index={index}
          totalCards={total}
        />
      </motion.div>
    </div>
  );
}

export function ScrollStackedServices() {
  return (
    <div className="w-full relative py-6">
      <div className="site-container-wide max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {PRIMARY_SERVICES.map((service, index) => (
          <StackedCardItem
            key={service.id}
            service={service}
            index={index}
            total={PRIMARY_SERVICES.length}
          />
        ))}
      </div>
    </div>
  );
}

export default ScrollStackedServices;

