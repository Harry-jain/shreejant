"use client";

import React from "react";

export function SalonArchArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="archGrad" x1="120" y1="40" x2="280" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(245, 230, 221)" />
            <stop offset="0.5" stopColor="rgb(234, 210, 198)" />
            <stop offset="1" stopColor="rgb(222, 194, 179)" />
          </linearGradient>
          <linearGradient id="roseGrad" x1="150" y1="120" x2="250" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(201, 138, 138)" />
            <stop offset="1" stopColor="rgb(164, 86, 95)" />
          </linearGradient>
          <linearGradient id="goldCap" x1="180" y1="100" x2="220" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(234, 211, 156)" />
            <stop offset="1" stopColor="rgb(196, 155, 75)" />
          </linearGradient>
          <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(201, 138, 138)" stopOpacity="0.30" />
            <stop offset="100%" stopColor="rgb(201, 138, 138)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Soft Glow */}
        <circle cx="200" cy="150" r="140" fill="url(#auraGlow)" />

        {/* Outer Architectural Sanctuary Arch */}
        <path
          d="M 120 260 L 120 120 C 120 75.8 155.8 40 200 40 C 244.2 40 280 75.8 280 120 L 280 260 Z"
          fill="url(#archGrad)"
          stroke="rgb(201, 138, 138)"
          strokeWidth="2"
        />

        {/* Inner Secondary Nested Arch */}
        <path
          d="M 140 260 L 140 130 C 140 96.8 166.8 70 200 70 C 233.2 70 260 96.8 260 130 L 260 260 Z"
          fill="rgb(251, 244, 239)"
          stroke="rgb(164, 86, 95)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Sunburst Botanical Rays */}
        <g stroke="rgb(201, 138, 138)" strokeWidth="1.5" opacity="0.6">
          <line x1="200" y1="75" x2="200" y2="90" />
          <line x1="175" y1="85" x2="185" y2="98" />
          <line x1="225" y1="85" x2="215" y2="98" />
          <line x1="155" y1="105" x2="168" y2="114" />
          <line x1="245" y1="105" x2="232" y2="114" />
        </g>

        {/* Dropper Cap */}
        <path d="M 194 110 C 194 105 197 102 200 102 C 203 102 206 105 206 110 L 206 116 L 194 116 Z" fill="rgb(43, 31, 31)" />
        <rect x="188" y="116" width="24" height="10" rx="2" fill="url(#goldCap)" />

        {/* Bottle Body */}
        <rect x="175" y="126" width="50" height="85" rx="10" fill="url(#roseGrad)" />
        {/* Label on Bottle */}
        <rect x="182" y="146" width="36" height="42" rx="4" fill="white" opacity="0.92" />
        <text x="200" y="162" textAnchor="middle" fill="rgb(43, 31, 31)" fontSize="6" fontFamily="serif" fontWeight="bold">
          AURA
        </text>
        <line x1="188" y1="167" x2="212" y2="167" stroke="rgb(164, 86, 95)" strokeWidth="0.8" />
        <text x="200" y="176" textAnchor="middle" fill="rgb(164, 86, 95)" fontSize="5" fontFamily="sans-serif">
          ELIXIR
        </text>

        {/* Second Smaller Cream Jar */}
        <rect x="228" y="175" width="42" height="36" rx="6" fill="white" stroke="rgb(201, 138, 138)" strokeWidth="1.5" />
        <rect x="226" y="168" width="46" height="8" rx="3" fill="url(#goldCap)" />
        <text x="249" y="196" textAnchor="middle" fill="rgb(164, 86, 95)" fontSize="6" fontFamily="serif">
          CRÈME
        </text>

        {/* Botanical Stem */}
        <path
          d="M 145 250 C 145 200 160 170 170 145"
          stroke="rgb(120, 101, 101)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="148" cy="225" rx="8" ry="4" transform="rotate(-30 148 225)" fill="rgb(164, 86, 95)" opacity="0.4" />
        <ellipse cx="158" cy="195" rx="8" ry="4" transform="rotate(-40 158 195)" fill="rgb(201, 138, 138)" opacity="0.6" />
        <ellipse cx="168" cy="165" rx="8" ry="4" transform="rotate(-35 168 165)" fill="rgb(164, 86, 95)" opacity="0.5" />
      </svg>
    </div>
  );
}
