import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <title>404 — Page Not Found | SHREEJAN AI SOLUTIONS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body bg-[#090C15] text-[#F4F7FB] antialiased min-h-screen flex items-center justify-center p-4 selection:bg-[#7C5CFC] selection:text-white">
        <div className="relative z-10 max-w-md w-full text-center space-y-6">
          <div className="font-mono font-bold text-7xl sm:text-8xl text-[#7C5CFC]">
            404
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-brand-text">
            Page Not Found
          </h1>
          <p className="font-body text-[15px] text-brand-muted leading-relaxed">
            The requested coordinate does not exist in our digital architecture. Navigate back to the main portal.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#7C5CFC] hover:bg-[#6842FF] text-white font-medium text-sm transition-all shadow-lg shadow-[#7C5CFC]/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
