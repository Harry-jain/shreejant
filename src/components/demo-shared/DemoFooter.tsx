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
      id="footer"
      className="w-full border-t pt-14 pb-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: palette.bg,
        borderColor: "rgba(0, 0, 0, 0.12)",
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
              Interactive business website demonstration engineered for mobile-first speed, WhatsApp customer journeys, and seamless online booking.
            </p>
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

          {/* Operating Hours */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider opacity-90">
              Operating Hours
            </h4>
            <div className="flex items-start gap-2 text-xs sm:text-sm opacity-70">
              <Clock className="w-4 h-4 shrink-0 mt-0.5 text-current" />
              <span>{hours}</span>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider opacity-90">
              Direct Inquiries
            </h4>
            <div className="space-y-1.5 text-xs sm:text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-current" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-current" />
                <span>{actualEmail}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75">
          <p>
            © {new Date().getFullYear()} {brandName}. Sample demonstration prototype.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/demos" className="underline hover:opacity-100">
              All Sample Sites
            </Link>
            <Link href="/" className="underline hover:opacity-100">
              Shreejan AI Solutions Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DemoFooter;
