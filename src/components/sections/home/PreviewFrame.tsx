'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, RefreshCw } from 'lucide-react';
import { DemoId, getDemoConfig } from '@/demos/demos.config';
import { useLanguage } from '@/i18n';

export interface PreviewFrameProps {
  demoId: DemoId;
  isTourAllowed?: boolean;
}

export function PreviewFrame({ demoId, isTourAllowed = true }: PreviewFrameProps) {
  const { t } = useLanguage();
  const config = getDemoConfig(demoId) || getDemoConfig('salon')!;

  const [device, setDevice] = useState<'computer' | 'phone'>('computer');
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [isTouchExploring, setIsTouchExploring] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. IntersectionObserver (within 300px of viewport)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. ResizeObserver for fluid scale calculation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (el) {
        setContainerWidth(el.clientWidth);
      }
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 3. Screen width check (< 768px force phone mode)
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setDevice('phone');
      }
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // 4. Handle demo switch: reset loading state, 8s timeout
  useEffect(() => {
    setIframeLoaded(false);
    setHasTimedOut(false);
    setIsTouchExploring(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHasTimedOut(true);
    }, 8000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [demoId, device]);

  const handleIframeLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIframeLoaded(true);
    setHasTimedOut(false);
  };

  const handleTapExplore = () => {
    setIsTouchExploring(true);
    try {
      const targetOrigin = typeof window !== 'undefined' ? window.location.origin : '*';
      iframeRef.current?.contentWindow?.postMessage({ type: 'shreejan-stop-tour' }, targetOrigin);
    } catch {
      // ignore cross-frame error if any
    }
  };

  // Dimensions
  const isPhone = device === 'phone';
  const logicalWidth = isPhone ? 390 : 1100;
  const logicalHeight = isPhone ? 780 : 720;
  const scale = containerWidth > 0 ? Math.min(1, containerWidth / logicalWidth) : 0.5;

  const currentScale = isPhone
    ? Math.min(1, (containerWidth - 32) / logicalWidth, 480 / logicalHeight)
    : scale;

  const demoLabel = t(config.labelKey);
  const sampleLabel = t('demo.sample_label', { label: demoLabel });
  const fullDemoHref = `/demos/${config.id}`;
  const iframeSrc = `/demos/${config.id}?embed=1${isTourAllowed && !isPhone ? '&tour=1' : ''}`;

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Outer Browser Frame */}
      <div
        ref={containerRef}
        className="w-full rounded-[20px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#0E121B] shadow-[0_20px_48px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col transition-shadow"
      >
        {/* Chrome Bar */}
        <div className="h-11 px-4 bg-black/5 dark:bg-[#161B28] border-b border-black/10 dark:border-white/10 flex items-center justify-between gap-3 select-none">
          {/* Decorative Window Dots */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* URL Pill */}
          <div className="flex-1 max-w-xs mx-auto px-3 py-1 rounded-full bg-white dark:bg-[#0A0D15] border border-black/10 dark:border-white/10 text-[11px] font-mono text-ink/80 dark:text-white/80 text-center truncate flex items-center justify-center gap-1.5 shadow-xs">
            <span className="text-[10px] text-[#7C5CFC]">🔒</span>
            <span className="truncate">{config.domain}</span>
          </div>

          {/* Computer | Phone Device Switcher (Desktop only) */}
          <div className="hidden md:flex items-center gap-1 shrink-0" role="toolbar" aria-label="Device preview switcher">
            <button
              type="button"
              aria-label={t('demo.device.computer')}
              aria-pressed={!isPhone}
              onClick={() => setDevice('computer')}
              className={`p-1.5 rounded-lg border transition-all ${
                !isPhone
                  ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-xs'
                  : 'bg-transparent text-ink/60 dark:text-white/60 border-transparent hover:text-ink dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label={t('demo.device.phone')}
              aria-pressed={isPhone}
              onClick={() => setDevice('phone')}
              className={`p-1.5 rounded-lg border transition-all ${
                isPhone
                  ? 'bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-xs'
                  : 'bg-transparent text-ink/60 dark:text-white/60 border-transparent hover:text-ink dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Viewport Area */}
        <div
          className={`relative w-full overflow-hidden bg-slate-50 dark:bg-[#07090E] flex items-center justify-center transition-all ${
            isPhone ? 'py-6 px-4 min-h-[520px]' : 'aspect-[1100/720]'
          }`}
        >
          {/* 1. Loading Skeleton / Not near viewport yet */}
          {(!isNearViewport || (!iframeLoaded && !hasTimedOut)) && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 dark:bg-[#0E121B]/80 backdrop-blur-xs space-y-3 p-4 text-center"
              aria-live="polite"
            >
              <div className="w-8 h-8 rounded-full border-2 border-[#7C5CFC] border-t-transparent animate-spin" />
              <p className="text-xs font-medium text-ink dark:text-white">
                {t('demo.loading')}
              </p>
            </div>
          )}

          {/* 2. Fallback Card on 8s Timeout */}
          {hasTimedOut && !iframeLoaded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white dark:bg-[#0E121B] p-6 text-center space-y-4">
              <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 max-w-sm space-y-3 shadow-md">
                <p className="text-xs font-semibold text-ink dark:text-white">
                  {t('demo.error')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setHasTimedOut(false);
                    setIframeLoaded(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white text-xs font-semibold transition-colors"
                >
                  <span>Reload preview</span>
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 3. Scaled Iframe Viewport Container */}
          {isNearViewport && (
            <div
              className={`relative overflow-hidden transition-all duration-200 ${
                isPhone
                  ? 'rounded-[28px] border-[6px] border-[#1E2128] shadow-2xl bg-black'
                  : 'w-full h-full'
              }`}
              style={{
                width: isPhone ? `${logicalWidth * currentScale}px` : '100%',
                height: isPhone ? `${logicalHeight * currentScale}px` : '100%',
              }}
            >
              <div
                style={{
                  width: `${logicalWidth}px`,
                  height: `${logicalHeight}px`,
                  transform: `scale(${isPhone ? currentScale : scale})`,
                  transformOrigin: 'top left',
                }}
                className="relative"
              >
                <iframe
                  ref={iframeRef}
                  key={`${demoId}-${device}`}
                  src={iframeSrc}
                  title={sampleLabel}
                  loading="lazy"
                  onLoad={handleIframeLoad}
                  className={`w-full h-full border-none transition-opacity duration-200 ${
                    iframeLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />

                {/* Touch Overlay (prevents scroll trapping on mobile/tablet) */}
                {!isTouchExploring && (
                  <div
                    onClick={handleTapExplore}
                    onTouchStart={handleTapExplore}
                    className="absolute inset-0 z-10 md:hidden flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-pointer"
                  >
                    <span className="px-4 py-2 rounded-full bg-[#7C5CFC] text-white text-xs font-medium shadow-lg">
                      {t('demo.tap_to_explore')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frame Caption */}
      <div className="px-1 text-center sm:text-left text-xs text-ink/60 dark:text-white/60">
        <p className="leading-relaxed">
          {sampleLabel}
        </p>
      </div>
    </div>
  );
}

export default PreviewFrame;
