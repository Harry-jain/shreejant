import React from "react";
import Link from "next/link";

export interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export function GoldButton({
  variant = "primary",
  href,
  target,
  rel,
  className = "",
  children,
  ...rest
}: GoldButtonProps) {
  const baseClasses =
    "min-h-[46px] min-w-[44px] inline-flex items-center justify-center font-heading font-semibold rounded-full px-7 py-3 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 cursor-pointer text-center select-none text-[15px] tracking-tight";

  const variantClasses =
    variant === "primary"
      ? "bg-[#7C5CFC] hover:bg-[#6847ED] text-white shadow-[0_4px_20px_rgba(124,92,252,0.4)] hover:shadow-[0_6px_28px_rgba(124,92,252,0.6)] hover:scale-[1.02] active:scale-[0.98]"
      : "bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:scale-[1.02] active:scale-[0.98]";

  const combinedClass = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...rest}>
      {children}
    </button>
  );
}
