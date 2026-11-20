"use client";

import React from "react";
import { WorldProvider } from "@/context/WorldContext";
import { WorldTransitionOverlay } from "@/components/world/WorldTransitionOverlay";
import { WorldCursor } from "@/components/world/WorldCursor";
import { WorldSwitcherDock } from "@/components/world/WorldSwitcherDock";

export function WorldClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <WorldProvider>
      <WorldTransitionOverlay />
      <WorldCursor />
      {children}
      <WorldSwitcherDock />
    </WorldProvider>
  );
}
