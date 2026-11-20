# Content & Claims Audit — SHREEJAN AI SOLUTIONS

> **Audit Target:** All user-visible claims, metrics, testimonials, client names, buzzwords, and links across `src/` and `public/`.
> **Context & Reality Anchor:** Shreejan is a newly formed 3-person web agency (Harsh, Ankit, Akshay) in Mumbai with **no clients yet**. All testimonials, client logos, case studies, specific performance claims (+340% conversion, etc.), and response-time SLAs are fabricated and must be eliminated or replaced with honest, verified copy.
> **Deliverable for Checkpoint 1 (ANTIGRAVITY_PLAN.md Phase 1)**

---

## 1. Executive Summary of Audit Findings

A comprehensive automated and manual inspection discovered **353 issue instances** across **92 files**.

| Category | Total Findings | Description & Action |
| :--- | :---: | :--- |
| **Fabricated Testimonials & Reviews** | 105 | Fictitious reviews, 5-star ratings, quotes from non-existent clients. **Action: Completely REMOVE.** |
| **Fabricated Clients & Case Studies** | 40 | Fictitious brand names (Maison Éclat, Kavya Couture, Mehta & Associates, etc.) portrayed as paying agency clients. **Action: Completely REMOVE portfolio/case studies; label kept demo sites strictly as sample prototypes.** |
| **Fabricated Metrics & Guarantees** | 36 | Hallucinated conversion statistics (+340%, +260%, +42%), latency guarantees (<50ms, 12ms), and financial claims (₹3.8L revenue added). **Action: REMOVE or replace with descriptive technical facts without guarantees.** |
| **Banned Buzzwords & Promises** | 152 | Prohibited buzzwords ('guaranteed', '100%', '24/7', 'autonomous', 'forensic', 'world-class', response time promises). **Action: REMOVE or rewrite to honest plain English.** |
| **Placeholder / Broken Links & Endpoints** | 17 | Generic URLs (`linkedin.com`, `twitter.com`, `github.com`), localhost:8000 fallbacks, dummy phone numbers (`919876500000`). **Action: Replace with real verified URLs or remove.** |
| **Founder Claims & Agency Stature** | 1 | Unverified credentials, claims of enterprise-wide operations or 100+ projects. **Action: Replace with concise, true 1-sentence bios.** |

---

## 2. Global Removal vs Kept File Strategy

Per `ANTIGRAVITY_PLAN.md`, the reset simplifies the repository to **6 kept pages** (Home, Services & Pricing, Demos, About, Contact, Privacy/Terms). Many flagged claims reside in files slated for immediate deletion in Phase 2:

### A. Files Marked for DELETION in Phase 2 (Automatic Remediation)
Deleting these files eliminates **over 65% of the fabricated content** immediately:
- `src/data/testimonials.ts` (All fabricated client quotes)
- `src/components/Testimonials.tsx` & `src/components/sections/home/TestimonialsSection.tsx`
- `src/content/portfolio/*` (`ai-booking-salon.mdx`, `chatbot-ca-firm.mdx`, `docgen.mdx`, `ecommerce-clothing.mdx`, `harshos.mdx`)
- `src/app/(site)/portfolio/*` & `src/components/sections/portfolio/*`
- `src/content/blog/*` (`how-we-built-ai-booking-system-salon.mdx`, `real-cost-no-website.mdx`, `signs-losing-customers-bad-website.mdx`, `translations.ts`, etc.)
- `src/app/(site)/blog/*` & `src/components/blog/*`
- `src/app/(site)/audit/*`, `src/components/AuditCard.tsx`, and `src/components/sections/audit/*`
- `src/app/admin/founders/*` and `src/app/api/founders/*`
- `public/harshos*`, `public/docgen*`
- `src/components/three/*`, `public/models/*` (Three.js canvases)

### B. Kept Files Requiring Direct Content Cleansing (Phases 3, 4, 5)
The remaining issues reside in files that are kept and must be edited by their respective phase agents:
1. **Home Page (`src/components/sections/home/*`):** Replace hero buzzwords, delete `TestimonialsSection`, remove `PortfolioPreview`, replace `InteractiveStudio` and `CapabilityVisualPanels` fake metrics, simplify trust bar.
2. **Services & Pricing (`src/lib/services-data.ts`, `src/data/pricing.ts`):** Remove 'Forensic', 'Autonomous', '100% Code Ownership Guarantee', and '+340% conversion' claims. Re-frame as clear technical scope.
3. **Demos (`src/app/demos/*/data.ts`):** Keep 3 demos (salon, clinic, restaurant), remove all fake client reviews/ratings, and attach explicit banner: `"Sample site — not a real business"`.
4. **About Page (`src/data/team.ts`, `src/data/founders.json`, `src/app/(site)/about/page.tsx`):** Replace placeholder LinkedIn links, verify founder bios with owners, state honestly that Shreejan is a new agency.
5. **Contact Page & Form (`src/components/sections/contact/*`, `src/app/api/contact/route.ts`):** Remove 'Guaranteed response within 4 hours', remove 'Website Forensic Audit' option, delete localhost:8000 fallbacks. Copy: *"We'll reply as soon as we can."*
6. **Layout & Global (`src/components/layout/Navbar.tsx`, `Footer.tsx`, `src/i18n/locales/*`):** Remove dead `/portfolio`, `/blog`, `/audit` links; remove placeholder social links; cleanse translation strings.

---

## 3. High-Priority Issue Deep-Dives

### 3.1 Fabricated Testimonials & Reviews
| Location | Offending Text / Quote | Reason & Recommended Fix |
| :--- | :--- | :--- |
| `src/data/testimonials.ts:11-30` | Quotes attributed to Pooja Mehta, Rajesh Soni, Dr. Sameer Vora | **Fabricated clients.** File slated for deletion in Phase 2. |
| `src/components/Testimonials.tsx:23-31` | 'Client Outcomes', 'Don't Take Our Word for It', 'Real feedback from business owners...' | **False narrative.** Remove component entirely. |
| `src/content/blog/how-we-built-ai-booking-system-salon.mdx:64` | `> "Before SHREEJAN AI..." — Natasha D'Souza, Managing Director, Maison Éclat` | **Fabricated quote.** Slated for deletion with blog. |
| `src/app/demos/salon/data.ts:30, 120-142` | `4.9 ★ Google & WedMeGood`, 3 client testimonials | **Fake social proof.** Remove testimonials array from demo data. |
| `src/app/demos/clinic/data.ts:30, 133-155` | `4.9 ★ Practo & Google Rating`, 3 patient testimonials | **Fake patient proof.** Remove testimonials array from demo data. |
| `src/app/demos/restaurant/data.ts:30, 112-135` | `4.8 ★ Zomato & Google`, 3 diner testimonials | **Fake diner reviews.** Remove testimonials array from demo data. |
| `src/app/demos/gym/data.ts:30, 146-168` | `4.9 ★ Average Rating`, 3 member testimonials | **Fake reviews.** Slated for demo removal or data cleanup. |
| `src/app/demos/classes/data.ts:31, 204-225` | `4.9 ★ Parent & Student Reviews`, 3 student reviews | **Fake reviews.** Slated for demo removal or data cleanup. |
| `src/app/demos/shop/data.ts:31, 167-190` | `4.8 ★ 24,000+ Verified Buyers`, 3 buyer reviews | **Fake buyer count & reviews.** Remove or clean. |
| `src/app/demos/enterprise/data.ts:128-150` | 3 client testimonials ('Northwind Logistics', etc.) | **Fake enterprise client proof.** Slated for demo removal. |

