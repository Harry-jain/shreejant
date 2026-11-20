import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Stethoscope, UtensilsCrossed } from "lucide-react";

const DEMOS = [
  {
    tag: "Salon & Spa",
    title: "Aura Studio",
    description: "Salon website concept featuring service menus, stylist profiles, and WhatsApp booking flow.",
    href: "/demos/salon",
    icon: Sparkles,
  },
  {
    tag: "Healthcare Clinic",
    title: "Dr. Vora Clinic",
    description: "Medical clinic showcase with doctor credentials, treatment details, and consultation request form.",
    href: "/demos/clinic",
    icon: Stethoscope,
  },
  {
    tag: "Dining & Hospitality",
    title: "The Bombay Bistro",
    description: "Restaurant concept with digital menu, dining atmosphere gallery, and table reservation request.",
    href: "/demos/restaurant",
    icon: UtensilsCrossed,
  },
];

export function DemosSection() {
  return (
    <Section className="border-t border-border bg-bg">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <Heading level="h2" className="mb-3">
            Sample Demo Sites
          </Heading>
          <p className="text-muted text-sm sm:text-base">
            Explore live interactive prototypes demonstrating clean layouts and mobile performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMOS.map((demo) => {
            const Icon = demo.icon;
            return (
              <Card key={demo.title} hoverEffect className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted">
                      {demo.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center text-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Heading level="h3" className="text-xl font-semibold">
                      {demo.title}
                    </Heading>
                    <p className="text-muted text-sm leading-relaxed">
                      {demo.description}
                    </p>
                  </div>

                  <div className="inline-block px-2.5 py-1 rounded-md bg-bg border border-border text-xs text-muted">
                    Sample site — not a real business
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    href={demo.href}
                    variant="outline"
                    size="default"
                    className="w-full justify-between"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Demo
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/demos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <span>View all sample demos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export default DemosSection;
