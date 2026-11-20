import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = constructMetadata({
  title: "Contact Us | SHREEJAN AI SOLUTIONS",
  description:
    "Connect with SHREEJAN AI SOLUTIONS for web development and software for businesses in Mumbai and across India. Send us an inquiry or chat directly on WhatsApp.",
  canonicalUrl: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <Section className="pt-24 pb-16 sm:pt-28 sm:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Context & WhatsApp */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Heading level="h1" className="mb-3">
                  Let&apos;s Discuss Your Project
                </Heading>
                <p className="text-muted text-base leading-relaxed">
                  Tell us about your business, what you are looking to build, and any specific requirements. We will review your inquiry and reply as soon as we can.
                </p>
              </div>

              {/* Direct WhatsApp Card */}
              <Card className="space-y-3 bg-surface border-border">
                <Heading level="h3" className="text-lg font-semibold text-text">
                  Prefer WhatsApp?
                </Heading>
                <p className="text-sm text-muted">
                  Chat directly with our founders at +91 89765 17353
                </p>
                <Button
                  href="https://wa.me/918976517353"
                  variant="primary"
                  size="default"
                  className="w-full sm:w-auto"
                >
                  Chat on WhatsApp
                </Button>
              </Card>

              {/* Direct Contact Details Card */}
              <Card className="space-y-4 bg-surface border-border">
                <Heading level="h3" className="text-base font-semibold text-text">
                  Direct Contact
                </Heading>
                <div className="space-y-3 text-sm text-muted">
                  <div>
                    <div className="font-medium text-text">Email</div>
                    <a
                      href="mailto:aishreejan@gmail.com"
                      className="text-accent hover:underline"
                    >
                      aishreejan@gmail.com
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-text">Phone / WhatsApp</div>
                    <a
                      href="https://wa.me/918976517353"
                      className="text-text hover:text-accent transition-colors"
                    >
                      +91 89765 17353
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-text">Location</div>
                    <span className="text-text">Mumbai, Maharashtra, India</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
