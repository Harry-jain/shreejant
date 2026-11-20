# Security Review & Architecture Notes — Shreejan UI Reset

**Date:** November 20, 2026  
**Auditor:** Security Reviewer Agent (Phase 1)  
**Deliverable:** `docs/security-notes.md`  
**Scope:** `src/app/api/`, frontend form integrations, backend endpoints, and repository-wide credential audit.

---

## 1. Executive Summary

This security review establishes the baseline findings and the implementation blueprint for **Phase 1** of the Shreejan UI Reset Plan (`ANTIGRAVITY_PLAN.md`).

### Key Findings
1. **Unnecessary and Dangerous API Routes:** The current Next.js application hosts multiple admin and filesystem-mutating API routes (`/api/founders`, `/api/upload`) containing hardcoded fallback secrets (`shreejan_secure_admin_2026`). These will fail on serverless platforms (read-only filesystem) and represent serious security liabilities. Per the plan, **only `POST /api/contact` will remain** for the site in the reset.
2. **Dual-Pipeline & Mock Token Anti-Pattern:** The frontend contact form currently attempts to submit leads to an external FastAPI backend (`http://localhost:8000/v1/leads`), injecting a hardcoded bypass token (`"mock-turnstile-token"`). When the backend fails, it falls back to `/api/contact`. This dual-pipeline architecture is fragile, confuses lead storage, and bypasses bot protection.
3. **False Success Masking:** The existing `POST /api/contact` catches email delivery errors and returns a `200 OK` ("Your inquiry has been received") even when `RESEND_API_KEY` is missing or Resend dispatch throws an exception. This violates the core rule: **never report success when nothing was delivered**.
4. **Unrealistic Promises:** Both the API route and the contact form hardcode a guaranteed "response within 4 hours" commitment, violating the project rule against fabricated claims.

---

## 2. Inventory of API Routes & Endpoints

### 2.1 Next.js App Router (`src/app/api/`)

| Route | HTTP Methods | Current Function | Reset Action | Reason |
| :--- | :---: | :--- | :---: | :--- |
| `src/app/api/contact/route.ts` | `POST` | Ingests contact forms, runs in-memory rate limiting, dispatches email via Resend. | **KEEP & REWRITE** | **Sole runtime route required** for the brochure website. Must be completely rewritten per Section 8. |
| `src/app/api/founders/route.ts` | `GET`, `POST` | Reads and writes `src/data/founders.json`. POST uses fallback admin secret. | **DELETE** | Administrative mutation route; founders data will be static on the About page. Unnecessary attack surface. |
| `src/app/api/founders/[id]/route.ts` | `GET`, `PUT`, `DELETE` | Reads, updates, and deletes individual founder entries in `src/data/founders.json`. | **DELETE** | Dynamic CMS capabilities are removed in the brochure reset. Direct filesystem writes fail on serverless. |
| `src/app/api/upload/route.ts` | `POST` | Writes uploaded files to `public/uploads/founders/`. Uses fallback admin secret. | **DELETE** | Arbitrary file upload endpoint. High security risk (DoS, path traversal risk, unverified files), fails on read-only serverless hosts. |
| `src/app/api/og/route.tsx` | `GET` | Generates dynamic OpenGraph images using `@vercel/og` (Edge runtime). | **DELETE / REPLACE** | Only `POST /api/contact` should remain as an API route in the reset. Dynamic OG can be replaced with static `public/og.png` or standard Next.js `src/app/opengraph-image.tsx` without maintaining a custom API route with outdated hardcoded colors. |

### 2.2 Server Actions Audit
- Scanned entire `src/` directory for `"use server"` directives: **0 server actions found**. All existing server-side logic resides exclusively in Next.js App Router API route handlers.

### 2.3 Standalone Backend (`backend/`, FastAPI)
The repository contains an independent FastAPI service in `backend/` with the following endpoints:
- `POST /v1/leads`: Lead ingestion with Turnstile check, rate limiting, and Supabase storage.
- `DELETE /v1/leads/{lead_id}`: DPDP erasure endpoint with hardcoded secret fallback.
- `GET /v1/privacy-version`: Returns privacy consent version.
- `GET /healthz`: Healthcheck.

