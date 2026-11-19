"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPost } from "@/types/blog";
import { useLanguage } from "@/i18n";

export interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const { t } = useLanguage();
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)]">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <SectionHeading
            eyebrow={t("blog_preview.label")}
            title={t("blog_preview.title")}
            subtitle={t("blog_preview.subtitle")}
          />
          <div className="shrink-0">
            <GoldButton href="/blog" variant="ghost">
              <span>{t("blog_preview.explore_all")}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </GoldButton>
          </div>
        </div>

        {/* 3 Column Grid with Illustrated Cover Cards — Wide Viewport Utilization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayPosts.map((post) => (
            <BlogCard key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
