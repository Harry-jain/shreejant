"use client";

import React from "react";
import { enterpriseData } from "../data";
import { Globe, GitMerge, MessageSquare, Bot, Database, Headset } from "lucide-react";

const CAP_ICONS: Record<string, React.ReactNode> = {
  platforms: <Globe className="w-5 h-5 text-[#2F6FD6]" />,
  automation: <GitMerge className="w-5 h-5 text-[#2F6FD6]" />,
  whatsapp: <MessageSquare className="w-5 h-5 text-[#1F9D6B]" />,
  "ai-assistants": <Bot className="w-5 h-5 text-[#2F6FD6]" />,
  integrations: <Database className="w-5 h-5 text-[#2F6FD6]" />,
  support: <Headset className="w-5 h-5 text-[#1F9D6B]" />,
};

export function EnterpriseCapabilitiesGrid() {
  return (
    <section id="capabilities" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#2F6FD6]/15 text-[#2F6FD6] mb-3 border border-[#2F6FD6]/30">
          SYSTEM CAPABILITIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Engineered for High-Throughput Reliability
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8]">
          Transparent project tiers with full database and software IP ownership handed over on day of completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enterpriseData.capabilities.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-2xl bg-[#112646] border border-[#2F6FD6]/25 hover:border-[#2F6FD6]/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B1B33] flex items-center justify-center border border-[#2F6FD6]/30">
                  {CAP_ICONS[c.id]}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2F6FD6]/15 text-[#F3F6FA] border border-[#2F6FD6]/30">
                  {c.badge}
                </span>
              </div>

              <h3 className="font-bold text-lg text-white mb-2">{c.title}</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                {c.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#2F6FD6]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block">Investment</span>
                <span className="text-sm font-bold text-[#1F9D6B]">{c.price}</span>
              </div>
              <a
                href="#consultation"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#2F6FD6] text-white hover:bg-[#255BB3] transition-colors"
              >
                Scope Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

