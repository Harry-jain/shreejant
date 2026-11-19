# Backend — SHREEJAN AI SOLUTIONS Lead Engine

FastAPI-powered lead ingestion service for the business website contact form. Handles strict validation, Cloudflare Turnstile bot verification, in-memory rate limiting, persistence to Supabase (Postgres), and independent background notifications via Telegram and Resend (Team email & Auto-reply).

---

## 1. Directory Structure

```text
backend/
├── app/
│   ├── main.py            # FastAPI application, CORS, routes & background tasks
│   ├── config.py          # pydantic-settings environment configuration
│   ├── schemas.py         # Request and response models (strict validation)
│   ├── leads.py           # Supabase persistence and status flag updates
│   ├── db.py              # Supabase client singleton
│   ├── turnstile.py       # Cloudflare Turnstile token validation
│   ├── notify/
│   │   ├── telegram.py    # Telegram Bot API alert integration
│   │   ├── email.py       # Resend HTTP API for team notification and user auto-reply
│   │   └── templates.py   # Plain-text multilingual auto-reply templates (en, hi, mr)
│   ├── ratelimit.py       # In-memory per-IP limiter (3 accepted submissions per hour)
│   ├── retry.py           # CLI tool for retrying failed alerts (python -m app.retry)
│   └── privacy.py         # GET /v1/privacy-version endpoint
├── migrations/
│   └── 001_leads.sql      # Supabase PostgreSQL DDL with RLS and indexes
├── tests/
│   ├── test_schemas.py    # Strict phone, honeypot, and payload validation tests
│   ├── test_turnstile.py  # Mocked Cloudflare Turnstile success, failure & timeout tests
│   └── test_api.py        # API endpoint tests (201, 422, 429, honeypot bypass)
├── requirements.txt       # Pinned dependencies
├── .env.example           # Example environment template
├── Dockerfile             # Production container definition
├── REVIEW.md              # Devanagari translation review checklist
└── README.md              # Complete service documentation
```

---

## 2. Environment Variables

Create `.env` inside `/backend` copied from `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL (`https://xyz.supabase.co`) |
| `SUPABASE_SERVICE_KEY` | Supabase **service_role** secret key (bypasses RLS) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token from BotFather |
| `TELEGRAM_CHAT_ID` | Telegram team chat/group ID |
| `RESEND_API_KEY` | Resend API key (`re_...`) |
| `FROM_EMAIL` | Verified sender domain email (e.g. `hello@shreejanai.in`) |
| `TEAM_INBOX` | Internal team notification email (e.g. `team@shreejanai.in`) |
| `TEAM_EMAIL_ENABLED` | Set `true` to send internal team copy via Resend (`true`/`false`) |
| `BOOKING_URL` | Calendar booking URL (e.g. Cal.com/Calendly link; optional) |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins (default `http://localhost:3000`) |
| `PRIVACY_VERSION` | Current privacy and consent version string (`2026-11-v1`) |

---

## 3. Database & Security (Supabase PostgreSQL)

1. Open your Supabase project dashboard -> **SQL Editor**.
2. Run the SQL script located at `migrations/001_leads.sql`.
3. **Row-Level Security (RLS)**:
   - RLS is explicitly enabled on the `leads` table with no public policies declared.
   - Anonymous or authenticated browser users cannot read or write to this table.
   - Only the backend's `SUPABASE_SERVICE_KEY` (service_role) can insert and update rows.
4. **Pause-on-Inactivity Notice**:
   - Supabase free-tier databases pause after 7 days of inactivity. If paused, submissions will throw an error until the project is resumed via the Supabase dashboard.

---

## 4. Rate Limiting & Bot Protection

- **Honeypot**: The frontend renders a hidden field `website`. If bots populate it, the backend returns HTTP `201 Created` immediately with a fake UUID and persists nothing.
- **In-Memory Rate Limit**:
  - Limits each IP address to **3 accepted submissions per hour**.
  - Subsequent requests receive HTTP `429 Too Many Requests` with a `Retry-After` header.
  - *Note*: In-memory counters reset if the server restarts. When scaling across multiple container instances, upgrade to a Redis-backed token bucket (e.g. Upstash Redis).
- **Cloudflare Turnstile**:
  - Validates Turnstile tokens via Cloudflare's `https://challenges.cloudflare.com/turnstile/v0/siteverify` endpoint with a strict 5-second timeout.
  - If Cloudflare is unreachable or times out, the endpoint safely rejects the request with HTTP `503 Service Unavailable`, never allowing unverified bots through.

---

## 5. Local Setup & Execution

### Install Python Dependencies
```bash
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
```

### Start Development Server
```bash
uvicorn app.main:app --reload --port 8000
```
- API Base: `http://localhost:8000`
- Health check: `http://localhost:8000/healthz`
- Privacy version: `http://localhost:8000/v1/privacy-version`
- Lead ingestion: `POST http://localhost:8000/v1/leads`

### Run Test Suite
```bash
pytest
```

---

## 6. Manual Notification Retry (`app.retry`)

If a transient network failure prevents Telegram or Resend from sending an alert, the lead record remains stored in Supabase with `notified_team = false` and/or `auto_reply_sent = false`.

To manually retry failed dispatches:
```bash
python -m app.retry
```
This queries all pending leads and safely attempts to deliver the unsent notifications without duplicating already sent messages.

---

## 7. Production Deployment & DNS Setup

- **Frontend**: Deploy on Vercel. Add environment variables `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- **Backend**: Free/low-cost container platforms (e.g., Render, Railway, Fly.io).
  - *Cold-Start Note*: Free tier container instances spin down after inactivity. Cold starts may take 15–30 seconds. The frontend shows a polite "Sending..." indicator rather than timing out.
- **Email DNS Records**:
  - Before sending live emails via Resend from `shreejanai.in`, verify:
    - **SPF**: `v=spf1 include:resend.com ~all`
    - **DKIM**: Add CNAME records provided by Resend dashboard.
    - **DMARC**: `v=DMARC1; p=none; rua=mailto:dmarc@shreejanai.in`
