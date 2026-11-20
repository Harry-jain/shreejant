"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Mode = "before" | "after";

export function FixTheChaosQuest() {
  const [mode, setMode] = useState<Mode>("after");
  const [activeTab, setActiveTab] = useState<"salon" | "clinic" | "restaurant">("salon");

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold">
              Quest 001 // Interactive Demo
            </span>
            <span className="text-xs text-muted font-mono">20-sec experiment</span>
          </div>
          <h4 className="font-display text-lg sm:text-xl font-bold text-text mt-1">
            Fix the Chaos: The Power of Clean Interface Engineering
          </h4>
        </div>

        {/* Before / After Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-bg-secondary border border-border">
          <button
            onClick={() => setMode("before")}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
              mode === "before"
                ? "bg-surface text-text shadow-sm font-semibold"
                : "text-muted hover:text-text"
            }`}
          >
            01. Messy Legacy
          </button>
          <button
            onClick={() => setMode("after")}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
              mode === "after"
                ? "bg-accent text-white shadow-sm font-semibold"
                : "text-muted hover:text-text"
            }`}
          >
            02. Shreejan Redesign
          </button>
        </div>
      </div>

      {/* Business type selector */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-muted">Preset:</span>
        {(["salon", "clinic", "restaurant"] as const).map((preset) => (
          <button
            key={preset}
            onClick={() => setActiveTab(preset)}
            className={`px-2.5 py-1 rounded border capitalize transition-colors ${
              activeTab === preset
                ? "bg-text text-bg border-text font-medium"
                : "bg-surface text-muted border-border hover:border-text"
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Interactive viewport simulator */}
      <div className="rounded-xl border border-border overflow-hidden bg-surface transition-all">
        {/* Browser chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-bg-secondary border-b border-border text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <div className="px-3 py-0.5 rounded bg-surface border border-border text-muted truncate max-w-[200px] sm:max-w-xs">
            {mode === "before" ? "slow-legacy-site.in/home" : "shreejanai.in/demos/" + activeTab}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                mode === "before" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
              }`}
            />
            <span className="hidden sm:inline text-[11px] text-muted">
              {mode === "before" ? "Lighthouse 34" : "Lighthouse 99"}
            </span>
          </div>
        </div>

        {/* Content Preview */}
        {mode === "before" ? (
          <div className="p-6 sm:p-8 bg-[#fff9f0] border-4 border-dashed border-amber-300 relative">
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-white font-mono text-[10px] tracking-wider uppercase">
              Cluttered Layout
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                ⚠️ Pop-up Blocked: &ldquo;Sign up for 10% coupon&rdquo;
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-amber-950 leading-tight">
                WELCOME TO OUR PREMIER {activeTab.toUpperCase()} & WELLNESS SERVICES WE PROVIDE BEST
                EXPERIENCE 2024
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed font-sans">
                Click here to view our 40-page PDF brochure or call our landline during 11 AM - 5 PM
                to manually check if any slots are available.
              </p>

              {/* Messy buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button className="px-3 py-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-bold rounded shadow-md">
                  CLICK TO CALL NOW!!!
                </button>
                <button className="px-3 py-2 bg-blue-700 text-white text-xs font-bold rounded shadow-md">
                  DOWNLOAD PDF BROCHURE (24MB)
                </button>
              </div>

              <div className="pt-4 border-t border-amber-200 grid grid-cols-2 gap-2 text-[11px] text-amber-900 font-mono">
                <div className="flex items-center gap-1 text-red-600">
                  <AlertTriangle className="w-3.5 h-3.5" /> High bounce rate (68%)
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <AlertTriangle className="w-3.5 h-3.5" /> Mobile layout shifts
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 bg-surface">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-accent font-semibold">
                  01 // BESPOKE DIGITAL EXPERIENCE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs text-muted font-mono">Next.js 15 Fast Edge</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-text tracking-tight leading-snug">
                {activeTab === "salon" && "Curated Hair, Skin & Aesthetic Care in Bandra"}
                {activeTab === "clinic" && "Specialist Care & Evidence-Based Healthcare"}
                {activeTab === "restaurant" && "Contemporary Dining & Coastal Heritage Cuisine"}
              </h3>

              <p className="text-sm text-muted leading-relaxed font-sans max-w-md">
                Structured menu, transparent pricing, and instant real-time booking directly linked to
                WhatsApp. Sub-second load times on mobile 4G.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button href={`/demos/${activeTab}`} variant="primary" size="default">
                  Launch Live Demo Site ↗
                </Button>
                <Button
                  onClick={() => setMode("before")}
                  variant="outline"
                  size="default"
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Compare Before
                </Button>
              </div>

              <div className="pt-6 border-t border-border grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-second TTFB</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero layout shift</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct WhatsApp desk</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted font-mono">
        <span>Outcome: Clear visual hierarchy increases client trust within 3 seconds.</span>
        <Button href="/services" variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
          View Website Pricing
        </Button>
      </div>
    </div>
  );
}
