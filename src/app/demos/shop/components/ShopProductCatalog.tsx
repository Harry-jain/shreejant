"use client";

import React, { useState } from "react";
import { shopData } from "../data";
import { ShoppingCart, Star, Check, SlidersHorizontal } from "lucide-react";

export function ShopProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [cartCount, setCartCount] = useState<number>(2);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = ["All", "Kitchen", "Wellness", "Electronics", "Home Decor"];

  const filteredProducts = shopData.products.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const numPrice = parseInt(p.price.replace(/[^\d]/g, ""), 10);
    const matchesPrice = numPrice <= maxPrice;
    return matchesCat && matchesPrice;
  });

  const handleAddToCart = (id: string) => {
    setCartCount((prev) => prev + 1);
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <section id="products" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header with Cart Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#3B3FD8]/10 text-[#3B3FD8] mb-3 border border-[#3B3FD8]/20">
            CURATED CATALOG
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14161C] mb-2">
            Everyday Essentials & Wellness
          </h2>
          <p className="text-sm sm:text-base text-[#667085]">
            100% genuine guaranteed products dispatched from our Maharashtra fulfillment hub.
          </p>
        </div>

        {/* Live Cart Counter Widget */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#3B3FD8]/20 shadow-sm shrink-0">
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-[#3B3FD8]" />
            <span className="absolute -top-2 -right-2 bg-[#FF7A1A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          </div>
          <div className="text-xs">
            <span className="text-[#667085] block">Cart Total</span>
            <span className="font-bold text-[#14161C]">₹{(cartCount * 850).toLocaleString("en-IN")}</span>
          </div>
          <a
            href="#checkout"
            className="ml-2 px-3 py-1 text-xs font-semibold rounded-lg bg-[#3B3FD8] text-white hover:bg-[#2F32B5] transition-colors"
          >
            Checkout
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm h-fit">
          <div className="flex items-center gap-2 font-bold text-sm text-[#14161C] mb-6 pb-3 border-b border-[#E2E8F0]">
            <SlidersHorizontal className="w-4 h-4 text-[#3B3FD8]" />
            <span>Filter Catalog</span>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="text-xs font-bold text-[#14161C] uppercase tracking-wider block mb-3">
              Category
            </label>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? "bg-[#3B3FD8] text-white font-semibold"
                      : "text-[#667085] hover:bg-[#F7F8FA]"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6 pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#14161C] mb-2">
              <span className="uppercase tracking-wider">Max Price</span>
              <span className="text-[#3B3FD8]">₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="400"
              max="3500"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#3B3FD8] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#667085] mt-1">
              <span>₹400</span>
              <span>₹3,500</span>
            </div>
          </div>

          {/* Trust assurances */}
          <div className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs space-y-2 text-[#667085]">
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>COD Available Nationwide</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#3B3FD8] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#3B3FD8]" />
              <span>Free Delivery Over ₹499</span>
            </div>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const isJustAdded = addedItem === p.id;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  {/* Product Visual Area */}
                  <div className="relative aspect-[4/3] bg-gradient-to-tr from-[#F7F8FA] to-[#EEF2FF] p-6 flex items-center justify-center border-b border-[#E2E8F0]">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-[#E2E8F0] flex items-center justify-center text-[#3B3FD8] font-bold text-sm">
                      {p.category.slice(0, 3).toUpperCase()}
                    </div>

                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#14161C] text-white">
                      {p.badge}
                    </span>

                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF7A1A]/10 text-[#FF7A1A]">
                      {p.discount}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-[#FF7A1A] font-semibold mb-1">
                        <Star className="w-3.5 h-3.5 fill-[#FF7A1A]" />
                        <span>{p.rating}</span>
                        <span className="text-[#667085] font-normal">({p.reviews})</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-[#14161C] leading-snug mb-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#667085] mb-4 line-clamp-2">
                        {p.desc}
                      </p>
                    </div>

                    {/* Price and Cart Button */}
                    <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-[#14161C]">{p.price}</span>
                        <span className="text-xs text-[#94A3B8] line-through ml-1.5">{p.mrp}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(p.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isJustAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#3B3FD8] text-white hover:bg-[#2F32B5]"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" /> Add to cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

