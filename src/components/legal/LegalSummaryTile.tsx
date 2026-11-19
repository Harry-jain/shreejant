import React from "react";

interface LegalSummaryTileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function LegalSummaryTile({ icon, title, description }: LegalSummaryTileProps) {
  return (
    <div className="flex flex-col h-full p-5 rounded-2xl bg-[#0E121E]/90 border border-white/10 hover:border-[#7C5CFC]/40 transition-all backdrop-blur-xl shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/25 text-[#A78BFA] flex items-center justify-center mb-3.5 shrink-0">
        {icon}
      </div>
      <h3 className="font-heading font-semibold text-white text-sm sm:text-base mb-1.5">
        {title}
      </h3>
      <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
