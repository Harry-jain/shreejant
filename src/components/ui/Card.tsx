import React from "react";

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
    <div
      className={`rounded-xl border border-white/10 bg-white/5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
