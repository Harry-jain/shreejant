import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  FileText,
  Clock,
  Eye,
  Trash2,
  Edit3,
  Download,
  XCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SHREEJAN AI SOLUTIONS",
  description:
    "Plain-English privacy policy aligned with India's Digital Personal Data Protection (DPDP) Act. We collect only what we need to answer your enquiry.",
};

export default function PrivacyPage() {
  const grievanceEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aishreejan@gmail.com";

  const summaryPoints = [
    {
      title: "What We Collect",
      description:
        "Only information you explicitly submit through our contact form: name, email, phone number, and project details.",
      icon: FileText,
    },
    {
      title: "Why We Collect It",
      description:
        "Exclusively to evaluate your inquiry, understand requirements, and send you a project proposal.",
      icon: ShieldCheck,
    },
    {
      title: "Who Has Access",
      description:
        "Only our core engineering team and trusted transactional mail providers (such as Resend) delivering messages to our inbox.",
      icon: Eye,
    },
    {
      title: "How Long We Keep It",
      description:
        "Inquiries are kept during active communication and deleted promptly upon request or when no longer required.",
      icon: Clock,
    },
  ];

  const rights = [
    {
      title: "Request a copy of your data",
      desc: "Get an export of your inquiry records submitted through our site.",
      icon: Download,
      subject: "Data Copy Request — DPDP Act",
      body: "Hello Privacy Officer,\n\nPlease provide an export of all personal details and enquiry records linked to my contact information under the DPDP Act.\n\nFull Name:\nPhone Number:\nEmail:",
    },
    {
      title: "Correct your details",
      desc: "Update your name, email, or phone number in our records.",
      icon: Edit3,
      subject: "Data Correction Request — DPDP Act",
      body: "Hello Privacy Officer,\n\nI would like to update or correct my personal details in your records.\n\nCurrent Details:\nUpdated Details:",
    },
    {
      title: "Request data deletion",
      desc: "Permanently erase your contact details and project messages.",
      icon: Trash2,
      subject: "Data Erasure Request — DPDP Act",
      body: "Hello Privacy Officer,\n\nPlease permanently delete all personal data and enquiry messages submitted via your website from your records.\n\nFull Name:\nPhone Number:\nEmail:",
    },
    {
      title: "Withdraw consent",
      desc: "Stop receiving communication regarding quotes or project proposals.",
      icon: XCircle,
      subject: "Consent Withdrawal — DPDP Act",
      body: "Hello Privacy Officer,\n\nI am withdrawing consent for SHREEJAN AI SOLUTIONS to contact me regarding website project proposals.\n\nFull Name:\nPhone / Email:",
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <Section className="border-b border-border">
        <Container>
          <div className="mx-auto max-w-3xl text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span>DPDP Compliance Notice</span>
            </div>
            <Heading level="h1" className="mb-4">
              Privacy Policy
            </Heading>
            <p className="text-base text-muted sm:text-lg">
              We believe in complete transparency. This plain-English policy
              explains how SHREEJAN AI SOLUTIONS handles your contact details in
              compliance with India&apos;s Digital Personal Data Protection
              (DPDP) Act.
            </p>
          </div>
        </Container>
      </Section>

      {/* Summary Highlights */}
      <Section className="border-b border-border bg-surface">
        <Container>
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              At a Glance
            </div>
            <Heading level="h2">Key Privacy Principles</Heading>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {summaryPoints.map((item) => {
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

      {/* Exercise DPDP Rights */}
      <Section className="border-b border-border">
        <Container>
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              Your Control
            </div>
            <Heading level="h2" className="mb-2">
              Your Rights Under the DPDP Act
            </Heading>
            <p className="text-sm text-muted sm:text-base max-w-2xl">
              Under Indian data protection law, you maintain complete ownership
              over your personal data. Click any of the options below to email
              our grievance desk directly:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rights.map((r) => {
              const Icon = r.icon;
              const mailto = `mailto:${grievanceEmail}?subject=${encodeURIComponent(
                r.subject
              )}&body=${encodeURIComponent(r.body)}`;

              return (
                <Card key={r.title} className="flex flex-col justify-between" hoverEffect>
                  <div className="space-y-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-text">{r.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{r.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      href={mailto}
                      className="w-full text-xs"
                      rightIcon={<ArrowRight className="h-3 w-3" />}
                    >
                      Email Request
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Detailed Policy Sections */}
      <Section className="border-b border-border bg-surface">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed text-muted sm:text-base">
            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                1. Information We Collect
              </Heading>
              <p>
                When you voluntarily contact us via our website contact form or
                email, we collect only the details necessary to reply to you:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-text">Full Name:</strong> to address
                  you properly in correspondence.
                </li>
                <li>
                  <strong className="text-text">Email Address:</strong> to
                  provide technical proposals, project estimates, or replies.
                </li>
                <li>
                  <strong className="text-text">Phone / WhatsApp Number:</strong>{" "}
                  to contact you for project consultation if requested.
                </li>
                <li>
                  <strong className="text-text">Project Scope / Message:</strong>{" "}
                  details you share about your requirements, timeline, or
                  budget.
                </li>
              </ul>
              <p>
                We do not collect government identification numbers, financial
                card numbers, or biometric information on this website. We do
                not use third-party behavioral advertising cookies.
              </p>
            </div>

            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                2. Purpose of Processing &amp; Zero Selling Promise
              </Heading>
              <p>
                Your personal details are used strictly to reply to your inquiry,
                discuss project requirements, and provide project estimates.
              </p>
              <p className="font-medium text-text">
                We never sell, rent, lease, or trade your personal data to
                third-party advertisers, data aggregators, or brokers.
              </p>
            </div>

            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                3. Data Storage &amp; Protection
              </Heading>
              <p>
                All form submissions are transmitted securely over encrypted
                HTTPS (TLS). Form submissions are delivered through reputable
                transactional infrastructure (such as Resend) directly to our
                workplace email inbox. We implement standard security practices
                to prevent unauthorized access or disclosure.
              </p>
            </div>

            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                4. Retention and Erasure
              </Heading>
              <p>
                We retain your inquiry information only for as long as needed to
                conduct relevant business discussions. If a project does not
                move forward, your records are archived or permanently removed
                upon your request.
              </p>
            </div>

            <div className="space-y-3">
              <Heading level="h3" className="text-text">
                5. Grievance Officer &amp; Communication
              </Heading>
              <p>
                Under the DPDP Act, if you have any questions, concerns, or
                grievances regarding the processing of your personal data, you
                may write directly to our designated contact:
              </p>
              <Card className="border-border bg-bg">
                <div className="space-y-1 text-sm">
                  <div className="font-semibold text-text">
                    Grievance Officer:
                  </div>
                  <div>SHREEJAN AI SOLUTIONS</div>
                  <div>Mumbai, Maharashtra, India</div>
                  <div>
                    Email:{" "}
                    <a
                      href={`mailto:${grievanceEmail}`}
                      className="text-accent underline hover:text-accent-hover"
                    >
                      {grievanceEmail}
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
