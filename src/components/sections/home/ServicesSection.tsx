"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  MessageSquare,
  Code2,
  Zap,
  Play,
  Send,
  Check,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AuditCard } from "@/components/AuditCard";
import { useLanguage } from "@/i18n";
import {
  SpeedLatencyMeterVisual,
  WhatsAppChatThreadVisual,
  SystemArchitectureVisual,
  WorkflowFlowDiagramVisual,
} from "./CapabilityVisualPanels";

export function ServicesSection() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  // State for Card 1 Simulator (Live Edge Benchmark)
  const [edgePing, setEdgePing] = useState<number>(34);
  const [isPinging, setIsPinging] = useState(false);

  // State for Card 2 Simulator (WhatsApp AI Chat)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Namaste! Welcome to Shreejan AI. How can I help scale your business today?" },
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // State for Card 3 Simulator (Next.js Turbo Build)
  const [buildStatus, setBuildStatus] = useState<"idle" | "building" | "deployed">("deployed");

  // State for Card 4 Simulator (Pipeline Trigger)
  const [activePipelineStep, setActivePipelineStep] = useState<number>(3);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const runEdgePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setEdgePing(Math.floor(28 + Math.random() * 14));
      setIsPinging(false);
    }, 600);
  };

  const handleSendQuickQuery = (query: string) => {
    if (isAiTyping) return;
    setChatMessages((prev) => [...prev, { sender: "user", text: query }]);
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = "Slot confirmed! Staging preview ready in 7 business days.";
      if (query.includes("price") || query.includes("cost")) {
        reply = "Fixed milestone investment: Custom Flagship in 7-10 days with 100% code ownership.";
      } else if (query.includes("book") || query.includes("demo")) {
        reply = "I've reserved your 30-min strategy audit with our Mumbai senior engineering team!";
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsAiTyping(false);
    }, 700);
  };

  const runTurbopackBuild = () => {
    setBuildStatus("building");
    setTimeout(() => {
      setBuildStatus("deployed");
    }, 1100);
  };

  const triggerPipeline = () => {
    setIsPipelineRunning(true);
    setActivePipelineStep(0);
    setTimeout(() => setActivePipelineStep(1), 400);
    setTimeout(() => setActivePipelineStep(2), 800);
    setTimeout(() => {
      setActivePipelineStep(3);
      setIsPipelineRunning(false);
    }, 1200);
  };

  const services = [
    {
      num: "01",
      id: "ai-websites",
      title: "UI/UX & AI Web Flagships",
      badge: "FRONTEND EXCELLENCE",
      desc: "Custom high-conversion websites engineered with latest version Next JS SSR, sub-50ms TTFB, bespoke typography, and high-converting micro-interactions.",
      tags: ["LATEST NEXT.JS SSR", "3D MICRO-INTERACTIONS", "SUB-50MS TTFB", "SEO 100/100", "MOBILE-FIRST"],
      turnaround: "7–10 Business Days",
      icon: <Cpu className="w-5 h-5 text-[#7C5CFC]" />,
      href: "/services#ai-websites",
      simulatorTitle: "Edge Performance Benchmark",
    },
    {
      num: "02",
      id: "chatbots",
      title: "Autonomous AI & WhatsApp Agents",
      badge: "24/7 CONVERSION",
      desc: "Fine-tuned AI chatbots and voice agents trained on your catalogs, pricing, and FAQ that qualify leads and close customers while you sleep.",
      tags: ["WHATSAPP CLOUD API", "CATALOG RAG", "CALENDAR SYNC", "ZERO LATENCY", "HINDI & MARATHI"],
      turnaround: "5 Business Days",
      icon: <MessageSquare className="w-5 h-5 text-[#10B981]" />,
      href: "/services#ai-websites",
      simulatorTitle: "Live 24/7 WhatsApp AI Simulator",
    },
    {
      num: "03",
      id: "custom-apps",
      title: "Full-Stack Custom Web Platforms",
      badge: "ENTERPRISE ARCHITECTURE",
      desc: "Enterprise client dashboards, booking engines, inventory systems, and proprietary web portals built with rock-solid type safety and edge routing.",
      tags: ["REACT 19", "POSTGRESQL", "PRISMA ORM", "ROLE-BASED AUTH", "RAZORPAY INTEGRATION"],
      turnaround: "2–3 Weeks",
      icon: <Code2 className="w-5 h-5 text-[#38BDF8]" />,
      href: "/services#custom-web-apps",
      simulatorTitle: "Latest Next.js Turbo Build Engine",
    },
    {
      num: "04",
      id: "automations",
      title: "Business Workflow Automations",
      badge: "ZERO HUMAN LEAKAGE",
      desc: "Eliminate repetitive manual data entry. Connect CRM, email, WhatsApp, and accounting into autonomous revenue pipelines.",
      tags: ["MAKE / N8N", "REST APIS", "ZOD VALIDATION", "INVOICE TRIGGERS", "EXECUTIVE METRICS"],
      turnaround: "5–7 Days",
      icon: <Zap className="w-5 h-5 text-[#F59E0B]" />,
      href: "/services#custom-web-apps",
      simulatorTitle: "Real-Time Pipeline Trigger Simulator",
    },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden bg-transparent text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[radial-gradient(circle,rgba(124,92,252,0.18)_0%,transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="site-container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Capabilities</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-[-0.025em] leading-[1.06]">
            Four Ways We Make You{" "}
            <span className="inline-block bg-gradient-to-r from-[#7C5CFC] via-[#A78BFA] to-[#38BDF8] bg-clip-text text-transparent pb-1 pr-3 sm:pr-4 pl-1">
              Unstoppable
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            Click <span className="text-[#A78BFA] font-medium">&ldquo;Flip for Live Simulator&rdquo;</span> on any card to test drive our real-time interactive engineering prototypes.
          </p>
        </div>

        {/* 2x2 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16 [perspective:2000px] items-stretch">
          {services.map((svc, idx) => {
            const isFlipped = !!flippedCards[idx];

            const renderCapabilityVisual = (index: number) => {
              switch (index) {
                case 0:
                  return <SpeedLatencyMeterVisual />;
                case 1:
                  return <WhatsAppChatThreadVisual />;
                case 2:
                  return <SystemArchitectureVisual />;
                case 3:
                  return <WorkflowFlowDiagramVisual />;
                default:
                  return <SpeedLatencyMeterVisual />;
              }
            };

            return (
              <div
                key={svc.id}
                className="w-full min-h-[580px] sm:min-h-[610px] [perspective:1600px] select-none flex flex-col"
              >
                <motion.div
                  className="relative w-full h-full rounded-[28px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] flex flex-col"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT SIDE (Visual-First Presentation) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[28px] bg-gradient-to-br from-[#121626] via-[#0E111D] to-[#080A12] border border-white/12 p-6 sm:p-8 flex flex-col justify-between shadow-2xl [backface-visibility:hidden] overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* 1. Fixed-Height Visual Panel at Top (200px desktop, 180px mobile) */}
                    <div className="w-full h-[180px] sm:h-[200px] rounded-2xl overflow-hidden shrink-0 mb-5 bg-[#07090F] border border-white/[0.08] relative">
                      {renderCapabilityVisual(idx)}
                    </div>

                    <div>
                      {/* 2. Number & Badge Row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-[#A78BFA] px-2.5 py-0.5 rounded-full bg-[#7C5CFC]/20 border border-[#7C5CFC]/30">
                            {svc.num}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                            {svc.badge}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          {svc.icon}
                        </div>
                      </div>

                      {/* 3. Title */}
                      <h3 className="font-heading font-black text-2xl sm:text-[26px] text-white mb-2 tracking-tight">
                        {svc.title}
                      </h3>

                      {/* 4. Description */}
                      <p className="font-body text-sm sm:text-[15px] text-white/70 leading-relaxed mb-4">
                        {svc.desc}
                      </p>

                      {/* 5. Deliverables Tags (Sits directly under description) */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                        {svc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 6. Bottom Action Strip with 3D Flip Trigger (Pinned to bottom via mt-auto) */}
                    <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-xs text-white/60">
                        {svc.turnaround}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFlip(idx)}
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#121626]/90 hover:bg-[#181D33] border border-[#7C5CFC]/40 hover:border-[#7C5CFC] text-[#A78BFA] hover:text-white font-heading font-semibold text-xs tracking-tight shadow-[0_0_15px_rgba(124,92,252,0.3)] hover:scale-105 active:scale-95 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#A78BFA]" />
                        <span>Flip for Live Simulator</span>
                      </button>
                    </div>
                  </div>

                  {/* BACK SIDE (180deg Flipped — Direct Live Demo Inside!) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-[28px] bg-gradient-to-br from-[#161B2E] via-[#101422] to-[#0A0D15] border-2 border-[#7C5CFC]/60 p-6 sm:p-8 flex flex-col justify-between shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Top Simulator Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs font-bold text-[#A78BFA] uppercase tracking-wider">
                          {svc.simulatorTitle}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFlip(idx)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Flip Back</span>
                      </button>
                    </div>

                    {/* Live Interactive Simulator Body */}
                    <div className="my-auto py-3">
                      {/* Simulator 1: Edge Benchmark */}
                      {idx === 0 && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-mono text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-white/60">Target: Mumbai Edge POP</span>
                              <span className="text-emerald-400 font-bold">{edgePing}ms TTFB</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-400 to-[#7C5CFC] transition-all duration-300"
                                style={{ width: `${Math.min(100, (60 / edgePing) * 100)}%` }}
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-[11px]">
                              <div className="p-2 rounded-lg bg-white/5">
                                <span className="text-white/40 block text-[9.5px]">Delhi NCR</span>
                                <span className="text-white font-bold">{edgePing + 8}ms</span>
                              </div>
                              <div className="p-2 rounded-lg bg-white/5">
                                <span className="text-white/40 block text-[9.5px]">Bengaluru</span>
                                <span className="text-white font-bold">{edgePing + 4}ms</span>
                              </div>
                              <div className="p-2 rounded-lg bg-white/5">
                                <span className="text-white/40 block text-[9.5px]">Global Anycast</span>
                                <span className="text-white font-bold">{edgePing + 18}ms</span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={runEdgePing}
                            disabled={isPinging}
                            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 font-mono text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? "animate-spin" : ""}`} />
                            <span>{isPinging ? "Measuring Latency..." : "Run Real-time Ping"}</span>
                          </button>
                        </div>
                      )}

                      {/* Simulator 2: WhatsApp Chat Simulator */}
                      {idx === 1 && (
                        <div className="space-y-3">
                          <div className="p-3.5 rounded-2xl bg-[#090C14] border border-white/10 space-y-2 h-[180px] overflow-y-auto text-xs font-body">
                            {chatMessages.map((msg, mIdx) => (
                              <div
                                key={mIdx}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[85%] px-3.5 py-2 rounded-xl text-xs ${
                                    msg.sender === "user"
                                      ? "bg-[#7C5CFC] text-white rounded-tr-none"
                                      : "bg-white/10 text-white/90 rounded-tl-none"
                                  }`}
                                >
                                  {msg.text}
                                </div>
                              </div>
                            ))}
                            {isAiTyping && (
                              <div className="flex justify-start">
                                <div className="px-3 py-2 rounded-xl bg-white/10 text-white flex items-center gap-1 w-12">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.15s]" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.3s]" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {["What are your package prices?", "Book demo for tomorrow"].map((prompt) => (
                              <button
                                key={prompt}
                                type="button"
                                onClick={() => handleSendQuickQuery(prompt)}
                                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#7C5CFC]/30 border border-white/10 font-mono text-[10px] text-white/80 transition-colors"
                              >
                                💬 {prompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Simulator 3: Next.js Turbo Compiler */}
                      {idx === 2 && (
                        <div className="p-4 rounded-2xl bg-[#090C14] border border-white/10 space-y-2 font-mono text-xs">
                          <div className="flex items-center justify-between text-white/50 text-[10px] pb-1 border-b border-white/10">
                            <span>$ next build --turbo</span>
                            <span className="text-emerald-400 font-semibold">
                              {buildStatus === "building" ? "Compiling..." : "✓ Ready"}
                            </span>
                          </div>
                          <div className="space-y-1 text-white/80 py-1 text-[11px]">
                            <p className="text-white/60">→ Latest version Next JS Server-Side Rendering</p>
                            <p className="text-emerald-400">✓ 24 static & dynamic pages generated in 1.1s</p>
                            <p className="text-amber-300">⚡ 100/100 Core Web Vitals Guaranteed</p>
                          </div>
                          <button
                            type="button"
                            onClick={runTurbopackBuild}
                            disabled={buildStatus === "building"}
                            className="w-full mt-2 py-2 rounded-lg bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 border border-[#38BDF8]/40 font-mono text-[11px] text-[#38BDF8] flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>{buildStatus === "building" ? "Recompiling Turbopack..." : "Re-run Production Build"}</span>
                          </button>
                        </div>
                      )}

                      {/* Simulator 4: Node Pipeline Sandbox */}
                      {idx === 3 && (
                        <div className="space-y-2 font-mono text-xs">
                          <div className="space-y-1.5">
                            {[
                              { label: "New Lead Captured", time: "0.2s" },
                              { label: "AI Lead Scoring (94% Qualified)", time: "0.5s" },
                              { label: "Instant WhatsApp Alert Sent", time: "0.8s" },
                              { label: "Razorpay Invoice Auto-Generated", time: "1.1s" },
                            ].map((step, sIdx) => {
                              const isStepActive = activePipelineStep >= sIdx;
                              return (
                                <div
                                  key={sIdx}
                                  className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                                    isStepActive
                                      ? "bg-[#7C5CFC]/20 border-[#7C5CFC]/50 text-white"
                                      : "bg-white/5 border-white/10 text-white/40"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isStepActive ? "bg-emerald-400" : "bg-white/20"
                                      }`}
                                    />
                                    <span>{step.label}</span>
                                  </div>
                                  <span className="text-[10px] text-white/50">{step.time}</span>
                                </div>
                              );
                            })}
                          </div>
                          <button
                            type="button"
                            onClick={triggerPipeline}
                            disabled={isPipelineRunning}
                            className="w-full mt-2 py-2 rounded-lg bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 border border-[#F59E0B]/40 font-mono text-[11px] text-[#F59E0B] flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Zap className="w-3 h-3" />
                            <span>{isPipelineRunning ? "Running Pipeline..." : "⚡ Trigger Autonomous Pipeline"}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Strip on Back */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={svc.href}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#A78BFA] hover:text-white transition-colors"
                      >
                        <span>Full Architecture Deep Dive</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/contact"
                        className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-heading font-semibold hover:bg-[#7C5CFC] hover:text-white transition-colors"
                      >
                        Deploy This
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Audit Card */}
        <div className="max-w-2xl mx-auto">
          <AuditCard />
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
