"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WorldId, WorldConfig, WORLDS } from "@/types/world";
import { playWorldSwitchSound } from "@/lib/sound";

interface WorldContextType {
  world: WorldId;
  config: WorldConfig;
  transitionState: "idle" | "covering" | "uncovering";
  targetWorld: WorldId | null;
  exploredWorlds: WorldId[];
  switchWorld: (targetId: WorldId) => void;
  surpriseMe: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  isSecretUnlocked: boolean;
  timeSpentInSeconds: number;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

const WORLD_ORDER: WorldId[] = [
  "quiet-authority",
  "mumbai-momentum",
  "future-interface",
  "playful-intelligence",
  "editorial-precision",
  "secret-world",
];

export function WorldProvider({ children }: { children: React.ReactNode }) {
  const [world, setWorld] = useState<WorldId>("quiet-authority");
  const [targetWorld, setTargetWorld] = useState<WorldId | null>(null);
  const [transitionState, setTransitionState] = useState<"idle" | "covering" | "uncovering">("idle");
  const [exploredWorlds, setExploredWorlds] = useState<WorldId[]>(["quiet-authority"]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Apply CSS custom properties dynamically to :root when world changes
  const applyWorldTheme = useCallback((targetConfig: WorldConfig) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    root.style.setProperty("--bg", targetConfig.colors.bg);
    root.style.setProperty("--bg-secondary", targetConfig.colors.accentSecondary || targetConfig.colors.surface);
    root.style.setProperty("--surface", targetConfig.colors.surface);
    root.style.setProperty("--text", targetConfig.colors.text);
    root.style.setProperty("--muted", targetConfig.colors.muted);
    root.style.setProperty("--border", targetConfig.colors.border);
    root.style.setProperty("--accent", targetConfig.colors.accent);
    if (targetConfig.colors.accentSecondary) {
      root.style.setProperty("--accent-secondary", targetConfig.colors.accentSecondary);
    }
    root.setAttribute("data-world", targetConfig.id);
  }, []);

  // Initial mount: check URL search params & localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check sound preference
    const storedSound = localStorage.getItem("shreejan_sound_enabled");
    if (storedSound === "true") setSoundEnabled(true);

    // Check saved exploration history
    try {
      const storedExplored = localStorage.getItem("shreejan_explored_worlds");
      if (storedExplored) {
        const parsed = JSON.parse(storedExplored);
        if (Array.isArray(parsed)) setExploredWorlds(parsed);
      }
    } catch {
      // ignore
    }

    // Check URL param ?world=...
    const params = new URLSearchParams(window.location.search);
    const paramWorld = params.get("world") as WorldId | null;

    if (paramWorld && WORLDS[paramWorld]) {
      setWorld(paramWorld);
      applyWorldTheme(WORLDS[paramWorld]);
    } else {
      const storedWorld = localStorage.getItem("shreejan_active_world") as WorldId | null;
      if (storedWorld && WORLDS[storedWorld]) {
        setWorld(storedWorld);
        applyWorldTheme(WORLDS[storedWorld]);
      } else {
        applyWorldTheme(WORLDS["quiet-authority"]);
      }
    }
  }, [applyWorldTheme]);

  // Time spent counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const switchWorld = useCallback(
    (targetId: WorldId) => {
      if (targetId === world || transitionState !== "idle") return;

      const destConfig = WORLDS[targetId];
      if (!destConfig) return;

      if (soundEnabled) {
        if (targetId === "future-interface" || targetId === "secret-world") {
          playWorldSwitchSound("cyber");
        } else if (targetId === "mumbai-momentum") {
          playWorldSwitchSound("punchy");
        } else {
          playWorldSwitchSound("click");
        }
      }

      setTargetWorld(targetId);
      setTransitionState("covering");

      // Phase 1: Wipe cover in (360ms)
      setTimeout(() => {
        // Change world state and CSS variables while completely covered
        setWorld(targetId);
        applyWorldTheme(destConfig);

        // Update URL search param without reload
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("world", targetId);
          window.history.replaceState({}, "", url.toString());

          // Save to localStorage
          localStorage.setItem("shreejan_active_world", targetId);
        }

        // Add to explored set
        setExploredWorlds((prev) => {
          if (!prev.includes(targetId)) {
            const next = [...prev, targetId];
            if (typeof window !== "undefined") {
              localStorage.setItem("shreejan_explored_worlds", JSON.stringify(next));
            }
            return next;
          }
          return prev;
        });

        // Phase 2: Uncover to reveal new world (380ms)
        setTransitionState("uncovering");

        setTimeout(() => {
          setTransitionState("idle");
          setTargetWorld(null);
        }, 380);
      }, 360);
    },
    [world, transitionState, soundEnabled, applyWorldTheme]
  );

  const surpriseMe = useCallback(() => {
    const available = WORLD_ORDER.filter((id) => id !== world);
    const randomIndex = Math.floor(Math.random() * available.length);
    switchWorld(available[randomIndex]);
  }, [world, switchWorld]);

  const isSecretUnlocked = exploredWorlds.length >= 4 || exploredWorlds.includes("secret-world");

  return (
    <WorldContext.Provider
      value={{
        world,
        config: WORLDS[world],
        transitionState,
        targetWorld,
        exploredWorlds,
        switchWorld,
        surpriseMe,
        soundEnabled,
        setSoundEnabled: (enabled) => {
          setSoundEnabled(enabled);
          if (typeof window !== "undefined") {
            localStorage.setItem("shreejan_sound_enabled", String(enabled));
          }
        },
        isSecretUnlocked,
        timeSpentInSeconds: timeSpent,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error("useWorld must be used within a WorldProvider");
  }
  return context;
}
