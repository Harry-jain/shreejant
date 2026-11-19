import React from 'react';
import { IndustrySlug } from '@/data/industries';

export function SalonPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Header bar */}
      <rect x="24" y="20" width="120" height="14" rx="4" fill="#0A1628" />
      <rect x="360" y="18" width="96" height="20" rx="10" fill="#8A6214" />
      <line x1="24" y1="48" x2="456" y2="48" stroke="#E9DFC9" strokeWidth="1" />

      {/* Date Carousel Bar */}
      <rect x="24" y="62" width="70" height="42" rx="8" fill="#F3D9C4" stroke="#8A6214" strokeWidth="1.5" />
      <rect x="36" y="72" width="46" height="8" rx="2" fill="#8A6214" />
      <rect x="42" y="86" width="34" height="10" rx="2" fill="#0A1628" />

      <rect x="104" y="62" width="70" height="42" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
      <rect x="116" y="72" width="46" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      <rect x="122" y="86" width="34" height="10" rx="2" fill="#3D5278" opacity="0.6" />

      <rect x="184" y="62" width="70" height="42" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
      <rect x="196" y="72" width="46" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      <rect x="202" y="86" width="34" height="10" rx="2" fill="#3D5278" opacity="0.6" />

      {/* Service Selection Card */}
      <rect x="24" y="118" width="432" height="64" rx="10" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
      <circle cx="56" cy="150" r="16" fill="#F3D9C4" />
      {/* Scissors Icon */}
      <circle cx="52" cy="146" r="3" stroke="#8A6214" strokeWidth="1.5" />
      <circle cx="52" cy="154" r="3" stroke="#8A6214" strokeWidth="1.5" />
      <line x1="55" y1="147" x2="63" y2="153" stroke="#8A6214" strokeWidth="1.5" />
      <line x1="55" y1="153" x2="63" y2="147" stroke="#8A6214" strokeWidth="1.5" />

      <rect x="86" y="138" width="140" height="12" rx="3" fill="#0A1628" />
      <rect x="86" y="156" width="90" height="8" rx="2" fill="#3D5278" opacity="0.7" />
      <rect x="360" y="140" width="80" height="22" rx="6" fill="#8A6214" />

      {/* Available Slots Grid */}
      <rect x="24" y="196" width="100" height="10" rx="3" fill="#0A1628" />
      <g transform="translate(24, 218)">
        <rect x="0" y="0" width="98" height="34" rx="6" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
        <rect x="20" y="12" width="58" height="10" rx="2" fill="#8A6214" />
        <rect x="110" y="0" width="98" height="34" rx="6" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="130" y="12" width="58" height="10" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="220" y="0" width="98" height="34" rx="6" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="240" y="12" width="58" height="10" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="330" y="0" width="102" height="34" rx="6" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="350" y="12" width="62" height="10" rx="2" fill="#3D5278" opacity="0.6" />
      </g>

      {/* Instant WhatsApp Confirmation Banner */}
      <rect x="24" y="268" width="432" height="36" rx="8" fill="#E8D5A0" stroke="#8A6214" strokeWidth="1" />
      <circle cx="48" cy="286" r="8" fill="#25D366" />
      <rect x="66" y="281" width="180" height="10" rx="2" fill="#0A1628" />
    </svg>
  );
}

