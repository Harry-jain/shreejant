"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { SignalNodeData } from "@/types/signal-game";
import { WorldConfig } from "@/types/world";
import { SignalNode } from "./SignalNode";

interface SignalBoardProps {
  nodes: SignalNodeData[];
  chain: SignalNodeData[];
  config: WorldConfig;
  onAddToChain: (node: SignalNodeData) => void;
  onCommitChain: () => void;
  onClearChain: () => void;
}

// Check if two nodes in a 4x4 grid are adjacent (horizontal, vertical, or diagonal)
export function areNodesAdjacent(a: SignalNodeData, b: SignalNodeData): boolean {
  const rowDiff = Math.abs(a.row - b.row);
  const colDiff = Math.abs(a.col - b.col);
  return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
}

export function SignalBoard({
  nodes,
  chain,
  config,
  onAddToChain,
  onCommitChain,
  onClearChain,
}: SignalBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [lineCoords, setLineCoords] = useState<{ x: number; y: number }[]>([]);

  // Update SVG connection line coordinates when chain changes
  const updateLineCoordinates = useCallback(() => {
    if (!boardRef.current || chain.length < 2) {
      setLineCoords([]);
      return;
    }

    const boardRect = boardRef.current.getBoundingClientRect();
    const nodeElements = boardRef.current.querySelectorAll("button");

    const coords: { x: number; y: number }[] = [];
    chain.forEach((node) => {
      const el = nodeElements[node.index];
      if (el) {
        const rect = el.getBoundingClientRect();
        coords.push({
          x: rect.left - boardRect.left + rect.width / 2,
          y: rect.top - boardRect.top + rect.height / 2,
        });
      }
    });

    setLineCoords(coords);
  }, [chain]);

  useEffect(() => {
    updateLineCoordinates();
    window.addEventListener("resize", updateLineCoordinates);
    return () => window.removeEventListener("resize", updateLineCoordinates);
  }, [updateLineCoordinates]);

  // Pointer event handlers
  const handlePointerDown = (node: SignalNodeData) => {
    setIsPointerDown(true);
    setFocusedIndex(node.index);
    onAddToChain(node);
  };

  const handlePointerEnter = (node: SignalNodeData) => {
    if (isPointerDown) {
      onAddToChain(node);
    }
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isPointerDown) {
        setIsPointerDown(false);
        if (chain.length >= 2) {
          onCommitChain();
        } else if (chain.length === 1) {
          // Keep it or allow tap-to-continue
        }
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    return () => window.removeEventListener("pointerup", handleGlobalPointerUp);
  }, [isPointerDown, chain, onCommitChain]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    let nextIndex = focusedIndex;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (focusedIndex >= 4) nextIndex = focusedIndex - 4;
        break;
      case "ArrowDown":
        e.preventDefault();
        if (focusedIndex <= 11) nextIndex = focusedIndex + 4;
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (focusedIndex % 4 !== 0) nextIndex = focusedIndex - 1;
        break;
      case "ArrowRight":
        e.preventDefault();
        if (focusedIndex % 4 !== 3) nextIndex = focusedIndex + 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (nodes[focusedIndex]) {
          onAddToChain(nodes[focusedIndex]);
        }
        break;
      case "c":
      case "C":
      case "e":
      case "E":
        e.preventDefault();
        if (chain.length >= 2) {
          onCommitChain();
        }
        break;
      case "Escape":
      case "Backspace":
        e.preventDefault();
        onClearChain();
        break;
      default:
        break;
    }

    setFocusedIndex(nextIndex);
  };

  return (
    <div
      ref={boardRef}
      role="grid"
      aria-label="Signal Connection Matrix"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full max-w-md mx-auto aspect-square grid grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-bg border border-border outline-none focus:ring-2 focus:ring-accent select-none touch-none"
    >
      {/* SVG Connecting Splines between chained nodes */}
      {lineCoords.length >= 2 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          aria-hidden="true"
        >
          {lineCoords.map((coord, idx) => {
            if (idx === 0) return null;
            const prev = lineCoords[idx - 1];
            return (
              <line
                key={idx}
                x1={prev.x}
                y1={prev.y}
                x2={coord.x}
                y2={coord.y}
                stroke={config.colors.accent}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      )}

      {/* 16 Nodes in 4x4 Grid */}
      {nodes.map((node) => {
        const chainIndex = chain.findIndex((c) => c.index === node.index);
        const stepInChain = chainIndex !== -1 ? chainIndex + 1 : null;

        return (
          <SignalNode
            key={node.id}
            node={node}
            config={config}
            stepInChain={stepInChain}
            isFocused={focusedIndex === node.index}
            onPointerDown={handlePointerDown}
            onPointerEnter={handlePointerEnter}
          />
        );
      })}
    </div>
  );
}
