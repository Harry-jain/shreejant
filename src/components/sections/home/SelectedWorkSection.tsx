"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface WorkProject {
  id: string;
  number: string;
  title: string;
  clientCategory: string;
  scope: string;
  problem: string;
  demoUrl: string;
  tags: string[];
  visualAccent: string;
}

const PROJECTS: WorkProject[] = [
  {
    id: "aura-salon",
    number: "01",
    title: "Aura Studio — Bandra",
    clientCategory: "Luxury Salon & Aesthetic Care",
    scope: "Brand Identity, Next.js Web Experience & Instant WhatsApp Booking Desk",
    problem:
      "Legacy salon was losing after-hours bookings and dealing with phone call drop-offs. We engineered an interactive treatment menu with real-time slot requests directly connected to WhatsApp.",
    demoUrl: "/demos/salon",
    tags: ["Next.js 15", "Interactive Menu", "WhatsApp API", "Mobile First"],
    visualAccent: "border-l-accent",
  },
  {
    id: "vora-clinic",
    number: "02",
    title: "Dr. Vora Specialty Clinic",
    clientCategory: "Multi-Specialty Medical Practice",
    scope: "Doctor Profiles, Department Directory & Patient Appointment Flow",
    problem:
      "Patients found it confusing to identify doctor schedules across 4 clinical specialties. We built a fast, calm, accessible portal with straightforward appointment submission and zero clutter.",
    demoUrl: "/demos/clinic",
    tags: ["Healthcare Portal", "Doctor Directory", "Clean UX", "Accessibility"],
    visualAccent: "border-l-accent-lime",
  },
  {
    id: "bombay-bistro",
    number: "03",
    title: "The Bombay Bistro",
    clientCategory: "Artisanal Dining & Hospitality",
    scope: "Digital Menu System, Ambiance Gallery & Table Reservation Flow",
    problem:
      "Third-party delivery platforms take 25% margins and lock customer relationships. We designed a direct dining experience with interactive dietary filters and direct party reservations.",
    demoUrl: "/demos/restaurant",
    tags: ["Hospitality", "Dietary Filter Menu", "Reservation Engine", "Fast Edge"],
    visualAccent: "border-l-accent-blue",
  },
];

export function SelectedWorkSection() {
  return (
    <Section id="work" className="border-b border-border bg-bg-secondary/30">
      <Container>
        {/* Editorial Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-text text-bg font-bold">
                03 // SELECTED WORK
              </span>
              <span className="text-xs text-muted font-mono">[ PRODUCTION PROTOTYPES ]</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight">
              Evidence of our engineering and interface craft.
            </h2>
          </div>
          <Button href="/demos" variant="outline" size="default" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore All 3 Live Demos
          </Button>
        </div>

        {/* Projects List */}
        <div className="space-y-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl border border-border bg-surface p-6 sm:p-8 md:p-10 shadow-sm border-l-4 ${project.visualAccent} transition-all hover:border-text/30`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Project Info Left (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold text-accent">
                      PROJECT {project.number}
                    </span>
                    <span className="text-xs text-muted">•</span>
                    <span className="font-mono text-xs text-muted uppercase">
                      {project.clientCategory}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-semibold">
                      Sample Prototype
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-text">
                    {project.title}
                  </h3>

                  <p className="text-sm font-semibold text-text/90 font-mono">
                    {project.scope}
                  </p>

                  <p className="text-sm text-muted leading-relaxed font-sans">
                    {project.problem}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-bg border border-border text-xs font-mono text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Action & Live Preview Box Right (5 cols) */}
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-xl bg-bg border border-border flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-muted">
                      <span>LIVE DEMO SANDBOX</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-xs text-text font-medium leading-relaxed">
                      Experience the responsive navigation, booking forms, and sub-second page transitions in action.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Button
                      href={project.demoUrl}
                      variant="primary"
                      size="default"
                      className="w-full justify-between"
                      rightIcon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      Open Interactive Demo
                    </Button>
                    <div className="text-center">
                      <span className="text-[11px] font-mono text-muted">
                        Labelled sample site — not a real business.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
