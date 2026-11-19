import React from 'react';

export function GymArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Heavy Hex Dumbbell */}
      {/* Center Knurled Bar */}
      <rect x="100" y="132" width="120" height="16" rx="3" fill="#8A929C" stroke="#F5F6F7" strokeWidth="2" />
      <line x1="120" y1="132" x2="120" y2="148" stroke="#14161A" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="140" y1="132" x2="140" y2="148" stroke="#14161A" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="160" y1="132" x2="160" y2="148" stroke="#14161A" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="180" y1="132" x2="180" y2="148" stroke="#14161A" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="200" y1="132" x2="200" y2="148" stroke="#14161A" strokeWidth="1.5" strokeDasharray="2 2" />

      {/* Left Weight Plates */}
      <polygon points="65,95 95,95 105,140 95,185 65,185 55,140" fill="#1E2128" stroke="#E5262B" strokeWidth="2.5" />
      <polygon points="40,105 65,105 75,140 65,175 40,175 30,140" fill="#14161A" stroke="#F5F6F7" strokeWidth="2" />

      {/* Right Weight Plates */}
      <polygon points="255,95 225,95 215,140 225,185 255,185 265,140" fill="#1E2128" stroke="#E5262B" strokeWidth="2.5" />
      <polygon points="280,105 255,105 245,140 255,175 280,175 290,140" fill="#14161A" stroke="#F5F6F7" strokeWidth="2" />

      {/* Dynamic Speed Energy Rays */}
      <line x1="160" y1="60" x2="160" y2="90" stroke="#E5262B" strokeWidth="3" strokeLinecap="round" />
      <line x1="120" y1="75" x2="135" y2="98" stroke="#E5262B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="200" y1="75" x2="185" y2="98" stroke="#E5262B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Floor Base */}
      <line x1="40" y1="230" x2="280" y2="230" stroke="#8A929C" strokeWidth="2" strokeDasharray="6 6" />
    </svg>
  );
}

export default GymArt;
