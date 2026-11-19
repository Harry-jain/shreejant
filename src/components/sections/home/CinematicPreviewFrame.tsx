'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ExternalLink, Maximize2, RefreshCw } from 'lucide-react';
import { DemoId, getDemoConfig } from '@/demos/demos.config';
import { useLanguage } from '@/i18n';

export interface CinematicPreviewFrameProps {
  demoId: DemoId;
  onOpenTheatre?: () => void;
}

const DEMO_PURPOSES: Record<DemoId, string> = {
  salon: 'Luxury hair & bridal booking sanctuary · 60s appointment flow',
  jewellery: 'Certified hallmarked gold showcase · Vault sales & rate ticker',
  clinic: 'Multispeciality digital OPD · Instant consultation intake',
  restaurant: 'Contemporary dining menu · Table reservation & WhatsApp orders',
  gym: 'High-performance athletics · Membership & trial pass pipeline',
  shop: 'Fast grocery e-commerce · 30-min express local delivery',
  classes: 'STEM academy coaching · Batch enrolment & fee intake',
  enterprise: 'Custom business flagship · 24/7 autonomous conversion engine',
  general: 'Custom business flagship · 24/7 autonomous conversion engine',
};

export function CinematicPreviewFrame({ demoId }: CinematicPreviewFrameProps) {
  const { t } = useLanguage();
  const config = getDemoConfig(demoId) || getDemoConfig('salon')!;

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [isTouchExploring, setIsTouchExploring] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1100);
  const [isFocused, setIsFocused] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wipeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  // 1. Reduced motion check
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 2. IntersectionObserver for viewport lazy load & scroll loop activation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isVisible = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsNearViewport(true);
          isVisible = true;
          startCameraLoop();
        } else {
          isVisible = false;
          stopCameraLoop();
        }
      },
      { rootMargin: '300px 0px 300px 0px', threshold: [0, 0.1, 0.5, 1] }
    );

    function handleVisibilityChange() {
      if (document.hidden) {
        stopCameraLoop();
      } else if (isVisible) {
        startCameraLoop();
      }
    }

    function startCameraLoop() {
      if (prefersReducedMotion || isTouchExploring) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      const loop = () => {
        if (!el || document.hidden || !isVisible || isTouchExploring) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Camera pan scrubs down smoothly as user scrolls past the element
        const total = vh + rect.height;
        const current = vh - rect.top;
        const raw = current / total;
        const progress = Math.max(0, Math.min(1, raw));
        el.style.setProperty('--camera-progress', progress.toFixed(4));
        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    }

    function stopCameraLoop() {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    observer.observe(el);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopCameraLoop();
    };
  }, [prefersReducedMotion, isTouchExploring]);

  // 3. Fluid ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (el) setContainerWidth(el.clientWidth);
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 4. Handle Demo Switch Transition (Iris Wipe 600ms)
  useEffect(() => {
    setIframeLoaded(false);
    setHasTimedOut(false);
    setIsTouchExploring(false);

    if (wipeTimerRef.current) clearTimeout(wipeTimerRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!prefersReducedMotion) {
      setIsWiping(true);
      wipeTimerRef.current = setTimeout(() => {
        setIsWiping(false);
      }, 650);
    } else {
      setIsWiping(false);
    }

    // Safety timeout for iframe load
    timeoutRef.current = setTimeout(() => {
      setHasTimedOut(true);
    }, 9000);

    return () => {
      if (wipeTimerRef.current) clearTimeout(wipeTimerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [demoId, prefersReducedMotion]);

  const handleIframeLoad = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIframeLoaded(true);
    setHasTimedOut(false);
  }, []);

  const handleTapExplore = () => {
    setIsTouchExploring(true);
  };

  // Dimensions & Scale: Base virtual desktop canvas is 1280px wide
  const VIRTUAL_WIDTH = 1280;
  const VIRTUAL_HEIGHT = 2800; // Deep sample page height for smooth vertical pan
  const scale = containerWidth > 0 ? containerWidth / VIRTUAL_WIDTH : 0.8;

  const demoLabel = t(config.labelKey);
  const purposeText = DEMO_PURPOSES[demoId] || config.tagline;
  const fullDemoHref = `/demos/${config.id}`;
  const iframeSrc = `/demos/${config.id}?embed=1`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      aria-label={`${config.name} Cinematic Preview (16:9). Press Enter to launch full theatre mode.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          window.location.href = fullDemoHref;
        }
      }}
      className="group relative w-full aspect-[16/9] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[var(--cinema-bg)] border border-[var(--cinema-border)] shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cinema-bg)] select-none"
      style={{
        ['--camera-progress' as any]: '0',
      }}
    >
      {/* 1. Viewport Layer (holds scaled iframe with camera vertical pan) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[var(--cinema-letterbox)]">
        {/* Loading Spinner */}
        {(!isNearViewport || (!iframeLoaded && !hasTimedOut)) && (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--cinema-bg)]/90 backdrop-blur-md space-y-3 transition-opacity duration-300"
            aria-live="polite"
          >
            <div className="w-8 h-8 rounded-full border-2 border-[var(--cinema-accent)] border-t-transparent animate-spin" />
            <p className="text-xs font-mono font-medium text-[var(--cinema-ink)]">
              Loading {config.name}…
            </p>
          </div>
        )}

        {/* Fallback Reload Card on Timeout */}
        {hasTimedOut && !iframeLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[var(--cinema-bg)] p-6 text-center space-y-4">
            <div className="p-5 rounded-2xl border border-[var(--cinema-border)] bg-[var(--cinema-surface)] max-w-sm space-y-3 shadow-lg">
              <p className="text-xs font-semibold text-[var(--cinema-ink)]">
                The preview took longer than expected to load.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setHasTimedOut(false);
                    setIframeLoaded(false);
                  }}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-[var(--cinema-accent)] text-white text-xs font-semibold transition-colors hover:brightness-110 active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload Preview</span>
                </button>
                <Link
                  href={fullDemoHref}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full border border-[var(--cinema-border)] bg-[var(--cinema-surface)] text-[var(--cinema-ink)] text-xs font-semibold transition-colors hover:bg-[var(--cinema-accent)]/10"
                >
                  <span>Open Full Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* The Scaled Camera Canvas */}
        {isNearViewport && (
          <div
            className={`relative w-full h-full origin-top-left transition-[clip-path,opacity] duration-600 ease-out ${
              isWiping ? 'cinema-iris-wipe' : ''
            }`}
            style={{
              clipPath: isWiping
                ? 'circle(0% at 50% 50%)'
                : 'circle(150% at 50% 50%)',
              transition: isWiping ? 'none' : 'clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Camera Motion Panning Carrier */}
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                width: `${VIRTUAL_WIDTH}px`,
                height: `${VIRTUAL_HEIGHT}px`,
                transformOrigin: 'top left',
                transform: prefersReducedMotion || isTouchExploring
                  ? `scale(${scale}) translateY(0px)`
                  : `scale(${scale}) translateY(calc(var(--camera-progress, 0) * -1450px))`,
                transition: prefersReducedMotion || isTouchExploring
                  ? 'transform 400ms ease-out'
                  : 'none',
                willChange: prefersReducedMotion ? 'auto' : 'transform',
              }}
            >
              <iframe
                ref={iframeRef}
                key={demoId}
                src={iframeSrc}
                title={`Sample demo for ${config.name}`}
                loading="lazy"
                onLoad={handleIframeLoad}
                tabIndex={-1}
                aria-hidden="true"
                className={`w-full h-full border-none transition-opacity duration-500 pointer-events-auto ${
                  iframeLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </div>
        )}

        {/* Touch Explore Guard Overlay (prevents accidental touch scroll trapping on phones) */}
        {!isTouchExploring && (
          <div
            onClick={handleTapExplore}
            onTouchStart={handleTapExplore}
            className="absolute inset-0 z-20 md:hidden flex items-start justify-end p-2.5 bg-black/35 backdrop-blur-[1px] cursor-pointer"
            aria-label="Tap to interact with website preview"
          >
            <span className="min-h-[44px] px-3.5 py-2 rounded-full bg-[var(--cinema-accent)] text-white text-xs font-semibold shadow-2xl flex items-center justify-center gap-1.5 animate-pulse">
              <span>Tap to explore</span>
            </span>
          </div>
        )}
      </div>

      {/* 2. Cinematic Aperture Bars (Top & Bottom Letterbox with smooth focus breathing) */}
      {/* Top Letterbox Bar */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-6 sm:h-7 bg-[var(--cinema-letterbox)] transition-transform duration-500 ease-out border-b border-white/[0.04]"
        style={{
          transform: isFocused ? 'translateY(-14px)' : 'translateY(0)',
        }}
        aria-hidden="true"
      />

      {/* Bottom Letterbox Bar */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-6 sm:h-7 bg-[var(--cinema-letterbox)] transition-transform duration-500 ease-out border-t border-white/[0.04]"
        style={{
          transform: isFocused ? 'translateY(14px)' : 'translateY(0)',
        }}
        aria-hidden="true"
      />

      {/* 3. Top-Right "Open Full Demo" Action Pill (Desktop Only to prevent mobile crowding) */}
      <div className="hidden sm:block absolute top-3 sm:top-5 right-3 sm:right-5 z-30">
        <Link
          href={fullDemoHref}
          className="group/cta inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-black/75 hover:bg-[var(--cinema-accent)] text-white text-xs font-mono font-medium border border-white/20 hover:border-[var(--cinema-accent)] backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)] focus-visible:ring-offset-2"
          aria-label={`Open full theatre demo for ${config.name}`}
        >
          <span className="font-semibold tracking-wide">Open full demo</span>
          <Maximize2 className="w-3.5 h-3.5 transition-transform group-hover/cta:scale-110" />
        </Link>
      </div>

      {/* 4. Lower-Third Cinematic Caption (Sits bottom-left) */}
      <div className="absolute bottom-2.5 sm:bottom-5 left-2.5 sm:left-6 right-2.5 sm:right-auto z-30 max-w-lg pointer-events-auto">
        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 text-white shadow-2xl space-y-1 sm:space-y-1.5 transition-all duration-300 hover:border-white/30">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="font-heading font-bold text-xs sm:text-base text-white tracking-tight truncate">
              {config.name}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-[var(--cinema-accent)]/20 text-[var(--cinema-accent)] border border-[var(--cinema-accent)]/40 shrink-0">
              Sample data
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-white/50 truncate">
              · {config.domain}
            </span>
          </div>
          <p className="font-body text-[10px] sm:text-xs text-white/80 leading-relaxed line-clamp-1 sm:line-clamp-2">
            {purposeText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CinematicPreviewFrame;
