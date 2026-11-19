'use client';

import React from 'react';
import { Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n';

export function ContactInfo() {
  const { t } = useLanguage();
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'aishreejan@gmail.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918976517353';
  const displayPhone = whatsappNumber.startsWith('91') && whatsappNumber.length === 12
    ? `+91 ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
    : `+${whatsappNumber}`;

  return (
    <div className="space-y-4">
      {/* 3 Contact Methods as Sleek Dark Glass Cards */}
      <div className="space-y-3">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="p-4 rounded-[20px] bg-[#0E121E]/90 border border-white/10 flex items-center gap-4 hover:border-[#25D366]/50 transition-all shadow-md group-hover:shadow-[0_12px_28px_rgba(37,211,102,0.15)] text-white backdrop-blur-xl">
            <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/25">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-mono font-bold text-[#25D366] uppercase tracking-wider">
                {t('contact.whatsapp_label') || 'Instant WhatsApp Chat'}
              </div>
              <div className="text-sm font-body font-semibold text-white group-hover:text-[#25D366] transition-colors truncate">
                {t('cta.whatsapp') || 'Chat with Founders'}
              </div>
            </div>
          </div>
        </a>

        {/* Email */}
        <a href={`mailto:${contactEmail}`} className="block group">
          <div className="p-4 rounded-[20px] bg-[#0E121E]/90 border border-white/10 flex items-center gap-4 hover:border-[#7C5CFC]/50 transition-all shadow-md group-hover:shadow-[0_12px_28px_rgba(124,92,252,0.15)] text-white backdrop-blur-xl">
            <div className="w-11 h-11 rounded-xl bg-[#7C5CFC]/15 text-[#A78BFA] flex items-center justify-center shrink-0 border border-[#7C5CFC]/25">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-mono font-bold text-[#A78BFA] uppercase tracking-wider">
                {t('contact.email_label') || 'Direct Inquiries'}
              </div>
              <div className="text-sm font-body font-semibold text-white group-hover:text-[#A78BFA] transition-colors truncate">
                {contactEmail}
              </div>
            </div>
          </div>
        </a>

        {/* Phone */}
        <a href={`tel:+${whatsappNumber}`} className="block group">
          <div className="p-4 rounded-[20px] bg-[#0E121E]/90 border border-white/10 flex items-center gap-4 hover:border-[#38BDF8]/50 transition-all shadow-md group-hover:shadow-[0_12px_28px_rgba(56,189,248,0.15)] text-white backdrop-blur-xl">
            <div className="w-11 h-11 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0 border border-[#38BDF8]/25">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                {t('contact.phone_label') || 'Direct Phone / Office'}
              </div>
              <div className="text-sm font-mono font-medium text-white group-hover:text-[#38BDF8] transition-colors truncate">
                {displayPhone}
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* One-Line Location Badge */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#0E121E]/90 border border-white/10 text-xs sm:text-sm font-body text-white/70 backdrop-blur-xl">
        <MapPin className="w-4 h-4 text-[#A78BFA] shrink-0" />
        <span>{t('contact.based_mumbai') || 'Mumbai, Maharashtra, India'}</span>
      </div>
    </div>
  );
}

export default ContactInfo;
