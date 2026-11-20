"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface DemoHeaderProps {
  brandName: string;
  logoIcon?: React.ReactNode;
  navLinks: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    accent: string;
  };
}

export function DemoHeader({
  brandName,
  logoIcon,
  navLinks,
  ctaLabel = "Book Now",
  ctaHref = "#booking",
  palette,
}: DemoHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors"
      style={{
        backgroundColor: palette.bg,
        borderColor: "rgba(0, 0, 0, 0.1)",
        color: palette.ink,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo Wordmark */}
        <Link href="#" className="flex items-center gap-2.5 group">
          {logoIcon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-sm"
              style={{ backgroundColor: palette.accent }}
            >
              {logoIcon}
            </div>
          )}
          <span className="font-heading font-black text-lg sm:text-xl tracking-tight">
            {brandName}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: palette.ink }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary CTA Button (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-bold text-xs sm:text-sm text-white shadow-md hover:scale-105 active:scale-95 transition-all"
            style={{ backgroundColor: palette.accent }}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg border border-current/15 opacity-80 hover:opacity-100"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-4 pt-3 pb-6 space-y-3"
          style={{
            backgroundColor: palette.surface,
            borderColor: "rgba(0, 0, 0, 0.1)",
            color: palette.ink,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-body text-base font-medium py-2 opacity-80 hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={ctaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-heading font-bold text-sm text-white shadow-md"
              style={{ backgroundColor: palette.accent }}
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default DemoHeader;