export function JewelleryPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Brand header */}
      <rect x="190" y="18" width="100" height="12" rx="3" fill="#0A1628" />
      <line x1="24" y1="42" x2="456" y2="42" stroke="#E8D5A0" strokeWidth="1" />

      {/* Arch Hero Window */}
      <path d="M 170 54 Q 240 40 310 54 L 310 134 L 170 134 Z" fill="#E8D5A0" opacity="0.4" stroke="#8A6214" strokeWidth="1.5" />
      {/* Diamond Motif */}
      <path d="M 240 70 L 254 84 L 240 98 L 226 84 Z" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
      <path d="M 233 84 L 247 84" stroke="#8A6214" strokeWidth="1" />
      <rect x="200" y="112" width="80" height="8" rx="2" fill="#0A1628" />

      {/* 3 Luxury Product Showcase Cards */}
      <g transform="translate(24, 150)">
        {/* Card 1 */}
        <rect x="0" y="0" width="134" height="150" rx="10" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
        <rect x="12" y="12" width="110" height="80" rx="6" fill="#E8D5A0" opacity="0.5" />
        <circle cx="67" cy="52" r="14" stroke="#8A6214" strokeWidth="1.5" fill="#FFFBF0" />
        <rect x="20" y="102" width="94" height="10" rx="2" fill="#0A1628" />
        <rect x="36" y="122" width="62" height="14" rx="4" fill="#8A6214" />

        {/* Card 2 */}
        <rect x="149" y="0" width="134" height="150" rx="10" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="161" y="12" width="110" height="80" rx="6" fill="#F3D9C4" opacity="0.5" />
        <path d="M 216 42 L 226 52 L 216 62 L 206 52 Z" stroke="#8A6214" strokeWidth="1.5" fill="#FFFBF0" />
        <rect x="169" y="102" width="94" height="10" rx="2" fill="#0A1628" />
        <rect x="185" y="122" width="62" height="14" rx="4" fill="#0A1628" opacity="0.8" />

        {/* Card 3 */}
        <rect x="298" y="0" width="134" height="150" rx="10" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="310" y="12" width="110" height="80" rx="6" fill="#E4DAF5" opacity="0.5" />
        <circle cx="365" cy="52" r="12" stroke="#8A6214" strokeWidth="1.5" strokeDasharray="3 2" fill="#FFFBF0" />
        <rect x="318" y="102" width="94" height="10" rx="2" fill="#0A1628" />
        <rect x="334" y="122" width="62" height="14" rx="4" fill="#0A1628" opacity="0.8" />
      </g>
    </svg>
  );
}

export function ClinicPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Top Clinic Branding with Cross Icon */}
      <rect x="24" y="18" width="24" height="24" rx="6" fill="#8A6214" />
      <path d="M 36 24 L 36 36 M 30 30 L 42 30" stroke="#FFF8E7" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="58" y="24" width="110" height="12" rx="3" fill="#0A1628" />
      <rect x="350" y="20" width="106" height="22" rx="6" fill="#8A6214" />
      <line x1="24" y1="52" x2="456" y2="52" stroke="#E9DFC9" strokeWidth="1" />

      {/* Doctor Profile Banner */}
      <rect x="24" y="66" width="432" height="88" rx="12" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
      <circle cx="74" cy="110" r="26" fill="#E4DAF5" stroke="#101828" strokeWidth="1.5" />
      {/* Stethoscope motif */}
      <path d="M 68 104 C 68 114 80 114 80 104 L 80 98" stroke="#8A6214" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="74" cy="118" r="3" fill="#8A6214" />
      <rect x="116" y="88" width="150" height="14" rx="3" fill="#0A1628" />
      <rect x="116" y="108" width="90" height="10" rx="2" fill="#8A6214" />
      <rect x="116" y="124" width="180" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      {/* Verified badge */}
      <rect x="354" y="88" width="86" height="20" rx="10" fill="#E8D5A0" />

      {/* Appointment Booking Selector */}
      <rect x="24" y="168" width="130" height="12" rx="3" fill="#0A1628" />

      {/* Time Slots Grid */}
      <g transform="translate(24, 192)">
        <rect x="0" y="0" width="134" height="44" rx="8" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
        <rect x="16" y="16" width="60" height="12" rx="2" fill="#8A6214" />
        <circle cx="114" cy="22" r="5" fill="#8A6214" />

        <rect x="149" y="0" width="134" height="44" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="165" y="16" width="60" height="12" rx="2" fill="#3D5278" opacity="0.6" />

        <rect x="298" y="0" width="134" height="44" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="314" y="16" width="60" height="12" rx="2" fill="#3D5278" opacity="0.6" />
      </g>

      {/* Consultation Confirmation CTA */}
      <rect x="24" y="252" width="432" height="44" rx="10" fill="#8A6214" />
      <rect x="170" y="268" width="140" height="12" rx="3" fill="#FFF8E7" />
    </svg>
  );
}

