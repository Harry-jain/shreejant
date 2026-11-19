'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { IndustrySlug } from '@/data/industries';
import { IndustryChips } from './IndustryChips';
import { SitePreview } from './SitePreview';
import { useLanguage } from '@/i18n';
import { getPerfMode } from '@/lib/perf';

export interface DemoStudioProps {
  className?: string;
  id?: string;
}

export function DemoStudio({ className = '', id = 'demo-studio' }: DemoStudioProps) {
  const { t, lang } = useLanguage();
  const [selectedSlug, setSelectedSlug] = useState<IndustrySlug>('other');
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isLite, setIsLite] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updatePerf = () => setIsLite(getPerfMode() === 'lite');
    updatePerf();
    window.addEventListener('shreejan_perf_change', updatePerf);
    return () => window.removeEventListener('shreejan_perf_change', updatePerf);
  }, []);

  const handleSelectIndustry = (slug: IndustrySlug) => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

    setHasUserSelected(true);

    if (isLite) {
      setSelectedSlug(slug);
      setIsTyping(false);
      setIsFading(false);
      return;
    }

    // Trigger crossfade (250ms)
    setIsFading(true);
    setIsTyping(true);

    fadeTimerRef.current = setTimeout(() => {
      setSelectedSlug(slug);
      setIsFading(false);
    }, 150);

    // 500ms typing transition
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918976517353';
  const selectedLabel = t(`industry.${selectedSlug}`) || selectedSlug;

  const getWhatsappUrl = () => {
    if (!hasUserSelected) {
      const defaultMessages: Record<string, string> = {
        en: "Hi SHREEJAN AI SOLUTIONS, I'd like to see a custom demo for my business.",
        hi: "नमस्ते SHREEJAN AI SOLUTIONS, मैं अपने व्यवसाय के लिए एक कस्टम डेमो देखना चाहता हूँ।",
        mr: "नमस्कार SHREEJAN AI SOLUTIONS, मला माझ्या व्यवसायासाठी एक सानुकूल डेमो पाहायचा आहे.",
      };
      const text = encodeURIComponent(defaultMessages[lang] || defaultMessages.en);
      return `https://wa.me/${whatsappNumber}?text=${text}`;
    }

    const tailoredMessages: Record<string, string> = {
      en: `Hi SHREEJAN AI SOLUTIONS, I'd like to see a custom demo for my ${selectedLabel} business.`,
      hi: `नमस्ते SHREEJAN AI SOLUTIONS, मैं अपने ${selectedLabel} व्यवसाय के लिए एक कस्टम डेमो देखना चाहता हूँ।`,
      mr: `नमस्कार SHREEJAN AI SOLUTIONS, मला माझ्या ${selectedLabel} व्यवसायासाठी एक सानुकूल डेमो पाहायचा आहे.`,
    };
    const text = encodeURIComponent(tailoredMessages[lang] || tailoredMessages.en);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  const demoHref = hasUserSelected
    ? `/contact?intent=demo&type=${selectedSlug}`
    : '/contact?intent=demo';

  const replyText = t('demo.studio.reply', { type: selectedLabel });
  const resultText = t('demo.studio.result', { type: selectedLabel });

  return (
    <section
      id={id}
      aria-label="Tailored demo consultation and live interactive architecture preview"
      className={`relative w-full py-[clamp(64px,8vw,104px)] overflow-hidden ${className}`}
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Chat Conversation (6/12 on desktop) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            {/* Bubble 1: SHREEJAN Initial Message (Left, with S avatar & speech tail) */}
            <div className="flex items-start gap-3 sm:gap-4 max-w-[94%] sm:max-w-[88%] self-start">
              {/* S Monogram Avatar */}
              <div
                className="w-10 h-10 rounded-full bg-[#8A6214] text-[#FFF8E7] flex items-center justify-center font-heading font-bold text-base shrink-0 shadow-sm select-none border border-[#A07820]"
                aria-hidden="true"
              >
                S
              </div>

              {/* Bubble 1 Card */}
              <div className="relative bg-[#FFFBF0] text-[#0A1628] p-5 sm:p-6 rounded-[22px] rounded-tl-[4px] border border-[#8A6214]/25 shadow-[0_4px_20px_rgba(10,22,40,0.06)]">
                {/* CSS Tail */}
                <div
                  className="absolute -left-[7px] top-[14px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-[#8A6214]/25 border-b-[8px] border-b-transparent"
                  aria-hidden="true"
                >
                  <div className="absolute -top-[7px] left-[1px] w-0 h-0 border-t-[7px] border-t-transparent border-r-[7px] border-r-[#FFFBF0] border-b-[7px] border-b-transparent" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-[20px] sm:text-[22px] text-[#0A1628] leading-snug">
                    {t('demo.bubble.heading') || "Let's see what fits your business"}
                  </h3>
                  <p className="font-body text-[15px] sm:text-[16px] text-[#3D5278] leading-relaxed">
                    {t('demo.bubble.body') ||
                      "Every business is different, so we don't put a single price on a website. Tell us about yours and we'll show you a demo made for it."}
                  </p>
                  <p className="font-body text-[13px] text-[#8A6214] font-medium pt-1 border-t border-[#8A6214]/15">
                    {t('demo.bubble.note') || 'Demos are for businesses that are ready to get started.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Question Bubble & Industry Chips */}
            <div className="flex flex-col space-y-3 pl-12 sm:pl-14">
              <div className="inline-block self-start bg-[#FFFBF0] text-[#0A1628] px-4 py-2.5 rounded-[18px] rounded-tl-[4px] border border-[#8A6214]/25 text-sm sm:text-[15px] font-body font-medium shadow-sm">
                {t('demo.studio.question') || 'What kind of business do you run?'}
              </div>

              {/* 8 Industry Chips */}
              <IndustryChips
                selectedSlug={selectedSlug}
                onSelect={handleSelectIndustry}
                className="pt-1"
              />
            </div>

            {/* Bubble 2: User Choice Bubble (Right-aligned, Bronze) */}
            {hasUserSelected && (
              <div className="self-end max-w-[85%] sm:max-w-[75%] pt-1 animate-slide-up-1">
                <div className="bg-[#8A6214] text-[#FFF8E7] px-5 py-2.5 rounded-[20px] rounded-br-[4px] text-sm sm:text-[15px] font-body font-semibold shadow-sm text-right">
                  {replyText}
                </div>
              </div>
            )}

            {/* Bubble 3: SHREEJAN Tailored Response with 500ms typing indicator */}
            {hasUserSelected && (
              <div className="flex items-start gap-3 sm:gap-4 max-w-[94%] sm:max-w-[88%] self-start pt-1 animate-slide-up-2">
                <div
                  className="w-10 h-10 rounded-full bg-[#8A6214] text-[#FFF8E7] flex items-center justify-center font-heading font-bold text-base shrink-0 shadow-sm select-none border border-[#A07820]"
                  aria-hidden="true"
                >
                  S
                </div>

                <div className="relative bg-[#FFFBF0] text-[#0A1628] p-4 sm:p-5 rounded-[20px] rounded-tl-[4px] border border-[#8A6214]/25 shadow-[0_4px_16px_rgba(10,22,40,0.05)]">
                  {/* CSS Tail */}
                  <div
                    className="absolute -left-[7px] top-[14px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-[#8A6214]/25 border-b-[8px] border-b-transparent"
                    aria-hidden="true"
                  >
                    <div className="absolute -top-[7px] left-[1px] w-0 h-0 border-t-[7px] border-t-transparent border-r-[7px] border-r-[#FFFBF0] border-b-[7px] border-b-transparent" />
                  </div>

                  {isTyping ? (
                    <div className="flex items-center gap-1.5 py-1 px-2 text-[#8A6214]" aria-label="Loading preview">
                      <span className="w-2 h-2 rounded-full bg-[#8A6214] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#8A6214] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#8A6214] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <p className="font-heading font-semibold text-[16px] sm:text-[18px] text-[#0A1628]">
                      {resultText}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons: "Book a demo" & "Chat on WhatsApp" */}
            <div className="flex flex-wrap items-center gap-3 pt-3 pl-12 sm:pl-14">
              <Link
                href={demoHref}
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-[16px] bg-[#8A6214] text-[#FFF8E7] font-body font-semibold text-[15px] sm:text-[16px] shadow-[0_4px_14px_rgba(138,98,20,0.25)] hover:bg-[#6B4E0C] active:scale-[0.98] transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6214]"
              >
                <span>{t('nav.book_demo') || 'Book a demo'}</span>
              </Link>

              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-[16px] bg-[#FFFBF0] text-[#0A1628] border border-[#8A6214]/30 font-body text-[14px] sm:text-[15px] font-medium shadow-[0_2px_8px_rgba(10,22,40,0.04)] hover:border-[#8A6214] hover:bg-white active:scale-[0.98] transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6214]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
                <span>{t('cta.whatsapp') || 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Tailored Architecture Live Preview (6/12 on desktop) */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <SitePreview selectedSlug={selectedSlug} isFading={isFading} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoStudio;
