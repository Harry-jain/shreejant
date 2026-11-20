"use client";

import React, { useState } from 'react';
import { DemoConfig } from '../demos.config';
import { Loader2, CheckCircle2 } from 'lucide-react';

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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 450));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="booking" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b border-black/10" style={{ backgroundColor: palette.bg }}>
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
          className="p-6 sm:p-8 rounded-2xl border border-black/10 space-y-5 shadow-sm"
          style={{
            backgroundColor: palette.surface,
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

              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                Preview Confirmation
              </div>

              <h3 className="text-xl font-bold" style={{ color: palette.ink }}>
                Reservation Request Captured
              </h3>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm max-w-md mx-auto leading-relaxed shadow-sm">
                <strong>Demo form:</strong> In a live website, this connects directly to your WhatsApp or email inbox.
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-lg text-xs font-semibold border border-current/20 hover:opacity-80 transition-opacity cursor-pointer"
                  style={{
                    color: palette.ink,
                  }}
                >
                  Book Another Slot
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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
                          borderColor: isSelected ? palette.accent : 'rgba(0,0,0,0.15)',
                          backgroundColor: isSelected ? palette.accent : palette.bg,
                          color: isSelected ? 'white' : palette.ink,
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-black/15 bg-transparent focus:outline-none focus:ring-1"
                    style={{ color: palette.ink }}
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-black/15 bg-transparent focus:outline-none focus:ring-1"
                    style={{ color: palette.ink }}
                  />
                </div>
              </div>

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
                  className="w-full px-3 py-2 text-xs rounded-lg border border-black/15 bg-transparent focus:outline-none focus:ring-1"
                  style={{ color: palette.ink }}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full py-3 rounded-lg text-xs font-semibold text-center text-white flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    backgroundColor: palette.accent,
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
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default DemoBooking;
