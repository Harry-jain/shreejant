import React from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <Section className="pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-16 text-center">
      <Container>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-medium text-muted">
            <span>Mumbai Web Development &amp; Design</span>
          </div>

          <Heading level="h1" className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text">
            Clean, Fast Websites for Mumbai Businesses
          </Heading>

          <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            We build modern, mobile-friendly websites and web applications with clean code, fast loading speeds, and zero bloat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              href="/demos"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Sample Sites
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              leftIcon={<MessageSquare className="w-4 h-4 text-accent" />}
            >
              Talk to Us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HeroSection;
