"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Pulse {
  col: number;
  row: number;
  targetCol: number;
  targetRow: number;
  progress: number; // 0 to 1
  speed: number;
  stepsRemaining: number;
}

export function AICircuitCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [chipHovered, setChipHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Grid Dimensions
    const COLS = 12;
    const ROWS = 8;
    const activeNodes: Map<string, number> = new Map(); // key "col,row" -> timestamp

    // Pulse system
    let pulses: Pulse[] = [];
    const maxPulses = 5;

    const spawnPulse = (): Pulse => {
      const startCol = Math.floor(Math.random() * COLS);
      const startRow = Math.floor(Math.random() * ROWS);
      // Pick adjacent neighbor (horizontal or vertical ONLY)
      const directions = [
        { dc: 1, dr: 0 },
        { dc: -1, dr: 0 },
        { dc: 0, dr: 1 },
        { dc: 0, dr: -1 },
      ].filter(
        (d) =>
          startCol + d.dc >= 0 &&
          startCol + d.dc < COLS &&
          startRow + d.dr >= 0 &&
          startRow + d.dr < ROWS
      );
      const dir = directions[Math.floor(Math.random() * directions.length)];

      return {
        col: startCol,
        row: startRow,
        targetCol: startCol + (dir ? dir.dc : 1),
        targetRow: startRow + (dir ? dir.dr : 0),
        progress: 0,
        speed: 0.035 + Math.random() * 0.03,
        stepsRemaining: 4 + Math.floor(Math.random() * 6),
      };
    };

    // Initialize initial pulses
    for (let i = 0; i < 4; i++) {
      pulses.push(spawnPulse());
    }

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || document.hidden) return;

      const delta = time - lastTime;
      lastTime = time;

      const width = container.clientWidth;
      const height = container.clientHeight;

      ctx.clearRect(0, 0, width, height);

      // Grid boundaries and cell spacing
      const paddingX = 40;
      const paddingY = 40;
      const cellW = (width - paddingX * 2) / (COLS - 1);
      const cellH = (height - paddingY * 2) / (ROWS - 1);

      const getNodeX = (col: number) => paddingX + col * cellW;
      const getNodeY = (row: number) => paddingY + row * cellH;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const goldColor = isDark ? "#7C5CFC" : "#6847ED";
      const pulseColor = isDark ? "#38BDF8" : "#A78BFA";

      // 1. Draw Circuit Lines (Strictly Horizontal and Vertical Only)
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark ? "rgba(124, 92, 252, 0.2)" : "rgba(104, 71, 237, 0.2)";

      // Horizontal lines
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(getNodeX(0), getNodeY(r));
        ctx.lineTo(getNodeX(COLS - 1), getNodeY(r));
        ctx.stroke();
      }

      // Vertical lines
      for (let c = 0; c < COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(getNodeX(c), getNodeY(0));
        ctx.lineTo(getNodeX(c), getNodeY(ROWS - 1));
        ctx.stroke();
      }

      // 2. Update and Draw Pulses
      while (pulses.length < maxPulses) {
        pulses.push(spawnPulse());
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        const x1 = getNodeX(p.col);
        const y1 = getNodeY(p.row);
        const x2 = getNodeX(p.targetCol);
        const y2 = getNodeY(p.targetRow);

        const currentX = x1 + (x2 - x1) * p.progress;
        const currentY = y1 + (y2 - y1) * p.progress;

        // Draw traveling glowing pulse
        ctx.save();
        ctx.fillStyle = pulseColor;
        ctx.shadowColor = goldColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // If reached next node
        if (p.progress >= 1) {
          activeNodes.set(`${p.targetCol},${p.targetRow}`, time);

          p.stepsRemaining--;
          if (p.stepsRemaining <= 0) {
            pulses.splice(i, 1);
          } else {
            p.col = p.targetCol;
            p.row = p.targetRow;
            p.progress = 0;

            // Pick next adjacent direction
            const neighbors = [
              { dc: 1, dr: 0 },
              { dc: -1, dr: 0 },
              { dc: 0, dr: 1 },
              { dc: 0, dr: -1 },
            ].filter(
              (d) =>
                p.col + d.dc >= 0 &&
                p.col + d.dc < COLS &&
                p.row + d.dr >= 0 &&
                p.row + d.dr < ROWS
            );
            const nextDir = neighbors[Math.floor(Math.random() * neighbors.length)];
            p.targetCol = p.col + (nextDir ? nextDir.dc : 0);
            p.targetRow = p.row + (nextDir ? nextDir.dr : 0);
          }
        }
      }

      // 3. Draw Nodes (Square Nodes 3x3px, with active glow fade)
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const key = `${c},${r}`;
          const activeTime = activeNodes.get(key);
          const timeSinceActive = activeTime ? time - activeTime : 9999;
          const isNodeActive = timeSinceActive < 400;

          const nx = getNodeX(c);
          const ny = getNodeY(r);

          if (isNodeActive) {
            const glowOpacity = 1 - timeSinceActive / 400;
            ctx.save();
            ctx.fillStyle = pulseColor;
            ctx.shadowColor = goldColor;
            ctx.shadowBlur = 10 * glowOpacity;
            ctx.fillRect(nx - 2.5, ny - 2.5, 5, 5);
            ctx.restore();
          } else {
            ctx.fillStyle = isDark ? "rgba(201, 168, 76, 0.8)" : "rgba(138, 98, 20, 0.8)";
            ctx.fillRect(nx - 1.5, ny - 1.5, 3, 3);
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile) {
    // Mobile: Simplified static SVG version of chip with 4x4 grid (battery saving)
    return (
      <div className="w-full h-full flex items-center justify-center p-6" aria-hidden="true">
        <svg viewBox="0 0 240 240" className="w-56 h-56 max-w-full">
          {/* Static 4x4 circuit grid */}
          <g stroke="var(--color-brand)" strokeWidth="1" opacity="0.3">
            <line x1="30" y1="60" x2="210" y2="60" />
            <line x1="30" y1="120" x2="210" y2="120" />
            <line x1="30" y1="180" x2="210" y2="180" />
            <line x1="60" y1="30" x2="60" y2="210" />
            <line x1="120" y1="30" x2="120" y2="210" />
            <line x1="180" y1="30" x2="180" y2="210" />
          </g>
          {/* Center AI Chip */}
          <rect
            x="80"
            y="80"
            width="80"
            height="80"
            rx="4"
            fill="var(--color-bg-alt)"
            stroke="var(--color-brand)"
            strokeWidth="2"
          />
          <rect
            x="96"
            y="96"
            width="48"
            height="48"
            rx="2"
            fill="var(--color-surface)"
            stroke="var(--color-brand)"
            strokeWidth="1.5"
          />
          <text
            x="120"
            y="128"
            fontFamily="var(--font-space-grotesk), sans-serif"
            fontSize="20"
            fontWeight="700"
            fill="var(--color-brand)"
            textAnchor="middle"
          >
            AI
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] lg:h-[540px] flex items-center justify-center overflow-hidden"
      style={{
        animation: prefersReducedMotion ? "none" : "breathe 4s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes chipRotate {
          0%, 100% { transform: perspective(800px) rotateY(0deg); }
          50% { transform: perspective(800px) rotateY(15deg); }
        }
      `}</style>

      {/* Canvas for dynamic 12x8 circuit grid & pulses */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Stylized AI CPU Chip in top-right quadrant */}
      <div
        onMouseEnter={() => setChipHovered(true)}
        onMouseLeave={() => setChipHovered(false)}
        className="absolute top-12 right-12 z-10 cursor-pointer group"
        style={{
          animation: prefersReducedMotion ? "none" : "chipRotate 6s ease-in-out infinite",
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          className={`transition-all duration-300 ${
            chipHovered ? "drop-shadow-[0_0_20px_rgba(124,92,252,0.6)]" : "drop-shadow-sm"
          }`}
        >
          {/* External Pins connecting into circuit grid */}
          <g stroke="var(--color-brand)" strokeWidth="1.8" opacity={chipHovered ? "1" : "0.75"}>
            {/* Top Pins */}
            <line x1="50" y1="12" x2="50" y2="30" />
            <line x1="75" y1="6" x2="75" y2="30" />
            <line x1="100" y1="12" x2="100" y2="30" />

            {/* Bottom Pins */}
            <line x1="50" y1="120" x2="50" y2="138" />
            <line x1="75" y1="120" x2="75" y2="144" />
            <line x1="100" y1="120" x2="100" y2="138" />

            {/* Left Pins */}
            <line x1="12" y1="50" x2="30" y2="50" />
            <line x1="6" y1="75" x2="30" y2="75" />
            <line x1="12" y1="100" x2="30" y2="100" />

            {/* Right Pins */}
            <line x1="120" y1="50" x2="138" y2="50" />
            <line x1="120" y1="75" x2="144" y2="75" />
            <line x1="120" y1="100" x2="138" y2="100" />
          </g>

          {/* Outer Chip Square */}
          <rect
            x="30"
            y="30"
            width="90"
            height="90"
            rx="6"
            fill="var(--color-bg)"
            stroke="var(--color-brand)"
            strokeWidth="2"
            className="transition-colors duration-200"
          />

          {/* Internal Die Square */}
          <rect
            x="48"
            y="48"
            width="54"
            height="54"
            rx="4"
            fill="var(--color-surface)"
            stroke="var(--color-brand)"
            strokeWidth="1.5"
          />

          {/* Inner Die Connecting Traces */}
          <line x1="30" y1="75" x2="48" y2="75" stroke="var(--color-brand)" strokeWidth="1.2" />
          <line x1="102" y1="75" x2="120" y2="75" stroke="var(--color-brand)" strokeWidth="1.2" />
          <line x1="75" y1="30" x2="75" y2="48" stroke="var(--color-brand)" strokeWidth="1.2" />
          <line x1="75" y1="102" x2="75" y2="120" stroke="var(--color-brand)" strokeWidth="1.2" />

          {/* AI Monogram in Space Grotesk 700 */}
          <text
            x="75"
            y="84"
            fontFamily="var(--font-space-grotesk), sans-serif"
            fontSize="24"
            fontWeight="700"
            letterSpacing="-0.5px"
            fill="var(--color-brand)"
            textAnchor="middle"
          >
            AI
          </text>
        </svg>
      </div>
    </div>
  );
}

