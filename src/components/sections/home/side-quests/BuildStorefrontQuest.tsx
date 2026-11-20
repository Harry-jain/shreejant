"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Palette, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ThemeStyle = "editorial" | "minimal" | "bold";
type AccentChoice = "orange" | "lime" | "blue" | "charcoal";
type Viewport = "desktop" | "mobile";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  tag: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Artisanal Brass Filter Coffee Dripper",
    price: "₹1,850",
    category: "Brewing Tools",
    tag: "Small-Batch",
  },
  {
    id: "p2",
    name: "Cold-Pressed Botanical Hair Elixir",
    price: "₹1,200",
    category: "Organic Care",
    tag: "Pure Oil",
  },
  {
    id: "p3",
    name: "Hand-Thrown Ceramic Dining Bowl",
    price: "₹950",
    category: "Tableware",
    tag: "Studio Made",
  },
];

export function BuildStorefrontQuest() {
  const [theme, setTheme] = useState<ThemeStyle>("editorial");
  const [accent, setAccent] = useState<AccentChoice>("orange");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [selectedProduct, setSelectedProduct] = useState<Product>(SAMPLE_PRODUCTS[0]);
  const [addedToCart, setAddedToCart] = useState(false);

  const getAccentClass = () => {
    switch (accent) {
      case "orange":
        return "bg-[#F05D35] text-white";
      case "lime":
        return "bg-[#D7E66B] text-[#181818]";
      case "blue":
        return "bg-[#B9D8EF] text-[#181818]";
      case "charcoal":
        return "bg-[#181818] text-[#F5F2EA]";
    }
  };

  const getThemeContainerClass = () => {
    switch (theme) {
      case "editorial":
        return "bg-[#F5F2EA] text-[#181818] font-serif";
      case "minimal":
        return "bg-[#FFFFFF] text-[#111827] font-sans";
      case "bold":
        return "bg-[#181818] text-[#F5F2EA] font-mono";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent-blue/50 text-text font-semibold">
              Quest 003 // Frontend Craft
            </span>
            <span className="text-xs text-muted font-mono">Live Customizer</span>
          </div>
          <h4 className="font-display text-lg sm:text-xl font-bold text-text mt-1">
            Build a Storefront: Interactive Architecture Playground
          </h4>
        </div>

        {/* Viewport switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-bg-secondary border border-border">
          <button
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-all ${
              viewport === "desktop"
                ? "bg-surface text-text shadow-sm font-semibold"
                : "text-muted hover:text-text"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-all ${
              viewport === "mobile"
                ? "bg-surface text-text shadow-sm font-semibold"
                : "text-muted hover:text-text"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>
      </div>

      {/* Customizer controls bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-surface border border-border text-xs font-mono">
        {/* Theme select */}
        <div>
          <span className="text-muted block mb-2 uppercase text-[10px]">01. Visual Language</span>
          <div className="flex flex-wrap gap-1.5">
            {(["editorial", "minimal", "bold"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-2.5 py-1 rounded border capitalize transition-colors ${
                  theme === t
                    ? "bg-text text-bg border-text font-bold"
                    : "bg-bg-secondary text-muted border-border hover:border-text"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Accent color select */}
        <div>
          <span className="text-muted block mb-2 uppercase text-[10px]">02. Accent Token</span>
          <div className="flex items-center gap-2">
            {[
              { id: "orange", color: "#F05D35", label: "Orange" },
              { id: "lime", color: "#D7E66B", label: "Lime" },
              { id: "blue", color: "#B9D8EF", label: "Blue" },
              { id: "charcoal", color: "#181818", label: "Charcoal" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setAccent(c.id as AccentChoice)}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  accent === c.id ? "scale-110 border-text shadow-sm ring-1 ring-text" : "border-transparent"
                }`}
                style={{ backgroundColor: c.color }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        {/* Sample product select */}
        <div>
          <span className="text-muted block mb-2 uppercase text-[10px]">03. Catalog Item</span>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const found = SAMPLE_PRODUCTS.find((p) => p.id === e.target.value);
              if (found) setSelectedProduct(found);
            }}
            className="w-full bg-bg-secondary border border-border text-text rounded px-2 py-1 text-xs"
          >
            {SAMPLE_PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Preview Container */}
      <div className="flex justify-center p-4 sm:p-8 bg-bg-secondary/60 rounded-xl border border-border overflow-hidden">
        <div
          className={`transition-all duration-300 rounded-xl border border-border shadow-md overflow-hidden ${
            viewport === "mobile" ? "w-[340px]" : "w-full max-w-2xl"
          }`}
        >
          {/* Simulated Browser Bar */}
          <div className="px-4 py-2 bg-surface/90 border-b border-border flex items-center justify-between text-[11px] font-mono text-muted">
            <span className="truncate">studio-preview.shreejanai.in</span>
            <span className="text-[10px] uppercase font-bold text-accent">Interactive Craft</span>
          </div>

          {/* Rendered Storefront Body */}
          <div className={`p-6 sm:p-8 ${getThemeContainerClass()} transition-colors`}>
            <div className="flex items-center justify-between pb-4 border-b border-current/10 text-xs">
              <span className="font-bold tracking-wider uppercase text-sm">ATELIER STUDIO</span>
              <span className="flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5" /> Cart ({addedToCart ? "1" : "0"})
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Product illustration placeholder */}
              <div className="sm:col-span-5 aspect-square rounded-lg bg-current/5 border border-current/10 flex flex-col items-center justify-center p-4 text-center">
                <span className="font-mono text-[10px] uppercase opacity-60 mb-2">
                  {selectedProduct.category}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded border border-current/20">
                  {selectedProduct.tag}
                </span>
              </div>

              {/* Product Details */}
              <div className="sm:col-span-7 space-y-3">
                <div className="text-xs uppercase opacity-75 font-mono">
                  Collection // 2026
                </div>
                <h5 className="text-lg sm:text-xl font-bold leading-tight">
                  {selectedProduct.name}
                </h5>
                <div className="text-base sm:text-lg font-mono font-bold">
                  {selectedProduct.price}
                </div>
                <p className="text-xs opacity-80 leading-relaxed font-sans">
                  Engineered with clean typography, responsive layout scaling, and instantaneous client-side state transitions.
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setAddedToCart(true)}
                    className={`px-4 py-2 text-xs font-mono font-semibold rounded-lg transition-transform active:scale-95 flex items-center gap-1.5 ${getAccentClass()}`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added to Bag
                      </>
                    ) : (
                      "Add to Bag"
                    )}
                  </button>
                  {addedToCart && (
                    <button
                      onClick={() => setAddedToCart(false)}
                      className="text-[11px] font-mono opacity-60 hover:opacity-100 underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted font-mono">
        <span>Outcome: Responsive, tailor-made digital storefronts designed for brand distinctiveness.</span>
        <Button href="/contact" variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
          Start Custom Storefront
        </Button>
      </div>
    </div>
  );
}
