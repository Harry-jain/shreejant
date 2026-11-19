import React from 'react';

export function GeneralArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background card / browser window */}
      <rect x="30" y="40" width="260" height="200" rx="12" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2.5" />
      {/* Window header */}
      <path d="M 30 52 Q 30 40 42 40 L 278 40 Q 290 40 290 52 L 290 74 L 30 74 Z" fill="#F1F5F9" stroke="#1F2937" strokeWidth="2.5" />
      {/* Window control dots */}
      <circle cx="50" cy="57" r="4.5" fill="#38BDF8" />
      <circle cx="66" cy="57" r="4.5" fill="#1F2937" />
      <circle cx="82" cy="57" r="4.5" fill="#1F2937" opacity="0.3" />
      {/* Mini URL pill */}
      <rect x="110" y="49" width="130" height="16" rx="8" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1" />
      {/* Growth Chart bars */}
      <rect x="60" y="170" width="28" height="50" rx="4" fill="#F1F5F9" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="104" y="140" width="28" height="80" rx="4" fill="#F1F5F9" stroke="#1F2937" strokeWidth="1.5" />
      <rect x="148" y="110" width="28" height="110" rx="4" fill="#38BDF8" stroke="#1F2937" strokeWidth="2" />
      <rect x="192" y="90" width="28" height="130" rx="4" fill="#1F2937" stroke="#1F2937" strokeWidth="1.5" />
      {/* Upward trend curve */}
      <path d="M 50 185 Q 110 160 155 105 T 235 75" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" />
      {/* Arrowhead */}
      <polygon points="235,70 245,75 237,85" fill="#38BDF8" />
      {/* Accent sparkles / geometric stars */}
      <path d="M 255 125 L 260 140 L 275 145 L 260 150 L 255 165 L 250 150 L 235 145 L 250 140 Z" fill="#38BDF8" />
      <circle cx="80" cy="110" r="3" fill="#38BDF8" />
      {/* Base shadow */}
      <line x1="20" y1="260" x2="300" y2="260" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default GeneralArt;
