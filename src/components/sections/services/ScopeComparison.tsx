import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, XCircle } from "lucide-react";

const INCLUDED_ITEMS = [
  {
    title: "Custom Responsive Design",
    description:
      "Every page is tailored to your business brand and built mobile-first for smartphones, tablets, and desktops.",
  },
  {
    title: "Clean Next.js & TypeScript Codebase",
    description:
      "Modern code architecture with typed components, modular styling, and no bloated plugins or site-builder weight.",
  },
  {
    title: "Mobile Performance & Core Web Vitals",
    description:
      "Fast page loading optimized for Indian mobile data networks with efficient asset caching and compression.",
  },
  {
    title: "Lead Capture & Contact Form Setup",
    description:
      "Tested lead generation and inquiry forms routed to your official business email or WhatsApp.",
  },
  {
    title: "Full Source Code Ownership",
    description:
      "Complete transfer of the Git repository upon project settlement. Zero recurring agency license fees or lock-in.",
  },
  {
    title: "Deployment & Custom Domain Setup",
    description:
      "Configuration on edge cloud infrastructure (e.g. Vercel, Netlify) with automated SSL security certificates.",
  },
];

const NOT_INCLUDED_ITEMS = [
  {
    title: "Paid Third-Party API Subscriptions",
    description:
      "SMS gateway credits, Meta WhatsApp Business API fees, or proprietary SaaS licenses billed by providers.",
  },
  {
    title: "Domain Registration & Hosting Renewals",
    description:
      "Domain name fees and ongoing cloud hosting invoices are paid directly to your registrar and cloud host.",
  },
  {
    title: "Ongoing Advertising & Ad Spend",
    description:
      "Google Ads, Meta Ads management, or paid marketing budgets are not included in software development contracts.",
  },
  {
    title: "Enterprise ERP & Mainframe Integrations",
    description:
      "Complex legacy SAP, Oracle ERP, or mainframe data pipelines require custom enterprise scoping.",
  },
  {
    title: "Commercial Photoshoots & Studio Video",
    description:
      "We build with your provided high-resolution assets or licensed stock graphics; on-site camera crews are separate.",
  },
  {
    title: "Out-of-Scope Scope Expansion",
    description:
      "New feature requests after milestone approval are quoted transparently per our standard add-on schedule.",
  },
];

export function ScopeComparison() {
  return (
    <Section className="py-16 sm:py-20 border-b border-border bg-bg">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface border border-border text-accent">
            <span>SCOPE TRANSPARENCY</span>
          </div>
          <Heading level="h2">What Is Included vs. Not Included</Heading>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We operate with complete clarity on project deliverables so there are no surprises during development or launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Included Card */}
          <Card className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <div>
                <Heading level="h3" className="text-lg">
                  Standard in Every Project
                </Heading>
                <p className="text-xs text-muted">
                  Included in our fixed-scope packages
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {INCLUDED_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-text block">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted leading-relaxed block">
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Not Included Card */}
          <Card className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <XCircle className="w-5 h-5 text-muted shrink-0" />
              <div>
                <Heading level="h3" className="text-lg">
                  Not Included / Billed Separately
                </Heading>
                <p className="text-xs text-muted">
                  Direct provider subscriptions and specialized add-ons
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {NOT_INCLUDED_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-text block">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted leading-relaxed block">
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export default ScopeComparison;
