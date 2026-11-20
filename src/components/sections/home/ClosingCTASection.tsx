"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function ClosingCTASection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Shreejan AI, I would like to discuss building a project for my business."
  )}`;

  return (
    <Section className="bg-surface relative overflow-hidden">
      <Container>
        <div className="rounded-3xl border border-border bg-bg p-8 sm:p-12 md:p-16 relative overflow-hidden">
          <div className="absolute -inset-[60px] bg-paper-grid animate-dot-breathe pointer-events-none" />
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent text-white font-bold">
                07 // START A PROJECT
              </span>
              <span className="text-xs text-muted font-mono">[ NEXT STEPS ]</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.08]">
              Have an idea that deserves to exist?
            </h2>

            <p className="text-base sm:text-lg text-muted font-sans leading-relaxed">
              Let&apos;s turn it into something real. Whether you need a high-converting website,
              an intelligent WhatsApp workflow, or a custom web platform, we&apos;re ready to engineer it.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/contact" variant="primary" size="lg" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button
                href={whatsappUrl}
                variant="outline"
                size="lg"
                leftIcon={<MessageSquare className="w-4 h-4 text-emerald-600" />}
              >
                Chat on WhatsApp
              </Button>
            </div>

            <div className="pt-6 border-t border-border flex flex-wrap items-center gap-6 text-xs font-mono text-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Typical initial reply within 24 hours</span>
              </div>
              <div>Direct founder-level response</div>
              <div>Based in Mumbai, Maharashtra</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
