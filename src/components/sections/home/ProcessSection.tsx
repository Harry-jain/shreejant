"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Compass, PenTool, Terminal, Rocket } from "lucide-react";

const STAGES = [
  {
    step: "01",
    title: "Discover",
    tagline: "Architecture & Scope",
    description:
      "We unpack your business goals, target audience, and workflow friction. No vague proposals—we agree on exact page deliverables, technical requirements, and milestone dates.",
    icon: Compass,
    timeline: "Week 01",
  },
  {
    step: "02",
    title: "Design",
    tagline: "Typography & Layout",
    description:
      "Bespoke layout design built around your brand identity. We establish color tokens, typographic hierarchy, responsive breakpoints, and mobile interaction states.",
    icon: PenTool,
    timeline: "Week 02",
  },
  {
    step: "03",
    title: "Engineer",
    tagline: "Next.js & Automations",
    description:
      "Clean TypeScript code built on Next.js 15. We integrate form validations, WhatsApp desks, database hooks, and edge caching for sub-second page performance.",
    icon: Terminal,
    timeline: "Week 03",
  },
  {
    step: "04",
    title: "Launch",
    tagline: "Testing & Handoff",
    description:
      "Cross-browser testing, SEO audit, DNS configuration, and production deployment. Full source code repository and design assets transfer directly to your account.",
    icon: Rocket,
    timeline: "Launch Day",
  },
];

export function ProcessSection() {
  return (
    <Section className="border-b border-border bg-surface">
      <Container>
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-bg-secondary text-text font-bold">
              05 // HOW WE WORK
            </span>
            <span className="text-xs text-muted font-mono">[ STRUCTURED EXECUTION ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
            Four stages. Direct communication. Zero guesswork.
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
            You work directly with the engineers building your website. Structured milestone reviews,
            clear timelines, and full transparency from kickoff to final handoff.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="p-6 rounded-2xl border border-border bg-bg/50 space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-accent">
                      {stage.step}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-border text-muted">
                      {stage.timeline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-text" />
                    <h3 className="font-display text-lg font-bold text-text">
                      {stage.title}
                    </h3>
                  </div>

                  <div className="font-mono text-xs text-muted font-semibold">
                    {stage.tagline}
                  </div>

                  <p className="text-xs text-muted leading-relaxed font-sans">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 text-[11px] font-mono text-text/60">
                  Phase Milestone Checkpoint
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
