"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Palette,
  Terminal,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Wand2,
  Check,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type StudioTab = "discover" | "design" | "build" | "grow";

const BRAND_COLORS = [
  { name: "Electric Violet", hex: "#7C5CFC" },
  { name: "Crimson Coral", hex: "#EF4444" },
  { name: "Cyan Horizon", hex: "#38BDF8" },
  { name: "Emerald Mint", hex: "#10B981" },
  { name: "Royal Amber", hex: "#F59E0B" },
  { name: "Fuchsia Neon", hex: "#EC4899" },
];

export function InteractiveStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>("discover");
  const [brandName, setBrandName] = useState("yourbrand");
  const [accentColor, setAccentColor] = useState("#7C5CFC");
  const [selectedIdeas, setSelectedIdeas] = useState<number[]>([1, 4, 7]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildDone, setBuildDone] = useState(true);

  const toggleIdea = (id: number) => {
    if (selectedIdeas.includes(id)) {
      setSelectedIdeas(selectedIdeas.filter((i) => i !== id));
    } else {
      setSelectedIdeas([...selectedIdeas, id]);
    }
  };

  const handleRunBuild = () => {
    setIsBuilding(true);
    setBuildDone(false);
    setTimeout(() => {
      setIsBuilding(false);
      setBuildDone(true);
    }, 1200);
  };

  const tabContent = {
    discover: {
      step: "01 / 04",
      path: "blueprint",
      titleLead: "Engineer what ",
      titleAccent: "converts",
      desc: "Every business idea is rigorously modeled through Indian buyer behaviors, UPI frictionless checkout flows, and autonomous WhatsApp lead dispatch. Only revenue-producing architectures move to production.",
      stageBadge: "AI DIAGNOSTIC BLUEPRINT",
    },
    design: {
      step: "02 / 04",
      path: "spatial-ui",
      titleLead: "Design that ",
      titleAccent: "commands respect",
      desc: "Editorial typography, dark obsidian visual flagships, and fluid 3D micro-interactions engineered to make Indian luxury brands stand decades apart from competitors.",
      stageBadge: "BESPOKE SPATIAL SYSTEM",
    },
    build: {
      step: "03 / 04",
      path: "edge-stack",
      titleLead: "Ship sub-50ms ",
      titleAccent: "power",
      desc: "Latest version Next JS, React 19, TypeScript 5.7, and Vercel Mumbai edge deployment. 100/100 Lighthouse performance, instant zero-lag page transitions, and complete type safety.",
      stageBadge: "PRODUCTION EDGE ARCHITECTURE",
    },
    grow: {
      step: "04 / 04",
      path: "autonomous-ai",
      titleLead: "Scale with ",
      titleAccent: "autonomous agents",
      desc: "24/7 intelligent WhatsApp sales agents that answer inquiries, qualify leads, schedule calendar slots, and close orders remotely while your team sleeps.",
      stageBadge: "MULTI-AGENT DISPATCH",
    },
  };

  const current = tabContent[activeTab];

  return (
    <section
      className="relative py-24 sm:py-32 overflow-hidden transition-all duration-700 ease-out select-none"
      style={{
        background: `radial-gradient(ellipse 900px 600px at 50% 35%, ${accentColor}28 0%, transparent 75%), #090C15`,
      }}
    >
      {/* Dynamic atmospheric radial spotlight tied to selected accent color */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-40"
        style={{ backgroundColor: accentColor }}
      />

      <div className="site-container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8">
            
            {/* 4 Tabs Selector */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit backdrop-blur-xl shadow-lg">
              {(
                [
                  { id: "discover", label: "Discover", icon: Search },
                  { id: "design", label: "Design", icon: Palette },
                  { id: "build", label: "Build", icon: Terminal },
                  { id: "grow", label: "Scale", icon: TrendingUp },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#0E121E] text-white shadow-md border"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                    style={{
                      borderColor: isActive ? `${accentColor}80` : "transparent",
                      color: isActive ? "#FFFFFF" : undefined,
                    }}
                  >
                    <Icon
                      className="w-3.5 h-3.5 transition-colors"
                      style={{ color: isActive ? accentColor : "inherit" }}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Headline */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider mb-4 border transition-colors duration-500"
                style={{
                  backgroundColor: `${accentColor}18`,
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{current.stageBadge}</span>
              </div>

              <h3 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.035em] leading-[1.08]">
                <span>{current.titleLead}</span>
                <span
                  className="inline-block bg-clip-text text-transparent transition-all duration-500 pb-1 pr-3 sm:pr-4 pl-1"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${accentColor}, #FFFFFF)`,
                  }}
                >
                  {current.titleAccent}
                </span>
              </h3>
              <p className="font-body text-base sm:text-lg text-white/75 mt-4 leading-relaxed max-w-md">
                {current.desc}
              </p>
            </div>

            {/* "Preview It With Your Brand" Input & Color Swatches */}
            <div className="space-y-3 pt-2">
              <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                Interactive Brand Simulator · Select Color Accent
              </label>
              <div
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#0E121E]/95 border shadow-xl max-w-md backdrop-blur-xl transition-colors duration-500"
                style={{ borderColor: `${accentColor}50` }}
              >
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) =>
                    setBrandName(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                  }
                  placeholder="Enter your enterprise name"
                  maxLength={24}
                  className="flex-1 px-3 py-1 text-sm font-mono text-white bg-transparent focus:outline-none"
                />

                {/* Color dots picker */}
                <div className="flex items-center gap-2 pr-2">
                  {BRAND_COLORS.map((c) => {
                    const isSelected = accentColor === c.hex;
                    return (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setAccentColor(c.hex)}
                        title={c.name}
                        className={`w-5 h-5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? "scale-125 ring-2 ring-offset-2 ring-offset-[#090C15]"
                            : "hover:scale-110 opacity-70 hover:opacity-100"
                        }`}
                        style={{
                          backgroundColor: c.hex,
                          boxShadow: isSelected ? `0 0 14px ${c.hex}` : undefined,
                        }}
                        aria-label={`Select ${c.name} brand color`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-2">
              <Link
                href={`/contact?intent=demo&brand=${encodeURIComponent(brandName)}&accent=${encodeURIComponent(accentColor)}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-heading font-semibold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 8px 32px ${accentColor}55`,
                }}
              >
                <span>Deploy with this Theme</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                Live Prototype Mode
              </span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Interactive Browser Studio */}
          <div className="lg:col-span-7 w-full">
            <div
              className="rounded-[28px] border bg-[#0E121E]/95 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 backdrop-blur-2xl"
              style={{
                borderColor: `${accentColor}40`,
                boxShadow: `0 24px 60px -20px ${accentColor}30, 0 0 40px -10px ${accentColor}15`,
              }}
            >
              
              {/* Chrome Top Bar */}
              <div className="h-12 px-5 bg-[#090C15]/90 border-b border-white/10 flex items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                
                {/* Center URL pill */}
                <div
                  className="flex-1 max-w-sm mx-auto px-4 py-1 rounded-full bg-black/60 border text-[11px] font-mono text-white/90 text-center truncate flex items-center justify-center gap-2 shadow-inner transition-colors duration-500"
                  style={{ borderColor: `${accentColor}40` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>https://{brandName || "yourbrand"}.shreejan.ai/{current.path}</span>
                </div>

                {/* Step indicator */}
                <span className="font-mono text-xs text-white/50 shrink-0">
                  {current.step}
                </span>
              </div>

              {/* Viewport Content by Tab */}
              <div className="p-6 sm:p-8 min-h-[440px] flex flex-col justify-between bg-[#0A0D18]/90 relative">
                
                {/* 1. DISCOVER TAB VIEW */}
                {activeTab === "discover" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* 3x3 Architecture Modules */}
                      <div className="md:col-span-8 grid grid-cols-3 gap-3 relative">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => {
                          const isSelected = selectedIdeas.includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => toggleIdea(id)}
                              className={`p-3.5 rounded-xl border text-left transition-all duration-300 relative ${
                                isSelected
                                  ? "bg-[#141A2B] shadow-md scale-100"
                                  : "bg-[#0E121F]/60 border-white/10 opacity-70 hover:opacity-100"
                              }`}
                              style={{
                                borderColor: isSelected ? accentColor : "rgba(255,255,255,0.08)",
                                boxShadow: isSelected ? `0 0 16px ${accentColor}30` : undefined,
                              }}
                            >
                              <div
                                className="h-2 w-3/4 rounded-full mb-2 transition-colors duration-300"
                                style={{
                                  backgroundColor: isSelected ? accentColor : "rgba(255,255,255,0.15)",
                                }}
                              />
                              <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                            </button>
                          );
                        })}

                        {/* Magic wand floating cursor */}
                        <div className="absolute top-[38%] left-[45%] pointer-events-none drop-shadow-xl animate-pulse">
                          <Wand2
                            className="w-8 h-8 transition-colors duration-300"
                            style={{
                              color: accentColor,
                              filter: `drop-shadow(0 0 12px ${accentColor})`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Right Signals Panel */}
                      <div
                        className="md:col-span-4 p-4 rounded-2xl bg-[#0E121E] border space-y-3 shadow-lg transition-colors duration-500"
                        style={{ borderColor: `${accentColor}35` }}
                      >
                        <div className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                          {brandName.toUpperCase()} — ROI SIGNALS
                        </div>
                        <div className="space-y-2.5">
                          {[
                            { label: "User Acquisition", pct: "88%" },
                            { label: "Brand Prestige", pct: "94%" },
                            { label: "Edge Speed Score", pct: "99%" },
                            { label: "WhatsApp Automation", pct: "82%" },
                          ].map((sig) => (
                            <div key={sig.label}>
                              <div className="flex justify-between text-[11px] font-mono text-white/80 mb-1">
                                <span>{sig.label}</span>
                                <span style={{ color: accentColor }}>{sig.pct}</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: sig.pct,
                                    backgroundColor: accentColor,
                                    boxShadow: `0 0 8px ${accentColor}80`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          className="pt-2 border-t border-white/10 font-mono text-[10.5px] font-semibold transition-colors duration-300"
                          style={{ color: accentColor }}
                        >
                          {selectedIdeas.length} of 9 core modules selected
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pill */}
                    <div className="text-center pt-2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 font-mono text-[10.5px]">
                        <Wand2 className="w-3 h-3" style={{ color: accentColor }} />
                        <span>Interactive Prototype · Click modules to customize flow</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. DESIGN TAB VIEW */}
                {activeTab === "design" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Typography Palette Preview */}
                      <div
                        className="p-5 rounded-2xl bg-[#0E121E] border space-y-3"
                        style={{ borderColor: `${accentColor}35` }}
                      >
                        <span className="font-mono text-[10px] text-white/50 uppercase">Typography System</span>
                        <div className="font-heading font-black text-2xl text-white">
                          Cal Sans Display
                        </div>
                        <p className="font-body text-xs text-white/70 leading-relaxed">
                          Paired with DM Sans body and Space Grotesk technical accents. Engineered for commanding presence.
                        </p>
                      </div>

                      {/* Spatial Component Card */}
                      <div
                        className="p-5 rounded-2xl bg-[#0E121E] border flex flex-col justify-between"
                        style={{ borderColor: `${accentColor}35` }}
                      >
                        <span className="font-mono text-[10px] text-white/50 uppercase">Active Palette</span>
                        <div className="flex items-center gap-3 my-2">
                          <div
                            className="w-10 h-10 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: accentColor }}
                          >
                            T.
                          </div>
                          <div>
                            <div className="font-heading font-bold text-sm text-white">
                              {brandName.toUpperCase()}
                            </div>
                            <span className="font-mono text-xs" style={{ color: accentColor }}>
                              Accent: {accentColor}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: accentColor }} />
                        </div>
                      </div>
                    </div>

                    {/* Live Component Widget */}
                    <div
                      className="p-5 rounded-2xl bg-[#0E121E] border flex items-center justify-between"
                      style={{ borderColor: `${accentColor}30` }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full animate-ping"
                          style={{ backgroundColor: accentColor }}
                        />
                        <span className="font-mono text-xs text-white/80">
                          Bespoke Dark Mode Architecture Configured
                        </span>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{
                          backgroundColor: `${accentColor}20`,
                          color: accentColor,
                        }}
                      >
                        Verified
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. BUILD TAB VIEW */}
                {activeTab === "build" && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-[#07090F] border border-white/10 font-mono text-xs space-y-2 text-white/80">
                      <div className="flex items-center justify-between text-white/40 pb-2 border-b border-white/10">
                        <span>terminal — next build</span>
                        <span style={{ color: accentColor }}>edge runtime</span>
                      </div>
                      <div className="text-emerald-400">✓ Latest version Next JS Server Actions compiled</div>
                      <div className="text-cyan-400">✓ Vercel Edge Cache Mumbai: 24ms roundtrip</div>
                      <div className="text-white/70">✓ WhatsApp Business Cloud Webhook: active</div>
                      <div style={{ color: accentColor }}>✓ 31/31 Static Routes Prerendered</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Performance", score: "100" },
                        { label: "Accessibility", score: "100" },
                        { label: "SEO Score", score: "100" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="p-3.5 rounded-xl bg-[#0E121E] border text-center space-y-1"
                          style={{ borderColor: `${accentColor}30` }}
                        >
                          <div
                            className="font-mono font-black text-xl"
                            style={{ color: accentColor }}
                          >
                            {item.score}
                          </div>
                          <div className="font-mono text-[10px] text-white/60">{item.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleRunBuild}
                        disabled={isBuilding}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-mono text-xs font-semibold shadow-md transition-all"
                        style={{ backgroundColor: accentColor }}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{isBuilding ? "Simulating Edge Build..." : "Run Edge Benchmark"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. GROW TAB VIEW */}
                {activeTab === "grow" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div
                        className="p-4 rounded-xl bg-[#0E121E] border space-y-1"
                        style={{ borderColor: `${accentColor}30` }}
                      >
                        <span className="font-mono text-[10px] uppercase text-white/50">Conversion Boost</span>
                        <div className="font-heading font-black text-2xl text-emerald-400">+340%</div>
                        <span className="text-[11px] text-white/60">vs legacy WordPress</span>
                      </div>
                      <div
                        className="p-4 rounded-xl bg-[#0E121E] border space-y-1"
                        style={{ borderColor: `${accentColor}30` }}
                      >
                        <span className="font-mono text-[10px] uppercase text-white/50">WhatsApp Inquiries</span>
                        <div className="font-heading font-black text-2xl" style={{ color: accentColor }}>
                          24/7 AI
                        </div>
                        <span className="text-[11px] text-white/60">Zero dropped leads</span>
                      </div>
                      <div
                        className="p-4 rounded-xl bg-[#0E121E] border space-y-1"
                        style={{ borderColor: `${accentColor}30` }}
                      >
                        <span className="font-mono text-[10px] uppercase text-white/50">Edge Response</span>
                        <div className="font-heading font-black text-2xl text-cyan-400">38ms</div>
                        <span className="text-[11px] text-white/60">Mumbai Anycast POP</span>
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-xl bg-[#0E121E] border flex items-center justify-between"
                      style={{ borderColor: `${accentColor}30` }}
                    >
                      <div className="space-y-0.5">
                        <div className="font-heading font-bold text-sm text-white">
                          Automated WhatsApp Lead Closer Engine
                        </div>
                        <p className="font-body text-xs text-white/70">
                          Pre-trained on your product catalog, pricing matrices, and booking rules.
                        </p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{
                          backgroundColor: `${accentColor}20`,
                          color: accentColor,
                        }}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default InteractiveStudio;
