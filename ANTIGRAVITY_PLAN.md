# Shreejan — UI Reset Plan (for Antigravity)

Drop this file in the repo root. Tell Antigravity: "Read ANTIGRAVITY_PLAN.md and run it phase by phase. Stop at each CHECKPOINT and wait for me."

## 0. Context

Shreejan is a new 3-person web agency (Harsh, Ankit, Akshay) in Mumbai. We have **no clients yet**. The current site was built fast with a lot of effects and a lot of made-up claims. Goal of this pass: a **simple, honest, working** site. UI first. Backend and app work come later (Section 9).

Stack stays: Next.js 15 (App Router), TypeScript, Tailwind **v3.4** (the README says v4, which is wrong — fix the README).

## 1. Hard rules for every agent

1. Never read, print, or write secrets. Do not touch `.env*`. If you see a credential in any file, report it and stop; do not copy it anywhere.
2. No fabricated content: no testimonials, client names, case studies, metrics, "guaranteed", "100%", "24/7", "autonomous", "forensic", "world-class", response-time promises. If a claim is not true today, it does not ship.
3. One agent owns a file at a time (ownership table in Section 5). Concurrent edits use separate git worktrees/branches.
4. Research and review agents are read-only.
5. Do not claim success without running the command. Paste the real output of `pnpm type-check`, `pnpm lint`, `pnpm build`.
6. Colors only from CSS variables in `globals.css`. No hex values in components.

## 2. Design spec (the part the owners care about)

Simple, calm, readable. Think "clean agency brochure", not "tech demo".

- **Theme:** light only for now (remove the theme toggle). Dark mode can come later.
- **Palette (tokens in `globals.css`, change here and the whole site follows):**
  - `--bg: #FAFAF9`, `--surface: #FFFFFF`, `--text: #111827`, `--muted: #6B7280`, `--border: #E5E7EB`
  - **One** accent: `--accent: #1D4ED8` (hover `#1E40AF`). No gradients, glows, gold, or violet.
- **Type:** one family (Inter via `next/font`), 3 sizes of heading, 1 body size. Remove Cal Sans, Cormorant, Space Grotesk, JetBrains Mono, Devanagari fonts unless Hindi/Marathi stays (see open questions).
- **Layout:** max width ~1100px, generous spacing, 8px grid, radius 8–12px, 1px borders, no heavy shadows.
- **Motion:** none by default except hover/focus states and a simple fade on page load. Must respect `prefers-reduced-motion`.
- **Mobile first:** verify at 375px, 768px, 1280px.

## 3. Pages to keep (6)

| Page | Content |
| --- | --- |
| Home | Headline + one-line offer, what we build (3 items), 3 demo sites, 4-step process, pricing summary, contact CTA |
| Services & pricing | Plans from `src/data/pricing.ts` (see open questions), what is included, what is not |
| Demos | 3 demo sites (default: salon, clinic, restaurant), each clearly labelled **"Sample site — not a real business"** |
| About | The 3 founders, true one-paragraph bios, real links only, honest line that we are new |
| Contact | One form + WhatsApp link |
| Privacy / Terms | Short, accurate, matches what the form actually collects |

**Remove:** blog, portfolio, audit (₹499), admin/founders, upload API, three.js canvases (`src/components/three`, `public/models`), splash curtain, cursor glow, magnetic buttons, theatre/tour demo mode, 3D cards, marquees, language switcher (unless owners say keep), `TestimonialsSection`, `data/testimonials.ts`, `src/content/portfolio/*`, `public/harshos*`, `public/docgen*`, one-off scripts in `/scripts` and root `.bat`/`.ps1`/`inspect.mjs`, `AGENTS.md` instructions that no longer apply.

## 4. Phases

### Phase 1 — Parallel read-only analysis (3 agents)

- **Architect (use `reverse-engineer-anything`):** map which routes, components, data files and public assets are actually reachable from the 6 kept pages. Output `docs/keep-delete.md`: KEEP / DELETE / MERGE per file, with the reason. Flag anything imported by a kept page that is on the delete list.
- **Content auditor:** list every user-visible claim, number, testimonial, client name, link and placeholder (e.g. `https://linkedin.com`) with file and line. Output `docs/claims.md` with a recommended replacement or "remove" for each.
- **Security reviewer:** confirm which API routes will remain, list everything that must change for the contact form (Section 8). Read-only. Output `docs/security-notes.md`.

**CHECKPOINT 1:** owners review the three docs and answer the open questions in Section 10.

### Phase 2 — Cleanup (1 agent, sequential, nothing else running)

Owner: **Cleanup engineer.** Work on branch `reset/cleanup`.

1. Delete everything in `docs/keep-delete.md` marked DELETE.
2. Remove unused dependencies (`three`, `@types/three`, and `framer-motion` if no longer used).
3. Replace the 1 default-exported placeholder pages with minimal stubs so the build passes.
4. Run `pnpm install && pnpm type-check && pnpm lint && pnpm build`. Paste real output.

**CHECKPOINT 2:** it builds, and the file count is dramatically lower.

