import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
  variant?: "small" | "large" | "gold" | "surface"; // backwards compatibility mapping
}

export function Badge({
  children,
  size = "sm",
  variant,
  className = "",
}: BadgeProps) {
  const isLarge = size === "lg" || variant === "large" || variant === "surface";

  if (isLarge) {
    return (
      <span
        className={`badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 text-[#7C5CFC] dark:text-[#9D84FF] font-mono text-[12px] font-semibold uppercase tracking-[0.18em] select-none whitespace-normal shadow-sm ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        <span>{children}</span>
      </span>
    );
  }

  // Small variant
  return (
    <span
      className={`badge inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 text-[#7C5CFC] dark:text-[#9D84FF] font-mono font-semibold text-[11px] uppercase tracking-[0.18em] select-none whitespace-normal shadow-xs ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
      <span>{children}</span>
    </span>
  );
}
