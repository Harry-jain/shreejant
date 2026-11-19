"use client";

import React from "react";
import { useReveal } from "@/lib/useReveal";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  as?: React.ElementType;
}

export function Reveal({
  children,
  delayMs = 0,
  className = "",
  as: Component = "div",
  style,
  ...rest
}: RevealProps) {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();

  return (
    <Component
      ref={ref}
      className={`reveal-wrapper ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
