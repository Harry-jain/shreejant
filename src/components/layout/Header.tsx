"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#lab", label: "Side Quest Lab" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/95 backdrop-blur-md">
      <Container>
        <div className="flex h-16 sm:h-18 items-center justify-between gap-4">
          {/* Brand Logo / Monogram */}
          <Link
            href="/"
            className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg group"
            aria-label="SHREEJAN Home"
          >
            {!logoError ? (
              <div className="relative h-8 w-32 sm:h-9 sm:w-36">
                <Image
                  src="/brand/logo-transparent.png"
                  alt="SHREEJAN AI SOLUTIONS"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight text-text">
                  SHREEJAN
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
            )}
            <span className="hidden lg:inline-block font-mono text-[10px] text-muted uppercase tracking-wider pl-2 border-l border-border">
              Digital Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-text bg-bg-secondary font-bold"
                      : "text-muted hover:text-text hover:bg-bg-secondary/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text hover:bg-bg-secondary transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 px-2 space-y-2 bg-surface rounded-b-2xl shadow-lg animate-in slide-in-from-top-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-mono font-medium text-text hover:bg-bg rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <Button
                href="/contact"
                variant="primary"
                size="default"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
