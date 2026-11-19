import React from "react";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { classesTheme } from "./theme";
import { classesData } from "./data";
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
import { ClassesStackedArt } from "./components/ClassesStackedArt";
import { ClassesTimetableGrid } from "./components/ClassesTimetableGrid";
import { InstructorCards } from "./components/InstructorCards";

export const metadata: Metadata = {
  title: "Zenith Academy — Dance, Fine Art, Music & Fitness, Nashik",
  description:
    "Learn something new every week in Nashik. Dance, painting, acoustic guitar, Zumba, and yoga with certified mentors. Free 1-day trial class.",
};

export default async function ClassesDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("classes")!;
  const { palette } = classesTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-white antialiased selection:bg-[#FFC93C] selection:text-[#2A1B5C]"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={classesData.header.brandName}
        logoIcon={<Sparkles className="w-4 h-4 text-[#2A1B5C]" />}
        navLinks={classesData.header.navLinks}
        ctaLabel={classesData.header.ctaLabel}
        ctaHref={classesData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={classesData.hero.eyebrow}
        headline={classesData.hero.headline}
        subhead={classesData.hero.subhead}
        primaryCta={classesData.hero.primaryCta}
        secondaryCta={classesData.hero.secondaryCta}
        visual={<ClassesStackedArt />}
        palette={palette}
      />

      {/* 3. Trust Strip */}
      <TrustStrip stats={classesData.trustStrip} palette={palette} />

      {/* 4. Core Offering: Weekly Timetable & Course Fees */}
      <FadeUp>
        <ClassesTimetableGrid />
      </FadeUp>

      {/* 5. Master Faculty Cards */}
      <FadeUp>
        <InstructorCards />
      </FadeUp>

      {/* 6. Signature Feature: WhatsApp Parent & Student Concierge */}
      <div id="trial-bot" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <WhatsAppChatMockup
          badge={classesData.signatureFeature.badge}
          heading={classesData.signatureFeature.heading}
          description={classesData.signatureFeature.description}
          bullets={classesData.signatureFeature.bullets}
          brandName={classesData.header.brandName}
          messages={classesData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 7. Student & Parent Testimonials */}
      <FadeUp>
        <TestimonialCards
          badge="STUDENT VOICES"
          heading="Loved by Students & Parents in Nashik"
          subhead="Real journeys from first trial class to annual stage showcase."
          testimonials={classesData.testimonials}
          palette={palette}
        />
      </FadeUp>

      {/* 8. Free Trial Pass Booking Form */}
      <div id="trial-booking" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <FadeUp>
          <BookingForm
            badge={classesData.trialForm.badge}
            heading={classesData.trialForm.heading}
            subhead={classesData.trialForm.subhead}
            fields={classesData.trialForm.fields}
            submitLabel={classesData.trialForm.submitLabel}
            palette={palette}
            phone="919876500000"
            defaultWhatsAppMessage="Hi Zenith Academy! I would like to book a complimentary 1-day trial class."
          />
        </FadeUp>
      </div>

      {/* 9. Demo Footer */}
      <DemoFooter
        brandName={classesData.header.brandName}
        domain={classesTheme.domain}
        address={classesData.footer.address}
        hours={classesData.footer.hours}
        phone={classesData.footer.phone}
        email={classesData.footer.email}
        palette={palette}
      />

      {/* 10. Floating WhatsApp */}
      <FloatingWhatsApp
        brandName={classesData.header.brandName}
        phone="919876500000"
        defaultMessage="Namaste Zenith Academy! I want to inquire about upcoming batch admissions and trial slots."
      />
    </div>
    </DemoShell>
  );
}
