"use client";

import React from "react";
import { enterpriseData } from "../data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function EnterpriseWorkflowDiagram() {
  return (
    <section id="workflow" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#1F9D6B]/20 text-[#1F9D6B] mb-3 border border-[#1F9D6B]/30">
          EVENT-DRIVEN FLOW
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Autonomous Lead-to-Invoice Lifecycle
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8]">
          Eliminate manual handoffs. How our enterprise automation engine coordinates every step in sub-seconds.
        </p>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="bg-[#112646] p-6 sm:p-10 rounded-3xl border border-[#2F6FD6]/30 shadow-lg relative overflow-hidden">
        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {enterpriseData.workflowSteps.map((s, idx) => (
            <div key={s.step} className="flex flex-col items-center text-center relative">
              <div className="w-full p-5 rounded-2xl bg-[#0B1B33] border border-[#2F6FD6]/30 hover:border-[#1F9D6B]/60 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2F6FD6]/20 text-[#2F6FD6] mb-2">
                    STEP {s.step}
                  </span>
                  <h4 className="font-bold text-sm text-white mb-1.5">{s.label}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#2F6FD6]/20 flex items-center justify-center text-[#1F9D6B] text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Automated
                </div>
              </div>

              {/* Connecting Arrow for Desktop */}
              {idx < enterpriseData.workflowSteps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#2F6FD6] items-center justify-center text-white shadow-md">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Telemetry Footer Band */}
        <div className="mt-8 pt-6 border-t border-[#2F6FD6]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F9D6B] animate-pulse" />
            <span className="font-mono text-white">Average Event Propagation: 480ms</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Webhook Protocols: HTTPS TLS 1.3</span>
            <span>Database: PostgreSQL 16</span>
          </div>
        </div>
      </div>
    </section>
  );
}

