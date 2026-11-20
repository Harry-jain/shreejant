"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

interface FloatingWhatsAppProps {
  phone?: string;
  defaultMessage?: string;
  brandName?: string;
}

export function FloatingWhatsApp({
  phone = "919999999999",
  defaultMessage = "Hi, I want to enquire about your services.",
  brandName = "WhatsApp",
}: FloatingWhatsAppProps) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside aria-label="Customer support WhatsApp link" className="fixed bottom-6 right-6 z-40 pointer-events-auto">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${brandName} on WhatsApp`}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/40"
      >
        <span className="absolute -inset-0.5 rounded-full bg-emerald-500/30 pointer-events-none" />
        <MessageSquare className="w-6 h-6 fill-current relative z-10" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}

export default FloatingWhatsApp;
