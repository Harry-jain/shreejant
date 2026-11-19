import React from "react";
import type { Metadata } from "next";
import { Utensils } from "lucide-react";
import { restaurantTheme } from "./theme";
import { restaurantData } from "./data";
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
import { CopperPotArt } from "./components/CopperPotArt";
import { RestaurantMenuTabs } from "./components/RestaurantMenuTabs";

export const metadata: Metadata = {
  title: "The Bombay Bistro — Coastal & Bombay Street Classics, Nashik",
  description:
    "Authentic coastal and Mumbai street classics slow-cooked since 2016 in Nashik. Reserve tables or ask our WhatsApp AI maitre d'.",
};

export default async function RestaurantDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("restaurant")!;
  const { palette } = restaurantTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-[#2A1A1A] antialiased selection:bg-[#7A1F2B] selection:text-white"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={restaurantData.header.brandName}
        logoIcon={<Utensils className="w-4 h-4 text-white" />}
        navLinks={restaurantData.header.navLinks}
        ctaLabel={restaurantData.header.ctaLabel}
        ctaHref={restaurantData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={restaurantData.hero.eyebrow}
        headline={restaurantData.hero.headline}
        subhead={restaurantData.hero.subhead}
        primaryCta={restaurantData.hero.primaryCta}
        secondaryCta={restaurantData.hero.secondaryCta}
        visual={<CopperPotArt />}
        palette={palette}
      />

      {/* 3. Trust Strip */}
      <TrustStrip stats={restaurantData.trustStrip} palette={palette} />

      {/* 4. Core Offering → Menu */}
      <FadeUp>
        <RestaurantMenuTabs />
      </FadeUp>

      {/* 5. Signature Feature: WhatsApp Table Concierge */}
      <div id="ai-chat" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <WhatsAppChatMockup
          badge={restaurantData.signatureFeature.badge}
          heading={restaurantData.signatureFeature.heading}
          description={restaurantData.signatureFeature.description}
          bullets={restaurantData.signatureFeature.bullets}
          brandName={restaurantData.header.brandName}
          messages={restaurantData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 6. Guest Testimonials */}
      <div id="reviews">
        <FadeUp>
          <TestimonialCards
            badge="GUEST EXPERIENCES"
            heading="Loved by Food Enthusiasts Across Maharashtra"
            subhead="Authentic tastes and unhurried hospitality that keeps tables booked weeks in advance."
            testimonials={restaurantData.testimonials}
            palette={palette}
          />
        </FadeUp>
      </div>

      {/* 7. Reservation Booking Form */}
      <div id="reservation" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <FadeUp>
          <BookingForm
            badge={restaurantData.reservationForm.badge}
            heading={restaurantData.reservationForm.heading}
            subhead={restaurantData.reservationForm.subhead}
            fields={restaurantData.reservationForm.fields}
            submitLabel={restaurantData.reservationForm.submitLabel}
            palette={palette}
            phone="919876500000"
            defaultWhatsAppMessage="Hi! I want to confirm my table reservation at The Bombay Bistro Nashik."
          />
        </FadeUp>
      </div>

      {/* 8. Demo Footer */}
      <DemoFooter
        brandName={restaurantData.header.brandName}
        domain={restaurantTheme.domain}
        address={restaurantData.footer.address}
        hours={restaurantData.footer.hours}
        phone={restaurantData.footer.phone}
        email={restaurantData.footer.email}
        palette={palette}
      />

      {/* 9. Floating WhatsApp */}
      <FloatingWhatsApp
        brandName={restaurantData.header.brandName}
        phone="919876500000"
        defaultMessage="Namaste! I'd like to ask about today's menu specialties and table availability at The Bombay Bistro."
      />
    </div>
    </DemoShell>
  );
}
