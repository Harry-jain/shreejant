import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { BrandWatermark } from "@/components/ui/BrandWatermark";
import { LegalSummaryTile } from "@/components/legal/LegalSummaryTile";
import { DataFlowDiagram } from "@/components/legal/DataFlowDiagram";
import { YourChoicesStrip } from "@/components/legal/YourChoicesStrip";
import { Database, Eye, Clock, MapPin, ShieldCheck, FileText, AlertTriangle } from "lucide-react";

export const metadata = constructMetadata({
  title: "Privacy Policy & Data Protection",
  description:
    "Plain-English summary and full legal details on how SHREEJAN AI SOLUTIONS collects, protects, and handles business enquiries under Indian data protection standards.",
  canonicalUrl: "/privacy",
});

export default function PrivacyPage() {
  const summaryTiles = [
    {
      title: "What we collect",
      description:
        "Name, business, email, phone, city, message, and the page you came from.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Why we collect it",
      description:
        "To answer your enquiry and send you a project proposal.",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      title: "Who sees it",
      description:
        "Our small team, and the service providers that store and send it (database, email and chat alert providers).",
      icon: <Eye className="w-5 h-5" />,
    },
    {
      title: "How long we keep it",
      description:
        "Enquiries are kept while we are in touch and for a period set by the lawyer (TODO), then deleted.",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      title: "Where it is stored",
      description:
        "Stored in a cloud database; the region is set by the owner (TODO).",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      title: "Your choices & rights",
      description:
        "Ask for a copy, correction or deletion at any time.",
      icon: <Database className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)] overflow-hidden">
      <BrandWatermark text="PRIVACY" position="top" className="opacity-10" />

      <div className="relative z-10 site-container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono mb-4">
            <span>VERSION 2026-11-V1</span>
            <span>·</span>
            <span>DATA PROTECTION NOTICE</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Privacy Policy &amp; Data Rights
          </h1>
          <p className="font-body text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            We believe in total transparency. Here is our plain-English visual summary of how we handle your enquiry details, followed by our full legal policy.
          </p>
        </div>

        {/* 1. Visual Summary (Row of 6 Illustrated Tiles) */}
        <section aria-labelledby="visual-summary-heading" className="mb-12">
          <h2 id="visual-summary-heading" className="sr-only">
            Visual Privacy Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {summaryTiles.map((tile) => (
              <LegalSummaryTile
                key={tile.title}
                title={tile.title}
                description={tile.description}
                icon={tile.icon}
              />
            ))}
          </div>
        </section>

        {/* 2. What happens to your details flow diagram */}
        <section aria-labelledby="flow-diagram-heading">
          <DataFlowDiagram />
        </section>

        {/* 3. Your choices strip */}
        <section aria-labelledby="choices-heading">
          <YourChoicesStrip />
        </section>

        {/* Owner TODO Notices Box */}
        <div className="my-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono space-y-1.5">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Owner Pre-Launch Action Items</span>
          </div>
          <p>• TODO(owner): legal company name and registered address</p>
          <p>• TODO(owner): grievance officer name and email (required under India&apos;s DPDP Act)</p>
          <p>• TODO(owner): data storage region and retention period</p>
          <p>• TODO(owner): lawyer review of the final text before publishing</p>
          <p className="text-amber-300/80 pt-1 italic">
            Note: All statements regarding statutory legal requirements below are marked as &ldquo;to be confirmed by a lawyer&rdquo;.
          </p>
        </div>

        {/* 4. Full Legal Text Below (Always Visible, Headings & Paragraphs) */}
        <article className="mt-12 pt-8 border-t border-white/10 prose prose-invert max-w-none text-white/80 font-body text-sm sm:text-base leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              1. Information We Collect
            </h2>
            <p>
              When you submit a project enquiry through our website contact form or audit tool, we collect the details you voluntarily provide: your full name, business or organisation name, email address, WhatsApp or telephone number, city and state, project requirements or message, and selected service package.
            </p>
            <p>
              We also automatically log referral information (such as the web page that referred you, UTM marketing tags, and landing page URLs) to measure the effectiveness of our marketing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              2. Purpose and Lawful Basis for Processing
            </h2>
            <p>
              We process your details exclusively to review your project brief, respond to your questions, provide technical estimates and proposals, and schedule discovery consultations via email, phone, or WhatsApp.
            </p>
            <p>
              Under Indian law (to be confirmed by a lawyer under the Digital Personal Data Protection Act, 2023), processing of your personal data is based on your explicit consent provided at the time of form submission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              3. Who Has Access to Your Data
            </h2>
            <p>
              Your personal information is accessible only to our core engineering and client architecture team. We never sell, rent, or trade your contact information to third-party data brokers or marketing agencies.
            </p>
            <p>
              To deliver our services reliably, we share your data strictly with trusted technical service providers that operate under strict confidentiality agreements:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>Cloud Database Provider: Supabase (PostgreSQL storage with Row-Level Security enabled).</li>
              <li>Email Delivery Infrastructure: Resend Technologies (used to deliver team alerts and user auto-reply confirmations).</li>
              <li>Team Communications: Telegram Bot API (instant dispatch to private internal architect group).</li>
              <li>Bot Verification: Cloudflare Turnstile (privacy-preserving security challenge without tracking cookies).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              4. Data Storage and Retention Period
            </h2>
            <p>
              Your details are stored in an encrypted cloud database. (TODO(owner): data storage region and retention period — specific cloud region such as AWS Mumbai ap-south-1 to be confirmed with owner).
            </p>
            <p>
              Enquiries are retained while active project discussions are underway, and for a period set by the lawyer (TODO: retention duration to be confirmed by a lawyer), after which records are permanently purged from database backups.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              5. Your Rights and Grievance Redressal
            </h2>
            <p>
              Under India&apos;s Digital Personal Data Protection Act (to be confirmed by a lawyer), you possess the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-white/70">
              <li>Request a summary and digital export of all personal data held about you.</li>
              <li>Request the correction or completion of inaccurate or outdated details.</li>
              <li>Request the immediate erasure and deletion of your records.</li>
              <li>Withdraw your consent at any time without affecting prior lawful processing.</li>
            </ul>
            <p>
              To exercise any of these rights, use the pre-filled choices strip above or contact our Grievance Officer directly:
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs text-white/80 space-y-1">
              <p>Grievance Officer: TODO(owner): grievance officer name and email (required under India&apos;s DPDP Act)</p>
              <p>Email: privacy@shreejanai.in</p>
              <p>Entity: TODO(owner): legal company name and registered address</p>
              <p>Response Time: All privacy requests are acknowledged within 24 hours and addressed within 7 business days.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              6. Policy Updates &amp; Legal Review
            </h2>
            <p>
              This policy was published under consent version <code>2026-11-v1</code>. Any material revisions will be reflected with an updated version stamp on this page.
            </p>
            <p className="text-xs text-white/50 italic">
              Notice: TODO(owner): lawyer review of the final text before publishing.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
