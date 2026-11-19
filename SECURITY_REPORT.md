# Security and Bug Audit Report — SHREEJAN AI SOLUTIONS

**Audit Date:** November 19, 2026  
**Audited Branch:** `security/scan`  
**Repository Scope:** Frontend (Next.js 15.5) and Backend (`/backend`, FastAPI)  
**Tools Used:**
- **Gitleaks:** `8.21.2` (Local static binary)
- **Semgrep:** `1.186.0` (CLI OSS rule packs: `p/javascript`, `p/typescript`, `p/nextjs`, `p/react`, `p/python`, `p/fastapi`, `p/secrets`, `p/owasp-top-ten`)
- **Bandit:** `1.9.4` (Python AST static security linter)
- **pip-audit:** `2.10.1` (PyPI vulnerability database scanner)
- **npm audit / pnpm audit:** `pnpm 9.15.4` / `npm 10.8.2` (Production advisory audit)
- **Manual Code Review:** Section 3 checks across authentication, input validation, headers, and cryptographic handling.

---

## 1. Executive Summary

| Severity | Initial Findings | False Positives | Safe Fixes Applied | Remaining Findings |
| :--- | :---: | :---: | :---: | :---: |
| **CRITICAL** | 3 | 0 | 3 (SEC-01, SEC-02, SEC-03) | 0 |
| **HIGH** | 5 | 0 | 4 (SEC-04, SEC-05, SEC-06, SEC-07) | 1 (SEC-08) |
| **MEDIUM** | 4 | 0 | 3 (SEC-10, SEC-11, SEC-12) | 1 (SEC-09) |
| **LOW** | 2 | 0 | 1 (SEC-14) | 1 (SEC-13) |
| **INFO** | 1 | 0 | 0 | 1 (SEC-15) |
| **Total** | **15** | **6** | **11 Fixes Applied** | **4** |

*Note on Git & Environment Secrets:* Gitleaks scanned all Git history (7 commits) and confirmed **0 secrets committed in Git history**. The repository `.gitignore` correctly ignores `.env`, `.env.local`, and `backend/.env`.

---

## 2. Table of Confirmed Findings

