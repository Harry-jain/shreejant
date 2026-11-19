import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoHours({ config }: { config: DemoConfig }) {
  const { id, palette } = config;

  return (
    <section id="hours" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
            Location & Operating Hours
          </h2>
          <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
            Visit our center or get directions directly to our doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Information Block */}
          <div className="p-6 rounded-2xl border flex flex-col justify-between space-y-6 shadow-sm" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}30` }}>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: palette.accent }}>Studio Address</span>
                <p className="text-sm font-semibold mt-1" style={{ color: palette.ink }}>Your address here.</p>
                <p className="text-xs opacity-75 mt-0.5" style={{ color: palette.ink }}>Landmark: Near Central Metro Station, Mumbai 400001</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: palette.accent }}>Contact Helpline</span>
                <p className="text-sm font-semibold font-mono mt-1" style={{ color: palette.ink }}>+91 00000 00000</p>
                <p className="text-xs opacity-75 mt-0.5" style={{ color: palette.ink }}>hello@example.com</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: palette.accent }}>Timings</span>
                <div className="space-y-1 mt-1 text-xs opacity-85" style={{ color: palette.ink }}>
                  <div className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span className="font-mono font-medium">09:00 AM - 09:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-mono font-medium">10:00 AM - 06:00 PM</span>
                  </div>
                </div>
              </div>

              {id === 'clinic' && (
                <div className="p-3 rounded-lg border text-xs leading-relaxed" style={{ borderColor: `${palette.accent}40`, backgroundColor: `${palette.accent}10`, color: palette.ink }}>
                  <strong className="block font-semibold">Important Medical Notice:</strong>
                  For an emergency, call your local emergency number.
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href="#demo-note"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-lg text-xs font-semibold border transition-all"
                style={{ borderColor: palette.accent, color: palette.ink }}
              >
                Get Google Maps Directions ↗
              </a>
            </div>
          </div>

          {/* Drawn Map Block */}
          <div
            className="p-6 rounded-2xl border min-h-[220px] flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden"
            style={{
              backgroundColor: palette.bg,
              borderColor: `${palette.accent}30`,
            }}
          >
            {/* Background grid lines imitating map */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(${palette.accent} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
            
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg z-10 border shadow-sm" style={{ backgroundColor: palette.surface, borderColor: palette.accent, color: palette.accent }}>
              📍
            </div>
            <div className="z-10 space-y-1">
              <p className="text-sm font-semibold" style={{ color: palette.ink }}>
                Your map shows here.
              </p>
              <p className="text-xs opacity-75 max-w-xs" style={{ color: palette.ink }}>
                Interactive Google Maps embed with pinpoint location marker and one-tap navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoHours;