export function RestaurantPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Header bar */}
      <rect x="24" y="18" width="120" height="14" rx="3" fill="#0A1628" />
      <rect x="350" y="16" width="106" height="22" rx="6" fill="#8A6214" />
      <line x1="24" y1="46" x2="456" y2="46" stroke="#E9DFC9" strokeWidth="1" />

      {/* Menu Categories Pills */}
      <rect x="24" y="58" width="76" height="24" rx="12" fill="#8A6214" />
      <rect x="38" y="66" width="48" height="8" rx="2" fill="#FFF8E7" />
      <rect x="108" y="58" width="76" height="24" rx="12" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
      <rect x="122" y="66" width="48" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      <rect x="192" y="58" width="76" height="24" rx="12" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
      <rect x="206" y="66" width="48" height="8" rx="2" fill="#3D5278" opacity="0.6" />

      {/* Menu Item 1 (Highlighted with Veg badge) */}
      <rect x="24" y="96" width="432" height="60" rx="10" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
      {/* Veg Icon (Green square + dot) */}
      <rect x="40" y="112" width="14" height="14" rx="2" stroke="#25D366" strokeWidth="1.5" fill="none" />
      <circle cx="47" cy="119" r="3" fill="#25D366" />
      <rect x="66" y="110" width="140" height="12" rx="2" fill="#0A1628" />
      <rect x="66" y="128" width="190" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      <rect x="310" y="114" width="46" height="10" rx="2" fill="#8A6214" />
      <rect x="372" y="108" width="70" height="24" rx="6" fill="#8A6214" />

      {/* Menu Item 2 */}
      <rect x="24" y="164" width="432" height="60" rx="10" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
      <rect x="40" y="180" width="14" height="14" rx="2" stroke="#25D366" strokeWidth="1.5" fill="none" />
      <circle cx="47" cy="187" r="3" fill="#25D366" />
      <rect x="66" y="178" width="130" height="12" rx="2" fill="#0A1628" />
      <rect x="66" y="196" width="170" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      <rect x="310" y="182" width="46" height="10" rx="2" fill="#8A6214" />
      <rect x="372" y="176" width="70" height="24" rx="6" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />

      {/* Floating Order Cart Bar */}
      <rect x="24" y="244" width="432" height="52" rx="12" fill="#0A1628" />
      <circle cx="56" cy="270" r="12" fill="#8A6214" />
      <rect x="80" y="264" width="100" height="12" rx="2" fill="#FFF8E7" />
      <rect x="340" y="258" width="100" height="26" rx="8" fill="#8A6214" />
    </svg>
  );
}

export function GymPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Header bar */}
      <rect x="24" y="18" width="110" height="14" rx="3" fill="#0A1628" />
      <rect x="350" y="16" width="106" height="22" rx="6" fill="#8A6214" />
      <line x1="24" y1="46" x2="456" y2="46" stroke="#E9DFC9" strokeWidth="1" />

      {/* Class Schedule Timetable Grid */}
      <g transform="translate(24, 60)">
        {/* Row 1 */}
        <rect x="0" y="0" width="432" height="48" rx="8" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
        {/* Barbell Glyph */}
        <circle cx="30" cy="24" r="7" stroke="#8A6214" strokeWidth="1.5" />
        <line x1="24" y1="24" x2="36" y2="24" stroke="#8A6214" strokeWidth="2" />
        <rect x="52" y="18" width="100" height="12" rx="2" fill="#0A1628" />
        <rect x="180" y="18" width="60" height="12" rx="2" fill="#8A6214" />
        <rect x="330" y="12" width="88" height="24" rx="6" fill="#8A6214" />

        {/* Row 2 */}
        <rect x="0" y="56" width="432" height="48" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <circle cx="30" cy="80" r="7" stroke="#3D5278" strokeWidth="1.5" opacity="0.6" />
        <line x1="24" y1="80" x2="36" y2="80" stroke="#3D5278" strokeWidth="2" opacity="0.6" />
        <rect x="52" y="74" width="110" height="12" rx="2" fill="#0A1628" />
        <rect x="180" y="74" width="60" height="12" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="330" y="68" width="88" height="24" rx="6" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />

        {/* Row 3 */}
        <rect x="0" y="112" width="432" height="48" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <circle cx="30" cy="136" r="7" stroke="#3D5278" strokeWidth="1.5" opacity="0.6" />
        <line x1="24" y1="136" x2="36" y2="136" stroke="#3D5278" strokeWidth="2" opacity="0.6" />
        <rect x="52" y="130" width="90" height="12" rx="2" fill="#0A1628" />
        <rect x="180" y="130" width="60" height="12" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="330" y="124" width="88" height="24" rx="6" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
      </g>

      {/* Membership Plan Banner */}
      <rect x="24" y="234" width="432" height="64" rx="12" fill="#E8D5A0" stroke="#8A6214" strokeWidth="1.5" />
      <rect x="44" y="250" width="130" height="14" rx="3" fill="#0A1628" />
      <rect x="44" y="270" width="180" height="8" rx="2" fill="#3D5278" />
      <rect x="310" y="248" width="130" height="34" rx="8" fill="#8A6214" />
    </svg>
  );
}

