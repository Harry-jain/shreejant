"use client";

import React from "react";

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function ProjectFilter({
  categories,
  activeCategory,
  onSelect,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-full text-xs font-heading font-semibold tracking-wider transition-all duration-200 ${
            activeCategory === cat
              ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
              : "bg-brand-surface text-brand-muted hover:text-brand-text border border-brand-border"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

