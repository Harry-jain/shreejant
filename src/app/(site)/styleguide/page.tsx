import React from "react";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MessageSquare, Send, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const metadata: Metadata = {
  title: "Styleguide // SHREEJAN Digital Studio",
  description: "Digital Playground design system reference and token verification.",
  robots: {
    index: false,
    follow: false,
  },
};

const COLOR_TOKENS = [
  { name: "--bg", value: "F5F2EA", twClass: "bg-bg", textClass: "text-text", usage: "Warm ivory / paper background" },
  { name: "--bg-secondary", value: "EBE6DA", twClass: "bg-bg-secondary", textClass: "text-text", usage: "Secondary paper cards & badges" },
  { name: "--surface", value: "FFFFFF", twClass: "bg-surface", textClass: "text-text", usage: "Clean white surface containers" },
  { name: "--text", value: "181818", twClass: "bg-text", textClass: "text-bg", usage: "Deep charcoal typography" },
  { name: "--muted", value: "68665F", twClass: "bg-muted", textClass: "text-bg", usage: "Secondary technical copy" },
  { name: "--accent", value: "F05D35", twClass: "bg-accent", textClass: "text-white", usage: "Electric orange primary CTA" },
  { name: "--accent-lime", value: "D7E66B", twClass: "bg-accent-lime", textClass: "text-text", usage: "Acid lime highlight badge" },
  { name: "--accent-blue", value: "B9D8EF", twClass: "bg-accent-blue", textClass: "text-text", usage: "Muted blue engineering token" },
];

export default function StyleguidePage() {
  return (
    <div className="py-8 sm:py-12 bg-bg">
      <Container>
        {/* Intro */}
        <div className="border-b border-border pb-8 mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-surface border border-border text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SHREEJAN // THE DIGITAL PLAYGROUND</span>
          </div>
          <Heading level="h1">Design System &amp; Visual Tokens</Heading>
          <p className="text-muted text-base max-w-2xl leading-relaxed font-sans">
            Inspired by Mistral&apos;s editorial restraint, generous whitespace, asymmetric layouts, and warm paper textures.
          </p>
        </div>

        {/* Section 1: Color Tokens */}
        <Section className="py-8 border-b border-border">
          <div className="space-y-6">
            <div>
              <Heading level="h2">01. Color Palette Tokens</Heading>
              <p className="text-sm text-muted mt-1 font-mono">
                Warm ivory background, deep charcoal text, electric orange, acid lime, and muted blue accents.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COLOR_TOKENS.map((token) => (
                <div
                  key={token.name}
                  className="rounded-xl border border-border bg-surface p-4 space-y-3 shadow-sm"
                >
                  <div
                    className={`h-20 w-full rounded-lg ${token.twClass} border border-border/50 flex items-end p-2.5`}
                  >
                    <span className={`text-xs font-mono font-bold ${token.textClass}`}>
                      {token.name}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-text">
                      {token.name} ({token.value})
                    </div>
                    <div className="text-xs text-muted leading-snug">{token.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 2: Typography Hierarchy */}
        <Section className="py-8 border-b border-border">
          <div className="space-y-6">
            <div>
              <Heading level="h2">02. Typographic Scale</Heading>
              <p className="text-sm text-muted mt-1 font-mono">
                Space Grotesk for display headlines, Inter for body copy, and IBM Plex Mono for technical labels.
              </p>
            </div>

            <div className="space-y-6 p-6 rounded-xl bg-surface border border-border">
              <div className="space-y-1">
                <span className="font-mono text-xs text-muted">Display H1 (Space Grotesk Bold)</span>
                <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-text">
                  Digital Engineering Studio
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-muted">Heading H2 (Space Grotesk Semibold)</span>
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-text">
                  We build the digital systems behind ambitious businesses.
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-muted">Heading H3</span>
                <div className="font-display text-xl sm:text-2xl font-semibold text-text">
                  Interactive Product Showcase &amp; Custom Software
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-muted">Body Text (Inter Regular)</span>
                <p className="text-sm sm:text-base text-text leading-relaxed font-sans max-w-2xl">
                  Simple, calm, readable. The website should be clear first and interesting second. Visitors immediately understand what we build, explore the side quest lab, and experience our engineering craft firsthand.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-muted">Technical Monospace (IBM Plex Mono)</span>
                <div className="font-mono text-xs text-muted bg-bg p-3 rounded-lg border border-border">
                  POST /api/contact [200 OK] // latency: 42ms // payload: validated_zod
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Buttons */}
        <Section className="py-8">
          <div className="space-y-6">
            <div>
              <Heading level="h2">03. Buttons &amp; Interactive Controls</Heading>
              <p className="text-sm text-muted mt-1 font-mono">
                Primary (Electric Orange), Secondary, and Outline variants.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="default">
                  Primary Action (Electric Orange)
                </Button>
                <Button variant="secondary" size="default">
                  Secondary Action
                </Button>
                <Button variant="outline" size="default">
                  Outline Action
                </Button>
                <Button variant="primary" size="default" isLoading>
                  Loading
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
