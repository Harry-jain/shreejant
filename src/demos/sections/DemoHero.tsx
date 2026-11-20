import React from 'react';
import { DemoConfig } from '../demos.config';
import * as Art from '../art';

export function DemoHero({ config }: { config: DemoConfig }) {
  const { id, name, tagline, hero, palette } = config;

  const renderArt = () => {
    switch (id) {
      case 'salon':
        return <Art.SalonArt className="w-full max-w-[280px] sm:max-w-[320px] mx-auto drop-shadow-sm" />;
      case 'clinic':
        return <Art.ClinicArt className="w-full max-w-[280px] sm:max-w-[320px] mx-auto drop-shadow-sm" />;
      case 'restaurant':
        return <Art.RestaurantArt className="w-full max-w-[280px] sm:max-w-[320px] mx-auto drop-shadow-sm" />;
      default:
        return null;
    }
  };

  // Layout 1: Restaurant Full-Width Band
  if (id === 'restaurant') {
    return (
      <section
        className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b-2"
        style={{
          backgroundColor: palette.surface,
          borderColor: palette.accent,
          color: palette.ink,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase" style={{ backgroundColor: palette.bg, color: palette.accent }}>
              <span>{name}</span>
              <span>•</span>
              <span>{tagline}</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-demo-display), Georgia, serif' }}
            >
              {hero.title}
            </h1>
            <p className="text-base sm:text-lg opacity-85 max-w-xl leading-relaxed">
              {hero.sub}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="px-6 py-3 rounded-lg font-semibold text-sm transition-transform active:scale-95 shadow-md"
                style={{ backgroundColor: palette.accent, color: 'white' }}
              >
                {hero.cta}
              </a>
              <a
                href="#reservation"
                className="px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-transform active:scale-95"
                style={{ borderColor: palette.ink, color: palette.ink }}
              >
                Reserve a table
              </a>
            </div>
          </div>
          <div className="w-full md:w-auto shrink-0 flex items-center justify-center p-4 rounded-2xl" style={{ backgroundColor: palette.bg }}>
            {renderArt()}
          </div>
        </div>
      </section>
    );
  }

  // Layout 2: Split 2-Column Hero (Salon, Clinic)
  return (
    <section
      className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b"
      style={{
        backgroundColor: palette.bg,
        borderColor: `${palette.accent}30`,
        color: palette.ink,
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="md:col-span-7 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: palette.surface, color: palette.accent }}>
            <span>{name}</span>
            <span>•</span>
            <span>{tagline}</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-demo-display), system-ui, sans-serif' }}
          >
            {hero.title}
          </h1>
          <p className="text-base sm:text-lg opacity-85 max-w-xl leading-relaxed">
            {hero.sub}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <a
              href="#booking"
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-transform active:scale-95 shadow-md"
              style={{ backgroundColor: palette.accent, color: 'white' }}
            >
              {hero.cta}
            </a>
            <a
              href="#appointment"
              className="px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-transform active:scale-95"
              style={{ borderColor: palette.ink, color: palette.ink }}
            >
              View details
            </a>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="p-6 rounded-2xl border w-full max-w-sm flex items-center justify-center shadow-sm" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
            {renderArt()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoHero;
