import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: 'Sample Demo | SHREEJAN AI SOLUTIONS',
};

export default function DemoRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full antialiased selection:bg-black selection:text-white">
      {children}
    </div>
  );
}
