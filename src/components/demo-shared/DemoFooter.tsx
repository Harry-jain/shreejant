"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export interface DemoFooterProps {
  brandName: string;
  domain: string;
  address: string;
  hours: string;
  phone?: string;
  email?: string;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    accent: string;
  };
}

export function DemoFooter({
  brandName,
  domain,
  address,
  hours,
  phone = "+91 98765 00000",
  email,
  palette,
}: DemoFooterProps) {
  const actualEmail = email || `hello@${domain}`;

  return (
    <footer
      className="w-full border-t pt-14 pb-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: palette.bg,
        borderColor: `${palette.ink}15`,
        color: palette.ink,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <h3 className="font-heading font-black text-xl tracking-tight">
              {brandName}
            </h3>
            <p className="font-body text-xs sm:text-sm opacity-70 leading-relaxed">
              Engineered with sub-second latest version Next JS velocity, WhatsApp autonomous sales workflows, and 100% code ownership.
            </p>
            {/* Social Icons (Instagram, Facebook, YouTube as inline SVG) */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg border flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all"
                style={{ borderColor: `${palette.ink}20` }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg border flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all"
                style={{ borderColor: `${palette.ink}20` }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.657 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg border flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all"
                style={{ borderColor: `${palette.ink}20` }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Location Address */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider opacity-90">
              Address & Location
            </h4>
            <div className="flex items-start gap-2 text-xs sm:text-sm opacity-70">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-current" />
              <span>{address}</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider opacity-90">
              Hours of Operation
            </h4>
            <div className="flex items-start gap-2 text-xs sm:text-sm opacity-70">
              <Clock className="w-4 h-4 shrink-0 mt-0.5 text-current" />
              <span>{hours}</span>
            </div>
          </div>

          {/* Contact Direct Desk */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider opacity-90">
              Direct Desk
            </h4>
            <div className="space-y-1.5 text-xs sm:text-sm opacity-80">
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 hover:underline">
                <Phone className="w-3.5 h-3.5" />
                <span>{phone}</span>
              </a>
              <a href={`mailto:${actualEmail}`} className="flex items-center gap-2 hover:underline">
                <Mail className="w-3.5 h-3.5" />
                <span>{actualEmail}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-mono opacity-50 gap-3" style={{ borderColor: `${palette.ink}12` }}>
          <span>© 2026 {brandName}. Engineered by Shreejan AI Solutions.</span>
          <span>Mumbai · Pune · Nashik · Bengaluru</span>
        </div>
      </div>
    </footer>
  );
}

export default DemoFooter;

