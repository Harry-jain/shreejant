"use client";

import React, { useEffect, useRef } from "react";

interface BreathingWaveGridProps {
  className?: string;
  dotSpacing?: number;
  baseRadius?: number;
  maxRadius?: number;
}

export function BreathingWaveGrid({
  className = "",
  dotSpacing = 28,
  baseRadius = 1.2,
  maxRadius = 3.2,
}: BreathingWaveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Mouse tracking for interactive ripples
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let time = 0;

    const render = () => {
      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      time += isReducedMotion ? 0 : 0.028;

      const cols = Math.ceil(width / dotSpacing) + 2;
      const rows = Math.ceil(height / dotSpacing) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const originX = c * dotSpacing;
          const originY = r * dotSpacing;

          // Sweeping diagonal wave traveling across the grid
          const wave1 = Math.sin(originX * 0.012 + originY * 0.009 - time * 1.8);
          // Secondary cross wave to create rich undulating organic motion
          const wave2 = Math.cos(originX * 0.008 - originY * 0.013 + time * 1.1);

          // Combined wave intensity
          const waveCombined = wave1 * 0.7 + wave2 * 0.3;
          // Normalised to [0, 1] with power curve to make crests punchy and visible
          const rawNorm = (waveCombined + 1) / 2;
          const waveNorm = Math.pow(rawNorm, 2.2);

          // Interactive cursor ripple
          let mouseInfluence = 0;
          if (mouseX > -500 && mouseY > -500) {
            const dx = originX - mouseX;
            const dy = originY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 220;
            if (dist < radius) {
              const mouseWave = Math.sin(dist * 0.04 - time * 3.5);
              mouseInfluence = (1 - dist / radius) * (mouseWave * 0.5 + 0.5);
            }
          }

          const totalIntensity = Math.min(1, waveNorm * 0.9 + mouseInfluence * 0.8);

          // Physical displacement: dots physically displace with the wave crest
          const dispX = Math.cos(wave1 * Math.PI) * (2.8 * totalIntensity);
          const dispY = Math.sin(wave1 * Math.PI) * (3.4 * totalIntensity);

          const posX = originX + dispX;
          const posY = originY + dispY;

          // Radius increases dramatically at wave crest (from ~1.2px to ~3.2px)
          const radius = baseRadius + (maxRadius - baseRadius) * totalIntensity;

          // Darkness/Opacity increases from subtle (0.12) to bold deep charcoal (0.72)
          const alpha = 0.12 + totalIntensity * 0.6;

          ctx.beginPath();
          ctx.arc(posX, posY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(24, 24, 24, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dotSpacing, baseRadius, maxRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
