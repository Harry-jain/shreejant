"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { BrandWatermark } from "@/components/ui/BrandWatermark";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { useLanguage } from "@/i18n";
import { OFFER } from "@/data/offer";
import { BlogPost } from "@/types/blog";
import { BLOG_LOCALES } from "@/content/blog/translations";

interface BlogPostViewProps {
  post: BlogPost;
}

export function BlogPostView({ post }: BlogPostViewProps) {
  const { t, lang, formatPrice } = useLanguage();
  const slug = post.frontmatter.slug;

  const loc = (lang === "hi" || lang === "mr") ? BLOG_LOCALES[slug]?.[lang] : null;

  const title = loc?.title || post.frontmatter.title;
  const category = loc?.category || post.frontmatter.category;
  const readTime = loc?.readTime || post.frontmatter.readTime;
  const content = loc?.content || post.content;
  const authorBio = loc?.authorBio || "Engineering research division at SHREEJAN AI SOLUTIONS. We build high-velocity digital flagships, autonomous RAG agents, and intelligent workflow systems for modern enterprises across India.";

  const formattedAuditPrice = formatPrice(OFFER.audit.priceInr);

  return (
    <article className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)]">
      <BrandWatermark text="SHREEJAN" position="top" className="opacity-10" />

      <div className="relative z-10 site-container">
        <div className="max-w-4xl mx-auto">
          <Button href="/blog" variant="ghost" className="mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            <span>
              {lang === "hi" ? "सभी लेखों पर वापस जाएँ" : lang === "mr" ? "सर्व लेखांकडे परत जा" : "Back to All Articles"}
            </span>
          </Button>

          {/* Header */}
          <header className="space-y-6 mb-12">
            <Badge size="sm">{category}</Badge>

            <h1
              className="font-heading font-bold text-[clamp(30px,4.5vw,48px)] leading-tight tracking-[-1px] text-brand-text"
              style={{ textTransform: "none" }}
            >
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-muted border-y border-brand-border py-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#7C5CFC]" />
                {post.frontmatter.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7C5CFC]" />
                {post.frontmatter.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7C5CFC]" />
                {readTime}
              </span>
            </div>
          </header>

          {/* Content Area */}
          <div className="bg-brand-surface/40 border border-brand-border rounded-2xl p-6 sm:p-10 shadow-sm">
            <MarkdownRenderer content={content} />
          </div>

          <GoldDivider className="my-12" />

          {/* Author Bio Box */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 flex items-center gap-6 mb-12 shadow-sm">
            <div className="w-14 h-14 rounded-xl border border-[#7C5CFC]/40 bg-[#7C5CFC]/10 flex items-center justify-center font-heading font-bold text-lg text-[#7C5CFC] dark:text-[#A78BFA] shrink-0">
              TA
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[17px] text-brand-text mb-1">
                {post.frontmatter.author}
              </h3>
              <p className="font-body text-xs sm:text-sm text-brand-muted leading-relaxed">
                {authorBio}
              </p>
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="bg-brand-surface/70 border border-[#7C5CFC]/30 rounded-2xl p-8 text-center space-y-4 shadow-sm">
            <h3
              className="font-heading font-bold text-xl sm:text-2xl text-brand-text"
              style={{ textTransform: "none" }}
            >
              {lang === "hi"
                ? "क्या आप अपने व्यवसाय के लिए ऐसा समाधान बनाना चाहते हैं?"
                : lang === "mr"
                ? "तुमच्या व्यवसायासाठी अशी डिजिटल सिस्टीम तयार करायची आहे का?"
                : "Ready to Engineer a Similar System for Your Business?"}
            </h3>
            <p className="font-body text-sm text-brand-muted max-w-xl mx-auto">
              {lang === "hi"
                ? "हमारी वरिष्ठ इंजीनियरिंग टीम से 30 मिनट का निःशुल्क परामर्श बुक करें।"
                : lang === "mr"
                ? "आमच्या वरिष्ठ इंजिनिअरिंग टीमसोबत 30 मिनिटांचे मोफत मार्गदर्शन सत्र ठरवा."
                : "Book a complimentary 30-minute digital architecture consultation with our senior systems architects."}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="default">
                {t("cta.start")}
              </Button>
              <Button href="/audit" variant="secondary" size="default">
                {t("cta.audit", { price: formattedAuditPrice })}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
