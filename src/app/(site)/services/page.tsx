import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PLANS, ADD_ONS } from "@/data/pricing";

export const metadata = {
  title: "Services & Pricing — SHREEJAN AI SOLUTIONS",
  description:
    "Transparent pricing and engineering services for Next.js web applications and AI automations. 100% code ownership.",
};

export default function ServicesPage() {
  return (
    <div className="w-full text-white pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-mono text-blue-400 mb-4">
          <span>TRANSPARENT PRICING</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Plans &amp; Engineering Packages
        </h1>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          Clear, fixed-scope engineering packages for Indian businesses. Every project includes full code ownership, deployment, and dedicated post-launch support.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {PLANS.filter((p) => p.id !== "custom").map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-2xl flex flex-col justify-between border ${
              plan.recommended
                ? "bg-white/10 border-blue-500 shadow-lg shadow-blue-500/10"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div>
              {plan.recommended && (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600 text-[11px] font-semibold text-white uppercase tracking-wider mb-3">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-bold text-white capitalize">{plan.id}</h3>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-white">
                  ₹{plan.launchPriceInr.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-400 line-through ml-2">
                  ₹{plan.regularPriceInr.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Delivery in {plan.deliveryDays} business days</p>

              <div className="border-t border-white/10 my-5" />

              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                What&apos;s Included:
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{plan.revisions} Structured revision rounds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{plan.supportDays} Days post-launch support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Payment split: {plan.paymentSplit}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>100% Code &amp; asset ownership</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Mobile-first responsive design</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
              >
                <span>Choose {plan.id}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Plan Box */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Need a Custom Architecture?</h3>
          <p className="text-sm text-gray-300 max-w-xl">
            For businesses requiring custom portal development, enterprise workflow automations, or specialized third-party integrations.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider shrink-0 transition-colors"
        >
          Request Custom Quote
        </Link>
      </div>

      {/* Scope Transparency (What is included vs not included) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-emerald-400">Included in All Projects</h3>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full Next.js / TypeScript source code repository</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Edge CDN deployment with SSL and custom domain linking</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>WhatsApp click-to-chat integration and contact forms</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Responsive testing across mobile, tablet, and desktop</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-amber-400">Not Included / Add-ons</h3>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Third-party API subscriptions (e.g. Meta WhatsApp Business API fees)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Domain name registration fee (billed directly by registrar)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Professional photoshoots or studio videography</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              <span>Unlimited revisions (extra rounds available per add-on menu)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to discuss your project?</h2>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            Start a Project
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
