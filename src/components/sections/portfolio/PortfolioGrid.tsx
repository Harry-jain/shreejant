"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectItem } from "@/types";
import { useLanguage } from "@/i18n";

interface PortfolioGridProps {
  projects: (ProjectItem & { content: string })[];
}

const CATEGORIES = [
  { key: "All", langKey: "portfolio.cat_all" },
  { key: "Websites", langKey: "portfolio.cat_websites" },
  { key: "AI Solutions", langKey: "portfolio.cat_ai_solutions" },
  { key: "E-Commerce", langKey: "portfolio.cat_ecommerce" },
] as const;

function getProjectDemoUrl(slug: string): string {
  if (slug === "docgen") return "/docgen/homepage.html";
  if (slug === "harshos") return "/harshos/index.html";
  if (slug === "ai-booking-salon") return "/demos/salon";
  if (slug === "ecommerce-clothing") return "/demos/shop";
  if (slug === "chatbot-ca-firm") return "/demos/enterprise";
  return "/docgen/homepage.html";
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2 rounded-full text-xs font-heading font-semibold tracking-tight transition-all duration-300 cursor-pointer select-none ${
              activeCategory === cat.key
                ? "bg-gradient-to-r from-[#7C5CFC] to-[#6847ED] text-white shadow-[0_0_20px_rgba(124,92,252,0.6)] border border-purple-400/40 scale-105"
                : "bg-white/[0.04] dark:bg-white/[0.04] text-white/70 dark:text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/10"
            }`}
          >
            {t(cat.langKey)}
          </button>
        ))}
      </div>

      {/* Grid — Balanced Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        {filtered.map((project) => {
          const demoUrl = getProjectDemoUrl(project.slug);
          const isGitHub = Boolean(
            project.externalUrl?.includes("github.com") ||
            project.domainUrl.includes("github.com")
          );
          const githubHref = project.externalUrl || `https://${project.domainUrl}`;

          return (
            <motion.div
              key={project.slug}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between group h-full"
            >
              <div className="rounded-[24px] bg-white dark:bg-[#12151B] border border-black/10 dark:border-white/10 overflow-hidden flex flex-col justify-between h-full p-0 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Browser Chrome Header */}
                <div className="p-3 bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <a
                    href={githubHref}
                    target={project.externalUrl ? "_blank" : undefined}
                    rel={project.externalUrl ? "noopener noreferrer" : undefined}
                    className="px-3 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-mono text-ink/70 dark:text-white/70 truncate max-w-[170px] hover:text-[#7C5CFC] dark:hover:text-[#A78BFA] transition-colors"
                  >
                    https://{project.domainUrl}
                  </a>
                  <div className="w-5" />
                </div>

                {/* Live Project Homepage Iframe Preview Area */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#0B0B12] border-b border-black/10 dark:border-white/10 group/preview">
                  <iframe
                    src={demoUrl}
                    title={project.title}
                    scrolling="no"
                    className="absolute top-0 left-0 w-[200%] h-[200%] border-0 pointer-events-none origin-top-left scale-[0.5]"
                    loading="lazy"
                  />
                  <a
                    href={githubHref}
                    target={project.externalUrl ? "_blank" : undefined}
                    rel={project.externalUrl ? "noopener noreferrer" : undefined}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/65 opacity-0 group-hover/preview:opacity-100 transition-opacity"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C5CFC] text-white text-[11px] font-mono font-semibold shadow-md">
                      <span>{isGitHub ? "Explore on GitHub" : "View Live Demo"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#7C5CFC]/10 text-[#7C5CFC] font-medium">
                        {project.industry}
                      </span>
                      <span className="text-xs font-mono text-ink/60 dark:text-white/60">
                        {project.category}
                      </span>
                    </div>

                    {project.externalUrl ? (
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading font-bold text-xl sm:text-2xl text-ink dark:text-white hover:text-[#7C5CFC] dark:hover:text-[#A78BFA] transition-colors block leading-snug"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="font-heading font-bold text-xl sm:text-2xl text-ink dark:text-white group-hover:text-[#7C5CFC] dark:group-hover:text-[#A78BFA] transition-colors block leading-snug"
                      >
                        {project.title}
                      </Link>
                    )}

                    <p className="font-body text-sm text-ink/75 dark:text-white/75 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-emerald-500">
                      Live Platform
                    </span>
                    <div className="flex items-center gap-3">
                      {isGitHub && (
                        <a
                          href={githubHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <span>GitHub ↗</span>
                        </a>
                      )}
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-[#7C5CFC] hover:text-[#6A48F5] transition-colors"
                      >
                        <span>{t("portfolio.view_case_study") || "Case Study"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
