"use client";

import React from "react";
import { enterpriseData } from "../data";
import { ShieldCheck, Cpu, Layers, Box, Terminal, Zap } from "lucide-react";

const CLIENT_ICONS = [
  <Layers key="1" className="w-5 h-5" />,
  <Cpu key="2" className="w-5 h-5" />,
  <Box key="3" className="w-5 h-5" />,
  <Terminal key="4" className="w-5 h-5" />,
  <ShieldCheck key="5" className="w-5 h-5" />,
  <Zap key="6" className="w-5 h-5" />,
];

export function EnterpriseClientLogoStrip() {
  return (
    <section id="clients" className="py-12 border-y border-[#2F6FD6]/20 bg-[#112646]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-8">
          TRUSTED FOR CRITICAL REVENUE & OPERATIONS AUTOMATION
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {enterpriseData.clientLogos.map((c, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center p-4 rounded-xl border border-transparent hover:border-[#2F6FD6]/30 hover:bg-[#112646] transition-all cursor-default"
            >
              <div className="text-[#94A3B8] group-hover:text-[#2F6FD6] transition-colors mb-2">
                {CLIENT_ICONS[i % CLIENT_ICONS.length]}
              </div>
              <span className="font-bold text-xs sm:text-sm text-[#94A3B8] group-hover:text-white transition-colors text-center">
                {c.name}
              </span>
              <span className="text-[10px] text-[#94A3B8]/60 mt-0.5">
                {c.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

