import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoGallery({ config }: { config: DemoConfig }) {
  const { palette } = config;

  const stylists = [
    { name: 'Ananya Sen', role: 'Creative Director & Master Colorist' },
    { name: 'Rohan Mehra', role: 'Senior Bridal Stylist & Draping Lead' },
    { name: 'Zoya Patel', role: 'Aesthetic Skin & Organic Facial Specialist' },
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}20` }}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Team Roles */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: palette.surface, color: palette.accent }}>
              Stylists
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
              Artisan Stylists & Specialists
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stylists.map((s, idx) => (
              <div key={idx} className="p-5 rounded-xl border space-y-2 text-center shadow-sm" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}25` }}>
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center font-serif font-bold text-sm" style={{ backgroundColor: palette.bg, color: palette.accent, border: `2px solid ${palette.accent}` }}>
                  {s.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-sm" style={{ color: palette.ink }}>{s.name}</h3>
                <p className="text-xs opacity-75" style={{ color: palette.ink }}>{s.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Gallery Tiles ("Your photos go here") */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
              Studio Sanctuary Gallery
            </h3>
            <p className="text-xs opacity-75" style={{ color: palette.ink }}>
              A glimpse into our serene interior aesthetic and tranquil treatment private suites
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-xl border border-dashed flex flex-col items-center justify-center p-3 text-center"
                style={{ backgroundColor: palette.surface, borderColor: palette.accent }}
              >
                <span className="text-xs font-medium opacity-70" style={{ color: palette.ink }}>
                  Your photos go here
                </span>
                <span className="text-[10px] opacity-40 font-mono mt-1" style={{ color: palette.ink }}>
                  Tile 0{item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoGallery;
