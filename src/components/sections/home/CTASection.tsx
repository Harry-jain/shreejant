import React from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { MessageSquare, ArrowRight } from "lucide-react";

export function CTASection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Shreejan AI, I would like to discuss a website project for my business."
  )}`;

  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <div className="rounded-2xl border border-border bg-bg p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <Heading level="h2" className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ready to Build Your Website?
          </Heading>

          <p className="text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Tell us about your business goals and requirements. We will review your brief and share an honest timeline and estimate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Contact Us
            </Button>
            <Button
              href={whatsappUrl}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              leftIcon={<MessageSquare className="w-4 h-4 text-accent" />}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default CTASection;
