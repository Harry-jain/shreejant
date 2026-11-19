"use client";

import React from "react";

export function ClassesStackedArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-[0_16px_36px_rgba(124,92,255,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purpleGrad" x1="60" y1="40" x2="200" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#5130D4" />
          </linearGradient>
          <linearGradient id="yellowGrad" x1="200" y1="40" x2="340" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC93C" />
            <stop offset="1" stopColor="#E29400" />
          </linearGradient>
          <linearGradient id="roseTile" x1="60" y1="150" x2="200" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899" />
            <stop offset="1" stopColor="#BE185D" />
          </linearGradient>
          <linearGradient id="tealTile" x1="200" y1="150" x2="340" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06B6D4" />
            <stop offset="1" stopColor="#0E7490" />
          </linearGradient>
          <radialGradient id="classesGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="200" cy="150" r="140" fill="url(#classesGlow)" />

        {/* 2x2 Rounded Tile Grid */}
        {/* Tile 1: Top Left - Dance Figure (Violet) */}
        <g transform="translate(65, 40)">
          <rect width="125" height="100" rx="18" fill="url(#purpleGrad)" filter="drop-shadow(0 8px 16px rgba(124,92,255,0.3))" />
          {/* Stylized Dance Figure */}
          <circle cx="62" cy="30" r="8" fill="#FFFFFF" />
          <path d="M 62 42 L 62 65 M 62 50 L 45 38 M 62 50 L 78 40 M 62 65 L 50 82 M 62 65 L 75 78" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="62" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">DANCE</text>
        </g>

        {/* Tile 2: Top Right - Music Notes (Yellow) */}
        <g transform="translate(210, 40)">
          <rect width="125" height="100" rx="18" fill="url(#yellowGrad)" filter="drop-shadow(0 8px 16px rgba(255,201,60,0.3))" />
          {/* Music Note */}
          <path d="M 52 68 L 52 35 L 76 28 L 76 60 M 52 44 L 76 37" stroke="#2A1B5C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="45" cy="68" r="7" fill="#2A1B5C" />
          <circle cx="69" cy="60" r="7" fill="#2A1B5C" />
          <text x="62" y="94" textAnchor="middle" fill="#2A1B5C" fontSize="9" fontWeight="bold">MUSIC</text>
        </g>

        {/* Tile 3: Bottom Left - Paint Brush & Palette (Pink/Rose) */}
        <g transform="translate(65, 160)">
          <rect width="125" height="100" rx="18" fill="url(#roseTile)" filter="drop-shadow(0 8px 16px rgba(236,72,153,0.3))" />
          {/* Paint Brush & Palette */}
          <path d="M 45 45 C 45 35 75 35 75 48 C 75 58 65 65 55 65 C 48 65 45 55 45 45 Z" fill="#FFFFFF" />
          <circle cx="54" cy="42" r="3" fill="#EC4899" />
          <circle cx="64" cy="46" r="3" fill="#FFC93C" />
          {/* Brush */}
          <line x1="72" y1="30" x2="88" y2="16" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M 88 16 L 93 11" stroke="#FFC93C" strokeWidth="4" strokeLinecap="round" />
          <text x="62" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">FINE ART</text>
        </g>

        {/* Tile 4: Bottom Right - Dumbbell / Fitness (Cyan/Teal) */}
        <g transform="translate(210, 160)">
          <rect width="125" height="100" rx="18" fill="url(#tealTile)" filter="drop-shadow(0 8px 16px rgba(6,182,212,0.3))" />
          {/* Dumbbell */}
          <line x1="42" y1="48" x2="82" y2="48" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <rect x="36" y="36" width="6" height="24" rx="2" fill="#FFFFFF" />
          <rect x="42" y="40" width="4" height="16" rx="2" fill="#FFFFFF" />
          <rect x="82" y="40" width="4" height="16" rx="2" fill="#FFFFFF" />
          <rect x="86" y="36" width="6" height="24" rx="2" fill="#FFFFFF" />
          <text x="62" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">FITNESS</text>
        </g>

        {/* Center Connecting Badge */}
        <circle cx="200" cy="150" r="22" fill="#FFFFFF" stroke="#2A1B5C" strokeWidth="3" />
        <text x="200" y="154" textAnchor="middle" fill="#2A1B5C" fontSize="12" fontWeight="bold">
          ★
        </text>
      </svg>
    </div>
  );
}

