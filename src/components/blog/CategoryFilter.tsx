'use client';

import React from 'react';
import { BlogCategorySlug } from '@/types/blog';
import { BLOG_CATEGORIES } from '@/lib/blog';
import { useLanguage } from '@/i18n';

export interface CategoryFilterProps {
  activeCategory: BlogCategorySlug | 'all';
  onSelectCategory: (category: BlogCategorySlug | 'all') => void;
  categoryCounts: Record<BlogCategorySlug | 'all', number>;
}

export function CategoryFilter({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFilterProps) {
  const { t } = useLanguage();

  const filterItems: Array<{ slug: BlogCategorySlug | 'all'; label: string }> = [
    { slug: 'all', label: t('blog.filter_all') || 'All' },
    ...BLOG_CATEGORIES.map((cat) => ({
      slug: cat.slug,
      label: t(cat.i18nKey) || cat.slug,
    })),
  ];

  return (
    <nav aria-label="Blog categories" className="mb-10">
      <div className="flex flex-wrap items-center gap-2.5">
        {filterItems.map((item) => {
          const isSelected = activeCategory === item.slug;
          const count = categoryCounts[item.slug] ?? 0;

          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => onSelectCategory(item.slug)}
              aria-pressed={isSelected}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-150 cursor-pointer select-none inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] ${
                isSelected
                  ? 'bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/25'
                  : 'bg-white dark:bg-[#12151F] text-ink/75 dark:text-white/75 border border-black/10 dark:border-white/10 hover:border-[#7C5CFC]/40'
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`text-[10.5px] font-mono px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[#7C5CFC]/10 text-[#7C5CFC]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
