import React from "react";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { salonTheme } from "./theme";
import { salonData } from "./data";
import { DemoHeader } from "@/components/demo-shared/DemoHeader";
import { DemoHero } from "@/components/demo-shared/DemoHero";
import { WhatsAppChatMockup } from "@/components/demo-shared/WhatsAppChatMockup";
import { BookingForm } from "@/components/demo-shared/BookingForm";
import { DemoFooter } from "@/components/demo-shared/DemoFooter";
import { FloatingWhatsApp } from "@/components/demo-shared/FloatingWhatsApp";
import { FadeUp } from "@/components/demo-shared/FadeUp";
import { DemoShell } from "@/demos/DemoShell";
import { getDemoConfig } from "@/demos/demos.config";
import { SalonArchArt } from "./components/SalonArchArt";
import { SalonTreatmentsGrid } from "./components/SalonTreatmentsGrid";

export const metadata: Metadata = {
  title: "Aura Studio — Sample Salon & Spa Website | SHREEJAN AI",
  description:
    "Sample business demo for a hair, skin & bridal sanctuary in Pune. Built by SHREEJAN AI SOLUTIONS.",
};

export default async function SalonDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("salon")!;
  const { palette } = salonTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-[#2B1F1F] antialiased selection:bg-[#A4565F] selection:text-white"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={salonData.header.brandName}
        logoIcon={<Sparkles className="w-4 h-4 text-white" />}
        navLinks={salonData.header.navLinks}
        ctaLabel={salonData.header.ctaLabel}
        ctaHref={salonData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={salonData.hero.eyebrow}
        marathiTagline={salonData.hero.marathiTagline}
        headline={salonData.hero.headline}
        subhead={salonData.hero.subhead}
        primaryCta={salonData.hero.primaryCta}
        secondaryCta={salonData.hero.secondaryCta}
        visual={<SalonArchArt />}
        palette={palette}
      />

      {/* 3. Core Offering: Signature Treatments */}
      <FadeUp>
        <SalonTreatmentsGrid />
      </FadeUp>

      {/* 4. Signature Feature: Bridal Trial Concierge */}
      <div id="bridal-ai" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <WhatsAppChatMockup
          badge={salonData.signatureFeature.badge}
          heading={salonData.signatureFeature.heading}
          description={salonData.signatureFeature.description}
          bullets={salonData.signatureFeature.bullets}
          brandName={salonData.header.brandName}
          messages={salonData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 5. Booking Form */}
      <div id="booking" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <FadeUp>
          <BookingForm
            badge={salonData.bookingForm.badge}
            heading={salonData.bookingForm.heading}
            subhead={salonData.bookingForm.subhead}
            fields={salonData.bookingForm.fields}
            submitLabel={salonData.bookingForm.submitLabel}
            palette={palette}
            phone="919876500000"
            defaultWhatsAppMessage="Hi Aura Studio, I would like to reserve a private treatment suite session."
          />
        </FadeUp>
      </div>

      {/* 6. Demo Footer */}
      <DemoFooter
        brandName={salonData.header.brandName}
        domain={salonTheme.domain}
        address={salonData.footer.address}
        hours={salonData.footer.hours}
        phone={salonData.footer.phone}
        email={salonData.footer.email}
        palette={palette}
      />

      {/* 7. Floating WhatsApp */}
      <FloatingWhatsApp
        brandName={salonData.header.brandName}
        phone="919876500000"
        defaultMessage="Namaste Aura Studio! I would like to ask about bridal styling trials and appointment availability."
      />
    </div>
    </DemoShell>
  );
}
