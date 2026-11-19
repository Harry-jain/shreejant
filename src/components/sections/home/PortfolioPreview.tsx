"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GoldButton } from "@/components/ui/GoldButton";
import { useLanguage } from "@/i18n";

interface ProjectItemData {
  slug: string;
  title: string;
  client: string;
  category: "Websites" | "AI Solutions" | "E-Commerce";
  industry: string;
  domainUrl: string;
  externalUrl?: string;
  previewUrl: string;
  summary: string;
  highlightMetric: string;
  isFlagship?: boolean;
}

const PROJECTS: ProjectItemData[] = [
  {
    slug: "docgen",
    title: "DocGen — Autonomous On-Brand Document & SOP Engine",
    client: "DocGen (Open-Source Architecture)",
    category: "AI Solutions",
    industry: "Developer Tools & AI Architecture",
    domainUrl: "github.com/Akshayjankar/DocGen",
    externalUrl: "https://github.com/Akshayjankar/DocGen",
    previewUrl: "/docgen/homepage.html",
    summary:
      "Engineered an autonomous documentation engine turning rough notes into compliance-grade, on-brand Word (.docx) & PDF documents with 100% content preservation and sub-100ms latency.",
    highlightMetric: "100% Content Lock · ~91ms Latency",
    isFlagship: true,
  },
  {
    slug: "harshos",
    title: "HarshOS — Local-First AI & Systems Engineering Platform",
    client: "HarshOS (Open-Source Architecture)",
    category: "AI Solutions",
    industry: "Local AI & Systems Software",
    domainUrl: "github.com/Harry-jain",
    externalUrl: "https://github.com/Harry-jain",
    previewUrl: "/harshos/index.html",
    summary:
      "Browser-native LLMs, WebGPU confidential inference, decentralized P2P overlay networks, and streaming voice translation running 100% locally with zero cloud data leakage.",
    highlightMetric: "100% Local WebGPU · Sub-5ms SLA",
    isFlagship: true,
  },
  {
    slug: "ai-booking-salon",
    title: "Maison Éclat — Autonomous Salon Scheduling Engine",
    client: "Maison Éclat Bandra",
    category: "AI Solutions",
    industry: "Beauty & Wellness",
    domainUrl: "maisoneclat.in",
    previewUrl: "/demos/salon",
    summary:
      "Integrated WhatsApp AI booking agent and real-time chair reservation system for a premium Bandra aesthetic salon.",
    highlightMetric: "88% Less No-Shows",
  },
  {
    slug: "ecommerce-clothing",
    title: "Kavya Couture — High-Velocity D2C Headless Storefront",
    client: "Kavya Couture",
    category: "E-Commerce",
    industry: "Fashion & Retail",
    domainUrl: "kavyacouture.com",
    previewUrl: "/demos/shop",
    summary:
      "Ultra-fast headless commerce platform with 1-click UPI checkout, AI size recommendation, and sub-second catalog navigation.",
    highlightMetric: "+42% Mobile Conversions",
  },
  {
    slug: "chatbot-ca-firm",
    title: "Mehta & Associates — Intelligent Tax & GST Automation Agent",
    client: "Mehta & Associates CA",
    category: "Websites",
    industry: "Legal & Finance",
    domainUrl: "mehtataxadvisors.in",
    previewUrl: "/demos/enterprise",
    summary:
      "Authoritative corporate portal paired with an autonomous document collection and client tax inquiry agent.",
    highlightMetric: "28 hrs/wk Saved",
  },
];

