import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { BrandWatermark } from '@/components/ui/BrandWatermark';
import { ContactPageContent } from '@/components/sections/contact/ContactPageContent';

export const metadata = constructMetadata({
  title: 'Contact & Book Strategy Call',
  description:
    'Connect with SHREEJAN AI SOLUTIONS for premium web development and AI automation for businesses across India. Fast response within one working day.',
  canonicalUrl: '/contact',
});

export default function ContactPage() {
  return (
    <div className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)] overflow-hidden">
      <BrandWatermark text="SHREEJAN" position="top" className="opacity-10" />
      <div className="relative z-10 site-container">
        <ContactPageContent />
      </div>
    </div>
  );
}
