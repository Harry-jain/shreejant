import React from 'react';

export function RestaurantArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Platter Cloche (Serving Dome) */}
      <path d="M 60 190 Q 60 80 160 80 Q 260 80 260 190 Z" fill="white" stroke="rgb(43, 33, 24)" strokeWidth="2.5" />
      {/* Cloche Handle Knob */}
      <circle cx="160" cy="72" r="10" fill="rgb(194, 81, 46)" stroke="rgb(43, 33, 24)" strokeWidth="2" />
      {/* Accent Steam Swirls */}
      <path d="M 145 52 Q 150 40 145 30" stroke="rgb(194, 81, 46)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 160 54 Q 165 38 160 26" stroke="rgb(194, 81, 46)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 175 52 Q 180 40 175 30" stroke="rgb(194, 81, 46)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Cloche Plate Rim */}
      <rect x="40" y="190" width="240" height="14" rx="4" fill="rgb(194, 81, 46)" stroke="rgb(43, 33, 24)" strokeWidth="2" />
      <line x1="30" y1="206" x2="290" y2="206" stroke="rgb(43, 33, 24)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Botanical Herb / Basil Sprig */}
      <path d="M 160 216 Q 140 240 120 235" stroke="rgb(74, 83, 32)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 160 216 Q 180 240 200 235" stroke="rgb(74, 83, 32)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="120" cy="235" r="4" fill="rgb(74, 83, 32)" />
      <circle cx="200" cy="235" r="4" fill="rgb(74, 83, 32)" />
      {/* Dining Fork & Spoon Accents */}
      <line x1="60" y1="220" x2="60" y2="260" stroke="rgb(43, 33, 24)" strokeWidth="2" strokeLinecap="round" />
      <line x1="260" y1="220" x2="260" y2="260" stroke="rgb(43, 33, 24)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default RestaurantArt;
