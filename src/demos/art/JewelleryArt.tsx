import React from 'react';

export function JewelleryArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background Arch */}
      <path d="M 60 260 L 60 120 Q 60 30 160 30 Q 260 30 260 120 L 260 260 Z" fill="#F8F2E4" stroke="#B8943E" strokeWidth="2" opacity="0.6" />
      {/* Handcrafted Solitaire Diamond Cut */}
      <polygon points="160,65 195,95 180,140 140,140 125,95" fill="#F8F2E4" stroke="#151515" strokeWidth="2" />
      <polygon points="160,65 180,95 160,140 140,95" fill="#B8943E" fillOpacity="0.3" stroke="#B8943E" strokeWidth="1.5" />
      {/* Diamond Sparkle Rays */}
      <line x1="160" y1="46" x2="160" y2="56" stroke="#B8943E" strokeWidth="2" strokeLinecap="round" />
      <line x1="208" y1="84" x2="218" y2="80" stroke="#B8943E" strokeWidth="2" strokeLinecap="round" />
      <line x1="112" y1="84" x2="102" y2="80" stroke="#B8943E" strokeWidth="2" strokeLinecap="round" />
      {/* Heirloom Pearl Necklace Strand */}
      <path d="M 90 150 Q 160 240 230 150" stroke="#B8943E" strokeWidth="2" strokeDasharray="6 6" fill="none" />
      {/* Gold Ring Silhouette with Solitaire Setting */}
      <circle cx="160" cy="205" r="28" stroke="#151515" strokeWidth="4" fill="none" />
      <circle cx="160" cy="205" r="24" stroke="#B8943E" strokeWidth="2" fill="none" />
      <polygon points="160,170 168,180 160,188 152,180" fill="#F8F2E4" stroke="#151515" strokeWidth="1.5" />
      {/* Display Base Line */}
      <line x1="40" y1="260" x2="280" y2="260" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default JewelleryArt;
