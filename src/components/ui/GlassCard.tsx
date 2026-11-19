import React from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "strong" | "gold";
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  as: Component = "div",
  className = "",
  children,
  ...rest
}: GlassCardProps) {
  const variantClass =
    variant === "strong"
      ? "glass-strong"
      : variant === "gold"
      ? "glass-gold"
      : "glass";

  return (
    <Component className={`${variantClass} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
