# Shreejan UI Reset — Keep / Delete / Merge Audit Report

**Date:** November 20, 2026  
**Auditor:** Architect Agent (Phase 1)  
**Deliverable:** `docs/keep-delete.md`  
**Reference Document:** `ANTIGRAVITY_PLAN.md`  

---

## 1. Executive Summary & Inventory Statistics

This architectural audit analyzes every route, component, data model, content collection, utility library, public asset, and automation script in the repository. The objective is to reset the codebase from a complex, effect-heavy demo site filled with fabricated claims and bloated dependencies into a **simple, honest, working** agency website for SHREEJAN AI SOLUTIONS (Mumbai).

### Repository File Count Summary

| Surface Area | Total Files | KEEP | DELETE | MERGE / REWRITE |
| :--- | :---: | :---: | :---: | :---: |
| **Routes & API (`src/app/`)** | 74 | 12 | 60 | 2 |
| **Components (`src/components/`)** | 117 | 10 | 103 | 4 |
| **Demos Infrastructure (`src/demos/`)** | 27 | 12 | 14 | 1 |
| **Data Files (`src/data/`)** | 7 | 2 | 4 | 1 |
| **Content Collections (`src/content/`)** | 11 | 0 | 11 | 0 |
| **Lib, Hooks, Types, Styles, i18n (`src/`)** | 26 | 5 | 18 | 3 |
| **Public Assets (`public/`)** | 67 | 13 | 54 | 0 |
| **Scripts (`scripts/` & root scripts)** | 30 | 0 | 30 | 0 |
| **Root Docs & Config** | 17 | 9 | 5 | 3 |
| **Total Inventory** | **376** | **63** | **299** | **14** |

> **Net Reduction:** Over **80% of files** will be safely pruned in Phase 2, dramatically reducing build times, bundle size, and maintenance overhead.

---

## 2. Reachability Map for the 6 Kept Pages

Per Section 3 of `ANTIGRAVITY_PLAN.md`, exactly 6 core pages are retained. Below is the dependency and reachability mapping for each page in its target state:

```
                                  [Root Site Layout]
                                          │
    ┌──────────────┬──────────────┼───────┴──────┬──────────────┬──────────────┐
    │              │              │              │              │              │
 [1. Home]    [2. Services]   [3. Demos]     [4. About]     [5. Contact]   [6. Privacy / Terms]
    │              │              │              │              │              │
    ├─ Hero        ├─ Pricing     ├─ Salon       ├─ Founders    ├─ Contact     ├─ Privacy
    ├─ Offer (3)   ├─ Inclusions  ├─ Clinic      ├─ True Bios   │  Form (Zod)  ├─ Terms
    ├─ 3 Demos     └─ Scope       └─ Restaurant  └─ Mumbai Base └─ WhatsApp    └─ DPDP Summary
    ├─ 4 Steps                                                     Link
    ├─ Pricing Summary
    └─ Contact CTA
```

### Page 1: Home (`src/app/(site)/page.tsx`)
- **Current reachable imports:** `HeroSection`, `TrustBar`, `SpotlightBanner`, `DemoStackShowcase`, `ServicesBentoSection`, `ProcessSection`, `PortfolioPreview`, `WhyUsSection`, `TestimonialsSection`, `TechStackSection`, `BlogPreview`, `CTASection`, `DemoNudge`, `GoldDivider`, `ScrollReveal`, `getAllBlogPosts` (`src/lib/mdx.ts`).
- **Target state:** Simple, honest one-page layout:
  1. Headline + one-line offer
  2. What we build (3 core items)
  3. 3 demo site preview cards (salon, clinic, restaurant)
  4. 4-step process
  5. Pricing summary
  6. Direct contact CTA
- **Dependencies to remove:** `PortfolioPreview`, `BlogPreview`, `TestimonialsSection`, `TechStackSection`, `SpotlightBanner` (unrealistic "store live in 10 days" claim), `TrustBar` (fabricated trust logos), `getAllBlogPosts` / `mdx.ts`, Three.js canvases, gold dividers.

### Page 2: Services & Pricing (`src/app/(site)/services/page.tsx`)
- **Current reachable imports:** `ServicesHero`, `ScrollStackedServices`, `CTASection`, `GoldDivider`, `constructMetadata`.
- **Target state:** A consolidated, transparent Services & Pricing page.
  1. Clear pricing plans sourced from `src/data/pricing.ts` (₹14,999 Starter, ₹27,999 Growth, ₹47,999 Business, ₹69,999 Premium, Custom).
  2. Concrete bullet points detailing what is included and what is not included in each plan.
  3. Direct links to WhatsApp and the Contact page.
- **Dependencies to remove:** Dynamic routes `/services/[slug]`, `src/lib/services-data.ts`, `ServiceCard3D`, `ScrollStackedServices`, 3D visual panels, references to ₹499 forensic audit.

### Page 3: Demos (`src/app/demos/`)
- **Current reachable imports:** Dynamic catch-all `[type]`, 9 industry subdirectories (`classes`, `clinic`, `enterprise`, `general`, `gym`, `jewellery`, `restaurant`, `salon`, `shop`), `TheatreView` (cinematic tour script, voice controls, title cards), `src/demos/art/*`, `src/components/demo-shared/*`.
- **Target state:** Exactly 3 sample business demos:
  1. **Salon** (`/demos/salon` — Aura Studio)
  2. **Clinic** (`/demos/clinic` — Dr. Patil / Healthcare)
  3. **Restaurant** (`/demos/restaurant` — Copper Pot)
  - Every demo is wrapped with a simple, static banner: **"Sample site — not a real business"** with a return link to Shreejan AI.
