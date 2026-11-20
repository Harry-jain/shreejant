"use client";

import React, { useState } from "react";
import { GameMetrics, SignalPersona } from "@/types/signal-game";
import { WorldConfig, WorldId } from "@/types/world";
import { Button } from "@/components/ui/Button";
import {
  RotateCcw,
  ArrowRight,
  Share2,
  Check,
  Compass,
  Zap,
  Award,
} from "lucide-react";

interface SignalGameOverProps {
  metrics: GameMetrics;
  config: WorldConfig;
  onReplay: () => void;
  onSwitchWorld: (worldId: WorldId) => void;
}

export function evaluatePersona(metrics: GameMetrics): SignalPersona {
  const { score, longestChain, totalConnections, mistakes } = metrics;

  // 1. Quiet Thinker: Measured, long chains, low mistakes
  if (longestChain >= 6 || (mistakes <= 1 && totalConnections >= 15)) {
    return {
      id: "quiet-thinker",
      title: "Quiet Thinker",
      tagline: "Measured Architect // Low Noise, High Depth",
      description:
        "You take deliberate time to observe system topology before executing. Your code architectures prioritize stability, longevity, and clear separation of concerns.",
      recommendedWorld: "quiet-authority",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    };
  }

  // 2. Fast Builder: High volume, rapid throughput
  if (totalConnections >= 22) {
    return {
      id: "fast-builder",
      title: "Fast Builder",
      tagline: "High-Velocity Operator // Immediate Edge Delivery",
      description:
        "Relentless momentum and bias for action. You prototype in hours what legacy software committees take weeks to deliberate.",
      recommendedWorld: "mumbai-momentum",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    };
  }

  // 3. Systems Architect: High score, balanced channels
  if (score >= 2000) {
    return {
      id: "systems-architect",
      title: "Systems Architect",
      tagline: "Tactical Orchestrator // Full-Stack Mastery",
      description:
        "You naturally perceive the hidden dependencies between data pipelines, user interfaces, and edge caching. You build resilient, high-throughput digital systems.",
      recommendedWorld: "future-interface",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    };
  }

  // 4. Creative Rebel: Unconventional diagonal paths
  if (metrics.combos >= 3) {
    return {
      id: "creative-rebel",
      title: "Creative Rebel",
      tagline: "Lateral Pioneer // Non-Linear Innovation",
      description:
        "You refuse conventional template constraints. You discover elegant diagonal shortcuts that bypass friction and surprise customers with delightful craft.",
      recommendedWorld: "playful-intelligence",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    };
  }

  // Default: Editorial Precisionist
  return {
    id: "editorial-precisionist",
    title: "Editorial Precisionist",
    tagline: "Craft Purist // Zero Excess",
    description:
      "Rigor and typographic discipline. You strip away digital clutter until only useful, beautiful, and purposeful interface architecture remains.",
    recommendedWorld: "editorial-precision",
    badgeColor: "bg-zinc-100 text-zinc-800 border-zinc-300",
  };
}

export function SignalGameOver({
  metrics,
  config,
  onReplay,
  onSwitchWorld,
}: SignalGameOverProps) {
  const [copied, setCopied] = useState(false);
  const persona = evaluatePersona(metrics);

  const handleCopy = () => {
    const text = `⚡ SHREEJAN Signal Result:\nScore: ${metrics.score.toLocaleString()} | Longest Chain: ${
      metrics.longestChain
    } | Connections: ${metrics.totalConnections}\nPersona: ${persona.title} (${persona.tagline})\nBuilt at shreejanai.in`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Signal Resolved */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block">
            SIGNAL LOCK COMPLETE // 45S RUN
          </span>
          <h3 className={`${config.fontClass.display} text-2xl sm:text-3xl font-bold text-text mt-1`}>
            Your Digital Persona: {persona.title}
          </h3>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-mono font-bold ${persona.badgeColor}`}>
          {persona.tagline}
        </div>
      </div>

      {/* Metrics Score Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-bg border border-border space-y-1">
          <span className="font-mono text-[10px] uppercase text-muted block">Total Score</span>
          <div className="font-mono text-2xl sm:text-3xl font-black text-text">
            {metrics.score.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-bg border border-border space-y-1">
          <span className="font-mono text-[10px] uppercase text-muted block">Longest Chain</span>
          <div className="font-mono text-2xl sm:text-3xl font-black text-accent flex items-baseline gap-1">
            <span>{metrics.longestChain}</span>
            <span className="text-xs font-normal text-muted">nodes</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-bg border border-border space-y-1">
          <span className="font-mono text-[10px] uppercase text-muted block">Connections</span>
          <div className="font-mono text-2xl sm:text-3xl font-black text-text">
            {metrics.totalConnections}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-bg border border-border space-y-1">
          <span className="font-mono text-[10px] uppercase text-muted block">Clean Combos</span>
          <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-600">
            {metrics.combos}x
          </div>
        </div>
      </div>

      {/* Persona Analysis Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-bg border border-border space-y-3 font-sans">
        <div className="flex items-center gap-2 font-mono text-xs text-accent font-bold">
          <Award className="w-4 h-4" />
          <span>HOW YOUR MIND BUILDS SYSTEMS</span>
        </div>
        <p className="text-sm sm:text-base text-text leading-relaxed">
          {persona.description}
        </p>
      </div>

      {/* Recommended Reality Handoff Callout */}
      <div className="p-5 rounded-2xl border-2 border-accent/40 bg-accent/5 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-md">
          <div className="flex items-center gap-2 font-mono text-xs text-accent font-bold">
            <Compass className="w-4 h-4" />
            <span>MATCHING REALITY DISCOVERED</span>
          </div>
          <p className="text-xs text-muted font-sans">
            Your gameplay rhythm aligns directly with our{" "}
            <strong className="text-text font-bold">
              {persona.recommendedWorld.replace("-", " ").toUpperCase()}
            </strong>{" "}
            design reality.
          </p>
        </div>

        <button
          onClick={() => onSwitchWorld(persona.recommendedWorld)}
          className="px-4 py-2.5 rounded-xl bg-accent text-white font-mono text-xs font-bold hover:opacity-90 flex items-center gap-2 transition-all shadow-sm"
        >
          <span>Enter Matching Reality</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Actions Row */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={onReplay}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-text font-mono text-xs font-bold hover:bg-bg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Signal</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-muted hover:text-text font-mono text-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? "Copied Result!" : "Share Signal"}</span>
          </button>
        </div>

        <Button
          href="/contact"
          variant="primary"
          size="default"
          rightIcon={<Zap className="w-4 h-4" />}
        >
          Build a Project With Shreejan
        </Button>
      </div>
    </div>
  );
}
