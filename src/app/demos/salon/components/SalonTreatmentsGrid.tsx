"use client";

import React from "react";
import { salonData } from "../data";
import { Clock, Sparkles } from "lucide-react";

export function SalonTreatmentsGrid() {
  return (
    <section id="treatments" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#A4565F]/10 text-[#A4565F] mb-3 border border-[#A4565F]/20">
          CURATED RITUALS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1F1F] mb-4">
          Signature Treatments & Bridal Couture
        </h2>
        <p className="text-sm sm:text-base text-[#786565]">
          Each treatment is performed in private treatment suites using dermatologically certified botanicals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salonData.treatments.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-[#C98A8A]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#786565]">
                  <Clock className="w-3.5 h-3.5 text-[#A4565F]" />
                  {item.duration}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FBF4EF] text-[#A4565F] border border-[#C98A8A]/40">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-[#2B1F1F] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#786565] leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#2B1F1F]/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#786565] block">Treatment Fee</span>
                <span className="text-lg font-bold text-[#A4565F]">{item.price}</span>
              </div>
              <a
                href="#booking"
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#A4565F] text-white hover:bg-[#8E444D] transition-colors shadow-sm shadow-[#A4565F]/20"
              >
                Book this →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

