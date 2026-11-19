'use client';

import React from 'react';

export interface JewelArtProps {
  art?: 'necklace' | 'ring' | 'kada';
  variant?: 'necklace' | 'ring' | 'kada';
  className?: string;
  priority?: boolean;
}

export function JewelArt({
  art,
  variant,
  className = 'w-full h-full',
}: JewelArtProps) {
  const activeArt = art || variant || 'necklace';

  // Common SVG definitions: velvet background, spotlight, gold metal, drop shadow, sparkles
  const CommonDefs = () => (
    <defs>
      {/* Velvet gradient: --demo-velvet-1 (#0A1628) to --demo-velvet-2 (#16253B) */}
      <linearGradient id="demo-velvet" x1="0%" y1="0%" x2="40%" y2="100%">
        <stop offset="0%" stopColor="#0A1628" />
        <stop offset="60%" stopColor="#101F33" />
        <stop offset="100%" stopColor="#16253B" />
      </linearGradient>

      {/* Soft spotlight behind piece: white 20% -> 0% */}
      <radialGradient id="demo-spotlight" cx="50%" cy="48%" r="44%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
        <stop offset="65%" stopColor="#F5EFE6" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>

      {/* 4-stop gold metal gradient: gold-1 -> gold-2 -> gold-3 -> gold-2 */}
      <linearGradient id="demo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F3DFA2" />
        <stop offset="35%" stopColor="#D8B56A" />
        <stop offset="70%" stopColor="#A8782A" />
        <stop offset="100%" stopColor="#D8B56A" />
      </linearGradient>

      {/* High-carat polished gold */}
      <linearGradient id="demo-gold-light" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D0" />
        <stop offset="50%" stopColor="#E2BE76" />
        <stop offset="100%" stopColor="#B38432" />
      </linearGradient>

      {/* Facet gradients for diamond stones */}
      <linearGradient id="stone-facet-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E9E3FB" />
      </linearGradient>
      <linearGradient id="stone-facet-mid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#CBBEF5" />
        <stop offset="100%" stopColor="#B7A5EE" />
      </linearGradient>
      <linearGradient id="stone-amethyst" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>
      <linearGradient id="stone-ruby" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B3122B" />
        <stop offset="100%" stopColor="#6E0A1A" />
      </linearGradient>
      <linearGradient id="stone-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F8F6B" />
        <stop offset="100%" stopColor="#065F46" />
      </linearGradient>
      <radialGradient id="pearl-grad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="75%" stopColor="#E8E0F0" />
        <stop offset="100%" stopColor="#C4B5FD" />
      </radialGradient>

      {/* Soft drop shadow */}
      <filter id="demo-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
        <feOffset dx="0" dy="10" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.45" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  // Common background elements
  const VelvetBackdrop = () => (
    <>
      {/* Velvet base */}
      <rect width="400" height="500" fill="url(#demo-velvet)" />
      {/* Radial soft spotlight */}
      <rect width="400" height="500" fill="url(#demo-spotlight)" />
      {/* Faint reflective surface ellipse under the piece */}
      <ellipse cx="200" cy="445" rx="140" ry="24" fill="#FFFFFF" fillOpacity="0.04" />
    </>
  );

  // 3 static 4-point sparkle stars
  const Sparkles = ({ points }: { points: [number, number][] }) => (
    <g opacity="0.85">
      {points.map(([cx, cy], i) => (
        <path
          key={i}
          d={`M${cx},${cy - 7} Q${cx},${cy} ${cx + 7},${cy} Q${cx},${cy} ${cx},${cy + 7} Q${cx},${cy} ${cx - 7},${cy} Q${cx},${cy} ${cx},${cy - 7} Z`}
          fill="#FFFFFF"
        />
      ))}
    </g>
  );

  // 1. NECKLACE (Imperial Bridal)
  if (activeArt === 'necklace') {
    // Parametric point along quadratic Bézier curve: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
    const getBezierPoint = (p0: [number, number], p1: [number, number], p2: [number, number], t: number) => {
      const x = Math.round((1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0]);
      const y = Math.round((1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]);
      return [x, y];
    };

    // Tier 1: 21 stones (collar)
    const tier1Points: [number, number][] = [];
    for (let i = 0; i <= 20; i++) {
      tier1Points.push(getBezierPoint([72, 120], [200, 240], [328, 120], i / 20) as [number, number]);
    }

    // Tier 2: 17 stones (~28px lower)
    const tier2Points: [number, number][] = [];
    for (let i = 0; i <= 16; i++) {
      tier2Points.push(getBezierPoint([84, 146], [200, 270], [316, 146], i / 16) as [number, number]);
    }

    // Tier 3: 13 stones (~56px lower)
    const tier3Points: [number, number][] = [];
    for (let i = 0; i <= 12; i++) {
      tier3Points.push(getBezierPoint([98, 172], [200, 298], [302, 172], i / 12) as [number, number]);
    }

    return (
      <svg
        viewBox="0 0 400 500"
        role="img"
        aria-label="Imperial Bridal handcrafted polki necklace"
        className={className}
      >
        <CommonDefs />
        <VelvetBackdrop />

        <g filter="url(#demo-shadow)">
          {/* Gold Choker Base Wire Arcs */}
          <path d="M72,120 Q200,240 328,120" fill="none" stroke="url(#demo-gold)" strokeWidth="3.5" />
          <path d="M84,146 Q200,270 316,146" fill="none" stroke="url(#demo-gold)" strokeWidth="3" />
          <path d="M98,172 Q200,298 302,172" fill="none" stroke="url(#demo-gold)" strokeWidth="2.5" />

          {/* Tier 1 Bezel-set stones (21 stones, radius 6) */}
          {tier1Points.map(([x, y], idx) => {
            const isAmethyst = idx % 3 === 1;
            return (
              <g key={`t1-${idx}`}>
                <circle cx={x} cy={y} r="6" fill="url(#demo-gold)" />
                <circle cx={x} cy={y} r="4.5" fill={isAmethyst ? 'url(#stone-amethyst)' : 'url(#stone-facet-top)'} />
                <circle cx={x - 1} cy={y - 1} r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
              </g>
            );
          })}

          {/* Tier 2 Bezel-set stones (17 stones, radius 5) */}
          {tier2Points.map(([x, y], idx) => {
            const isAmethyst = idx % 2 === 1;
            return (
              <g key={`t2-${idx}`}>
                <circle cx={x} cy={y} r="5" fill="url(#demo-gold)" />
                <circle cx={x} cy={y} r="3.5" fill={isAmethyst ? 'url(#stone-amethyst)' : 'url(#stone-facet-top)'} />
                <circle cx={x - 1} cy={y - 1} r="1" fill="#FFFFFF" fillOpacity="0.8" />
              </g>
            );
          })}

          {/* Tier 3 Bezel-set stones (13 stones, radius 4.5) */}
          {tier3Points.map(([x, y], idx) => (
            <g key={`t3-${idx}`}>
              <circle cx={x} cy={y} r="4.5" fill="url(#demo-gold)" />
              <circle cx={x} cy={y} r="3" fill="url(#stone-facet-top)" />
              <circle cx={x - 1} cy={y - 1} r="0.8" fill="#FFFFFF" fillOpacity="0.8" />
            </g>
          ))}

          {/* Central Kundan Lotus Pendant at (200, 335) */}
          <g transform="translate(200, 335)">
            {/* Connection bail */}
            <path d="M-6,-37 L6,-37 L4,-24 L-4,-24 Z" fill="url(#demo-gold)" />
            <circle cx="0" cy="-30" r="3" fill="url(#stone-facet-top)" />

            {/* 8 Gold Lotus Petals around center */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={`petal-${i}`} transform={`rotate(${angle}) translate(0, -22)`}>
                <polygon points="0,-10 6,0 0,10 -6,0" fill="url(#demo-gold)" />
                <circle cx="0" cy="0" r="3" fill="#E9E3FB" />
              </g>
            ))}

            {/* Central Cushion-Cut Polki Gem with 8 Facets */}
            <rect x="-16" y="-16" width="32" height="32" rx="6" fill="url(#demo-gold)" />
            <polygon points="-14,-14 14,-14 10,-8 -10,-8" fill="#FFFFFF" />
            <polygon points="14,-14 14,14 8,10 8,-10" fill="#CBBEF5" />
            <polygon points="14,14 -14,14 -10,8 10,8" fill="#B7A5EE" />
            <polygon points="-14,14 -14,-14 -8,-10 -8,10" fill="#E9E3FB" />
            <rect x="-8" y="-8" width="16" height="16" rx="2" fill="url(#stone-facet-top)" />
            <circle cx="-3" cy="-3" r="2.5" fill="#FFFFFF" />

            {/* 3 Teardrop Drops ending in natural Basra pearls */}
            {/* Center drop */}
            <path d="M0,20 L0,32" stroke="url(#demo-gold)" strokeWidth="2" />
            <path d="M0,32 Q6,42 0,50 Q-6,42 0,32 Z" fill="url(#demo-gold)" />
            <circle cx="0" cy="58" r="6" fill="url(#pearl-grad)" />

            {/* Left drop */}
            <path d="M-14,16 L-18,28" stroke="url(#demo-gold)" strokeWidth="1.8" />
            <path d="M-18,28 Q-13,36 -18,44 Q-23,36 -18,28 Z" fill="url(#demo-gold)" />
            <circle cx="-18" cy="51" r="5" fill="url(#pearl-grad)" />

            {/* Right drop */}
            <path d="M14,16 L18,28" stroke="url(#demo-gold)" strokeWidth="1.8" />
            <path d="M18,28 Q23,36 18,44 Q13,36 18,28 Z" fill="url(#demo-gold)" />
            <circle cx="18" cy="51" r="5" fill="url(#pearl-grad)" />
          </g>

          {/* Two End Floral Clasp Motifs */}
          <g transform="translate(70, 120)">
            <circle cx="0" cy="0" r="8" fill="url(#demo-gold)" />
            <circle cx="0" cy="0" r="4.5" fill="url(#stone-facet-top)" />
          </g>
          <g transform="translate(330, 120)">
            <circle cx="0" cy="0" r="8" fill="url(#demo-gold)" />
            <circle cx="0" cy="0" r="4.5" fill="url(#stone-facet-top)" />
          </g>
        </g>

        {/* 3 Static Sparkles */}
        <Sparkles points={[[140, 170], [200, 310], [260, 200]]} />
      </svg>
    );
  }

  // 2. RING (Rare Solitaire)
  if (activeArt === 'ring') {
    return (
      <svg
        viewBox="0 0 400 500"
        role="img"
        aria-label="Rare Solitaire diamond ring on gold band"
        className={className}
      >
        <CommonDefs />
        <VelvetBackdrop />

        <g filter="url(#demo-shadow)">
          {/* Gold Ring Band (Three-Quarter Perspective Ellipse) */}
          <ellipse cx="200" cy="330" rx="92" ry="105" fill="none" stroke="url(#demo-gold)" strokeWidth="14" />
          <ellipse cx="200" cy="330" rx="90" ry="103" fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />

          {/* Inner band depth shadow */}
          <ellipse cx="200" cy="326" rx="84" ry="96" fill="none" stroke="#1E0B4B" strokeOpacity="0.4" strokeWidth="3" />

          {/* 6 Tapered Gold Prongs ascending to the crown */}
          <path d="M164,228 L170,195 L174,196 L168,230 Z" fill="url(#demo-gold)" />
          <path d="M236,228 L230,195 L226,196 L232,230 Z" fill="url(#demo-gold)" />
          <path d="M182,236 L184,198 L188,198 L185,238 Z" fill="url(#demo-gold)" />
          <path d="M218,236 L216,198 L212,198 L215,238 Z" fill="url(#demo-gold)" />
          <path d="M198,240 L198,200 L202,200 L202,240 Z" fill="url(#demo-gold-light)" />

          {/* Diamond Crown (diameter 74px, center at (200, 192)) */}
          <g transform="translate(200, 192)">
            {/* Girdle circle */}
            <circle cx="0" cy="0" r="37" fill="url(#demo-gold)" />
            <circle cx="0" cy="0" r="35.5" fill="#DDD6FE" />

            {/* 8 Outer Upper-Girdle Facets */}
            <polygon points="-35,0 -25,-25 0,-35 25,-25 35,0 25,25 0,35 -25,25" fill="#CBBEF5" />
            <polygon points="0,-35 25,-25 15,-15 0,-18" fill="#FFFFFF" />
            <polygon points="25,-25 35,0 18,0 15,-15" fill="#E9E3FB" />
            <polygon points="35,0 25,25 15,15 18,0" fill="#B7A5EE" />
            <polygon points="25,25 0,35 0,18 15,15" fill="#CBBEF5" />
            <polygon points="0,35 -25,25 -15,15 0,18" fill="#B7A5EE" />
            <polygon points="-25,25 -35,0 -18,0 -15,15" fill="#CBBEF5" />
            <polygon points="-35,0 -25,-25 -15,-15 -18,0" fill="#E9E3FB" />
            <polygon points="-25,-25 0,-35 0,-18 -15,-15" fill="#FFFFFF" />

            {/* 8 Star Facets */}
            <polygon points="0,-18 15,-15 10,-8" fill="#FFFFFF" />
            <polygon points="15,-15 18,0 10,0" fill="#E9E3FB" />
            <polygon points="18,0 15,15 10,8" fill="#CBBEF5" />
            <polygon points="15,15 0,18 0,10" fill="#B7A5EE" />
            <polygon points="0,18 -15,15 -10,8" fill="#CBBEF5" />
            <polygon points="-15,15 -18,0 -10,0" fill="#E9E3FB" />
            <polygon points="-18,0 -25,-25 -10,-8" fill="#FFFFFF" />

            {/* Central Octagonal Table Facet */}
            <polygon points="-10,-8 0,-12 10,-8 12,0 10,8 0,12 -10,8 -12,0" fill="url(#stone-facet-top)" />
            {/* Table highlight glare */}
            <ellipse cx="-4" cy="-4" rx="4" ry="2.5" fill="#FFFFFF" transform="rotate(-25, -4, -4)" />
          </g>

          {/* Prong Tips overlapping stone */}
          <circle cx="170" cy="195" r="2.8" fill="url(#demo-gold)" />
          <circle cx="230" cy="195" r="2.8" fill="url(#demo-gold)" />
          <circle cx="184" cy="172" r="2.8" fill="url(#demo-gold)" />
          <circle cx="216" cy="172" r="2.8" fill="url(#demo-gold)" />
          <circle cx="184" cy="216" r="2.8" fill="url(#demo-gold)" />
          <circle cx="216" cy="216" r="2.8" fill="url(#demo-gold)" />
        </g>

        {/* 3 Static Sparkles */}
        <Sparkles points={[[180, 165], [236, 185], [200, 280]]} />
      </svg>
    );
  }

  // 3. KADA (Royal Jadau Bangle)
  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label="Royal Jadau handcrafted heritage gold kada"
      className={className}
    >
      <CommonDefs />
      <VelvetBackdrop />

      <g filter="url(#demo-shadow)">
        {/* Outer Perspective Bangle Body (rx: 130, ry: 110) */}
        <ellipse cx="200" cy="265" rx="130" ry="110" fill="none" stroke="url(#demo-gold)" strokeWidth="26" />

        {/* Inner hollow hole (rx: 96, ry: 78, offset slightly upward) */}
        <ellipse cx="200" cy="254" rx="96" ry="78" fill="#1E0B4B" fillOpacity="0.85" />
        <ellipse cx="200" cy="254" rx="96" ry="78" fill="url(#demo-spotlight)" />

        {/* Curved gold highlight along top arc */}
        <path
          d="M90,230 C120,165 280,165 310,230"
          fill="none"
          stroke="#FFF4D0"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Fine row of tiny gold dots along outer & inner edges (Meenakari bead border) */}
        {Array.from({ length: 32 }).map((_, i) => {
          const rad = (i / 31) * Math.PI;
          const ox = Math.round(200 + 138 * Math.cos(rad));
          const oy = Math.round(265 + 118 * Math.sin(rad));
          const ix = Math.round(200 + 104 * Math.cos(rad));
          const iy = Math.round(265 + 88 * Math.sin(rad));
          return (
            <React.Fragment key={`bead-${i}`}>
              <circle cx={ox} cy={oy} r="1.8" fill="url(#demo-gold-light)" />
              <circle cx={ix} cy={iy} r="1.5" fill="url(#demo-gold-light)" />
            </React.Fragment>
          );
        })}

        {/* Nine Bezel-Set Gemstones along front visible lower arc (Ruby, Emerald, Diamond) */}
        {[
          { angle: 165, type: 'ruby' },
          { angle: 145, type: 'emerald' },
          { angle: 125, type: 'diamond' },
          { angle: 105, type: 'ruby' },
          { angle: 90, type: 'emerald' }, // center stone
          { angle: 75, type: 'diamond' },
          { angle: 55, type: 'ruby' },
          { angle: 35, type: 'emerald' },
          { angle: 15, type: 'diamond' },
        ].map((item, idx) => {
          const rad = (item.angle * Math.PI) / 180;
          const cx = Math.round(200 + 120 * Math.cos(rad));
          const cy = Math.round(265 + 100 * Math.sin(rad));
          const isCenter = idx === 4;
          const r = isCenter ? 12 : 9.5;

          const stoneFill =
            item.type === 'ruby'
              ? 'url(#stone-ruby)'
              : item.type === 'emerald'
              ? 'url(#stone-emerald)'
              : 'url(#stone-facet-top)';

          return (
            <g key={`kada-gem-${idx}`}>
              {/* Kundan gold collet frame */}
              <circle cx={cx} cy={cy} r={r + 3} fill="url(#demo-gold)" />
              <circle cx={cx} cy={cy} r={r + 1.5} fill="#D8B56A" stroke="#7C5212" strokeWidth="1" />
              {/* Gemstone */}
              <circle cx={cx} cy={cy} r={r} fill={stoneFill} />
              {/* Facet glint */}
              <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.28} fill="#FFFFFF" fillOpacity="0.75" />
            </g>
          );
        })}
      </g>

      {/* 3 Static Sparkles */}
      <Sparkles points={[[120, 310], [200, 375], [290, 305]]} />
    </svg>
  );
}