export function PortfolioPreview() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("All");
  const prefersReducedMotion = useReducedMotion();

  const categories = [
    { key: "All", label: t("portfolio.cat_all") || "All Projects" },
    { key: "Websites", label: t("portfolio.cat_websites") || "Websites" },
    { key: "AI Solutions", label: t("portfolio.cat_ai_solutions") || "AI Solutions" },
    { key: "E-Commerce", label: t("portfolio.cat_ecommerce") || "E-Commerce" },
  ];

  const filteredProjects =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  const flagshipProjects = PROJECTS.filter((p) => p.isFlagship);
  const clientProjects = PROJECTS.filter((p) => !p.isFlagship);

  return (
    <section
      id="portfolio"
      className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)] bg-transparent text-white overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1250px] h-[550px] bg-[radial-gradient(circle,rgba(124,92,252,0.18)_0%,rgba(56,189,248,0.07)_42%,transparent_70%)] blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 right-1/4 w-[650px] h-[450px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,rgba(124,92,252,0.12)_45%,transparent_70%)] blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            Case Studies · Live Proof
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-[-0.035em] leading-[1.08] mb-4">
            Work That Speaks in Metrics
          </h2>
          <p className="font-body text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Engineered systems generating verified ROI, autonomous conversions, and lightning load speeds across India.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-5 py-2 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer select-none ${
                  activeTab === cat.key
                    ? "bg-gradient-to-r from-[#7C5CFC] to-[#6847ED] text-white shadow-[0_0_20px_rgba(124,92,252,0.6)] border border-purple-400/40 scale-105"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* When "All" is active, showcase the 2 flagship developer platforms side-by-side, then client systems */}
        {activeTab === "All" ? (
          <div className="space-y-12 sm:space-y-14">
            {/* Flagship Developer Platforms (2-Column Balanced Grid) */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#A78BFA] font-semibold">
                  FLAGSHIP OPEN-SOURCE SYSTEMS
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {flagshipProjects.map((project) => {
                  const githubHref = project.externalUrl || `https://${project.domainUrl}`;
                  return (
                    <motion.div
                      key={project.slug}
                      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col justify-between group h-full"
                    >
                      <div className="overflow-hidden flex flex-col justify-between h-full rounded-[24px] bg-[#0E121E]/95 border border-white/12 shadow-2xl group-hover:border-[#7C5CFC]/40 transition-all">
                        {/* Browser Chrome Header */}
                        <div className="p-3.5 bg-[#090C15]/80 border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                          </div>
                          <a
                            href={githubHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-0.5 rounded-full bg-black/60 text-[11px] font-mono text-white/80 border border-white/10 truncate max-w-[240px] hover:text-[#A78BFA] transition-colors"
                          >
                            https://{project.domainUrl}
                          </a>
                          <div className="w-8" />
                        </div>

                        {/* Interactive Live Iframe Preview Area */}
                        <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden bg-[#0B0B12] border-b border-white/10 group/preview">
                          <iframe
                            src={project.previewUrl}
                            title={project.title}
                            scrolling="no"
                            className="absolute top-0 left-0 w-[200%] h-[200%] border-0 pointer-events-none origin-top-left scale-[0.5]"
                            loading="lazy"
                          />
                          <a
                            href={githubHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10 flex items-end justify-between p-4 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-xs font-mono text-white/90">Live Interactive View</span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#7C5CFC] text-white text-xs font-mono font-semibold shadow-lg">
                              <span>Explore on GitHub</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                          </a>
                        </div>

                        {/* Card Content & Action Bar */}
                        <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between bg-[#090C15]/80">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <Badge size="sm">{project.industry}</Badge>
                              <span className="font-mono text-xs font-semibold text-emerald-400">
                                {project.highlightMetric}
                              </span>
                            </div>

                            <a
                              href={githubHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-heading font-bold text-xl sm:text-2xl text-white hover:text-[#A78BFA] transition-colors block leading-snug"
                            >
                              {project.title}
                            </a>

                            <p className="font-body text-sm text-white/70 leading-relaxed">
                              {project.summary}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                            <a
                              href={githubHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white text-xs font-heading font-semibold shadow-md shadow-[#7C5CFC]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                              <span>View on GitHub</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <Link
                              href={`/portfolio/${project.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-[#A78BFA] hover:text-white transition-colors"
                            >
                              <span>{t("portfolio.view_case_study") || "Case Study"}</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Client Enterprise Systems (3-Column Balanced Grid) */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#A78BFA] font-semibold">
                  DEPLOYED ENTERPRISE PLATFORMS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {clientProjects.map((project) => (
                  <motion.div
                    key={project.slug}
                    whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between group h-full"
                  >
                    <div className="overflow-hidden flex flex-col justify-between h-full rounded-[24px] bg-[#0E121E]/95 border border-white/12 shadow-xl group-hover:border-[#7C5CFC]/40 transition-all">
                      {/* Browser Chrome Frame */}
                      <div className="p-3 bg-[#090C15]/80 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="px-3 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-white/80 border border-white/10 truncate max-w-[170px]">
                          https://{project.domainUrl}
                        </span>
                        <div className="w-6" />
                      </div>

                      {/* Mini Live Preview Frame */}
                      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#0B0B12] border-b border-white/10 group/preview">
                        <iframe
                          src={project.previewUrl}
                          title={project.title}
                          scrolling="no"
                          className="absolute top-0 left-0 w-[200%] h-[200%] border-0 pointer-events-none origin-top-left scale-[0.5]"
                          loading="lazy"
                        />
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity"
                        >
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C5CFC] text-white text-[11px] font-mono font-semibold shadow-md">
                            <span>View Case Study</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <Badge size="sm">{project.industry}</Badge>
                            <span className="font-mono text-xs text-white/60 tracking-wider">
                              {project.category}
                            </span>
                          </div>

                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#A78BFA] transition-colors block leading-snug"
                          >
                            {project.title}
                          </Link>

                          <p className="font-body text-sm text-white/75 leading-relaxed">
                            {project.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider">
                            Live Platform
                          </span>
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="inline-flex items-center text-xs font-heading font-semibold text-[#A78BFA] hover:text-white transition-colors"
                          >
                            <span>View Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Filtered View — Grid Without Blank Space */
          <div
            className={`grid gap-8 items-stretch ${
              filteredProjects.length === 1
                ? "grid-cols-1 max-w-xl mx-auto"
                : filteredProjects.length === 2
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredProjects.map((project) => {
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
                  <div className="overflow-hidden flex flex-col justify-between h-full rounded-[24px] bg-[#0E121E]/95 border border-white/12 shadow-xl group-hover:border-[#7C5CFC]/40 transition-all">
                    {/* Browser Chrome Header */}
                    <div className="p-3 bg-[#090C15]/80 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <a
                        href={githubHref}
                        target={isGitHub ? "_blank" : undefined}
                        rel={isGitHub ? "noopener noreferrer" : undefined}
                        className="px-3 py-0.5 rounded-full bg-black/60 text-[10px] font-mono text-white/80 border border-white/10 truncate max-w-[180px] hover:text-[#A78BFA] transition-colors"
                      >
                        https://{project.domainUrl}
                      </a>
                      <div className="w-6" />
                    </div>

                    {/* Preview Frame */}
                    <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-[#0B0B12] border-b border-white/10 group/preview">
                      <iframe
                        src={project.previewUrl}
                        title={project.title}
                        scrolling="no"
                        className="absolute top-0 left-0 w-[200%] h-[200%] border-0 pointer-events-none origin-top-left scale-[0.5]"
                        loading="lazy"
                      />
                      <a
                        href={githubHref}
                        target={isGitHub ? "_blank" : undefined}
                        rel={isGitHub ? "noopener noreferrer" : undefined}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity"
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C5CFC] text-white text-[11px] font-mono font-semibold shadow-md">
                          <span>{isGitHub ? "View on GitHub" : "View Live Demo"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </a>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <Badge size="sm">{project.industry}</Badge>
                          <span className="font-mono text-xs text-white/60 tracking-wider">
                            {project.category}
                          </span>
                        </div>

                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#A78BFA] transition-colors block leading-snug"
                        >
                          {project.title}
                        </Link>

                        <p className="font-body text-sm text-white/75 leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                        <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider">
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
                            className="inline-flex items-center text-xs font-heading font-semibold text-[#A78BFA] hover:text-white transition-colors"
                          >
                            <span>View Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <GoldButton href="/portfolio" variant="primary">
            <span>
              {t("portfolio.view_all") ||
                (lang === "mr"
                  ? "सर्व प्रोजेक्ट्स पहा"
                  : lang === "hi"
                  ? "संपूर्ण पोर्टफोलियो देखें"
                  : "View Full Portfolio")}
            </span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
