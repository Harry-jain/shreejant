import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Sparkles, Stethoscope, Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Sample Sites | SHREEJAN AI SOLUTIONS",
  description:
    "Explore mock websites we built to demonstrate layout, mobile responsiveness, and booking flows for different business types.",
};

const DEMO_CARDS = [
  {
    id: "salon",
    href: "/demos/salon",
    title: "Aura Studio — Salon & Spa",
    category: "Salon & Personal Care",
    icon: Sparkles,
    description: "Hair, styling, and appointment booking mock.",
    features: [
      "Bespoke hair & bridal styling rituals",
      "WhatsApp trial concierge chat preview",
      "Private suite appointment booking mock",
    ],
  },
  {
    id: "clinic",
    href: "/demos/clinic",
    title: "Dr. Vora Clinic — Healthcare",
    category: "Specialist Dermatology & Family OPD",
    icon: Stethoscope,
    description:
      "Doctor profile, consultation services, and appointment request flow.",
    features: [
      "Department directory & transparent fee cards",
      "Smart WhatsApp triage flow demonstration",
      "Patient consultation scheduling mock",
    ],
  },
  {
    id: "restaurant",
    href: "/demos/restaurant",
    title: "The Bombay Bistro — Dining",
    category: "Coastal & Mumbai Street Cuisine",
    icon: Utensils,
    description: "Menu showcase, dining ambiance, and table reservation mock.",
    features: [
      "Categorized heritage menu with regional titles",
      "Dietary & Jain concierge chat preview",
      "Instant table holding reservation mock",
    ],
  },
];

export default function DemosIndexPage() {
  return (
    <div className="min-h-screen bg-bg text-text py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container mx-auto">
        {/* Top return link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shreejan Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-accent/10 text-accent mb-4 border border-accent/20">
            Interactive Demonstrations
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-text mb-4">
            Interactive Sample Sites
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Explore mock websites we built to demonstrate layout, mobile
            responsiveness, and booking flows for different business types.
          </p>
        </header>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DEMO_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <article
                key={card.id}
                className="flex flex-col justify-between rounded-2xl bg-surface border border-border p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div>
                  {/* Prominent disclaimer badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                      Sample site — not a real business
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-muted block font-mono">
                        {card.category}
                      </span>
                      <h2 className="font-heading font-bold text-xl text-text leading-tight">
                        {card.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {card.description}
                  </p>

                  <ul className="space-y-2 mb-8 text-xs sm:text-sm text-text/80">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link
                    href={card.href}
                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    <span>View Demo Site</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Home CTA */}
        <div className="mt-16 text-center border-t border-border pt-12">
          <p className="text-sm text-muted mb-4">
            Need a high-converting, mobile-first website tailored to your business?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-text font-medium text-sm hover:bg-bg transition-colors shadow-sm"
          >
            <span>Return to Shreejan AI Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
