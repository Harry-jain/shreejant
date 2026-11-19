'use client';

import React from 'react';
import { CoverArtKind } from '@/types/blog';
import { IndiaMapCover } from '@/components/blog/IndiaMapCover';

export interface CoverArtProps {
  kind: CoverArtKind;
  className?: string;
}

export function CoverArt({ kind, className = '' }: CoverArtProps) {
  return (
    <div
      className={`w-full aspect-[16/10] overflow-hidden rounded-[16px] bg-[#0C0F1A] border border-black/10 dark:border-white/10 relative select-none ${className}`}
      aria-hidden="true"
    >
      {kind === 'chat' && <ChatCover />}
      {kind === 'bars' && <BarsCover />}
      {kind === 'browser' && <BrowserCover />}
      {kind === 'bot' && <BotCover />}
      {kind === 'dots' && <IndiaMapCover />}
    </div>
  );
}

// 1. CHAT COVER (Case Studies: Autonomous WhatsApp Booking Conversation)
function ChatCover() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full object-cover" aria-hidden="true">
      <defs>
        <linearGradient id="chatBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B0E18" />
          <stop offset="50%" stopColor="#111626" />
          <stop offset="100%" stopColor="#080A12" />
        </linearGradient>
        <linearGradient id="phoneGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E2438" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#121624" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <rect width="400" height="250" fill="url(#chatBg)" />

      {/* Decorative ambient blurred purple circles */}
      <circle cx="80" cy="60" r="60" fill="#7C5CFC" opacity="0.2" filter="blur(30px)" />
      <circle cx="320" cy="180" r="70" fill="#38BDF8" opacity="0.15" filter="blur(35px)" />

      {/* Phone chassis outline */}
      <rect
        x="115"
        y="18"
        width="170"
        height="214"
        rx="26"
        fill="url(#phoneGlow)"
        stroke="#7C5CFC"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Phone top speaker notch */}
      <rect x="175" y="27" width="50" height="4" rx="2" fill="#7C5CFC" fillOpacity="0.35" />

      {/* Bubble 1: Incoming customer appointment request */}
      <g className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none">
        <rect
          x="132"
          y="46"
          width="112"
          height="42"
          rx="12"
          fill="#1C2236"
          stroke="#7C5CFC"
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
        <rect x="142" y="57" width="75" height="5" rx="2.5" fill="#E2E8F0" fillOpacity="0.8" />
        <rect x="142" y="68" width="52" height="5" rx="2.5" fill="#94A3B8" fillOpacity="0.6" />
        <text x="232" y="82" fontSize="7" fill="#7C5CFC" opacity="0.8" textAnchor="end">10:42</text>
      </g>

      {/* Bubble 2: Outgoing AI agent instant response */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-x-1.5 motion-reduce:transform-none">
        <rect
          x="160"
          y="98"
          width="112"
          height="42"
          rx="12"
          fill="#7C5CFC"
          fillOpacity="0.25"
          stroke="#7C5CFC"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <rect x="170" y="109" width="82" height="5" rx="2.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="170" y="120" width="60" height="5" rx="2.5" fill="#A78BFA" fillOpacity="0.8" />
        <text x="260" y="134" fontSize="7" fill="#38BDF8" opacity="0.9" textAnchor="end">10:42</text>
      </g>

      {/* Bubble 3: Confirmed Booking with Check Badge */}
      <g className="transition-transform duration-300 ease-out group-hover:scale-[1.03] origin-center motion-reduce:transform-none">
        <rect
          x="138"
          y="150"
          width="128"
          height="46"
          rx="14"
          fill="#161C2C"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeOpacity="0.6"
        />
        <circle cx="158" cy="173" r="10" fill="#10B981" />
        <path d="M154 173 L157 176 L163 170" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="175" y="165" width="68" height="5" rx="2.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="175" y="175" width="48" height="4.5" rx="2.25" fill="#10B981" fillOpacity="0.85" />
      </g>
    </svg>
  );
}

