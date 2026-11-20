'use client';

import React from 'react';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export function ContactPageContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start w-full">
      {/* Left Column */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
            CONNECT WITH ENGINEERS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-3">
            Let&apos;s Discuss Your Project
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Tell us about your business goals, target timeline, and what you are looking to build. We review every inquiry personally and respond as soon as we can.
          </p>
        </div>

        <div className="space-y-6">
          <ContactInfo />
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-7 w-full">
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactPageContent;
