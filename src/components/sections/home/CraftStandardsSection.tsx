"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Zap, Code2, Users, FileCheck } from "lucide-react";
import { useWorld } from "@/context/WorldContext";

const STANDARDS = [
  {
    icon: Zap,
    title: "Sub-Second Edge Rendering",
    description:
      "Engineered on Next.js 15 with static generation and edge preloading. Your pages load almost instantaneously on Indian mobile 4G networks.",
  },
  {
    icon: Code2,
    title: "Zero Bloated Themes or Page Builders",
    description:
      "Every layout is hand-coded with clean Tailwind CSS and modular React components. No 40-plugin WordPress bloat or unpredictable breakage.",
  },
  {
    icon: FileCheck,
    title: "Complete Code & Asset Ownership",
    description:
      "Upon final milestone settlement, 100% of the repository, source code, and design tokens transfer directly to your GitHub and hosting accounts.",
  },
  {
    icon: Users,
    title: "Direct Founder-Engineer Collaboration",
    description:
      "No account managers or outsourced junior subcontractors. You talk directly with the software engineers building your system.",
  },
];

export function CraftStandardsSection() {
  const { config } = useWorld();

  return (
    <Section className="border-b border-border bg-bg-secondary/20 transition-colors duration-300">
      <Container>
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-bg-secondary text-text font-bold">
              06 // ENGINEERING STANDARDS
            </span>
            <span className="text-xs text-muted font-mono">[ OUR COMMITMENT ]</span>
          </div>
          <h2 className={`${config.fontClass.display} text-3xl sm:text-4xl font-bold text-text tracking-tight`}>
            Built with rigor. Delivered with honesty.
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
            We are a newly established engineering studio in Mumbai. Because our reputation is built on every project we deliver, we adhere to strict architectural standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDARDS.map((std, idx) => {
            const Icon = std.icon;
            return (
              <div
                key={idx}
                className={`${config.cardStyle} p-6 space-y-3 transition-all`}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`${config.fontClass.display} font-bold text-base text-text`}>
                  {std.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed font-sans">
                  {std.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
