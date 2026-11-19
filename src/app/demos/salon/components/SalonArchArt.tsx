"use client";

import React from "react";

export function SalonArchArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-[0_16px_36px_rgba(164,86,95,0.20)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="archGrad" x1="120" y1="40" x2="280" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5E6DD" />
            <stop offset="0.5" stopColor="#EAD2C6" />
            <stop offset="1" stopColor="#DEC2B3" />
          </linearGradient>
          <linearGradient id="roseGrad" x1="150" y1="120" x2="250" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C98A8A" />
            <stop offset="1" stopColor="#A4565F" />
          </linearGradient>
          <linearGradient id="goldCap" x1="180" y1="100" x2="220" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EAD39C" />
            <stop offset="1" stopColor="#C49B4B" />
          </linearGradient>
          <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C98A8A" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#C98A8A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Soft Glow */}
        <circle cx="200" cy="150" r="140" fill="url(#auraGlow)" />

        {/* Outer Architectural Sanctuary Arch */}
        <path
          d="M 120 260 L 120 120 C 120 75.8 155.8 40 200 40 C 244.2 40 280 75.8 280 120 L 280 260 Z"
          fill="url(#archGrad)"
          stroke="#C98A8A"
          strokeWidth="2"
        />

        {/* Inner Secondary Nested Arch */}
        <path
          d="M 140 260 L 140 130 C 140 96.8 166.8 70 200 70 C 233.2 70 260 96.8 260 130 L 260 260 Z"
          fill="#FBF4EF"
          stroke="#A4565F"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Sunburst Botanical Rays */}
        <g stroke="#C98A8A" strokeWidth="1.5" opacity="0.6">
          <line x1="200" y1="75" x2="200" y2="90" />
          <line x1="175" y1="85" x2="185" y2="98" />
          <line x1="225" y1="85" x2="215" y2="98" />
          <line x1="155" y1="105" x2="168" y2="114" />
          <line x1="245" y1="105" x2="232" y2="114" />
        </g>

        {/* Luxury Cosmetic Dropper Bottle */}
        {/* Dropper Cap */}
        <path d="M 194 110 C 194 105 197 102 200 102 C 203 102 206 105 206 110 L 206 116 L 194 116 Z" fill="#2B1F1F" />
        <rect x="188" y="116" width="24" height="10" rx="2" fill="url(#goldCap)" />

        {/* Bottle Body */}
        <rect x="175" y="126" width="50" height="85" rx="10" fill="url(#roseGrad)" />
        {/* Label on Bottle */}
        <rect x="182" y="146" width="36" height="42" rx="4" fill="#FFFFFF" opacity="0.92" />
        <text x="200" y="162" textAnchor="middle" fill="#2B1F1F" fontSize="6" fontFamily="serif" fontWeight="bold">
          AURA
        </text>
        <line x1="188" y1="167" x2="212" y2="167" stroke="#A4565F" strokeWidth="0.8" />
        <text x="200" y="176" textAnchor="middle" fill="#A4565F" fontSize="5" fontFamily="sans-serif">
          ELIXIR
        </text>

        {/* Second Smaller Cream Jar */}
        <rect x="228" y="175" width="42" height="36" rx="6" fill="#FFFFFF" stroke="#C98A8A" strokeWidth="1.5" />
        <rect x="226" y="168" width="46" height="8" rx="3" fill="url(#goldCap)" />
        <text x="249" y="196" textAnchor="middle" fill="#A4565F" fontSize="6" fontFamily="serif">
          CRÈME
        </text>

        {/* Delicate Botanical Eucalyptus Leaf Stem */}
        <path
          d="M 145 250 C 145 200 160 170 170 145"
          stroke="#786565"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="148" cy="225" rx="8" ry="4" transform="rotate(-30 148 225)" fill="#A4565F" opacity="0.4" />
        <ellipse cx="158" cy="195" rx="8" ry="4" transform="rotate(-40 158 195)" fill="#C98A8A" opacity="0.6" />
        <ellipse cx="168" cy="165" rx="8" ry="4" transform="rotate(-35 168 165)" fill="#A4565F" opacity="0.5" />

        {/* Floating Tag */}
        <g transform="translate(60, 220)">
          <rect width="130" height="28" rx="14" fill="#FFFFFF" stroke="#A4565F" strokeWidth="1" />
          <circle cx="16" cy="14" r="4" fill="#A4565F" />
          <text x="28" y="18" fill="#2B1F1F" fontSize="10" fontFamily="serif" fontWeight="600">
            Cruelty-Free Actives
          </text>
        </g>
      </svg>
    </div>
  );
}

