import React from "react";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MessageSquare, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const metadata: Metadata = {
  title: "Styleguide | SHREEJAN AI SOLUTIONS",
  description: "Temporary design system reference for Phase 3 UI primitives and token verification.",
  robots: {
    index: false,
    follow: false,
  },
};

const COLOR_TOKENS = [
  { name: "--bg", value: "FAFAF9", twClass: "bg-bg", textClass: "text-text", usage: "Main page background" },
  { name: "--surface", value: "FFFFFF", twClass: "bg-surface", textClass: "text-text", usage: "Cards, modals, inputs, header" },
  { name: "--text", value: "111827", twClass: "bg-text", textClass: "text-surface", usage: "Primary headings & body copy" },
  { name: "--muted", value: "6B7280", twClass: "bg-muted", textClass: "text-surface", usage: "Secondary copy & captions" },
  { name: "--border", value: "E5E7EB", twClass: "bg-border", textClass: "text-text", usage: "Dividers, container borders" },
  { name: "--accent", value: "1D4ED8", twClass: "bg-accent", textClass: "text-white", usage: "Primary CTA & interactive brand focus" },
  { name: "--accent-hover", value: "1E40AF", twClass: "bg-accent-hover", textClass: "text-white", usage: "Hover state for primary actions" },
];

export default function StyleguidePage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Intro */}
        <div className="border-b border-border pb-8 mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-surface border border-border text-accent">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Phase 3 Design System Verified</span>
          </div>
          <Heading level="h1">Design System &amp; Tokens</Heading>
          <p className="text-muted text-base max-w-2xl leading-relaxed">
            Temporary reference route for Phase 3 tokens and UI primitives. Clean, light-theme brochure design system built with zero hardcoded hex values in components.
          </p>
        </div>

        {/* Section 1: Color Tokens */}
        <Section className="py-8 border-b border-border">
          <div className="space-y-6">
            <div>
              <Heading level="h2">1. Color Palette Tokens</Heading>
              <p className="text-muted text-sm mt-1">
                Single source of truth in <code>globals.css</code> mapped directly through Tailwind CSS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {COLOR_TOKENS.map((token) => (
                <div
                  key={token.name}
                  className="rounded-xl border border-border bg-surface p-4 space-y-3"
                >
                  <div
                    className={`h-20 w-full rounded-lg border border-border flex items-end p-2.5 ${token.twClass}`}
                  >
                    <span className={`text-xs font-mono font-semibold ${token.textClass}`}>
                      var({token.name})
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-mono text-text">
                      {token.name}
                    </div>
                    <div className="text-xs text-muted mt-0.5">{token.usage}</div>
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
              <Heading level="h2">2. Typography Hierarchy</Heading>
              <p className="text-muted text-sm mt-1">
                Single font family (Inter) with 3 heading levels and calibrated body scale.
              </p>
            </div>

            <Card className="space-y-8">
              <div className="space-y-2 pb-6 border-b border-border">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  Level 1 Heading (`h1`)
                </span>
                <Heading level="h1">
                  High-Performance Websites for Ambitious Mumbai Businesses
                </Heading>
              </div>

              <div className="space-y-2 pb-6 border-b border-border">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  Level 2 Heading (`h2`)
                </span>
                <Heading level="h2">
                  What We Build: Fast, Honest Digital Solutions
                </Heading>
              </div>

              <div className="space-y-2 pb-6 border-b border-border">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  Level 3 Heading (`h3`)
                </span>
                <Heading level="h3">
                  Clinic, Salon, and Restaurant Demos
                </Heading>
              </div>

              <div className="space-y-2 pb-6 border-b border-border">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  Body Copy (Regular)
                </span>
                <p className="text-text text-base leading-relaxed max-w-3xl">
                  We are a 3-person web agency in Mumbai. We don&apos;t make exaggerated promises or claim thousands of clients. Instead, we build fast, mobile-first Next.js websites that give your local business a clean and professional digital presence.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  Muted Secondary Copy
                </span>
                <p className="text-muted text-sm leading-relaxed max-w-3xl">
                  Every site is hosted on ultra-reliable infrastructure, optimized for mobile screens, and delivered with full source ownership.
                </p>
              </div>
            </Card>
          </div>
        </Section>

        {/* Section 3: Buttons */}
        <Section className="py-8 border-b border-border">
          <div className="space-y-6">
            <div>
              <Heading level="h2">3. Button Primitives</Heading>
              <p className="text-muted text-sm mt-1">
                Primary, secondary, and outline variants with full accessibility, focus rings, and link support.
              </p>
            </div>

            <Card className="space-y-8">
              {/* Variants */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-text">Variants (Default Size)</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="outline">Outline Action</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-text">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm">Small (sm)</Button>
                  <Button variant="primary" size="default">Default</Button>
                  <Button variant="primary" size="lg">Large (lg)</Button>
                </div>
              </div>

              {/* States */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-text">States &amp; Icons</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    With Right Icon
                  </Button>
                  <Button variant="secondary" leftIcon={<MessageSquare className="w-4 h-4" />}>
                    With Left Icon
                  </Button>
                  <Button variant="primary" isLoading>
                    Loading State
                  </Button>
                  <Button variant="secondary" disabled>
                    Disabled State
                  </Button>
                  <Button href="/contact" variant="primary">
                    Rendered as Link
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Section 4: Form Elements */}
        <Section className="py-8 border-b border-border">
          <div className="space-y-6">
            <div>
              <Heading level="h2">4. Form Primitives (Input &amp; Textarea)</Heading>
              <p className="text-muted text-sm mt-1">
                Accessible form fields with labels, helper text, and error indicators.
              </p>
            </div>

            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="e.g. Ramesh Patel"
                  helperText="Enter your full name as registered."
                  required
                />
                <Input
                  label="Phone / WhatsApp Number"
                  placeholder="e.g. +91 98200 12345"
                  helperText="We will contact you via WhatsApp or phone."
                  required
                />
                <Input
                  label="Email Address (with error state demo)"
                  placeholder="e.g. invalid-email"
                  defaultValue="invalid-email@"
                  error="Please enter a valid email address (e.g. name@domain.com)."
                  required
                />
                <Input
                  label="Disabled Field"
                  placeholder="Cannot type here"
                  disabled
                  helperText="This field is currently disabled."
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Project Requirements"
                    placeholder="Tell us what kind of website or automation your business needs..."
                    helperText="Describe your business, preferred timeline, and key features."
                    rows={3}
                    required
                  />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex justify-end">
                <Button variant="primary" rightIcon={<Send className="w-4 h-4" />}>
                  Submit Inquiry
                </Button>
              </div>
            </Card>
          </div>
        </Section>

        {/* Section 5: Cards & Layout */}
        <Section className="py-8">
          <div className="space-y-6">
            <div>
              <Heading level="h2">5. Cards &amp; Layout Primitives</Heading>
              <p className="text-muted text-sm mt-1">
                Clean 1px borders, 12px border radius, subtle hover feedback without heavy drop shadows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-muted uppercase">Default Card</div>
                  <Heading level="h3">Static Container</Heading>
                  <p className="text-sm text-muted leading-relaxed">
                    Clean surface background with standard 1px border. Perfect for information presentation.
                  </p>
                </div>
              </Card>

              <Card hoverEffect>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-accent uppercase">Interactive Card</div>
                  <Heading level="h3">Hover Highlight</Heading>
                  <p className="text-sm text-muted leading-relaxed">
                    Subtle 1px border highlight on hover. No heavy elevation shadows or GPU-straining glows.
                  </p>
                </div>
              </Card>

              <Card hoverEffect>
                <div className="space-y-3">
                  <div className="text-xs font-mono text-muted uppercase">Action Card</div>
                  <Heading level="h3">Explore Demos</Heading>
                  <p className="text-sm text-muted leading-relaxed">
                    Test sample websites for salons, clinics, and restaurants.
                  </p>
                  <Button href="/demos" variant="outline" size="sm">
                    View Demos
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
