import React from 'react';

interface CharacterProps {
  className?: string;
}

export function ArchitectCharacter({ className = 'w-auto h-40 sm:h-44' }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} animate-character-bob`}
      aria-hidden="true"
    >
      <g className="animate-character-wiggle">
        {/* Body / Torso (Soft Cream shirt, 2px navy outline) */}
        <path
          d="M 50 140 L 42 175 L 118 175 L 110 140 Z"
          fill="#FFF8E7"
          stroke="#0A1628"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Suspenders / Tie motif */}
        <line x1="72" y1="140" x2="70" y2="175" stroke="#FFB830" strokeWidth="3" />
        <line x1="88" y1="140" x2="90" y2="175" stroke="#FFB830" strokeWidth="3" />

        {/* Head: Round face */}
        <circle cx="80" cy="88" r="38" fill="#FFF8E7" stroke="#0A1628" strokeWidth="2.5" />

        {/* Two Dot Eyes with CSS blink */}
        <g className="animate-eye-blink">
          <circle cx="68" cy="86" r="3.5" fill="#0A1628" />
          <circle cx="92" cy="86" r="3.5" fill="#0A1628" />
        </g>

        {/* Rosy blush dots */}
        <circle cx="60" cy="94" r="3" fill="#FFB830" opacity="0.6" />
        <circle cx="100" cy="94" r="3" fill="#FFB830" opacity="0.6" />

        {/* Small Smile */}
        <path
          d="M 73 98 Q 80 105 87 98"
          stroke="#0A1628"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hard Hat (Bright Gold) */}
        <path
          d="M 44 65 Q 44 32 80 32 Q 116 32 116 65 Z"
          fill="#FFB830"
          stroke="#0A1628"
          strokeWidth="2.5"
        />
        {/* Hard hat brim */}
        <path
          d="M 38 65 Q 80 60 122 65"
          stroke="#0A1628"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Hard hat crest ridge */}
        <rect x="76" y="32" width="8" height="30" rx="3" fill="#C9A84C" stroke="#0A1628" strokeWidth="1.5" />

        {/* Rolled Blueprint (Left hand holding rolled cylinder) */}
        <g transform="rotate(-20 30 140)">
          <rect x="18" y="125" width="46" height="12" rx="4" fill="#C9A84C" stroke="#0A1628" strokeWidth="2" />
          <ellipse cx="64" cy="131" rx="3" ry="6" fill="#FFF8E7" stroke="#0A1628" strokeWidth="1.5" />
          <line x1="28" y1="125" x2="28" y2="137" stroke="#0A1628" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>

        {/* Ruler in hand */}
        <g transform="rotate(35 125 145)">
          <rect x="110" y="115" width="8" height="42" rx="2" fill="#FFB830" stroke="#0A1628" strokeWidth="2" />
          <line x1="110" y1="122" x2="114" y2="122" stroke="#0A1628" strokeWidth="1.5" />
          <line x1="110" y1="128" x2="116" y2="128" stroke="#0A1628" strokeWidth="1.5" />
          <line x1="110" y1="134" x2="114" y2="134" stroke="#0A1628" strokeWidth="1.5" />
          <line x1="110" y1="140" x2="116" y2="140" stroke="#0A1628" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}

export function RobotCharacter({ className = 'w-auto h-40 sm:h-44' }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} animate-character-bob`}
      aria-hidden="true"
    >
      <g className="animate-character-wiggle">
        {/* Little Antenna with gold pulse beacon */}
        <line x1="80" y1="44" x2="80" y2="22" stroke="#0A1628" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="18" r="6" fill="#FFF3CD" stroke="#0A1628" strokeWidth="2" />
        <circle cx="80" cy="18" r="2.5" fill="#0A1628" />

        {/* Robot Head (Rounded box with Navy fill to contrast with Bright Gold panel) */}
        <rect
          x="45"
          y="44"
          width="70"
          height="56"
          rx="16"
          fill="#0A1628"
          stroke="#0A1628"
          strokeWidth="2.5"
        />

        {/* Cute Screen Visor */}
        <rect
          x="53"
          y="52"
          width="54"
          height="38"
          rx="10"
          fill="#263D59"
          stroke="#C9A84C"
          strokeWidth="1.5"
        />

        {/* Glowing friendly eyes with CSS blink */}
        <g className="animate-eye-blink">
          <circle cx="68" cy="68" r="4.5" fill="#FFF3CD" />
          <circle cx="92" cy="68" r="4.5" fill="#FFF3CD" />
          <circle cx="69" cy="67" r="1.5" fill="#0A1628" />
          <circle cx="93" cy="67" r="1.5" fill="#0A1628" />
        </g>

        {/* Happy digital mouth */}
        <path
          d="M 74 79 Q 80 84 86 79"
          stroke="#FFF3CD"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ears / Bolts */}
        <rect x="39" y="62" width="6" height="12" rx="2" fill="#C9A84C" stroke="#0A1628" strokeWidth="1.5" />
        <rect x="115" y="62" width="6" height="12" rx="2" fill="#C9A84C" stroke="#0A1628" strokeWidth="1.5" />

        {/* Robot Torso */}
        <path
          d="M 48 110 L 42 175 L 118 175 L 112 110 Z"
          fill="#263D59"
          stroke="#0A1628"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Chest panel screen with heart / power wave */}
        <rect x="62" y="122" width="36" height="24" rx="6" fill="#0A1628" stroke="#C9A84C" strokeWidth="1.5" />
        <path
          d="M 68 134 L 74 134 L 77 127 L 83 140 L 86 134 L 92 134"
          stroke="#FFF3CD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Left Hand: Chat Bubble with 3 dots */}
        <g transform="translate(14, 88)">
          <rect x="0" y="0" width="30" height="22" rx="6" fill="#FFF8E7" stroke="#0A1628" strokeWidth="2" />
          <polygon points="10,22 6,28 16,22" fill="#FFF8E7" stroke="#0A1628" strokeWidth="1.5" />
          <circle cx="7" cy="11" r="2" fill="#0A1628" />
          <circle cx="15" cy="11" r="2" fill="#0A1628" />
          <circle cx="23" cy="11" r="2" fill="#0A1628" />
        </g>

        {/* Right Hand: Mechanical Cog / Gear */}
        <g transform="translate(116, 126)">
          <circle cx="16" cy="16" r="12" fill="#C9A84C" stroke="#0A1628" strokeWidth="2" />
          <circle cx="16" cy="16" r="4.5" fill="#FFF3CD" stroke="#0A1628" strokeWidth="1.5" />
          <rect x="14" y="0" width="4" height="6" fill="#C9A84C" stroke="#0A1628" strokeWidth="1" />
          <rect x="14" y="26" width="4" height="6" fill="#C9A84C" stroke="#0A1628" strokeWidth="1" />
          <rect x="0" y="14" width="6" height="4" fill="#C9A84C" stroke="#0A1628" strokeWidth="1" />
          <rect x="26" y="14" width="6" height="4" fill="#C9A84C" stroke="#0A1628" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}

