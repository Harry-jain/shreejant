import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoPlans({ config }: { config: DemoConfig }) {
  const { palette } = config;

  const plans = [
    {
      name: 'Basic Strength',
      desc: 'Access to main weight floor and standard cardio conditioning deck.',
      features: ['Full gym floor access', 'Locker and shower room', 'Complimentary initial assessment'],
      popular: false,
    },
    {
      name: 'Standard Athlete',
      desc: 'Complete access including powerlifting zone and group conditioning classes.',
      features: ['All Basic privileges', 'Daily group HIIT & mobility sessions', 'Monthly trainer body composition audit'],
      popular: true,
    },
    {
      name: 'Premium High Performance',
      desc: 'Elite training pass with dedicated coach programming and recovery lab.',
      features: ['All Standard privileges', 'Dedicated 1-on-1 personal coach', 'Steam room, sauna & ice bath recovery', 'Custom nutrition protocol'],
      popular: false,
    },
  ];

  const facilities = [
    'Olympic Lifting Platforms with Eleiko Plates',
    'Hammer Strength ISO-Lateral Resistance Machines',
    'Infrared Contrast Therapy & Cryo Cold Plunge',
    'High-Altitude Ergometer Conditioning Studio',
    'Filtered Hydration & Protein Recovery Bar',
  ];

  return (
    <section id="plans" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: palette.bg, color: palette.accent }}>
            Memberships
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), sans-serif', color: palette.ink }}>
            Transparent Membership Tiers
          </h2>
          <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
            No lock-in contracts. Freeze anytime with 7 days notice.
          </p>
        </div>

        {/* 3 Membership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 relative shadow-sm ${
                p.popular ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: palette.bg,
                borderColor: p.popular ? palette.accent : `${palette.accent}30`,
              }}
            >
              {p.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: palette.accent }}
                >
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: palette.ink }}>{p.name}</h3>
                  <p className="text-xs opacity-75 mt-1 leading-relaxed" style={{ color: palette.ink }}>{p.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 py-2 border-y border-current/10">
                  <span className="font-mono text-2xl font-bold" style={{ color: palette.accent }}>₹ ___</span>
                  <span className="text-xs opacity-65" style={{ color: palette.ink }}>/ month</span>
                </div>

                <ul className="space-y-2 text-xs opacity-85" style={{ color: palette.ink }}>
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span style={{ color: palette.accent }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#demo-note"
                className="w-full py-2.5 rounded-lg text-xs font-semibold text-center transition-transform active:scale-95 shadow-sm block"
                style={{
                  backgroundColor: p.popular ? palette.accent : 'transparent',
                  borderColor: palette.accent,
                  borderWidth: '1px',
                  color: p.popular ? '#FFFFFF' : palette.ink,
                }}
              >
                Join with {p.name}
              </a>
            </div>
          ))}
        </div>

        {/* Facilities List */}
        <div className="p-6 rounded-2xl border space-y-4" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}30` }}>
          <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: palette.accent }}>
            World-Class Training Facility Standards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {facilities.map((fac, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs" style={{ color: palette.ink }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.accent }} />
                <span>{fac}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoPlans;