**Reset Determination (per Section 0 & 9):**
The UI reset focuses solely on the simple brochure website. The frontend will be **completely decoupled** from FastAPI. All frontend calls to `http://localhost:8000` or `NEXT_PUBLIC_API_URL` must be removed. The entire `backend/` service remains untouched or archived until Phase 9 ("Later") when the founders decide on a single backend strategy.

---

## 3. Contact Form Security & Architecture Overhaul (Section 8 Blueprint)

The contact form and its corresponding API route (`POST /api/contact`) must be rebuilt to satisfy the exact requirements of Section 8.

### 3.1 Single Pipeline & Decoupling
- **Current problem:** `ContactForm.tsx` imports Cloudflare Turnstile, loads external JavaScript (`challenges.cloudflare.com`), generates or defaults to `"mock-turnstile-token"`, tries `fetch("http://localhost:8000/v1/leads")`, and if that fails, falls back to `fetch("/api/contact")`.
- **Target architecture:** The frontend form submits **directly and exclusively** to `POST /api/contact`.
- **Action items:**
  1. Remove all Cloudflare Turnstile script loading, container refs, and state from `ContactForm.tsx`.
  2. Remove all references to `NEXT_PUBLIC_API_URL` and `http://localhost:8000`.
  3. Remove `"mock-turnstile-token"` completely from frontend and schemas.

### 3.2 Hidden Honeypot Field
- **Mechanism:** Add an invisible input field designed to catch automated spambots that populate all form inputs.
- **Client implementation:**
  - Field name: `website` or `company_url` (labeled convincingly for bots, but hidden from legitimate users).
  - Attributes: `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`, styled off-screen using Tailwind (`sr-only` or `absolute -left-[9999px]`).
- **Server validation (`POST /api/contact`):**
  - If `body.website` is present and contains any characters (e.g. `body.website.trim().length > 0`):
    - **Option A (Silent Drop):** Return HTTP 200 `{ success: true }` without dispatching the email (tricking the bot into thinking it succeeded while preventing inbox spam).
    - **Option B (Rejection):** Return HTTP 400.
    - *Recommendation:* Silent drop with a server log (`logger.warn("Honeypot triggered from IP: ...")`) so bots do not retool.

### 3.3 Strict Zod Validation Schema
The schema in `src/lib/validations.ts` must be tightened. Currently, `contact`, `email`, and `phone` are all optional, allowing empty submissions.

**Target Schema (`contactSchema`):**
```typescript
import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters)")
    .max(80, "Name cannot exceed 80 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(100, "Email cannot exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/, "Please enter a valid 10-digit Indian mobile / WhatsApp number")
    .optional()
    .or(z.literal("")),
  projectType: z
    .string()
    .trim()
    .max(100)
    .optional()
    .default("General Inquiry"),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message (at least 10 characters)")
    .max(2000, "Message cannot exceed 2000 characters"),
  website: z.string().optional(), // Honeypot
});
```

### 3.4 Rate Limiting & Serverless Caveats
- **Mechanism:** In-memory sliding window or bucket limit tracking IP addresses.
  - Limit: Max 5 submissions per hour per IP; max 15 per day per IP.
  - Extract IP safely from `x-forwarded-for` (first token) or `x-real-ip` with fallback to `127.0.0.1`.
- **Serverless Caveats (Important Note):**
  - In-memory maps (`Map<string, number[]>`) in Next.js route handlers reside in the ephemeral memory of an individual serverless function instance (e.g., Vercel Lambda).
  - Memory is **not shared** across parallel lambda instances and resets on cold starts.
  - An attacker spinning up requests against different lambda invocations can bypass in-memory limits.
  - *Conclusion:* In-memory rate limiting is **best-effort protection** adequate for preventing accidental double-submits and basic amateur scripts on a new 3-person agency site. For enterprise DDoS protection, a distributed key-value store (e.g. Upstash Redis) or edge firewall (Cloudflare WAF) is required in the future backend phase.
- **Memory Hygiene:** Add automatic pruning to the in-memory store to prevent unbounded memory growth from stale IP keys.

