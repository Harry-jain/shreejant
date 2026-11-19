import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";
import { getPortfolioProjectBySlug, getAllPortfolioProjects } from "@/lib/mdx";
import { constructMetadata } from "@/lib/metadata";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { BrandWatermark } from "@/components/ui/BrandWatermark";

export async function generateStaticParams() {
  const projects = await getAllPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);
  if (!project) return {};

  return constructMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    canonicalUrl: `/portfolio/${project.slug}`,
  });
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const demoUrl =
    project.slug === "docgen"
      ? "/docgen/homepage.html"
      : project.slug === "harshos"
      ? "/harshos/index.html"
      : project.slug === "ai-booking-salon"
      ? "/demos/salon"
      : project.slug === "ecommerce-clothing"
      ? "/demos/shop"
      : project.slug === "chatbot-ca-firm"
      ? "/demos/enterprise"
      : "/docgen/homepage.html";

  return (
    <article className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)]">
      <BrandWatermark text="SHREEJAN" position="top" className="opacity-10" />

      <div className="relative z-10 site-container">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Button href="/portfolio" variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
              Back to All Case Studies
            </Button>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#6847ED] text-white font-heading font-semibold text-xs shadow-md shadow-[#7C5CFC]/30 hover:scale-[1.02] transition-all"
              >
                <span>View on GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm">{project.industry}</Badge>
              <span className="text-xs text-brand-muted font-body">• {project.category}</span>
            </div>

            <h1
              className="font-heading font-bold text-[clamp(36px,5vw,56px)] leading-tight tracking-[-1.5px] text-brand-text"
              style={{ textTransform: "none" }}
            >
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-brand-muted">
              <span>
                Client: <strong className="text-brand-text">{project.client}</strong>
              </span>
              <span>•</span>
              <a
                href={project.externalUrl || `https://${project.domainUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#7C5CFC] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{project.domainUrl}</span>
              </a>
            </div>
          </div>

          {/* Interactive Live Homepage Viewport */}
          <div className="my-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0B12] shadow-2xl">
            <div className="p-3.5 bg-black/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="px-3.5 py-0.5 rounded-full bg-black/60 text-xs font-mono text-white/80 border border-white/10">
                https://{project.domainUrl}
              </div>
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#7C5CFC] hover:underline flex items-center gap-1.5"
              >
                <span>Full Screen Standalone</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full h-[520px] sm:h-[650px] overflow-hidden">
              <iframe
                src={demoUrl}
                title={`${project.title} Live Interactive Demo`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Key Metrics Banner */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-brand-surface border border-brand-border rounded-xl p-6 text-center"
                >
                  <div className="font-mono font-medium text-3xl sm:text-4xl text-[#7C5CFC] mb-1">
                    {metric.value}
                  </div>
                  <div className="font-heading text-xs font-semibold text-brand-text uppercase tracking-[1px]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <GoldDivider className="mb-10" />

          {/* Results Bulletpoints */}
          {project.results && project.results.length > 0 && (
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 mb-12 space-y-4">
              <h2
                className="font-heading font-semibold text-[20px] text-brand-text"
                style={{ textTransform: "none" }}
              >
                Key Engineering Results
              </h2>
              <div className="space-y-3">
                {project.results.map((res, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-body text-[14px] text-brand-text leading-relaxed">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Body */}
          <div className="bg-brand-surface/40 border border-brand-border rounded-2xl p-8 font-body text-brand-text leading-[1.8] whitespace-pre-line text-[15px] sm:text-[16px]">
            {project.content}
          </div>

          {/* Technology Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-brand-border">
              <h3 className="font-heading text-xs font-semibold text-[#7C5CFC] uppercase tracking-[1.5px] mb-3">
                Technologies Deployed
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3.5 py-1.5 rounded-[4px] text-xs font-mono bg-brand-surface border border-brand-border text-brand-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Card */}
          <div className="mt-14 bg-brand-bg-alt border border-brand-border rounded-2xl p-8 sm:p-10 text-center space-y-6">
            <h3
              className="font-heading font-bold text-2xl sm:text-3xl text-brand-text"
              style={{ textTransform: "none" }}
            >
              Want similar results for your business?
            </h3>
            <p className="font-body text-[15px] text-brand-muted max-w-lg mx-auto">
              Let us engineer a custom AI web solution tailored specifically to your conversion funnel and business operations.
            </p>
            <Button href="/contact" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
              Request Case Study Consultation
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
