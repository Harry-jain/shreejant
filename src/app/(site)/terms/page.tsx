import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  CreditCard,
  Code2,
  Users,
  Scale,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | SHREEJAN AI SOLUTIONS",
  description:
    "Straightforward, honest engagement terms for web engineering projects with SHREEJAN AI SOLUTIONS in Mumbai.",
};

export default function TermsPage() {
  const principles = [
    {
      title: "Scope Agreed in Writing",
      description:
        "Every project begins with a clear written specification, scope of work, and agreed deliverables before coding starts.",
      icon: FileText,
    },
    {
      title: "Milestone Payments",
      description:
        "Transparent billing structured in milestones (advance deposit to begin, balance upon staging approval).",
      icon: CreditCard,
    },
    {
      title: "Client Partnership",
      description:
        "Clients provide necessary content, brand assets, and feedback; we maintain direct engineering collaboration.",
      icon: Users,
    },
    {
      title: "Full Code Ownership",
      description:
        "Upon final milestone settlement, full source code and intellectual property transfer to you with zero vendor lock-in.",
      icon: Code2,
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <Section className="border-b border-border">
        <Container>
          <div className="mx-auto max-w-3xl text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <Scale className="h-3.5 w-3.5 text-accent" />
              <span>Engagement Terms</span>
            </div>
            <Heading level="h1" className="mb-4">
              Terms of Service
            </Heading>
            <p className="text-base text-muted sm:text-lg">
              Straightforward terms, transparent milestones, and zero hidden
              clauses. Here is our plain-English commitment to fair, honest
              collaboration.
            </p>
          </div>
        </Container>
      </Section>

      {/* Principles Summary */}
      <Section className="border-b border-border bg-surface">
        <Container>
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              Summary
            </div>
            <Heading level="h2">Key Engagement Terms</Heading>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} hoverEffect className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted sm:text-sm">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Detailed Terms */}
      <Section className="border-b border-border">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed text-muted sm:text-base">
            {/* Section 1 */}
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                1. Project Scope &amp; Deliverables
              </Heading>
              <p>
                All web development and design engagements with SHREEJAN AI
                SOLUTIONS are defined in a written project scope or proposal.
                This includes feature lists, technical stacks, expected
                deliverables, and delivery milestones.
              </p>
              <p>
                If during the course of work you wish to add features, pages, or
                integrations outside the original agreed scope, we will discuss
                the timeline and budget adjustments with you and provide a clear
                written quote before proceeding.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                2. Milestone Payments &amp; Billing
              </Heading>
              <p>
                To maintain focus and dedicated resources, our projects operate
                on structured milestone payments:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-text">Initial Deposit:</strong> Due
                  before kickoff and design/architecture work begins.
                </li>
                <li>
                  <strong className="text-text">Progress Milestones:</strong> For
                  multi-stage projects, tied to verified development stages.
                </li>
                <li>
                  <strong className="text-text">Final Balance:</strong> Due upon
                  review and approval on our staging environment, prior to live
                  production launch and code repository handover.
                </li>
              </ul>
              <p>
                Invoices must be settled within the timeframe stated in the
                project agreement (typically within 7 business days of milestone
                acceptance).
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                3. Client Responsibilities &amp; Materials
              </Heading>
              <p>
                Timely project delivery is a shared responsibility. The client
                agrees to provide:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Required brand assets (logos, images, copy, brand guidelines)
                  and necessary access (domains, third-party API accounts).
                </li>
                <li>
                  Consolidated feedback during scheduled review periods to
                  prevent delays.
                </li>
                <li>
                  Confirmation that provided content, images, and trademarks do
                  not infringe on third-party intellectual property rights.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                4. Full Source Code &amp; IP Ownership
              </Heading>
              <p>
                We believe you should always own what you pay for. Upon receipt
                of full and final payment:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  complete intellectual property rights to custom code, designs, and
                  project assets transfer to you.
                </li>
                <li>
                  We transfer full administrative rights to your Git repository
                  and deployment platforms.
                </li>
                <li>
                  We do not retain proprietary locks or charge recurring code
                  licensing fees for code we author for you.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                5. Launch Support &amp; Maintenance
              </Heading>
              <p>
                Every project includes an agreed post-launch stability period
                (typically 30 days) to resolve any functional bugs or regressions
                arising from the original scope at no extra charge.
              </p>
              <p>
                Subsequent updates, major feature additions, or long-term
                maintenance retainers are available under separate, optional
                agreements.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                6. Limitation of Liability
              </Heading>
              <p>
                SHREEJAN AI SOLUTIONS delivers work in accordance with modern
                industry engineering standards. To the extent permitted by law,
                our total aggregate liability for any claims arising from an
                engagement is limited to the fees actually paid to us for the
                specific project under dispute.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                7. Governing Law &amp; Jurisdiction
              </Heading>
              <p>
                These Terms of Service and any project agreements are governed
                by and construed in accordance with the laws of India. Any
                disputes shall be subject to the exclusive jurisdiction of the
                courts in Mumbai, Maharashtra, India.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <Heading level="h2">Ready to Discuss Your Project?</Heading>
            <p className="text-sm text-muted sm:text-base">
              Contact us to discuss your requirements, scope, and timeline with
              our engineering team.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
