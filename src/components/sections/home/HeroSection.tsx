"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-36 pb-20 text-center max-w-5xl mx-auto px-4">
      <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-white/10 px-3 py-1 rounded-full">
        MUMBAI WEB &amp; AI AGENCY
      </span>
      <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mt-6 mb-6 leading-tight">
        Modern Websites &amp; AI Automation for Indian Businesses
      </h1>
      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
        Fast, mobile-first websites and smart WhatsApp automations that help local businesses grow without technical complexity.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/demos"
          className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
        >
          View Demos
        </Link>
        <Link
          href="/contact"
          className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
