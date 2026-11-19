import React from "react";
import type { Metadata } from "next";
import { Gem } from "lucide-react";
import { jewelleryTheme } from "./theme";
import { jewelleryData } from "./data";
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
import { JewelleryNecklaceArt } from "./components/JewelleryNecklaceArt";
import { JewelleryCollectionGrid } from "./components/JewelleryCollectionGrid";

export const metadata: Metadata = {
  title: "Kanak Heritage Jewels — BIS 916 Hallmarked Gold & Polki, Pune",
  description:
    "Handcrafted jewellery certified in gold. BIS 916 hallmarked bridal polki and kundan creations designed in Pune. Transparent rate cards and WhatsApp viewings.",
};

export default async function JewelleryDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("jewellery")!;
  const { palette } = jewelleryTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-[#F3EFE6] antialiased selection:bg-[#C9A24B] selection:text-[#0B0B0C]"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={jewelleryData.header.brandName}
        logoIcon={<Gem className="w-4 h-4 text-[#0B0B0C]" />}
        navLinks={jewelleryData.header.navLinks}
        ctaLabel={jewelleryData.header.ctaLabel}
        ctaHref={jewelleryData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={jewelleryData.hero.eyebrow}
        headline={jewelleryData.hero.headline}
        subhead={jewelleryData.hero.subhead}
        primaryCta={jewelleryData.hero.primaryCta}
        secondaryCta={jewelleryData.hero.secondaryCta}
        visual={<JewelleryNecklaceArt />}
        palette={palette}
      />

      {/* 3. Trust Strip */}
      <TrustStrip stats={jewelleryData.trustStrip} palette={palette} />

      {/* 4. Core Offering: Collection Grid */}
      <FadeUp>
        <JewelleryCollectionGrid />
      </FadeUp>

      {/* 5. Signature Feature: Bespoke WhatsApp Concierge */}
      <div id="jewel-chat" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <WhatsAppChatMockup
          badge={jewelleryData.signatureFeature.badge}
          heading={jewelleryData.signatureFeature.heading}
          description={jewelleryData.signatureFeature.description}
          bullets={jewelleryData.signatureFeature.bullets}
          brandName={jewelleryData.header.brandName}
          messages={jewelleryData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 6. Guest Testimonials */}
      <FadeUp>
        <TestimonialCards
          badge="CLIENT APPRECIATION"
          heading="Trusted by Generations of Discerning Patrons"
          subhead="Real testimonials from bridal families who value purity, certification, and transparency."
          testimonials={jewelleryData.testimonials}
          palette={palette}
        />
      </FadeUp>

      {/* 7. Private Viewing Enquiry Form */}
      <div id="enquiry" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <FadeUp>
          <BookingForm
            badge={jewelleryData.enquiryForm.badge}
            heading={jewelleryData.enquiryForm.heading}
            subhead={jewelleryData.enquiryForm.subhead}
            fields={jewelleryData.enquiryForm.fields}
            submitLabel={jewelleryData.enquiryForm.submitLabel}
            palette={palette}
            phone="919876500000"
            defaultWhatsAppMessage="Hi Kanak Heritage Jewels! I would like to book a private viewing appointment at your Pune atelier."
          />
        </FadeUp>
      </div>

      {/* 8. Demo Footer */}
      <DemoFooter
        brandName={jewelleryData.header.brandName}
        domain={jewelleryTheme.domain}
        address={jewelleryData.footer.address}
        hours={jewelleryData.footer.hours}
        phone={jewelleryData.footer.phone}
        email={jewelleryData.footer.email}
        palette={palette}
      />

      {/* 9. Floating WhatsApp */}
      <FloatingWhatsApp
        brandName={jewelleryData.header.brandName}
        phone="919876500000"
        defaultMessage="Namaste Kanak Jewels! I'd like to check today's 22K gold rate and ask about the Heritage Kundan collection."
      />
    </div>
    </DemoShell>
  );
}