// 2. BARS COVER (Economics & ROI: Build Once vs Keep Losing Enquiries)
function BarsCover() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full object-cover" aria-hidden="true">
      <defs>
        <linearGradient id="barsBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B0E18" />
          <stop offset="100%" stopColor="#111627" />
        </linearGradient>
        <linearGradient id="gradViolet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9D84FF" />
          <stop offset="100%" stopColor="#6847ED" />
        </linearGradient>
        <linearGradient id="gradMuted" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>

      <rect width="400" height="250" fill="url(#barsBg)" />

      {/* Grid reference hairlines */}
      <line x1="60" y1="70" x2="340" y2="70" stroke="#7C5CFC" strokeOpacity="0.1" strokeDasharray="3 3" />
      <line x1="60" y1="120" x2="340" y2="120" stroke="#7C5CFC" strokeOpacity="0.1" strokeDasharray="3 3" />
      <line x1="60" y1="170" x2="340" y2="170" stroke="#7C5CFC" strokeOpacity="0.1" strokeDasharray="3 3" />
      <line x1="60" y1="210" x2="340" y2="210" stroke="#7C5CFC" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Group 1: Decreasing bars (Legacy leakage) */}
      <g opacity="0.6">
        <rect x="80" y="110" width="28" height="100" rx="6" fill="url(#gradMuted)" />
        <rect x="118" y="140" width="28" height="70" rx="6" fill="url(#gradMuted)" />
        <rect x="156" y="165" width="28" height="45" rx="6" fill="url(#gradMuted)" />
      </g>

      {/* Group 2: Growing bars (Build once growth) with hover growth */}
      <g className="transition-transform duration-500 ease-out origin-bottom group-hover:scale-y-105 motion-reduce:transform-none">
        <rect x="220" y="145" width="30" height="65" rx="6" fill="url(#gradViolet)" />
        <rect x="260" y="105" width="30" height="105" rx="6" fill="url(#gradViolet)" />
        <rect x="300" y="60" width="30" height="150" rx="6" fill="url(#gradViolet)" />
      </g>

      {/* Rising ROI trendline */}
      <path
        d="M 80 180 Q 180 170, 220 145 T 320 50"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="transition-colors duration-300 group-hover:stroke-[#7C5CFC]"
      />

      {/* Glowing terminal node */}
      <circle cx="320" cy="50" r="6" fill="#38BDF8" className="transition-transform duration-300 group-hover:scale-125 origin-center motion-reduce:transform-none" />
      <circle cx="320" cy="50" r="14" fill="#38BDF8" opacity="0.25" filter="blur(3px)" />
    </svg>
  );
}

// 3. BROWSER COVER (Web Development: 5 Signs Your Website is Leaking Clients)
function BrowserCover() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full object-cover" aria-hidden="true">
      <defs>
        <linearGradient id="browserBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B0E18" />
          <stop offset="100%" stopColor="#111627" />
        </linearGradient>
      </defs>

      <rect width="400" height="250" fill="url(#browserBg)" />

      {/* Browser Wireframe Frame */}
      <rect
        x="45"
        y="25"
        width="310"
        height="198"
        rx="16"
        fill="#121626"
        stroke="#7C5CFC"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      {/* Browser Top Navigation Bar */}
      <line x1="45" y1="58" x2="355" y2="58" stroke="#7C5CFC" strokeOpacity="0.2" strokeWidth="1" />
      {/* 3 Window Controls */}
      <circle cx="64" cy="42" r="4" fill="#EF4444" fillOpacity="0.8" />
      <circle cx="77" cy="42" r="4" fill="#F59E0B" fillOpacity="0.8" />
      <circle cx="90" cy="42" r="4" fill="#10B981" fillOpacity="0.8" />
      {/* URL search pill */}
      <rect x="115" y="34" width="160" height="16" rx="8" fill="#1A2033" stroke="#7C5CFC" strokeWidth="0.8" strokeOpacity="0.2" />
      <rect x="125" y="40" width="80" height="4" rx="2" fill="#7C5CFC" fillOpacity="0.6" />

      {/* Wireframe Mock Layout */}
      <rect x="65" y="74" width="130" height="35" rx="6" fill="#1F263B" fillOpacity="0.8" />
      <rect x="210" y="74" width="125" height="35" rx="6" fill="#1F263B" fillOpacity="0.5" />
      <rect x="65" y="122" width="75" height="82" rx="8" fill="#1F263B" fillOpacity="0.6" />
      <rect x="150" y="122" width="75" height="82" rx="8" fill="#1F263B" fillOpacity="0.6" />
      <rect x="235" y="122" width="100" height="82" rx="8" fill="#1F263B" fillOpacity="0.6" />

      {/* 5 Numbered Warning Pins marking trouble spots */}
      {[
        { num: '1', cx: 125, cy: 90 },
        { num: '2', cx: 270, cy: 90 },
        { num: '3', cx: 102, cy: 155 },
        { num: '4', cx: 188, cy: 165 },
        { num: '5', cx: 285, cy: 160 },
      ].map((pin) => (
        <g
          key={pin.num}
          className="transition-transform duration-300 ease-out group-hover:scale-125 origin-center motion-reduce:transform-none"
          style={{ transformOrigin: `${pin.cx}px ${pin.cy}px` }}
        >
          <circle cx={pin.cx} cy={pin.cy} r="11" fill="#7C5CFC" />
          <circle cx={pin.cx} cy={pin.cy} r="16" fill="#7C5CFC" opacity="0.3" />
          <text
            x={pin.cx}
            y={pin.cy + 3.5}
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {pin.num}
          </text>
        </g>
      ))}
    </svg>
  );
}

