"use client";

import React from "react";

export function EnterpriseArchitectureArt() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-[380px] drop-shadow-[0_16px_36px_rgba(47,111,214,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nodeBlue" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#2F6FD6" />
            <stop offset="1" stopColor="#1E4BA0" />
          </linearGradient>
          <linearGradient id="nodeGreen" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1F9D6B" />
            <stop offset="1" stopColor="#126845" />
          </linearGradient>
          <linearGradient id="nodeDark" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#1B3153" />
            <stop offset="1" stopColor="#0B1B33" />
          </linearGradient>
          <radialGradient id="entGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2F6FD6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2F6FD6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="200" cy="150" r="140" fill="url(#entGlow)" />

        {/* Animated Dashed Connecting Lines */}
        {/* Node 1 to Node 2 */}
        <line
          x1="100"
          y1="85"
          x2="200"
          y2="85"
          stroke="#2F6FD6"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        {/* Node 2 to Node 3 (Diagonal) */}
        <line
          x1="200"
          y1="85"
          x2="200"
          y2="215"
          stroke="#1F9D6B"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />
        {/* Node 2 to Node 4 */}
        <line
          x1="200"
          y1="85"
          x2="300"
          y2="85"
          stroke="#2F6FD6"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        {/* Node 3 to Node 4 */}
        <line
          x1="200"
          y1="215"
          x2="300"
          y2="215"
          stroke="#2F6FD6"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        {/* Node 1 to Node 3 */}
        <line
          x1="100"
          y1="85"
          x2="200"
          y2="215"
          stroke="#4A5A70"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Node 1: Customers / Inbound Traffic */}
        <g transform="translate(50, 55)">
          <rect width="100" height="60" rx="12" fill="url(#nodeDark)" stroke="#2F6FD6" strokeWidth="1.5" />
          <circle cx="25" cy="30" r="8" fill="#2F6FD6" />
          <text x="42" y="27" fill="#F3F6FA" fontSize="10" fontWeight="bold">Customers</text>
          <text x="42" y="39" fill="#94A3B8" fontSize="8">Web & Inbound</text>
        </g>

        {/* Node 2: WhatsApp & Cloud API */}
        <g transform="translate(150, 55)">
          <rect width="100" height="60" rx="12" fill="url(#nodeBlue)" stroke="#F3F6FA" strokeWidth="1" />
          <circle cx="25" cy="30" r="8" fill="#1F9D6B" />
          <text x="42" y="27" fill="#FFFFFF" fontSize="10" fontWeight="bold">WhatsApp API</text>
          <text x="42" y="39" fill="#E2E8F0" fontSize="8">Meta Cloud 24/7</text>
        </g>

        {/* Node 3: Centerpiece - AI Assistant & RAG Engine */}
        <g transform="translate(140, 185)">
          <rect width="120" height="65" rx="14" fill="url(#nodeGreen)" stroke="#FFFFFF" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(31,157,107,0.3))" />
          <circle cx="25" cy="32" r="10" fill="#FFFFFF" />
          <text x="25" y="36" textAnchor="middle" fill="#1F9D6B" fontSize="12" fontWeight="bold">AI</text>
          <text x="44" y="28" fill="#FFFFFF" fontSize="11" fontWeight="bold">Nexus RAG</text>
          <text x="44" y="42" fill="#E2E8F0" fontSize="8">Sub-800ms Decision</text>
        </g>

        {/* Node 4: CRM, ERP & Financial Accounts */}
        <g transform="translate(260, 185)">
          <rect width="100" height="65" rx="12" fill="url(#nodeDark)" stroke="#2F6FD6" strokeWidth="1.5" />
          <circle cx="25" cy="32" r="8" fill="#2F6FD6" />
          <text x="42" y="28" fill="#F3F6FA" fontSize="10" fontWeight="bold">CRM & ERP</text>
          <text x="42" y="42" fill="#94A3B8" fontSize="8">Tally / Zoho / SAP</text>
        </g>

        {/* Telemetry pill */}
        <g transform="translate(130, 265)">
          <rect width="140" height="24" rx="12" fill="#112646" stroke="#1F9D6B" strokeWidth="1" />
          <circle cx="16" cy="12" r="4" fill="#1F9D6B" />
          <text x="26" y="15" fill="#F3F6FA" fontSize="9" fontWeight="bold">99.98% High-Availability</text>
        </g>
      </svg>
    </div>
  );
}