export function ShopPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Store Header with Cart Icon */}
      <rect x="24" y="18" width="100" height="14" rx="3" fill="#0A1628" />
      {/* Shopping Bag Icon */}
      <path d="M 426 18 L 442 18 L 440 32 L 428 32 Z" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
      <path d="M 431 18 C 431 14 437 14 437 18" stroke="#8A6214" strokeWidth="1.5" fill="none" />
      <circle cx="446" cy="18" r="5" fill="#8A6214" />
      <line x1="24" y1="44" x2="456" y2="44" stroke="#E9DFC9" strokeWidth="1" />

      {/* 2x2 Product Grid */}
      <g transform="translate(24, 56)">
        {/* Item 1 */}
        <rect x="0" y="0" width="206" height="106" rx="8" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
        <rect x="10" y="10" width="80" height="86" rx="6" fill="#F3D9C4" />
        <rect x="102" y="18" width="90" height="12" rx="2" fill="#0A1628" />
        <rect x="102" y="38" width="60" height="10" rx="2" fill="#8A6214" />
        <rect x="102" y="66" width="94" height="24" rx="6" fill="#8A6214" />

        {/* Item 2 */}
        <rect x="226" y="0" width="206" height="106" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="236" y="10" width="80" height="86" rx="6" fill="#E8D5A0" />
        <rect x="328" y="18" width="90" height="12" rx="2" fill="#0A1628" />
        <rect x="328" y="38" width="60" height="10" rx="2" fill="#8A6214" />
        <rect x="328" y="66" width="94" height="24" rx="6" fill="#0A1628" opacity="0.8" />

        {/* Item 3 */}
        <rect x="0" y="118" width="206" height="106" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="10" y="128" width="80" height="86" rx="6" fill="#E4DAF5" />
        <rect x="102" y="136" width="90" height="12" rx="2" fill="#0A1628" />
        <rect x="102" y="156" width="60" height="10" rx="2" fill="#8A6214" />
        <rect x="102" y="184" width="94" height="24" rx="6" fill="#0A1628" opacity="0.8" />

        {/* Item 4 */}
        <rect x="226" y="118" width="206" height="106" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="236" y="128" width="80" height="86" rx="6" fill="#F3D9C4" />
        <rect x="328" y="136" width="90" height="12" rx="2" fill="#0A1628" />
        <rect x="328" y="156" width="60" height="10" rx="2" fill="#8A6214" />
        <rect x="328" y="184" width="94" height="24" rx="6" fill="#0A1628" opacity="0.8" />
      </g>

      {/* Express Checkout Strip */}
      <rect x="24" y="278" width="432" height="30" rx="6" fill="#E8D5A0" />
      <circle cx="48" cy="293" r="5" fill="#25D366" />
      <rect x="64" y="289" width="160" height="8" rx="2" fill="#0A1628" />
    </svg>
  );
}

export function ClassesPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Header bar with graduation cap motif */}
      <path d="M 32 20 L 44 14 L 56 20 L 44 26 Z" fill="#8A6214" />
      <line x1="56" y1="20" x2="56" y2="28" stroke="#8A6214" strokeWidth="1.5" />
      <rect x="68" y="18" width="130" height="14" rx="3" fill="#0A1628" />
      <rect x="350" y="16" width="106" height="22" rx="6" fill="#8A6214" />
      <line x1="24" y1="46" x2="456" y2="46" stroke="#E9DFC9" strokeWidth="1" />

      {/* Featured Course Card */}
      <rect x="24" y="58" width="432" height="108" rx="10" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
      <rect x="38" y="70" width="80" height="20" rx="10" fill="#E8D5A0" />
      <rect x="130" y="74" width="100" height="12" rx="2" fill="#0A1628" />
      <rect x="38" y="100" width="220" height="14" rx="3" fill="#0A1628" />
      <rect x="38" y="122" width="280" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      <rect x="38" y="136" width="240" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      <rect x="330" y="112" width="110" height="38" rx="8" fill="#8A6214" />

      {/* Upcoming Batches Selector */}
      <g transform="translate(24, 180)">
        <rect x="0" y="0" width="134" height="80" rx="8" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
        <rect x="14" y="14" width="70" height="10" rx="2" fill="#8A6214" />
        <rect x="14" y="32" width="100" height="12" rx="2" fill="#0A1628" />
        <rect x="14" y="52" width="80" height="16" rx="4" fill="#8A6214" />

        <rect x="149" y="0" width="134" height="80" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="163" y="14" width="70" height="10" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="163" y="32" width="100" height="12" rx="2" fill="#0A1628" />
        <rect x="163" y="52" width="80" height="16" rx="4" fill="#0A1628" opacity="0.8" />

        <rect x="298" y="0" width="134" height="80" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="312" y="14" width="70" height="10" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="312" y="32" width="100" height="12" rx="2" fill="#0A1628" />
        <rect x="312" y="52" width="80" height="16" rx="4" fill="#0A1628" opacity="0.8" />
      </g>

      {/* WhatsApp Inquiry Pill */}
      <rect x="24" y="274" width="432" height="34" rx="8" fill="#F3D9C4" />
      <circle cx="48" cy="291" r="7" fill="#25D366" />
      <rect x="66" y="287" width="180" height="8" rx="2" fill="#0A1628" />
    </svg>
  );
}

