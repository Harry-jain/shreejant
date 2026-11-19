import React from 'react';

export function ShopArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Paper Grocery Shopping Bag */}
      <rect x="80" y="90" width="160" height="150" rx="12" fill="#FFFFFF" stroke="#1B1D36" strokeWidth="2.5" />
      {/* Bag Handles */}
      <path d="M 120 90 L 120 50 Q 160 30 200 50 L 200 90" stroke="#3745B5" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Bag Fold Accordion Lines */}
      <line x1="105" y1="90" x2="105" y2="240" stroke="#F7F8FC" strokeWidth="2" />
      <line x1="215" y1="90" x2="215" y2="240" stroke="#F7F8FC" strokeWidth="2" />
      {/* Organic Apple / Fresh Produce Badge */}
      <circle cx="160" cy="155" r="26" fill="#F7F8FC" stroke="#FFC933" strokeWidth="2" />
      <path d="M 152 145 Q 160 135 168 145 C 175 165 145 165 152 145 Z" fill="#3745B5" />
      <path d="M 160 135 Q 165 125 172 128" stroke="#3745B5" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Barcode Strip */}
      <g transform="translate(125, 200)">
        <line x1="0" y1="0" x2="0" y2="20" stroke="#1B1D36" strokeWidth="2" />
        <line x1="6" y1="0" x2="6" y2="20" stroke="#1B1D36" strokeWidth="3" />
        <line x1="14" y1="0" x2="14" y2="20" stroke="#1B1D36" strokeWidth="1" />
        <line x1="20" y1="0" x2="20" y2="20" stroke="#1B1D36" strokeWidth="4" />
        <line x1="30" y1="0" x2="30" y2="20" stroke="#1B1D36" strokeWidth="2" />
        <line x1="38" y1="0" x2="38" y2="20" stroke="#1B1D36" strokeWidth="3" />
        <line x1="48" y1="0" x2="48" y2="20" stroke="#1B1D36" strokeWidth="1.5" />
        <line x1="56" y1="0" x2="56" y2="20" stroke="#1B1D36" strokeWidth="2.5" />
        <line x1="64" y1="0" x2="64" y2="20" stroke="#1B1D36" strokeWidth="3.5" />
        <line x1="70" y1="0" x2="70" y2="20" stroke="#1B1D36" strokeWidth="1" />
      </g>
      {/* 30-min Express Delivery Van Silhouette or Speed Line */}
      <line x1="40" y1="260" x2="280" y2="260" stroke="#3745B5" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default ShopArt;
