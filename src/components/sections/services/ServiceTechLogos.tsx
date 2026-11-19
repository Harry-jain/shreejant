"use client";

import React from "react";

export function TechLogo({ id, className = "w-4 h-4 shrink-0" }: { id: string; className?: string }) {
  switch (id) {
    case "nextjs":
      return (
        <svg viewBox="0 0 180 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path
            d="M149.5 149.5L78.8 56H56V124H70.4V75.6L135.5 160.7C140.5 157.4 145.2 153.6 149.5 149.5Z"
            fill="url(#nextGrad)"
          />
          <rect x="109.6" y="56" width="14.4" height="68" fill="url(#nextGrad2)" />
          <defs>
            <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nextGrad2" x1="116.8" y1="56" x2="116.8" y2="108" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "react":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
          <g stroke="#00D8FF" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "typescript":
      return (
        <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path
            d="M74.9 88.5C77.4 92.5 81.3 95.1 86.8 95.1C91.9 95.1 95.3 92.6 95.3 88.7C95.3 84.4 92.5 82.6 86 79.7L81.5 77.8C72.5 73.9 67.8 69.1 67.8 60.5C67.8 50.8 75.6 43.6 86.5 43.6C94.5 43.6 100.8 46.9 104.9 53.6L96.2 59.2C94.2 55.7 91 53.8 86.4 53.8C82.3 53.8 79.4 56 79.4 59.5C79.4 63 81.9 64.6 87.7 67.1L92.2 69C102.3 73.2 107.2 78.1 107.2 87.5C107.2 98.4 98.7 105.4 86.4 105.4C75.8 105.4 68.1 100.4 64.6 91.9L74.9 88.5ZM24.4 54.4H41.6V104H53V54.4H70.2V44.8H24.4V54.4Z"
            fill="white"
          />
        </svg>
      );

    case "tailwind":
      return (
        <svg viewBox="0 0 54 33" className={className} fill="#38BDF8" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 0C18 0 12.375 4.5 10.125 13.5C13.5 9 18 7.875 23.625 10.125C26.835 11.409 29.13 13.737 31.671 16.311C35.811 20.499 40.59 25.312 50.625 25.312C59.625 25.312 65.25 20.812 67.5 11.812C64.125 16.312 59.625 17.438 54 15.188C50.79 13.903 48.495 11.576 45.954 9.002C41.814 4.814 37.035 0 27 0ZM13.5 14.062C4.5 14.062 -1.125 18.562 -3.375 27.562C0 23.062 4.5 21.938 10.125 24.188C13.335 25.472 15.63 27.8 18.171 30.374C22.311 34.562 27.09 39.375 37.125 39.375C46.125 39.375 51.75 34.875 54 25.875C50.625 30.375 46.125 31.5 40.5 29.25C37.29 27.966 34.995 25.638 32.454 23.064C28.314 18.877 23.535 14.062 13.5 14.062Z" />
        </svg>
      );

    case "edge":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <polygon points="13 2 9 14 15 14 11 22" fill="#FFC93C" stroke="#FFC93C" strokeWidth="1" />
        </svg>
      );

    case "threejs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 22 22 22" stroke="#7C5CFC" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="#38BDF8" />
          <line x1="2" y1="22" x2="12" y2="12" stroke="#FFFFFF" />
          <line x1="22" y1="22" x2="12" y2="12" stroke="#FFFFFF" />
        </svg>
      );

    case "postgresql":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="60" fill="#336791" />
          <path
            d="M64 25C44.7 25 33 38.3 33 55.4C33 72.8 44.5 86.8 59.8 88.8V103H68.2V88.8C83.5 86.8 95 72.8 95 55.4C95 38.3 83.3 25 64 25ZM64 78C51.3 78 43 67.5 43 55.4C43 43.3 51.3 35.8 64 35.8C76.7 35.8 85 43.3 85 55.4C85 67.5 76.7 78 64 78Z"
            fill="white"
          />
        </svg>
      );

    case "prisma":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="64 12 114 116 14 116" stroke="#2D3748" strokeWidth="8" fill="#1A202C" />
          <polygon points="64 28 102 106 26 106" fill="white" />
          <polygon points="64 44 90 96 38 96" fill="#16A394" />
        </svg>
      );

    case "rbac":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="2.5" fill="#10B981" />
          <line x1="12" y1="13.5" x2="12" y2="17" />
        </svg>
      );

    case "razorpay":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0C2340" />
          <path d="M7 19L13.5 5H17L12.5 14.5L16.5 19H12.5L10 16L8.5 19H7Z" fill="#3395FF" />
          <polygon points="12,5 15,5 10,14 7,14" fill="#00D09C" />
        </svg>
      );

    case "ai-agents":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="3" />
          <circle cx="8.5" cy="16" r="1.5" fill="#7C5CFC" />
          <circle cx="15.5" cy="16" r="1.5" fill="#7C5CFC" />
          <path d="M12 2a2 2 0 0 1 2 2v3h-4V4a2 2 0 0 1 2-2z" />
          <line x1="2" y1="16" x2="3" y2="16" />
          <line x1="21" y1="16" x2="22" y2="16" />
        </svg>
      );

    case "lighthouse":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 6 22 18 22" fill="#F59E0B" fillOpacity="0.2" />
          <line x1="6" y1="10" x2="18" y2="10" />
          <line x1="8" y1="16" x2="16" y2="16" />
          <circle cx="12" cy="6" r="2" fill="#FFFFFF" />
          <path d="M10 2L3 7" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M14 2L21 7" stroke="#F59E0B" strokeWidth="1.5" />
        </svg>
      );

    case "pagespeed":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 14l4-4" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
          <circle cx="12" cy="14" r="2" fill="#10B981" />
        </svg>
      );

    case "playwright":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#2EAD33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" fill="#2EAD33" fillOpacity="0.15" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <polygon points="9 7 15 10 9 13" fill="#2EAD33" />
        </svg>
      );

    case "axecore":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="2" fill="#38BDF8" />
          <path d="M4 8h16" />
          <path d="M12 8v7" />
          <path d="M8 21l4-6 4 6" />
        </svg>
      );

    case "owasp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" strokeWidth="2.5" />
        </svg>
      );

    case "devtools":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 38 57" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
      );

    case "framer":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2H20V9H12L20 16H12V23L4 16V9H12L4 2Z" fill="#0055FF"/>
        </svg>
      );

    case "wcag":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );

    case "wireframe":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export interface ServiceTechStackBadge {
  id: string;
  name: string;
  category: string;
}

