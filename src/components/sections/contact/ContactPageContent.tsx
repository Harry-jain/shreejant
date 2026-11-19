'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';
import { AuditCard } from '@/components/AuditCard';
import { useLanguage } from '@/i18n';

export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start w-full">
      {/* Left Column (5/12 on Desktop) / Header on Mobile */}
      <div className="lg:col-span-5 space-y-6">
        <SectionHeading
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          as="h1"
          className="text-left"
        />

        {/* Desktop-only Sidebar (Methods + AuditCard) */}
        <div className="hidden lg:block space-y-6">
          <ContactInfo />
          <AuditCard />
        </div>
      </div>

      {/* Right Column (7/12 on Desktop) / Form on Mobile */}
      <div className="lg:col-span-7 w-full">
        <ContactForm />
      </div>

      {/* Mobile-only Sidebar (Contact Methods + AuditCard below form) */}
      <div className="lg:hidden col-span-1 space-y-6 mt-4">
        <ContactInfo />
        <AuditCard />
      </div>
    </div>
  );
}
