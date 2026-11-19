'use client';

import React, { useRef } from 'react';
import { INDUSTRIES, IndustrySlug } from '@/data/industries';
import { useLanguage } from '@/i18n';

export interface IndustryChipsProps {
  selectedSlug: IndustrySlug;
  onSelect: (slug: IndustrySlug) => void;
  className?: string;
}

export function IndustryChips({
  selectedSlug,
  onSelect,
  className = '',
}: IndustryChipsProps) {
  const { t } = useLanguage();
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % INDUSTRIES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + INDUSTRIES.length) % INDUSTRIES.length;
    } else {
      return;
    }
    const nextSlug = INDUSTRIES[nextIndex];
    onSelect(nextSlug);
    chipRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Select your business industry"
      className={`flex flex-wrap gap-2.5 ${className}`}
    >
      {INDUSTRIES.map((slug, index) => {
        const isSelected = selectedSlug === slug;
        const label = t(`industry.${slug}`) || slug;

        return (
          <button
            key={slug}
            ref={(el) => {
              chipRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(slug)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-[13px] font-body font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6214] ${
              isSelected
                ? 'bg-[#8A6214] text-[#FFF8E7] border-2 border-[#101828] shadow-[2px_2px_0_#101828] scale-[1.02]'
                : 'bg-[#FFFBF0] text-[#0A1628] border-2 border-[#101828]/30 hover:border-[#101828] hover:bg-white shadow-sm'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default IndustryChips;
