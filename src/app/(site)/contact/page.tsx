import React from 'react';
import { constructMetadata } from '@/lib/metadata';
import { ContactPageContent } from '@/components/sections/contact/ContactPageContent';

export const metadata = constructMetadata({
  title: 'Contact Us | SHREEJAN AI SOLUTIONS',
  description:
    'Connect with SHREEJAN AI SOLUTIONS for web development and AI automation for businesses across India. Fast response within one working day.',
  canonicalUrl: '/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <ContactPageContent />
    </div>
  );
}
