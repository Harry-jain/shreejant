import React from "react";
import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { shopTheme } from "./theme";
import { shopData } from "./data";
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
import { ShopProductCollageArt } from "./components/ShopProductCollageArt";
import { ShopProductCatalog } from "./components/ShopProductCatalog";

export const metadata: Metadata = {
  title: "Anayra Essentials — Everyday Home & Kitchen, 48-Hour Delivery",
  description:
    "Quality home, kitchen, and wellness products delivered in 48 hours across India. Cash on delivery, instant UPI discounts, and WhatsApp tracking.",
};

export default async function ShopDemoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === "1";
  const config = getDemoConfig("shop")!;
  const { palette } = shopTheme;

  return (
    <DemoShell config={config} initialEmbed={isEmbed}>
      <div
        className="min-h-screen text-[#14161C] antialiased selection:bg-[#3B3FD8] selection:text-white"
        style={{ backgroundColor: palette.bg }}
      >
      {/* 1. Sticky Header */}
      <DemoHeader
        brandName={shopData.header.brandName}
        logoIcon={<ShoppingBag className="w-4 h-4 text-white" />}
        navLinks={shopData.header.navLinks}
        ctaLabel={shopData.header.ctaLabel}
        ctaHref={shopData.header.ctaHref}
        palette={palette}
      />

      {/* 2. Hero */}
      <DemoHero
        eyebrow={shopData.hero.eyebrow}
        headline={shopData.hero.headline}
        subhead={shopData.hero.subhead}
        primaryCta={shopData.hero.primaryCta}
        secondaryCta={shopData.hero.secondaryCta}
        visual={<ShopProductCollageArt />}
        palette={palette}
      />

      {/* 3. Trust Strip */}
      <TrustStrip stats={shopData.trustStrip} palette={palette} />

      {/* 4. Core Offering: Product Catalog with Live Filter & Cart */}
      <FadeUp>
        <ShopProductCatalog />
      </FadeUp>

      {/* 5. Signature Feature: WhatsApp Order & Pincode Assistant */}
      <div id="order-ai" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <WhatsAppChatMockup
          badge={shopData.signatureFeature.badge}
          heading={shopData.signatureFeature.heading}
          description={shopData.signatureFeature.description}
          bullets={shopData.signatureFeature.bullets}
          brandName={shopData.header.brandName}
          messages={shopData.signatureFeature.messages}
          accentColor={palette.accent}
          textColor={palette.ink}
        />
      </div>

      {/* 6. Customer Testimonials */}
      <FadeUp>
        <TestimonialCards
          badge="BUYER REVIEWS"
          heading="Loved by Over 24,000 Households Nationwide"
          subhead="Verified customer experiences from homes across Maharashtra and India."
          testimonials={shopData.testimonials}
          palette={palette}
        />
      </FadeUp>

      {/* 7. Express Checkout / Order Form */}
      <div id="checkout" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <FadeUp>
          <BookingForm
            badge={shopData.checkoutForm.badge}
            heading={shopData.checkoutForm.heading}
            subhead={shopData.checkoutForm.subhead}
            fields={shopData.checkoutForm.fields}
            submitLabel={shopData.checkoutForm.submitLabel}
            palette={palette}
            phone="919876500000"
            defaultWhatsAppMessage="Hi Anayra Essentials! I would like to place an order via WhatsApp."
          />
        </FadeUp>
      </div>

      {/* 8. Demo Footer */}
      <DemoFooter
        brandName={shopData.header.brandName}
        domain={shopTheme.domain}
        address={shopData.footer.address}
        hours={shopData.footer.hours}
        phone={shopData.footer.phone}
        email={shopData.footer.email}
        palette={palette}
      />

      {/* 9. Floating WhatsApp */}
      <FloatingWhatsApp
        brandName={shopData.header.brandName}
        phone="919876500000"
        defaultMessage="Namaste Anayra Essentials! I'd like to check delivery timelines for my pincode."
      />
    </div>
    </DemoShell>
  );
}