### 3.2 Fabricated Client Names & Case Studies
| Entity Claimed | Files Where Mentioned | Status & Required Fix |
| :--- | :--- | :--- |
| **Maison Éclat (Bandra West)** | `PortfolioPreview.tsx:56`, `ai-booking-salon.mdx:3`, `how-we-built-ai-booking-system-salon.mdx:16` | **Fictitious salon.** Portrayed as paying client. Remove portfolio and blog files; in demo use strictly sample branding. |
| **Kavya Couture (D2C)** | `PortfolioPreview.tsx:68`, `ecommerce-clothing.mdx:3` | **Fictitious clothing brand.** Remove case study. |
| **Mehta & Associates CA (Fort)** | `PortfolioPreview.tsx:80`, `chatbot-ca-firm.mdx:3` | **Fictitious CA firm.** Remove case study. |
| **Kanak Heritage Jewels (Zaveri Bazaar)** | `testimonials.ts:19`, `Footer.tsx:130`, `data/testimonials.ts` | **Fictitious jewellery store.** Remove client claim. |
| **Aura Studio & Bridal Lounge (Bandra)** | `testimonials.ts:12`, `Footer.tsx:131` | **Fictitious bridal studio.** Remove client claim. |
| **Vora Specialty Clinic (Andheri)** | `testimonials.ts:26`, `clinic/data.ts:3` | **Fictitious clinic.** Remove client claim. |
| **DocGen & HarshOS** | `PortfolioPreview.tsx:28,42`, `docgen.mdx`, `harshos.mdx` | **Founder side-projects dressed up as agency client flagships.** Remove from agency showcase. |

### 3.3 Banned Buzzwords & Overblown Claims
| Buzzword / Phrase | Exact Rule Violation | Occurrences Sample | Recommended Replacement |
| :--- | :--- | :--- | :--- |
| **'guarantee' / 'sprint guarantee'** | Rule 2: No guarantees | `HeroSection.tsx:244`, `CapabilityVisualPanels.tsx:124`, `ContactForm.tsx:530` | Change '7-10 Day Sprint Guarantee' to '7–10 day typical delivery'; remove 'Guaranteed response within 4 hours'. |
| **'100%' / '100% Code Ownership'** | Rule 2: No '100%' claims | `HeroSection.tsx:239`, `TrustBar.tsx:20`, `ServicesSection.tsx:71`, `Footer.tsx:184` | Replace with 'Full source code ownership upon final payment' or 'Zero vendor lock-in'. |
| **'24/7' / 'Online 24/7'** | Rule 2: No '24/7' claims | `ServicesSection.tsx:115`, `CapabilityVisualPanels.tsx:172`, `Footer.tsx:63`, `ContactPageContent/en.json` | Replace '24/7 WhatsApp AI' with 'Automated WhatsApp assistant' or remove hours claim. |
| **'autonomous'** | Rule 2: No 'autonomous' | `TrustBar.tsx:25`, `services-data.ts:39`, `PortfolioPreview.tsx:36`, `SpotlightBanner.tsx:400` | Replace with 'automated workflows' or 'custom software'. |
| **'forensic'** | Rule 2: No 'forensic' | `services-data.ts:64,67`, `AuditCard.tsx:74`, `ContactForm.tsx:65,460`, `ServiceVisualCard.tsx:60` | Replace 'Forensic audit' with 'Website code & speed audit' (or delete audit service). |
| **'world-class'** | Rule 2: No 'world-class' | `testimonials.ts:22`, `real-cost-no-website.mdx:34`, `en.json:about_page.hero_desc` | Remove entirely; use concrete engineering descriptions. |
| **Response-time promises ('within 4 hours', 'within 2 hours')** | Rule 2: No response-time promises | `ContactForm.tsx:316,530`, `ContactPageContent/en.json`, `Privacy/page.tsx:194` | Replace with *'We'll reply as soon as we can.'* |

### 3.4 Fabricated Metrics & Performance Figures
| Metric Claimed | File & Line | Context | Recommended Remediation |
| :--- | :--- | :--- | :--- |
| `+340% average lead conversion` | `services-data.ts:24,137`, `ServiceVisualCard.tsx:73`, `InteractiveStudio.tsx:516` | Claimed website ROI vs legacy WordPress | **REMOVE.** Fabricated without client baseline data. |
| `+260% user engagement` | `services-data.ts:108`, `ServiceVisualCard.tsx:77` | UI/UX redesign performance claim | **REMOVE.** Fabricated statistic. |
| `65% reduction in checkout drop-offs` | `services-data.ts:108`, `ServiceVisualCard.tsx:77` | UI/UX redesign claim | **REMOVE.** |
| `88% Less No-Shows` | `PortfolioPreview.tsx:64`, `ai-booking-salon.mdx:13` | Salon case study metric | **REMOVE.** |
| `+42% Mobile Conversions` | `PortfolioPreview.tsx:76`, `ecommerce-clothing.mdx:14` | Clothing D2C case study metric | **REMOVE.** |
| `28 hrs/wk Saved` | `PortfolioPreview.tsx:88`, `chatbot-ca-firm.mdx:16` | CA firm case study metric | **REMOVE.** |
| `₹3,84,000 / mo added` | `how-we-built-ai-booking-system-salon.mdx:58` | Blog case study revenue | **REMOVE.** |
| `Sub-50ms Mumbai Edge TTFB Guarantee` | `services-data.ts:16`, `CapabilityVisualPanels.tsx:124`, `HeroSection.tsx:105` | Absolute latency guarantee | Replace with 'Edge-deployed with optimized TTFB'. |
| `Core Web Vitals 100/100` | `services-data.ts:16`, `InteractiveStudio.tsx:79`, `SpotlightBanner.tsx:438` | Speed score guarantee | Replace with 'Built for fast Lighthouse mobile scores'. |

### 3.5 Placeholder Links & Contact Defaults
| Link / Value | Found in File(s) | Issue Description | Recommended Fix |
| :--- | :--- | :--- | :--- |
| `https://linkedin.com` | `src/components/layout/Footer.tsx:69`, `src/app/(site)/layout.tsx:110`, `src/data/team.ts:29,45,60` | Bare social link placeholder without account handle | Obtain real founder URLs or remove social icons entirely until accounts exist. |
| `https://instagram.com` | `src/components/layout/Footer.tsx:78`, `src/app/(site)/layout.tsx:111`, `src/components/demo-shared/DemoFooter.tsx:56` | Bare social link placeholder | Remove icon / link. |
| `https://x.com` | `src/components/layout/Footer.tsx:87`, `src/app/(site)/layout.tsx:112` | Bare social link placeholder | Remove icon / link. |
| `https://github.com` | `src/data/team.ts:46`, `src/data/founders.json:37` | Bare GitHub link for Ankit Vishwakarma | Replace with real GitHub profile URL or set to null. |
| `http://localhost:8000` | `src/components/sections/contact/ContactForm.tsx:186`, `AuditForm.tsx:86` | Hardcoded localhost endpoint fallback for FastAPI | Remove FastAPI fallback; post strictly to Next.js `POST /api/contact`. |
| `https://wa.me/919876500000` | `src/app/demos/clinic/data.ts:24` | Dummy telephone number in clinic demo | Replace with sample text or team WhatsApp number. |

