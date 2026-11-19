# How to Run SHREEJAN AI SOLUTIONS on Another PC

This package contains the complete, production-ready source code with all official brand assets, 3D graphics, typography, backend ingestion microservices, and environment variables (`.env.local` and `backend/.env`) pre-configured.

---

## Prerequisites
Ensure the following are installed on the new PC:
- **Node.js**: v18.18+ or v20+ ([Download Node.js](https://nodejs.org/))
- **pnpm**: Fast package manager (Install via terminal: `npm install -g pnpm`)
- **Python**: v3.10, v3.11, or v3.12 ([Download Python](https://www.python.org/))

---

## 1. Start the Frontend (Next.js)

Open a terminal inside the project root folder:

```bash
# 1. Install all dependencies
pnpm install

# 2. Start the development server
pnpm dev
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

*(To build for production: `pnpm build` followed by `pnpm start`)*

---

## 2. Start the Backend API (FastAPI & Cloudflare Turnstile)

In a **separate terminal window**:

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create Python virtual environment
python -m venv .venv

# 3. Activate the virtual environment
# On Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# On Windows (Command Prompt):
.\.venv\Scripts\activate.bat
# On macOS / Linux:
source .venv/bin/activate

# 4. Install backend dependencies
pip install -r requirements.txt

# 5. Launch FastAPI backend service
uvicorn app.main:app --port 8000 --reload
```

The backend health check is live at:
👉 **`http://127.0.0.1:8000/healthz`**

---

## Pre-Configured Environment Files
- **`/.env.local`**: Configured with production Cloudflare Turnstile site key, WhatsApp routing, and API base URL.
- **`/backend/.env`**: Configured with Supabase PostgreSQL connection, Telegram bot alerts, Gmail SMTP dispatch, and Turnstile secret key.