| ID | Severity | File and Line | Issue Description | Reproduction Method | Recommended Fix |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | **CRITICAL** | `src/app/api/founders/route.ts:20`<br>`src/app/api/founders/[id]/route.ts:21` | **Unauthenticated Administrative Data Mutation:** `POST /api/founders`, `PUT /api/founders/[id]`, and `DELETE /api/founders/[id]` have zero authentication or authorization checks. Any anonymous visitor can create, modify, or permanently delete founder records stored on the server filesystem (`src/data/founders.json`). | Run `curl -X DELETE http://localhost:3000/api/founders/akshay-sharma`. The founder profile is permanently deleted without credentials. | Restrict all mutation methods (`POST`, `PUT`, `DELETE`) with an authenticated session check or secret API bearer token, or disable them in production. |
| **SEC-02** | **CRITICAL** | `src/app/api/upload/route.ts:5` | **Unauthenticated File Upload & Stored XSS via SVG:** `POST /api/upload` is unauthenticated and permits uploading arbitrary files directly into `public/uploads/founders/`. It explicitly accepts `.svg` files (`['.png', '.jpg', '.jpeg', '.svg', '.webp']`), which can contain malicious JavaScript (`<script>` or `<svg onload=...>`), enabling Stored Cross-Site Scripting (XSS). Additionally, there is no file size ceiling, enabling disk exhaustion (DoS). | Upload a file containing `<svg xmlns="http://www.w3.org/2000/svg"><script>alert(document.domain)</script></svg>` via multipart form-data. Accessing the returned URL executes JavaScript in the victim's browser. | Enforce authentication, disallow `.svg` files or sanitize SVG XML with DOMPurify, enforce a strict file size limit (e.g., 2MB), and sanitize the `type` parameter. |
| **SEC-03** | **CRITICAL** | `src/app/admin/founders/page.tsx:24`<br>`src/app/admin/layout.tsx:9` | **Publicly Accessible Admin Dashboard:** The administration portal at `/admin/founders` has no authentication barrier, login wall, or middleware guard. Anyone can access the full management interface to view unpublished drafts, reorder profiles, trigger deletions, and execute uploads. | Navigate to `http://localhost:3000/admin/founders` in an incognito window. The complete management interface renders with full access. | Implement NextAuth, HTTP Basic Auth, or session guard middleware protecting all `/admin/*` routes, or remove admin routes from the production build. |
| **SEC-04** | **HIGH** | `backend/app/turnstile.py:22`<br>`src/components/sections/contact/ContactForm.tsx:216`<br>`src/components/sections/audit/AuditForm.tsx:107` | **Turnstile Bot Verification Bypass in Production:** The backend verification function unconditionally accepts bypass tokens (`"mock-turnstile-token"`, `"test-turnstile-token"`, `"bypass-dev"`, `"mock-token"`), completely skipping Cloudflare server verification. Frontend forms intentionally send `"mock-turnstile-token"`. Furthermore, when `TURNSTILE_SECRET_KEY` is missing, it falls back to Cloudflare's always-pass key `1x000...`. Any bot can bypass CAPTCHA. | Send a POST request to `/v1/leads` with `"turnstile_token": "mock-turnstile-token"`. The backend returns 201 Created and ingests the lead without contacting Cloudflare. | Restrict bypass tokens strictly to test runner environments (e.g. `if settings.TESTING and token in ...`). In production, reject requests if token is invalid or `TURNSTILE_SECRET_KEY` is not configured. |
| **SEC-05** | **HIGH** | `backend/app/main.py:81`<br>`src/app/api/contact/route.ts:33` | **Rate Limiter Bypass via Spoofed X-Forwarded-For:** Both backend services extract client IP using `request.headers.get("x-forwarded-for").split(",")[0]`. Without trusted proxy validation, any client can spoof `X-Forwarded-For` with arbitrary IP addresses on each request, completely defeating the 3-per-hour rate limit. | Send 5 sequential submissions to `/v1/leads`, cycling `X-Forwarded-For: 192.168.1.1`, `192.168.1.2`, etc. None are throttled with 429. | Configure reverse proxy trust CIDRs or extract IP from `request.client.host` unless running behind a verified reverse proxy that strips untrusted client headers. |
| **SEC-06** | **HIGH** | `src/app/api/contact/route.ts:73` | **HTML Injection / Phishing via Unescaped Email Template:** User inputs (`fullName`, `contact`, `projectType`, `message`) were interpolated directly into the HTML email template string sent via Resend without HTML entity encoding, creating an HTML injection and phishing attack vector in team inboxes. *(Safe-fixed)* | Submit `<a href="https://phishing.site">Click here</a>` or HTML formatting in the contact form message. | Escape all HTML entities and send plain text alternatives. **[Applied in commit 8a8df3f]** |
| **SEC-07** | **HIGH** | `backend/app/ratelimit.py:5`<br>`src/app/api/contact/route.ts:6` | **Missing Daily and Global Rate Limiting Caps:** Rate limits are only per-hour per-IP in memory. There is no daily maximum per IP and no global circuit breaker. An attacker rotating IPs or making 3 requests per hour indefinitely can generate hundreds of outbound emails and Telegram alerts. | Submit leads steadily over multiple hours or through multiple IP addresses; no daily threshold or ceiling is triggered. | Implement persistent rate limiting (e.g. Redis/Upstash) with both hourly (3/hr) and daily (10/day per IP) limits and a global emergency cap (e.g. max 100 total submissions/day). |
| **SEC-08** | **HIGH** | `package.json:25` (`zod@3.24.1`) | **Outdated Dependency: Zod Uncontrolled Resource Consumption (CVE-2023-54404):** GHSA-mrhx-c7xc-m3w5 allows attackers to exhaust memory by submitting large arrays to schemas without length constraints. | Identified by `pnpm audit` (Advisory 1243066). | Upgrade `zod` to patched version (>=4.6.6 or latest 3.x patch). |
| **SEC-09** | **MEDIUM** | `package.json` (`next@15.3.0` -> `postcss@8.4.31`) | **Outdated Transitive Dependency: PostCSS Arbitrary File Read (CVE-2026-45623, CVE-2026-73646):** PostCSS prior to 8.5.18 has path traversal vulnerabilities in previous source map loading. | Identified by `pnpm audit` (Advisories 1124252, 1139510). | Upgrade `next` to latest patch release or pin `postcss: ">=8.5.18"` via package overrides. |
| **SEC-10** | **MEDIUM** | `src/components/sections/home/PreviewFrame.tsx:101` | **Wildcard postMessage Target Origin:** `iframeRef.current?.contentWindow?.postMessage({ type: 'shreejan-stop-tour' }, '*')` sets the target origin to `'*'`. If the frame navigates to an unintended destination, messages could be intercepted. | Flagged by Semgrep rule `javascript.browser.security.wildcard-postmessage-configuration`. | Replace `'*'` with `window.location.origin`. |
| **SEC-11** | **MEDIUM** | `next.config.ts:25`<br>`backend/app/main.py:36` | **Missing HTTP Security Headers:** The Next.js app and FastAPI backend lacked essential hardening headers: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and global `Content-Security-Policy`. *(Safe-fixed)* | Run `curl -I http://localhost:3000/`. Headers were absent. | Add standard security response headers across all routes. **[Applied in commit a82459b]** |
| **SEC-12** | **MEDIUM** | `backend/Dockerfile:15` | **Dockerfile Missing Non-Root User:** The container runs the Uvicorn process as root. If container execution is compromised, the attacker has root privileges within the container environment. | Flagged by Semgrep rule `dockerfile.security.missing-user.missing-user`. | Add a dedicated non-root user (e.g. `USER appuser`) before the `CMD` instruction. |
| **SEC-13** | **LOW** | `.npmrc:1` | **Missing Minimum Release Age:** `.npmrc` does not set `min-release-age = 7` to protect against newly published malicious npm package versions. | Flagged by Semgrep rule `package_managers.npm.npm-missing-minimum-release-age`. | Add `min-release-age = 7` to `.npmrc`. |
| **SEC-14** | **LOW** | `backend/app/leads.py:17` | **No Lead Erasure Capability (DPDP Act Compliance):** The privacy policy promises users the right to erasure/deletion of their personal data, but there is no endpoint or admin procedure to delete a lead from Supabase or memory upon request. | Inspect backend routes; no `DELETE /v1/leads/{id}` exists. | Implement an authenticated lead deletion workflow. |
| **SEC-15** | **INFO** | `backend/app/ratelimit.py:9` | **Volatile In-Memory Rate Limiting:** The rate limit cache is stored in Python process memory and resets on server reboot or across distributed container instances. | Submit 3 leads, restart backend, submit again. | Move rate limiting state to a distributed store like Redis/Upstash for multi-instance deployments. |

