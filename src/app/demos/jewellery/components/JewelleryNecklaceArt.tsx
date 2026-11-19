"use client";

import React from "react";

export function JewelleryNecklaceArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-[0_16px_36px_rgba(201,162,75,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldLuster" x1="100" y1="40" x2="300" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9E8B2" />
            <stop offset="0.3" stopColor="#D4A745" />
            <stop offset="0.7" stopColor="#B28224" />
            <stop offset="1" stopColor="#F9E8B2" />
          </linearGradient>
          <linearGradient id="gemEmerald" x1="180" y1="180" x2="220" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="0.7" stopColor="#047857" />
            <stop offset="1" stopColor="#064E3B" />
          </linearGradient>
          <linearGradient id="polkiGrad" x1="190" y1="130" x2="210" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#E0F2FE" />
            <stop offset="1" stopColor="#BAE6FD" />
          </linearGradient>
          <radialGradient id="necklaceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Warm Golden Halo */}
        <circle cx="200" cy="150" r="140" fill="url(#necklaceGlow)" />

        {/* Outer Jewellery Presentation Platter Ring */}
        <circle
          cx="200"
          cy="150"
          r="125"
          fill="#15151A"
          stroke="#C9A24B"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />

        {/* Primary Gold Chain Curve */}
        <path
          d="M 100 80 C 100 190 140 215 200 215 C 260 215 300 190 300 80"
          stroke="url(#goldLuster)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Secondary Inner Delicate Link */}
        <path
          d="M 120 85 C 120 170 150 195 200 195 C 250 195 280 170 280 85"
          stroke="#C9A24B"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 3"
        />

        {/* Kundan & Polki Petal Clusters */}
        {[
          { cx: 130, cy: 125, r: 8 },
          { cx: 150, cy: 155, r: 9 },
          { cx: 175, cy: 180, r: 10 },
          { cx: 200, cy: 190, r: 13 }, // Center master medallion
          { cx: 225, cy: 180, r: 10 },
          { cx: 250, cy: 155, r: 9 },
          { cx: 270, cy: 125, r: 8 },
        ].map((gem, i) => (
          <g key={i}>
            {/* Gold Bezel Setting */}
            <circle cx={gem.cx} cy={gem.cy} r={gem.r + 3} fill="url(#goldLuster)" stroke="#785514" strokeWidth="1" />
            {/* Cut Stone / Polki Foil */}
            <circle cx={gem.cx} cy={gem.cy} r={gem.r} fill="url(#polkiGrad)" />
            {/* Micro Gold Prongs */}
            <circle cx={gem.cx - gem.r} cy={gem.cy} r="1.5" fill="#F9E8B2" />
            <circle cx={gem.cx + gem.r} cy={gem.cy} r="1.5" fill="#F9E8B2" />
            <circle cx={gem.cx} cy={gem.cy - gem.r} r="1.5" fill="#F9E8B2" />
            <circle cx={gem.cx} cy={gem.cy + gem.r} r="1.5" fill="#F9E8B2" />
          </g>
        ))}

        {/* Center Zambian Drop Emerald Pendant */}
        <g transform="translate(185, 205)">
          {/* Connector loop */}
          <rect x="13" y="0" width="4" height="6" fill="#D4A745" rx="1" />
          {/* Pear Cut Emerald Drop */}
          <path
            d="M 15 6 C 7 14 3 24 3 32 C 3 40 8 46 15 46 C 22 46 27 40 27 32 C 27 24 23 14 15 6 Z"
            fill="url(#gemEmerald)"
            stroke="url(#goldLuster)"
            strokeWidth="2"
          />
          {/* Facet Reflection */}
          <path
            d="M 15 12 L 10 30 L 15 40 L 20 30 Z"
            fill="#34D399"
            opacity="0.4"
          />
        </g>

        {/* Hanging Natural Seed Pearl Drops */}
        {[150, 175, 225, 250].map((x, idx) => (
          <g key={idx} transform={`translate(${x}, ${idx === 1 || idx === 2 ? 193 : 167})`}>
            <line x1="0" y1="0" x2="0" y2="8" stroke="#D4A745" strokeWidth="1.5" />
            <circle cx="0" cy="11" r="3.5" fill="#FFFBEB" stroke="#D4A745" strokeWidth="0.8" />
          </g>
        ))}

        {/* BIS Hallmark Authentic Stamp Badge */}
        <g transform="translate(40, 225)">
          <rect width="135" height="30" rx="6" fill="#15151A" stroke="#C9A24B" strokeWidth="1" />
          <polygon points="16,10 22,22 10,22" fill="#C9A24B" />
          <text x="28" y="20" fill="#E8D9B5" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            BIS 916 HALLMARKED
          </text>
        </g>
      </svg>
    </div>
  );
}

