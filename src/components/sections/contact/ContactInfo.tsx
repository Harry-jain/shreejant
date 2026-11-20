'use client';

import React from 'react';
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';

export function ContactInfo() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'aishreejan@gmail.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918976517353';
  const displayPhone = whatsappNumber.startsWith('91') && whatsappNumber.length === 12
    ? `+91 ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
    : `+${whatsappNumber}`;

  return (
    <div className="space-y-4">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500 transition-all text-white"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase">WhatsApp</div>
            <div className="text-sm font-semibold text-white">Chat with Founders</div>
          </div>
        </div>
      </a>

      {/* Email */}
      <a
        href={`mailto:${contactEmail}`}
        className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 transition-all text-white"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase">Email</div>
            <div className="text-sm font-semibold text-white">{contactEmail}</div>
          </div>
        </div>
      </a>

      {/* Phone */}
      <a
        href={`tel:+${whatsappNumber}`}
        className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500 transition-all text-white"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase">Phone</div>
            <div className="text-sm font-semibold text-white">{displayPhone}</div>
          </div>
        </div>
      </a>

      {/* Location */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300">
        <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
        <span>Mumbai, Maharashtra, India</span>
      </div>
    </div>
  );
}

export default ContactInfo;
