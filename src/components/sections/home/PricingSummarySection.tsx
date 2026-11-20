import React from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";

const PACKAGES = [
  {
    name: "Starter",
    price: "₹14,999",
    description: "Essential brochure website for small local businesses.",
    features: [
      "Up to 5 clean pages",
      "Mobile-responsive design",
      "Contact form & WhatsApp link",
      "Full code ownership",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹27,999",
    description: "Expanded website with showcase catalog and inquiry forms.",
    features: [
      "Up to 10 pages or sections",
      "Service & portfolio catalogs",
      "Interactive booking / inquiry flow",
      "Full code ownership",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "₹47,999",
    description: "Custom web application or multi-service business platform.",
    features: [
      "Custom application workflows",
      "Advanced filtering & listings",
      "Multi-step lead flows",
      "Full code ownership",
    ],
    highlighted: false,
  },
];

export function PricingSummarySection() {
  return (
    <Section className="border-t border-border bg-bg">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <Heading level="h2" className="mb-3">
            Transparent Pricing
          </Heading>
          <p className="text-muted text-sm sm:text-base">
            Fixed quotes with clear deliverables and full code ownership upon completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <Card
              key={pkg.name}
              hoverEffect
              className={`flex flex-col justify-between space-y-6 ${
                pkg.highlighted ? "border-accent ring-1 ring-accent" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Heading level="h3" className="text-xl font-semibold">
                    {pkg.name}
                  </Heading>
                  {pkg.highlighted && (
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                      Popular
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-bold text-text">{pkg.price}</div>
                  <p className="text-xs text-muted">{pkg.description}</p>
                </div>

                <ul className="space-y-2 pt-2 text-sm text-text">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  href="/services"
                  variant={pkg.highlighted ? "primary" : "secondary"}
                  size="default"
                  className="w-full"
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            href="/services"
            variant="outline"
            size="default"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            View all plans &amp; inclusions
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default PricingSummarySection;
