import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoMenuTabs({ config }: { config: DemoConfig }) {
  const { palette } = config;

  const starters = [
    { name: 'Tandoori Truffle Malai Paneer', desc: 'Charred cottage cheese cubes marinated in smoked cream, cardamom, and white truffle essence.', spice: 'Mild' },
    { name: 'Kandhari Anardana Lamb Seekh', desc: 'Minced artisanal mutton skewers crusted with wild pomegranate seeds and fresh mint.', spice: 'Medium' },
    { name: 'Crispy Karwari Calamari', desc: 'Semolina-crusted coast squid rings tossed with fresh curry leaves and crushed black pepper.', spice: 'Spicy' },
  ];

  const mains = [
    { name: 'Old Delhi Slow-Cooked Dal Makhani', desc: 'Black lentils slow-simmered for 24 hours on slow charcoal with organic churned butter.', spice: 'Classic' },
    { name: 'Awadhi Smoked Dum Biryani', desc: 'Aged basmati rice layered with aromatic saffron broth, rose petals, and fried brown onions.', spice: 'Fragrant' },
    { name: 'Coastal Malabar Prawn Moilee', desc: 'Fresh tiger prawns poached gently in coconut milk, green chillies, and ginger slivers.', spice: 'Medium' },
  ];

  const desserts = [
    { name: 'Saffron & Pistachio Shahi Tukda', desc: 'Crisp ghee-fried milk brioche soaked in saffron rabri and dusted with gold leaf flakes.', spice: 'Sweet' },
    { name: 'Baked Gajar Halwa Tart', desc: 'Caramelized winter carrots nestled in an almond shortcrust pastry with cardamom cream.', spice: 'Sweet' },
    { name: 'Kolkata Paan Ice Cream', desc: 'Handcrafted frozen dessert infused with fresh betel leaves, gulkand, and candied fennel.', spice: 'Refreshing' },
  ];

  return (
    <section id="menu" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}20` }}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: palette.surface, color: palette.accent }}>
            Culinary Offerings
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
            Handcrafted Dining Menu
          </h2>
          <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
            Prepared fresh to order using heritage stone grinders and seasonal regional produce
          </p>
        </div>

        {/* Pure CSS Radio Input Tabs */}
        <div>
          <input type="radio" id="tab-starters" name="menu_category" className="peer/starters sr-only" defaultChecked />
          <input type="radio" id="tab-mains" name="menu_category" className="peer/mains sr-only" />
          <input type="radio" id="tab-desserts" name="menu_category" className="peer/desserts sr-only" />

          {/* Tab Buttons (Labels) */}
          <div className="flex justify-center gap-2 p-1.5 rounded-xl border max-w-sm mx-auto mb-8 shadow-inner" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
            <label
              htmlFor="tab-starters"
              className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all peer-checked/starters:bg-amber-900/10 peer-checked/starters:shadow-sm"
              style={{ color: palette.ink }}
            >
              Starters
            </label>
            <label
              htmlFor="tab-mains"
              className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all peer-checked/mains:bg-amber-900/10 peer-checked/mains:shadow-sm"
              style={{ color: palette.ink }}
            >
              Mains
            </label>
            <label
              htmlFor="tab-desserts"
              className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all peer-checked/desserts:bg-amber-900/10 peer-checked/desserts:shadow-sm"
              style={{ color: palette.ink }}
            >
              Desserts
            </label>
          </div>

          {/* Starters Panel */}
          <div className="hidden peer-checked/starters:grid grid-cols-1 sm:grid-cols-2 gap-4">
            {starters.map((dish, i) => (
              <div key={i} className="p-4 rounded-xl border flex flex-col justify-between space-y-3" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm" style={{ color: palette.ink }}>{dish.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: palette.accent, color: palette.accent }}>{dish.spice}</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1 leading-relaxed" style={{ color: palette.ink }}>{dish.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-current/10">
                  <span className="font-mono font-bold text-sm" style={{ color: palette.accent }}>₹ ___</span>
                  <a href="#demo-note" className="text-xs font-semibold hover:underline" style={{ color: palette.accent }}>Order +</a>
                </div>
              </div>
            ))}
          </div>

          {/* Mains Panel */}
          <div className="hidden peer-checked/mains:grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mains.map((dish, i) => (
              <div key={i} className="p-4 rounded-xl border flex flex-col justify-between space-y-3" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm" style={{ color: palette.ink }}>{dish.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: palette.accent, color: palette.accent }}>{dish.spice}</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1 leading-relaxed" style={{ color: palette.ink }}>{dish.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-current/10">
                  <span className="font-mono font-bold text-sm" style={{ color: palette.accent }}>₹ ___</span>
                  <a href="#demo-note" className="text-xs font-semibold hover:underline" style={{ color: palette.accent }}>Order +</a>
                </div>
              </div>
            ))}
          </div>

          {/* Desserts Panel */}
          <div className="hidden peer-checked/desserts:grid grid-cols-1 sm:grid-cols-2 gap-4">
            {desserts.map((dish, i) => (
              <div key={i} className="p-4 rounded-xl border flex flex-col justify-between space-y-3" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm" style={{ color: palette.ink }}>{dish.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: palette.accent, color: palette.accent }}>{dish.spice}</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1 leading-relaxed" style={{ color: palette.ink }}>{dish.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-current/10">
                  <span className="font-mono font-bold text-sm" style={{ color: palette.accent }}>₹ ___</span>
                  <a href="#demo-note" className="text-xs font-semibold hover:underline" style={{ color: palette.accent }}>Order +</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Order & WhatsApp Banner */}
        <div id="order" className="p-6 rounded-2xl border text-center space-y-3" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}40` }}>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
            Craving Authentic Dining at Home?
          </h3>
          <p className="text-xs max-w-md mx-auto opacity-80" style={{ color: palette.ink }}>
            We deliver hot and fresh within 5 km. Direct orders get complimentary seasonal dessert.
          </p>
          <div className="flex justify-center gap-3 pt-1">
            <a
              href="#demo-note"
              className="px-5 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-transform active:scale-95"
              style={{ backgroundColor: palette.accent, color: 'white' }}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoMenuTabs;
