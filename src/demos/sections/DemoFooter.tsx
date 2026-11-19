import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoFooter({ config }: { config: DemoConfig }) {
  const { name, tagline, domain, palette } = config;

  return (
    <footer className="w-full pt-12 pb-8 px-4 sm:px-8 border-t" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ONE Quiet Card for Reviews (Strict Rule: never invent reviews/ratings) */}
        <div
          className="p-6 rounded-2xl border text-center space-y-2 max-w-xl mx-auto shadow-sm"
          style={{
            backgroundColor: palette.bg,
            borderColor: `${palette.accent}30`,
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: palette.accent }}>
            Social Proof & Verification
          </span>
          <p className="text-sm font-semibold" style={{ color: palette.ink }}>
            Your customer reviews show here.
          </p>
          <p className="text-xs opacity-75 max-w-sm mx-auto" style={{ color: palette.ink }}>
            Sync live Google Business reviews, video testimonials, and verified customer ratings directly.
          </p>
        </div>

        {/* Footer Bottom Links & Info */}
        <div className="pt-6 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-75" style={{ color: palette.ink }}>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{name}</span>
            <span>•</span>
            <span className="font-mono">{domain}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#demo-note" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#demo-note" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#demo-note" className="hover:underline">Support</a>
          </div>

          <p className="text-[11px] font-mono">
            Sample template designed by Shreejan AI Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}

export default DemoFooter;
