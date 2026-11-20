"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorld } from "@/context/WorldContext";
import { WORLDS, WorldId } from "@/types/world";
import {
  Compass,
  Shuffle,
  Volume2,
  VolumeX,
  Info,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Lock,
  Check,
  X,
  ArrowRight,
} from "lucide-react";

export function WorldSwitcherDock() {
  const {
    world,
    config,
    exploredWorlds,
    switchWorld,
    surpriseMe,
    soundEnabled,
    setSoundEnabled,
    isSecretUnlocked,
  } = useWorld();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);

  const worldKeys = Object.keys(WORLDS) as WorldId[];
  const currentIndex = worldKeys.indexOf(world);
  const nextWorldId = worldKeys[(currentIndex + 1) % (isSecretUnlocked ? 6 : 5)];
  const nextWorldConfig = WORLDS[nextWorldId];

  return (
    <>
      {/* Floating Switcher Dock */}
      <aside aria-label="Design World Explorer" className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end gap-2 font-mono">
        {/* Secret World Unlock Toast notification if just unlocked */}
        <AnimatePresence>
          {isSecretUnlocked && !exploredWorlds.includes("secret-world") && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border-2 border-accent text-accent px-3 py-1.5 rounded-lg shadow-lg text-xs flex items-center gap-2 select-none"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Secret Reality Unlocked: The Deep Lab</span>
              <button
                onClick={() => switchWorld("secret-world")}
                className="underline ml-1 font-bold hover:text-text"
              >
                Enter
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded World Selector Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-[calc(100vw-1.5rem)] sm:w-96 rounded-2xl border border-border bg-surface/95 backdrop-blur-xl p-4 shadow-2xl mb-1 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-text uppercase tracking-wider">
                    Design World Navigator
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted">
                  <span>{exploredWorlds.length}/6 Explored</span>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 hover:text-text rounded-md hover:bg-border/30"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-border/40 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${(exploredWorlds.length / 6) * 100}%` }}
                />
              </div>

              {/* World Grid List */}
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {worldKeys.map((id) => {
                  const w = WORLDS[id];
                  const isActive = world === id;
                  const isExplored = exploredWorlds.includes(id);
                  const isLocked = id === "secret-world" && !isSecretUnlocked;

                  return (
                    <button
                      key={id}
                      disabled={isLocked}
                      onClick={() => {
                        if (!isLocked) {
                          switchWorld(id);
                          setIsDrawerOpen(false);
                        }
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all text-xs ${
                        isActive
                          ? "bg-accent/10 border-accent text-text font-bold ring-1 ring-accent"
                          : isLocked
                          ? "opacity-40 border-dashed border-border bg-bg/50 cursor-not-allowed"
                          : "border-border hover:border-text/40 hover:bg-bg/60 text-muted hover:text-text"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-border"
                          style={{ backgroundColor: w.colors.accent }}
                        />
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-muted">{w.index}</span>
                            <span className="truncate">{w.name}</span>
                          </div>
                          <span className="text-[10px] text-muted block truncate font-sans">
                            {w.energyLabel} • {w.tagline.slice(0, 36)}...
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 ml-2">
                        {isActive ? (
                          <span className="flex items-center gap-1 text-[10px] text-accent font-bold">
                            <Check className="w-3 h-3" /> ACTIVE
                          </span>
                        ) : isLocked ? (
                          <Lock className="w-3 h-3 text-muted" />
                        ) : isExplored ? (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-border/40 text-muted">
                            Explored
                          </span>
                        ) : (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-accent/20 text-accent font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action row inside drawer */}
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    surpriseMe();
                    setIsDrawerOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-accent hover:underline font-bold"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Surprise Reality</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsWhyModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-muted hover:text-text"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Why this world?</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Pill Dock Bar */}
        <div className="flex items-center gap-1.5 bg-surface/95 backdrop-blur-xl border border-border shadow-xl rounded-2xl p-1.5 text-xs text-text select-none">
          {/* World index & name pill with toggle */}
          <button
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-bg transition-colors group"
            title="Choose a different design world"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: config.colors.accent }}
              />
              <span className="font-bold text-text uppercase tracking-wider text-[11px] sm:text-xs">
                {config.index} {config.name}
              </span>
            </div>
            <span className="hidden md:inline-block px-1.5 py-0.2 bg-border/40 rounded text-[9px] text-muted uppercase">
              {config.energyLabel}
            </span>
            {isDrawerOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-muted group-hover:text-text" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-muted group-hover:text-text" />
            )}
          </button>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-border" />

          {/* Next World Quick Switcher */}
          <button
            onClick={() => switchWorld(nextWorldId)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-bg hover:bg-border/30 transition-colors text-muted hover:text-text"
            title={`Next: ${nextWorldConfig.name}`}
          >
            <span className="text-[10px] uppercase font-mono">Next: {nextWorldConfig.name}</span>
            <ArrowRight className="w-3 h-3 text-accent" />
          </button>

          {/* Random Surprise Button */}
          <button
            onClick={surpriseMe}
            className="p-1.5 rounded-xl hover:bg-bg transition-colors text-muted hover:text-accent"
            title="Surprise me with another reality"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-xl transition-colors ${
              soundEnabled
                ? "text-accent bg-accent/10"
                : "text-muted hover:text-text hover:bg-bg"
            }`}
            title={soundEnabled ? "Mute interactive audio" : "Enable tactile sound clicks"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Why this world Modal button */}
          <button
            onClick={() => setIsWhyModalOpen(true)}
            className="p-1.5 rounded-xl hover:bg-bg transition-colors text-muted hover:text-text"
            title="Read design rationale behind this world"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* "Why This World?" Editorial Rationale Modal */}
      <AnimatePresence>
        {isWhyModalOpen && (
          <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xl relative space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsWhyModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-border text-muted hover:text-text hover:bg-bg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent font-bold">
                  <span>DESIGN RATIONALE</span>
                  <span>•</span>
                  <span>{config.index}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text">
                  {config.name}
                </h3>
                <p className="font-sans text-sm text-muted">{config.tagline}</p>
              </div>

              {/* Rationale Grid */}
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 rounded-xl bg-bg border border-border space-y-1">
                  <span className="font-mono uppercase font-bold text-accent text-[10px] tracking-wider block">
                    Layout & Rhythm
                  </span>
                  <p className="text-text leading-relaxed">{config.whyThisWorld.layout}</p>
                </div>

                <div className="p-3 rounded-xl bg-bg border border-border space-y-1">
                  <span className="font-mono uppercase font-bold text-accent text-[10px] tracking-wider block">
                    Typography & Contrast
                  </span>
                  <p className="text-text leading-relaxed">{config.whyThisWorld.typography}</p>
                </div>

                <div className="p-3 rounded-xl bg-bg border border-border space-y-1">
                  <span className="font-mono uppercase font-bold text-accent text-[10px] tracking-wider block">
                    Motion & Physics
                  </span>
                  <p className="text-text leading-relaxed">{config.whyThisWorld.motion}</p>
                </div>

                <div className="p-3 rounded-xl bg-bg border border-border space-y-1">
                  <span className="font-mono uppercase font-bold text-accent text-[10px] tracking-wider block">
                    Emotional Response
                  </span>
                  <p className="text-text leading-relaxed">{config.whyThisWorld.emotionalResponse}</p>
                </div>

                <div className="p-3 rounded-xl bg-bg border border-border space-y-1">
                  <span className="font-mono uppercase font-bold text-accent text-[10px] tracking-wider block">
                    Communication Goal
                  </span>
                  <p className="text-text leading-relaxed">{config.whyThisWorld.communicationGoal}</p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-2 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => {
                    surpriseMe();
                    setIsWhyModalOpen(false);
                  }}
                  className="text-accent hover:underline font-bold flex items-center gap-1"
                >
                  <Shuffle className="w-3.5 h-3.5" /> Next Reality
                </button>
                <button
                  onClick={() => setIsWhyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-text text-bg font-bold hover:opacity-90"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
