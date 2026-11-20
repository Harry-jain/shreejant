import React from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Globe, LayoutGrid, Zap } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Custom Business Websites",
    description: "Clean showcase sites for clinics, salons, restaurants, and local services.",
  },
  {
    icon: LayoutGrid,
    title: "Web Applications",
    description: "Booking flows, catalog listings, and inquiry management.",
  },
  {
    icon: Zap,
    title: "Performance & SEO",
    description: "Mobile-first speed, clean semantic code, and local search visibility.",
  },
];

export function WhatWeBuildSection() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <Heading level="h2" className="mb-3">
            What We Build
          </Heading>
          <p className="text-muted text-sm sm:text-base">
            Focused web solutions built with modern technology for practical business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} hoverEffect className="flex flex-col space-y-4">
                <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <Heading level="h3" className="text-lg sm:text-xl font-semibold">
                    {service.title}
                  </Heading>
                  <p className="text-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default WhatWeBuildSection;
