"use client";

import React from "react";

export function ClinicStethoscopeArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-[0_16px_36px_rgba(15,138,138,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tealGrad" x1="80" y1="60" x2="320" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F8A8A" />
            <stop offset="0.6" stopColor="#14A3A3" />
            <stop offset="1" stopColor="#0A5E5E" />
          </linearGradient>
          <linearGradient id="tubeGrad" x1="100" y1="120" x2="300" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E2A32" />
            <stop offset="0.5" stopColor="#334654" />
            <stop offset="1" stopColor="#1E2A32" />
          </linearGradient>
          <radialGradient id="clinicGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F8A8A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0F8A8A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Soft Glow */}
        <circle cx="200" cy="150" r="140" fill="url(#clinicGlow)" />

        {/* Outer Circular Shield Badge */}
        <circle
          cx="200"
          cy="150"
          r="115"
          fill="#FFFFFF"
          stroke="#0F8A8A"
          strokeWidth="3"
          strokeDasharray="6 4"
        />

        {/* Medical Cross Centerpiece */}
        <rect x="180" y="85" width="40" height="90" rx="8" fill="url(#tealGrad)" />
        <rect x="155" y="110" width="90" height="40" rx="8" fill="url(#tealGrad)" />

        {/* Heartbeat EKG Pulse Line */}
        <path
          d="M 120 150 L 160 150 L 172 135 L 184 165 L 196 120 L 208 170 L 220 145 L 230 150 L 280 150"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stethoscope Tubing & Binaural Headpiece */}
        <path
          d="M 130 95 C 130 140 150 195 200 205 C 250 195 270 140 270 95"
          stroke="url(#tubeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Earpieces */}
        <circle cx="130" cy="95" r="7" fill="#0F8A8A" stroke="#1E2A32" strokeWidth="2" />
        <circle cx="270" cy="95" r="7" fill="#0F8A8A" stroke="#1E2A32" strokeWidth="2" />

        {/* Lower Tube & Chestpiece */}
        <path
          d="M 200 205 C 200 240 220 250 240 250"
          stroke="url(#tubeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="240" cy="250" r="18" fill="#FFFFFF" stroke="#0F8A8A" strokeWidth="4" />
        <circle cx="240" cy="250" r="8" fill="#14A3A3" />

        {/* Floating Verification Pill Badge */}
        <g transform="translate(45, 230)">
          <rect width="135" height="32" rx="16" fill="#1E2A32" />
          <circle cx="18" cy="16" r="6" fill="#10B981" />
          <text x="32" y="21" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="600">
            MCI Certified 2026
          </text>
        </g>
      </svg>
    </div>
  );
}