- **Dependencies to remove:** `TheatreView.tsx`, `TourScript.tsx`, the 6 unwanted demos (`classes`, `enterprise`, `general`, `gym`, `jewellery`, `shop`), `src/components/demo-shared/TestimonialCards.tsx` (fake demo reviews), `src/components/demo-shared/TrustStrip.tsx`.

### Page 4: About (`src/app/(site)/about/page.tsx`)
- **Current reachable imports:** `AboutHero`, `FounderShowcase`, `GoldDivider`, `getFounders` (`src/lib/founders.ts`, `src/data/founders.json`).
- **Target state:**
  1. Honest founder presentation: Harsh (Strategist), Ankit (Developer), Akshay (AI/Web Developer).
  2. One true paragraph bio per founder with real LinkedIn and GitHub links.
  3. Explicit, honest statement that Shreejan is a new agency based in Mumbai.
- **Dependencies to remove:** `FounderShowcase.tsx` (3D avatar flip cards, signature canvas overlays), `ShreejanCrewSection.tsx`, `CharacterArt.tsx`, `src/lib/founders.ts`, `src/data/founders.json`, dynamic `/admin/founders` CMS. Founders data will be declared statically in `src/data/team.ts` or directly within the About component.

### Page 5: Contact (`src/app/(site)/contact/page.tsx`)
- **Current reachable imports:** `BrandWatermark`, `ContactPageContent`, `ContactForm`, `ContactInfo`, `AuditCard` (₹499 audit push).
- **Target state:**
  1. Clean, functional Next.js contact form submitting directly to `POST /api/contact`.
  2. Verified Zod validation with server-side error feedback and hidden honeypot spam protection.
  3. Official WhatsApp direct chat link (`https://wa.me/918976517353`).
  4. Honest response expectation ("We'll reply as soon as we can" — no "guaranteed within 4 hours").
- **Dependencies to remove:** `AuditCard.tsx`, Cloudflare Turnstile mock token integration, dual-pipeline fallback to localhost:8000.

### Page 6: Legal Pages (`src/app/(site)/privacy/page.tsx` & `terms/page.tsx`)
- **Current reachable imports:** `LegalSummaryTile`, `DataFlowDiagram`, `YourChoicesStrip`, `BrandWatermark`.
- **Target state:**
  1. Concise, plain-English Privacy Policy strictly matching what the contact form actually collects (Name, Email, Phone, Business Type, Message).
  2. Plain-English Terms of Service covering deliverables, payment milestones, code ownership, and post-launch maintenance.
- **Dependencies to remove:** `DataFlowDiagram.tsx` (unnecessary visual complexity), TODO placeholder boxes, hardcoded dark palette values (`#090C15`, `#7C5CFC`).

---

## 3. Critical Import Dependency Warning Table

> [!WARNING]
> Before deleting files marked **DELETE**, the importing files listed below must be decoupled or replaced with minimal stubs. Otherwise, `pnpm type-check` and `pnpm build` will fail.

| Deleted Target File | Currently Imported By | Nature of Dependency | Phase 2 / Phase 3 Decoupling Action |
| :--- | :--- | :--- | :--- |
| `src/components/SplashCurtain.tsx` | `src/app/(site)/layout.tsx` | Full-screen splash animation overlay on initial load. | Remove `<SplashCurtain />` import and tag from `RootLayout`. |
| `src/components/layout/GlobalCursorGlow.tsx` | `src/app/(site)/layout.tsx` | Mouse-tracking canvas glow effect. | Remove `<GlobalCursorGlow />` import and tag from `RootLayout`. |
| `src/i18n/index.tsx` | `src/app/(site)/layout.tsx`, `Navbar.tsx`, `Footer.tsx`, `HeroSection.tsx`, etc. (52 files) | Global multi-language provider (`LanguageProvider`, `useLanguage()`). | Remove provider from `RootLayout`. If English-only launch is confirmed, replace `t("...")` lookups with direct English strings or a minimal passthrough shim during cleanup. |
| `src/components/sections/home/BlogPreview.tsx` | `src/app/(site)/page.tsx` | Homepage blog list preview. | Remove component import and `<BlogPreview />` section from `HomePage`. |
| `src/components/sections/home/PortfolioPreview.tsx` | `src/app/(site)/page.tsx` | Homepage portfolio cards preview. | Remove component import and `<PortfolioPreview />` section from `HomePage`. |
| `src/components/sections/home/TestimonialsSection.tsx` | `src/app/(site)/page.tsx` | Homepage customer testimonials carousel/grid. | Remove component import and `<TestimonialsSection />` from `HomePage`. |
| `src/lib/mdx.ts` | `src/app/(site)/page.tsx`, `src/app/sitemap.ts` | File-system MDX loader for blog posts and portfolio projects. | Remove `getAllBlogPosts` call from `HomePage`. Update `sitemap.ts` to statically list the 6 kept pages. |
| `src/components/AuditCard.tsx` | `src/components/sections/contact/ContactPageContent.tsx` | ₹499 audit promotional card injected in contact view. | Remove `<AuditCard />` from `ContactPageContent.tsx`. |
| `src/components/sections/about/FounderShowcase.tsx` | `src/app/(site)/about/page.tsx` | 3D founder showcase component relying on `founders.json` and `lib/founders.ts`. | Replace in `about/page.tsx` with a static 3-founder profile grid. |
| `src/data/founders.json` | `src/components/sections/about/FounderShowcase.tsx` | JSON database mutated by `/admin/founders`. | Delete with `FounderShowcase.tsx`. Founders data stays static. |
| `src/lib/founders.ts` | `src/app/(site)/about/page.tsx`, `FounderShowcase.tsx` | Helper reading `founders.json` via `fs.readFile`. | Remove call from `about/page.tsx` and delete file. |
| `src/demos/TheatreView.tsx` | `src/demos/DemoShell.tsx` | Wraps all demo pages with cinema frame, tour audio, and title cards. | Rewrite `DemoShell.tsx` to directly render children with a simple sample banner. |
| `src/demos/TourScript.tsx` | `src/demos/TheatreView.tsx` | Automated walkthrough tour scripts. | Deleted automatically with `TheatreView.tsx`. |
| `src/data/testimonials.ts` | `src/components/Testimonials.tsx` | Fabricated customer quotes. | Delete with `Testimonials.tsx`. |
| `src/components/demo-shared/TestimonialCards.tsx` | `src/app/demos/salon/page.tsx`, `clinic/page.tsx`, `restaurant/page.tsx` | Fabricated reviews embedded in sample demos. | Remove component imports from demo pages. |
| `src/components/demo-shared/TrustStrip.tsx` | `src/app/demos/salon/page.tsx`, `clinic/page.tsx`, `restaurant/page.tsx` | Fake trust badges embedded in sample demos. | Remove component imports from demo pages. |
| `src/lib/services-data.ts` | `src/app/(site)/services/[slug]/page.tsx`, `ServicesBentoSection.tsx`, `sitemap.ts` | Dynamic service metadata containing ₹499 audit and fake metrics. | Decouple `ServicesBentoSection` or replace with 3 core offerings; remove dynamic service routes from `sitemap.ts`. |

