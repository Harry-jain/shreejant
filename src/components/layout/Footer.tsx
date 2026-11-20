"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/demos", label: "Sample Demos" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const [logoError, setLogoError] = useState(false);
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aishreejan@gmail.com";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";
  const displayPhone =
    whatsappNumber.startsWith("91") && whatsappNumber.length === 12
      ? `+91 ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
      : `+${whatsappNumber}`;

  return (
    <footer className="w-full border-t border-border bg-surface text-muted py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10 pb-10 border-b border-border">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <Link
              href="/"
              className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label="SHREEJAN AI SOLUTIONS Home"
            >
              {!logoError ? (
                <div className="relative h-9 w-40 sm:h-10 sm:w-44">
                  <Image
                    src="/brand/logo-transparent.png"
                    alt="SHREEJAN AI SOLUTIONS"
                    fill
                    sizes="176px"
                    className="object-contain object-left"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <span className="font-bold text-lg tracking-tight text-text">
                  SHREEJAN <span className="text-accent">AI</span>
                </span>
              )}
            </Link>
            <p className="text-sm text-text font-medium">
              Simple, high-performance websites for Mumbai businesses.
            </p>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              We are a new web development agency in Mumbai building fast, clean, and honest websites that help local businesses grow online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
              Direct Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-muted hover:text-text transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="text-muted hover:text-text transition-colors"
                >
                  {displayPhone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} SHREEJAN AI SOLUTIONS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-text transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-border">|</span>
            <Link href="/terms" className="hover:text-text transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