export const VERIFIED_SERVICE_TECH: Record<string, ServiceTechStackBadge[]> = {
  websites: [
    { id: "nextjs", name: "Latest version Next JS", category: "Framework" },
    { id: "react", name: "React 19", category: "UI Library" },
    { id: "typescript", name: "TypeScript", category: "Language" },
    { id: "tailwind", name: "Tailwind CSS", category: "Styling" },
    { id: "edge", name: "Edge SSR", category: "Sub-50ms TTFB" },
    { id: "threejs", name: "Three.js", category: "3D Motion" },
  ],
  "custom-web-apps": [
    { id: "nextjs", name: "Next.js App", category: "Full-Stack" },
    { id: "postgresql", name: "PostgreSQL", category: "Database" },
    { id: "prisma", name: "Prisma ORM", category: "Type Safety" },
    { id: "rbac", name: "Role RBAC", category: "Auth Security" },
    { id: "razorpay", name: "Razorpay", category: "UPI Payments" },
    { id: "ai-agents", name: "AI Agents", category: "Cloud Meta API" },
  ],
  "website-audit": [
    { id: "lighthouse", name: "Lighthouse", category: "Performance" },
    { id: "pagespeed", name: "PageSpeed", category: "Core Vitals" },
    { id: "playwright", name: "Playwright", category: "E2E Testing" },
    { id: "axecore", name: "axe-core", category: "Accessibility" },
    { id: "owasp", name: "OWASP Hardening", category: "Security" },
    { id: "devtools", name: "DevTools", category: "Diagnostics" },
  ],
  "ui-ux-redesign": [
    { id: "figma", name: "Figma Tokens", category: "Design System" },
    { id: "framer", name: "Framer Motion", category: "Micro-Interactions" },
    { id: "tailwind", name: "Tailwind CSS", category: "Design Tokens" },
    { id: "wcag", name: "WCAG 2.2 AA", category: "Accessibility" },
    { id: "wireframe", name: "User Journeys", category: "UX Architecture" },
    { id: "nextjs", name: "Latest version Next JS", category: "Code Handoff" },
  ],
};