// 4. BOT COVER (AI & Automation: Central Agent Hub with Connected Nodes)
function BotCover() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full object-cover" aria-hidden="true">
      <defs>
        <linearGradient id="botBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B0E18" />
          <stop offset="100%" stopColor="#111627" />
        </linearGradient>
      </defs>

      <rect width="400" height="250" fill="url(#botBg)" />

      <circle cx="200" cy="80" r="70" fill="#7C5CFC" opacity="0.25" filter="blur(30px)" />

      {/* Connecting Network Hairlines */}
      <path d="M 180 110 C 140 135, 105 140, 95 160" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
      <path d="M 200 115 L 200 160" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
      <path d="M 220 110 C 260 135, 295 140, 305 160" fill="none" stroke="#7C5CFC" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />

      {/* Central AI Bot Hub */}
      <g className="transition-transform duration-300 ease-out group-hover:scale-105 origin-center motion-reduce:transform-none">
        <rect
          x="150"
          y="42"
          width="100"
          height="68"
          rx="20"
          fill="#161C2C"
          stroke="#7C5CFC"
          strokeWidth="1.8"
          strokeOpacity="0.6"
        />
        <line x1="200" y1="42" x2="200" y2="30" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
        <circle cx="200" cy="27" r="4" fill="#38BDF8" />
        <circle cx="182" cy="74" r="5" fill="#38BDF8" />
        <circle cx="218" cy="74" r="5" fill="#38BDF8" />
        <path d="M 194 84 Q 200 88, 206 84" fill="none" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Nodes */}
      <g style={{ transformOrigin: '95px 185px' }}>
        <rect x="65" y="160" width="60" height="50" rx="12" fill="#161C2C" stroke="#7C5CFC" strokeWidth="1.2" strokeOpacity="0.4" />
        <rect x="74" y="169" width="42" height="6" rx="2" fill="#7C5CFC" fillOpacity="0.4" />
        <circle cx="82" cy="188" r="2.5" fill="#38BDF8" />
        <circle cx="95" cy="188" r="2.5" fill="#38BDF8" />
        <circle cx="108" cy="188" r="2.5" fill="#38BDF8" />
      </g>

      <g style={{ transformOrigin: '200px 185px' }}>
        <rect x="170" y="160" width="60" height="50" rx="12" fill="#161C2C" stroke="#7C5CFC" strokeWidth="1.2" strokeOpacity="0.4" />
        <circle cx="200" cy="183" r="11" fill="#7C5CFC" fillOpacity="0.2" stroke="#7C5CFC" strokeWidth="1" />
        <path d="M 195 183 L 198 186 L 205 180" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      <g style={{ transformOrigin: '305px 185px' }}>
        <rect x="275" y="160" width="60" height="50" rx="12" fill="#161C2C" stroke="#7C5CFC" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="285" y1="174" x2="325" y2="174" stroke="#7C5CFC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="285" y1="184" x2="325" y2="184" stroke="#7C5CFC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="285" y1="194" x2="325" y2="194" stroke="#7C5CFC" strokeWidth="1" strokeOpacity="0.4" />
      </g>
    </svg>
  );
}
