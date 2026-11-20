"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FixTheChaosQuest } from "./side-quests/FixTheChaosQuest";
import { AutomateThisQuest } from "./side-quests/AutomateThisQuest";
import { BuildStorefrontQuest } from "./side-quests/BuildStorefrontQuest";
import { FindBottleneckQuest } from "./side-quests/FindBottleneckQuest";
import { RealityMatrixQuest } from "./side-quests/RealityMatrixQuest";
import { Cpu, Layout, HelpCircle, Terminal, Compass } from "lucide-react";
import { useWorld } from "@/context/WorldContext";

const QUEST_TABS = [
  {
    id: "05",
    title: "Reality Matrix",
    tagline: "6 Design Worlds",
    icon: Compass,
    badge: "CORE EXPLORER",
  },
  {
    id: "01",
    title: "Fix the Chaos",
    tagline: "Before & After Redesign",
    icon: Layout,
  },
  {
    id: "02",
    title: "Automate This",
    tagline: "Live Workflow Engine",
    icon: Cpu,
  },
  {
    id: "03",
    title: "Build a Storefront",
    tagline: "Frontend Customizer",
    icon: Terminal,
  },
  {
    id: "04",
    title: "Find the Bottleneck",
    tagline: "60-sec Site Self-Check",
    icon: HelpCircle,
  },
];

export function SideQuestLab() {
  const [activeQuest, setActiveQuest] = useState("05");
  const { config } = useWorld();

  return (
    <Section id="lab" className="border-t border-border bg-bg-secondary/40 relative transition-colors duration-300">
      <Container>
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent text-white font-bold">
              SIDE QUEST LAB
            </span>
            <span className="text-xs text-muted font-mono">[ INTERACTIVE EXPERIMENTS ]</span>
          </div>

          <h2 className={`${config.fontClass.display} text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight`}>
            Take a little detour.
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
            Rather than reading dry feature checklists, explore what becomes possible when engineering
            meets curiosity. Real, client-side interactive experiences.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {QUEST_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeQuest === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveQuest(tab.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all relative ${
                  isActive
                    ? "bg-surface border-accent shadow-sm ring-1 ring-accent"
                    : "bg-surface/60 border-border hover:bg-surface hover:border-text/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-accent">
                    QUEST {tab.id}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted"}`} />
                </div>
                <div className="font-display font-bold text-sm text-text truncate">
                  {tab.title}
                </div>
                <div className="text-[11px] text-muted truncate font-sans">
                  {tab.tagline}
                </div>
                {tab.badge && (
                  <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-accent text-white rounded font-mono text-[9px] font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Quest Container */}
        <div className={`${config.cardStyle} p-6 sm:p-8 md:p-10 transition-all`}>
          {activeQuest === "05" && <RealityMatrixQuest />}
          {activeQuest === "01" && <FixTheChaosQuest />}
          {activeQuest === "02" && <AutomateThisQuest />}
          {activeQuest === "03" && <BuildStorefrontQuest />}
          {activeQuest === "04" && <FindBottleneckQuest />}
        </div>
      </Container>
    </Section>
  );
}
