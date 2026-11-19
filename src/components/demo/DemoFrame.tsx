'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { DEMO_BRAND } from '@/data/demo';
import { demoDisplay, demoUI } from '@/lib/demoFonts';
import { useLanguage } from '@/i18n';

export interface DemoFrameProps {
  children: React.ReactNode;
  showSampleLabel?: boolean;
  className?: string;
}

export function DemoFrame({
  children,
  showSampleLabel = false,
  className = '',
}: DemoFrameProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`demo-theme ${demoDisplay.variable} ${demoUI.variable} rounded-[16px] border border-[var(--demo-hairline,#E4DDFB)] bg-[var(--demo-bg,#FBF9FF)] shadow-[0_20px_50px_rgba(109,40,217,0.08)] overflow-hidden flex flex-col font-sans text-[var(--demo-ink,#2E1065)] ${className}`}
      style={{
        fontFamily: 'var(--font-demo-ui), sans-serif',
      }}
    >
      {/* Tidy Browser Chrome Top Bar */}
      <div className="px-4 py-3 bg-white border-b border-[var(--demo-hairline,#E4DDFB)] flex items-center justify-between gap-3 shrink-0">
        {/* Three dots */}
        <div className="flex items-center space-x-1.5 shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
        </div>

        {/* Centered URL Pill */}
        <div className="px-3.5 py-1 rounded-full bg-[var(--demo-bg,#FBF9FF)] text-[12px] text-[var(--demo-text-muted,#5B4797)] border border-[var(--demo-hairline,#E4DDFB)] flex items-center gap-1.5 truncate max-w-[280px]">
          <Lock className="w-3 h-3 text-[var(--demo-text-muted,#5B4797)] shrink-0" aria-hidden="true" />
          <span className="truncate">{DEMO_BRAND.domainLabel}</span>
        </div>

        {/* Right Label (plain text on tint, no border) */}
        <div className="flex items-center gap-2 shrink-0">
          {showSampleLabel && (
            <span className="text-[11px] text-[var(--demo-text-muted,#5B4797)]">
              {t('demo.sample_data')}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#EDE9FE] text-[var(--demo-primary,#6D28D9)]">
            {t('demo.badge')}
          </span>
        </div>
      </div>

      {/* Frame Viewport Scrollable Area */}
      <div
        className="demo-scrollbar overflow-y-auto w-full flex-1 max-h-[480px] md:max-h-[560px]"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--demo-hairline, #E4DDFB) var(--demo-bg, #FBF9FF)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
