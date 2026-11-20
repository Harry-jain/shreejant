import React from 'react';

export function ClinicArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Medical Cross Badge */}
      <rect x="70" y="50" width="180" height="180" rx="28" fill="white" stroke="rgb(14, 124, 134)" strokeWidth="2.5" />
      {/* Precision Cross */}
      <path d="M 160 85 L 160 195 M 105 140 L 215 140" stroke="rgb(14, 124, 134)" strokeWidth="14" strokeLinecap="round" />
      <path d="M 160 90 L 160 190 M 110 140 L 210 140" stroke="rgb(228, 244, 241)" strokeWidth="6" strokeLinecap="round" />
      {/* Stethoscope Outline */}
      <path d="M 120 70 C 90 90 90 180 140 210 Q 160 220 180 210 C 230 180 230 90 200 70" stroke="rgb(18, 52, 59)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="160" cy="225" r="9" fill="rgb(14, 124, 134)" stroke="rgb(18, 52, 59)" strokeWidth="2" />
      {/* Vital Pulse Line */}
      <path d="M 40 250 L 100 250 L 115 235 L 130 265 L 145 225 L 160 270 L 175 245 L 190 255 L 205 250 L 280 250" stroke="rgb(14, 124, 134)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ClinicArt;
