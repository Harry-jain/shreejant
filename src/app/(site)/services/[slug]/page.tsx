import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Banknote, ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import { constructMetadata } from "@/lib/metadata";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { BrandWatermark } from "@/components/ui/BrandWatermark";

export async function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return {};

  return constructMetadata({
    title: `${service.title} Architecture`,
    description: service.shortDescription,
    canonicalUrl: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <article className="relative pt-[clamp(80px,10vw,120px)] pb-[clamp(80px,10vw,120px)]">
      <BrandWatermark text="SHREEJAN" position="top" className="opacity-10" />

      <div className="relative z-10 site-container">
        <div className="max-w-5xl mx-auto">
          <Button href="/services" variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to All Services
          </Button>

          {/* Header */}
          <div className="space-y-4 mb-10">
            <Badge size="sm">Architecture Specification</Badge>
            <h1
              className="font-heading font-bold text-[clamp(36px,5vw,56px)] leading-tight tracking-[-1.5px] text-brand-text"
              style={{ textTransform: "none" }}
            >
              {service.title}
            </h1>
            <p className="font-body text-[16px] sm:text-[18px] leading-[1.7] text-brand-muted">
              {service.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-brand-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#A78BFA]" />
                Delivery Timeline: <strong className="text-brand-text">{service.timeline}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-[#A78BFA]" />
                Starting Tier: <strong className="text-[#A78BFA]">{service.investmentTier}</strong>
              </span>
            </div>
          </div>

          <GoldDivider className="mb-10" />

          {/* Deliverables */}
          <div className="space-y-6 mb-12">
            <h2
              className="font-heading font-semibold text-[24px] text-brand-text"
              style={{ textTransform: "none" }}
            >
              Included Technical Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-brand-surface border border-brand-border rounded-[8px] p-4 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#A78BFA] shrink-0 mt-0.5" />
                  <span className="font-body text-[14px] text-brand-text leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="space-y-4 mb-12">
            <h2
              className="font-heading font-semibold text-[24px] text-brand-text"
              style={{ textTransform: "none" }}
            >
              Technology Foundation
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {service.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-[6px] text-xs font-mono bg-brand-surface border border-brand-border text-brand-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-brand-bg-alt border border-brand-border rounded-2xl p-8 sm:p-10 text-center space-y-6">
            <h3
              className="font-heading font-bold text-2xl sm:text-3xl text-brand-text"
              style={{ textTransform: "none" }}
            >
              Ready to deploy {service.title}?
            </h3>
            <p className="font-body text-[15px] text-brand-muted max-w-lg mx-auto">
              Book a 30-minute discovery call to evaluate technical fit, scope exact milestones, and receive a fixed-price proposal.
            </p>
            <Button href="/contact?intent=demo" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
              Book a Demo & Consultation
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
