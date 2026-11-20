import React from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";

const STEPS = [
  {
    step: "01",
    title: "Scope & Plan",
    desc: "We understand your business goals and map out the pages.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Clean, responsive layout tailored to your brand.",
  },
  {
    step: "03",
    title: "Development",
    desc: "Fast Next.js build with clean code.",
  },
  {
    step: "04",
    title: "Launch & Handoff",
    desc: "Tested, deployed, with full code ownership.",
  },
];

export function ProcessSection() {
  return (
    <Section className="border-t border-border bg-surface">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <Heading level="h2" className="mb-3">
            Our 4-Step Process
          </Heading>
          <p className="text-muted text-sm sm:text-base">
            A straightforward process from initial discussion to project delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <Card key={step.step} hoverEffect className="space-y-3">
              <span className="text-xs font-mono font-semibold text-accent">
                Step {step.step}
              </span>
              <Heading level="h3" className="text-base sm:text-lg font-semibold">
                {step.title}
              </Heading>
              <p className="text-muted text-sm leading-relaxed">
                {step.desc}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default ProcessSection;
