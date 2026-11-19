'use client';

import React from 'react';

export interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function ArchFrame({ children, className = '' }: ArchFrameProps) {
  return (
    <div
      className={`relative aspect-[4/5] w-full max-w-[360px] mx-auto overflow-hidden rounded-t-full rounded-b-[12px] border border-[var(--demo-hairline,#EAE3D5)] bg-[var(--demo-velvet-1,#0A1628)] shadow-md ${className}`}
      style={{
        borderRadius: '999px 999px 12px 12px',
      }}
    >
      {/* Children content (JewelleryImage / SVG / velvet) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {children}
      </div>

      {/* Decorative inner arch hairline (8px inset) */}
      <div
        className="absolute inset-2 pointer-events-none border border-[var(--demo-hairline,#EAE3D5)] opacity-40 z-10"
        style={{
          borderRadius: '999px 999px 8px 8px',
        }}
      />
    </div>
  );
}
