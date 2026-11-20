import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center text-white">
      <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-bold">Ready to Start Your Project?</h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Tell us about your business goals and what you need. We will get back to you with an honest timeline and estimate.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            Contact Us
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
