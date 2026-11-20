import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Section({
  children,
  className = "",
  as: Component = "section",
  ...props
}: SectionProps) {
  return (
    <Component
      className={`py-12 sm:py-16 md:py-20 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
