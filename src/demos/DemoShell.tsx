import React from 'react';
import Link from 'next/link';
import { DemoConfig } from './demos.config';

export interface DemoShellProps {
  config: DemoConfig;
  initialEmbed?: boolean;
  children: React.ReactNode;
}

export function DemoShell({ children }: DemoShellProps) {
  return (
    <div className="relative min-h-screen">
      {/* Sample Site Static Banner */}
      <div className="bg-amber-400 text-black px-4 py-2 text-center text-xs sm:text-sm font-medium sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <span className="mx-auto">
          ⚠️ <strong>Sample site</strong> — not a real business. Built by SHREEJAN AI SOLUTIONS.
        </span>
        <Link
          href="/"
          className="text-black underline font-semibold text-xs ml-4 shrink-0 hover:opacity-80"
        >
          Return to Shreejan AI
        </Link>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default DemoShell;