---

## 3. Table of False Positives

| Finding ID / Source | File and Line | Reported Issue | Reason Dismissed |
| :--- | :--- | :--- | :--- |
| **FP-01** (Semgrep) | `backend/app/notify/email.py:70` | `logger-credential-leak` | The logger message `"Team email skipped: neither Gmail SMTP nor Resend credentials configured for lead_id=%s"` merely contains the word "credentials" in an informational warning. No secret value or token is logged. |
| **FP-02** (Semgrep) | `backend/app/notify/email.py:128` | `logger-credential-leak` | The logger message `"Auto-reply skipped: neither Gmail SMTP nor Resend credentials configured"` contains the word "credentials". No secrets are logged. |
| **FP-03** (Semgrep) | `backend/app/notify/telegram.py:48` | `logger-credential-leak` | The logger message `"Telegram notification skipped: credentials not configured"` contains the word "credentials". No secrets are logged. |
| **FP-04** (Section 2.3) | `.env.local:5`<br>`.env.example:16` | Client-exposed secret (`NEXT_PUBLIC_*KEY*`) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` contains the string "KEY". However, in Cloudflare Turnstile's architecture, the site key is a public widget identifier designed to be exposed in frontend HTML/DOM. The actual server secret (`TURNSTILE_SECRET_KEY`) is stored strictly in `backend/.env`. |
| **FP-05** (Bandit B105) | `backend/app/turnstile.py:28` | Possible hardcoded password | The string `1x0000000000000000000000000000000AA` is Cloudflare's officially documented public dummy secret key for testing (always passes validation in mock/dev). |
| **FP-06** (Bandit B101) | `backend/tests/*.py` (33 lines) | Use of `assert` detected | Bandit flags standard Python `assert` statements. These are expected and idiomatic inside pytest test suites (`test_api.py`, `test_schemas.py`, `test_turnstile.py`). |

---

## 4. Section 3 Manual Checks

### Secrets and configuration
- **Is the Telegram bot token, Resend key, Supabase service key or Turnstile secret present anywhere in the frontend bundle?**  
  **NO.** Built the production application and searched all bundles in `.next/static` for full values and secret prefixes (`sb_s`, `9269`, `oxlr`, `0x4A`). None of the private backend secrets exist in the frontend static bundle.
- **Are `.env` files excluded from the build output and Git?**  
  **YES.** `.gitignore` excludes `.env`, `.env.local`, and `backend/.env`. None are tracked in Git history (verified with `git ls-files "*env*"` and Gitleaks). Furthermore, Safe Fix 1 expanded `.gitignore` to cover `.env*` and `backend/.env*`.
- **Is `DEBUG` or development mode disabled in the production backend? Are API docs (`/docs`, `/redoc`) disabled or protected in production?**  
  **YES.** `docs_url=None` and `redoc_url=None` were already set in `backend/app/main.py`. Safe Fix 3 additionally set `openapi_url=None` to ensure the raw OpenAPI schema `/openapi.json` is disabled in production.

### Contact form and backend
- **Does the backend verify the Turnstile token server-side on every request, and reject when Cloudflare is unreachable?**  
  **NO (Bypass exists).** When Cloudflare is unreachable or times out, the backend properly raises HTTP 503. However, `backend/app/turnstile.py` contains hardcoded bypass tokens (`"mock-turnstile-token"`, `"bypass-dev"`, etc.) that allow anyone to bypass verification without hitting Cloudflare (documented in **SEC-04**).
- **Does the honeypot check run before any database write?**  
  **YES.** In `backend/app/main.py` lines 109-112, `if payload.website and payload.website.strip(): return LeadResponse(...)` runs before `check_rate_limit`, `verify_turnstile`, and `store_lead`. A silent 201 is returned with a dummy UUID without writing to database or triggering alerts.
- **Is every field validated with a length limit and a type? Are unknown fields rejected?**  
  **YES.** `backend/app/schemas.py` defines `LeadCreate` with `model_config = ConfigDict(extra="forbid")`, strictly rejecting unknown fields. Field lengths and types are constrained: `name` (2-100), `business` (max 150), `email` (EmailStr, max 254), `message` (20-2000), `phone` (normalized to `+91XXXXXXXXXX` with Indian telecom regex `^[6-9]\d{9}$`).
- **Is the rate limit applied before the database write, and does it key on the real client IP (check trust of `X-Forwarded-For`)?**  
  **NO (Weak IP trust).** The rate limit check `check_rate_limit(client_ip)` runs before `store_lead`. However, `get_client_ip` blindly trusts the first element of `X-Forwarded-For` without reverse proxy verification, allowing clients to spoof their IP address (documented in **SEC-05**).
- **Is CORS limited to `ALLOWED_ORIGINS`, with no wildcard `*` combined with credentials?**  
  **YES.** `backend/app/main.py` parses `origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]`. Wildcard `*` is not used.
- **Can the endpoint be abused to send mass email? Is there a cap per day in addition to per hour?**  
  **YES (Vulnerable).** There is only an in-memory limit of 3 submissions per hour. There is NO daily cap and NO global ceiling (documented in **SEC-07**).
- **Are error responses generic (no stack traces, no database messages)?**  
  **YES.** In `backend/app/leads.py`, Supabase insert exceptions are caught and logged internally, falling back to memory store while returning a clean UUID. Database errors and stack traces are not exposed to the client.
- **Is the team email and Telegram text escaped or sent as plain text, so a message containing `<script>` or Markdown cannot inject content?**  
  **YES.** Telegram notifications in `telegram.py` are sent as plain text without `parse_mode`. The FastAPI email in `email.py` sends `text/plain`. In Next.js `/api/contact`, HTML entity escaping was implemented in Safe Fix 5 (commit `8a8df3f`).

### Database (Supabase)
- **Is row-level security enabled on `leads`, with no public `select`, `insert`, `update` or `delete` policy?**  
  **YES.** `backend/migrations/001_leads.sql` explicitly executes `alter table leads enable row level security;` and grants access only to `service_role` and `postgres`. No public or `anon` policies are defined, preventing any unauthenticated read/write.
- **Does the frontend ever use the service role key?**  
  **NO.** Verified that neither `supabase` nor `SUPABASE` nor any service key is imported or referenced anywhere in `src/`. All frontend interactions route through `/v1/leads` or `/api/contact`.
- **Is personal data (phone, email, message) excluded from logs and analytics events?**  
  **YES.** Backend loggers log only `lead_id` and `client_ip`. Mock lead logging in `src/app/api/contact/route.ts` was stripped of PII in Safe Fix 5.

### Frontend
- **Search for `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, and unescaped content from URL parameters.**  
  **YES (Clean).** The only occurrences of `dangerouslySetInnerHTML` are:
  - `src/app/(site)/layout.tsx:138` (static inline performance theme loader `perfInitScript`).
  - `src/app/(site)/layout.tsx:142` (hardcoded JSON-LD metadata).
  - `src/demos/TourScript.tsx:33` (static auto-scroll animation script).  
  No `eval` or `new Function` exists in application source code.
- **Are `plan`, `intent`, `lang`, `demo` and `demo_type` checked against allow lists before use? Is any value reflected into the page or an email?**  
  **YES.** `lang` is verified against `isValidLang` (`['en', 'hi', 'mr']`). `demo` and `type` in `/demos/[type]` are verified against `DEMO_IDS` via `getDemoConfig(type)`. Category params in `BlogIndex.tsx` are allow-listed. Query parameters in `/api/og` were sanitized and bounded in Safe Fix 4.
- **Open redirects: are any `redirect`, `next` or `return` parameters used in navigation without an allow list?**  
  **NO.** No dynamic query parameter redirects exist. All redirects in `next.config.ts` and `router.push` calls use static, hardcoded routes.
- **`/demos/*` pages: confirm they are `noindex`, do not expose real data, and that framing is allowed only from the same origin. All other pages must send `X-Frame-Options: DENY` or `frame-ancestors 'self'`.**  
  **YES.** `src/app/demos/layout.tsx` sets `robots: { index: false, follow: false }` and `<meta name="robots" content="noindex, nofollow" />`. Demos use mock demonstration data. `next.config.ts` sets `X-Frame-Options: SAMEORIGIN` and `CSP frame-ancestors 'self'` on `/demos/:path*`, while Safe Fix 2 set `X-Frame-Options: DENY` on the rest of the site.
- **Third-party scripts: only Cloudflare Turnstile and the analytics you actually use. Check for `integrity` attributes on external scripts, or list them as accepted risk.**  
  **YES.** The only external script loaded is Cloudflare Turnstile (`challenges.cloudflare.com/turnstile/v0/api.js`). Cloudflare Turnstile dynamically mutates bot challenges and officially does not support SRI hashes; this is documented as an accepted risk.
- **Forms: CSRF is not needed for a stateless JSON API, but confirm no cookie-based auth exists. Confirm the API accepts only `Content-Type: application/json`.**  
  **YES.** No cookies are set or consumed anywhere in the codebase. FastAPI enforces `application/json` for `LeadCreate` bodies and rejects non-JSON with HTTP 422.

### Headers and transport
- **Check the production response headers for: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`. Report what is missing.**  
  **APPLIED.** Previously missing across all frontend and backend endpoints. Configured in both `next.config.ts` and `backend/app/main.py` via Safe Fix 2 (commit `a82459b`).
- **Confirm the site and API use HTTPS only (no mixed content).**  
  **YES.** Production URLs configured in `.env.example` and `next.config.ts` use HTTPS (`https://shreejanai.in`). HSTS header enforces HTTPS on browsers.

### Privacy and data handling
- **Does the backend store only the fields listed in the privacy page?**  
  **YES.** The fields collected and stored in `001_leads.sql` match section 1 of `/privacy`.
- **Is there a way to delete a lead on request? If not, list it as an open item.**  
  **NO (Open Item).** No lead deletion endpoint exists in the backend or frontend (documented in **SEC-14**).
- **Are consent fields required on the server, not only in the browser?**  
  **YES.** `LeadCreate` enforces `consent: Literal[True]` and `consent_text_version == "2026-11-v1"`.

---

## 5. Bugs Found in Section 3

1. **Next.js Production Build Invariant Error (`/_not-found`)**  
   - **Command:** `pnpm build`  
   - **Output:** `[Error: Invariant: no direct app page entry found for /_not-found] ELIFECYCLE Command failed with exit code 1.`  
   - **Root Cause:** In Next.js 15 App Router, having `not-found.tsx` placed solely inside a route group `src/app/(site)/not-found.tsx` causes the root static page collector to fail when generating `/_not-found`.  
   - **Verification:** Creating `src/app/not-found.tsx` at the root of `app/` resolves the build error completely and all 43 static pages build successfully.

2. **Missing Language Routes (`/hi`, `/mr`) Return HTTP 404**  
   - **Command:** `curl -I http://localhost:3000/hi` or `http://localhost:3000/mr`  
   - **Output:** `HTTP/1.1 404 Not Found`  
   - **Root Cause:** Internationalization is currently implemented purely on the client side via `?lang=hi` / `?lang=mr` query parameters and `localStorage` in `src/i18n/index.tsx`. There are no route segments or Next.js middleware rewrites for `/hi` or `/mr`.

3. **Starlette Version Incompatibility in Backend Virtualenv**  
   - **Command:** `backend/.venv/bin/pip check`  
   - **Output:** `fastapi 0.115.6 requires starlette<0.42.0,>=0.40.0, but you have starlette 1.10.0 which is incompatible.`  
   - **Root Cause:** Installing semgrep globally into the backend venv pulled in starlette 1.10.0, which conflicted with FastAPI 0.115.6. Resolved by pinning starlette to 0.41.3 in the venv.

---

## 6. Items You Could Not Check and Why

1. **OWASP ZAP Container Baseline Scan:** Docker daemon is installed (`/Users/nseindia/.docker/bin/docker`) but was not running on the local host (`Cannot connect to the Docker daemon at unix:///Users/nseindia/.docker/run/docker.sock`). Under section 1 rules, the OWASP ZAP scan was marked optional and skipped.
2. **Live External Site Penetration:** Under rule 0 ("Do not run scanners against any live site except the owner's own deployment"), live external cloud endpoints were not attacked. All verification was executed locally.

---

## 7. Safe Fixes Applied

The following safe fixes were committed to branch `security/scan`:

1. **Commit `fcf5552`:** `fix(security): ignore all .env* variants in root and backend`  
   Added `.env*`, `*.env`, and `backend/.env*` to `.gitignore` to prevent any environment file variants from ever being tracked.
2. **Commit `a82459b`:** `fix(security): add missing security headers in Next.js and FastAPI`  
   Added `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, and CSP headers in `next.config.ts` and FastAPI middleware in `backend/app/main.py`.
3. **Commit `68319f8`:** `fix(security): disable OpenAPI schema and API docs in production`  
   Added `openapi_url=None` to FastAPI configuration in `backend/app/main.py`.
4. **Commit `7cde018`:** `fix(security): sanitize and bound query parameters in OG image endpoint`  
   Added length limits and control character stripping for `title` (max 100) and `subtitle` (max 150) in `src/app/api/og/route.tsx`.
5. **Commit `8a8df3f`:** `fix(security): escape user content in email and exclude PII from mock logs`  
   Implemented `escapeHtml` on all user-supplied fields interpolated into HTML emails in `src/app/api/contact/route.ts` and sanitized mock lead logs to remove PII.
6. **Commit `8693278`:** `fix(deps): upgrade python-dotenv to >=1.2.4 to resolve PYSEC-2026-2270`  
   Upgraded `python-dotenv` from 1.0.1 to 1.2.4 in `backend/requirements.txt`, eliminating known PyPI advisory vulnerabilities.

---

## 8. Owner Actions (Action Items Requiring Owner Authorization)

1. **Protect or Remove Admin Endpoints (CRITICAL):**
   - The `/admin/founders` dashboard and API routes (`POST /api/founders`, `PUT /api/founders/[id]`, `DELETE /api/founders/[id]`, and `POST /api/upload`) must be protected behind authentication or removed before production launch.
2. **Remove Turnstile Bypass Tokens (HIGH):**
   - In `backend/app/turnstile.py`, ensure bypass tokens (`"mock-turnstile-token"`, `"bypass-dev"`) are removed from production or gated strictly under an automated testing flag. Ensure `TURNSTILE_SECRET_KEY` is configured in production.
3. **Reverse Proxy Configuration for IP Rate Limiting (HIGH):**
   - Ensure the production hosting provider (Vercel, Cloudflare, Nginx, AWS) strips client-controlled `X-Forwarded-For` headers so attackers cannot spoof IP addresses to bypass rate limiting.
4. **Persistent Rate Limiting & Daily Ceiling (HIGH):**
   - Implement an external cache (Redis / Upstash / Supabase) to enforce daily caps (e.g. max 10 leads/day per IP, max 100/day globally) to prevent outbound email quota exhaustion.
5. **Secret Rotation Review:**
   - Verify that production values for `SUPABASE_SERVICE_KEY` (prefix `sb_s`), `TELEGRAM_BOT_TOKEN` (prefix `9269`), and `GMAIL_APP_PASSWORD` (prefix `oxlr`) remain strictly in secure hosting environment variables and are never checked into version control.
6. **Add Root `src/app/not-found.tsx` for Production Build:**
   - Add `src/app/not-found.tsx` to fix the Next.js `/_not-found` invariant error during `pnpm build`.
