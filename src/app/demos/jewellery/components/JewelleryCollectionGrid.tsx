"use client";

import React from "react";
import { jewelleryData } from "../data";
import { Sparkles, ShieldCheck } from "lucide-react";

export function JewelleryCollectionGrid() {
  return (
    <section id="collection" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#C9A24B]/10 text-[#C9A24B] mb-3 border border-[#C9A24B]/20">
          THE ROYAL ARCHIVE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3EFE6] mb-4">
          Heirloom Gold & Uncut Polki Creations
        </h2>
        <p className="text-sm sm:text-base text-[#9E9A90]">
          Each piece comes accompanied by an IGI/BIS certification card with exact net gold and gemstone weight breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jewelleryData.collection.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-[#15151A] border border-[#C9A24B]/20 overflow-hidden hover:border-[#C9A24B]/60 transition-all flex flex-col justify-between"
          >
            {/* Visual / Product Zoom Area */}
            <div className="relative aspect-square bg-[#0B0B0C] flex items-center justify-center p-6 overflow-hidden border-b border-[#C9A24B]/15">
              <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.06]">
                {/* Stylized Jewellery Illustration Icon */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#C9A24B]/20 to-[#E8D9B5]/10 border border-[#C9A24B]/30 flex items-center justify-center relative">
                  <div className="w-14 h-14 rounded-full border border-dashed border-[#C9A24B] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#C9A24B]" />
                  </div>
                </div>
              </div>

              {/* Purity Stamp Top Left */}
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-[#0B0B0C]/80 text-[#C9A24B] border border-[#C9A24B]/30 backdrop-blur-sm">
                {item.badge}
              </span>

              {/* Hallmark Badge Top Right */}
              <span className="absolute top-3 right-3 text-[#E8D9B5]/60 flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" /> 916
              </span>
            </div>

            {/* Product Meta */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono text-[#C9A24B] tracking-wide uppercase mb-1">
                  {item.purity}
                </p>
                <h3 className="font-serif font-bold text-lg text-[#F3EFE6] group-hover:text-[#E8D9B5] transition-colors leading-snug mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#9E9A90] mb-3 line-clamp-2">
                  {item.desc}
                </p>
                <p className="text-[11px] text-[#9E9A90]/80">
                  Weight: <span className="text-[#F3EFE6] font-medium">{item.weight}</span>
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-4 border-t border-[#C9A24B]/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#9E9A90] uppercase block">Price</span>
                  <span className="text-base font-bold text-[#F3EFE6]">
                    {item.price}
                  </span>
                </div>
                <a
                  href="#enquiry"
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#C9A24B] text-[#0B0B0C] hover:bg-[#D9B45C] transition-colors shadow-sm"
                >
                  {item.price.includes("request") ? "Enquire" : "View"}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