### Phase 3 — Design system (1 agent)

Owner: **Design-system engineer.** Branch `reset/tokens`.

1. Rewrite `globals.css` tokens per Section 2; update `tailwind.config.ts` to map to those variables.
2. Build the small component set in `src/components/ui`: `Button`, `Container`, `Section`, `Card`, `Input`, `Textarea`, `Heading`. Nothing else.
3. Create `src/components/layout/Header.tsx` and `Footer.tsx` (simple, no effects).
4. Add a temporary `/styleguide` route showing every component, to remove at the end.

**CHECKPOINT 3:** owners open `/styleguide` and approve the look before pages are built.

### Phase 4 — Pages in parallel (4 agents, separate worktrees)

| Agent | Owns (only these files) | Branch |
| --- | --- | --- |
| Home builder | `src/app/(site)/page.tsx`, `src/components/sections/home/*` | `reset/home` |
| Services builder | `src/app/(site)/services/*`, `src/components/sections/services/*` | `reset/services` |
| Demos builder | `src/app/demos/*`, `src/demos/*`, `src/components/demo*` | `reset/demos` |
| About + Legal builder | `src/app/(site)/about/*`, `privacy`, `terms` | `reset/about-legal` |

Contact page is built in Phase 5 (it depends on the API). Each builder uses only Phase 3 components. If a builder needs a new shared component, it asks the Orchestrator instead of editing `ui/`.

### Phase 5 — Contact form that actually works (1 agent)

See Section 8. Branch `reset/contact`.

### Phase 6 — Integration + independent verification

- **Orchestrator** merges branches one by one, resolving conflicts, running build after each merge.
- **QA agent (does not edit source):** uses `/browser` to open each page at 375 / 768 / 1280px, click every link and button, submit the contact form, and take screenshots. Reports broken links, overflow, contrast failures (WCAG AA), missing alt text.
- **Reviewer agent (read-only):** runs the checks in Section 7 and reports.

**CHECKPOINT 6:** owners review screenshots and the final report.

## 5. File ownership rule

If two agents need the same file, the Orchestrator sequences them. No two agents edit the same file at the same time. Any agent that wants to touch a file it does not own sends a message to the Orchestrator.

## 6. Orchestrator behaviour

- Spawn the parallel agents in a phase concurrently; do not run them one after another.
- Give each agent a role, scope, deliverable, and the Section 1 rules in its first prompt.
- Keep the plan state in `docs/progress.md` (phase, agent, status, branch, last build result).
- Do not start the next phase until the checkpoint is approved.
- Do not fake parallelism by writing several "agent" sections yourself. Use real subagents.

## 7. Acceptance checks (Reviewer runs these and pastes output)

```bash
pnpm type-check && pnpm lint && pnpm build
grep -rnE "#[0-9A-Fa-f]{3,8}\b" src --include=*.tsx | wc -l   # target: 0 outside globals.css
grep -rniE "guarantee|100%|24/7|autonomous|forensic|world-class|testimonial|trusted by" src | wc -l   # target: 0
grep -rn "linkedin.com\"\|linkedin.com'" src                    # no bare placeholder links
grep -rnE "(sb_secret|app.?password|bot.?token|ghp_|shreejan_secure)" . --exclude-dir=node_modules --exclude-dir=.git   # target: nothing
```

Also: no page loads three.js; every demo page says it is a sample; every page has a unique `<title>` and description; sitemap and robots match the 6 pages; Lighthouse mobile performance ≥ 90 and accessibility ≥ 95.

## 8. Contact form (minimum that works)

- One route: `POST /api/contact`. Remove the FastAPI Turnstile "mock token" path from the frontend.
- Validate with Zod. Hidden honeypot field. Simple rate limit is fine for now (note that in-memory limits are best-effort on serverless).
- Send via Resend to the team inbox. **If delivery fails, return an error and show it** (never "received" when nothing was sent).
- Do not promise a response time. Say "we'll reply as soon as we can."
- Read `RESEND_API_KEY` and `CONTACT_EMAIL_TO` from env only; build must fail loudly or the form must show a configuration error if they are missing.

## 9. Later (do not start yet)

- Backend: decide one lead pipeline (Next route **or** FastAPI + Supabase), not both. Admin auth, DB-backed founders data if still needed, Telegram alerts, DPDP-compliant consent.
- App: client dashboard / demo apps.
- Rewrite `README.md`, delete `SECURITY_REPORT.md` (inaccurate) and replace with a real one after the backend phase.

## 10. Open questions for the owners (answer at Checkpoint 1)

1. Which 3 demos to keep? (default: salon, clinic, restaurant)
2. Prices: `src/data/pricing.ts` says ₹14,999 / 27,999 / 47,999 / 69,999, which may differ from the plans you agreed. Which list is final?
3. Keep Hindi/Marathi, or English only for launch?
4. Real LinkedIn/GitHub links and one true sentence of bio for each founder.
5. Company name and logo: keep "SHREEJAN AI SOLUTIONS", or simplify?
