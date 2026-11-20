"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useWorld } from "@/context/WorldContext";

const FOOTER_LINKS = {
  work: [
    { href: "/demos", label: "Interactive Demos" },
    { href: "/demos/salon", label: "Aura Studio (Salon)" },
    { href: "/demos/clinic", label: "Dr. Vora Clinic" },
    { href: "/demos/restaurant", label: "The Bombay Bistro" },
  ],
  services: [
    { href: "/services", label: "Websites & Commerce" },
    { href: "/services", label: "AI & Automation" },
    { href: "/services", label: "Custom Software" },
    { href: "/services", label: "Pricing & Inclusions" },
  ],
  studio: [
    { href: "/about", label: "About Shreejan" },
    { href: "/#lab", label: "Side Quest Lab" },
    { href: "/privacy", label: "DPDP Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  const { config, surpriseMe } = useWorld();
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aishreejan@gmail.com";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";

  return (
    <footer className="w-full border-t border-border bg-bg text-text pt-16 pb-12 sm:pt-20 sm:pb-16 bg-paper-lines transition-colors duration-300">
      <Container>
        {/* Massive Editorial Masthead Banner */}
        <div className="border-b border-border pb-12 mb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                SHREEJAN // DIGITAL ENGINEERING STUDIO
              </span>
              <span className="font-mono text-[10px] text-muted uppercase">
                [{config.name} / {config.index}]
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={surpriseMe}
                className="font-mono text-xs text-accent hover:underline flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" /> Switch Reality
              </button>
              <span className="text-border">•</span>
              <span className="font-mono text-xs text-muted">
                EST. 2026 // MUMBAI, MAHARASHTRA
              </span>
            </div>
          </div>

          <h2 className={`${config.fontClass.display} text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-text tracking-tight uppercase leading-none`}>
            SHREEJAN
          </h2>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-border">
          {/* Studio Statement Left (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <p className={`${config.fontClass.display} font-bold text-lg text-text`}>
              We make ambitious ideas work in the real world.
            </p>
            <p className="text-xs text-muted leading-relaxed font-sans max-w-sm">
              An independent creative engineering studio based in Mumbai. We build high-performance
              websites, intelligent automations, and bespoke software systems for ambitious Indian businesses.
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs font-mono text-muted">
              <a
                href={`mailto:${contactEmail}`}
                className="hover:text-accent transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> {contactEmail}
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" /> +91 89765 17353 (WhatsApp)
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Mumbai, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Links Columns Right (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* Work */}
            <div className="space-y-3">
              <div className="font-bold text-text uppercase tracking-wider text-[11px]">
                01. Work
              </div>
              <ul className="space-y-2">
                {FOOTER_LINKS.work.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-muted hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <div className="font-bold text-text uppercase tracking-wider text-[11px]">
                02. Services
              </div>
              <ul className="space-y-2">
                {FOOTER_LINKS.services.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-muted hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Studio */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <div className="font-bold text-text uppercase tracking-wider text-[11px]">
                03. Studio
              </div>
              <ul className="space-y-2">
                {FOOTER_LINKS.studio.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-muted hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            &copy; {new Date().getFullYear()} SHREEJAN AI SOLUTIONS. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px]">Real code. No fabricated claims.</span>
            <span className="text-border">•</span>
            <span>Mumbai, India</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
