'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { BrandWatermark } from '@/components/ui/BrandWatermark';
import { PrimaryCta } from '@/components/PrimaryCta';
import { useLanguage } from '@/i18n';
import { MEMBERS } from '@/data/team';
import { TeamCard } from './TeamCard';

const TICKER_KEYS = [
  'website',
  'booking',
  'store',
  'dashboard',
  'portal',
  'assistant',
  'anything',
] as const;

export function TeamSection() {
  const { t } = useLanguage();

  const principles = [
    {
      title: t('about_page.p1_title'),
      description: t('about_page.p1_desc'),
    },
    {
      title: t('about_page.p2_title'),
      description: t('about_page.p2_desc'),
    },
    {
      title: t('about_page.p3_title'),
      description: t('about_page.p3_desc'),
    },
  ];

  const featuredMember = MEMBERS.find((m) => m.featured) || MEMBERS[0];
  const standardMembers = MEMBERS.filter((m) => m.id !== featuredMember.id);

  return (
    <div className="py-16 site-container space-y-28">
      {/* 1. Guiding Principles */}
      <section aria-label="Guiding Principles">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading
            eyebrow={t('about_page.principles_label')}
            title={t('about_page.principles_title')}
            subtitle={t('about_page.principles_desc')}
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <GlassCard
              key={idx}
              className="p-8 relative overflow-hidden group shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-[8px] bg-[#7C5CFC]/15 text-[#7C5CFC] flex items-center justify-center font-mono font-medium text-lg mb-6">
                0{idx + 1}
              </div>
              <h3 className="font-heading font-medium text-[20px] text-brand-text mb-3">
                {p.title}
              </h3>
              <p className="font-body text-[14px] text-brand-muted leading-relaxed">
                {p.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 2. Playful Team Section ("The people building your website") */}
      <section
        id="team"
        aria-label="Leadership & Engineering Team"
        className="relative pt-12 border-t border-black/10 dark:border-white/10 reveal-wrapper is-revealed"
      >
        {/* Subtle Watermark behind the section (10-15% opacity) */}
        <BrandWatermark text="SHREEJAN" position="center" className="opacity-12" />

        {/* Playful Doodles (at most 6, static, aria-hidden, hidden < 640px) */}
        {/* 1. Star Sparkle top-left */}
        <div
          className="hidden sm:block absolute -top-2 left-6 text-[#7C5CFC] pointer-events-none select-none opacity-80"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/>
          </svg>
        </div>

        {/* 2. Plus doodle near left column */}
        <div
          className="hidden sm:block absolute top-48 left-2 text-[#7C5CFC] pointer-events-none select-none opacity-70"
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </div>

        {/* 3. Squiggle doodle above right column */}
        <div
          className="hidden sm:block absolute -top-4 right-16 text-[#A78BFA] pointer-events-none select-none opacity-75"
          aria-hidden="true"
        >
          <svg width="36" height="14" viewBox="0 0 40 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 8 C 8 2, 12 14, 18 8 C 24 2, 28 14, 34 8"/>
          </svg>
        </div>

        {/* 4. Dashed circle doodle bottom-left */}
        <div
          className="hidden sm:block absolute bottom-8 left-10 text-[#7C5CFC] pointer-events-none select-none opacity-60"
          aria-hidden="true"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" strokeDasharray="3 3"/>
          </svg>
        </div>

        {/* 5. 4-point star sparkle between cards */}
        <div
          className="hidden sm:block absolute top-[44%] right-[48%] text-[#A78BFA] pointer-events-none select-none opacity-70"
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z"/>
          </svg>
        </div>

        {/* 6. Diamond doodle bottom-right */}
        <div
          className="hidden sm:block absolute bottom-4 right-8 text-[#7C5CFC] pointer-events-none select-none opacity-65"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="10" y="2" width="10" height="10" transform="rotate(45 10 2)"/>
          </svg>
        </div>

        {/* 12-column layout: Desktop >= 1024px: 4 cols sticky left, 8 cols cards right */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (span 4): Sticky on desktop */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px] space-y-6 text-left">
            <div>
              <h2
                className="font-heading font-bold text-[clamp(28px,3.8vw,42px)] text-brand-text leading-tight mb-3 tracking-tight"
                style={{ textTransform: 'none' }}
              >
                {t('about.title') || 'The people building your website'}
              </h2>
              <p className="font-body text-[16px] sm:text-[18px] text-brand-muted leading-relaxed">
                {t('about.subtitle') || 'You talk directly with the people who build it.'}
              </p>

              {/* "We build:" Ticker */}
              <div className="mt-5 flex items-center flex-wrap gap-2.5">
                <span className="font-heading font-semibold text-base sm:text-lg text-brand-text">
                  {t('team.we_build') || 'We build:'}
                </span>
                <div
                  tabIndex={0}
                  className="h-[36px] sm:h-[40px] px-3.5 inline-flex items-center overflow-hidden bg-[#7C5CFC] border-2 border-[#0A1628] shadow-[2px_2px_0_#0A1628] rounded-full -rotate-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] cursor-default"
                  aria-hidden="true"
                >
                  <div className="flex flex-col animate-word-ticker">
                    {TICKER_KEYS.map((k) => (
                      <span
                        key={k}
                        className="h-[36px] sm:h-[40px] flex items-center font-heading font-bold text-xs sm:text-sm text-white whitespace-nowrap"
                      >
                        {t(`team.words.${k}`)}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Screen-reader accessible full text */}
                <span className="sr-only">
                  {t('team.we_build')}{' '}
                  {TICKER_KEYS.map((k) => t(`team.words.${k}`)).join(', ')}.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <PrimaryCta size="lg" />
            </div>
          </div>

          {/* Right Column (span 8): Featured on top, 2 equal cards below */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Featured Card (Ankit) — Full width of the 8 columns */}
            {featuredMember && (
              <div className="w-full">
                <TeamCard member={featuredMember} featured={true} />
              </div>
            )}

            {/* Standard Cards (Harsh & Akshay) — 2 equal cards side by side */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
              {standardMembers.map((member) => (
                <div key={member.id} className="w-full h-full flex flex-col">
                  <TeamCard member={member} featured={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeamSection;
