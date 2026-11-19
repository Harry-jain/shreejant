"use client";

import React from "react";

export function GymBarbellArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      {/* Finished Olympic Barbell & Calibrated Plates Vector */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-[0_16px_36px_rgba(225,29,46,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gymBarMetal" x1="0" y1="150" x2="400" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A4F56" />
            <stop offset="0.3" stopColor="#8A929B" />
            <stop offset="0.5" stopColor="#CBD5E1" />
            <stop offset="0.7" stopColor="#8A929B" />
            <stop offset="1" stopColor="#3A3E45" />
          </linearGradient>
          <linearGradient id="gymRedPlate" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#E11D2E" />
            <stop offset="1" stopColor="#990E1B" />
          </linearGradient>
          <linearGradient id="gymSteelPlate" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#252A30" />
            <stop offset="1" stopColor="#14171A" />
          </linearGradient>
          <filter id="gymGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Background Subtle Aura */}
        <circle cx="200" cy="150" r="110" fill="#E11D2E" opacity="0.08" filter="url(#gymGlow)" />
        <circle cx="200" cy="150" r="85" stroke="#E11D2E" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />

        {/* Steel Barbell Shaft */}
        <rect x="25" y="145" width="350" height="10" rx="4" fill="url(#gymBarMetal)" stroke="#181B1F" strokeWidth="2" />
        
        {/* Knurling Texture Marks */}
        <line x1="90" y1="145" x2="90" y2="155" stroke="#181B1F" strokeWidth="1.5" opacity="0.6" />
        <line x1="130" y1="145" x2="130" y2="155" stroke="#181B1F" strokeWidth="1.5" opacity="0.6" />
        <line x1="270" y1="145" x2="270" y2="155" stroke="#181B1F" strokeWidth="1.5" opacity="0.6" />
        <line x1="310" y1="145" x2="310" y2="155" stroke="#181B1F" strokeWidth="1.5" opacity="0.6" />

        {/* Left Inside Collar */}
        <rect x="100" y="132" width="12" height="36" rx="3" fill="#252A30" stroke="#E11D2E" strokeWidth="2" />
        {/* Right Inside Collar */}
        <rect x="288" y="132" width="12" height="36" rx="3" fill="#252A30" stroke="#E11D2E" strokeWidth="2" />

        {/* Left Bumper Plates (25kg Red Calibrated) */}
        <rect x="82" y="70" width="16" height="160" rx="6" fill="url(#gymRedPlate)" stroke="#111317" strokeWidth="2" />
        <rect x="66" y="80" width="14" height="140" rx="5" fill="url(#gymSteelPlate)" stroke="#E11D2E" strokeWidth="2" />
        <rect x="52" y="92" width="12" height="116" rx="4" fill="url(#gymSteelPlate)" stroke="#111317" strokeWidth="2" />

        {/* Right Bumper Plates (25kg Red Calibrated) */}
        <rect x="302" y="70" width="16" height="160" rx="6" fill="url(#gymRedPlate)" stroke="#111317" strokeWidth="2" />
        <rect x="320" y="80" width="14" height="140" rx="5" fill="url(#gymSteelPlate)" stroke="#E11D2E" strokeWidth="2" />
        <rect x="336" y="92" width="12" height="116" rx="4" fill="url(#gymSteelPlate)" stroke="#111317" strokeWidth="2" />

        {/* Barbell Sleeve End Caps with Red Center Badge */}
        <circle cx="36" cy="150" r="7" fill="#E11D2E" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="364" cy="150" r="7" fill="#E11D2E" stroke="#CBD5E1" strokeWidth="2" />

        {/* Center Weight Indicator Badge */}
        <g transform="translate(160, 115)">
          <rect width="80" height="70" rx="14" fill="#181B1F" stroke="#E11D2E" strokeWidth="2" />
          <text x="40" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontFamily="monospace" fontWeight="bold">
            220 KG
          </text>
          <text x="40" y="48" textAnchor="middle" fill="#E11D2E" fontSize="9" fontFamily="monospace" fontWeight="bold">
            CALIBRATED
          </text>
          <text x="40" y="60" textAnchor="middle" fill="#9AA0A6" fontSize="7" fontFamily="monospace">
            ELEIKO IPF
          </text>
        </g>
      </svg>
    </div>
  );
}

export default GymBarbellArt;

