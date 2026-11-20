"use client";

import React from "react";
import { useWorld } from "@/context/WorldContext";
import { WORLDS, WorldId } from "@/types/world";
import { Compass, Sparkles, Check, Lock, Shuffle, Volume2 } from "lucide-react";

export function RealityMatrixQuest() {
  const {
    world,
    config,
    exploredWorlds,
    switchWorld,
    surpriseMe,
    isSecretUnlocked,
  } = useWorld();

  const worldKeys = Object.keys(WORLDS) as WorldId[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block">
            QUEST 05 // REALITY MATRIX
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-text">
            One Agency. Six Design Realities.
          </h3>
          <p className="text-xs text-muted font-sans mt-0.5">
            Same truthful facts, identical services, and clean code. Radically different creative systems.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2 py-1 rounded bg-accent/15 text-accent font-bold">
            {exploredWorlds.length}/6 Explored
          </span>
          <button
            onClick={surpriseMe}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border bg-surface hover:border-accent text-text"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Surprise Me</span>
          </button>
        </div>
      </div>

      {/* Grid of Worlds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {worldKeys.map((wId) => {
          const w = WORLDS[wId];
          const isActive = world === wId;
          const isExplored = exploredWorlds.includes(wId);
          const isLocked = wId === "secret-world" && !isSecretUnlocked;

          return (
            <div
              key={wId}
              onClick={() => {
                if (!isLocked) switchWorld(wId);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? "bg-surface border-accent shadow-md ring-2 ring-accent"
                  : isLocked
                  ? "bg-bg/40 border-dashed border-border opacity-50 cursor-not-allowed"
                  : "bg-surface/70 border-border hover:bg-surface hover:border-text/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-border"
                    style={{ backgroundColor: w.colors.accent }}
                  />
                  <span className="font-mono text-xs font-bold text-text">
                    {w.index} {w.name}
                  </span>
                </div>
                {isActive ? (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-accent font-bold">
                    <Check className="w-3 h-3" /> ACTIVE
                  </span>
                ) : isLocked ? (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted">
                    <Lock className="w-3 h-3" /> UNLOCK AT 4+
                  </span>
                ) : isExplored ? (
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-border/40 text-muted">
                    Seen
                  </span>
                ) : (
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-accent/20 text-accent font-bold">
                    NEW
                  </span>
                )}
              </div>

              <p className="text-xs text-muted font-sans line-clamp-2 mb-3">
                {w.tagline}
              </p>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted">
                <span className="uppercase font-semibold text-text">{w.energyLabel}</span>
                <span>{w.cursorType} cursor</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active World Diagnostics Panel */}
      <div className="p-4 sm:p-5 rounded-xl bg-bg border border-border space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-muted pb-2 border-b border-border">
          <div className="flex items-center gap-2 text-accent font-bold">
            <Compass className="w-4 h-4" />
            <span>CURRENT ACTIVE REALITY: {config.name.toUpperCase()}</span>
          </div>
          <span className="text-[11px]">{config.whyThisWorld.emotionalResponse}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-sans">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-muted block">
              Layout & Spatial Geometry
            </span>
            <p className="text-text">{config.whyThisWorld.layout}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-muted block">
              Strategic Objective
            </span>
            <p className="text-text">{config.whyThisWorld.communicationGoal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
