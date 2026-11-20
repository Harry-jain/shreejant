import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Linkedin,
  Github,
  Globe,
  ArrowRight,
  ShieldCheck,
  Code2,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | SHREEJAN AI SOLUTIONS",
  description:
    "We are a Mumbai-based web agency founded by three engineers: Harsh, Ankit, and Akshay. We build clean, fast, and maintainable websites for businesses.",
};

export default function AboutPage() {
  const ankitLinkedIn = process.env.NEXT_PUBLIC_ANKIT_LINKEDIN;
  const ankitGithub = process.env.NEXT_PUBLIC_ANKIT_GITHUB;

  const reasons = [
    {
      title: "Direct Access to Engineers",
      description:
        "You communicate directly with the three engineers designing and coding your site. No account managers, middle layers, or miscommunicated requirements.",
      icon: Users,
    },
    {
      title: "Clear Timelines",
      description:
        "We outline realistic milestones upfront and stick to agreed release schedules with regular progress updates.",
      icon: Clock,
    },
    {
      title: "Honest Pricing",
      description:
        "Transparent, milestone-based quotes with zero surprise fees, hidden maintenance traps, or inflated hosting costs.",
      icon: ShieldCheck,
    },
    {
      title: "Full Source Code Ownership",
      description:
        "Upon project completion and final settlement, you own all of your source code, design assets, and repository. No vendor lock-in.",
      icon: Code2,
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Hero Section */}
      <Section className="border-b border-border">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span>Mumbai, Maharashtra, India</span>
            </div>
            <Heading level="h1" className="mb-6">
              Engineering-First Web Development for Growing Businesses
            </Heading>
            <p className="text-base text-muted sm:text-lg">
              We are a Mumbai-based web agency founded by three engineers (Harsh,
              Ankit, Akshay). We build clean, fast, and maintainable websites
              for businesses without bloated templates or misleading claims.
            </p>
          </div>
        </Container>
      </Section>

      {/* Honest Stance Banner */}
      <Section className="border-b border-border bg-surface">
        <Container>
          <Card className="mx-auto max-w-3xl border-border bg-bg text-center">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-4 w-4" />
              <span>Our Stance</span>
            </div>
            <Heading level="h3" className="mb-3">
              Newly Founded, Fully Transparent
            </Heading>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              SHREEJAN AI SOLUTIONS is a newly established studio. We do not make
              inflated corporate claims, show fabricated client numbers, or use
              stock marketing jargon. What we offer is simple: three dedicated
              engineers who care deeply about code quality, performance, and
              direct communication with our clients.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Founders Section */}
      <Section className="border-b border-border">
        <Container>
          <div className="mb-12 text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
              Founding Partners
            </div>
            <Heading level="h2" className="mb-4">
              Meet the Team
            </Heading>
            <p className="mx-auto max-w-2xl text-sm text-muted sm:text-base">
              The three engineers directly designing, building, and deploying
              your web projects.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Harsh */}
            <Card className="flex flex-col justify-between" hoverEffect>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg text-base font-bold text-accent">
                  HJ
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">Harsh</h3>
                  <p className="text-xs font-medium text-accent">
                    Frontend &amp; Product
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  Focused on modern Next.js architecture, UI performance, and
                  clean responsive web experiences.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  href="https://www.linkedin.com/in/harsh-jain-60bab21b0/"
                  leftIcon={<Linkedin className="h-3.5 w-3.5" />}
                  aria-label="Harsh LinkedIn Profile"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  href="https://github.com/Harry-jain"
                  leftIcon={<Github className="h-3.5 w-3.5" />}
                  aria-label="Harsh GitHub Profile"
                >
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  href="https://hmjain.vercel.app"
                  leftIcon={<Globe className="h-3.5 w-3.5" />}
                  aria-label="Harsh Personal Website"
                >
                  Website
                </Button>
              </div>
            </Card>

            {/* Ankit */}
            <Card className="flex flex-col justify-between" hoverEffect>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg text-base font-bold text-accent">
                  AV
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">Ankit</h3>
                  <p className="text-xs font-medium text-accent">
                    Full-Stack &amp; Systems
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  Builds scalable web backends, secure API integrations, and
                  robust application logic.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                {ankitLinkedIn && (
                  <Button
                    variant="outline"
                    size="sm"
                    href={ankitLinkedIn}
                    leftIcon={<Linkedin className="h-3.5 w-3.5" />}
                    aria-label="Ankit LinkedIn Profile"
                  >
                    LinkedIn
                  </Button>
                )}
                {ankitGithub && (
                  <Button
                    variant="outline"
                    size="sm"
                    href={ankitGithub}
                    leftIcon={<Github className="h-3.5 w-3.5" />}
                    aria-label="Ankit GitHub Profile"
                  >
                    GitHub
                  </Button>
                )}
                {!ankitLinkedIn && !ankitGithub && (
                  <span className="inline-flex items-center rounded-md border border-border bg-bg px-2.5 py-1 text-xs text-muted">
                    Direct Project Collaboration
                  </span>
                )}
              </div>
            </Card>

            {/* Akshay */}
            <Card className="flex flex-col justify-between" hoverEffect>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg text-base font-bold text-accent">
                  AJ
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">Akshay</h3>
                  <p className="text-xs font-medium text-accent">
                    Design &amp; Creative Engineering
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  Crafts thoughtful interface designs, typography systems, and
                  clean visual presentation.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  href="https://www.linkedin.com/in/akshayrj/"
                  leftIcon={<Linkedin className="h-3.5 w-3.5" />}
                  aria-label="Akshay LinkedIn Profile"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  href="https://github.com/Akshayjankar"
                  leftIcon={<Github className="h-3.5 w-3.5" />}
                  aria-label="Akshay GitHub Profile"
                >
                  GitHub
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Work With Us */}
      <Section className="border-b border-border bg-surface">
        <Container>
          <div className="mb-12 text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
              Our Principles
            </div>
            <Heading level="h2" className="mb-4">
              Why Work With Us
            </Heading>
            <p className="mx-auto max-w-2xl text-sm text-muted sm:text-base">
              A collaborative, engineering-led relationship designed around your
              business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <Card key={reason.title} hoverEffect className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-text">
                    {reason.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted sm:text-sm">
                    {reason.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <Heading level="h2">Have a Project in Mind?</Heading>
            <p className="text-sm text-muted sm:text-base">
              Talk directly with our founding engineers. We will review your
              requirements and provide an honest assessment with realistic
              options.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
