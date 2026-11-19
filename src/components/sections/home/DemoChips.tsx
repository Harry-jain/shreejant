'use client';

import React, { useRef } from 'react';
import { CHIP_ORDER, OTHER_MAPS_TO, DemoId } from '@/demos/demos.config';
import { useLanguage } from '@/i18n';

export interface DemoChipsProps {
  selected: DemoId | 'other' | null;
  onSelect: (id: DemoId | 'other') => void;
}

export function DemoChips({ selected, onSelect }: DemoChipsProps) {
  const { t } = useLanguage();
  const prefetchedRef = useRef<Set<string>>(new Set());
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Prefetch demo on hover or focus
  const handlePrefetch = (chipId: DemoId | 'other') => {
    const targetDemoId = chipId === 'other' ? OTHER_MAPS_TO : chipId;
    if (prefetchedRef.current.has(targetDemoId)) return;
    prefetchedRef.current.add(targetDemoId);

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/demos/${targetDemoId}?embed=1`;
    document.head.appendChild(link);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % CHIP_ORDER.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + CHIP_ORDER.length) % CHIP_ORDER.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = CHIP_ORDER.length - 1;
    }

    if (nextIndex >= 0) {
      chipRefs.current[nextIndex]?.focus();
      onSelect(CHIP_ORDER[nextIndex]);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Select your business type"
      className="flex flex-wrap gap-2.5 pt-1 w-full justify-center sm:justify-start"
    >
      {CHIP_ORDER.map((chipId, idx) => {
        const isSelected = selected === chipId;
        const labelKey = `demo.type.${chipId}`;
        const label = t(labelKey);

        return (
          <button
            key={chipId}
            ref={(el) => {
              chipRefs.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected || (selected === null && idx === 0) ? 0 : -1}
            onClick={() => onSelect(chipId)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onMouseEnter={() => handlePrefetch(chipId)}
            onFocus={() => handlePrefetch(chipId)}
            className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-full text-xs font-mono font-medium tracking-tight border transition-all duration-200 select-none flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cinema-accent)] focus-visible:ring-offset-2 ${
              isSelected
                ? 'bg-[var(--cinema-accent)] text-white border-[var(--cinema-accent)] shadow-[0_4px_16px_rgba(124,92,252,0.4)] scale-[1.02]'
                : 'bg-[var(--cinema-surface)] text-[var(--cinema-ink)] border-[var(--cinema-border)] hover:border-[var(--cinema-border-bright)] hover:bg-[var(--cinema-accent)]/10 shadow-xs'
            }`}
          >
            <span className="whitespace-nowrap">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default DemoChips;
