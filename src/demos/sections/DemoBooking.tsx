"use client";

import React, { useState } from 'react';
import { DemoConfig } from '../demos.config';
import { Loader2, CheckCircle2, MessageSquare } from 'lucide-react';

export function DemoBooking({ config }: { config: DemoConfig }) {
  const { id, palette } = config;

  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [extraNote, setExtraNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let title = 'Schedule an Appointment';
  let subtitle = 'Select your preferred time slot and confirm in seconds';
  let buttonText = 'Confirm Booking';

  if (id === 'salon') {
    title = 'Reserve Your Sanctuary Time';
    subtitle = 'Select your bespoke hair or skin ritual, preferred stylist, and timing';
    buttonText = 'Confirm Reservation';
  } else if (id === 'clinic') {
    title = 'Schedule Outpatient Consultation';
    subtitle = 'Direct doctor booking with zero registration queue';
    buttonText = 'Confirm Consultation';
  } else if (id === 'restaurant') {
    title = 'Reserve a Dining Table';
    subtitle = 'Tables held for 15 minutes past reservation time';
    buttonText = 'Reserve Table';
  } else if (id === 'gym') {
    title = 'Book a Free 1-Day Trial Pass';
    subtitle = 'Experience our coaches, equipment, and recovery deck with zero obligation';
    buttonText = 'Claim Free Pass';
  } else if (id === 'classes') {
    title = 'Direct Admission & Batch Enquiry';
    subtitle = 'Speak with our academic advisors and book a free demo diagnostic test';
    buttonText = 'Submit Batch Enquiry';
  } else {
    // general
    title = 'Request a Discovery Discussion';
    subtitle = 'Tell us about your project requirements and get a detailed proposal';
    buttonText = 'Send Inquiry';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const clientName = name.trim() || 'Demo Guest';
      const contactPhone = phone.trim() || 'Not specified';
      const bookingSummary = `[PROTOTYPE RESERVATION — ${id.toUpperCase()}]\nName: ${clientName}\nPhone: ${contactPhone}\nSelected Slot: ${selectedSlot}\nNotes: ${extraNote || 'None'}`;

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: clientName,
          contact: contactPhone,
          phone: contactPhone,
          projectType: `Demo Reservation (${id})`,
          message: bookingSummary,
        }),
      }).catch((err) => {
        console.warn('Demo booking dispatch notice:', err);
      });

      // UX buffer so user observes loader assurance
      await new Promise((r) => setTimeout(r, 650));
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}20` }}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
            {title}
          </h2>
          <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
            {subtitle}
          </p>
        </div>

        <div
          className="p-6 sm:p-8 rounded-2xl border space-y-5 shadow-sm"
          style={{
            backgroundColor: palette.surface,
            borderColor: `${palette.accent}30`,
          }}
        >
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div
                className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white"
                style={{ backgroundColor: palette.accent }}
              >
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: palette.ink }}>
                Reservation Confirmed!
              </h3>
              <p className="text-xs sm:text-sm opacity-80 max-w-md mx-auto" style={{ color: palette.ink }}>
                Your request has been captured. In production, this immediately syncs with your staff calendar and pings the customer on WhatsApp.
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    borderColor: `${palette.accent}50`,
                    color: palette.ink,
                  }}
                >
                  Book Another Slot
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Slot Chips if Salon, Clinic or Gym */}
              {(id === 'salon' || id === 'clinic' || id === 'gym' || id === 'restaurant') && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold block" style={{ color: palette.ink }}>
                    Select Preferred Slot
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'].map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className="px-3 py-1.5 rounded-lg border text-xs font-mono font-medium cursor-pointer transition-colors"
                          style={{
                            borderColor: isSelected ? palette.accent : `${palette.accent}30`,
                            backgroundColor: isSelected ? `${palette.accent}15` : palette.bg,
                            color: palette.ink,
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="demo-name" className="text-xs font-semibold block" style={{ color: palette.ink }}>
                    Your Name
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    autoComplete="off"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1"
                    style={{ borderColor: `${palette.accent}40`, color: palette.ink }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="demo-phone" className="text-xs font-semibold block" style={{ color: palette.ink }}>
                    Phone Number
                  </label>
                  <input
                    id="demo-phone"
                    type="tel"
                    autoComplete="off"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1"
                    style={{ borderColor: `${palette.accent}40`, color: palette.ink }}
                  />
                </div>
              </div>

              {id === 'classes' && (
                <div className="space-y-1.5">
                  <label htmlFor="demo-class" className="text-xs font-semibold block" style={{ color: palette.ink }}>
                    Current Class / Standard
                  </label>
                  <input
                    id="demo-class"
                    type="text"
                    autoComplete="off"
                    placeholder="e.g. Class 10 CBSE or Class 12 JEE"
                    value={extraNote}
                    onChange={(e) => setExtraNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1"
                    style={{ borderColor: `${palette.accent}40`, color: palette.ink }}
                  />
                </div>
              )}

              {id !== 'classes' && (
                <div className="space-y-1.5">
                  <label htmlFor="demo-note-input" className="text-xs font-semibold block" style={{ color: palette.ink }}>
                    Optional Note
                  </label>
                  <input
                    id="demo-note-input"
                    type="text"
                    autoComplete="off"
                    placeholder="Any specific preference or requirement"
                    value={extraNote}
                    onChange={(e) => setExtraNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1"
                    style={{ borderColor: `${palette.accent}40`, color: palette.ink }}
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full py-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    backgroundColor: palette.accent,
                    color: '#FFFFFF',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Confirming Reservation...</span>
                    </>
                  ) : (
                    <span>{buttonText}</span>
                  )}
                </button>
                <p className="text-[11px] text-center opacity-60 mt-2" style={{ color: palette.ink }}>
                  Sample interface. In production, this instantly notifies via WhatsApp & SMS.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default DemoBooking;