### 3.5 Resend Email Dispatch
- **Recipient:** Read `process.env.CONTACT_EMAIL_TO`.
- **Sender:** `onboarding@resend.dev` (in development/unverified domain) or verified domain sender (`inquiries@shreejanai.in`).
- **Subject Line:** Sanitize all line breaks (`\r`, `\n`) from `fullName` and `projectType` to prevent SMTP header injection.
- **Template Safety:**
  - Escape all user inputs (`escapeHtml(text)`) before embedding in HTML templates to prevent HTML injection / stored phishing in the founders' email clients.
  - Always provide a clean, structured plaintext alternative (`text` property in Resend payload).
  - Set `replyTo: clientEmail` so founders can click "Reply" directly in their mail client.

### 3.6 Error Handling: Never Lie About Delivery
- **Critical Violation in Current Code:**
  ```typescript
  // CURRENT CODE IN src/app/api/contact/route.ts (DO NOT REPEAT):
  try {
    await resend.emails.send(...);
  } catch (emailErr) {
    console.error("Resend delivery notice:", emailErr);
    // Non-blocking so client receives success <-- FAKE SUCCESS!
  }
  return NextResponse.json({ success: true, message: "..." });
  ```
- **New Required Rule:**
  - If `RESEND_API_KEY` is missing: Do NOT simulate success. Return `500 Internal Server Error` with `{ error: "Email service is temporarily unconfigured. Please connect directly via WhatsApp." }`.
  - If Resend API call returns an error or throws an exception: Return `502 Bad Gateway` or `500 Internal Server Error` with `{ error: "Failed to dispatch your message. Please reach out to us on WhatsApp." }`.
  - The frontend MUST check `res.ok`, catch errors, and display the error message in the UI with a direct link to WhatsApp.

### 3.7 Removal of Response Time Guarantees
- The current code displays:
  - `"A founding partner will review your requirements and respond within 4 hours."`
  - `"Guaranteed response within 4 hours. No sales spam."`
- **Correction:** Replace all instances in frontend and API with the honest phrase specified in Section 8:
  - `"Thank you. We'll reply as soon as we can."`

### 3.8 Environment Variables Contract
The contact route requires two environment variables:
1. `RESEND_API_KEY`: API key for Resend dispatch.
2. `CONTACT_EMAIL_TO`: Destination email address for agency inquiries (e.g. `team@shreejanai.in` or founder email).

**Startup / Invocation Check:**
```typescript
if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL_TO) {
  console.error("CRITICAL: RESEND_API_KEY or CONTACT_EMAIL_TO environment variable is missing.");
  return NextResponse.json(
    { error: "Contact service is currently unavailable. Please reach us directly via WhatsApp." },
    { status: 503 }
  );
}
```

---

## 4. Audit of Exposed Secrets, Hardcoded Keys & Unsafe Endpoints

A comprehensive repository scan was performed across source code, documentation, and configuration files (excluding `.env*` per hard rules).

### 4.1 Confirmed Hardcoded Fallback Secret: `shreejan_secure_admin_2026`
Found in multiple files across the repository:
1. `src/lib/auth.ts:3`:
   ```typescript
   const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_API_SECRET || "shreejan_secure_admin_2026";
   ```
2. `backend/app/main.py:164`:
   ```python
   admin_secret = getattr(settings, "ADMIN_SECRET", "shreejan_secure_admin_2026")
   ```
3. `README_SETUP.md:85`:
   ```markdown
   - **Admin Secret Key:** `shreejan_secure_admin_2026`
   ```

**Risk Assessment:**
This hardcoded fallback token was introduced as an administrative auth bypass. Anyone sending `Authorization: Bearer shreejan_secure_admin_2026` or `x-admin-key: shreejan_secure_admin_2026` can authenticate as an administrator.
- **Remediation in Phase 2:**
  - Delete `src/lib/auth.ts`, `src/app/admin/*`, and the admin API routes (`/api/founders`, `/api/upload`).
  - Delete `README_SETUP.md` (scheduled for removal/cleanup).
  - This completely purges `shreejan_secure_admin_2026` from the frontend codebase.

### 4.2 Mock Auth & Turnstile Bypass Tokens
1. `src/components/sections/contact/ContactForm.tsx:216`:
   ```typescript
   turnstile_token: turnstileToken || "mock-turnstile-token"
   ```
2. `src/components/sections/audit/AuditForm.tsx:107`:
   ```typescript
   turnstile_token: "mock-turnstile-token"
   ```
