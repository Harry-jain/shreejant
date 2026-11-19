# AGENTS.md — SHREEJAN AI SOLUTIONS

## Project
Premium business website for SHREEJAN AI SOLUTIONS — Mumbai Gen AI web agency.

## Stack
Latest version Next JS, TypeScript 5.7, Tailwind CSS v4, Framer Motion 12, Three.js r168, Resend 4, MDX

## Rules for all agents
1. Never use Lorem ipsum. All copy must be real and written for Indian business owners.
2. All colors must come from CSS custom properties in globals.css. Never hardcode hex values in components.
3. Every component must work in both dark and light mode.
4. Mobile-first. Build mobile layout first, then add desktop styles via md: and lg: breakpoints.
5. All images must use next/image. Never use <img> tags.
6. Forms must have Zod validation. Never trust raw user input.
7. Three.js canvases must lazy load. Never block the main thread.
8. All animations must check useReducedMotion() and disable if true.
9. Logo slots (logo-dark.svg, logo-primary.png) are official brand assets. Render text fallback "SHREEJAN AI" when image fails.
10. Run `pnpm build` after every agent pass. Fix all TypeScript errors before moving to next agent.

## Run order
1. Architect Agent — scaffold only
2. Design System Agent — tokens + components only
3. Page Builder Agent — all pages and sections
4. Backend Agent — API routes and email
5. Performance Agent — final audit and fixes

## Commands
pnpm dev        — start dev server on localhost:3000
pnpm build      — production build
pnpm lint       — ESLint check
pnpm type-check — TypeScript check

