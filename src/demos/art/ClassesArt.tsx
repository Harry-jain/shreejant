import React from 'react';

export function ClassesArt({ className = 'w-full h-auto max-w-[320px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Mortarboard Graduation Cap */}
      <polygon points="160,50 250,90 160,130 70,90" fill="#1E4FD8" stroke="#0F1A3D" strokeWidth="2.5" />
      <path d="M 110 110 L 110 150 Q 160 175 210 150 L 210 110" fill="#0F1A3D" stroke="#0F1A3D" strokeWidth="2" />
      {/* Cap Tassel */}
      <line x1="160" y1="90" x2="230" y2="105" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="232" cy="115" r="5" fill="#FACC15" />
      {/* Open Academic Book */}
      <path d="M 60 210 Q 160 190 160 230 Q 160 190 260 210 L 260 250 Q 160 230 160 270 Q 160 230 60 250 Z" fill="#FFFFFF" stroke="#0F1A3D" strokeWidth="2.5" />
      <line x1="160" y1="230" x2="160" y2="270" stroke="#1E4FD8" strokeWidth="2.5" />
      {/* Book Text Lines */}
      <line x1="85" y1="222" x2="140" y2="218" stroke="#1E4FD8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="85" y1="232" x2="140" y2="228" stroke="#1E4FD8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="180" y1="218" x2="235" y2="222" stroke="#1E4FD8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="180" y1="228" x2="235" y2="232" stroke="#1E4FD8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default ClassesArt;
