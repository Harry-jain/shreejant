import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Globe, LayoutDashboard, RefreshCw, CheckCircle2 } from "lucide-react";

const SERVICES_DATA = [
  {
    icon: Globe,
    title: "Custom Website Development",
    subtitle: "High-performance brand & brochure websites",
    description:
      "Modern, custom-coded websites built with Next.js and TypeScript. Designed mobile-first for Indian smartphone users and optimized for rapid page loads and local search visibility.",
    deliverables: [
      "Custom responsive layouts (mobile, tablet, desktop)",
      "Next.js App Router with server-side rendering",
      "On-page technical SEO & structured metadata",
      "Lead generation forms with instant notifications",
      "Edge CDN deployment and SSL setup",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications & Portals",
    subtitle: "Custom business software & client dashboards",
    description:
      "Tailored web tools and internal portals designed to streamline your operations, replace messy spreadsheets, and provide a secure digital interface for your clients and team.",
    deliverables: [
      "Secure user authentication and role management",
      "Relational database design (PostgreSQL / Supabase)",
      "Custom analytics & operational dashboards",
      "Third-party API and payment gateway integration",
      "Structured data export and reporting workflows",
    ],
  },
  {
    icon: RefreshCw,
    title: "Website Redesign & Modernization",
    subtitle: "Upgrade slow, legacy websites without downtime",
    description:
      "Transform outdated or sluggish WordPress and builder sites into high-speed Next.js applications. Improve your Google Core Web Vitals while preserving existing search rankings and domain authority.",
    deliverables: [
      "Full performance and security audit of existing site",
      "Complete code rewrite into clean TypeScript",
      "Preservation of existing URL structures and 301 redirects",
      "Modern visual redesign aligned with current brand identity",
      "Zero-downtime migration to reliable edge infrastructure",
    ],
  },
];

export function ServicesOverview() {
  return (
    <Section className="py-16 sm:py-20 border-b border-border bg-bg">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface border border-border text-accent">
            <span>CORE CAPABILITIES</span>
          </div>
          <Heading level="h2">What We Do</Heading>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We focus exclusively on modern web engineering. Every project is built by our founding engineers in Mumbai using maintainable code standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                hoverEffect
                className="flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <Heading level="h3" className="text-lg">
                      {service.title}
                    </Heading>
                    <p className="text-xs font-medium text-accent mt-1">
                      {service.subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-medium">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs text-text"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default ServicesOverview;
