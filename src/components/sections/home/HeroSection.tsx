"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Code2, Cpu, Database, CheckCircle2, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type FocusMode = "websites" | "automation" | "platforms";

export function HeroSection() {
  const [activeFocus, setActiveFocus] = useState<FocusMode>("websites");

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border bg-paper-grid overflow-hidden">
      <Container>
        {/* Top Studio Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-text font-bold uppercase tracking-wider">
              SHREEJAN // DIGITAL ENGINEERING STUDIO
            </span>
          </div>
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span>MUMBAI, INDIA</span>
            <span className="text-border">•</span>
            <span>AVAILABLE FOR SELECT Q1/Q2 BUILDS</span>
          </div>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Editorial Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-text tracking-tight leading-[1.05]">
                We build the digital systems behind ambitious businesses.
              </h1>
              <p className="text-base sm:text-lg text-muted font-sans leading-relaxed max-w-xl">
                From high-performance websites to intelligent automation and custom software,
                we turn ambitious ideas into useful digital products. Clear code, fast edge delivery,
                and zero agency fluff.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="/contact" variant="primary" size="lg" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button href="#lab" variant="outline" size="lg" rightIcon={<ArrowDown className="w-4 h-4" />}>
                Explore the Lab
              </Button>
            </div>

            {/* Interactive Focus Switcher */}
            <div className="pt-6 sm:pt-8 border-t border-border space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                SELECT ENGINEERING DISCIPLINE TO INSPECT:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "websites", label: "01 / Websites", sub: "Speed & Commerce" },
                  { id: "automation", label: "02 / Automation", sub: "WhatsApp & Leads" },
                  { id: "platforms", label: "03 / Platforms", sub: "Custom Software" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFocus(item.id as FocusMode)}
                    className={`p-3 rounded-lg border text-left transition-all font-mono text-xs ${
                      activeFocus === item.id
                        ? "bg-surface border-accent shadow-sm ring-1 ring-accent"
                        : "bg-surface/50 border-border hover:bg-surface hover:border-text/40"
                    }`}
                  >
                    <div className="font-bold text-text">{item.label}</div>
                    <div className="text-[11px] text-muted">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Interactive Console Panel (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
              {/* Console Chrome Header */}
              <div className="px-4 py-3 bg-bg-secondary border-b border-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <span className="text-muted truncate ml-2">studio.shreejan.internal</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-accent font-mono">
                  LIVE SYSTEM VIEW
                </span>
              </div>

              {/* Console Body Depending on Focus */}
              <div className="p-5 sm:p-6 space-y-5">
                {activeFocus === "websites" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-bold uppercase">
                        [ ARCHITECTURE // NEXT.JS 15 ]
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                        STATUS: OPTIMIZED
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-text">
                      Sub-Second Edge Delivery
                    </h4>

                    <p className="text-xs text-muted leading-relaxed">
                      Server-rendered static generation, optimized font preloading, zero heavy scripts,
                      and crisp 100/100 Lighthouse performance baselines.
                    </p>

                    <div className="p-3.5 rounded-lg bg-bg-secondary border border-border space-y-2 font-mono text-[11px]">
                      <div className="flex justify-between text-text">
                        <span>First Contentful Paint</span>
                        <span className="text-emerald-700 font-bold">0.42s</span>
                      </div>
                      <div className="flex justify-between text-text">
                        <span>Time to Interactive</span>
                        <span className="text-emerald-700 font-bold">0.68s</span>
                      </div>
                      <div className="flex justify-between text-text">
                        <span>Cumulative Layout Shift</span>
                        <span className="text-emerald-700 font-bold">0.00</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono">
                      <span className="text-muted">No bloated WordPress plugins.</span>
                      <Link href="/demos" className="text-accent font-bold hover:underline">
                        View Sample Demos →
                      </Link>
                    </div>
                  </div>
                )}

                {activeFocus === "automation" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-bold uppercase">
                        [ PIPELINE // WHATSAPP AGENT ]
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent-lime/50 text-text font-semibold">
                        ACTIVE DISPATCH
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-text">
                      Automated Lead Flow Engine
                    </h4>

                    <p className="text-xs text-muted leading-relaxed">
                      Instant conversational responses via WhatsApp Business API, automated calendar bookings,
                      and real-time notifications to your team.
                    </p>

                    <div className="p-3.5 rounded-lg bg-[#181818] text-[#F5F2EA] space-y-1.5 font-mono text-[10px] leading-relaxed">
                      <div className="text-white/40">{"// Trigger: Web Inquiry Submitted"}</div>
                      <div className="text-accent-lime">→ POST /api/contact [200 OK]</div>
                      <div className="text-white/80">→ Send WhatsApp template: greeting_v2</div>
                      <div className="text-emerald-400">→ Sync contact record to Supabase DB</div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono">
                      <span className="text-muted">Zero missed inquiries.</span>
                      <Link href="#lab" className="text-accent font-bold hover:underline">
                        Try Simulator →
                      </Link>
                    </div>
                  </div>
                )}

                {activeFocus === "platforms" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-bold uppercase">
                        [ CUSTOM // FULL-STACK APPS ]
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent-blue/60 text-text font-semibold">
                        TYPESCRIPT + POSTGRES
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-text">
                      Bespoke Internal Tools & Portals
                    </h4>

                    <p className="text-xs text-muted leading-relaxed">
                      Client dashboards, role-based access control, operational portals, and high-security
                      database architectures built to fit your business workflow.
                    </p>

                    <div className="p-3.5 rounded-lg bg-bg-secondary border border-border space-y-2 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        <span>Role-Based Authentication (RBAC)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        <span>Real-Time Relational Data Modeling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        <span>Full Source Code & Database Ownership</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono">
                      <span className="text-muted">No vendor lock-in.</span>
                      <Link href="/services" className="text-accent font-bold hover:underline">
                        Pricing & Scope →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Console Footer */}
              <div className="px-4 py-2.5 bg-bg-secondary/60 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted">
                <span>CRAFTED IN MUMBAI</span>
                <span className="text-text font-semibold">100% TYPED TYPESCRIPT</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
