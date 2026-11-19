"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function DataFlowDiagram() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      num: "1",
      title: "Contact Form",
      desc: "Client submits project requirements via secure SSL form with Turnstile bot verification.",
    },
    {
      num: "2",
      title: "Our Database",
      desc: "Stored securely in cloud database (stored in India or the named region, see TODO) with Row-Level Security.",
    },
    {
      num: "3",
      title: "Team Alert",
      desc: "Internal alert dispatched to founding architects via encrypted Telegram and team email.",
    },
    {
      num: "4",
      title: "Reply Email",
      desc: "Confirmation auto-reply sent to client mailbox within minutes with discovery details.",
    },
    {
      num: "5",
      title: "Deletion on Request",
      desc: "All client contact details and brief permanently deleted upon email or WhatsApp request.",
    },
  ];

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-2xl bg-[#0A0D15]/80 border border-white/10 shadow-lg">
      <div className="mb-6">
        <h3 className="font-heading font-bold text-lg text-white mb-1">
          What Happens to Your Details (Lifecycle)
        </h3>
        <p className="font-body text-xs sm:text-sm text-white/60">
          Transparent, end-to-end trace of how your enquiry data flows from browser submission to permanent deletion.
        </p>
      </div>

      {/* Screen-reader accessible alternative list */}
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.num}>
            Step {s.num}: {s.title} — {s.desc}
          </li>
        ))}
      </ol>

      {/* Visual responsive SVG flow illustration */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full overflow-x-auto pb-4"
        aria-hidden="true"
      >
        <div className="min-w-[680px] grid grid-cols-5 gap-3 relative">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              {/* Connecting line between nodes */}
              {idx < steps.length - 1 && (
                <div className="absolute top-5 left-[50%] w-full h-[2px] bg-gradient-to-r from-[#7C5CFC]/60 to-[#A78BFA]/30 z-0" />
              )}

              {/* Node Badge */}
              <div className="w-10 h-10 rounded-full bg-[#111626] border-2 border-[#7C5CFC] text-[#A78BFA] font-mono text-xs font-bold flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(124,92,252,0.3)] mb-3">
                {step.num}
              </div>

              {/* Node Content Card */}
              <div className="w-full p-3 rounded-xl bg-[#0E121E] border border-white/[0.08] flex flex-col flex-1">
                <span className="font-heading font-semibold text-xs text-white mb-1">
                  {step.title}
                </span>
                <span className="font-body text-[11px] text-white/60 leading-relaxed">
                  {step.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
