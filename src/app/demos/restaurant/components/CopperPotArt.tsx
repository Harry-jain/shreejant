"use client";

import React from "react";

export function CopperPotArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="copperGrad" x1="120" y1="80" x2="280" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(217, 119, 54)" />
            <stop offset="0.3" stopColor="rgb(226, 148, 82)" />
            <stop offset="0.7" stopColor="rgb(184, 93, 38)" />
            <stop offset="1" stopColor="rgb(122, 52, 20)" />
          </linearGradient>
          <linearGradient id="brassLid" x1="140" y1="60" x2="260" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(245, 208, 97)" />
            <stop offset="0.5" stopColor="rgb(200, 150, 62)" />
            <stop offset="1" stopColor="rgb(138, 98, 20)" />
          </linearGradient>
          <radialGradient id="steamGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(200, 150, 62)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(200, 150, 62)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Warm Golden Glow Backdrop */}
        <circle cx="200" cy="150" r="115" fill="url(#steamGlow)" />
        <circle cx="200" cy="150" r="95" stroke="rgb(200, 150, 62)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

        {/* Steaming Waves */}
        <path d="M 180 55 Q 170 35 185 20" stroke="rgb(200, 150, 62)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 200 48 Q 215 28 200 12" stroke="rgb(200, 150, 62)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d="M 220 55 Q 230 35 215 20" stroke="rgb(200, 150, 62)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

        {/* Lid Finial Knob */}
        <circle cx="200" cy="62" r="9" fill="url(#brassLid)" stroke="rgb(42, 26, 26)" strokeWidth="2" />
        <rect x="196" y="70" width="8" height="6" fill="rgb(138, 98, 20)" />

        {/* Handi Lid Dome */}
        <path
          d="M 140 92 C 140 68 260 68 260 92 Z"
          fill="url(#brassLid)"
          stroke="rgb(42, 26, 26)"
          strokeWidth="2"
        />

        {/* Pot Body */}
        <path
          d="M 132 94 C 110 140 110 205 140 230 C 170 248 230 248 260 230 C 290 205 290 140 268 94 Z"
          fill="url(#copperGrad)"
          stroke="rgb(42, 26, 26)"
          strokeWidth="2"
        />

        {/* Dimples Effect */}
        <g opacity="0.4" fill="rgb(92, 37, 14)">
          <circle cx="150" cy="130" r="4" />
          <circle cx="170" cy="122" r="4.5" />
          <circle cx="195" cy="118" r="4" />
          <circle cx="220" cy="120" r="4.5" />
          <circle cx="245" cy="128" r="4" />

          <circle cx="140" cy="160" r="4.5" />
          <circle cx="165" cy="155" r="5" />
          <circle cx="195" cy="150" r="5" />
          <circle cx="225" cy="152" r="5" />
          <circle cx="255" cy="158" r="4.5" />
        </g>

        {/* Side Handles */}
        <path d="M 125 110 C 95 110 95 140 122 142" stroke="url(#brassLid)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 275 110 C 305 110 305 140 278 142" stroke="url(#brassLid)" strokeWidth="6" strokeLinecap="round" />

        {/* Base Stand Ring */}
        <ellipse cx="200" cy="235" rx="55" ry="10" fill="rgb(42, 26, 26)" />
        <ellipse cx="200" cy="233" rx="50" ry="8" fill="url(#brassLid)" stroke="rgb(42, 26, 26)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default CopperPotArt;
