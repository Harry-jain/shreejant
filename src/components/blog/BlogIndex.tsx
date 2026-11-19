'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { BlogPost, BlogCategorySlug } from '@/types/blog';
import { getCategorySlug } from '@/lib/blog';
import { BlogFeatured } from '@/components/blog/BlogFeatured';
import { BlogCard } from '@/components/blog/BlogCard';
import { useLanguage } from '@/i18n';

const CategoryFilter = dynamic(() => import('@/components/blog/CategoryFilter').then((m) => m.CategoryFilter));

export interface BlogIndexProps {
  posts: BlogPost[];
}

function BlogIndexContent({ posts }: BlogIndexProps) {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryParam = searchParams.get('category');
  const initialCategory: BlogCategorySlug | 'all' =
    categoryParam &&
    ['case-studies', 'economics-roi', 'web-development', 'ai-automation', 'business-strategy'].includes(categoryParam)
      ? (categoryParam as BlogCategorySlug)
      : 'all';

  const [activeCategory, setActiveCategory] = useState<BlogCategorySlug | 'all'>(initialCategory);
  const [isCrossfading, setIsCrossfading] = useState(false);

  // Sync category state from URL if user navigates back/forward
  useEffect(() => {
    if (categoryParam) {
      if (['case-studies', 'economics-roi', 'web-development', 'ai-automation', 'business-strategy'].includes(categoryParam)) {
        setActiveCategory(categoryParam as BlogCategorySlug);
      } else {
        setActiveCategory('all');
      }
    } else {
      setActiveCategory('all');
    }
  }, [categoryParam]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<BlogCategorySlug | 'all', number> = {
      all: posts.length,
      'case-studies': 0,
      'economics-roi': 0,
      'web-development': 0,
      'ai-automation': 0,
      'business-strategy': 0,
    };

    posts.forEach((post) => {
      const slug = getCategorySlug(post.frontmatter.category);
      if (counts[slug] !== undefined) {
        counts[slug] += 1;
      }
    });

    return counts;
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') {
      return posts;
    }
    return posts.filter((post) => getCategorySlug(post.frontmatter.category) === activeCategory);
  }, [posts, activeCategory]);

  // Handle category change with URL sync and 150ms crossfade
  const handleSelectCategory = (slug: BlogCategorySlug | 'all') => {
    setIsCrossfading(true);
    setActiveCategory(slug);

    // Update URL param
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });

    setTimeout(() => {
      setIsCrossfading(false);
    }, 150);
  };

  // Identify featured post in current filtered results
  const { featuredPost, remainingPosts } = useMemo(() => {
    if (filteredPosts.length === 0) {
      return { featuredPost: null, remainingPosts: [] };
    }

    if (filteredPosts.length < 3) {
      // 1 or 2 posts: all render as wide horizontal cards
      return { featuredPost: null, remainingPosts: filteredPosts };
    }

    // 3 or more posts: choose newest with featured === true, or fallback to newest
    const featuredIdx = filteredPosts.findIndex((p) => p.frontmatter.featured);
    const chosenIdx = featuredIdx !== -1 ? featuredIdx : 0;
    const featured = filteredPosts[chosenIdx];
    const rest = filteredPosts.filter((_, idx) => idx !== chosenIdx);

    return { featuredPost: featured, remainingPosts: rest };
  }, [filteredPosts]);

  return (
    <div>
      {/* Category Filter Chips */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        categoryCounts={categoryCounts}
      />

      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite">
        {t('blog.showing', { n: filteredPosts.length })}
      </div>

      {/* Posts Area with 150ms crossfade transition */}
      <div
        className={`transition-opacity duration-150 ease-out ${
          isCrossfading ? 'opacity-40' : 'opacity-100'
        }`}
      >
        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-body text-base text-brand-muted">
              {t('blog.empty')}
            </p>
          </div>
        )}

        {/* 1 or 2 posts: Wide Horizontal Cards Layout */}
        {filteredPosts.length > 0 && filteredPosts.length < 3 && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {remainingPosts.map((post) => (
              <BlogCard key={post.frontmatter.slug} post={post} layout="horizontal" />
            ))}
          </div>
        )}

        {/* 3 or more posts: 12-column Bento Layout */}
        {filteredPosts.length >= 3 && featuredPost && (
          <div className="space-y-6">
            {/* Top Row: Featured (8 cols) + 1 Card (4 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-12 lg:col-span-8">
                <BlogFeatured post={featuredPost} className="h-full" />
              </div>
              {remainingPosts[0] && (
                <div className="md:col-span-6 lg:col-span-4">
                  <BlogCard post={remainingPosts[0]} className="h-full" />
                </div>
              )}
            </div>

            {/* Bottom Row: Remaining Cards (4 cols each) */}
            {remainingPosts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.slice(1).map((post) => (
                  <BlogCard key={post.frontmatter.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center font-body text-brand-muted">Loading articles...</div>}>
      <BlogIndexContent posts={posts} />
    </Suspense>
  );
}
