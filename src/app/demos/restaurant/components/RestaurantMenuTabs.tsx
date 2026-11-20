"use client";

import React, { useState } from "react";
import { restaurantData } from "../data";

export function RestaurantMenuTabs() {
  const [activeTab, setActiveTab] = useState(restaurantData.menu.tabs[0].id);

  const currentTab =
    restaurantData.menu.tabs.find((t) => t.id === activeTab) ||
    restaurantData.menu.tabs[0];

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-rose-900/10 text-rose-900 mb-3 border border-rose-900/20">
          {restaurantData.menu.badge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          {restaurantData.menu.title}
        </h2>
        <p className="text-sm sm:text-base text-stone-600">
          {restaurantData.menu.subhead}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {restaurantData.menu.tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-rose-900 text-white shadow-md shadow-rose-900/20"
                  : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTab.items.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {/* Veg / Non-Veg Icon */}
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border p-[2px] shrink-0 ${
                      item.veg
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-rose-700 bg-rose-50"
                    }`}
                    title={item.veg ? "Vegetarian" : "Non-Vegetarian"}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.veg ? "bg-emerald-600" : "bg-rose-700"
                      }`}
                    />
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                    {item.name}
                  </h3>
                </div>
                <span className="font-semibold text-rose-900 text-base shrink-0">
                  {item.price}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Fresh daily batch</span>
              <a
                href="#reservation"
                className="text-rose-900 font-semibold hover:underline"
              >
                Order for table →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
