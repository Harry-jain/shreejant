"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Globe, Bot, Layers, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  outcomes: string[];
  techStack: string[];
  illustrationType: "browser" | "nodes" | "terminal";
}

const SERVICES: ServiceItem[] = [
  {
    id: "websites",
    number: "01",
    title: "Websites & Digital Commerce",
    tagline: "High-performance websites engineered for credibility and conversion.",
    description:
      "We replace bloated templates with clean Next.js 15 architectures. Every page loads in under a second on mobile, ranks cleanly on Google, and turns visitors into confirmed leads.",
    outcomes: [
      "Sub-second load times on real 4G networks",
      "Tailor-made typography and responsive layouts",
      "Automated lead capture & WhatsApp click-to-chat",
      "Full source code ownership with zero lock-in",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel Edge"],
    illustrationType: "browser",
  },
  {
    id: "automation",
    number: "02",
    title: "AI & Business Automation",
    tagline: "Intelligent workflows that handle customer inquiries and booking 24/7.",
    description:
      "Connect your lead acquisition channels directly to WhatsApp, appointment calendars, and CRM databases. Stop losing customers to delayed replies or phone tag.",
    outcomes: [
      "Instant WhatsApp auto-responder with dynamic booking options",
      "Automated appointment scheduling without double-booking",
      "Real-time team notifications on Telegram or WhatsApp groups",
      "Clean webhook integrations between forms and databases",
    ],
    techStack: ["WhatsApp Cloud API", "Python FastAPI", "Webhooks", "Supabase"],
    illustrationType: "nodes",
  },
  {
    id: "platforms",
    number: "03",
    title: "Custom Platforms & Software",
    tagline: "Bespoke web applications, internal tools, and client portals.",
    description:
      "When off-the-shelf software doesn't fit your operational workflow, we build custom portals, role-based dashboards, and relational database systems tailored to your business.",
    outcomes: [
      "Secure role-based authentication (Client, Staff, Admin)",
      "Structured relational databases with automated backups",
      "Custom analytics & operational reporting dashboards",
      "RESTful API design and third-party software integrations",
    ],
    techStack: ["PostgreSQL", "Next.js App Router", "Tailwind", "REST APIs"],
    illustrationType: "terminal",
  },
];

export function ServicesExplorer() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);

  return (
    <Section id="services" className="border-b border-border bg-surface">
      <Container>
        {/* Editorial Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-bg-secondary text-text font-bold">
                02 // CAPABILITIES
              </span>
              <span className="text-xs text-muted font-mono">[ WHAT WE BUILD ]</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
              Three engineering pillars. No generic templates.
            </h2>
          </div>
          <Button href="/services" variant="outline" size="default" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            View Transparent Pricing
          </Button>
        </div>

        {/* Asymmetric Services Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Service Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-bg-secondary border-accent shadow-sm ring-1 ring-accent"
                      : "bg-surface border-border hover:bg-bg/40 hover:border-text/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-accent">
                      {service.number} &mdash; SERVICE
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-white uppercase font-bold">
                        ACTIVE VIEW
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-text">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                    {service.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Interactive Detail & Technical Visual Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-bg p-6 sm:p-8 md:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div className="font-mono text-xs text-accent font-bold">
                {selectedService.number} &mdash; {selectedService.title.toUpperCase()}
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {selectedService.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded bg-surface border border-border text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-2xl sm:text-3xl font-bold text-text">
                {selectedService.tagline}
              </h4>
              <p className="text-sm text-muted leading-relaxed font-sans">
                {selectedService.description}
              </p>
            </div>

            {/* Inclusions / Outcomes Grid */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
                ENGINEERING SPECIFICATIONS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface border border-border text-xs flex items-start gap-2.5"
                  >
                    <div className="w-4 h-4 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-text leading-snug font-sans">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-muted">
                Transparent milestones. Full repository handoff.
              </div>
              <Button href="/contact" variant="primary" size="default" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Discuss This Scope ↗
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
