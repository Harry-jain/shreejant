'use client';

import React from 'react';
import { IndustrySlug } from '@/data/industries';
import { IndustryPreview } from './previews';
import { useLanguage } from '@/i18n';

export interface SitePreviewProps {
  selectedSlug: IndustrySlug;
  isFading?: boolean;
}

export function SitePreview({ selectedSlug, isFading = false }: SitePreviewProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Flat Browser Frame (2px ink border, solid shadow, zero blur) */}
      <div className="w-full max-w-[520px] rounded-[16px] border-2 border-[#101828] bg-[#FFFBF0] shadow-[6px_6px_0_#8A6214] overflow-hidden transition-all duration-200">
        {/* Browser Topbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#E9DFC9]/60 border-b-2 border-[#101828]">
          {/* Three Window Dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#101828]/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#101828]/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#101828]/30" />
          </div>

          {/* URL Pill */}
          <div className="px-3 py-1 rounded-full bg-white/90 border border-[#101828]/20 flex items-center gap-1.5 text-[11px] font-body text-[#3D5278] select-none shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A6214]" />
            <span>your-business.example</span>
          </div>

          <div className="w-8" aria-hidden="true" />
        </div>

        {/* Selected Preview Canvas (Crossfades via opacity 250ms) */}
        <div
          className={`w-full p-2 sm:p-4 bg-[#FFFBF0] transition-opacity duration-250 ${
            isFading ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <IndustryPreview slug={selectedSlug} />
        </div>
      </div>

      {/* Caption under frame */}
      <p className="mt-3 text-xs font-body text-[#3D5278] text-center">
        {t('demo.preview_caption') || 'Illustrative preview, not a real client site.'}
      </p>
    </div>
  );
}

export default SitePreview;
