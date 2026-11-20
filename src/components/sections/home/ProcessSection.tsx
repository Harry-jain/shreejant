"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Compass, PenTool, Terminal, Rocket } from "lucide-react";
import { useWorld } from "@/context/WorldContext";

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
  const { config } = useWorld();

  return (
    <Section className="border-b border-border bg-surface transition-colors duration-300">
      <Container>
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-bg-secondary text-text font-bold">
              05 // HOW WE WORK
            </span>
            <span className="text-xs text-muted font-mono">[ STRUCTURED EXECUTION ]</span>
          </div>
          <h2 className={`${config.fontClass.display} text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight`}>
            Four stages. Direct communication. Zero guesswork.
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
            Every build follows a predictable four-stage sprint. You get clear milestones, preview URLs at every stage, and direct Slack or WhatsApp communication with the engineers building your site.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className={`${config.cardStyle} p-6 sm:p-7 flex flex-col justify-between transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent">
                      STAGE {stage.step}
                    </span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-bg-secondary text-muted">
                      {stage.timeline}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className={`${config.fontClass.display} font-bold text-xl text-text`}>
                      {stage.title}
                    </h3>
                    <div className="font-mono text-xs text-accent font-medium">
                      {stage.tagline}
                    </div>
                  </div>

                  <p className="text-xs text-muted leading-relaxed font-sans">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
