import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, MessageSquare, Code, CheckCircle2 } from "lucide-react";
import { PLANS } from "@/data/pricing";

export const metadata = {
  title: "SHREEJAN AI SOLUTIONS — AI Websites & Automation for Indian Businesses",
  description:
    "Mumbai-based web agency building modern Next.js websites, AI chatbots, and smart automations for businesses across India.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full text-white">
      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-mono text-blue-400 mb-6">
          <span>MUMBAI WEB &amp; AI AGENCY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Modern Websites &amp; AI Automation for Indian Businesses
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          We build fast, high-converting websites and smart WhatsApp automations that help local businesses grow without technical complexity.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            <span>View Sample Demos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </section>

      {/* 2. What We Build (3 Items) */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">What We Build</h2>
          <p className="text-gray-400 text-sm sm:text-base">Three core solutions tailored for growing businesses.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Modern Business Websites</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fast, mobile-first websites built with the latest Next.js and Tailwind CSS. Clean design, SEO-ready, and optimized for conversions.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Smart WhatsApp &amp; Chat AI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Instant responses to customer inquiries on WhatsApp. Automated appointment bookings, FAQs, and lead capture 24/7.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Custom Web Applications</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Custom portals, booking systems, and workflow automations built specifically for your business operations and internal needs.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Sample Demos (3 Kept Demos) */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Explore Sample Demos</h2>
          <p className="text-gray-400 text-sm sm:text-base">Working prototypes demonstrating layouts, booking flows, and WhatsApp integration.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-rose-400 uppercase">Salon &amp; Spa</span>
              <h3 className="text-xl font-bold text-white mt-1">Aura Studio</h3>
              <p className="text-gray-400 text-sm mt-2">
                Luxury hair, skin &amp; bridal sanctuary with treatment catalog, appointment booking, and bridal concierge mockup.
              </p>
            </div>
            <Link
              href="/demos/salon"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 pt-2"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase">Healthcare Clinic</span>
              <h3 className="text-xl font-bold text-white mt-1">Dr. Vora Clinic</h3>
              <p className="text-gray-400 text-sm mt-2">
                Specialist dermatology and family medical care with doctor profiles, specialties grid, and online appointment slots.
              </p>
            </div>
            <Link
              href="/demos/clinic"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 pt-2"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase">Dining &amp; Hospitality</span>
              <h3 className="text-xl font-bold text-white mt-1">The Bombay Bistro</h3>
              <p className="text-gray-400 text-sm mt-2">
                Authentic coastal and Mumbai street classics featuring food menu tabs, table reservations, and WhatsApp concierge.
              </p>
            </div>
            <Link
              href="/demos/restaurant"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 pt-2"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 4-Step Process */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">How We Work</h2>
          <p className="text-gray-400 text-sm sm:text-base">A straightforward 4-step process from idea to deployment.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "01", title: "Discovery", desc: "We review your requirements, target audience, and business goals." },
            { num: "02", title: "Strategy & Scope", desc: "You receive a clear scope, wireframes, milestone timeline, and fixed quote." },
            { num: "03", title: "Build & Review", desc: "We develop your site with Next.js and host a staging preview for review." },
            { num: "04", title: "Launch & Support", desc: "We launch your site to your domain and provide 30+ days of warranty support." },
          ].map((s) => (
            <div key={s.num} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-400">{s.num}</span>
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pricing Summary */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Transparent Pricing</h2>
          <p className="text-gray-400 text-sm sm:text-base">Clear pricing plans with no hidden charges. All plans include 100% code ownership.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.filter((p) => p.id !== "custom").map((plan) => (
            <div key={plan.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white capitalize">{plan.id} Plan</h3>
                <div className="text-2xl font-bold text-white mt-2">
                  ₹{plan.launchPriceInr.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-gray-400 mt-1">Delivery in {plan.deliveryDays} days</p>
                <ul className="mt-4 space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{plan.revisions} Structured Revisions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{plan.supportDays} Days Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>100% Code Ownership</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services"
                className="w-full text-center py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                Plan Details
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="text-sm font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5">
            <span>Compare all plans and inclusions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. Contact CTA */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Have a Project in Mind?</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Tell us about your business goals and requirements. We will review your brief and get back to you with an honest timeline and estimate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
            >
              Get in Touch
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
