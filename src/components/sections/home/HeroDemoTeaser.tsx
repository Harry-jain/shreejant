'use client';

import React from 'react';
import Link from 'next/link';
import { CHIP_ORDER } from '@/demos/demos.config';
import { useLanguage } from '@/i18n';

export function HeroDemoTeaser() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 pt-2 text-xs text-ink/70 dark:text-white/70">
      <span className="font-mono font-medium text-[#7C5CFC]">{t('hero.demo_teaser')}</span>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {CHIP_ORDER.map((id, idx) => (
          <React.Fragment key={id}>
            <Link
              href={`/?demo=${id}#demos`}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-[#12151F] border border-black/10 dark:border-white/10 hover:border-[#7C5CFC] hover:text-[#7C5CFC] font-medium transition-colors"
            >
              {t(`demo.type.${id}`)}
            </Link>
            {idx < CHIP_ORDER.length - 1 && (
              <span className="opacity-30 text-[10px]" aria-hidden="true">
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default HeroDemoTeaser;
