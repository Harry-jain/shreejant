import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquare } from "lucide-react";

export function ServicesCTA() {
  return (
    <Section className="py-16 sm:py-24 bg-surface">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bg border border-border text-accent">
            <span>GET IN TOUCH</span>
          </div>

          <Heading level="h2" className="text-2xl sm:text-3xl lg:text-4xl">
            Ready to Build Your Website or Web Application?
          </Heading>

          <p className="text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Speak directly with our engineering team in Mumbai. We provide realistic scoping, clear milestone timelines, and transparent proposals with zero sales pressure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Start Your Project
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href="https://wa.me/918976517353"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </div>

          <p className="text-[11px] text-muted pt-2">
            Office hours: Monday to Saturday, 10:00 AM – 7:00 PM IST · Mumbai, Maharashtra
          </p>
        </div>
      </Container>
    </Section>
  );
}

export default ServicesCTA;
