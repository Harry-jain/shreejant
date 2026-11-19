import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoServices({ config }: { config: DemoConfig }) {
  const { id, palette } = config;

  let title = 'Our Services';
  let subtitle = 'Transparent sample offerings curated for excellence';
  let items: { name: string; desc: string; tag?: string }[] = [];

  if (id === 'salon') {
    title = 'Signature Treatments & Styling';
    subtitle = 'Every treatment includes personal consultation and organic hair spa wash';
    items = [
      { name: 'Bridal Couture Hair & Makeup', desc: 'Full HD trial, bespoke draping, jewellery styling, and organic skin glow treatment.', tag: 'Bridal' },
      { name: 'Keratin & Botanical Smoothing', desc: 'Formaldehyde-free organic protein infusion for luminous frizz-free locks.', tag: 'Hair' },
      { name: 'Radiance Illuminating Facial', desc: 'Custom peel with botanical extracts, micro-current toning, and cold jade rolling.', tag: 'Skin' },
      { name: 'Precision Texture Cut & Blowout', desc: 'Bespoke contouring cut tailored to your facial architecture and natural hair density.', tag: 'Hair' },
    ];
  } else if (id === 'clinic') {
    title = 'Clinical Specialities & Departments';
    subtitle = 'Comprehensive outpatient consultations backed by digital diagnostic imaging';
    items = [
      { name: 'General Medicine & Family Health', desc: 'Preventative care, acute illness management, and lifestyle health tracking.', tag: 'General' },
      { name: 'Cosmetic & Restorative Dentistry', desc: 'Digital smile design, painless root canals, and teeth whitening treatments.', tag: 'Dental' },
      { name: 'Clinical & Aesthetic Dermatology', desc: 'Acne scar revision, allergy patch testing, and medical-grade skin barrier therapies.', tag: 'Skin' },
      { name: 'Pediatrics & Child Wellness', desc: 'Immunization schedule, developmental milestones, and pediatric nutrition guidance.', tag: 'Child care' },
    ];
  } else {
    // general
    title = 'Core Solutions Engineered For Growth';
    subtitle = 'Tailored modern systems designed to digitize and scale your daily operations';
    items = [
      { name: 'Flagship Digital Presence', desc: 'Custom ultra-fast website optimized for mobile conversions and local search dominance.', tag: 'Web' },
      { name: 'Automated Lead & Booking Funnels', desc: 'Direct WhatsApp integration, smart inquiry routing, and automated calendar scheduling.', tag: 'Growth' },
      { name: 'Internal Workflow Portals', desc: 'Centralized client dashboards, inventory monitors, and automated billing generation.', tag: 'System' },
    ];
  }

  return (
    <section id="services" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
            {title}
          </h2>
          <p className="text-sm opacity-80" style={{ color: palette.ink }}>
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border flex flex-col justify-between space-y-4 shadow-sm"
              style={{
                backgroundColor: palette.bg,
                borderColor: `${palette.accent}30`,
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-base" style={{ color: palette.ink }}>
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: `${palette.accent}20`, color: palette.accent }}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed opacity-75" style={{ color: palette.ink }}>
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-current/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs opacity-60" style={{ color: palette.ink }}>Sample:</span>
                  <span className="text-sm font-bold font-mono" style={{ color: palette.accent }}>₹ ___</span>
                </div>
                <a
                  href="#demo-note"
                  className="px-3 py-1.5 rounded text-xs font-semibold border transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: palette.accent,
                    borderColor: palette.accent,
                    color: '#FFFFFF',
                  }}
                >
                  Book this
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DemoServices;
