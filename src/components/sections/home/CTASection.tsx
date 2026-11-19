"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, Sparkles, Building2, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n";

export function CTASection() {
  const { t, lang } = useLanguage();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";

  const messagesByLang: Record<string, string> = {
    en: "Hi SHREEJAN AI SOLUTIONS, I'd like to book a call and discuss a project for my business.",
    hi: "नमस्ते SHREEJAN AI SOLUTIONS, मैं अपने व्यवसाय के लिए प्रोजेक्ट पर चर्चा करना चाहता हूँ।",
    mr: "नमस्कार SHREEJAN AI SOLUTIONS, मला माझ्या व्यवसायासाठी प्रोजेक्टवर चर्चा करायची आहे.",
  };

  const whatsappText = encodeURIComponent(messagesByLang[lang] || messagesByLang.en);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden bg-transparent">
      <div className="site-container-wide">
        <div className="relative rounded-[32px] bg-gradient-to-br from-[#121626] via-[#0E121E] to-[#0A0D15] text-[#F4F7FB] p-7 sm:p-12 lg:p-16 border border-white/12 overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
          {/* Subtle ambient lighting */}
          <div 
            className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(124,92,252,0.22)_0%,rgba(56,189,248,0.06)_45%,transparent_70%)] blur-[120px] pointer-events-none rounded-full" 
            aria-hidden="true" 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Vision Heading, Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let&apos;s Build Together</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.035em] leading-[1.08]">
                Got an Ambitious Vision?{" "}
                <span className="inline-block bg-gradient-to-r from-[#7C5CFC] via-[#A78BFA] to-[#38BDF8] bg-clip-text text-transparent pb-1 pr-3 sm:pr-4 pl-1">
                  Let&apos;s Build It.
                </span>
              </h2>

              <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
                Turn your business into an automated revenue empire. From custom flagships built with the latest version of Next.js to autonomous WhatsApp sales agents, we ship in 7 to 10 days.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="cta-liquid inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#090C15] font-heading font-semibold text-base shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:bg-white/95 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{t("cta.start") || "Get a Free Consultation"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/15 bg-white/5 text-white font-heading font-semibold text-base hover:bg-[#22C55E]/15 hover:border-[#22C55E]/40 hover:text-emerald-400 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): High-Resolution Architectural Headquarters Showcase */}
            <div className="lg:col-span-5 w-full">
              <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#7C5CFC]/40 hover:shadow-[0_0_35px_rgba(124,92,252,0.25)]">
                {/* Photo Viewport */}
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-[#0A0D15]">
                  <Image
                    src="/brand/headquarters.jpg"
                    alt="SHREEJAN AI Mumbai Headquarters — Modern Architectural Pavilion"
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  {/* Atmospheric Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C15]/90 via-[#090C15]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#090C15]/40 via-transparent to-[#090C15]/30" />

                  {/* Header Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white/95 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold tracking-wider">MUMBAI HEADQUARTERS</span>
                  </div>

                  {/* Visualization Purpose Disclaimer Pill */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/85 text-[11px] font-medium tracking-wide">
                      *For visualization purpose only
                    </span>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between bg-black/50 backdrop-blur-md">
                  <div className="space-y-0.5">
                    <p className="font-heading font-bold text-sm text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#7C5CFC]" />
                      Engineering Intelligence
                    </p>
                    <p className="text-xs text-white/60">Architecting India&apos;s next generation digital systems</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CTASection;
