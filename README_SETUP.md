# SHREEJAN AI SOLUTIONS — Production & Local Setup Guide

This package contains the complete production-grade source code for **SHREEJAN AI SOLUTIONS**, including the Next.js 15 frontend, the FastAPI backend, and pre-configured environment files.

---

## 🚀 Quick Start (Runs Immediately)

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (recommended)
- **pnpm**: v9+ (or npm / yarn)
- **Python**: v3.11+ or v3.12+ (for FastAPI backend)

---

### 2. Frontend Setup (Next.js 15)

1. Open a terminal in the root project folder:
   ```bash
   pnpm install
   ```
   *(If using npm: `npm install --legacy-peer-deps`)*

2. Start the development server:
   ```bash
   pnpm dev
   ```
3. Open **[http://localhost:3000](http://localhost:3000)** in your browser.

> **Environment Configuration:** Both `.env` and `.env.local` are already included in this folder with pre-configured development keys and endpoints.

---

### 3. Backend Setup (FastAPI Lead & Telegram Service)

1. Open a second terminal and navigate to `/backend`:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # macOS / Linux
   python3 -m venv .venv
   source .venv/bin/activate

   # Windows (PowerShell)
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend API server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The backend API will run live at **[http://localhost:8000](http://localhost:8000)**.

---

### 4. Production Build Verification

To verify that the build is 100% production-ready on any machine:

```bash
# Type check TypeScript
pnpm type-check

# ESLint audit
pnpm lint

# Production Next.js build
pnpm build
```

---

### 5. Administrative Access Key

The `/admin/founders` dashboard and API mutations are protected by an administrative master key:
- **Admin Secret Key:** `shreejan_secure_admin_2026`
- **Admin URL:** [http://localhost:3000/admin/founders](http://localhost:3000/admin/founders)

---

### 6. Security & Hardening Highlights
- **XSS & File Upload Security:** Restricts uploads strictly to verified raster formats (`.png`, `.jpg`, `.webp`) with a 2MB ceiling. Disallows unauthenticated SVG uploads.
- **Iframe Framing Protection:** Configured with `X-Frame-Options: SAMEORIGIN` and `frame-ancestors 'self'` to allow internal preview frames (`/demos/*`, `/harshos/*`, `/docgen/*`) while preventing clickjacking.
- **Multi-Tier Rate Limiting:** Enforces hourly, daily, and global circuit breakers on all submission endpoints.
- **DPDP Act Compliance:** Features permanent lead data erasure endpoints (`DELETE /v1/leads/{id}`).