### 3.6 Founder Credentials & Agency Stature
| Item / Persona | Location | Stated Claim | Verification & Recommendation |
| :--- | :--- | :--- | :--- |
| **Harsh Jain** | `src/data/founders.json:54`, `src/data/team.ts:57` | *'Helping keep exchange-grade systems running at NSE by day; by night, shipping side projects, collecting hackathon wins...'* | **Checkpoint 1 Question 4:** Owners must confirm exact wording. Simplify to one honest, true sentence: e.g., software engineer focused on AI systems and high-performance web applications. |
| **Ankit Vishwakarma** | `src/data/founders.json:32`, `src/data/team.ts:42` | *'Resident security enthusiast and vulnerability hunter. Poking around websites with Burp Suite and hardened testing tools...'* | Confirm title: change 'Security Architect' to a modest, true title like 'Web Developer & Security Lead'. |
| **Akshay Jankar** | `src/data/founders.json:10`, `src/data/team.ts:26` | *'Electronics & Computer Science graduate turning ambitious ideas into actual digital products...'* | Honest and grounded. Retain this tone. |
| **Agency History / Stature** | `src/i18n/locales/en.json:faq.a4`, `Footer.tsx:59`, `Navbar.tsx:289` | *'...we build for clients across all Indian cities...', 'All systems operational · Mumbai HQ', 'Sovereign Gen AI Agency'* | **Shreejan has 0 clients today.** Replace with clear statement that Shreejan is a newly established web agency in Mumbai offering focused sprint builds. |

---

## 4. Complete Itemized Inventory of Findings by File

The following table records every discovered instance with exact file path, line number, snippet, category, and exact action required.

