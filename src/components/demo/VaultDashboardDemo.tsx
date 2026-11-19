'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DASHBOARD_SAMPLE, TransitStatus } from '@/data/demo';
import { DemoFrame } from './DemoFrame';
import { AreaChart } from './AreaChart';
import { JewelleryImage } from './JewelleryImage';
import { useLanguage } from '@/i18n';

export function VaultDashboardDemo() {
  const { t } = useLanguage();
  const [showSpecs, setShowSpecs] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDispatch = () => {
    setToastMessage(t('demo.demo_only'));
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const getStatusChip = (status: TransitStatus) => {
    switch (status) {
      case 'inTransit':
        return (
          <span className="px-2.5 py-1 rounded-[6px] text-[12px] font-medium text-[#B45309] bg-[#FEF3C7] border border-[#FDE68A] whitespace-nowrap">
            In transit
          </span>
        );
      case 'customsCleared':
        return (
          <span className="px-2.5 py-1 rounded-[6px] text-[12px] font-medium text-[#047857] bg-[#D1FAE5] border border-[#A7F3D0] whitespace-nowrap">
            Customs cleared
          </span>
        );
      case 'homeViewing':
        return (
          <span className="px-2.5 py-1 rounded-[6px] text-[12px] font-medium text-[#6D28D9] bg-[#EDE9FE] border border-[#DDD6FE] whitespace-nowrap">
            Home viewing
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DemoFrame showSampleLabel={true}>
      <div className="p-6 sm:p-8 space-y-6 bg-[var(--demo-bg,#FBF9FF)] text-[var(--demo-ink,#2E1065)] text-left relative">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 px-3.5 py-2 rounded-full bg-[var(--demo-ink,#2E1065)] text-white text-[13px] shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--demo-hairline,#E4DDFB)]">
          <div>
            <h2
              className="font-display font-normal text-[clamp(1.4rem,2.2vw,1.85rem)] text-[var(--demo-ink,#2E1065)] leading-tight"
              style={{ fontFamily: 'var(--font-demo-display), serif', textTransform: 'none' }}
            >
              {DASHBOARD_SAMPLE.title}
            </h2>
            <p className="text-[13px] text-[var(--demo-text-muted,#5B4797)] mt-0.5">
              {DASHBOARD_SAMPLE.hub}
            </p>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-center">
            {/* Plain text role (no badge) */}
            <span className="text-[13px] text-[var(--demo-text-muted,#5B4797)] font-normal">
              {DASHBOARD_SAMPLE.role}
            </span>
            {/* ONE primary pill button */}
            <button
              type="button"
              onClick={handleDispatch}
              className="px-5 py-2 rounded-full bg-[var(--demo-primary,#6D28D9)] hover:bg-[var(--demo-primary-hover,#5B21B6)] text-white text-[13px] font-medium transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--demo-primary,#6D28D9)] focus:ring-offset-2 cursor-pointer"
            >
              Dispatch transit
            </button>
          </div>
        </div>

        {/* 2. KPI Strip: ONE panel with four cells divided by vertical hairlines */}
        <div className="rounded-[12px] bg-white border border-[var(--demo-hairline,#E4DDFB)] shadow-xs overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-[var(--demo-hairline,#E4DDFB)]">
            {DASHBOARD_SAMPLE.kpis.map((kpi) => (
              <div key={kpi.id} className="p-4 sm:p-5 space-y-1">
                <div className="tabular-nums font-semibold text-[26px] sm:text-[28px] text-[var(--demo-ink,#2E1065)] leading-none">
                  {kpi.value}
                </div>
                <div className="text-[13px] text-[var(--demo-text-muted,#5B4797)]">
                  {kpi.label}
                </div>
                <div className="text-[12px] text-[var(--demo-text-muted,#5B4797)] opacity-80">
                  {kpi.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Dispatch Value Chart */}
        <div className="rounded-[12px] bg-white border border-[var(--demo-hairline,#E4DDFB)] p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-[var(--demo-ink,#2E1065)]">
              Dispatch value, last 8 days
            </span>
            <span className="text-[12px] text-[var(--demo-text-muted,#5B4797)]">
              Sample data
            </span>
          </div>
          <AreaChart data={DASHBOARD_SAMPLE.trend} />
        </div>

        {/* 4. Live Transit: ONE card with hairline-separated rows (no per-row boxes) */}
        <div className="rounded-[12px] bg-white border border-[var(--demo-hairline,#E4DDFB)] shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[var(--demo-hairline,#E4DDFB)] bg-[var(--demo-bg,#FBF9FF)]/60">
            <span className="text-[14px] font-medium text-[var(--demo-ink,#2E1065)]">
              Live transit
            </span>
          </div>

          <div className="divide-y divide-[var(--demo-hairline,#E4DDFB)]">
            {DASHBOARD_SAMPLE.feed.map((row) => (
              <div
                key={row.id}
                className="p-4 sm:px-5 sm:py-3.5 min-h-[64px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[var(--demo-bg,#FBF9FF)]/50 transition-colors"
              >
                {/* Left: 48px rounded-12 thumbnail + item + route */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-[12px] overflow-hidden shrink-0 bg-[#1E0B4B] shadow-2xs">
                    <JewelleryImage art={row.art} alt={row.item} />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-[15px] font-semibold text-[var(--demo-ink,#2E1065)] truncate">
                      {row.item}
                    </div>
                    <div className="text-[13px] text-[var(--demo-text-muted,#5B4797)] truncate">
                      {row.route}
                    </div>
                  </div>
                </div>

                {/* Right: tabular amount + sentence-case status chip */}
                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <span className="tabular-nums font-semibold text-[14px] sm:text-[15px] text-[var(--demo-ink,#2E1065)]">
                    {row.amount}
                  </span>
                  {getStatusChip(row.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Tech Specs: button expands quiet panel */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowSpecs((prev) => !prev)}
            aria-expanded={showSpecs}
            className="text-[13px] text-[var(--demo-text-muted,#5B4797)] hover:text-[var(--demo-primary,#6D28D9)] font-medium inline-flex items-center gap-1.5 focus:outline-hidden focus:underline transition-colors cursor-pointer"
          >
            <span>{t('demo.view_specs')}</span>
            {showSpecs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSpecs && (
            <div className="mt-3 p-4 rounded-[12px] bg-white border border-[var(--demo-hairline,#E4DDFB)] text-[13px] text-[var(--demo-text-muted,#5B4797)] leading-relaxed shadow-xs animate-in fade-in">
              PostgreSQL with pgvector, Supabase role-based access, and live updates over WebSockets.
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
