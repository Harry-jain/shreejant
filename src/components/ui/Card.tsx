import React from "react";
import { GlassCard } from "./GlassCard";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  highlighted?: boolean;
}

export function Card({
  children,
  className = "",
  hoverEffect = true,
  highlighted = false,
  ...props
}: CardProps) {
  return (
    <GlassCard
      variant={highlighted ? "gold" : "default"}
      className={className}
      {...props}
    >
      {children}
    </GlassCard>
  );
}