---

## 4. Comprehensive Keep / Delete / Merge Master Inventory

### 4.1 Application Routes (`src/app/`)

| File / Directory | Action | Reason |
| :--- | :---: | :--- |
| `src/app/(site)/layout.tsx` | **MERGE / REWRITE** | Keep as root site layout. Remove splash curtain, cursor glow, and theme toggle scripts; switch to light theme tokens. |
| `src/app/(site)/page.tsx` | **MERGE / REWRITE** | Keep as Home page. Strip blog, portfolio, testimonials, tech marquee, and spotlight banner. |
| `src/app/(site)/services/page.tsx` | **MERGE / REWRITE** | Keep as Services & Pricing page. Replace 3D stack cards with clean pricing table from `pricing.ts`. |
| `src/app/(site)/about/page.tsx` | **MERGE / REWRITE** | Keep as About page. Replace dynamic `FounderShowcase` with static, honest founder bios. |
| `src/app/(site)/contact/page.tsx` | **MERGE / REWRITE** | Keep as Contact page. Rebuild with direct form submission and WhatsApp link. |
| `src/app/(site)/privacy/page.tsx` | **KEEP / CLEAN** | Keep as Privacy page. Streamline plain-English text and remove TODO notices. |
| `src/app/(site)/terms/page.tsx` | **KEEP / CLEAN** | Keep as Terms page. Streamline terms and remove TODO notices. |
| `src/app/(site)/not-found.tsx` | **KEEP** | 404 page for site routes. |
| `src/app/not-found.tsx` | **KEEP** | Root 404 handler. |
| `src/app/robots.ts` | **KEEP** | Standard robots.txt configuration. |
| `src/app/sitemap.ts` | **MERGE / REWRITE** | Rewrite to statically index only the 6 kept pages. Remove dynamic blog, portfolio, and service slugs. |
| `src/app/globals.css` | **MERGE / REWRITE** | Rewrite in Phase 3 to establish single light theme palette tokens (`--bg`, `--surface`, `--text`, `--muted`, `--border`, `--accent`). |
| `src/app/icon.png` | **KEEP** | Browser favicon asset. |
| `src/app/(site)/services/[slug]/page.tsx` | **DELETE** | Separate service subpages removed; all pricing and scopes live cleanly on `/services`. |
| `src/app/(site)/audit/page.tsx` | **DELETE** | ₹499 forensic audit removed per plan Section 3. |
| `src/app/(site)/blog/page.tsx` | **DELETE** | Blog section removed per plan Section 3. |
| `src/app/(site)/blog/[slug]/page.tsx` | **DELETE** | Blog post detail page removed per plan Section 3. |
| `src/app/(site)/portfolio/page.tsx` | **DELETE** | Portfolio section removed per plan Section 3. |
| `src/app/(site)/portfolio/[slug]/page.tsx` | **DELETE** | Portfolio project detail page removed per plan Section 3. |
| `src/app/admin/founders/page.tsx` | **DELETE** | Dynamic admin CMS interface removed. |
| `src/app/admin/layout.tsx` | **DELETE** | Admin layout removed. |
| `src/app/api/contact/route.ts` | **KEEP & REWRITE** | The sole API route for the brochure site. Rebuild with Zod validation, honeypot, and Resend email dispatch. |
| `src/app/api/founders/route.ts` | **DELETE** | Administrative route reading/writing local JSON. High risk, incompatible with serverless. |
| `src/app/api/founders/[id]/route.ts` | **DELETE** | Administrative mutation route. |
| `src/app/api/upload/route.ts` | **DELETE** | File upload endpoint with hardcoded credentials. |
| `src/app/api/og/route.tsx` | **DELETE** | Dynamic edge OG generator with hardcoded dark palette. Replace with static `og-image.png`. |
| `src/app/demos/layout.tsx` | **KEEP** | Root layout for isolated demo environments. |
| `src/app/demos/page.tsx` | **KEEP** | Redirects to default demo (`/demos/salon`). |
| `src/app/demos/salon/` | **KEEP** | Demo 1: Salon sample website (`page.tsx`, `data.ts`, `theme.ts`, `components/`). Strip fake reviews. |
| `src/app/demos/clinic/` | **KEEP** | Demo 2: Clinic sample website (`page.tsx`, `data.ts`, `theme.ts`, `components/`). Strip fake reviews. |
| `src/app/demos/restaurant/` | **KEEP** | Demo 3: Restaurant sample website (`page.tsx`, `data.ts`, `theme.ts`, `components/`). Strip fake reviews. |
| `src/app/demos/[type]/page.tsx` | **DELETE** | Dynamic catch-all demo route; individual routes provide better static generation. |
| `src/app/demos/classes/` (6 files) | **DELETE** | Unused demo industry removed per Section 3. |
| `src/app/demos/enterprise/` (7 files) | **DELETE** | Unused demo industry removed per Section 3. |
| `src/app/demos/general/page.tsx` | **DELETE** | Unused demo industry removed per Section 3. |
| `src/app/demos/gym/` (6 files) | **DELETE** | Unused demo industry removed per Section 3. |
| `src/app/demos/jewellery/` (6 files) | **DELETE** | Unused demo industry removed per Section 3. |
| `src/app/demos/shop/` (6 files) | **DELETE** | Unused demo industry removed per Section 3. |

