'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DEMO_BRAND, PIECES, HERO_IMAGE, CONCIERGE_QA, Piece } from '@/data/demo';
import { DemoFrame } from './DemoFrame';
import { ArchFrame } from './ArchFrame';
import { JewelleryImage } from './JewelleryImage';
import { useLanguage } from '@/i18n';

export interface JewelleryHomeDemoProps {
  bare?: boolean;
  brandName?: string;
}

export function JewelleryHomeDemo({ bare = false, brandName }: JewelleryHomeDemoProps = {}) {
  const { t, formatPrice } = useLanguage();
  const [selectedPieceId, setSelectedPieceId] = useState<string>(PIECES[0].id);
  const [isCrossfading, setIsCrossfading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Concierge state
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [conciergeAnswer, setConciergeAnswer] = useState<string | null>(null);

  const collectionRef = useRef<HTMLDivElement>(null);

  const selectedPiece = PIECES.find((p) => p.id === selectedPieceId) || PIECES[0];
  const activeBrandName = brandName || DEMO_BRAND.name;

  const handleSelectPiece = (piece: Piece) => {
    if (piece.id === selectedPieceId) return;
    setIsCrossfading(true);
    setTimeout(() => {
      setSelectedPieceId(piece.id);
      setIsCrossfading(false);
    }, 200);
  };

  const handleKeyDownPicker = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % PIECES.length;
      handleSelectPiece(PIECES[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + PIECES.length) % PIECES.length;
      handleSelectPiece(PIECES[prevIndex]);
    }
  };

  const handleExploreClick = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleActionToast = () => {
    setToastMessage(t('demo.demo_only'));
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleAsk = (idx: number) => {
    setActiveQuestion(idx);
    setIsTyping(true);
    setConciergeAnswer(null);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setConciergeAnswer(CONCIERGE_QA[idx].a);
    }, 600);

    return () => clearTimeout(timer);
  };

  const content = (
    <div
      className="demo-theme relative bg-[var(--demo-bg,#FAF8F5)] text-[var(--demo-ink,#1A1816)] selection:bg-[#F3E7C4] selection:text-[#8A6214]"
      style={{
        ['--demo-bg' as any]: '#FAF8F5',
        ['--demo-surface' as any]: '#FFFFFF',
        ['--demo-ink' as any]: '#1A1816',
        ['--demo-text-muted' as any]: '#6E645A',
        ['--demo-primary' as any]: '#8A6214',
        ['--demo-primary-hover' as any]: '#A07820',
        ['--demo-hairline' as any]: '#EAE3D5',
        ['--demo-velvet-1' as any]: '#0A1628',
        ['--demo-velvet-2' as any]: '#16253B',
      }}
    >
      {/* Floating Demo Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-3.5 py-2 rounded-full bg-[var(--demo-ink,#1A1816)] text-[#FFF8E7] text-[13px] shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-[#C9A84C]/30">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header (64px) */}
      <header className="h-16 px-6 sm:px-8 border-b border-[var(--demo-hairline,#EAE3D5)] bg-white/95 backdrop-blur-xs flex items-center justify-between sticky top-0 z-30">
        {/* Wordmark: Caps & Tracked */}
        <span
          className="font-display font-medium text-lg sm:text-xl tracking-[0.24em] text-[var(--demo-ink,#1A1816)] select-none uppercase"
          style={{ fontFamily: 'var(--font-demo-display), serif' }}
        >
          {activeBrandName}
        </span>

        {/* 4 Clean text navigation links */}
        <nav className="flex items-center gap-5 sm:gap-7 text-[13px] font-normal text-[var(--demo-text-muted,#6E645A)]">
          <a
            href="#polki"
            onClick={(e) => {
              e.preventDefault();
              handleExploreClick();
            }}
            className="hover:text-[var(--demo-primary,#8A6214)] hover:underline focus:outline-hidden focus:underline transition-colors"
          >
            Polki
          </a>
          <a
            href="#solitaires"
            onClick={(e) => {
              e.preventDefault();
              handleExploreClick();
            }}
            className="hover:text-[var(--demo-primary,#8A6214)] hover:underline focus:outline-hidden focus:underline transition-colors"
          >
            Solitaires
          </a>
          <a
            href="#bridal"
            onClick={(e) => {
              e.preventDefault();
              handleExploreClick();
            }}
            className="hover:text-[var(--demo-primary,#8A6214)] hover:underline focus:outline-hidden focus:underline transition-colors"
          >
            Bridal
          </a>
          <a
            href="#visit"
            onClick={(e) => {
              e.preventDefault();
              handleActionToast();
            }}
            className="hover:text-[var(--demo-primary,#8A6214)] hover:underline focus:outline-hidden focus:underline transition-colors"
          >
            Visit
          </a>
        </nav>
      </header>

      {/* 2. Hero Section: 7/5 two columns on desktop, stacked on mobile */}
      <section className="px-6 sm:px-10 py-10 sm:py-14 border-b border-[var(--demo-hairline,#EAE3D5)] bg-gradient-to-b from-white to-[var(--demo-bg,#FAF8F5)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left 7 cols: quiet editorial typography */}
          <div className="md:col-span-7 space-y-4 text-left">
            {/* Caption in sentence case */}
            <p className="text-[13px] sm:text-[14px] text-[var(--demo-text-muted,#6E645A)] font-medium">
              Heritage jewellery from Mumbai and Jaipur
            </p>

            {/* Headline in Bodoni Moda 400 */}
            <h1
              className="font-display font-normal text-[clamp(2rem,3.8vw,3.25rem)] text-[var(--demo-ink,#1A1816)] leading-[1.08]"
              style={{ fontFamily: 'var(--font-demo-display), serif', textTransform: 'none' }}
            >
              Imperial Polki and natural solitaires
            </h1>

            {/* Body */}
            <p className="text-[15px] sm:text-[16px] text-[var(--demo-text-muted,#6E645A)] leading-[1.65] max-w-md">
              Handcrafted by master karigars for private collections across India. Every piece is made to be passed down.
            </p>

            {/* Actions: ONE primary gold pill + ONE underlined text link */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={handleExploreClick}
                className="px-6 py-2.5 rounded-full bg-[var(--demo-primary,#8A6214)] hover:bg-[var(--demo-primary-hover,#A07820)] text-[#FFF8E7] text-[14px] font-medium transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--demo-primary,#8A6214)] focus:ring-offset-2 cursor-pointer"
              >
                Explore the collection
              </button>
              <button
                type="button"
                onClick={handleActionToast}
                className="text-[14px] text-[var(--demo-ink,#1A1816)] hover:text-[var(--demo-primary,#8A6214)] underline underline-offset-4 font-medium transition-colors cursor-pointer focus:outline-hidden"
              >
                Book a private viewing
              </button>
            </div>
          </div>

          {/* Right 5 cols: ArchFrame with soft fade-in on load */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[280px] sm:max-w-[320px] transition-opacity duration-900 ease-out">
              <ArchFrame>
                <JewelleryImage
                  art="necklace"
                  image={HERO_IMAGE}
                  alt="Imperial Bridal heritage polki necklace"
                  priority
                />
              </ArchFrame>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Collection Section */}
      <section ref={collectionRef} className="px-6 sm:px-10 py-12 border-b border-[var(--demo-hairline,#EAE3D5)] bg-[var(--demo-bg,#FAF8F5)]">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2
            className="font-display font-normal text-[clamp(1.5rem,2.4vw,2rem)] text-[var(--demo-ink,#1A1816)] leading-tight text-left"
            style={{ fontFamily: 'var(--font-demo-display), serif', textTransform: 'none' }}
          >
            The collection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Big 4:5 image + 3 thumbnails picker */}
            <div className="md:col-span-6 space-y-4">
              <div
                className={`transition-opacity duration-200 ${
                  isCrossfading ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <JewelleryImage
                  art={selectedPiece.art}
                  image={selectedPiece.image}
                  alt={selectedPiece.name}
                  className="shadow-sm"
                />
              </div>

              {/* Thumbnail Picker (role="radiogroup") */}
              <div
                role="radiogroup"
                aria-label="Jewellery piece selector"
                className="flex items-center gap-3 pt-1"
              >
                {PIECES.map((piece, idx) => {
                  const isSelected = piece.id === selectedPieceId;
                  return (
                    <button
                      key={piece.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => handleSelectPiece(piece)}
                      onKeyDown={(e) => handleKeyDownPicker(e, idx)}
                      className={`relative w-[72px] h-[90px] rounded-[10px] overflow-hidden transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[var(--demo-primary,#8A6214)] ${
                        isSelected
                          ? 'ring-2 ring-[var(--demo-primary,#8A6214)] ring-offset-2'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <JewelleryImage
                        art={piece.art}
                        image={piece.image}
                        alt={piece.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Piece name, blurb, price, WhatsApp enquiry */}
            <div
              className={`md:col-span-6 space-y-5 text-left transition-opacity duration-200 ${
                isCrossfading ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <h3
                className="font-display font-normal text-2xl sm:text-3xl text-[var(--demo-ink,#1A1816)]"
                style={{ fontFamily: 'var(--font-demo-display), serif', textTransform: 'none' }}
              >
                {selectedPiece.name}
              </h3>

              <p className="text-[15px] sm:text-[16px] text-[var(--demo-text-muted,#6E645A)] leading-[1.65]">
                {selectedPiece.blurb}
              </p>

              <div className="tabular-nums font-semibold text-2xl text-[var(--demo-ink,#1A1816)]">
                {formatPrice(selectedPiece.priceInr)}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleActionToast}
                  className="px-6 py-2.5 rounded-full bg-[var(--demo-primary,#8A6214)] hover:bg-[var(--demo-primary-hover,#A07820)] text-[#FFF8E7] text-[14px] font-medium transition-all shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--demo-primary,#8A6214)] focus:ring-offset-2 cursor-pointer"
                >
                  Enquire on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Craftsmanship Section */}
      <section className="px-6 sm:px-10 py-10 border-b border-[var(--demo-hairline,#EAE3D5)] bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--demo-hairline,#EAE3D5)]">
          <div className="py-4 md:py-0 md:px-6 first:pl-0 space-y-1.5 text-left">
            <h3
              className="font-display font-normal text-[20px] text-[var(--demo-ink,#1A1816)]"
              style={{ fontFamily: 'var(--font-demo-display), serif', textTransform: 'none' }}
            >
              Master karigars
            </h3>
            <p className="text-[14px] text-[var(--demo-text-muted,#6E645A)] leading-relaxed">
              Hand-set by karigars who learnt the craft across generations.
            </p>
          </div>

          <div className="py-4 md:py-0 md:px-6 space-y-1.5 text-left">
            <h3
              className="font-display font-normal text-[20px] text-[var(--demo-ink,#1A1816)]"
              style={{ fontFamily: 'var(--font-demo-display), serif', textTransform: 'none' }}
            >
              Stones chosen with care
            </h3>
            <p className="text-[14px] text-[var(--demo-text-muted,#6E645A)] leading-relaxed">
              Every stone is selected and checked before it is set.
            </p>
          </div>

          <div className="py-4 md:py-0 md:px-6 last:pr-0 space-y-1.5 text-left">
            <h3
              className="font-display font-normal text-[20px] text-[var(--demo-ink,#1A1816)]"
              style={{ fontFamily: 'var(--font-demo-display), serif', textTransform: 'none' }}
            >
              Seen in person
            </h3>
            <p className="text-[14px] text-[var(--demo-text-muted,#6E645A)] leading-relaxed">
              View each piece at home or at our salon.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Concierge */}
      <section className="px-6 sm:px-10 py-8 border-b border-[var(--demo-hairline,#EAE3D5)] bg-[var(--demo-bg,#FAF8F5)]">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-[14px] font-medium text-[var(--demo-ink,#1A1816)]">
              Questions about a piece?
            </span>

            {/* 3 Quiet Chips */}
            <div className="flex flex-wrap gap-2">
              {CONCIERGE_QA.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAsk(idx)}
                  className={`px-3 py-1.5 rounded-full text-[13px] transition-all cursor-pointer border ${
                    activeQuestion === idx
                      ? 'bg-[var(--demo-primary,#8A6214)] text-white border-[var(--demo-primary,#8A6214)]'
                      : 'bg-white text-[var(--demo-ink,#1A1816)] border-[var(--demo-hairline,#EAE3D5)] hover:border-[var(--demo-primary,#8A6214)]'
                  }`}
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>

          {/* Quiet Answer Panel */}
          {(isTyping || conciergeAnswer) && (
            <div className="p-4 rounded-[12px] bg-white border border-[var(--demo-hairline,#EAE3D5)] text-[14px] text-[var(--demo-ink,#1A1816)] shadow-xs animate-in fade-in">
              {isTyping ? (
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--demo-primary,#8A6214)] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--demo-primary,#8A6214)] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--demo-primary,#8A6214)] animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : (
                <p className="leading-relaxed">{conciergeAnswer}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="px-6 sm:px-8 py-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[var(--demo-text-muted,#6E645A)]">
        <span
          className="font-display font-medium text-[13px] tracking-[0.24em] text-[var(--demo-ink,#1A1816)] uppercase"
          style={{ fontFamily: 'var(--font-demo-display), serif' }}
        >
          {activeBrandName}
        </span>
        <span>Fictional brand created for a concept demo.</span>
      </footer>
    </div>
  );

  if (bare) {
    return content;
  }

  return <DemoFrame>{content}</DemoFrame>;
}