export function OtherPreview() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" fill="#FFFBF0" />
      {/* Header bar */}
      <rect x="24" y="18" width="120" height="14" rx="3" fill="#0A1628" />
      <rect x="350" y="16" width="106" height="22" rx="6" fill="#8A6214" />
      <line x1="24" y1="46" x2="456" y2="46" stroke="#E9DFC9" strokeWidth="1" />

      {/* Modern Flagship Hero Banner */}
      <rect x="24" y="60" width="432" height="110" rx="12" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
      <rect x="44" y="76" width="110" height="10" rx="5" fill="#E8D5A0" />
      <rect x="44" y="96" width="250" height="16" rx="3" fill="#0A1628" />
      <rect x="44" y="120" width="220" height="8" rx="2" fill="#3D5278" opacity="0.7" />
      <rect x="44" y="138" width="120" height="22" rx="6" fill="#8A6214" />
      {/* Hero Graphic Frame */}
      <rect x="316" y="74" width="120" height="82" rx="8" fill="#F3D9C4" stroke="#8A6214" strokeWidth="1" />
      <circle cx="376" cy="115" r="18" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />

      {/* 3 Architecture Capability Columns */}
      <g transform="translate(24, 184)">
        {/* Col 1 */}
        <rect x="0" y="0" width="134" height="116" rx="8" fill="#FFF8E7" stroke="#8A6214" strokeWidth="1.5" />
        <rect x="14" y="14" width="24" height="24" rx="6" fill="#E8D5A0" />
        <rect x="14" y="48" width="80" height="12" rx="2" fill="#0A1628" />
        <rect x="14" y="68" width="106" height="8" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="14" y="82" width="90" height="8" rx="2" fill="#3D5278" opacity="0.6" />

        {/* Col 2 */}
        <rect x="149" y="0" width="134" height="116" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="163" y="14" width="24" height="24" rx="6" fill="#F3D9C4" />
        <rect x="163" y="48" width="80" height="12" rx="2" fill="#0A1628" />
        <rect x="163" y="68" width="106" height="8" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="163" y="82" width="90" height="8" rx="2" fill="#3D5278" opacity="0.6" />

        {/* Col 3 */}
        <rect x="298" y="0" width="134" height="116" rx="8" fill="#FFF8E7" stroke="#E9DFC9" strokeWidth="1" />
        <rect x="312" y="14" width="24" height="24" rx="6" fill="#E4DAF5" />
        <rect x="312" y="48" width="80" height="12" rx="2" fill="#0A1628" />
        <rect x="312" y="68" width="106" height="8" rx="2" fill="#3D5278" opacity="0.6" />
        <rect x="312" y="82" width="90" height="8" rx="2" fill="#3D5278" opacity="0.6" />
      </g>
    </svg>
  );
}

export function IndustryPreview({ slug }: { slug: IndustrySlug }) {
  switch (slug) {
    case 'salon':
      return <SalonPreview />;
    case 'jewellery':
      return <JewelleryPreview />;
    case 'clinic':
      return <ClinicPreview />;
    case 'restaurant':
      return <RestaurantPreview />;
    case 'gym':
      return <GymPreview />;
    case 'shop':
      return <ShopPreview />;
    case 'classes':
      return <ClassesPreview />;
    case 'other':
    default:
      return <OtherPreview />;
  }
}
