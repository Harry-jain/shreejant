"use client";

import React from "react";
import { salonData } from "../data";
import { Clock } from "lucide-react";

export function SalonTreatmentsGrid() {
  return (
    <section id="treatments" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-rose-900/10 text-rose-900 mb-3 border border-rose-900/20">
          CURATED RITUALS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          Signature Treatments & Bridal Couture
        </h2>
        <p className="text-sm sm:text-base text-stone-600">
          Each treatment is performed in private treatment suites using dermatologically certified botanicals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salonData.treatments.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600">
                  <Clock className="w-3.5 h-3.5 text-rose-800" />
                  {item.duration}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-50 text-rose-800 border border-rose-300">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-stone-900 mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Treatment Fee</span>
                <span className="text-lg font-bold text-rose-800">{item.price}</span>
              </div>
              <a
                href="#booking"
                className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-800 text-white hover:bg-rose-900 transition-colors shadow-sm"
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
