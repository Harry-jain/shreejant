"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  metric: string;
  specCode: string;
  href: string;
  image: string;
}

const ROW_ONE: ShowcaseItem[] = [
  {
    id: "salon",
    title: "Aura Studio & Sanctuary",
    category: "Salon & Wellness",
    metric: "+340% Direct Bookings",
    specCode: "SPEC // 01 · RET",
    href: "/demos/salon",
    image: "/assets/showcase/salon.webp",
  },
  {
    id: "jewellery",
    title: "Kanak Heritage Jewels",
    category: "Luxury Retail",
    metric: "₹1.8Cr Vault Sales",
    specCode: "SPEC // 02 · LUX",
    href: "/demos/jewellery",
    image: "/assets/showcase/jewellery.webp",
  },
  {
    id: "clinic",
    title: "Dr. Vora Medical Clinic",
    category: "Healthcare & AI Triage",
    metric: "99.4% Patient Match",
    specCode: "SPEC // 03 · MED",
    href: "/demos/clinic",
    image: "/assets/showcase/clinic.webp",
  },
  {
    id: "restaurant",
    title: "The Bombay Bistro",
    category: "Fine Dining & Bar",
    metric: "1,400+ Tables/Mo",
    specCode: "SPEC // 04 · HOS",
    href: "/demos/restaurant",
    image: "/assets/showcase/restaurant.webp",
  },
];

const ROW_TWO: ShowcaseItem[] = [
  {
    id: "gym",
    title: "IronCore Athletics",
    category: "Fitness & Training",
    metric: "+185% Subscriptions",
    specCode: "SPEC // 05 · ATH",
    href: "/demos/gym",
    image: "/assets/showcase/gym.webp",
  },
  {
    id: "shop",
    title: "Anayra Fashion D2C",
    category: "eCommerce Store",
    metric: "₹45L Quarter GMV",
    specCode: "SPEC // 06 · COM",
    href: "/demos/shop",
    image: "/assets/showcase/shop.webp",
  },
  {
    id: "classes",
    title: "Zenith Academy",
    category: "EdTech & Coaching",
    metric: "5,200+ Enrolled",
    specCode: "SPEC // 07 · EDU",
    href: "/demos/classes",
    image: "/assets/showcase/classes.webp",
  },
  {
    id: "general",
    title: "Nexus Enterprise AI",
    category: "B2B Automation",
    metric: "24/7 Zero Human Drop",
    specCode: "SPEC // 08 · ENT",
    href: "/demos/general",
    image: "/assets/showcase/general.webp",
  },
];

function CardTile({ item }: { item: ShowcaseItem }) {
  return (
    <Link
      href={item.href}
      className="group relative flex flex-col justify-between w-[300px] sm:w-[360px] md:w-[380px] h-[250px] sm:h-[265px] mx-3 sm:mx-4 p-4 sm:p-5 rounded-2xl bg-[#0E121E] border border-white/10 hover:border-[#7C5CFC]/60 shrink-0 select-none shadow-[0_12px_32px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_48px_rgba(124,92,252,0.22)] transition-all duration-300 hover:-translate-y-2"
    >
      {/* Top Header: Specification Code + Category + Arrow */}
      <div className="flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#7C5CFC]/15 text-[#A78BFA] border border-[#7C5CFC]/30 font-semibold">
            {item.specCode}
          </span>
          <span className="text-white/20 shrink-0">|</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/70 truncate">
            {item.category}
          </span>
        </div>

        <div className="shrink-0 w-7 h-7 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/70 group-hover:border-[#7C5CFC] group-hover:bg-[#7C5CFC] group-hover:text-white transition-all duration-300 shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Middle: Clean Dedicated Preview Vignette (Framed, NO text overlap or bleeding) */}
      <div className="relative w-full h-[115px] sm:h-[125px] rounded-xl overflow-hidden bg-[#090C15] border border-white/[0.08] my-2 group-hover:border-[#7C5CFC]/30 transition-colors">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 300px, 380px"
          className="object-cover object-top filter brightness-95 contrast-105 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500 ease-out"
        />
        {/* Subtle bottom vignette inside image window */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#090C15]/80 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Footer: Metric Badge + Client Name */}
      <div className="flex items-center justify-between gap-2 z-10 pt-1">
        <h4 className="font-heading font-bold text-sm sm:text-base text-[#F4F7FB] tracking-tight leading-snug group-hover:text-white transition-colors truncate">
          {item.title}
        </h4>

        <div className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] font-mono text-[10px] sm:text-[11px] font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{item.metric}</span>
        </div>
      </div>
    </Link>
  );
}

export function MarqueeShowcase() {
  return (
    <div className="w-full overflow-hidden py-4 sm:py-6 relative select-none">
      {/* Edge gradient masks for smooth soft fade (no hard dark clipping) */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#090C15] via-[#090C15]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#090C15] via-[#090C15]/80 to-transparent z-20 pointer-events-none" />

      {/* Row 1 — Moving Left */}
      <div className="marquee-track-left mb-3 sm:mb-4">
        {[...ROW_ONE, ...ROW_ONE, ...ROW_ONE].map((item, idx) => (
          <CardTile key={`r1-${item.id}-${idx}`} item={item} />
        ))}
      </div>

      {/* Row 2 — Moving Right */}
      <div className="marquee-track-right">
        {[...ROW_TWO, ...ROW_TWO, ...ROW_TWO].map((item, idx) => (
          <CardTile key={`r2-${item.id}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MarqueeShowcase;