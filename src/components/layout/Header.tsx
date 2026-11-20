"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/demos", label: "Demos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Shreejan AI, I would like to enquire about building a website for my business."
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo / Name */}
          <Link
            href="/"
            className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            aria-label="SHREEJAN AI SOLUTIONS Home"
          >
            {!logoError ? (
              <div className="relative h-9 w-40 sm:h-10 sm:w-44">
                <Image
                  src="/brand/logo-transparent.png"
                  alt="SHREEJAN AI SOLUTIONS"
                  fill
                  sizes="(max-width: 640px) 160px, 176px"
                  className="object-contain object-left"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="font-bold text-lg tracking-tight text-text">
                SHREEJAN <span className="text-accent">AI</span>
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "text-accent font-semibold"
                      : "text-muted hover:text-text hover:bg-bg"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Button
              href={whatsappUrl}
              variant="secondary"
              size="sm"
              leftIcon={<MessageSquare className="w-3.5 h-3.5 text-accent" />}
              aria-label="Chat with us on WhatsApp"
            >
              WhatsApp
            </Button>
            <Button href="/contact" variant="primary" size="sm">
              Contact Us
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted hover:text-text hover:bg-bg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-accent font-semibold bg-bg"
                        : "text-muted hover:text-text hover:bg-bg"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 flex flex-col gap-2 border-t border-border">
              <Button
                href={whatsappUrl}
                variant="secondary"
                size="default"
                className="w-full justify-center"
                leftIcon={<MessageSquare className="w-4 h-4 text-accent" />}
              >
                Chat on WhatsApp
              </Button>
              <Button
                href="/contact"
                variant="primary"
                size="default"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