---

### 4.2 Components (`src/components/`)

#### UI Primitives (`src/components/ui/`)
| File | Action | Reason |
| :--- | :---: | :--- |
| `src/components/ui/Button.tsx` | **KEEP & REWRITE** | Core button component. Rebuilt in Phase 3 without gradients or heavy shadows. |
| `src/components/ui/Card.tsx` | **KEEP & REWRITE** | Core container card component. |
| `src/components/ui/Badge.tsx` | **DELETE** | Ornate luxury badges removed. |
| `src/components/ui/GlassCard.tsx` | **DELETE** | Glassmorphism card styles removed in favor of clean solid surfaces. |
| `src/components/ui/GoldButton.tsx` | **DELETE** | Gold gradient styling removed per design spec. |
| `src/components/ui/GoldDivider.tsx` | **DELETE** | Diamond divider removed. Standard 1px CSS border used instead. |
| `src/components/ui/MagneticButton.tsx` | **DELETE** | Physics magnetic button effect removed per Section 3. |
| `src/components/ui/BrandWatermark.tsx` | **DELETE** | Faded background watermark text removed. |
| `src/components/ui/AnimatedCounter.tsx` | **DELETE** | Stat counter animation removed (no fake numbers to count). |
| `src/components/ui/JewelArt.tsx` | **DELETE** | Vector jewel illustration removed with jewellery demo. |
| `src/components/ui/Reveal.tsx` | **DELETE** | Heavy scroll reveal wrapper removed. |
| `src/components/ui/ScrollReveal.tsx` | **DELETE** | Scroll reveal wrapper removed. |
| `src/components/ui/SectionHeading.tsx` | **DELETE** | Replaced by clean `Heading` primitive in Phase 3. |
| `src/components/ui/SectionLabel.tsx` | **DELETE** | Redundant sub-label component. |

#### Layout Components (`src/components/layout/`)
| File | Action | Reason |
| :--- | :---: | :--- |
| `src/components/layout/Navbar.tsx` | **KEEP & REWRITE** | Rebuilt in Phase 3 with 5 clean links: Home, Services, Demos, About, Contact. |
| `src/components/layout/Footer.tsx` | **KEEP & REWRITE** | Rebuilt in Phase 3 with honest links, clear Mumbai base, no fake office addresses. |
| `src/components/layout/WhatsAppButton.tsx` | **KEEP** | Floating WhatsApp button. Clean and functional. |
| `src/components/layout/GlobalCursorGlow.tsx` | **DELETE** | Mouse tracking canvas effect removed per Section 3. |
| `src/components/layout/ThemeToggle.tsx` | **DELETE** | Dark mode toggle removed per Section 2 (light only for now). |

