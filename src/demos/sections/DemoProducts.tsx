import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoProducts({ config }: { config: DemoConfig }) {
  const { id, palette } = config;

  if (id === 'jewellery') {
    const collections = [
      { name: 'Bridal Heritage', desc: 'Intricate 22K polki and uncut diamond choker sets engineered for royal celebrations.' },
      { name: 'Daily Luminescence', desc: 'Minimalist 18K solid gold pendants, sleek tennis bracelets, and feather-light bands.' },
      { name: 'Investment Bullion', desc: '999.9 pure certified minted gold & silver bars with tamper-evident assay certification.' },
      { name: 'Sterling Silver Keepsakes', desc: 'Artisanal silverware, commemorative gifting coins, and handcrafted puja essentials.' },
    ];

    const pieces = [
      { title: 'Kundan Navratna Choker', weight: '22K Hallmarked Gold • 48.5g' },
      { title: 'Solitaire Cascade Earrings', weight: '18K Rose Gold • VVS-EF Diamonds' },
      { title: 'Temple Antique Kada', weight: '22K Hand-Carved Gold • 32.0g' },
      { title: 'Emerald Petal Pendant', weight: '18K Yellow Gold • Zambian Emerald' },
    ];

    return (
      <section className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Collections Section */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: palette.bg, color: palette.accent }}>
                Curated Vaults
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
                Heirloom Collections
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {collections.map((col, idx) => (
                <div key={idx} className="p-5 rounded-xl border flex flex-col justify-between space-y-3" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}30` }}>
                  <div>
                    <span className="text-xs font-mono font-bold opacity-60" style={{ color: palette.accent }}>0{idx + 1}</span>
                    <h3 className="font-bold text-base mt-1" style={{ color: palette.ink }}>{col.name}</h3>
                    <p className="text-xs opacity-75 mt-1 leading-relaxed" style={{ color: palette.ink }}>{col.desc}</p>
                  </div>
                  <a href="#demo-note" className="text-xs font-semibold hover:underline inline-flex items-center gap-1" style={{ color: palette.accent }}>
                    Explore vault →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Pieces */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-demo-display), Georgia, serif', color: palette.ink }}>
                Featured Showpieces
              </h3>
              <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
                Individually certified with lifetime exchange guarantee
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pieces.map((piece, idx) => (
                <div key={idx} className="p-4 rounded-xl border space-y-4 shadow-sm" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}30` }}>
                  <div className="h-32 rounded-lg flex items-center justify-center border border-dashed" style={{ backgroundColor: `${palette.accent}10`, borderColor: palette.accent }}>
                    <span className="text-xs opacity-70 font-serif italic text-center px-2" style={{ color: palette.ink }}>
                      Sample Piece
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm" style={{ color: palette.ink }}>{piece.title}</h4>
                    <p className="text-[11px] opacity-75" style={{ color: palette.ink }}>{piece.weight}</p>
                  </div>
                  <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                    <span className="text-xs font-semibold opacity-85" style={{ color: palette.ink }}>Price on request</span>
                    <a
                      href="#demo-note"
                      className="px-2.5 py-1 rounded text-[11px] font-semibold transition-colors"
                      style={{ backgroundColor: palette.accent, color: '#151515' }}
                    >
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Gold Rate Quiet Card */}
          <div className="p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: palette.bg, borderColor: palette.accent }}>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>Bullion Market Update</span>
              <p className="text-sm font-semibold" style={{ color: palette.ink }}>
                Today&apos;s gold rate shows here.
              </p>
              <p className="text-xs opacity-75" style={{ color: palette.ink }}>
                Live updates synced daily with IBJA Mumbai benchmark rates.
              </p>
            </div>
            <a
              href="#demo-note"
              className="px-4 py-2 rounded-lg text-xs font-semibold border transition-all"
              style={{ borderColor: palette.accent, color: palette.ink }}
            >
              Book Store Visit
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Shop / Daily Basket
  const categories = [
    'Fresh Farm Vegetables',
    'Organic Seasonal Fruits',
    'Artisanal A2 Dairy',
    'Stone-Ground Flours',
    'Cold-Pressed Oils',
    'Natural Pantry Spices',
  ];

  const products = [
    { name: 'Organic Hydroponic Baby Spinach (250g)', cat: 'Vegetables' },
    { name: 'Kashmir Crisp Red Apples (1kg)', cat: 'Fruits' },
    { name: 'Gir Cow A2 Cultured Vedic Ghee (500ml)', cat: 'Dairy' },
    { name: 'Khapli Ancient Emmer Wheat Flour (2kg)', cat: 'Flours' },
    { name: 'Cold-Pressed Wood Churned Mustard Oil (1L)', cat: 'Oils' },
    { name: 'Sun-Dried Malabar Black Peppercorns (100g)', cat: 'Spices' },
    { name: 'Raw Unprocessed Forest Honey (400g)', cat: 'Pantry' },
    { name: 'Artisanal Stone Ground Himalayan Pink Salt (1kg)', cat: 'Pantry' },
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}20` }}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Categories Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-demo-display), sans-serif', color: palette.ink }}>
                Shop by Fresh Aisle
              </h2>
              <p className="text-xs opacity-75" style={{ color: palette.ink }}>
                Directly harvested and packed from verified sustainable grower cooperatives
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30`, color: palette.accent }}>
              <span>🛒</span>
              <span>Cart (0)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border text-center space-y-2 hover:shadow-sm transition-all" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
                <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs" style={{ backgroundColor: `${palette.accent}15`, color: palette.accent }}>
                  {idx + 1}
                </div>
                <h3 className="text-xs font-semibold leading-snug" style={{ color: palette.ink }}>{cat}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* 8 Sample Product Cards */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-demo-display), sans-serif', color: palette.ink }}>
              Daily Kitchen Essentials
            </h3>
            <p className="text-xs opacity-75" style={{ color: palette.ink }}>
              Order before 7 PM for guaranteed express 30-minute hyper-local delivery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border flex flex-col justify-between space-y-3 shadow-sm" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}25` }}>
                <div className="space-y-2">
                  <div className="h-28 rounded-lg flex items-center justify-center border border-dashed" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}40` }}>
                    <span className="text-[11px] opacity-60 font-mono" style={{ color: palette.ink }}>Item Image</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: palette.accent }}>{item.cat}</span>
                  <h4 className="font-semibold text-xs leading-snug" style={{ color: palette.ink }}>{item.name}</h4>
                </div>

                <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                  <span className="font-mono font-bold text-xs" style={{ color: palette.accent }}>₹ ___</span>
                  <a
                    href="#demo-note"
                    className="px-2.5 py-1 rounded text-[11px] font-semibold transition-transform active:scale-95"
                    style={{ backgroundColor: palette.accent, color: '#FFFFFF' }}
                  >
                    Add to cart +
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & Payment cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border space-y-2" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>Hyperlocal Fulfillment</span>
            <h4 className="text-sm font-semibold" style={{ color: palette.ink }}>Delivery & Store Pickup</h4>
            <p className="text-xs opacity-75 leading-relaxed" style={{ color: palette.ink }}>
              Free 30-minute home delivery within 4 km on orders above ₹ ___. Curbside pickup available in 15 minutes.
            </p>
          </div>
          <div className="p-5 rounded-xl border space-y-2" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>Checkout Options</span>
            <h4 className="text-sm font-semibold" style={{ color: palette.ink }}>Your payment options show here.</h4>
            <p className="text-xs opacity-75 leading-relaxed" style={{ color: palette.ink }}>
              Supports UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and Cash on Delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoProducts;
