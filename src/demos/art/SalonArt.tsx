import React from 'react';

export function SalonArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Vanity Arch Mirror */}
      <path d="M 80 260 L 80 120 Q 80 40 160 40 Q 240 40 240 120 L 240 260 Z" fill="rgb(247, 228, 222)" stroke="rgb(42, 42, 46)" strokeWidth="2.5" />
      {/* Inner Mirror Highlight */}
      <path d="M 100 240 L 100 125 Q 100 65 160 65 Q 220 65 220 125 L 220 240 Z" fill="rgb(255, 250, 247)" stroke="rgb(183, 110, 121)" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Perfume Atomizer Bottle */}
      <rect x="135" y="150" width="50" height="60" rx="8" fill="rgb(247, 228, 222)" stroke="rgb(42, 42, 46)" strokeWidth="2" />
      <rect x="150" y="132" width="20" height="18" rx="3" fill="rgb(183, 110, 121)" stroke="rgb(42, 42, 46)" strokeWidth="1.5" />
      <line x1="160" y1="126" x2="160" y2="132" stroke="rgb(42, 42, 46)" strokeWidth="2" />
      {/* Spray droplets */}
      <circle cx="178" cy="120" r="3" fill="rgb(183, 110, 121)" />
      <circle cx="190" cy="114" r="2" fill="rgb(183, 110, 121)" />
      <circle cx="186" cy="128" r="2" fill="rgb(183, 110, 121)" />
      {/* Shears / Comb motif */}
      <line x1="110" y1="230" x2="150" y2="190" stroke="rgb(42, 42, 46)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="106" cy="234" r="6" stroke="rgb(183, 110, 121)" strokeWidth="2" />
      <line x1="130" y1="230" x2="90" y2="190" stroke="rgb(42, 42, 46)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="134" cy="234" r="6" stroke="rgb(183, 110, 121)" strokeWidth="2" />
      {/* Table surface line */}
      <line x1="40" y1="260" x2="280" y2="260" stroke="rgb(42, 42, 46)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default SalonArt;
