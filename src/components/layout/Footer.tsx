"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageSquare, Linkedin, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/i18n";

export function Footer() {
  const [logoError, setLogoError] = useState(false);
  const { t } = useLanguage();
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aishreejan@gmail.com";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";
  const displayPhone = whatsappNumber.startsWith("91") && whatsappNumber.length === 12
    ? `+91 ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
    : `+${whatsappNumber}`;

  return (
    <footer className="w-full bg-[#080A10] text-[#F4F7FB] pt-16 sm:pt-20 pb-24 sm:pb-28 md:pb-6 border-t border-white/10 relative overflow-hidden select-none">
      
      {/* 1. Unified Seamless Pure Violet Horizon Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] max-w-[1500px] h-[520px] sm:h-[680px] bg-[radial-gradient(ellipse_at_50%_115%,rgba(124,92,252,0.32)_0%,rgba(124,92,252,0.15)_35%,rgba(124,92,252,0.03)_60%,transparent_80%)] blur-[100px] sm:blur-[140px] pointer-events-none z-0"
        aria-hidden="true" 
      />

      <div className="site-container-wide relative z-10">
        
        {/* 2. Four Minimalist Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 mb-14 sm:mb-20">
          
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="logo-link inline-block outline-none focus:outline-none ring-0 border-0 select-none"
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
                  SHREEJAN <span className="text-[#7C5CFC]">AI</span>
                </span>
              )}
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-white/60">All systems operational · Mumbai HQ</span>
            </div>

            <p className="font-body text-sm text-[#8E95A5] leading-relaxed max-w-sm">
              Engineering high-conversion latest version Next JS web flagships and autonomous WhatsApp AI sales agents for forward-thinking Indian businesses.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#8E95A5] hover:text-white hover:border-[#7C5CFC] hover:bg-[#7C5CFC]/20 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#8E95A5] hover:text-white hover:border-[#7C5CFC] hover:bg-[#7C5CFC]/20 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#8E95A5] hover:text-white hover:border-[#7C5CFC] hover:bg-[#7C5CFC]/20 transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions & Capabilities (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-white uppercase mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { href: "/services#ai-websites", label: "UI/UX & Web Flagships" },
                { href: "/services#ai-websites", label: "Autonomous WhatsApp AI" },
                { href: "/services#custom-web-apps", label: "Custom Web Platforms" },
                { href: "/services#custom-web-apps", label: "Workflow Automations" },
                { href: "/audit", label: "Website Forensic Audit" },
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

          {/* Column 3: Live Prototypes (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-white uppercase mb-4">
              Prototypes
            </h4>
            <ul className="space-y-2.5 font-body text-sm">
              {[
                { href: "/demos/jewellery", label: "Kanak Heritage Jewels" },
                { href: "/demos/salon", label: "Aura Studio & Spa" },
                { href: "/demos/clinic", label: "Dr. Vora Medical Clinic" },
                { href: "/demos/restaurant", label: "The Bombay Bistro" },
                { href: "/demos/shop", label: "Anayra Fashion D2C" },
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
              Direct Desk
            </h4>
            <div className="space-y-3 font-body text-sm text-[#8E95A5]">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Instant Desk</span>
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#7C5CFC] shrink-0" />
                <span>{contactEmail}</span>
              </a>
              <a
                href={`tel:+${whatsappNumber}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#7C5CFC] shrink-0" />
                <span>{displayPhone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* 3. Taste Skill Meta Row */}
        <div className="border-t border-white/[0.06] pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 gap-3">
          <p>© 2026 SHREEJAN AI SOLUTIONS. 100% Code & Model Ownership.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>·</span>
            <span className="text-white/70">Zero Vendor Lock-in · Mumbai HQ</span>
          </div>
        </div>

        {/* 4. Taste Skill Iconic Finale: Monumental Wordmark (Seamless Blend, No Cut-off Box or Border) */}
        <div className="relative w-full text-center select-none pt-2 pb-0 pointer-events-none px-4 sm:px-8 overflow-hidden">
          <div
            className="flex justify-center w-full"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 85%, transparent 100%)",
            }}
          >
            <span className="font-heading font-black text-[clamp(2.5rem,11.5vw,14rem)] tracking-[-0.03em] leading-[0.9] bg-gradient-to-b from-white/30 via-white/15 to-transparent bg-clip-text text-transparent whitespace-nowrap inline-block px-2">
              Shreejan AI
            </span>
          </div>
        </div>

      </div>

      {/* Discrete AJ Signature in the bottom corner of the website */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-3 right-3 sm:right-5 z-20 pointer-events-auto">
        <span
          className="text-white/[0.08] hover:text-white/40 transition-colors font-mono text-[9px] tracking-widest cursor-default select-none"
          title="AJ"
          aria-hidden="true"
        >
          AJ
        </span>
      </div>
    </footer>
  );
}

export default Footer;
