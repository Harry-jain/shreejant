"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "default",
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // FIX 3: Strict 3-variant button system with 6px border-radius
    let variantStyles = "";
    let sizeStyles = "";

    if (variant === "primary") {
      variantStyles =
        "cta-liquid bg-[#090C15] text-white dark:bg-white dark:text-[#090C15] hover:bg-[#121626] dark:hover:bg-white/90 font-heading font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md";
      if (size === "sm") {
        sizeStyles = "px-5 py-2 text-[13px] rounded-full tracking-tight";
      } else if (size === "lg") {
        sizeStyles = "px-9 py-4 text-[16px] rounded-full tracking-tight";
      } else {
        sizeStyles = "px-7 py-3 text-[15px] rounded-full tracking-tight";
      }
    } else if (variant === "secondary") {
      variantStyles =
        "bg-black/5 dark:bg-white/10 text-ink dark:text-white border border-black/10 dark:border-white/15 font-heading font-semibold hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-200 shadow-sm";
      if (size === "sm") {
        sizeStyles = "px-5 py-2 text-[13px] rounded-full tracking-tight";
      } else if (size === "lg") {
        sizeStyles = "px-9 py-4 text-[16px] rounded-full tracking-tight";
      } else {
        sizeStyles = "px-7 py-3 text-[15px] rounded-full tracking-tight";
      }
    } else if (variant === "ghost") {
      variantStyles =
        "group inline-flex items-center gap-1.5 bg-transparent text-ink/70 dark:text-white/70 hover:text-[#7C5CFC] font-body font-medium text-[14px] p-2 border-none transition-colors duration-200";
      sizeStyles = "";
    }

    const combinedClassName = `relative inline-flex items-center justify-center select-none disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${sizeStyles} ${className}`;

    const innerContent = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
        {variant === "ghost" && !rightIcon && (
          <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} prefetch={true} className={combinedClassName}>
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);

Button.displayName = "Button";
