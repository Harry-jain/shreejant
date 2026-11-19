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

export interface BlogFeaturedProps {
  post: BlogPost;
  className?: string;
}

export function BlogFeatured({ post, className = '' }: BlogFeaturedProps) {
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
  const translatedCta = t('blog.read_article');
  const ctaLabel = translatedCta && translatedCta !== 'blog.read_article' 
    ? translatedCta 
    : (t('blog_page.read_article') !== 'blog_page.read_article' ? t('blog_page.read_article') : 'Read Article');

  return (
    <div className={`relative ${className}`}>
      <Link
        href={`/blog/${post.frontmatter.slug}`}
        className="block group rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
      >
        <div className="p-6 sm:p-9 rounded-[24px] bg-white dark:bg-[#12151F] border border-black/10 dark:border-white/10 group-hover:border-[#7C5CFC]/40 transition-all shadow-md group-hover:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left Content (7 cols on desktop) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4 order-2 md:order-1">
              <div>
                {/* Category */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-[#7C5CFC] dark:text-[#A78BFA] bg-[#7C5CFC]/10 rounded-full px-3.5 py-1 border border-[#7C5CFC]/20">
                    {displayCategory}
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="font-heading font-bold text-[clamp(24px,2.6vw,34px)] leading-tight text-ink dark:text-white tracking-tight group-hover:text-[#7C5CFC] transition-colors line-clamp-3 mb-3">
                  {displayTitle}
                </h2>

                {/* Excerpt */}
                <p className="font-body text-sm sm:text-base text-ink/70 dark:text-white/70 leading-relaxed line-clamp-3 mb-6">
                  {displayExcerpt}
                </p>
              </div>

              {/* Meta row + Read Action */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-ink/60 dark:text-white/60 font-body">
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7C5CFC]" />
                    <span>{displayReadTime}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-semibold text-xs sm:text-sm shadow-md shadow-[#7C5CFC]/30 transition-all">
                    <span>{ctaLabel}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cover Art (5 cols on desktop; stacks above text on mobile) */}
            <div className="md:col-span-5 w-full order-1 md:order-2">
              <CoverArt kind={coverArt} className="shadow-md" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
