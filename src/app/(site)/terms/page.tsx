import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { BrandWatermark } from "@/components/ui/BrandWatermark";
import { LegalSummaryTile } from "@/components/legal/LegalSummaryTile";
import { Layers, CreditCard, RotateCw, CheckCircle2, Globe, Headphones, AlertTriangle } from "lucide-react";

export const metadata = constructMetadata({
  title: "Terms of Service & Engagement Standards",
  description:
    "Plain-English summary and complete engagement terms for website development, AI automation, code ownership, and warranties with SHREEJAN AI SOLUTIONS.",
  canonicalUrl: "/terms",
});

export default function TermsPage() {
  const summaryTiles = [
    {
      title: "What a project includes",
      description:
        "Refer to the plan the client chose (all deliverables, architecture specs, and timelines defined in written scope).",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      title: "Payment milestones",
      description:
        "Advance and balance as per the plan (upfront deposit locks the slot, balance due upon staging approval).",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      title: "Revision rounds",
      description:
        "One consolidated list per round (ensures structured adjustments without project scope drift).",
      icon: <RotateCw className="w-5 h-5" />,
    },
    {
      title: "100% Code & Asset Ownership",
      description:
        "You own the code, logo and content after final payment (no vendor lock-in or proprietary hostage).",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      title: "Hosting & custom domain",
      description:
        "Year 1 included, renewals yearly (deployed to global CDN cloud with automatic SSL certificates).",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      title: "Post-launch support",
      description:
        "Support per plan (dedicated maintenance window for bug fixes, performance monitoring, and queries).",
      icon: <Headphones className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)] overflow-hidden">
      <BrandWatermark text="TERMS" position="top" className="opacity-10" />

      <div className="relative z-10 site-container max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono mb-4">
            <span>ENGAGEMENT TERMS</span>
            <span>·</span>
            <span>SHREEJAN AI SOLUTIONS</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Terms of Service &amp; Project Standards
          </h1>
          <p className="font-body text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Clear commitments, zero surprises. Below is our visual summary of project rules and client protections, followed by our full engagement text.
          </p>
        </div>

        {/* 1. Visual Summary (Row of 6 Illustrated Tiles) */}
        <section aria-labelledby="terms-summary-heading" className="mb-12">
          <h2 id="terms-summary-heading" className="sr-only">
            Terms of Service Summary
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

        {/* Owner TODO Notice Box */}
        <div className="my-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono space-y-1.5">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Owner Pre-Launch Action Items</span>
          </div>
          <p>• TODO(owner): legal company name and registered address</p>
          <p>• TODO(owner): refund and cancellation terms (must match the signed agreement)</p>
          <p>• TODO(owner): lawyer review of the final text before publishing</p>
          <p className="text-amber-300/80 pt-1 italic">
            Note: All statements regarding statutory legal requirements below are marked as &ldquo;to be confirmed by a lawyer&rdquo;.
          </p>
        </div>

        {/* 2. Full Legal Text Below (Always Visible) */}
        <article className="mt-12 pt-8 border-t border-white/10 prose prose-invert max-w-none text-white/80 font-body text-sm sm:text-base leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              1. Project Scope &amp; Plan Selection
            </h2>
            <p>
              Each web design, AI integration, or development engagement corresponds directly to the package or proposal selected by the client (Starter, Growth, Business, Premium, or Custom Architecture).
            </p>
            <p>
              All agreed pages, animations, third-party integrations, and multilingual capabilities are specified in the written project proposal issued prior to commencement. Any features requested outside this scope are quoted separately as add-ons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              2. Payment Terms &amp; Milestones
            </h2>
            <p>
              Payments follow fixed milestones as specified in the client plan. Typically, an advance booking deposit is required to secure engineering resources and initiate wireframing. The remaining balance is payable upon staging approval prior to domain transfer or production deployment.
            </p>
            <p>
              All payments are processed in Indian Rupees (INR) via bank NEFT/RTGS, UPI, or authorised gateway invoice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              3. Structured Revisions
            </h2>
            <p>
              To maintain rapid delivery schedules, revisions are carried out in structured rounds. Clients submit one consolidated feedback list per revision round.
            </p>
            <p>
              Consolidated lists ensure our engineers address visual adjustments, typography, copy changes, and functional tweaks systematically without conflicting revisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              4. Code, Logo &amp; Asset Ownership
            </h2>
            <p>
              Upon receipt of final payment, full intellectual property rights, source code, visual assets, and deployed repositories transfer 100% to the client.
            </p>
            <p>
              We enforce zero vendor lock-in. You receive the complete Next.js / TypeScript codebase with documentation, allowing any competent engineering team to maintain or extend it in the future.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              5. Hosting, Domain &amp; Renewals
            </h2>
            <p>
              Selected packages include high-speed cloud hosting and custom domain management for Year 1. Subsequent annual renewals are billed at transparent standard rates, or the client may elect to transfer hosting to their own cloud account without penalty.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              6. Cancellation &amp; Refund Policy
            </h2>
            <p>
              TODO(owner): refund and cancellation terms (must match the signed agreement — specific milestone percentages and cancellation notice periods to be defined).
            </p>
            <p>
              Notice: The enforceability of refund terms under Indian contract law is to be confirmed by a lawyer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              7. Legal Entity &amp; Jurisdiction
            </h2>
            <p>
              Service Provider: TODO(owner): legal company name and registered address.
            </p>
            <p>
              These terms are governed by the laws of India. Any disputes arising out of this engagement shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra (to be confirmed by a lawyer).
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
