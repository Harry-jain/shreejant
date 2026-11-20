import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does the milestone payment process work?",
    answer:
      "We follow a transparent milestone structure. For Starter and Growth plans, payment is split into 50% advance to initiate architecture and design, and 50% upon final acceptance testing and live deployment. For Scale and Custom projects, we split into 40% kickoff, 30% intermediate milestone review, and 30% final sign-off. We accept direct bank NEFT/IMPS transfers and UPI for Indian entities.",
  },
  {
    question: "What are the realistic turnaround times for each package?",
    answer:
      "Our delivery timelines are realistic and strictly observed: Starter websites take 7 to 10 business days; Growth websites take 14 to 18 business days; Scale packages take 3 to 4 weeks; Custom web applications are mapped out in a phased project plan with clear bi-weekly milestones. Timelines begin once the initial discovery inputs and brand assets are received.",
  },
  {
    question: "Do I receive full ownership of the source code?",
    answer:
      "Yes. Once the final milestone invoice is cleared, complete ownership of the Next.js and TypeScript Git repository is transferred directly to your organization. You own the code, assets, and design files with zero vendor lock-in, zero ongoing agency royalty fees, and no proprietary constraints.",
  },
  {
    question: "How do you handle revisions during development?",
    answer:
      "Each package includes structured revision rounds (3 rounds for Starter and Growth, 4 for Scale, and 5 for Custom). A revision round includes feedback on layout adjustments, typography, copy refinements, and visual tweaks within the agreed scope. Additional custom page additions or feature shifts are quoted upfront per our add-on schedule.",
  },
  {
    question: "What does post-launch support cover?",
    answer:
      "Every project includes 30 to 90 days of dedicated post-launch warranty support. Our engineering team resolves any technical bugs, browser display anomalies, or broken links discovered after launch. Support is provided by our core team in Mumbai during standard business hours (Monday to Saturday, 10:00 AM to 7:00 PM IST).",
  },
  {
    question: "Can we manage hosting and domains under our own business accounts?",
    answer:
      "Absolutely. We assist in setting up your production environment under your own Vercel, Netlify, or cloud provider account so you retain total administrative billing control. We configure your DNS records, SSL certificates, and custom domain routing without retaining administrative hostage over your web assets.",
  },
];

export function ServicesFAQ() {
  return (
    <Section className="py-16 sm:py-20 border-b border-border bg-bg">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface border border-border text-accent">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <Heading level="h2">Questions &amp; Commercial Terms</Heading>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Straightforward answers regarding milestones, turnaround schedules, code transfer, and post-launch maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FAQ_ITEMS.map((item) => (
            <Card key={item.question} className="space-y-3">
              <h3 className="text-sm sm:text-base font-semibold text-text leading-snug">
                {item.question}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {item.answer}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default ServicesFAQ;
