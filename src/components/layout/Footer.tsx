"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageSquare, Linkedin, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const [logoError, setLogoError] = useState(false);
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aishreejan@gmail.com";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";
  const displayPhone = whatsappNumber.startsWith("91") && whatsappNumber.length === 12
    ? `+91 ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
    : `+${whatsappNumber}`;

  return (
    <footer className="w-full bg-[#080A10] text-[#F4F7FB] pt-16 sm:pt-20 pb-24 sm:pb-28 md:pb-6 border-t border-white/10 relative overflow-hidden select-none">
      <div className="site-container-wide relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Four Minimalist Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 mb-14 sm:mb-20">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="logo-link inline-block outline-none"
              aria-label="SHREEJAN AI SOLUTIONS Home"
            >
              {!logoError ? (
                <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-all duration-200">
                  <Image
                    src="/brand/logo-transparent.png"
                    alt="SHREEJAN AI SOLUTIONS"
                    fill
                    sizes="(max-width: 768px) 176px, 208px"
                    className="object-contain object-left border-0 outline-none"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <span className="font-heading font-black text-2xl tracking-tight text-white">
                  SHREEJAN <span className="text-[#1D4ED8]">AI</span>
                </span>
              )}
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-white/60">Mumbai, Maharashtra, India</span>
            </div>

            <p className="font-body text-sm text-[#8E95A5] leading-relaxed max-w-sm">
              Mumbai web development &amp; AI automation agency. Building clean, high-performance Next.js websites and automated workflows for Indian businesses.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#8E95A5] hover:text-white hover:border-[#1D4ED8] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#8E95A5] hover:text-white hover:border-[#1D4ED8] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#8E95A5] hover:text-white hover:border-[#1D4ED8] transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions & Capabilities (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-white uppercase mb-4">
              What We Build
            </h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { href: "/services", label: "Business Websites" },
                { href: "/services", label: "WhatsApp & Chat Automations" },
                { href: "/services", label: "Custom Web Applications" },
                { href: "/services", label: "Pricing & Plans" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#8E95A5] hover:text-white transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Live Demos (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-white uppercase mb-4">
              Sample Demos
            </h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { href: "/demos/salon", label: "Aura Studio (Salon)" },
                { href: "/demos/clinic", label: "Dr. Vora Clinic (Healthcare)" },
                { href: "/demos/restaurant", label: "The Bombay Bistro" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#8E95A5] hover:text-white transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Desk (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-white uppercase mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 font-body text-sm text-[#8E95A5]">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <span>{contactEmail}</span>
              </a>
              <a
                href={`tel:+${whatsappNumber}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <span>{displayPhone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Row */}
        <div className="border-t border-white/[0.08] pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 gap-3">
          <p>© 2026 SHREEJAN AI SOLUTIONS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>·</span>
            <span className="text-white/70">Mumbai, Maharashtra</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
