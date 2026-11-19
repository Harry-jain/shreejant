'use client';

import React, { useEffect, useState } from 'react';
import { Zap, ZapOff } from 'lucide-react';
import { getPerfMode, setPerfMode, PerfMode } from '@/lib/perf';
import { useLanguage } from '@/i18n';

export function PerfModeSwitch() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<PerfMode>('full');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(getPerfMode());
    setMounted(true);

    const handlePerfChange = (e: Event) => {
      const customEvent = e as CustomEvent<PerfMode>;
      if (customEvent.detail) {
        setMode(customEvent.detail);
      }
    };

    window.addEventListener('shreejan_perf_change', handlePerfChange);
    return () => window.removeEventListener('shreejan_perf_change', handlePerfChange);
  }, []);

  const toggle = () => {
    const nextMode: PerfMode = mode === 'lite' ? 'full' : 'lite';
    setPerfMode(nextMode);
    setMode(nextMode);
  };

  const isLite = mode === 'lite';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLite}
      aria-label={t('perf.lite_label') || 'Lite mode (faster on older devices)'}
      onClick={toggle}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body transition-colors border border-brand-border/40 hover:border-[#7C5CFC]/60 bg-black/10 dark:bg-white/5 text-brand-text cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
    >
      <span
        className={`w-2 h-2 rounded-full transition-colors ${
          isLite ? 'bg-amber-600' : 'bg-emerald-600'
        }`}
      />
      {isLite ? (
        <ZapOff className="w-3.5 h-3.5 text-[#7C5CFC] shrink-0" />
      ) : (
        <Zap className="w-3.5 h-3.5 text-[#7C5CFC] shrink-0" />
      )}
      <span className="text-[12px] text-brand-muted">
        {t('perf.lite_label') || 'Lite mode (faster on older devices)'}
      </span>
      <span
        className={`text-[11px] px-1.5 py-0.5 rounded font-mono font-medium ${
          isLite ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
        }`}
      >
        {isLite ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}

export default PerfModeSwitch;
