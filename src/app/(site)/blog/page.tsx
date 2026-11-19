import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { CTASection } from "@/components/sections/home/CTASection";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { getAllBlogPosts } from "@/lib/mdx";

export const metadata = constructMetadata({
  title: "AI Strategy & Engineering Blog",
  description:
    "Actionable essays and market breakdowns on AI agents, high-velocity Next.js web systems, and business automation written for Indian founders and operators.",
  canonicalUrl: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="w-full">
      <BlogHero />

      <div className="site-container pb-28">
        <BlogIndex posts={posts} />
      </div>

      <GoldDivider />
      <CTASection />
    </div>
  );
}
