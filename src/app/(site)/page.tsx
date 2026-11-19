import React from "react";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { SpotlightBanner } from "@/components/sections/home/SpotlightBanner";
import { DemoStackShowcase } from "@/components/sections/home/DemoStackShowcase";
import { ServicesBentoSection } from "@/components/sections/home/ServicesBentoSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { PortfolioPreview } from "@/components/sections/home/PortfolioPreview";
import { WhyUsSection } from "@/components/sections/home/WhyUsSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { TechStackSection } from "@/components/sections/home/TechStackSection";
import { BlogPreview } from "@/components/sections/home/BlogPreview";
import { CTASection } from "@/components/sections/home/CTASection";
import { DemoNudge } from "@/components/sections/home/DemoNudge";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllBlogPosts } from "@/lib/mdx";

export default async function HomePage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section with Luxury Architectural Marquee Showcase */}
      <HeroSection />

      {/* 2. Trust Bar */}
      <ScrollReveal delay={0.05} viewportMargin="-40px">
        <TrustBar />
      </ScrollReveal>

      {/* 3. Luxury Architectural Spotlight Banner ("Your store, live in 10 days") */}
      <ScrollReveal delay={0.1}>
        <SpotlightBanner />
      </ScrollReveal>

      {/* 4. Interactive Architecture Prototypes (Scroll-Driven Vertical Stack Showcase) */}
      <DemoStackShowcase />
      <GoldDivider withDiamond />

      {/* Below-the-fold sections */}
      <div className="content-visibility-auto">
        {/* 5. Core Services Section (Equal-Height Bento Grid) */}
        <ScrollReveal delay={0.1}>
          <ServicesBentoSection />
        </ScrollReveal>
        <GoldDivider withDiamond />

        {/* 6. Process Section */}
        <ScrollReveal delay={0.1}>
          <ProcessSection />
        </ScrollReveal>
        <GoldDivider />

        {/* 7. Portfolio Preview */}
        <ScrollReveal delay={0.1}>
          <PortfolioPreview />
        </ScrollReveal>
        <GoldDivider withDiamond />

        {/* 8. Why Us Section */}
        <ScrollReveal delay={0.1}>
          <WhyUsSection />
        </ScrollReveal>
        <GoldDivider />

        {/* 9. Testimonials Section */}
        <ScrollReveal delay={0.1}>
          <TestimonialsSection />
        </ScrollReveal>

        {/* 10. Tech Stack Marquee */}
        <ScrollReveal delay={0.05}>
          <TechStackSection />
        </ScrollReveal>

        {/* 11. Blog Preview */}
        <ScrollReveal delay={0.1}>
          <BlogPreview posts={posts} />
        </ScrollReveal>

        {/* 12. Final Call To Action */}
        <ScrollReveal delay={0.1}>
          <CTASection />
        </ScrollReveal>

        {/* 13. Demo Nudge directly above footer */}
        <DemoNudge />
      </div>
    </div>
  );
}
