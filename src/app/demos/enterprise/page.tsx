import React from "react";
import type { Metadata } from "next";
import { Cpu } from "lucide-react";
import { enterpriseTheme } from "./theme";
import { enterpriseData } from "./data";
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
import { EnterpriseArchitectureArt } from "./components/EnterpriseArchitectureArt";
import { EnterpriseClientLogoStrip } from "./components/EnterpriseClientLogoStrip";
import { EnterpriseCapabilitiesGrid } from "./components/EnterpriseCapabilitiesGrid";
import { EnterpriseWorkflowDiagram } from "./components/EnterpriseWorkflowDiagram";

export const metadata: Metadata = {
  title: "Nexus Enterprise AI — Operations & WhatsApp Automation Platforms",
  description:
    "Operations software that runs while your team sleeps. Custom web platforms, WhatsApp Cloud API pipelines, and autonomous AI assistants for mid-market businesses.",
};

export default async function EnterpriseDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("enterprise")!;
  const { palette } = enterpriseTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-[#F3F6FA] antialiased selection:bg-[#2F6FD6] selection:text-white"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={enterpriseData.header.brandName}
        logoIcon={<Cpu className="w-4 h-4 text-white" />}
        navLinks={enterpriseData.header.navLinks}
        ctaLabel={enterpriseData.header.ctaLabel}
        ctaHref={enterpriseData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={enterpriseData.hero.eyebrow}
        headline={enterpriseData.hero.headline}
        subhead={enterpriseData.hero.subhead}
        primaryCta={enterpriseData.hero.primaryCta}
        secondaryCta={enterpriseData.hero.secondaryCta}
        visual={<EnterpriseArchitectureArt />}
        palette={palette}
      />

      {/* 3. Trust Strip */}
      <TrustStrip stats={enterpriseData.trustStrip} palette={palette} />

      {/* 4. Client Logo Strip */}
      <EnterpriseClientLogoStrip />

      {/* 5. Core Offering: System Capabilities */}
      <FadeUp>
        <EnterpriseCapabilitiesGrid />
      </FadeUp>

      {/* 6. Event-Driven Workflow Diagram */}
      <FadeUp>
        <EnterpriseWorkflowDiagram />
      </FadeUp>

      {/* 7. Signature Feature: Live Architecture & Dispatch Engine */}
      <div id="architecture" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <WhatsAppChatMockup
          badge={enterpriseData.signatureFeature.badge}
          heading={enterpriseData.signatureFeature.heading}
          description={enterpriseData.signatureFeature.description}
          bullets={enterpriseData.signatureFeature.bullets}
          brandName={enterpriseData.header.brandName}
          messages={enterpriseData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 8. Client Testimonials */}
      <FadeUp>
        <TestimonialCards
          badge="EXECUTIVE PERSPECTIVES"
          heading="Proven in High-Stakes Operations Across Maharashtra"
          subhead="What Operations Heads and Managing Directors say about our software delivery."
          testimonials={enterpriseData.testimonials}
          palette={palette}
        />
      </FadeUp>

      {/* 9. Discovery Consultation Form */}
      <div id="consultation" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <FadeUp>
          <BookingForm
            badge={enterpriseData.consultationForm.badge}
            heading={enterpriseData.consultationForm.heading}
            subhead={enterpriseData.consultationForm.subhead}
            fields={enterpriseData.consultationForm.fields}
            submitLabel={enterpriseData.consultationForm.submitLabel}
            palette={palette}
            phone="919876500000"
            defaultWhatsAppMessage="Hi Nexus Enterprise AI! We would like to schedule an architectural discovery session."
          />
        </FadeUp>
      </div>

      {/* 10. Demo Footer */}
      <DemoFooter
        brandName={enterpriseData.header.brandName}
        domain={enterpriseTheme.domain}
        address={enterpriseData.footer.address}
        hours={enterpriseData.footer.hours}
        phone={enterpriseData.footer.phone}
        email={enterpriseData.footer.email}
        palette={palette}
      />

      {/* 11. Floating WhatsApp */}
      <FloatingWhatsApp
        brandName={enterpriseData.header.brandName}
        phone="919876500000"
        defaultMessage="Namaste Nexus AI! We want to discuss automating our business workflows and WhatsApp API."
      />
    </div>
    </DemoShell>
  );
}