#### Section Components (`src/components/sections/`)
| File / Directory | Action | Reason |
| :--- | :---: | :--- |
| `src/components/sections/home/HeroSection.tsx` | **KEEP & REWRITE** | Rebuilt in Phase 4: clear headline, one-line offer, two buttons (Demos, Contact). |
| `src/components/sections/home/ProcessSection.tsx` | **KEEP & REWRITE** | Rebuilt in Phase 4: clean 4-step process without complex motion. |
| `src/components/sections/home/CTASection.tsx` | **KEEP & REWRITE** | Clean call-to-action block above footer. |
| `src/components/sections/home/DemoStackShowcase.tsx` | **DELETE** | Complex vertical scroll stack removed. Home will link to 3 clean demo cards. |
| `src/components/sections/home/DemoStackViewport.tsx` | **DELETE** | Deleted with `DemoStackShowcase`. |
| `src/components/sections/home/TrustBar.tsx` | **DELETE** | Removed per Section 1 (no fake client logos or made-up trust metrics). |
| `src/components/sections/home/SpotlightBanner.tsx` | **DELETE** | Removed (contains unverified "live in 10 days" claim). |
| `src/components/sections/home/ServicesBentoSection.tsx`| **DELETE** | Complex bento grid. Services will be cleanly summarized on Home and detailed on `/services`. |
| `src/components/sections/home/PortfolioPreview.tsx` | **DELETE** | Portfolio removed per Section 3. |
| `src/components/sections/home/WhyUsSection.tsx` | **DELETE** | Removed (contains buzzword claims). |
| `src/components/sections/home/TestimonialsSection.tsx` | **DELETE** | Testimonials removed per Section 3. |
| `src/components/sections/home/TechStackSection.tsx` | **DELETE** | Marquee tech strip removed per Section 3. |
| `src/components/sections/home/BlogPreview.tsx` | **DELETE** | Blog removed per Section 3. |
| `src/components/sections/home/DemoNudge.tsx` | **DELETE** | Over-engineered sticky nudge removed. |
| `src/components/sections/home/CursorGlowMesh.tsx` | **DELETE** | WebGL glow mesh removed. |
| `src/components/sections/home/CurvedRibbon.tsx` | **DELETE** | Decorative SVG ribbon removed. |
| `src/components/sections/home/DemoChips.tsx` | **DELETE** | Orphaned demo filter component. |
| `src/components/sections/home/DemoPicker.tsx` | **DELETE** | Orphaned demo picker component. |
| `src/components/sections/home/CinematicPreviewFrame.tsx` | **DELETE** | Orphaned frame component. |
| `src/components/sections/home/HeroDemoTeaser.tsx` | **DELETE** | Orphaned hero teaser component. |
| `src/components/sections/home/InteractiveStudio.tsx` | **DELETE** | Orphaned studio component. |
| `src/components/sections/home/MarqueeShowcase.tsx` | **DELETE** | Marquee removed per Section 3. |
| `src/components/sections/home/PreviewFrame.tsx` | **DELETE** | Orphaned preview component. |
| `src/components/sections/home/ServicesSection.tsx` | **DELETE** | Orphaned duplicate services section. |
| `src/components/sections/home/CapabilityVisualPanels.tsx` | **DELETE** | Orphaned visual panels. |
| `src/components/sections/about/AboutHero.tsx` | **KEEP & REWRITE** | Simple hero for About page. |
| `src/components/sections/about/FounderShowcase.tsx` | **DELETE** | 3D card flipping founder showcase removed. |
| `src/components/sections/about/ShreejanCrewSection.tsx` | **DELETE** | Orphaned 3D avatar section. |
| `src/components/sections/about/TeamSection.tsx` | **DELETE** | Orphaned team section. |
| `src/components/sections/about/TeamCard.tsx` | **DELETE** | Orphaned team card. |
| `src/components/sections/about/TechBadges.tsx` | **DELETE** | Orphaned badges component. |
| `src/components/sections/about/CharacterArt.tsx` | **DELETE** | 3D cartoon character component removed. |
| `src/components/sections/services/ServicesHero.tsx` | **KEEP & REWRITE** | Clean hero introducing the pricing plans. |
| `src/components/sections/services/ScrollStackedServices.tsx` | **DELETE** | Complex scroll-jacking service cards removed. |
| `src/components/sections/services/ServiceCard3D.tsx` | **DELETE** | 3D card tilt effect removed per Section 3. |
| `src/components/sections/services/ServiceVisualCard.tsx` | **DELETE** | Complex multi-layer cards removed. |
| `src/components/sections/services/ServiceVisualPanels.tsx` | **DELETE** | Deleted with `ServiceVisualCard`. |
| `src/components/sections/services/ServiceTechLogos.tsx` | **DELETE** | Deleted with `ServiceVisualCard`. |
| `src/components/sections/services/AiWebsitesDemo.tsx` | **DELETE** | Orphaned interactive widget. |
| `src/components/sections/services/CustomWebAppsDemo.tsx` | **DELETE** | Orphaned interactive widget. |
| `src/components/sections/contact/ContactForm.tsx` | **KEEP & REWRITE** | Form component rebuilt with Zod and honeypot in Phase 5. |
| `src/components/sections/contact/ContactInfo.tsx` | **KEEP & REWRITE** | Contact info: WhatsApp, Email, Mumbai location. |
| `src/components/sections/contact/ContactPageContent.tsx` | **KEEP & REWRITE** | Container for form and info; remove audit card. |
| `src/components/sections/contact/ContactHero.tsx` | **DELETE** | Orphaned contact hero. |
| `src/components/sections/blog/*` (3 files) | **DELETE** | Blog hero, list, and post view removed per Section 3. |
| `src/components/sections/portfolio/*` (3 files) | **DELETE** | Portfolio hero, grid, and filter removed per Section 3. |
| `src/components/sections/audit/*` (2 files) | **DELETE** | Audit form and page content removed per Section 3. |

#### Three.js Components (`src/components/three/`)
| File | Action | Reason |
| :--- | :---: | :--- |
| `src/components/three/AICircuitCanvas.tsx` | **DELETE** | Three.js canvas removed per Section 3. |
| `src/components/three/BinaryIntelligenceCanvas.tsx` | **DELETE** | Three.js canvas removed per Section 3. |
| `src/components/three/FloatingParticles.tsx` | **DELETE** | Floating particle animation removed. |
| `src/components/three/GlobeScene.tsx` | **DELETE** | Three.js interactive globe removed per Section 3. |
| `src/components/three/NeuralNetCanvas.tsx` | **DELETE** | Three.js neural net canvas removed per Section 3. |

