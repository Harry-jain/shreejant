"use client";

import React from "react";
import { motion } from "framer-motion";
import { SignalNodeData } from "@/types/signal-game";
import { WorldConfig } from "@/types/world";
import { Cpu, Zap, Activity } from "lucide-react";

interface SignalNodeProps {
  node: SignalNodeData;
  config: WorldConfig;
  stepInChain: number | null; // 1-based index if in chain, else null
  isFocused: boolean;
  onPointerDown: (node: SignalNodeData) => void;
  onPointerEnter: (node: SignalNodeData) => void;
}

const CHANNEL_ICONS = [Cpu, Zap, Activity];
const CHANNEL_NAMES = ["SYS", "DATA", "PULSE"];

export function SignalNode({
  node,
  config,
  stepInChain,
  isFocused,
  onPointerDown,
  onPointerEnter,
}: SignalNodeProps) {
  const Icon = CHANNEL_ICONS[node.channel];
  const isConnected = stepInChain !== null;
  const isEnergized = node.state === "energized";

  // World-dependent node shape classes
  const getShapeClasses = () => {
    switch (config.id) {
      case "editorial-precision":
        return "rounded-none border-text";
      case "mumbai-momentum":
        return "rounded-xl border-2 border-text shadow-[2px_2px_0px_#0D0D0D]";
      case "future-interface":
      case "secret-world":
        return "rounded-none border border-accent/60 bg-[#0E1315]";
      case "playful-intelligence":
        return "rounded-2xl border-2 border-border shadow-sm";
      case "quiet-authority":
      default:
        return "rounded-xl border border-border shadow-sm";
    }
  };

  // Channel color scheme based on active world accent
  const getChannelColors = () => {
    if (isConnected) {
      return {
        bg: config.colors.accent,
        text: "#FFFFFF",
        border: config.colors.accent,
      };
    }
    if (node.channel === 0) {
      return {
        bg: "var(--surface)",
        text: config.colors.accent,
        border: "var(--border)",
      };
    }
    if (node.channel === 1) {
      return {
        bg: "var(--surface)",
        text: "var(--text)",
        border: "var(--border)",
      };
    }
    return {
      bg: "var(--surface)",
      text: config.colors.muted,
      border: "var(--border)",
    };
  };

  const colors = getChannelColors();

  return (
    <motion.button
      type="button"
      tabIndex={0}
      aria-label={`Node ${node.row + 1},${node.col + 1} Channel ${CHANNEL_NAMES[node.channel]} ${
        isConnected ? `Step ${stepInChain}` : ""
      }`}
      onPointerDown={(e) => {
        e.preventDefault();
        onPointerDown(node);
      }}
      onPointerEnter={() => onPointerEnter(node)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isEnergized
          ? { scale: [1, 1.25, 0.9, 1], opacity: [1, 0.4, 1] }
          : isConnected
          ? { scale: 1.06, y: -2 }
          : { scale: 1, y: 0 }
      }
      transition={{ duration: 0.16 }}
      className={`relative w-full aspect-square min-w-[48px] min-h-[48px] p-2 flex flex-col items-center justify-between select-none touch-none cursor-pointer transition-colors ${getShapeClasses()} ${
        isFocused ? "ring-2 ring-accent ring-offset-2" : ""
      }`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
      }}
    >
      {/* Top Bar inside Node: Channel ID & Chain Step */}
      <div className="w-full flex items-center justify-between text-[9px] font-mono leading-none pointer-events-none">
        <span className="font-bold opacity-80">{CHANNEL_NAMES[node.channel]}</span>
        {isConnected && (
          <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px] shadow-sm">
            {stepInChain}
          </span>
        )}
      </div>

      {/* Center Icon */}
      <div className="my-auto pointer-events-none">
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isConnected ? "text-white" : ""}`} />
      </div>

      {/* Bottom Coordinates Indicator */}
      <div className="w-full text-center text-[8px] font-mono opacity-50 pointer-events-none truncate">
        {config.id === "future-interface" || config.id === "secret-world"
          ? `0x${node.index.toString(16)}`
          : `${node.row}:${node.col}`}
      </div>

      {/* Active pulse aura when connected */}
      {isConnected && (
        <span
          className="absolute inset-0 rounded-inherit border-2 border-white/50 animate-ping pointer-events-none"
          style={{ animationDuration: "1.2s" }}
        />
      )}
    </motion.button>
  );
}
