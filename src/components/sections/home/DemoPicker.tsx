'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Maximize2, MessageCircle, Send, Sparkles } from 'lucide-react';
import { DemoChips } from './DemoChips';
import { CinematicPreviewFrame } from './CinematicPreviewFrame';
import { DemoId, DEMO_IDS, OTHER_MAPS_TO, getDemoConfig } from '@/demos/demos.config';
import { useLanguage } from '@/i18n';
import { BRAND } from '@/lib/brand';

export function DemoPicker() {
  const { t } = useLanguage();

  const [selectedChip, setSelectedChip] = useState<DemoId | 'other'>('salon');
  const [activeDemoId, setActiveDemoId] = useState<DemoId>('salon');
  const [announcedMessage, setAnnouncedMessage] = useState('');
  const [customBusinessText, setCustomBusinessText] = useState('');

  // 1. URL parameter initialization (?demo=<id>)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const demoParam = params.get('demo');

    if (demoParam && DEMO_IDS.includes(demoParam as DemoId)) {
      setSelectedChip(demoParam as DemoId);
      setActiveDemoId(demoParam as DemoId);
    } else if (demoParam === 'other') {
      setSelectedChip('other');
      setActiveDemoId(OTHER_MAPS_TO);
    }
  }, []);

  // 2. Handle Chip Selection
  const handleSelectChip = (chipId: DemoId | 'other') => {
    setSelectedChip(chipId);
    const targetDemoId = chipId === 'other' ? OTHER_MAPS_TO : chipId;
    setActiveDemoId(targetDemoId);

    const config = getDemoConfig(targetDemoId);
    const label = t(`demo.type.${chipId}`);
    setAnnouncedMessage(`Showing ${config ? config.name : label} cinematic demo preview`);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('demo', chipId);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918976517353';
  const selectedLabel = selectedChip ? t(`demo.type.${selectedChip}`) : '';
  const currentConfig = getDemoConfig(activeDemoId) || getDemoConfig('salon')!;

  const getWhatsAppUrl = () => {
    let messageText = '';
    if (selectedChip === 'other' && customBusinessText.trim()) {
      messageText = `Hi ${BRAND.name}, my business is: ${customBusinessText.trim()}. I would like to see a demo for my business.`;
    } else if (selectedChip) {
      messageText = `Hi ${BRAND.name}, I would like to explore a website like the ${currentConfig.name} demo.`;
    } else {
      messageText = `Hi ${BRAND.name}, I would like to see a demo for my business.`;
    }
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
  };

  const contactHref = `/contact?intent=demo&demo_type=${activeDemoId}`;
  const theatreHref = `/demos/${activeDemoId}`;

  return (
    <section
      id="demos"
      className="w-full py-16 sm:py-24 border-b border-[var(--cinema-border)] bg-[var(--cinema-bg)] scroll-mt-28 transition-colors select-none"
      aria-label="Interactive Cinematic Demo Explorer"
    >
      {/* Screen Reader Live Region */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcedMessage}
      </div>

      <div className="site-container-wide space-y-8 sm:space-y-12">
        {/* Section Heading & Subheading */}
        <div className="text-center space-y-3.5 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--cinema-accent)]/15 border border-[var(--cinema-accent)]/30 text-[var(--cinema-accent)] font-mono text-xs uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Sample Productions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[var(--cinema-ink)] font-heading tracking-[-0.03em] leading-[1.1]">
            Experience Live Sample Websites
          </h2>
          <p className="text-sm sm:text-base text-[var(--cinema-ink-muted)] font-body leading-relaxed max-w-2xl mx-auto">
            Choose your business type below to run a continuous cinematic camera pan across our flagship sample production architectures.
          </p>
        </div>

        {/* Business Type Chips Selector */}
        <div className="max-w-4xl mx-auto px-2">
          <DemoChips selected={selectedChip} onSelect={handleSelectChip} />
        </div>

        {/* 16:9 Cinematic Preview Frame */}
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
          <CinematicPreviewFrame demoId={activeDemoId} />
        </div>

        {/* Controls & Quick Actions Strip */}
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Left: Open Fullscreen Theatre Mode Action */}
          <Link
            href={theatreHref}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[var(--cinema-accent)] hover:brightness-110 text-white text-xs font-mono font-semibold shadow-md transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)] focus-visible:ring-offset-2"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Open in Fullscreen Theatre View</span>
          </Link>

          {/* Right: Quick Inquiries */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full border border-[var(--cinema-border)] bg-[var(--cinema-surface)] text-[var(--cinema-ink)] text-xs font-mono font-medium hover:border-[var(--cinema-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)]"
            >
              Get a site like this
            </Link>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full border border-[var(--cinema-border)] bg-[var(--cinema-surface)] text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Chat about this demo on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* "Something Else" Custom Business Form */}
        {selectedChip === 'other' && (
          <div className="max-w-xl mx-auto p-5 rounded-2xl border border-[var(--cinema-border)] bg-[var(--cinema-surface)] space-y-3 shadow-md animate-in fade-in duration-300">
            <label htmlFor="custom-business" className="block text-xs font-mono font-medium text-[var(--cinema-ink)]">
              Tell us your industry or business model:
            </label>
            <div className="flex gap-2">
              <input
                id="custom-business"
                type="text"
                maxLength={80}
                value={customBusinessText}
                onChange={(e) => setCustomBusinessText(e.target.value)}
                placeholder="e.g. Architect, CA firm, Cloud kitchen, EV showroom"
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[var(--cinema-border)] bg-[var(--cinema-bg)] text-[var(--cinema-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--cinema-accent)]"
              />
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors shrink-0"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DemoPicker;
