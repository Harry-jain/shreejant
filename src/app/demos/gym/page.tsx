import React from "react";
import type { Metadata } from "next";
import { Dumbbell } from "lucide-react";
import { gymTheme } from "./theme";
import { gymData } from "./data";
import { DemoHeader } from "@/components/demo-shared/DemoHeader";
import { DemoHero } from "@/components/demo-shared/DemoHero";
import { TrustStrip } from "@/components/demo-shared/TrustStrip";
import { WhatsAppChatMockup } from "@/components/demo-shared/WhatsAppChatMockup";
import { TestimonialCards } from "@/components/demo-shared/TestimonialCards";
import { BookingForm } from "@/components/demo-shared/BookingForm";
import { DemoFooter } from "@/components/demo-shared/DemoFooter";
import { FloatingWhatsApp } from "@/components/demo-shared/FloatingWhatsApp";
import { FadeUp } from "@/components/demo-shared/FadeUp";
import { DemoShell } from "@/demos/DemoShell";
import { getDemoConfig } from "@/demos/demos.config";
import { GymBarbellArt } from "./components/GymBarbellArt";
import { GymPricingTable } from "./components/GymPricingTable";

export const metadata: Metadata = {
  title: "Ironforge Fitness — High-Performance Strength & Conditioning",
  description:
    "Train with structured progressive overload, calibrated Eleiko plates, and certified coaches in Nashik. Book your free 1-day trial.",
};

export default async function GymDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("gym")!;
  const { palette } = gymTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-[#F5F5F5] antialiased selection:bg-[#E11D2E] selection:text-white"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={gymData.header.brandName}
        logoIcon={<Dumbbell className="w-4 h-4 text-white" />}
        navLinks={gymData.header.navLinks}
        ctaLabel={gymData.header.ctaLabel}
        ctaHref={gymData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={gymData.hero.eyebrow}
        headline={gymData.hero.headline}
        subhead={gymData.hero.subhead}
        primaryCta={gymData.hero.primaryCta}
        secondaryCta={gymData.hero.secondaryCta}
        visual={<GymBarbellArt />}
        palette={palette}
      />

      {/* 3. Trust Strip */}
      <TrustStrip stats={gymData.trustStrip} palette={palette} />

      {/* 4. Core Offering: 6 Items */}
      <section id="facilities" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <FadeUp>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-3 bg-[#E11D2E]/20 text-[#E11D2E] border border-[#E11D2E]/30">
                {gymData.coreOffering.badge}
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-3">
                {gymData.coreOffering.title}
              </h2>
              <p className="font-body text-sm sm:text-base text-[#9AA0A6]">
                {gymData.coreOffering.subhead}
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {gymData.coreOffering.items.map((item, idx) => (
              <FadeUp key={item.name} delay={idx * 0.08} className="h-full">
                <div className="h-full p-6 sm:p-7 rounded-[24px] bg-[#181B1F] border border-white/10 hover:border-[#E11D2E]/50 transition-all duration-300 flex flex-col justify-between shadow-lg hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#E11D2E] font-bold">
                        0{idx + 1}
                      </span>
                      <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white font-bold">
                        {item.price}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-xl text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#9AA0A6] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#E11D2E]">
                    <span>Facility Included</span>
                    <a href="#booking" className="hover:underline">
                      Trial Slot →
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Signature Feature: WhatsApp Chat Mockup */}
      <div id="ai-chat">
        <WhatsAppChatMockup
          badge={gymData.signatureFeature.badge}
          heading={gymData.signatureFeature.heading}
          description={gymData.signatureFeature.description}
          bullets={gymData.signatureFeature.bullets}
          brandName={gymData.header.brandName}
          messages={gymData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 6. Niche-Specific Section: Gym Pricing Table */}
      <GymPricingTable tiers={gymData.pricingTiers} />

      {/* 7. Testimonials */}
      <div id="reviews">
        <TestimonialCards
          testimonials={gymData.testimonials}
          palette={palette}
        />
      </div>

      {/* 8. Booking Form */}
      <BookingForm
        badge={gymData.bookingForm.badge}
        heading={gymData.bookingForm.heading}
        subhead={gymData.bookingForm.subhead}
        submitLabel={gymData.bookingForm.submitLabel}
        fields={gymData.bookingForm.fields}
        palette={palette}
        defaultWhatsAppMessage="Hi Ironforge Fitness, I want to claim my free trial pass."
      />

      {/* 9. Footer */}
      <DemoFooter
        brandName={gymData.header.brandName}
        domain={gymTheme.domain}
        address={gymData.footer.address}
        hours={gymData.footer.hours}
        phone={gymData.footer.phone}
        email={gymData.footer.email}
        palette={palette}
      />

      {/* 10. Floating WhatsApp Button */}
      <FloatingWhatsApp
        brandName={gymData.header.brandName}
        defaultMessage="Hi Ironforge Fitness! I want to check membership offers."
      />
    </div>
    </DemoShell>
  );
}

