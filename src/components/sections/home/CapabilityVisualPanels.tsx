"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  Zap,
  MessageSquare,
  Cpu,
  Database,
  ArrowRight,
  Check,
  CheckCheck,
  Activity,
  Server,
  Workflow,
} from "lucide-react";

// =========================================================================
// 1. SPEED / LATENCY METER (Frontend Performance)
// =========================================================================
export function SpeedLatencyMeterVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [ping, setPing] = useState(34);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setPing(Math.floor(28 + Math.random() * 10));
    }, 2400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const active = inView || prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-3 flex flex-col justify-between select-none overflow-hidden bg-[#07090F]"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-heading font-bold text-[10px] text-white">Edge Latency Radar</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[8px] font-mono text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>MUMBAI BOM-1</span>
        </div>
      </div>

      {/* Center Speedometer & Radar Pulse */}
      <div className="flex-1 flex items-center justify-around gap-2 my-auto py-1">
        
        {/* Speedometer Gauge Dial */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            {/* Background Arch */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="7"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
            />
            {/* Glowing Active Arc */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#speedGrad)"
              strokeWidth="7"
              strokeDasharray="251.2"
              strokeDashoffset={active ? 85 : 200}
              strokeLinecap="round"
              transition={{ duration: prefersReducedMotion ? 0 : 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="speedGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7C5CFC" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Latency Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono font-black text-xl text-white tracking-tight">
              {ping}
              <span className="text-[10px] text-emerald-400 ml-0.5 font-normal">ms</span>
            </span>
            <span className="font-mono text-[7px] text-white/50 uppercase tracking-widest">TTFB Edge</span>
          </div>
        </div>

        {/* Core Web Vitals Metric Badges */}
        <div className="flex flex-col gap-1.5 flex-1 max-w-[170px]">
          <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-[8px] font-mono">
            <span className="text-white/60">LCP (Largest Contentful)</span>
            <span className="text-emerald-400 font-bold">0.6s ✓</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-[8px] font-mono">
            <span className="text-white/60">CLS (Visual Stability)</span>
            <span className="text-emerald-400 font-bold">0.00 ✓</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-[8px] font-mono">
            <span className="text-white/60">Lighthouse Score</span>
            <span className="text-[#38BDF8] font-bold">100 / 100</span>
          </div>
        </div>

      </div>

      {/* Bottom Status Ticker */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[7.5px] font-mono text-white/40 shrink-0">
        <span>LATEST NEXT.JS APP ROUTER SSR</span>
        <span className="text-emerald-400 font-semibold">● SUB-50MS GUARANTEE</span>
      </div>
    </div>
  );
}

// =========================================================================
// 2. MINI CHAT THREAD (Autonomous AI & WhatsApp Agents)
// =========================================================================
export function WhatsAppChatThreadVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(2);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStep(2);
      return;
    }
    if (inView) {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 500);
      const t2 = setTimeout(() => setStep(2), 1200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [inView, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-3 flex flex-col justify-between select-none overflow-hidden bg-[#0A1016]"
    >
      {/* WhatsApp Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#0A1016]" />
          </div>
          <div>
            <span className="font-heading font-bold text-[10px] text-white block leading-tight">
              Shreejan AI Concierge
            </span>
            <span className="font-mono text-[7px] text-emerald-400 block leading-none">
              ● Online 24/7 (Multi-Lingual)
            </span>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[8px] font-mono text-emerald-400">
          WhatsApp Cloud API
        </div>
      </div>

      {/* Chat Thread Messages */}
      <div className="flex-1 flex flex-col justify-center gap-2 py-1 overflow-hidden">
        
        {/* Outgoing User Message */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 0 ? 1 : 0, y: step >= 0 ? 0 : 8 }}
          className="self-end max-w-[85%] p-2 rounded-2xl rounded-tr-sm bg-[#005C4B] text-white shadow-sm"
        >
          <p className="font-body text-[9px] leading-snug">
            Need a high-conversion flagship site for my retail brand. What is the turnaround?
          </p>
          <div className="flex items-center justify-end gap-1 mt-0.5 text-[7px] text-white/60 font-mono">
            <span>10:24 AM</span>
            <CheckCheck className="w-2.5 h-2.5 text-[#38BDF8]" />
          </div>
        </motion.div>

        {/* Incoming AI Reply */}
        <motion.div
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }}
          className="self-start max-w-[88%] p-2 rounded-2xl rounded-tl-sm bg-[#202C33] text-white shadow-sm border border-white/[0.06]"
        >
          <div className="flex items-center gap-1 mb-0.5 text-[7px] font-mono text-emerald-400 font-semibold">
            <span>⚡ Autonomous Sales Bot</span>
          </div>
          <p className="font-body text-[9px] leading-snug">
            Namaste! We engineer and launch production flagships in <strong>7–10 days</strong> with 100% code ownership. I can book your strategy call right now!
          </p>
          <div className="flex items-center justify-end gap-1 mt-0.5 text-[7px] text-white/40 font-mono">
            <span>10:24 AM</span>
          </div>
        </motion.div>

        {/* Typing indicator bubble */}
        {step < 2 && (
          <div className="self-start px-3 py-1.5 rounded-full bg-[#202C33] text-white/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[7.5px] font-mono text-white/40 shrink-0">
        <span>ENGLISH · HINDI · MARATHI SUPPORT</span>
        <span className="text-emerald-400 font-semibold">● 0ms HUMAN LATENCY</span>
      </div>
    </div>
  );
}

// =========================================================================
// 3. SYSTEM ARCHITECTURE DIAGRAM (Enterprise Platforms)
// =========================================================================
export function SystemArchitectureVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const nodes = [
    { title: "Client PWA", tech: "Latest Next.js", icon: Cpu, color: "#7C5CFC" },
    { title: "Edge Gateway", tech: "Vercel / Cloudflare", icon: Server, color: "#38BDF8" },
    { title: "Auth & RBAC", tech: "OAuth 2.0", icon: Zap, color: "#A78BFA" },
    { title: "Postgres DB", tech: "Prisma ORM", icon: Database, color: "#10B981" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-3 flex flex-col justify-between select-none overflow-hidden bg-[#07090F]"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="font-heading font-bold text-[10px] text-white">Cloud Architecture Schema</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[8px] font-mono text-[#38BDF8] font-bold">
          HIGH-CONCURRENCY
        </div>
      </div>

      {/* Nodes and Flow Lines */}
      <div className="flex-1 flex flex-col justify-center my-auto py-1">
        <div className="grid grid-cols-4 gap-2 relative">
          
          {/* Animated Connecting Signal Track */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-white/10 z-0 pointer-events-none">
            <motion.div
              animate={{
                x: ["0%", "100%"],
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2.2, repeat: Infinity, ease: "linear" }
              }
              className="w-12 h-full bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_8px_#38BDF8]"
            />
          </div>

          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={node.title}
                className="relative z-10 p-2 rounded-xl bg-[#0E121E] border border-white/10 flex flex-col items-center text-center shadow-lg"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-1 text-white shadow-md"
                  style={{ backgroundColor: `${node.color}25`, border: `1px solid ${node.color}60` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: node.color }} />
                </div>
                <span className="font-heading font-bold text-[9px] text-white truncate w-full">
                  {node.title}
                </span>
                <span className="font-mono text-[7px] text-white/50 truncate w-full">
                  {node.tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[7.5px] font-mono text-white/40 shrink-0">
        <span>TYPE-SAFE PRISMA SCHEMA</span>
        <span className="text-[#38BDF8] font-semibold">● RAZORPAY AUTOPAY READY</span>
      </div>
    </div>
  );
}

// =========================================================================
// 4. FLOW DIAGRAM (Workflow Automation)
// =========================================================================
export function WorkflowFlowDiagramVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    { step: "01", name: "Inbound Lead", sub: "WhatsApp / Web", color: "#F59E0B" },
    { step: "02", name: "AI Extraction", sub: "Zod Schema Parse", color: "#7C5CFC" },
    { step: "03", name: "CRM Record", sub: "Instant DB Sync", color: "#38BDF8" },
    { step: "04", name: "Alert Dispatched", sub: "Team WhatsApp", color: "#10B981" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-3 flex flex-col justify-between select-none overflow-hidden bg-[#07090F]"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-1.5">
          <Workflow className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-heading font-bold text-[10px] text-white">Zero Human Leakage Pipeline</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[8px] font-mono text-amber-400 font-bold">
          MAKE / N8N PIPELINE
        </div>
      </div>

      {/* Flow Steps Horizontal Pipeline */}
      <div className="flex-1 flex flex-col justify-center my-auto py-1">
        <div className="grid grid-cols-4 gap-1.5 relative items-center">
          
          {steps.map((st, i) => (
            <div key={st.step} className="flex flex-col items-center text-center relative z-10">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[9px] mb-1 text-white shadow-sm"
                style={{ backgroundColor: `${st.color}25`, border: `1.5px solid ${st.color}` }}
              >
                {st.step}
              </div>
              <span className="font-heading font-bold text-[8.5px] text-white truncate w-full">
                {st.name}
              </span>
              <span className="font-mono text-[7px] text-white/50 truncate w-full">
                {st.sub}
              </span>
            </div>
          ))}

          {/* Flow Arrows overlay */}
          <div className="absolute top-[14px] left-[18%] right-[18%] flex items-center justify-between pointer-events-none z-0">
            <ArrowRight className="w-3 h-3 text-white/20" />
            <ArrowRight className="w-3 h-3 text-white/20" />
            <ArrowRight className="w-3 h-3 text-white/20" />
          </div>

        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[7.5px] font-mono text-white/40 shrink-0">
        <span>END-TO-END WEBHOOKS</span>
        <span className="text-emerald-400 font-semibold">● 100% REVENUE RECOVERY</span>
      </div>
    </div>
  );
}

