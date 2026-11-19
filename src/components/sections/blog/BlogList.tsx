"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { useLanguage } from "@/i18n";
import { BlogPost } from "@/types/blog";
import { BLOG_LOCALES } from "@/content/blog/translations";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const { t, lang } = useLanguage();

  const getPostFields = (post: BlogPost) => {
    const slug = post.frontmatter.slug;
    if ((lang === "hi" || lang === "mr") && BLOG_LOCALES[slug]?.[lang]) {
      const loc = BLOG_LOCALES[slug][lang];
      return {
        title: loc.title,
        excerpt: loc.excerpt,
        category: loc.category,
        readTime: loc.readTime,
      };
    }
    return {
      title: post.frontmatter.title,
      excerpt: post.frontmatter.excerpt,
      category: post.frontmatter.category,
      readTime: post.frontmatter.readTime,
    };
  };

  const featuredPost = posts.find((p) => p.frontmatter.featured) || posts[0];
  const regularPosts = featuredPost
    ? posts.filter((p) => p.frontmatter.slug !== featuredPost.frontmatter.slug)
    : posts;

  const featuredFields = featuredPost ? getPostFields(featuredPost) : null;

  return (
    <div>
      {/* Featured Post Card */}
      {featuredPost && featuredFields && (
        <div className="mb-16">
          <GlassCard className="p-8 sm:p-12 relative overflow-hidden shadow-sm transition-colors">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <Badge size="sm">{featuredFields.category}</Badge>
                <span className="text-xs text-brand-muted font-body">
                  {featuredFields.readTime}
                </span>
              </div>

              <Link href={`/blog/${featuredPost.frontmatter.slug}`}>
                <h2
                  className="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl text-brand-text hover:text-[#7C5CFC] transition-colors tracking-tight"
                  style={{ textTransform: "none" }}
                >
                  {featuredFields.title}
                </h2>
              </Link>

              <p className="font-body text-[15px] sm:text-[16px] text-brand-muted leading-relaxed">
                {featuredFields.excerpt}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-black/10 dark:border-white/10">
                <span className="text-xs font-body text-brand-muted">
                  {t("blog_page.published_on")} {featuredPost.frontmatter.date} {t("blog_page.by")}{" "}
                  {featuredPost.frontmatter.author}
                </span>
                <GoldButton href={`/blog/${featuredPost.frontmatter.slug}`} variant="ghost" className="text-xs py-2 px-4 min-h-[44px]">
                  <span>{t("blog_page.read_full_essay")}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </GoldButton>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => {
          const fields = getPostFields(post);
          return (
            <GlassCard
              key={post.frontmatter.slug}
              as="article"
              className="p-6 flex flex-col justify-between shadow-sm transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge size="sm">{fields.category}</Badge>
                  <div className="flex items-center gap-1.5 text-xs text-brand-muted font-body">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{fields.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.frontmatter.slug}`}>
                  <h3 className="font-heading font-medium text-[20px] text-brand-text hover:text-[#7C5CFC] transition-colors line-clamp-2 mb-3">
                    {fields.title}
                  </h3>
                </Link>

                <p className="font-body text-[14px] text-brand-muted line-clamp-3 leading-relaxed mb-6">
                  {fields.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-brand-muted font-body">
                  {post.frontmatter.date}
                </span>
                <Link
                  href={`/blog/${post.frontmatter.slug}`}
                  className="inline-flex items-center text-xs font-body font-semibold uppercase tracking-[0.18em] text-[#7C5CFC] hover:text-[#9E84FF] transition-colors"
                >
                  <span>{t("blog_preview.read_article")}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
