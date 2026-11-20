import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface PlanDisplay {
  id: string;
  name: string;
  launchPriceInr: number;
  regularPriceInr: number;
  priceSuffix?: string;
  recommended?: boolean;
  idealFor: string;
  deliveryDays: string;
  revisions: number;
  supportDays: number;
  languages: string;
  paymentSplit: string;
  features: string[];
}

const PRICING_PLANS: PlanDisplay[] = [
  {
    id: "starter",
    name: "Starter",
    launchPriceInr: 14999,
    regularPriceInr: 17999,
    idealFor: "Solopreneurs, consultants, and small local businesses",
    deliveryDays: "7 to 10 business days",
    revisions: 3,
    supportDays: 30,
    languages: "English",
    paymentSplit: "50% advance / 50% on completion",
    features: [
      "Single-page or 3-page brochure structure",
      "Mobile-responsive Next.js architecture",
      "Lead capture & contact form setup",
      "Basic on-page SEO & metadata tags",
      "Full source code ownership handoff",
      "Edge deployment with SSL certificate",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    launchPriceInr: 27999,
    regularPriceInr: 33999,
    recommended: true,
    idealFor: "Growing service businesses, clinics, and professional firms",
    deliveryDays: "14 to 18 business days",
    revisions: 3,
    supportDays: 45,
    languages: "English + 1 Regional (Hindi or Marathi)",
    paymentSplit: "50% advance / 50% on completion",
    features: [
      "Multi-page website up to 5 core pages",
      "Custom layout & branded UI components",
      "Appointment scheduling / lead qualification form",
      "Core Web Vitals speed optimization",
      "Google Business profile optimization guidance",
      "Full source code ownership handoff",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    launchPriceInr: 47999,
    regularPriceInr: 57999,
    idealFor: "Established companies, product catalogs, and institutions",
    deliveryDays: "21 to 28 business days",
    revisions: 4,
    supportDays: 60,
    languages: "English + Hindi + Marathi",
    paymentSplit: "40% kickoff / 30% milestone / 30% launch",
    features: [
      "Up to 10 pages or dynamic product catalog",
      "Interactive filtering & search components",
      "Advanced structured schema & local SEO",
      "Priority staging deployment and reviews",
      "4 structured revision cycles",
      "Full source code ownership handoff",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    launchPriceInr: 69999,
    regularPriceInr: 84999,
    priceSuffix: "+",
    idealFor: "Web applications, internal portals, and custom workflows",
    deliveryDays: "Quoted by scope (typically 4-6 weeks)",
    revisions: 5,
    supportDays: 90,
    languages: "Multilingual configurations",
    paymentSplit: "Milestone-based (40 / 30 / 30)",
    features: [
      "Tailored web application architecture",
      "User authentication & role-based permissions",
      "PostgreSQL or Supabase database integration",
      "Custom internal dashboard or client portal",
      "Third-party API & webhook integrations",
      "Full source code ownership handoff",
    ],
  },
];

export function PricingSection() {
  return (
    <Section className="py-16 sm:py-20 border-b border-border bg-bg">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface border border-border text-accent">
            <span>FIXED-SCOPE PACKAGES</span>
          </div>
          <Heading level="h2">Transparent Plans &amp; Pricing</Heading>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Predictable investment with zero hidden charges. Every package comes with milestone payments, dedicated support, and complete repository ownership.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col justify-between relative ${
                plan.recommended
                  ? "border-accent ring-1 ring-accent"
                  : "border-border"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-base font-bold text-text">
                    {plan.name}
                  </span>
                  {plan.recommended && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-accent text-surface uppercase tracking-wider">
                      Recommended
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted min-h-[32px] leading-relaxed mb-4">
                  {plan.idealFor}
                </p>

                {/* Pricing display */}
                <div className="pb-4 border-b border-border mb-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
                      ₹{plan.launchPriceInr.toLocaleString("en-IN")}
                      {plan.priceSuffix || ""}
                    </span>
                    <span className="text-xs text-muted line-through">
                      ₹{plan.regularPriceInr.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted block mt-1">
                    Delivery: {plan.deliveryDays}
                  </span>
                </div>

                {/* Key parameters */}
                <div className="space-y-2 mb-5 pb-5 border-b border-border text-xs text-muted">
                  <div className="flex justify-between">
                    <span>Revisions:</span>
                    <span className="font-medium text-text">
                      {plan.revisions} rounds
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support warranty:</span>
                    <span className="font-medium text-text">
                      {plan.supportDays} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Languages:</span>
                    <span className="font-medium text-text">
                      {plan.languages}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment split:</span>
                    <span className="font-medium text-text">
                      {plan.paymentSplit}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs text-text"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-border">
                <Button
                  variant={plan.recommended ? "primary" : "secondary"}
                  size="default"
                  href={`/contact?plan=${plan.id}`}
                  className="w-full text-xs"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Select {plan.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Note on custom scope */}
        <div className="text-center">
          <p className="text-xs text-muted">
            Need custom functionality, e-commerce catalog, or unique API integrations?{" "}
            <a
              href="/contact"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-hover"
            >
              Contact us for a detailed project estimate
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}

export default PricingSection;
