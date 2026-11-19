"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";
  const defaultMessage = encodeURIComponent(
    "Hi SHREEJAN AI SOLUTIONS, I would like to enquire about building an AI website/automation for my business."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="Quick contact" className="hidden md:block fixed bottom-6 right-6 z-40">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SHREEJAN AI SOLUTIONS on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
        className="group relative flex items-center justify-center p-3.5 bg-[#25D366] text-white rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />

        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

        {/* Hover Pill Label */}
        <span
          className={`hidden md:block absolute right-full mr-3 px-3 py-1.5 rounded-full text-xs font-medium font-body bg-brand-bg-alt text-brand-text border border-brand-border whitespace-nowrap shadow-md transition-all duration-200 ${
            hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Chat with our AI Consultants
        </span>
      </motion.a>
    </aside>
  );
}

