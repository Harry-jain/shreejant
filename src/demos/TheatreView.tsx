'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { DemoConfig, DEMO_IDS, getDemoConfig } from './demos.config';
import { BRAND } from '@/lib/brand';
import { TourScript } from './TourScript';

export interface TheatreViewProps {
  config: DemoConfig;
  initialEmbed?: boolean;
  children: React.ReactNode;
}

export function TheatreView({ config, initialEmbed = false, children }: TheatreViewProps) {
  const router = useRouter();

  const [isEmbed, setIsEmbed] = useState<boolean>(initialEmbed);
  const [showTitleCard, setShowTitleCard] = useState(!initialEmbed);
  const [titleCardMounted, setTitleCardMounted] = useState(!initialEmbed);
  const [sampleFadedIn, setSampleFadedIn] = useState(initialEmbed);
  const [announcedMessage, setAnnouncedMessage] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const currentIndex = DEMO_IDS.indexOf(config.id);
  const prevIndex = (currentIndex - 1 + DEMO_IDS.length) % DEMO_IDS.length;
  const nextIndex = (currentIndex + 1) % DEMO_IDS.length;
  const prevDemo = getDemoConfig(DEMO_IDS[prevIndex])!;
  const nextDemo = getDemoConfig(DEMO_IDS[nextIndex])!;

  // 1. Detect embed mode and reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const embedParam = params.get('embed') === '1';
    let isFramed = false;
    try {
      isFramed = window.self !== window.top;
    } catch {
      isFramed = true;
    }

    const embed = embedParam || isFramed || initialEmbed;
    setIsEmbed(embed);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    if (mq.matches || embed) {
      setShowTitleCard(false);
      setTitleCardMounted(false);
      setSampleFadedIn(true);
    } else {
      // 1.2s Title Card display, then fade into sample
      const displayTimer = setTimeout(() => {
        setShowTitleCard(false);
        setSampleFadedIn(true);
      }, 1200);

      // Clean up DOM after fade transition completes (1200ms + 600ms = 1800ms)
      const unmountTimer = setTimeout(() => {
        setTitleCardMounted(false);
      }, 1850);

      return () => {
        clearTimeout(displayTimer);
        clearTimeout(unmountTimer);
        mq.removeEventListener('change', handler);
      };
    }

    return () => mq.removeEventListener('change', handler);
  }, [initialEmbed]);

  // 2. Announce active sample on mount for screen readers
  useEffect(() => {
    setAnnouncedMessage(`Now viewing ${config.name} sample website (${currentIndex + 1} of ${DEMO_IDS.length})`);
  }, [config.name, currentIndex]);

  // 3. Keyboard Navigation (Arrow keys, Page Up/Down, Escape)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isEmbed) return;

      // Ignore if user is inside an input, textarea or select
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        router.push(`/demos/${nextDemo.id}`);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        router.push(`/demos/${prevDemo.id}`);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        router.push('/#demos');
      }
    },
    [isEmbed, nextDemo.id, prevDemo.id, router]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const contactHref = `/contact?intent=demo&demo_type=${config.id}`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918976517353';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi ${BRAND.name}, I'm exploring the ${config.name} sample demo and would like to build a website for my business.`
  )}`;

  // ==========================================
  // EMBED MODE (Inside Home Page 16:9 Frame)
  // ==========================================
  if (isEmbed) {
    return (
      <div
        className="w-full min-h-screen relative font-sans selection:bg-black selection:text-white"
        style={{
          backgroundColor: config.palette.bg,
          color: config.palette.ink,
          ['--demo-accent' as any]: config.palette.accent,
          ['--demo-surface' as any]: config.palette.surface,
          ['--demo-ink' as any]: config.palette.ink,
          ['--demo-bg' as any]: config.palette.bg,
          ['--demo-primary' as any]: config.palette.accent,
          ['--demo-primary-hover' as any]: config.id === 'jewellery' ? '#A07820' : config.palette.accent,
          ['--demo-text-muted' as any]: config.id === 'jewellery' ? '#6E645A' : undefined,
          ['--demo-hairline' as any]: config.id === 'jewellery' ? '#EAE3D5' : undefined,
        }}
      >
        {/* Screen reader indicator ensuring "Sample demo" is in DOM for smoke test */}
        <div className="sr-only">
          Sample demo made by {BRAND.name}. Imaginary business, not a real client.
        </div>
        <main className="w-full">{children}</main>

        {/* CSS :target #demo-note Toast */}
        <div
          id="demo-note"
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl border border-black/20 bg-white text-[#101828] shadow-2xl opacity-0 pointer-events-none translate-y-3 transition-all duration-200 target:opacity-100 target:pointer-events-auto target:translate-y-0"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7C5CFC]">
                Sample Action
              </p>
              <p className="text-xs leading-relaxed text-[#101828]">
                This is a sample. On your real website this opens your WhatsApp or sends the enquiry to you.
              </p>
            </div>
            <a
              href="#"
              className="w-6 h-6 rounded-full border border-black/30 flex items-center justify-center text-xs font-bold hover:bg-[#101828] hover:text-white transition-colors"
              aria-label="Close note"
            >
              ✕
            </a>
          </div>
        </div>

        <TourScript />
      </div>
    );
  }

  // ==========================================
  // FULLSCREEN THEATRE VIEW (/demos/<id>)
  // ==========================================
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col bg-[var(--cinema-bg)] select-none text-[var(--cinema-ink)]"
      style={{
        ['--demo-accent' as any]: config.palette.accent,
        ['--demo-surface' as any]: config.palette.surface,
        ['--demo-ink' as any]: config.palette.ink,
        ['--demo-bg' as any]: config.palette.bg,
        ['--demo-primary' as any]: config.palette.accent,
      }}
    >
      {/* Screen Reader Announcement Region */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcedMessage}
      </div>

      {/* 1. Minimal Top Cinema Navigation Bar */}
      <header
        className="relative z-40 h-14 sm:h-16 w-full bg-[var(--cinema-bg)]/95 backdrop-blur-xl border-b border-[var(--cinema-border)] px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 shadow-md shrink-0"
        aria-label="Theatre View Controls"
      >
        {/* Left: Exit Theatre View Control & Business Name */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0">
          <Link
            href="/#demos"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full border border-[var(--cinema-border)] bg-[var(--cinema-surface)] hover:bg-[var(--cinema-accent)]/15 text-[var(--cinema-ink)] text-xs font-mono font-medium transition-all hover:border-[var(--cinema-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)] focus-visible:ring-offset-2 shrink-0"
            aria-label="Exit theatre view and return to home page demos"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--cinema-accent)]" />
            <span className="hidden sm:inline">Exit</span>
          </Link>

          {/* Sample Title Badge */}
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="font-heading font-bold text-xs sm:text-sm text-[var(--cinema-ink)] truncate">
              {config.name}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--cinema-accent)]/15 text-[var(--cinema-accent)] border border-[var(--cinema-accent)]/30 shrink-0">
              Sample demo
            </span>
          </div>
        </div>

        {/* Center / Desktop: Progress Rail (Eight Dots) */}
        <nav
          aria-label="Sample demos progress rail"
          className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 bg-[var(--cinema-surface)] shadow-md shrink-0"
        >
          {DEMO_IDS.map((id, index) => {
            const demo = getDemoConfig(id)!;
            const isActive = id === config.id;
            return (
              <Link
                key={id}
                href={`/demos/${id}`}
                aria-label={`View ${demo.name} sample (${index + 1} of ${DEMO_IDS.length})`}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)]"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3.5 h-3.5 shadow-[0_0_12px_rgba(124,92,252,0.95)] ring-2 ring-white/30'
                      : 'w-2.5 h-2.5 hover:scale-125'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--cinema-accent)' : 'var(--cinema-dot-inactive)',
                  }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Primary Call to Action */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center min-h-[44px] px-3 sm:px-5 py-2 rounded-full bg-[var(--cinema-accent)] hover:brightness-110 text-white text-xs font-mono font-semibold shadow-md transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)] focus-visible:ring-offset-2 shrink-0"
          >
            <span className="hidden sm:inline">Get a site like this</span>
            <span className="sm:hidden text-xs">Get site</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Viewport & Scroll Area (The Sample Page at full resolution inside it) */}
      <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden bg-[var(--cinema-letterbox)] scroll-smooth focus:outline-none">
        {/* Sample Content Container with Smooth In-Fade */}
        <div
          className="w-full min-h-full"
          style={{
            opacity: sampleFadedIn || prefersReducedMotion ? 1 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {children}

          {/* 3. Cinematic End-of-Page Closing Action Banner */}
          <section
            aria-label="Project conversion conclusion"
            className="w-full py-16 sm:py-24 pb-28 sm:pb-24 px-4 border-t border-[var(--cinema-border)] bg-[var(--cinema-bg)] text-center space-y-6"
          >
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[var(--cinema-accent)]/15 text-[var(--cinema-accent)] border border-[var(--cinema-accent)]/30">
                End of Sample Demonstration
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[var(--cinema-ink)] tracking-tight">
                Want a Digital Flagship Like This For Your Business?
              </h2>
              <p className="font-body text-xs sm:text-sm text-[var(--cinema-ink-muted)] leading-relaxed max-w-lg mx-auto">
                Every business architecture we build is handcrafted for lightning-fast speeds, zero server drop, and automated client acquisition across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
              <Link
                href={contactHref}
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-full bg-[var(--cinema-accent)] hover:brightness-110 text-white font-mono text-xs font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)]"
              >
                <span>Get a site like this</span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full border border-[var(--cinema-border)] bg-[var(--cinema-surface)] hover:bg-emerald-500/10 hover:border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Next / Previous Demo Links */}
            <div className="flex items-center justify-center gap-6 pt-6 text-xs font-mono text-[var(--cinema-ink-muted)]">
              <Link
                href={`/demos/${prevDemo.id}`}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 hover:text-[var(--cinema-accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--cinema-accent)]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous: {prevDemo.name}</span>
              </Link>
              <span className="opacity-30">·</span>
              <Link
                href={`/demos/${nextDemo.id}`}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 hover:text-[var(--cinema-accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--cinema-accent)]"
              >
                <span>Next: {nextDemo.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* 4. CSS :target #demo-note Toast (Fixed at viewport level, not inside scroll area) */}
      <div
        id="demo-note"
        role="status"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl border border-[var(--cinema-border)] bg-[var(--cinema-surface)] text-[var(--cinema-ink)] shadow-2xl opacity-0 pointer-events-none translate-y-3 transition-all duration-200 target:opacity-100 target:pointer-events-auto target:translate-y-0 backdrop-blur-xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--cinema-accent)]">
              Sample Action
            </p>
            <p className="text-xs leading-relaxed text-[var(--cinema-ink)]">
              This is a sample. On your real website this opens your WhatsApp or sends the enquiry to you.
            </p>
          </div>
          <a
            href="#!"
            className="w-6 h-6 rounded-full border border-[var(--cinema-border)] flex items-center justify-center text-xs font-bold hover:bg-[var(--cinema-accent)] hover:text-white transition-colors"
            aria-label="Close note"
          >
            ✕
          </a>
        </div>
      </div>

      {/* 5. Mobile Floating Progress Rail (Direct child of viewport with solid contrast pill) */}
      <nav
        aria-label="Sample demos mobile progress rail"
        style={{ bottom: '24px' }}
        className="md:hidden fixed left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-1 px-4 py-1.5 rounded-full border border-white/20 bg-[#090C15]/95 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.7)]"
      >
        {DEMO_IDS.map((id, index) => {
          const demo = getDemoConfig(id)!;
          const isActive = id === config.id;
          return (
            <Link
              key={id}
              href={`/demos/${id}`}
              aria-label={`View ${demo.name} sample (${index + 1} of ${DEMO_IDS.length})`}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex items-center justify-center min-w-[34px] min-h-[44px] rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)]"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3 h-3 shadow-[0_0_10px_rgba(124,92,252,0.95)] ring-2 ring-white/30'
                    : 'w-2 h-2 hover:scale-125'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--cinema-accent)' : 'var(--cinema-dot-inactive)',
                }}
              />
            </Link>
          );
        })}
      </nav>

      {/* 6. Opening Cinematic Title Card (1.2s reveal, then fades away) */}
      {!prefersReducedMotion && titleCardMounted && (
        <div
          className={`pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--cinema-bg)] px-6 text-center transition-opacity duration-600 ease-out ${
            showTitleCard ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-hidden={!showTitleCard}
        >
          <div
            className="space-y-4 max-w-xl transition-transform duration-600 ease-out"
            style={{
              transform: showTitleCard ? 'scale(1)' : 'scale(1.03)',
              transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-[var(--cinema-accent)]">
              A Sample Demonstration
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-[var(--cinema-ink)] tracking-tight">
              {config.name}
            </h1>
            <p className="font-body text-sm sm:text-base text-[var(--cinema-ink-muted)] leading-relaxed max-w-md mx-auto">
              {config.tagline}
            </p>
            <div className="pt-4 border-t border-[var(--cinema-border)] text-xs font-mono text-[var(--cinema-ink-muted)]/70">
              Engineered by {BRAND.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TheatreView;