'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { CoverArt } from '@/components/blog/CoverArt';
import {
  sanitizePostClaims,
  getCategoryDefinition,
  formatBlogDate,
  formatReadTime,
} from '@/lib/blog';
import { BLOG_LOCALES } from '@/content/blog/translations';
import { useLanguage } from '@/i18n';

export interface BlogCardProps {
  post: BlogPost;
  layout?: 'grid' | 'horizontal';
  className?: string;
}

export function BlogCard({ post, layout = 'grid', className = '' }: BlogCardProps) {
  const { t, lang } = useLanguage();
  const { title, excerpt, isUnverified, categorySlug, coverArt } = sanitizePostClaims(post);
  const categoryDef = getCategoryDefinition(categorySlug);
  const categoryLabel = t(categoryDef.i18nKey) || post.frontmatter.category;
  const formattedDate = formatBlogDate(post.frontmatter.date, lang);
  const formattedRead = formatReadTime(post.frontmatter.readTime, t);

  const localized = (lang === 'hi' || lang === 'mr') ? BLOG_LOCALES[post.frontmatter.slug]?.[lang] : null;
  const displayTitle = localized?.title || title;
  const displayExcerpt = localized?.excerpt || excerpt;
  const displayCategory = localized?.category || categoryLabel;
  const displayReadTime = localized?.readTime || formattedRead;

  if (layout === 'horizontal') {
    return (
      <Link
        href={`/blog/${post.frontmatter.slug}`}
        className={`block group rounded-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] ${className}`}
      >
        <div className="p-6 rounded-[22px] bg-white dark:bg-[#12151F] border border-black/10 dark:border-white/10 group-hover:border-[#7C5CFC]/40 transition-all shadow-sm group-hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Cover Left (5 cols) */}
            <div className="md:col-span-5 w-full">
              <CoverArt kind={coverArt} />
            </div>

            {/* Content Right (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                {/* Category */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-[#7C5CFC] dark:text-[#A78BFA] bg-[#7C5CFC]/10 rounded-full px-3 py-1 border border-[#7C5CFC]/20">
                    {displayCategory}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink dark:text-white group-hover:text-[#7C5CFC] transition-colors leading-snug line-clamp-3 mb-2 tracking-tight">
                  {displayTitle}
                </h3>

                {/* Excerpt */}
                <p className="font-body text-sm text-ink/70 dark:text-white/70 leading-relaxed line-clamp-3">
                  {displayExcerpt}
                </p>
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10 text-xs text-ink/60 dark:text-white/60 font-body">
                <div className="flex items-center gap-3">
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7C5CFC]" />
                    <span>{displayReadTime}</span>
                  </div>
                </div>

                <span className="font-heading font-semibold text-xs text-[#7C5CFC] dark:text-[#A78BFA] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{t('blog.read') || 'Read'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Standard Grid Layout (aspect 16/10 cover on top)
  return (
    <Link
      href={`/blog/${post.frontmatter.slug}`}
      className={`block group h-full rounded-[22px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] ${className}`}
    >
      <div className="h-full p-5 sm:p-6 rounded-[22px] bg-white dark:bg-[#12151F] border border-black/10 dark:border-white/10 group-hover:border-[#7C5CFC]/40 flex flex-col justify-between transition-all shadow-sm group-hover:shadow-xl">
        <div>
          {/* Cover Art */}
          <div className="mb-4">
            <CoverArt kind={coverArt} />
          </div>

          {/* Category Chip */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-medium text-[#7C5CFC] dark:text-[#A78BFA] bg-[#7C5CFC]/10 rounded-full px-3 py-0.5 border border-[#7C5CFC]/20">
              {displayCategory}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-lg sm:text-[19px] text-ink dark:text-white group-hover:text-[#7C5CFC] transition-colors leading-snug line-clamp-3 mb-2 tracking-tight">
            {displayTitle}
          </h3>

          {/* Excerpt */}
          <p className="font-body text-xs sm:text-sm text-ink/70 dark:text-white/70 leading-relaxed line-clamp-3 mb-4">
            {displayExcerpt}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10 text-xs text-ink/60 dark:text-white/60 font-body mt-auto">
          <div className="flex items-center gap-2.5">
            <span>{formattedDate}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#7C5CFC]" />
              <span>{displayReadTime}</span>
            </div>
          </div>

          <span className="font-heading font-semibold text-xs text-[#7C5CFC] dark:text-[#A78BFA] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{t('blog.read') || 'Read'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
