import React from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: "h1" | "h2" | "h3";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
}

const levelStyles: Record<NonNullable<HeadingProps["level"]>, string> = {
  h1: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text",
  h2: "text-2xl sm:text-3xl font-semibold tracking-tight text-text",
  h3: "text-xl sm:text-2xl font-semibold text-text",
};

export function Heading({
  level = "h1",
  as,
  children,
  className = "",
  ...props
}: HeadingProps) {
  const Component = as || level;

  return (
    <Component
      className={`${levelStyles[level]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
