'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { OFFER } from '@/data/offer';
import { useLanguage } from '@/i18n';

export interface AuditCardProps {
  className?: string;
  compact?: boolean;
}

export function AuditCard({ className = '', compact = false }: AuditCardProps) {
  const { t, formatPrice } = useLanguage();
  const { audit } = OFFER;

  if (!audit.enabled) {
    return null;
  }

  const formattedPrice = formatPrice(audit.priceInr);

  if (compact) {
    return (
      <div className={`w-full max-w-3xl mx-auto ${className}`}>
        <div className="p-4 sm:p-5 rounded-[20px] bg-[#0E121E]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl hover:border-[#7C5CFC]/40 transition-all text-white backdrop-blur-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="p-2 rounded-xl bg-[#7C5CFC]/15 text-[#A78BFA] shrink-0 hidden sm:inline-flex">
              <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            </span>
            <p className="font-heading font-medium text-sm sm:text-base text-white/90">
              {t('audit.strip') || 'Already have a website? Get a thorough audit and improvement plan.'}
            </p>
          </div>
          <Link
            href="/audit"
            className="shrink-0 min-h-[42px] inline-flex items-center justify-center font-heading font-semibold rounded-full px-5 py-2 bg-[#7C5CFC] hover:bg-[#6847ED] text-white shadow-[0_4px_14px_rgba(124,92,252,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm"
          >
            {t('cta.audit', { price: formattedPrice }) || `Get a website audit — ${formattedPrice}`}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/audit"
      aria-label={`${t('audit.title') || 'Website audit'} — ${formattedPrice}`}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] rounded-[24px]"
    >
      <div className={`p-6 sm:p-8 rounded-[24px] bg-[#0E121E]/90 border border-white/10 group-hover:border-[#7C5CFC]/40 transition-all shadow-xl group-hover:shadow-[0_16px_36px_rgba(124,92,252,0.2)] relative overflow-hidden cursor-pointer text-white backdrop-blur-xl ${className}`}>
        {/* Subtle top violet ambient glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#7C5CFC]/20 blur-3xl pointer-events-none" />

        <div className="flex flex-col h-full justify-between space-y-5 relative z-10">
          <div>
            {/* Eyebrow / Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#7C5CFC]/15 text-[#A78BFA] border border-[#7C5CFC]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>{t('audit.title') || 'Website audit'}</span>
              </span>

              <span className="text-2xl sm:text-3xl font-mono font-black text-[#A78BFA]">
                {formattedPrice}
              </span>
            </div>

            {/* Description */}
            <p className="font-body text-sm sm:text-[15px] leading-relaxed text-white/75 mb-5">
              {t('audit.body') ||
                "A thorough forensic audit examining your site's sub-second speed, mobile UX, SEO ranking factors, and conversion leaks with a prioritised action plan."}
            </p>

            {/* Features / Delivery */}
            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/85 font-medium">
                <Clock className="w-4 h-4 text-[#A78BFA] shrink-0" />
                <span>
                  {t('audit.delivery', { n: audit.deliveryWorkingDays }) ||
                    `Delivered in ${audit.deliveryWorkingDays} working days via WhatsApp & PDF report.`}
                </span>
              </div>

              {audit.creditedToPackage && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {t('audit.credited', { price: formattedPrice }) ||
                      `100% of the ${formattedPrice} fee is credited back against your project build.`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action + Note */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <div className="w-full min-h-[46px] inline-flex items-center justify-center font-heading font-semibold rounded-full px-6 py-3 bg-[#7C5CFC] hover:bg-[#6847ED] text-white shadow-[0_4px_20px_rgba(124,92,252,0.4)] group-hover:shadow-[0_6px_26px_rgba(124,92,252,0.6)] group-hover:scale-[1.01] transition-all">
              <span>{t('cta.audit', { price: formattedPrice }) || `Get a website audit — ${formattedPrice}`}</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] font-body text-white/50 text-center leading-tight">
              {t('audit.note') || 'We will send a payment link on WhatsApp after you submit.'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AuditCard;