#### Root Components & Other Folders (`src/components/`)
| File / Directory | Action | Reason |
| :--- | :---: | :--- |
| `src/components/SplashCurtain.tsx` | **DELETE** | Splash curtain animation removed per Section 3. |
| `src/components/StickyMobileBar.tsx` | **DELETE** | Bottom sticky action bar with fake urgency removed. |
| `src/components/LanguageSwitcher.tsx` | **DELETE** | Language switcher removed per Section 3 (English-only launch). |
| `src/components/AuditCard.tsx` | **DELETE** | ₹499 audit promotion card removed. |
| `src/components/Testimonials.tsx` | **DELETE** | Fake testimonials slider removed. |
| `src/components/PerfMode.tsx` | **DELETE** | Orphaned performance toggle. |
| `src/components/IndiaStrip.tsx` | **DELETE** | Orphaned India map strip. |
| `src/components/Faq.tsx` | **DELETE** | Orphaned FAQ accordion. |
| `src/components/HowWeWork.tsx` | **DELETE** | Orphaned process component. |
| `src/components/PrimaryCta.tsx` | **DELETE** | Redundant CTA button component. |
| `src/components/about/TeamCard.tsx` | **DELETE** | Orphaned duplicate team card. |
| `src/components/blog/*` (7 files) | **DELETE** | All blog cards, index, markdown renderer, and India cover removed. |
| `src/components/demo-studio/*` (4 files) | **DELETE** | Orphaned demo studio showcase components. |
| `src/components/demo/*` (7 files) | **DELETE** | Jewellery and vault mockups removed with 3D services. |
| `src/components/demo-shared/BookingForm.tsx` | **KEEP** | Clean booking form widget used by salon, clinic, restaurant. |
| `src/components/demo-shared/DemoHeader.tsx` | **KEEP** | Demo site navigation header. |
| `src/components/demo-shared/DemoFooter.tsx` | **KEEP** | Demo site footer. |
| `src/components/demo-shared/DemoHero.tsx` | **KEEP** | Demo site hero. |
| `src/components/demo-shared/FloatingWhatsApp.tsx` | **KEEP** | Demo site WhatsApp contact button. |
| `src/components/demo-shared/WhatsAppChatMockup.tsx` | **KEEP** | Interactive WhatsApp chat mockup inside demos. |
| `src/components/demo-shared/FadeUp.tsx` | **KEEP** | Simple fade transition for demo sections. |
| `src/components/demo-shared/TestimonialCards.tsx` | **DELETE** | Fabricated client testimonials inside demos. |
| `src/components/demo-shared/TrustStrip.tsx` | **DELETE** | Fabricated trust badges inside demos. |
| `src/components/legal/LegalSummaryTile.tsx` | **KEEP** | Plain-English summary card for Privacy and Terms. |
| `src/components/legal/DataFlowDiagram.tsx` | **DELETE** | Overly complex legal diagram canvas. |
| `src/components/legal/YourChoicesStrip.tsx` | **KEEP / MERGE**| Keep rights summary; embed directly in privacy page. |

---

### 4.3 Demos Infrastructure (`src/demos/`)

| File | Action | Reason |
| :--- | :---: | :--- |
| `src/demos/demos.config.ts` | **KEEP & TRIM** | Trim configuration to the 3 kept demos: `salon`, `clinic`, `restaurant`. |
| `src/demos/DemoShell.tsx` | **KEEP & REWRITE** | Strip out `TheatreView`. Wrap each demo in a clean container with a sample banner. |
| `src/demos/fonts.ts` | **KEEP** | Typography definitions for demo sites. |
| `src/demos/DemoLink.tsx` | **KEEP** | Link helper component for demos. |
| `src/demos/sections/DemoHero.tsx` | **KEEP** | Core hero section for demos. |
| `src/demos/sections/DemoServices.tsx` | **KEEP** | Services grid for salon and clinic. |
| `src/demos/sections/DemoBooking.tsx` | **KEEP** | Booking widget for salon, clinic, restaurant. |
| `src/demos/sections/DemoHours.tsx` | **KEEP** | Working hours widget for salon and clinic. |
| `src/demos/sections/DemoFaq.tsx` | **KEEP** | Clinic FAQ section. |
| `src/demos/sections/DemoGallery.tsx` | **KEEP** | Salon visual gallery. |
| `src/demos/sections/DemoMenuTabs.tsx` | **KEEP** | Restaurant food menu tabs. |
| `src/demos/sections/DemoFooter.tsx` | **KEEP** | Demo footer component. |
| `src/demos/sections/index.ts` | **KEEP & TRIM** | Export only the kept demo sections. |
| `src/demos/art/SalonArt.tsx` | **KEEP** | Vector art for salon demo. |
| `src/demos/art/ClinicArt.tsx` | **KEEP** | Vector art for clinic demo. |
| `src/demos/art/RestaurantArt.tsx` | **KEEP** | Vector art for restaurant demo. |
| `src/demos/art/index.ts` | **KEEP & TRIM** | Export kept demo art. |
| `src/demos/TheatreView.tsx` | **DELETE** | Cinema title cards, walkthrough tour scripts, voice narration removed per Section 3. |
| `src/demos/TourScript.tsx` | **DELETE** | Tour scripts removed per Section 3. |
| `src/demos/sections/DemoPlans.tsx` | **DELETE** | Only used by enterprise/gym demos. |
| `src/demos/sections/DemoProducts.tsx` | **DELETE** | Only used by shop demo. |
| `src/demos/sections/DemoSchedule.tsx` | **DELETE** | Only used by classes demo. |
| `src/demos/art/ClassesArt.tsx` | **DELETE** | Unused demo art. |
| `src/demos/art/GeneralArt.tsx` | **DELETE** | Unused demo art. |
| `src/demos/art/GymArt.tsx` | **DELETE** | Unused demo art. |
| `src/demos/art/JewelleryArt.tsx` | **DELETE** | Unused demo art. |
| `src/demos/art/ShopArt.tsx` | **DELETE** | Unused demo art. |

---

### 4.4 Data Files (`src/data/`)