export function DesignerCharacter({ className = 'w-auto h-40 sm:h-44' }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} animate-character-bob`}
      aria-hidden="true"
    >
      <g className="animate-character-wiggle">
        {/* Torso (Dark Navy sweater for contrast with Light Gold Tint panel) */}
        <path
          d="M 50 140 L 42 175 L 118 175 L 110 140 Z"
          fill="#0A1628"
          stroke="#0A1628"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Turtleneck collar */}
        <rect x="65" y="132" width="30" height="12" rx="4" fill="#263D59" stroke="#0A1628" strokeWidth="2" />

        {/* Head: Round face */}
        <circle cx="80" cy="88" r="38" fill="#FFF8E7" stroke="#0A1628" strokeWidth="2.5" />

        {/* Two Dot Eyes with CSS blink */}
        <g className="animate-eye-blink">
          <circle cx="68" cy="86" r="3.5" fill="#0A1628" />
          <circle cx="92" cy="86" r="3.5" fill="#0A1628" />
        </g>

        {/* Round artist glasses */}
        <circle cx="68" cy="86" r="10" stroke="#0A1628" strokeWidth="2" fill="none" />
        <circle cx="92" cy="86" r="10" stroke="#0A1628" strokeWidth="2" fill="none" />
        <line x1="78" y1="86" x2="82" y2="86" stroke="#0A1628" strokeWidth="2" />

        {/* Rosy blush dots */}
        <circle cx="56" cy="95" r="3" fill="#FFB830" opacity="0.6" />
        <circle cx="104" cy="95" r="3" fill="#FFB830" opacity="0.6" />

        {/* Smile */}
        <path
          d="M 74 100 Q 80 106 86 100"
          stroke="#0A1628"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Designer Beret tilted jauntily (Bright Gold) */}
        <g transform="rotate(-12 80 50)">
          <path
            d="M 40 54 Q 46 28 80 28 Q 114 28 120 54 Q 80 62 40 54 Z"
            fill="#FFB830"
            stroke="#0A1628"
            strokeWidth="2.5"
          />
          <circle cx="80" cy="27" r="3" fill="#0A1628" />
        </g>

        {/* Pencil tucked behind ear */}
        <g transform="rotate(40 108 72)">
          <polygon points="106,62 110,62 108,54" fill="#0A1628" />
          <rect x="106" y="62" width="4" height="24" rx="1" fill="#C9A84C" stroke="#0A1628" strokeWidth="1" />
          <rect x="106" y="86" width="4" height="5" fill="#FFB830" stroke="#0A1628" strokeWidth="1" />
        </g>

        {/* Left Hand: Holding Colour Swatch Fan */}
        <g transform="translate(18, 122)">
          {/* Fan blade 1 */}
          <rect x="12" y="10" width="10" height="28" rx="2" fill="#FFB830" stroke="#0A1628" strokeWidth="1.5" transform="rotate(-30 17 38)" />
          {/* Fan blade 2 */}
          <rect x="16" y="6" width="10" height="28" rx="2" fill="#C9A84C" stroke="#0A1628" strokeWidth="1.5" transform="rotate(-10 21 34)" />
          {/* Fan blade 3 */}
          <rect x="22" y="8" width="10" height="28" rx="2" fill="#263D59" stroke="#0A1628" strokeWidth="1.5" transform="rotate(15 27 36)" />
          {/* Swatch rivet */}
          <circle cx="28" cy="38" r="3" fill="#FFF8E7" stroke="#0A1628" strokeWidth="1.5" />
        </g>

        {/* Right Hand: Stylus / Pencil */}
        <g transform="translate(116, 120) rotate(-25)">
          <polygon points="6,34 10,34 8,42" fill="#0A1628" />
          <rect x="6" y="4" width="4" height="30" rx="1" fill="#FFB830" stroke="#0A1628" strokeWidth="1.5" />
          <circle cx="8" cy="4" r="3" fill="#C9A84C" stroke="#0A1628" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}

export function TeamCharacter({
  character,
  className = 'w-auto h-40 sm:h-44',
}: {
  character: 'architect' | 'robot' | 'designer';
  className?: string;
}) {
  switch (character) {
    case 'architect':
      return <ArchitectCharacter className={className} />;
    case 'robot':
      return <RobotCharacter className={className} />;
    case 'designer':
    default:
      return <DesignerCharacter className={className} />;
  }
}

export default TeamCharacter;
