import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "websites",
    slug: "websites",
    number: "01",
    label: "Latest Next.js SSR",
    title: "Websites Developer",
    shortDescription:
      "Ultra-fast digital platforms engineered with the latest version of Next.js, dynamic AI micro-interactions, sub-50ms TTFB, bespoke luxury typography, and high-conversion UX for forward-thinking Indian businesses.",
    fullDescription:
      "We don't build generic digital brochures; we engineer high-performance digital engines. Every website is custom-architected using the latest version of Next.js, headless data layers, and dynamic AI personalization algorithms that adapt to each visitor's intent in real time.",
    deliverables: [
      "Custom Latest Next.js App Router Architecture",
      "Sub-50ms Mumbai Edge TTFB & Core Web Vitals 100/100",
      "Tailwind CSS custom luxury design system",
      "Interactive 3D / WebGL micro-interactions",
      "Dynamic AI personalization & conversion optimization",
      "100% source code repository & IP ownership",
    ],
    techStack: ["Latest Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Edge SSR", "Three.js r168"],
    tags: ["Latest Next.js App Router", "React 19 & TypeScript", "Tailwind CSS & Three.js", "Edge SSR Sub-50ms TTFB"],
    proofPoint: "+340% average lead conversion vs legacy WordPress platforms",
    deliveryTime: "7–10 Business Days",
    ctaText: "Start Website Build",
    ctaHref: "/contact?service=websites",
    timeline: "7–10 Business Days",
    investmentTier: "Milestone-Based",
    iconName: "Globe",
  },
  {
    id: "custom-web-apps",
    slug: "custom-web-apps",
    number: "02",
    label: "Enterprise Architecture",
    title: "Custom Web App Development",
    shortDescription:
      "Scalable full-stack cloud software, autonomous AI agent pipelines, booking engines, client dashboards, and high-volume business systems with rock-solid type safety.",
    fullDescription:
      "When off-the-shelf software falls short of your operational complexity, we engineer tailor-made SaaS applications with role-based permissions, robust database schemas, and AI-assisted workflows built to scale effortlessly.",
    deliverables: [
      "Bespoke Full-Stack Web Application Architecture",
      "Autonomous AI Agent & Workflow Pipelines",
      "Role-Based Access Control (RBAC) & OAuth security",
      "Interactive real-time data visualization dashboards",
      "Cloud infrastructure (Docker, Vercel, Supabase, PostgreSQL)",
      "Razorpay / Cashfree UPI automated payment gateways",
    ],
    techStack: ["Next.js App Router", "React 19", "PostgreSQL", "Prisma ORM", "Role-Based RBAC", "Razorpay UPI"],
    tags: ["Next.js App Router", "PostgreSQL & Prisma", "Role-Based RBAC", "Razorpay UPI & AI"],
    proofPoint: "Zero recurring SaaS tax · Complete custom database & software ownership",
    deliveryTime: "2–4 Weeks",
    ctaText: "Engineer Your App",
    ctaHref: "/contact?service=custom-web-apps",
    timeline: "2–4 Weeks",
    investmentTier: "Custom Architecture",
    iconName: "Layers",
  },
  {
    id: "website-audit",
    slug: "website-audit",
    number: "03",
    label: "Forensic Optimization",
    title: "Website Audit",
    shortDescription:
      "A forensic engineering inspection of your live website's sub-second speed, mobile UX, SEO ranking factors, security vulnerabilities, and checkout conversion leaks with an actionable remediation roadmap.",
    fullDescription:
      "A thorough forensic audit examining your site's sub-second speed, mobile UX, SEO ranking factors, accessibility compliance, and conversion leaks with a prioritised, engineer-ready action plan.",
    deliverables: [
      "Core Web Vitals & Lighthouse deep-dive telemetry",
      "Mobile responsiveness & conversion friction mapping",
      "SEO architecture & structured data (JSON-LD) audit",
      "Security header review & SSL/TLS verification",
      "Actionable prioritized engineering remediation blueprint",
      "100% of audit fee credited back against your project build",
    ],
    techStack: ["Google Lighthouse", "PageSpeed Insights", "Playwright", "axe-core WCAG", "OWASP Hardening", "Chrome DevTools"],
    tags: ["Google Lighthouse", "PageSpeed Insights", "Playwright E2E", "axe-core & OWASP"],
    proofPoint: "Delivered in 48 hours · 100% of ₹499 fee credited back against build",
    deliveryTime: "48 Hours",
    ctaText: "Request Website Audit",
    ctaHref: "/audit",
    timeline: "48 Hours",
    investmentTier: "₹499 (100% Credited)",
    iconName: "ShieldCheck",
  },
  {
    id: "ui-ux-redesign",
    slug: "ui-ux-redesign",
    number: "04",
    label: "Spatial & Conversion UX",
    title: "UI/UX Redesign",
    shortDescription:
      "Transform dated, cluttered interfaces into high-converting, modern digital flagships with spatial depth, intuitive customer journeys, bespoke typography, and design tokens engineered for rapid Next.js builds.",
    fullDescription:
      "We strip away outdated layouts, visual clutter, and conversion friction. Our UI/UX redesign service engineers responsive, mobile-first design systems, spatial micro-interactions, and conversion-optimized Figma architectures ready for production code handoff.",
    deliverables: [
      "Full UX heuristic inspection & user friction mapping",
      "Bespoke spatial design system & tokens in Figma",
      "Mobile-first checkout, booking & lead journey redesign",
      "Interactive micro-interactions & motion choreography",
      "WCAG 2.2 AA accessible typography & color contrast",
      "Production-ready Latest Next.js & Tailwind CSS token handoff",
    ],
    techStack: ["Figma Tokens", "Framer Motion", "Tailwind CSS v4", "WCAG 2.2 AA", "User Journeys", "Latest Next.js"],
    tags: ["Figma Tokens & Design System", "Framer Motion Micro-Interactions", "Tailwind CSS v4 Tokens", "WCAG 2.2 AA & Mobile UX"],
    proofPoint: "+260% user engagement · 65% reduction in checkout drop-offs",
    deliveryTime: "5–7 Business Days",
    ctaText: "Request UI/UX Redesign",
    ctaHref: "/contact?service=ui-ux-redesign",
    timeline: "5–7 Business Days",
    investmentTier: "Bespoke Redesign",
    iconName: "Palette",
  },
  // Backward compatibility alias for ai-websites
  {
    id: "ai-websites",
    slug: "ai-websites",
    number: "01",
    label: "Latest Next.js SSR",
    title: "Websites Developer",
    shortDescription:
      "Ultra-fast digital platforms engineered with the latest version of Next.js, dynamic AI micro-interactions, sub-50ms TTFB, bespoke luxury typography, and high-conversion UX for forward-thinking Indian businesses.",
    fullDescription:
      "We don't build generic digital brochures; we engineer high-performance digital engines. Every website is custom-architected using the latest version of Next.js, headless data layers, and dynamic AI personalization algorithms that adapt to each visitor's intent in real time.",
    deliverables: [
      "Custom Latest Next.js App Router Architecture",
      "Sub-50ms Mumbai Edge TTFB & Core Web Vitals 100/100",
      "Tailwind CSS custom luxury design system",
      "Interactive 3D / WebGL micro-interactions",
      "Dynamic AI personalization & conversion optimization",
      "100% source code repository & IP ownership",
    ],
    techStack: ["Latest Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Edge SSR", "Three.js r168"],
    tags: ["Latest Next.js App Router", "React 19 & TypeScript", "Tailwind CSS & Three.js", "Edge SSR Sub-50ms TTFB"],
    proofPoint: "+340% average lead conversion vs legacy WordPress platforms",
    deliveryTime: "7–10 Business Days",
    ctaText: "Start Website Build",
    ctaHref: "/contact?service=websites",
    timeline: "7–10 Business Days",
    investmentTier: "Milestone-Based",
    iconName: "Globe",
  },
];

export const PRIMARY_SERVICES = SERVICES_DATA.filter(
  (s) => s.slug !== "ai-websites"
);