3. `backend/app/turnstile.py:23`:
   ```python
   if is_dev_or_test and token in ("mock-turnstile-token", "test-turnstile-token", "bypass-dev", "mock-token"):
   ```

**Risk Assessment:**
The frontend intentionally sent mock strings to bypass Cloudflare Turnstile verification.
- **Remediation in Phase 2 & 5:**
  - Delete `AuditForm.tsx` (the ₹499 audit page is marked for deletion).
  - Completely strip Turnstile and `"mock-turnstile-token"` from `ContactForm.tsx`.
  - The contact form will rely on honeypot + IP rate limiting.

### 4.3 Unsafe File Upload Route (`src/app/api/upload/route.ts`)
- **Risk Assessment:**
  - Allows writing files directly to `public/uploads/founders/`.
  - Relies on the hardcoded `shreejan_secure_admin_2026` token.
  - On serverless production hosts (e.g. Vercel), the local filesystem is ephemeral and read-only; attempts to upload will crash the route.
- **Remediation:** Marked for complete deletion in Phase 2.

### 4.4 Documentation Secret References
- `backend/app/leads.py:66` and `backend_setup.md:132` reference `sb_secret_` (Supabase secret key format).
- **Remediation:** Ensure documentation files do not contain real keys or active prefixes.

---

## 5. Implementation Roadmap for Upcoming Phases

### Phase 2: Cleanup Engineer Actions
1. **Delete Unsafe API Routes:**
   - Remove `src/app/api/founders/`
   - Remove `src/app/api/upload/`
   - Remove `src/app/api/og/` (or replace with static metadata)
   - Remove `src/app/admin/`
   - Remove `src/lib/auth.ts`
   - Remove `src/lib/founders.ts` and `src/data/founders.json`
2. **Purge Mock Tokens:**
   - Remove `src/components/sections/audit/`
3. **Verify Secrets Grep Target:**
   - Run acceptance check:
     ```bash
     grep -rnE "(sb_secret|app.?password|bot.?token|ghp_|shreejan_secure)" src
     ```
     Ensure output is 0.

### Phase 5: Contact Form Engineer Actions
1. **Rebuild `src/app/api/contact/route.ts`:**
   - Enforce mandatory `RESEND_API_KEY` and `CONTACT_EMAIL_TO`.
   - Validate body against updated strict `contactFormSchema`.
   - Check and drop on filled `website` honeypot.
   - Run sanitized in-memory IP rate limiting (5/hr, 15/day).
   - Send email via Resend with HTML-escaped content and plain text fallback.
   - Throw real error on dispatch failure; return clean error response to user.
   - Message text: "Thank you. We'll reply as soon as we can." (no 4-hour promise).
2. **Rebuild `src/components/sections/contact/ContactForm.tsx`:**
   - Single endpoint: `POST /api/contact`.
   - Invisible honeypot field (`website`).
   - Zod client-side validation mirroring server schema.
   - Clean loading, error, and success states using Phase 3 design tokens.
   - Fallback button directly opening WhatsApp (`wa.me/918976517353`).

---

## 6. Acceptance Check Mapping

| Acceptance Check | Target | Current Status | Notes for Reset |
| :--- | :---: | :---: | :--- |
| `grep -rnE "(sb_secret\|app.?password\|bot.?token\|ghp_\|shreejan_secure)" src` | 0 | **FAIL** (1 match in `src/lib/auth.ts:3`) | Will reach 0 once `src/lib/auth.ts` is deleted in Phase 2. |
| Single runtime API route | `POST /api/contact` only | **FAIL** (5 routes exist) | Delete `/api/founders`, `/api/upload`, `/api/og`. |
| Zero mock auth tokens in `src/` | 0 | **FAIL** (2 matches in `ContactForm.tsx`, `AuditForm.tsx`) | Purged in Phase 2 & 5. |
| Zero response-time promises | 0 | **FAIL** ("within 4 hours" in `route.ts`, `ContactForm.tsx`) | Fixed in Phase 5 rewrite. |
| Delivery failure visibility | Error surfaced to user | **FAIL** (Returns 200 OK on failure) | Fixed in Phase 5 rewrite. |

---
*Report completed by Security Reviewer Agent. Ready for Checkpoint 1 review.*