| File | Action | Reason |
| :--- | :---: | :--- |
| `src/data/pricing.ts` | **KEEP** | Canonical pricing data for `/services` (Starter, Growth, Business, Premium, Custom). |
| `src/data/team.ts` | **KEEP & UPDATE** | Store real, verified founder bios and links for Harsh, Ankit, and Akshay. |
| `src/data/testimonials.ts` | **DELETE** | Fabricated client testimonials ("Pooja Mehta", etc.) removed per Section 1 & 3. |
| `src/data/founders.json` | **DELETE** | Mutable CMS file containing 3D avatar references and fake signature paths. |
| `src/data/offer.ts` | **DELETE** | Contains fake scarcity figures ("launchSlotsLeft: 10"). |
| `src/data/demo.ts` | **DELETE** | Jewellery demo data removed with jewellery demo. |
| `src/data/industries.ts` | **DELETE** | Orphaned 8-industry list. The 3 kept demos are configured in `demos.config.ts`. |

---

### 4.5 Content Collections (`src/content/`)

| Directory / Files | Action | Reason |
| :--- | :---: | :--- |
| `src/content/blog/*` (5 MDX files + `translations.ts`) | **DELETE** | Blog collection removed per Section 3. |
| `src/content/portfolio/*` (5 MDX files: `harshos`, `docgen`, `ai-booking-salon`, `chatbot-ca-firm`, `ecommerce-clothing`) | **DELETE** | Fabricated portfolio case studies removed per Section 1 & 3. |

---

### 4.6 Library, Helpers, Types, Styles & i18n

| File | Action | Reason |
| :--- | :---: | :--- |
| `src/lib/validations.ts` | **KEEP & TRIM** | Contact form Zod validation schema. Strip out unused audit schemas and mock turnstile tokens. |
| `src/lib/metadata.ts` | **KEEP** | Standard Next.js metadata constructor. |
| `src/lib/brand.ts` | **KEEP & TRIM** | Core brand details (phone, email, WhatsApp, Mumbai address). |
| `src/lib/services-data.ts` | **DELETE** | Contains obsolete services, fake metrics, and ₹499 audit references. |
| `src/lib/mdx.ts` | **DELETE** | Node `fs`/`gray-matter` loader for blog and portfolio MDX files. |
| `src/lib/blog.ts` | **DELETE** | Blog reading time and category helpers. |
| `src/lib/founders.ts` | **DELETE** | Dynamic founder reader helper. |
| `src/lib/auth.ts` | **DELETE** | Basic auth helpers for `/api/upload` and `/api/founders`. |
| `src/lib/perf.ts` | **DELETE** | Performance mode toggle utility. |
| `src/lib/tokens.ts` | **DELETE** | Dark theme token objects. |
| `src/lib/demoFonts.ts` | **DELETE** | Only referenced by deleted `demo/DemoFrame.tsx`. |
| `src/lib/useReveal.ts` | **DELETE** | Motion reveal hook. |
| `src/hooks/useTheme.ts` | **DELETE** | Dark/light theme hook removed (light mode only). |
| `src/hooks/useInView.ts` | **DELETE** | Orphaned intersection observer hook. |
| `src/hooks/useScrollProgress.ts` | **DELETE** | Orphaned scroll progress hook. |
| `src/i18n/*` (7 files: `index.tsx`, `languages.ts`, `seo.ts`, `REVIEW.md`, `locales/*.json`) | **DELETE** | Multi-language translation layer removed per launch spec (English only). |
| `src/styles/devanagari.css` | **DELETE** | Devanagari font rules removed per launch spec. |
| `src/styles/demo.css` | **KEEP & TRIM** | CSS rules for sample business demo layouts. |
| `src/types/blog.ts` | **DELETE** | Blog TypeScript interfaces. |
| `src/types/index.ts` | **KEEP & TRIM** | Keep core application types; strip out blog, portfolio, audit, and 3D interfaces. |

---

### 4.7 Public Assets (`public/`)

| File / Pattern | Action | Reason |
| :--- | :---: | :--- |
| `public/brand/logo-transparent.png` | **KEEP** | Primary brand logo for header, footer, and brochures. |
| `public/brand/logo-primary.png` | **KEEP** | Secondary brand logo asset. |
| `public/brand/app-icon.png` | **KEEP** | Browser icon and web app manifest icon. |
| `public/brand/brand-banner.png` | **KEEP** | Social sharing banner image. |
| `public/og-image.png` | **KEEP** | Static OpenGraph fallback image. |
| `public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` | **KEEP** | Standard favicon assets. |
| `public/assets/showcase/salon.webp` | **KEEP** | Showcase card image for Salon demo. |
| `public/assets/showcase/clinic.webp` | **KEEP** | Showcase card image for Clinic demo. |
| `public/assets/showcase/restaurant.webp` | **KEEP** | Showcase card image for Restaurant demo. |
| `public/assets/showcase/` (`classes`, `general`, `gym`, `jewellery`, `shop`) | **DELETE** | Showcase images for deleted demo industries. |
| `public/models/` (`head.glb`, `head-particles.bin`) | **DELETE** | Three.js 3D models removed per Section 3. |
| `public/fonts/` (`cal-sans-bold.woff2`, `cal-sans-semibold.woff2`) | **DELETE** | Cal Sans font removed per Section 2 (Inter via `next/font`). |
| `public/crew/` (6 files: 3D character avatars for founders) | **DELETE** | Cartoonish 3D avatars removed per Section 3. |
| `public/uploads/founders/` (12 files: portraits & signatures) | **DELETE** | Admin uploaded assets and fake signatures removed per Section 3. |
| `public/harshos/` & `public/harshos*` (4 files: HTML, SVG) | **DELETE** | Fabricated portfolio OS project assets removed per Section 3. |
| `public/docgen/` & `public/demos/docgen*` (3 files: HTML) | **DELETE** | Fabricated portfolio DocGen project assets removed per Section 3. |
| `public/brand/` (`app-icon-clean`, `app-icon-squircle`, `headquarters.*`, `old_*`, `test-icon`) | **DELETE** | Old, orphaned brand drafts. |
| `public/india_clean.svg`, `india_optimized.svg`, `india_soi.svg` | **DELETE** | Unused SVG map files. |
| `public/images/ai-face-reference.jpg` | **DELETE** | AI face training/reference image. |
| `public/demo/jewellery/README.txt` | **DELETE** | Orphaned readme. |
| `public/banner-hero.png`, `public/logo.png`, `public/logo-dark.*`, `public/logo-light.png` | **DELETE** | Redundant logo variations. Standardize on `brand/logo-transparent.png`. |

