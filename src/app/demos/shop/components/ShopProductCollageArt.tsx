"use client";

import React from "react";

export function ShopProductCollageArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-[0_16px_36px_rgba(59,63,216,0.20)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="indigoCard" x1="40" y1="40" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B3FD8" />
            <stop offset="1" stopColor="#1E229A" />
          </linearGradient>
          <linearGradient id="orangeGlow" x1="200" y1="120" x2="360" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF7A1A" />
            <stop offset="1" stopColor="#D95800" />
          </linearGradient>
          <radialGradient id="shopGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B3FD8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3B3FD8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="200" cy="150" r="140" fill="url(#shopGlow)" />

        {/* Card 1: Back Left Card (Bottle / Kitchen) */}
        <g transform="translate(60, 45) rotate(-6)">
          <rect width="130" height="150" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.06))" />
          <rect x="15" y="15" width="100" height="85" rx="10" fill="#EEF2FF" />
          {/* Stylized Bottle in card */}
          <rect x="52" y="30" width="26" height="52" rx="6" fill="#3B3FD8" />
          <rect x="58" y="22" width="14" height="8" rx="2" fill="#1E229A" />
          <rect x="20" y="110" width="70" height="8" rx="4" fill="#14161C" />
          <rect x="20" y="125" width="40" height="8" rx="4" fill="#3B3FD8" />
        </g>

        {/* Card 2: Back Right Card (Earbuds / Gadgets) */}
        <g transform="translate(205, 50) rotate(5)">
          <rect width="130" height="150" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.06))" />
          <rect x="15" y="15" width="100" height="85" rx="10" fill="#FFF7ED" />
          {/* Stylized Earbuds Case */}
          <rect x="42" y="38" width="46" height="38" rx="12" fill="#FF7A1A" />
          <circle cx="65" cy="57" r="4" fill="#FFFFFF" />
          <rect x="20" y="110" width="60" height="8" rx="4" fill="#14161C" />
          <rect x="20" y="125" width="45" height="8" rx="4" fill="#FF7A1A" />
        </g>

        {/* Card 3: Foreground Center Main Hero Card */}
        <g transform="translate(115, 95)">
          <rect width="170" height="175" rx="20" fill="#FFFFFF" stroke="#3B3FD8" strokeWidth="2.5" filter="drop-shadow(0 16px 32px rgba(59,63,216,0.18))" />
          {/* Image Stage */}
          <rect x="15" y="15" width="140" height="95" rx="12" fill="url(#indigoCard)" />
          {/* Cast Iron Skillet / Lifestyle Motif */}
          <circle cx="85" cy="58" r="28" fill="#14161C" stroke="#FF7A1A" strokeWidth="2.5" />
          <line x1="110" y1="72" x2="132" y2="86" stroke="#14161C" strokeWidth="6" strokeLinecap="round" />
          {/* Star Rating */}
          <g transform="translate(20, 120)">
            <text x="0" y="10" fill="#FF7A1A" fontSize="12" fontWeight="bold">★★★★★</text>
            <text x="56" y="10" fill="#667085" fontSize="10">(1.4k)</text>
          </g>
          {/* Product Title */}
          <text x="20" y="146" fill="#14161C" fontSize="12" fontWeight="bold">Cast Iron Tawa</text>
          {/* Price */}
          <text x="20" y="162" fill="#3B3FD8" fontSize="14" fontWeight="bold">₹1,299</text>
          <text x="75" y="162" fill="#94A3B8" fontSize="11" textDecoration="line-through">₹1,899</text>
        </g>

        {/* Floating Badge: Free delivery over ₹499 */}
        <g transform="translate(30, 215)">
          <rect width="165" height="34" rx="17" fill="#16A34A" filter="drop-shadow(0 6px 12px rgba(22,163,74,0.3))" />
          <circle cx="18" cy="17" r="7" fill="#FFFFFF" />
          <path d="M 15 17 L 17 19 L 21 14" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="32" y="21" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            Free Delivery Over ₹499
          </text>
        </g>

        {/* 48hr Metro Dispatch Tag */}
        <g transform="translate(250, 20)">
          <rect width="120" height="26" rx="13" fill="#14161C" />
          <text x="60" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
            ⚡ 48H Dispatch
          </text>
        </g>
      </svg>
    </div>
  );
}

