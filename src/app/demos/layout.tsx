import React from 'react';
import type { Metadata } from 'next';
import '../globals.css';

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
    <html lang="en" className="h-full">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="h-full antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