---

### 4.8 Scripts & Root Utilities

| Path | Action | Reason |
| :--- | :---: | :--- |
| `scripts/` (all 23 `.js` and `.mjs` scripts) | **DELETE** | One-off scripts for capturing screenshots, verifying old spotlight animations, and generating Three.js 3D models. None belong in a clean production repo. |
| `build.bat` | **DELETE** | One-off Windows script. Developers and agents run `pnpm build`. |
| `dev.bat` | **DELETE** | One-off Windows script. Use `pnpm dev`. |
| `start.bat` | **DELETE** | One-off Windows script. Use `pnpm start`. |
| `start.sh` | **DELETE** | One-off shell script. |
| `inspect.mjs` | **DELETE** | One-off diagnostic script forwarding to `scripts/inspect.mjs`. |
| `pnpm.cmd` & `pnpm.ps1` | **DELETE** | Local CLI wrappers; pnpm should be invoked via standard PATH. |
| `temp_buzzwords.csv` | **DELETE** | Temporary audit scratch file. |

---

### 4.9 Root Documentation & Config Alignment

| File | Current State | Required Update for Reset |
| :--- | :--- | :--- |
| `README.md` | States stack is Next.js, TypeScript, Tailwind v4, Three.js, Resend. | Correct Tailwind version to **v3.4**. Remove Three.js and MDX from stack description. Document the 6 clean pages. |
| `AGENTS.md` | Contains obsolete rules: "Every component must work in dark and light mode", "Three.js canvases must lazy load", "Tailwind CSS v4". | Update rules to match `ANTIGRAVITY_PLAN.md`: light mode only, no Three.js, Tailwind v3.4, real Mumbai business copy, run order phases. |
| `SECURITY_REPORT.md` | Inaccurate, claims high security while `/api/upload` and hardcoded tokens exist. | Delete in cleanup. A true security review is captured in `docs/security-notes.md`. |
| `package.json` | Includes `three`, `@types/three`, `gray-matter`. | Remove `three`, `@types/three`, and `gray-matter` in Phase 2 cleanup. |
| `backend/` | Standalone FastAPI backend with Supabase and Turnstile. | **LEAVE UNTOUCHED** until Section 9. Frontend will completely decouple from it. |

---

## 5. Phase 2 (Cleanup) Execution Sequence & Safeties

To prevent broken builds during file deletion, the **Cleanup Engineer** in Phase 2 should follow this sequenced order of operations:

```
Step 1: Decouple Root Layout & Kept Pages
  - Remove <SplashCurtain />, <GlobalCursorGlow />, and <LanguageProvider> from RootLayout.
  - Remove <BlogPreview />, <PortfolioPreview />, <TestimonialsSection />, and mdx calls from HomePage.
  - Remove <AuditCard /> from ContactPageContent.
  - Remove <TheatreView /> from DemoShell.
  - In AboutPage, render a minimal placeholder founders block instead of FounderShowcase.
  - Simplify sitemap.ts to return only the 6 static URLs.

Step 2: Delete Standalone Unused Directories
  - Delete `src/content/` (all blog and portfolio MDX files).
  - Delete `src/components/blog/`, `src/components/sections/blog/`, `src/app/(site)/blog/`.
  - Delete `src/components/sections/portfolio/`, `src/app/(site)/portfolio/`.
  - Delete `src/components/sections/audit/`, `src/components/AuditCard.tsx`, `src/app/(site)/audit/`.
  - Delete `src/app/admin/`, `src/app/api/founders/`, `src/app/api/upload/`.
  - Delete `src/components/three/`, `public/models/`.
  - Delete deleted demos in `src/app/demos/` (`classes`, `enterprise`, `general`, `gym`, `jewellery`, `shop`).
  - Delete deleted demo art and unused sections in `src/demos/art/` and `src/demos/sections/`.
  - Delete `scripts/` and root `.bat`/`.ps1`/`inspect.mjs`.

Step 3: Remove Dead Dependencies in package.json
  - Remove `three`, `@types/three`, and `gray-matter`.
  - Run `pnpm install`.

Step 4: Verification Gate
  - Run `pnpm type-check && pnpm lint && pnpm build`.
  - Verify that file count drops from ~376 to under ~80 files.
```

---

## 6. Conclusion & Recommendation for Checkpoint 1

The architecture of SHREEJAN AI SOLUTIONS has been mapped from root to leaves. All 23 cross-import dependencies linking the 6 kept pages to the deletion list have been isolated and provided with clear decoupling instructions. 

This concludes the Architect Agent's Phase 1 deliverable. The report is ready for owner review alongside `docs/claims.md` and `docs/security-notes.md`.
