import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { LegalSummaryTile } from "@/components/legal/LegalSummaryTile";
import { Layers, CreditCard, RotateCw, CheckCircle2, Globe, Headphones } from "lucide-react";

export const metadata = constructMetadata({
  title: "Terms of Service | SHREEJAN AI SOLUTIONS",
  description:
    "Plain-English terms of engagement for web development and AI automation with SHREEJAN AI SOLUTIONS.",
  canonicalUrl: "/terms",
});

export default function TermsPage() {
  const summaryTiles = [
    {
      title: "Project Scope",
      description: "Clearly defined in your chosen plan or custom proposal before starting.",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      title: "Payment Milestones",
      description: "Advance deposit to begin; balance due upon staging approval.",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      title: "Revision Rounds",
      description: "Structured revision rounds based on consolidated feedback.",
      icon: <RotateCw className="w-5 h-5" />,
    },
    {
      title: "100% Code Ownership",
      description: "You own all code, assets, and repositories upon final payment.",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      title: "Hosting & Deployment",
      description: "Deployed to high-speed cloud edge with custom domain setup.",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      title: "Post-Launch Support",
      description: "30+ days of dedicated bug-fix and maintenance support included.",
      icon: <Headphones className="w-5 h-5" />,
    },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-white">
      <div className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-blue-400 mb-4">
          <span>ENGAGEMENT TERMS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Clear terms, zero surprises. Below is our plain-English summary of project rules and client rights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {summaryTiles.map((tile) => (
          <LegalSummaryTile
            key={tile.title}
            title={tile.title}
            description={tile.description}
            icon={tile.icon}
          />
        ))}
      </div>

      <article className="mt-12 pt-8 border-t border-white/10 text-gray-300 text-sm sm:text-base leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">1. Engagement &amp; Deliverables</h2>
          <p>
            All projects are delivered per the specifications agreed in the selected package (Starter, Growth, Business, Premium) or written proposal. Scope additions outside the agreement are quoted separately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">2. Code &amp; Asset Ownership</h2>
          <p>
            Upon receipt of final milestone payment, 100% intellectual property, source code, and assets are transferred to the client. We do not enforce proprietary vendor lock-in.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">3. Jurisdiction</h2>
          <p>
            These terms are governed by the laws of India, subject to the jurisdiction of courts in Mumbai, Maharashtra.
          </p>
        </section>
      </article>
    </div>
  );
}
