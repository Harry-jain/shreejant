import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoFaq({ config }: { config: DemoConfig }) {
  const { id, palette } = config;

  let faqs = [
    { q: 'How do I book an appointment?', a: 'You can select a preferred service and slot online, or message directly on WhatsApp for instant confirmation.' },
    { q: 'What safety and hygiene standards do you follow?', a: 'All instruments are hospital-grade sterilized, and single-use disposable kits are strictly maintained for every visitor.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm), debit/credit cards, and cash.' },
    { q: 'Can I reschedule or cancel my booking?', a: 'Yes, appointments can be modified or cancelled up to 2 hours before the scheduled time with zero cancellation fee.' },
  ];

  if (id === 'classes') {
    faqs = [
      { q: 'How are batch sizes determined?', a: 'Batches are strictly capped at 20 students to guarantee individual attention, regular homework correction, and personal mentoring.' },
      { q: 'What is the schedule for doubt-clearing sessions?', a: 'Dedicated 1-on-1 doubt clearing desks are open daily from 3 PM to 5 PM with faculty assistance.' },
      { q: 'Do you offer trial demo lectures?', a: 'Yes, prospective students can attend 2 complimentary evaluation lectures before finalizing admission.' },
      { q: 'How do parents receive performance updates?', a: 'Weekly attendance and chapter-wise test results are automatically sent via WhatsApp to registered guardian numbers.' },
    ];
  } else if (id === 'clinic') {
    faqs = [
      { q: 'Do I need a prior appointment for consultation?', a: 'Prior appointments are recommended to ensure zero waiting time, though walk-ins are accommodated based on emergency priority.' },
      { q: 'Are digital diagnostic reports provided?', a: 'Yes, all blood investigations, imaging, and prescriptions are uploaded to your encrypted digital patient portal within 4 hours.' },
      { q: 'Does the clinic accept health insurance cashless claims?', a: 'We support all major TPA and corporate cashless insurance networks for eligible day-care procedures.' },
      { q: 'What precautions are in place for pediatric visits?', a: 'We have dedicated child-friendly sanitization zones, distraction toys, and certified pediatric nursing staff.' },
    ];
  }

  return (
    <section id="faq" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}20` }}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: palette.surface, color: palette.accent }}>
            Common Queries
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
            Transparent answers to help you make informed decisions
          </p>
        </div>

        {/* Native <details> / <summary> accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-4 rounded-xl border transition-all cursor-pointer"
              style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}25` }}
            >
              <summary className="flex items-center justify-between font-semibold text-xs sm:text-sm list-none select-none" style={{ color: palette.ink }}>
                <span>{faq.q}</span>
                <span className="ml-2 font-mono text-base transition-transform group-open:rotate-45" style={{ color: palette.accent }}>
                  +
                </span>
              </summary>
              <p className="pt-3 text-xs leading-relaxed opacity-80 border-t border-current/10 mt-3" style={{ color: palette.ink }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DemoFaq;
