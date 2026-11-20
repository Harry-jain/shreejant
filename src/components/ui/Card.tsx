import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = "",
  hoverEffect = false,
  ...props
}: CardProps) {
  const hoverStyles = hoverEffect
    ? "transition-colors duration-150 hover:border-muted"
    : "";

  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