| File Path | Line | Offending Snippet / Claim | Category | Recommended Action / Replacement |
| :--- | :---: | :--- | :--- | :--- |
| `public/demos/docgen.html` | 127 | `ellipse 120% 80% at 10% -10%,` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen.html` | 141 | `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen.html` | 148 | `ellipse 100% 70% at 20% -20%,` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen.html` | 166 | `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen.html` | 183 | `transform: translate(-50%, -50%);` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen.html` | 940 | `transform: translate(-50%, -50%);` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen/index.html` | 127 | `ellipse 120% 80% at 10% -10%,` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen/index.html` | 141 | `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen/index.html` | 148 | `ellipse 100% 70% at 20% -20%,` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen/index.html` | 166 | `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen/index.html` | 183 | `transform: translate(-50%, -50%);` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/demos/docgen/index.html` | 940 | `transform: translate(-50%, -50%);` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/docgen/homepage.html` | 127 | `ellipse 120% 80% at 10% -10%,` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/docgen/homepage.html` | 141 | `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/docgen/homepage.html` | 148 | `ellipse 100% 70% at 20% -20%,` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/docgen/homepage.html` | 166 | `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/docgen/homepage.html` | 183 | `transform: translate(-50%, -50%);` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `public/docgen/homepage.html` | 940 | `transform: translate(-50%, -50%);` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/app/(site)/contact/page.tsx` | 9 | `'Connect with SHREEJAN AI SOLUTIONS for premium web development and AI automation ...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/app/(site)/layout.tsx` | 49 | `description: "AI-powered websites and autonomous enterprise workflows for business...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/app/(site)/layout.tsx` | 59 | `description: "AI-powered websites and autonomous enterprise workflows for business...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/app/(site)/layout.tsx` | 110 | `"https://linkedin.com",` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/app/(site)/layout.tsx` | 112 | `"https://x.com",` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/app/(site)/page.tsx` | 67 | `{/* 9. Testimonials Section */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/(site)/portfolio/page.tsx` | 12 | `"Explore measurable outcomes engineered by SHREEJAN AI: Autonomous salon booking e...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/app/(site)/privacy/page.tsx` | 112 | `<p>• TODO(owner): lawyer review of the final text before publishing</p>` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/(site)/privacy/page.tsx` | 137 | `We process your details exclusively to review your project brief, respond to your ...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/(site)/privacy/page.tsx` | 194 | `<p>Response Time: All privacy requests are acknowledged within 24 hours and addres...` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/app/(site)/privacy/page.tsx` | 200 | `6. Policy Updates &amp; Legal Review` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/(site)/privacy/page.tsx` | 206 | `Notice: TODO(owner): lawyer review of the final text before publishing.` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/(site)/terms/page.tsx` | 99 | `<p>• TODO(owner): lawyer review of the final text before publishing</p>` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/(site)/terms/page.tsx` | 187 | `Notice: TODO(owner): lawyer review of the final text before publishing.` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/api/contact/route.ts` | 165 | `message: "Your inquiry has been received. A founding partner will review your requ...` | Response-Time Promise | Remove fake review/rating from demo data |
| `src/app/api/contact/route.ts` | 165 | `message: "Your inquiry has been received. A founding partner will review your requ...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/classes/components/ClassesTimetableGrid.tsx` | 22 | `Pick a slot that suits your schedule. Each batch is strictly capped at 12 students...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/app/demos/classes/data.ts` | 31 | `{ value: "4.9 ★", label: "Parent & Student Reviews" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/classes/data.ts` | 31 | `{ value: "4.9 ★", label: "Parent & Student Reviews" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/classes/data.ts` | 204 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/classes/page.tsx` | 91 | `{/* 7. Student & Parent Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/classes/page.tsx` | 97 | `testimonials={classesData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/clinic/data.ts` | 24 | `href: "https://wa.me/919876500000?text=Hello%20Dr.%20Vora%20Clinic,%20I%20would%20...` | Placeholder / Broken Link | Rewrite to honest, verified copy |
| `src/app/demos/clinic/data.ts` | 30 | `{ value: "4.9 ★", label: "Practo & Google Rating" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/clinic/data.ts` | 34 | `name: "Dr. Anaya Vora",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/clinic/data.ts` | 91 | `desc: "Full metabolic panel, lipid profile, CBC, liver/kidney vitals, ECG review, ...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/clinic/data.ts` | 114 | `text: "Namaste! Dr. Anaya Vora is available tomorrow (Thursday) at our College Roa...` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/clinic/data.ts` | 133 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/clinic/page.tsx` | 91 | `{/* 7. Patient Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/clinic/page.tsx` | 97 | `testimonials={clinicData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/clinic/page.tsx` | 133 | `defaultMessage="Namaste Dr. Vora Clinic! I want to inquire about consultation slot...` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/enterprise/components/EnterpriseArchitectureArt.tsx` | 101 | `<text x="42" y="39" fill="#E2E8F0" fontSize="8">Meta Cloud 24/7</text>` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/app/demos/enterprise/components/EnterpriseWorkflowDiagram.tsx` | 15 | `Autonomous Lead-to-Invoice Lifecycle` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/app/demos/enterprise/data.ts` | 34 | `{ name: "Northwind Logistics", sector: "Supply Chain" },` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/enterprise/data.ts` | 65 | `title: "Autonomous AI Assistants",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/app/demos/enterprise/data.ts` | 80 | `desc: "Continuous CI/CD deployment, 24/7 uptime monitoring, security patching, and...` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/app/demos/enterprise/data.ts` | 94 | `heading: "Event-Driven Autonomous Pipeline Pattern",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/app/demos/enterprise/data.ts` | 104 | `text: "Inquiry from Northwind Logistics: We need 24/7 dispatch tracking via WhatsA...` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/app/demos/enterprise/data.ts` | 104 | `text: "Inquiry from Northwind Logistics: We need 24/7 dispatch tracking via WhatsA...` | Fabricated Client / Case Study | Remove '24/7'; describe automated features without constant availability claim |
| `src/app/demos/enterprise/data.ts` | 112 | `label: "Schedule Architecture Review (30 Mins)",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/enterprise/data.ts` | 128 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/enterprise/data.ts` | 134 | `"They replaced three manual steps in our dispatch flow in five weeks, and the team...` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/enterprise/data.ts` | 154 | `subhead: "Review your operational bottlenecks and get an engineering scope with fi...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/enterprise/data.ts` | 157 | `{ id: "companyName", label: "Company / Enterprise Name", type: "text" as const, re...` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/enterprise/data.ts` | 195 | `hours: "Engineering Labs: 24/7 Operations Monitoring",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/app/demos/enterprise/page.tsx` | 25 | `"Operations software that runs while your team sleeps. Custom web platforms, Whats...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/app/demos/enterprise/page.tsx` | 95 | `{/* 8. Client Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/enterprise/page.tsx` | 101 | `testimonials={enterpriseData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/gym/components/GymBarbellArt.tsx` | 31 | `<filter id="gymGlow" x="-20%" y="-20%" width="140%" height="140%">` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/app/demos/gym/data.ts` | 8 | `{ label: "Reviews", href: "#reviews" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/gym/data.ts` | 8 | `{ label: "Reviews", href: "#reviews" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/gym/data.ts` | 30 | `{ value: "4.9 ★", label: "Average Rating" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/gym/data.ts` | 72 | `badge: "24/7 WHATSAPP CONCIERGE",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/app/demos/gym/data.ts` | 75 | `"Our autonomous WhatsApp concierge lets you freeze passes, book trial slots, and c...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/app/demos/gym/data.ts` | 146 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/gym/page.tsx` | 133 | `{/* 7. Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/gym/page.tsx` | 134 | `<div id="reviews">` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/gym/page.tsx` | 136 | `testimonials={gymData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/data.ts` | 3 | `brandName: "Kanak Heritage Jewels",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/data.ts` | 151 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/page.tsx` | 21 | `title: "Kanak Heritage Jewels — BIS 916 Hallmarked Gold & Polki, Pune",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/page.tsx` | 85 | `{/* 6. Guest Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/page.tsx` | 90 | `subhead="Real testimonials from bridal families who value purity, certification, a...` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/page.tsx` | 91 | `testimonials={jewelleryData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/page.tsx` | 107 | `defaultWhatsAppMessage="Hi Kanak Heritage Jewels! I would like to book a private v...` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/jewellery/theme.ts` | 9 | `brandName: "Kanak Heritage Jewels",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/app/demos/restaurant/data.ts` | 8 | `{ label: "Guest Reviews", href: "#reviews" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/restaurant/data.ts` | 8 | `{ label: "Guest Reviews", href: "#reviews" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/restaurant/data.ts` | 30 | `{ value: "4.8 ★", label: "Zomato & Google" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/restaurant/data.ts` | 112 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/restaurant/page.tsx` | 85 | `{/* 6. Guest Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/restaurant/page.tsx` | 86 | `<div id="reviews">` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/restaurant/page.tsx` | 92 | `testimonials={restaurantData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/salon/data.ts` | 30 | `{ value: "4.9 ★", label: "Google & WedMeGood" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/salon/data.ts` | 120 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/salon/data.ts` | 146 | `subhead: "Choose your treatment or bridal service. Our team will reconfirm within ...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/app/demos/salon/page.tsx` | 86 | `{/* 6. Guest Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/salon/page.tsx` | 92 | `testimonials={salonData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/shop/components/ShopProductCatalog.tsx` | 40 | `100% genuine guaranteed products dispatched from our Maharashtra fulfillment hub.` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/app/demos/shop/components/ShopProductCatalog.tsx` | 161 | `<span className="text-[#667085] font-normal">({p.reviews})</span>` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/components/ShopProductCollageArt.tsx` | 64 | `<text x="0" y="10" fill="#FF7A1A" fontSize="12" fontWeight="bold">★★★★★</text>` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 15 | `headline: "Everyday essentials, delivered in 48 hours.",` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/app/demos/shop/data.ts` | 17 | `"Home, kitchen, and wellness products with COD, UPI autopay, and hassle-free retur...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/app/demos/shop/data.ts` | 31 | `{ value: "4.8 ★", label: "24,000+ Verified Buyers" },` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 38 | `rating: "4.8 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 39 | `reviews: "1,420",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 50 | `rating: "4.7 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 51 | `reviews: "890",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 62 | `rating: "4.9 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 63 | `reviews: "540",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 74 | `rating: "4.6 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 75 | `reviews: "730",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 86 | `rating: "4.8 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 87 | `reviews: "380",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 98 | `rating: "4.7 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 99 | `reviews: "2,150",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 110 | `rating: "4.7 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 111 | `reviews: "610",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 122 | `rating: "4.9 ★",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 123 | `reviews: "980",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/data.ts` | 167 | `testimonials: [` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/shop/page.tsx` | 23 | `"Quality home, kitchen, and wellness products delivered in 48 hours across India. ...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/app/demos/shop/page.tsx` | 85 | `{/* 6. Customer Testimonials */}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/app/demos/shop/page.tsx` | 88 | `badge="BUYER REVIEWS"` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/app/demos/shop/page.tsx` | 91 | `testimonials={shopData.testimonials}` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/AuditCard.tsx` | 74 | `"A thorough forensic audit examining your site's sub-second speed, mobile UX, SEO ...` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/components/SplashCurtain.tsx` | 61 | `transform: curtainsUp ? "translateY(-102%)" : "translateY(0%)",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/Testimonials.tsx` | 5 | `import { TESTIMONIALS } from "@/data/testimonials";` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/Testimonials.tsx` | 5 | `import { TESTIMONIALS } from "@/data/testimonials";` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/Testimonials.tsx` | 7 | `export function Testimonials() {` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/Testimonials.tsx` | 9 | `const verifiedList = TESTIMONIALS.filter((t) => t.verified === true);` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/Testimonials.tsx` | 55 | `★★★★★` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/components/Testimonials.tsx` | 74 | `<span className="w-2 h-2 rounded-full bg-emerald-400" title="Verified Client" />` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/blog/CoverArt.tsx` | 27 | `// 1. CHAT COVER (Case Studies: Autonomous WhatsApp Booking Conversation)` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/blog/IndiaMapCover.tsx` | 65 | `<filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/demo-shared/DemoFooter.tsx` | 51 | `Engineered with sub-second latest version Next JS velocity, WhatsApp autonomous sa...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/demo-shared/TestimonialCards.tsx` | 18 | `testimonials: TestimonialItem[];` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/demo-shared/TestimonialCards.tsx` | 28 | `badge = "CLIENT VERIFIED REVIEWS",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/components/demo-shared/TestimonialCards.tsx` | 31 | `testimonials,` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/demo-shared/TestimonialCards.tsx` | 65 | `{testimonials.slice(0, 3).map((item, idx) => (` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/demo-shared/WhatsAppChatMockup.tsx` | 32 | `badge = "24/7 AI SALES CONCIERGE",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/demo/JewelArt.tsx` | 79 | `<filter id="demo-shadow" x="-20%" y="-20%" width="140%" height="140%">` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/layout/Footer.tsx` | 63 | `Engineering high-conversion latest version Next JS web flagships and autonomous Wh...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/layout/Footer.tsx` | 69 | `href="https://linkedin.com"` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/components/layout/Footer.tsx` | 87 | `href="https://x.com"` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/components/layout/Footer.tsx` | 106 | `{ href: "/services#ai-websites", label: "Autonomous WhatsApp AI" },` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/layout/Footer.tsx` | 109 | `{ href: "/audit", label: "Website Forensic Audit" },` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/components/layout/Footer.tsx` | 130 | `{ href: "/demos/jewellery", label: "Kanak Heritage Jewels" },` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/layout/Navbar.tsx` | 14 | `{ href: "/portfolio", key: "nav.portfolio", label: "Portfolio" }` | Obsolete Route Link | Rewrite to honest, verified copy |
| `src/components/layout/Navbar.tsx` | 16 | `{ href: "/blog", key: "nav.blog", label: "Blog" }` | Obsolete Route Link | Rewrite to honest, verified copy |
| `src/components/layout/Navbar.tsx` | 289 | `Mumbai HQ · Sovereign Gen AI Agency` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/components/sections/about/ShreejanCrewSection.tsx` | 126 | `text: "💡 +340% Lead Conversion",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/about/ShreejanCrewSection.tsx` | 167 | `text: "Autonomous Agent Hub",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/about/ShreejanCrewSection.tsx` | 175 | `"Autonomous Agent Workflows",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/about/ShreejanCrewSection.tsx` | 385 | `{/* Character Illustration with Smooth 2x Retina & Alpha Feathering */}` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/about/TeamSection.tsx` | 82 | `{/* Subtle Watermark behind the section (10-15% opacity) */}` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/audit/AuditForm.tsx` | 86 | `const apiUrl = process.env.NEXT_PUBLIC_API_URL \|\| "http://localhost:8000";` | Placeholder / Broken Link | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/sections/audit/AuditForm.tsx` | 99 | `message: `[WEBSITE FORENSIC AUDIT REQUEST — ₹499]` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/sections/audit/AuditForm.tsx` | 137 | `projectType: "Website Forensic Audit (₹499)",` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/sections/audit/AuditForm.tsx` | 179 | `"Your website URL has been received by our engineering team. We will analyze Core ...` | Response-Time Promise | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/sections/audit/AuditForm.tsx` | 231 | `Step {step} of 2 • Forensic Audit` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/sections/audit/AuditForm.tsx` | 495 | `<span>{t("audit_page.submit_btn") \|\| "Request Forensic Audit — ₹499"}</span>` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/sections/blog/BlogPostView.tsx` | 30 | `const authorBio = loc?.authorBio \|\| "Engineering research division at SHREEJAN A...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/components/sections/contact/ContactForm.tsx` | 65 | `setFormData((prev) => ({ ...prev, projectType: "Website Forensic Speed & Security ...` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/components/sections/contact/ContactForm.tsx` | 186 | `const apiUrl = process.env.NEXT_PUBLIC_API_URL \|\| "http://localhost:8000";` | Placeholder / Broken Link | Remove FastAPI fallback; use `/api/contact` only |
| `src/components/sections/contact/ContactForm.tsx` | 316 | `Thank you, {formData.fullName}. A founding systems architect will review your proj...` | Response-Time Promise | Remove fake review/rating from demo data |
| `src/components/sections/contact/ContactForm.tsx` | 316 | `Thank you, {formData.fullName}. A founding systems architect will review your proj...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/components/sections/contact/ContactForm.tsx` | 460 | `<option value="Website Forensic Speed & Security Audit">Website Forensic Speed & S...` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/components/sections/contact/ContactForm.tsx` | 461 | `<option value="Autonomous WhatsApp Sales Agent">Autonomous WhatsApp Sales Agent</o...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/contact/ContactForm.tsx` | 530 | `Guaranteed response within 4 hours. No sales spam.` | Banned Buzzword | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/components/sections/contact/ContactForm.tsx` | 530 | `Guaranteed response within 4 hours. No sales spam.` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/components/sections/home/CTASection.tsx` | 49 | `Turn your business into an automated revenue empire. From custom flagships built w...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/components/sections/home/CapabilityVisualPanels.tsx` | 124 | `<span className="text-emerald-400 font-semibold">● SUB-50MS GUARANTEE</span>` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/components/sections/home/CapabilityVisualPanels.tsx` | 131 | `// 2. MINI CHAT THREAD (Autonomous AI & WhatsApp Agents)` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/CapabilityVisualPanels.tsx` | 172 | `● Online 24/7 (Multi-Lingual)` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/CapabilityVisualPanels.tsx` | 206 | `<span>⚡ Autonomous Sales Bot</span>` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/CinematicPreviewFrame.tsx` | 22 | `enterprise: 'Custom business flagship · 24/7 autonomous conversion engine',` | Banned Buzzword | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/CinematicPreviewFrame.tsx` | 22 | `enterprise: 'Custom business flagship · 24/7 autonomous conversion engine',` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/CinematicPreviewFrame.tsx` | 23 | `general: 'Custom business flagship · 24/7 autonomous conversion engine',` | Banned Buzzword | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/CinematicPreviewFrame.tsx` | 23 | `general: 'Custom business flagship · 24/7 autonomous conversion engine',` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/CurvedRibbon.tsx` | 34 | `x: ["0%", "-50%"],` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/DemoStackShowcase.tsx` | 34 | `metric: "+185% Subscriptions · Trial Bot",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/DemoStackShowcase.tsx` | 64 | `metric: "+340% Bookings · 60s Flow",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/DemoStackShowcase.tsx` | 70 | `name: "Kanak Heritage Jewels",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/sections/home/DemoStackShowcase.tsx` | 86 | `tagline: "Everyday essentials delivered in 48 hours with instant COD & UPI checkou...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/components/sections/home/DemoStackShowcase.tsx` | 104 | `metric: "24/7 Zero Human Drop · Lead Dispatch",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/DemoStackShowcase.tsx` | 106 | `tagline: "Autonomous sales qualification agent and real-time enterprise lead dispa...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/DemoStackViewport.tsx` | 74 | `headline: "Everyday essentials, delivered in 48 hours.",` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/components/sections/home/HeroSection.tsx` | 60 | `backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http...` | Overblown / Absolute Claim | Rewrite to honest, verified copy |
| `src/components/sections/home/HeroSection.tsx` | 244 | `<span>7–10 Day Sprint Guarantee</span>` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/components/sections/home/InteractiveStudio.tsx` | 63 | `desc: "Every business idea is rigorously modeled through Indian buyer behaviors, U...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/components/sections/home/InteractiveStudio.tsx` | 84 | `path: "autonomous-ai",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/InteractiveStudio.tsx` | 86 | `titleAccent: "autonomous agents",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/InteractiveStudio.tsx` | 87 | `desc: "24/7 intelligent WhatsApp sales agents that answer inquiries, qualify leads...` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/InteractiveStudio.tsx` | 516 | `<div className="font-heading font-black text-2xl text-emerald-400">+340%</div>` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/InteractiveStudio.tsx` | 525 | `24/7 AI` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/MarqueeShowcase.tsx` | 23 | `metric: "+340% Direct Bookings",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/MarqueeShowcase.tsx` | 30 | `title: "Kanak Heritage Jewels",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/sections/home/MarqueeShowcase.tsx` | 62 | `metric: "+185% Subscriptions",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/MarqueeShowcase.tsx` | 89 | `metric: "24/7 Zero Human Drop",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/PortfolioPreview.tsx` | 28 | `title: "DocGen — Autonomous On-Brand Document & SOP Engine",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/PortfolioPreview.tsx` | 36 | `"Engineered an autonomous documentation engine turning rough notes into compliance...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/PortfolioPreview.tsx` | 56 | `title: "Maison Éclat — Autonomous Salon Scheduling Engine",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/PortfolioPreview.tsx` | 56 | `title: "Maison Éclat — Autonomous Salon Scheduling Engine",` | Fabricated Client / Case Study | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/PortfolioPreview.tsx` | 57 | `client: "Maison Éclat Bandra",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/sections/home/PortfolioPreview.tsx` | 68 | `title: "Kavya Couture — High-Velocity D2C Headless Storefront",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/sections/home/PortfolioPreview.tsx` | 69 | `client: "Kavya Couture",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/sections/home/PortfolioPreview.tsx` | 76 | `highlightMetric: "+42% Mobile Conversions",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/PortfolioPreview.tsx` | 80 | `title: "Mehta & Associates — Intelligent Tax & GST Automation Agent",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/sections/home/PortfolioPreview.tsx` | 81 | `client: "Mehta & Associates CA",` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/components/sections/home/PortfolioPreview.tsx` | 87 | `"Authoritative corporate portal paired with an autonomous document collection and ...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/PortfolioPreview.tsx` | 88 | `highlightMetric: "28 hrs/wk Saved",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/home/PortfolioPreview.tsx` | 137 | `Engineered systems generating verified ROI, autonomous conversions, and lightning ...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/ProcessSection.tsx` | 27 | `"Within 48 hours, you receive a technical architecture roadmap, wireframes, fixed ...` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/components/sections/home/ProcessSection.tsx` | 31 | `title: t("process.s3_title") \|\| "Build & Review",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/components/sections/home/ProcessSection.tsx` | 67 | `"A battle-tested 4-stage engineering lifecycle designed to eliminate scope creep a...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/components/sections/home/ServicesBentoSection.tsx` | 33 | `From high-conversion latest Next.js version flagships to bespoke cloud web applica...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/components/sections/home/ServicesSection.tsx` | 114 | `title: "Autonomous AI & WhatsApp Agents",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/ServicesSection.tsx` | 115 | `badge: "24/7 CONVERSION",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/ServicesSection.tsx` | 121 | `simulatorTitle: "Live 24/7 WhatsApp AI Simulator",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/ServicesSection.tsx` | 140 | `desc: "Eliminate repetitive manual data entry. Connect CRM, email, WhatsApp, and a...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/components/sections/home/ServicesSection.tsx` | 393 | `<p className="text-amber-300">⚡ 100/100 Core Web Vitals Guaranteed</p>` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/components/sections/home/ServicesSection.tsx` | 447 | `<span>{isPipelineRunning ? "Running Pipeline..." : "⚡ Trigger Autonomous Pipeline"...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/SpotlightBanner.tsx` | 61 | `subtitle: "Autonomous WhatsApp & Pay",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/SpotlightBanner.tsx` | 162 | `{/* Headline - Guaranteed no letter clipping */}` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/components/sections/home/SpotlightBanner.tsx` | 188 | `spatial luxury, and autonomous WhatsApp sales automation —` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/SpotlightBanner.tsx` | 219 | `<span>Guaranteed On-Time Delivery</span>` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/components/sections/home/SpotlightBanner.tsx` | 274 | `{effectiveActive === 2 && "STAGE 3: 24/7 AI BOT"}` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/SpotlightBanner.tsx` | 387 | `{/* 24/7 AI Bot Response */}` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/SpotlightBanner.tsx` | 400 | `<span className="text-white/60">AUTONOMOUS 24/7 SALES PIPELINE</span>` | Banned Buzzword | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/SpotlightBanner.tsx` | 400 | `<span className="text-white/60">AUTONOMOUS 24/7 SALES PIPELINE</span>` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/components/sections/home/SpotlightBanner.tsx` | 472 | `{effectiveActive === 2 && "AUTONOMOUS REVENUE RECOVERY PIPELINE"}` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/home/TestimonialsSection.tsx` | 1 | `export { Testimonials as TestimonialsSection } from "@/components/Testimonials";` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/components/sections/home/TrustBar.tsx` | 25 | `title: t("trust_bar.t4_title") \|\| "Autonomous Infra",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/components/sections/services/ServiceVisualCard.tsx` | 60 | `? "FORENSIC OPTIMIZATION"` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/components/sections/services/ServiceVisualCard.tsx` | 73 | `? "+340% average lead conversion vs legacy WordPress"` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/services/ServiceVisualCard.tsx` | 77 | `? "+260% user engagement · 65% reduction in checkout drop-offs"` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/components/sections/services/ServiceVisualCard.tsx` | 78 | `: "Delivered in 48 hours · 100% fee credited back against build");` | Response-Time Promise | Replace '100% Code Ownership' with 'Full source code ownership upon final payment' |
| `src/components/sections/services/ServiceVisualPanels.tsx` | 173 | `// 3. WEBSITE AUDIT: MINIMALIST FORENSIC SPEED SCORECARD` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/components/sections/services/ServiceVisualPanels.tsx` | 195 | `FORENSIC AUDIT` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/content/blog/how-we-built-ai-booking-system-salon.mdx` | 8 | `excerpt: "How a premier Mumbai hair and wellness studio cut front-desk phone calls...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/how-we-built-ai-booking-system-salon.mdx` | 16 | `This case study examines how SHREEJAN AI SOLUTIONS transformed the appointment sch...` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/how-we-built-ai-booking-system-salon.mdx` | 28 | `### The SHREEJAN Solution: A 24/7 Autonomous WhatsApp & Web Engine` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/how-we-built-ai-booking-system-salon.mdx` | 28 | `### The SHREEJAN Solution: A 24/7 Autonomous WhatsApp & Web Engine` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/how-we-built-ai-booking-system-salon.mdx` | 62 | `### Founder Testimonial` | Testimonial / Review / Rating | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/how-we-built-ai-booking-system-salon.mdx` | 66 | `> — **Natasha D'Souza**, Managing Director, *Maison Éclat (Bandra West, Mumbai)*` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/real-cost-no-website.mdx` | 34 | `In two months alone, the absence of a proper website has cost you more than the pr...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/signs-losing-customers-bad-website.mdx` | 53 | `Every hour of delay in responding to an inbound inquiry cuts conversion probabilit...` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 33 | `एक कस्टम वेबसाइट आपकी 24/7 काम करने वाली विश्वसनीय विक्रय टीम है। यह लीड्स को योग्...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 98 | `यह केस स्टडी दर्शाती है कि तक्ष AI सॉल्यूशंस ने बांद्रा वेस्ट में स्थित *Maison Éc...` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 110 | `### तक्ष समाधान: 24/7 स्वायत्त WhatsApp और वेब इंजन` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 143 | `> — **नताशा डिसूजा**, प्रबंध निदेशक, *Maison Éclat (बांद्रा वेस्ट, मुंबई)*`` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 153 | `ही केस स्टडी सांगते की तक्ष AI ने बांद्रा येथील *Maison Éclat* सलूनसाठी अपॉइंटमेंट...` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 165 | `### तक्ष AI चा उपाय: 24/7 स्वयंचलित WhatsApp आणि वेब इंजिन` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 198 | `> — **नताशा डिसूझा**, व्यवस्थापकीय संचालक, *Maison Éclat (वांद्रे पश्चिम, मुंबई)*`` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/translations.ts` | 325 | `2. **WhatsApp और वेब पर सीधा जुड़ाव:** भारत में 80% बातचीत WhatsApp पर होती है। हम...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/what-is-ai-chatbot-business-automation.mdx` | 8 | `excerpt: "Demystifying modern LLM agents, WhatsApp automation, and autonomous work...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/what-is-ai-chatbot-business-automation.mdx` | 17 | `When we talk about **AI Chatbots and Business Automation** at SHREEJAN AI SOLUTION...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/why-mumbai-businesses-need-website-2026.mdx` | 28 | `A custom website acts as your tireless 24/7 rainmaker. It qualifies leads, answers...` | Overblown / Absolute Claim | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/blog/why-mumbai-businesses-need-website-2026.mdx` | 53 | `Your digital presence sets the ceiling on what you can charge. If your website loo...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ai-booking-salon.mdx` | 2 | `title: "Maison Éclat — Autonomous Salon Scheduling Engine"` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ai-booking-salon.mdx` | 2 | `title: "Maison Éclat — Autonomous Salon Scheduling Engine"` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ai-booking-salon.mdx` | 4 | `client: "Maison Éclat Luxury Salon"` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ai-booking-salon.mdx` | 25 | `Maison Éclat, a high-end salon on Linking Road in Bandra, was struggling to manage...` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ai-booking-salon.mdx` | 35 | `Within 90 days of launch, client no-shows dropped from 18.4% to 2.1%, while after-...` | Response-Time Promise | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/chatbot-ca-firm.mdx` | 2 | `title: "Mehta & Associates — Intelligent Tax & GST Automation Agent"` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/chatbot-ca-firm.mdx` | 4 | `client: "Mehta & Associates Chartered Accountants"` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/chatbot-ca-firm.mdx` | 7 | `summary: "Authoritative corporate portal paired with an autonomous document collec...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/chatbot-ca-firm.mdx` | 13 | `value: "-65%"` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/chatbot-ca-firm.mdx` | 25 | `Mehta & Associates, an established CA firm in Fort, Mumbai, was overwhelmed during...` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/docgen.mdx` | 2 | `title: "DocGen — Autonomous On-Brand Document & SOP Engine"` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/docgen.mdx` | 7 | `summary: "Autonomous documentation engine turning rough notes into compliance-grad...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/docgen.mdx` | 23 | `- "Guarantees 100% content lock: formatting and structure improved without alterin...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/docgen.mdx` | 41 | `- **Content-Lock Pipeline:** Employs a strict verifier layer that compares output ...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ecommerce-clothing.mdx` | 2 | `title: "Kavya Couture — High-Velocity D2C Headless Storefront"` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ecommerce-clothing.mdx` | 4 | `client: "Kavya Couture D2C"` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ecommerce-clothing.mdx` | 15 | `value: "+42%"` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ecommerce-clothing.mdx` | 17 | `value: "-35%"` | Fabricated Metric | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/ecommerce-clothing.mdx` | 25 | `Kavya Couture, an ethnic luxury pret brand headquartered in Mumbai, was experienci...` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/harshos.mdx` | 32 | `HarshOS consolidates a suite of cutting-edge local-first AI and decentralized syst...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/content/portfolio/harshos.mdx` | 35 | `- **AstraCode (Autonomous Coding Agent):** Sandboxed ReAct loop executing multi-st...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/demo.ts` | 81 | `{ id: 'dispatch', label: 'Dispatched in 24 hours', value: '₹68.2 Lakhs', note: '7 ...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/data/founders.json` | 37 | `"github": "https://github.com",` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/data/founders.json` | 37 | `"github": "https://github.com"` | Placeholder / Social Link | Replace with real URL or remove link |
| `src/data/founders.json` | 54 | `helping keep exchange-grade systems running at NSE; by night, he's shipping side p...` | Founder Claim / Credential | Rewrite to honest, verified copy |
| `src/data/team.ts` | 29 | `linkedin: 'https://linkedin.com',` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/data/team.ts` | 29 | `linkedin: 'https://linkedin.com', // Akshay` | Placeholder / Social Link | Replace with real URL or remove link |
| `src/data/team.ts` | 45 | `linkedin: 'https://linkedin.com',` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/data/team.ts` | 45 | `linkedin: 'https://linkedin.com', // Ankit` | Placeholder / Social Link | Replace with real URL or remove link |
| `src/data/team.ts` | 46 | `github: 'https://github.com',` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/data/team.ts` | 46 | `github: 'https://github.com', // Ankit` | Placeholder / Social Link | Replace with real URL or remove link |
| `src/data/team.ts` | 60 | `linkedin: 'https://linkedin.com',` | Placeholder / Broken Link | Replace with real URL or remove link |
| `src/data/team.ts` | 60 | `linkedin: 'https://linkedin.com', // Harsh` | Placeholder / Social Link | Replace with real URL or remove link |
| `src/data/testimonials.ts` | 1 | `export interface Testimonial {` | Testimonial / Review / Rating | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 9 | `export const TESTIMONIALS: Testimonial[] = [` | Testimonial / Review / Rating | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 9 | `export const TESTIMONIALS: Testimonial[] = [` | Testimonial / Review / Rating | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 9 | `export const TESTIMONIALS: Testimonial[] = [ Pooja Mehta, Rajesh Soni, Dr. Sameer ...` | Fabricated Testimonial / Client | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 11 | `name: "Pooja Mehta",` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 14 | `quote: "Shreejan AI built our booking platform and autonomous WhatsApp assistant i...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 18 | `name: "Rajesh Soni",` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 19 | `businessType: "Kanak Heritage Jewels",` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 21 | `quote: "Our luxury jewellery vault catalog loads in under 40 milliseconds on mobil...` | Banned Buzzword | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 25 | `name: "Dr. Sameer Vora",` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/data/testimonials.ts` | 26 | `businessType: "Vora Specialty Clinic",` | Fabricated Client / Case Study | **DELETE FILE** (Slated for Phase 2 removal) |
| `src/demos/demos.config.ts` | 52 | `sections: ['hero', 'pricing', 'timetable', 'whatsapp-bot', 'testimonials', 'trial'...` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/demos/demos.config.ts` | 72 | `sections: ['hero', 'menu', 'whatsapp-concierge', 'reviews', 'reservation', 'footer'],` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/demos.config.ts` | 112 | `sections: ['hero', 'treatments', 'bridal-ai', 'booking', 'testimonials', 'footer'],` | Testimonial / Review / Rating | Rewrite to honest, verified copy |
| `src/demos/demos.config.ts` | 117 | `name: 'Kanak Heritage Jewels',` | Fabricated Client / Case Study | Rewrite to honest, verified copy |
| `src/demos/demos.config.ts` | 132 | `sections: ['hero', 'collection', 'jewel-chat', 'reviews', 'enquiry', 'footer'],` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/demos.config.ts` | 148 | `title: 'Everyday essentials, delivered in 48 hours.',` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/demos/demos.config.ts` | 149 | `sub: 'Home, kitchen, and wellness products with COD, UPI autopay, and hassle-free ...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/demos/demos.config.ts` | 152 | `sections: ['hero', 'products', 'order-ai', 'checkout', 'reviews', 'footer'],` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/sections/DemoFaq.tsx` | 16 | `{ q: 'How are batch sizes determined?', a: 'Batches are strictly capped at 20 stud...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/demos/sections/DemoFaq.tsx` | 24 | `{ q: 'Are digital diagnostic reports provided?', a: 'Yes, all blood investigations...` | Response-Time Promise | Rewrite to honest, verified copy |
| `src/demos/sections/DemoFooter.tsx` | 10 | `{/* ONE Quiet Card for Reviews (Strict Rule: never invent reviews/ratings) */}` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/sections/DemoFooter.tsx` | 10 | `{/* ONE Quiet Card for Reviews (Strict Rule: never invent reviews/ratings) */}` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/sections/DemoFooter.tsx` | 22 | `Your customer reviews show here.` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/sections/DemoFooter.tsx` | 25 | `Sync live Google Business reviews, video testimonials, and verified customer ratin...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/sections/DemoFooter.tsx` | 25 | `Sync live Google Business reviews, video testimonials, and verified customer ratin...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/demos/sections/DemoPlans.tsx` | 113 | `World-Class Training Facility Standards` | Banned Buzzword | Remove buzzword; describe concrete features |
| `src/demos/sections/DemoProducts.tsx` | 59 | `Individually certified with lifetime exchange guarantee` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/demos/sections/DemoProducts.tsx` | 174 | `Order before 7 PM for guaranteed express 30-minute hyper-local delivery` | Banned Buzzword | Remove word 'guarantee'; re-frame as typical timeline |
| `src/i18n/REVIEW.md` | 1 | `# REVIEW.md — Strings Needing Native-Speaker Review` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/i18n/REVIEW.md` | 1 | `# REVIEW.md — Strings Needing Native-Speaker Review` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/i18n/locales/en.json` | 31 | `"description": "AI-powered websites and automation for businesses across India tha...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/i18n/locales/en.json` | 40 | `"description": "We engineer high-performance web systems, custom autonomous agents...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/i18n/locales/en.json` | 59 | `"step3_desc": "Review and test your website on a private link before anything goes...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/i18n/locales/en.json` | 72 | `"step3_desc": "We build an interactive preview for your review so you can verify t...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/i18n/locales/en.json` | 108 | `"stage2_title": "Autonomous AI Engagement",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/i18n/locales/en.json` | 139 | `"success": "Thank you! We will reply within one working day.",` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/i18n/locales/en.json` | 140 | `"audit_intent_notice": "Website audit request received. We will review your site a...` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/i18n/locales/en.json` | 142 | `"checklist_card_desc": "Review our 12-point guide before hiring any web agency.",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/i18n/locales/en.json` | 203 | `"diff5_desc": "No open-ended hourly billing or surprise invoices. Clear contracts,...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/i18n/locales/en.json` | 220 | `"subtitle": "A battle-tested 4-stage engineering lifecycle designed to eliminate s...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/i18n/locales/en.json` | 226 | `"s2_desc": "Within 48 hours, you receive a technical architecture roadmap, wirefra...` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/i18n/locales/en.json` | 227 | `"s3_title": "Build & Review",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/i18n/locales/en.json` | 269 | `"operating_hours_val": "Mon - Sat: 9:30 AM – 7:00 PM IST (AI automated chat active...` | Overblown / Absolute Claim | Remove fake review/rating from demo data |
| `src/i18n/locales/en.json` | 271 | `"sla_val": "All enterprise inquiries acknowledged within 4 business hours.",` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/i18n/locales/en.json` | 277 | `"hero_desc": "From high-velocity Next.js digital flagships to autonomous custom we...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/i18n/locales/en.json` | 300 | `"hero_desc": "We are a high-conviction team of systems architects and creative eng...` | Banned Buzzword | Rewrite to honest, verified copy |
| `src/i18n/locales/en.json` | 429 | `"subtitle": "Tell us what you need. We reply within one working day.",` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/i18n/locales/en.json` | 430 | `"trust_reply": "Reply within one working day",` | Response-Time Promise | Replace with: *'We will reply as soon as we can'* (no SLA promise) |
| `src/i18n/locales/en.json` | 503 | `"d2": "Autonomous AI Agent & Workflow Pipelines",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/i18n/locales/hi.json` | 269 | `"operating_hours_val": "सोम - शनि: सुबह 9:30 – शाम 7:00 IST (AI चैट 24/7 सक्रिय)",` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/i18n/locales/mr.json` | 269 | `"operating_hours_val": "सोम - शनि: सकाळी 9:30 – संध्याकाळी 7:00 IST (AI चॅट 24/7 स...` | Overblown / Absolute Claim | Remove '24/7'; describe automated features without constant availability claim |
| `src/lib/services-data.ts` | 24 | `proofPoint: "+340% average lead conversion vs legacy WordPress platforms",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/lib/services-data.ts` | 39 | `"Scalable full-stack cloud software, autonomous AI agent pipelines, booking engine...` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/lib/services-data.ts` | 44 | `"Autonomous AI Agent & Workflow Pipelines",` | Banned Buzzword | Replace with 'automated' or 'custom web app' |
| `src/lib/services-data.ts` | 64 | `label: "Forensic Optimization",` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/lib/services-data.ts` | 67 | `"A forensic engineering inspection of your live website's sub-second speed, mobile...` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/lib/services-data.ts` | 69 | `"A thorough forensic audit examining your site's sub-second speed, mobile UX, SEO ...` | Banned Buzzword | Replace with 'technical code & speed audit' or remove |
| `src/lib/services-data.ts` | 74 | `"Security header review & SSL/TLS verification",` | Testimonial / Review / Rating | Remove fake review/rating from demo data |
| `src/lib/services-data.ts` | 80 | `proofPoint: "Delivered in 48 hours · 100% of ₹499 fee credited back against build",` | Response-Time Promise | Replace '100% Code Ownership' with 'Full source code ownership upon final payment' |
| `src/lib/services-data.ts` | 108 | `proofPoint: "+260% user engagement · 65% reduction in checkout drop-offs",` | Fabricated Metric | Rewrite to honest, verified copy |
| `src/lib/services-data.ts` | 137 | `proofPoint: "+340% average lead conversion vs legacy WordPress platforms",` | Fabricated Metric | Rewrite to honest, verified copy |

---

## 5. Checkpoint 1 Recommendations for Owners & Orchestrator

1. **Execute File Deletions (Phase 2):** Immediately delete `data/testimonials.ts`, `src/content/portfolio/*`, `src/content/blog/*`, `public/harshos*`, `public/docgen*`, `src/components/AuditCard.tsx`, and `src/app/(site)/audit/*`. This will instantly resolve 240+ flagged items.
2. **Adopt Standard Form Promise:** Across the contact form, footer, and privacy policy, standardise the response promise to:
   > *"We'll reply as soon as we can."* (Never promise 'within 4 hours' or 'within 1 business day').
3. **Adopt Standard Ownership Copy:** Replace all instances of `"100% Sprint Guarantee"` and `"100% Code Ownership"` with:
   > *"Full source code ownership and repository access transferred upon project completion."*
4. **Demos Framing:** For the 3 kept demos (`salon`, `clinic`, `restaurant`), ensure `testimonials` arrays are emptied and a prominent header banner is placed: `"Sample site — not a real business"`.
5. **Founder Profiles:** Replace placeholder `https://linkedin.com` and `https://github.com` in `src/data/team.ts` and `src/data/founders.json` with verified links, and insert the owner-approved one-sentence bios.