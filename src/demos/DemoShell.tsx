import React from 'react';
import Link from 'next/link';
import { DemoConfig } from './demos.config';

export interface DemoShellProps {
  config?: DemoConfig;
  initialEmbed?: boolean;
  children: React.ReactNode;
}

export function DemoShell({ children }: DemoShellProps) {
  return (
    <div className="relative min-h-screen">
      {/* Sample Site Sticky Top Bar */}
      <aside
        aria-label="Demo Disclaimer Banner"
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-medium bg-amber-400 text-stone-900 border-b border-amber-500/30 shadow-sm"
      >
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded bg-stone-900 text-amber-300">
            Demo
          </span>
          <span>
            <strong>Sample site — not a real business</strong>
          </span>
        </div>
        <Link
          href="/"
          className="underline font-semibold text-xs ml-4 shrink-0 hover:opacity-80 transition-opacity"
        >
          ← Return to Shreejan AI Solutions
        </Link>
      </aside>
      <main>{children}</main>
    </div>
  );
}

export default DemoShell;
