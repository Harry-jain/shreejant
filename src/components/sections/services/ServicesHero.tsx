import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CheckCircle2, ShieldCheck, Clock, Code2 } from "lucide-react";

export function ServicesHero() {
  return (
    <Section className="pt-24 pb-12 sm:pt-28 sm:pb-16 border-b border-border bg-bg">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface border border-border text-accent">
            <span>ENGINEERING SERVICES &amp; TRANSPARENT PRICING</span>
          </div>
          <Heading level="h1">
            Web Engineering Services Built for Growing Indian Businesses
          </Heading>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Fixed-scope development packages with clear timelines, transparent milestone billing, and complete source code ownership. Built with modern Next.js and TypeScript.
          </p>

          {/* Value highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-left">
            <div className="p-3 rounded-lg border border-border bg-surface flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-text">Milestone Billing</div>
                <div className="text-[11px] text-muted">50/50 advance split</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-surface flex items-start gap-2.5">
              <Code2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-text">Full Code Handoff</div>
                <div className="text-[11px] text-muted">Zero vendor lock-in</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-surface flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-text">Realistic Delivery</div>
                <div className="text-[11px] text-muted">1 to 3 weeks scope</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-surface flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-text">Direct Engineering</div>
                <div className="text-[11px] text-muted">Talk with developers</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default ServicesHero;
