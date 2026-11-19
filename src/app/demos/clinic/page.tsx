import React from "react";
import type { Metadata } from "next";
import { Stethoscope } from "lucide-react";
import { clinicTheme } from "./theme";
import { clinicData } from "./data";
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
import { ClinicStethoscopeArt } from "./components/ClinicStethoscopeArt";
import { DoctorProfileCard } from "./components/DoctorProfileCard";
import { ClinicSpecialtiesGrid } from "./components/ClinicSpecialtiesGrid";

export const metadata: Metadata = {
  title: "Dr. Vora Clinic — Specialist Dermatology & Family Care, Nashik",
  description:
    "Specialist care booked in under a minute. Clinical dermatology and general medicine in Nashik. Instant WhatsApp slot allocation.",
};

export default async function ClinicDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("clinic")!;
  const { palette } = clinicTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-[#1E2A32] antialiased selection:bg-[#0F8A8A] selection:text-white"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={clinicData.header.brandName}
        logoIcon={<Stethoscope className="w-4 h-4 text-white" />}
        navLinks={clinicData.header.navLinks}
        ctaLabel={clinicData.header.ctaLabel}
        ctaHref={clinicData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={clinicData.hero.eyebrow}
        headline={clinicData.hero.headline}
        subhead={clinicData.hero.subhead}
        primaryCta={clinicData.hero.primaryCta}
        secondaryCta={clinicData.hero.secondaryCta}
        visual={<ClinicStethoscopeArt />}
        palette={palette}
      />

      {/* 3. Trust Strip */}
      <TrustStrip stats={clinicData.trustStrip} palette={palette} />

      {/* 4. Doctor Profile Spotlight */}
      <FadeUp>
        <DoctorProfileCard />
      </FadeUp>

      {/* 5. Core Offering: Specialities Grid */}
      <FadeUp>
        <ClinicSpecialtiesGrid />
      </FadeUp>

      {/* 6. Signature Feature: Smart WhatsApp Triage */}
      <div id="triage" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <WhatsAppChatMockup
          badge={clinicData.signatureFeature.badge}
          heading={clinicData.signatureFeature.heading}
          description={clinicData.signatureFeature.description}
          bullets={clinicData.signatureFeature.bullets}
          brandName={clinicData.header.brandName}
          messages={clinicData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 7. Patient Testimonials */}
      <FadeUp>
        <TestimonialCards
          badge="PATIENT EXPERIENCES"
          heading="Trusted by Over 18,500 Families in Nashik & Pune"
          subhead="Real feedback from verified patients receiving specialist clinical care."
          testimonials={clinicData.testimonials}
          palette={palette}
        />
      </FadeUp>

      {/* 8. Appointment Booking Form */}
      <div id="appointment" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <FadeUp>
          <BookingForm
            badge={clinicData.bookingForm.badge}
            heading={clinicData.bookingForm.heading}
            subhead={clinicData.bookingForm.subhead}
            fields={clinicData.bookingForm.fields}
            submitLabel={clinicData.bookingForm.submitLabel}
            palette={palette}
            phone="919876500000"
            defaultWhatsAppMessage="Hi Dr. Vora Clinic, I would like to confirm my consultation appointment."
          />
        </FadeUp>
      </div>

      {/* 9. Demo Footer */}
      <DemoFooter
        brandName={clinicData.header.brandName}
        domain={clinicTheme.domain}
        address={clinicData.footer.address}
        hours={clinicData.footer.hours}
        phone={clinicData.footer.phone}
        email={clinicData.footer.email}
        palette={palette}
      />

      {/* 10. Floating WhatsApp */}
      <FloatingWhatsApp
        brandName={clinicData.header.brandName}
        phone="919876500000"
        defaultMessage="Namaste Dr. Vora Clinic! I want to inquire about consultation slots with Dr. Anaya Vora."
      />
    </div>
    </DemoShell>
  );
}
