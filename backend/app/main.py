import logging
import uuid
from typing import Optional
from fastapi import BackgroundTasks, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.leads import store_lead, update_lead_auto_reply_sent, update_lead_notified_team, delete_lead_by_id
from app.notify.email import send_auto_reply_email, send_team_email
from app.notify.telegram import send_telegram_alert
from app.privacy import router as privacy_router
from app.ratelimit import check_rate_limit, record_submission
from app.schemas import LeadCreate, LeadResponse
from app.turnstile import verify_turnstile

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("app.main")

app = FastAPI(
    title="SHREEJAN AI SOLUTIONS Lead Ingestion Service",
    version="1.0.0",
    docs_url=None,  # No public API docs
    redoc_url=None,
    openapi_url=None,
)

# Parse allowed CORS origins from settings
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]
if not origins:
    origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response

app.include_router(privacy_router)


@app.get("/healthz")
def healthz() -> dict:
    """Standard health check endpoint for hosting providers."""
    return {"ok": True}


async def process_lead_notifications(lead_id: str, lead_dict: dict) -> None:
    """
    Independent background tasks triggered after HTTP 201 response.
    Each notification is wrapped in its own try/except so failures do not affect others.
    """
    # 1. Telegram alert
    try:
        tg_success = await send_telegram_alert(lead_dict)
        if tg_success:
            update_lead_notified_team(lead_id, True)
    except Exception as exc:
        logger.error("Background Telegram alert failed for lead_id=%s: %s", lead_id, exc)

    # 2. Team email
    try:
        await send_team_email(lead_dict)
    except Exception as exc:
        logger.error("Background team email failed for lead_id=%s: %s", lead_id, exc)

    # 3. User auto-reply email
    try:
        reply_success = await send_auto_reply_email(lead_dict)
        if reply_success:
            update_lead_auto_reply_sent(lead_id, True)
    except Exception as exc:
        logger.error("Background auto-reply failed for lead_id=%s: %s", lead_id, exc)


def get_client_ip(request: Request) -> str:
    """Extracts sanitized client IP from validated headers or client host."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        parts = [p.strip() for p in forwarded.split(",") if p.strip()]
        if parts:
            candidate = parts[0]
            import re
            if re.match(r"^(\d{1,3}\.){3}\d{1,3}$|^[a-fA-F0-9:]+$", candidate):
                return candidate
    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        import re
        if re.match(r"^(\d{1,3}\.){3}\d{1,3}$|^[a-fA-F0-9:]+$", real_ip.strip()):
            return real_ip.strip()
    return request.client.host if request.client else "127.0.0.1"
    return request.client.host if request.client else "127.0.0.1"


@app.post(
    "/v1/leads",
    status_code=status.HTTP_201_CREATED,
    response_model=LeadResponse,
)
async def submit_lead(
    payload: LeadCreate,
    request: Request,
    background_tasks: BackgroundTasks,
) -> LeadResponse:
    """
    Ingests, validates, and stores a new client lead before triggering
    background alerts and auto-reply.
    """
    client_ip = get_client_ip(request)

    # 1. Honeypot check: If non-empty, reject bot silently by returning 201 without storing
    if payload.website and payload.website.strip():
        fake_id = str(uuid.uuid4())
        logger.info("Honeypot caught submission from ip=%s. Silent 201 returned with fake_id=%s", client_ip, fake_id)
        return LeadResponse(id=fake_id, message_key="form.success")

    # 2. In-memory per-IP Rate Limiting (3 per hour)
    check_rate_limit(client_ip)

    # 3. Cloudflare Turnstile token validation
    await verify_turnstile(payload.turnstile_token or "", remote_ip=client_ip)

    # Record accepted submission against IP rate limit
    record_submission(client_ip)

    # 4. Store lead record in Supabase (status='new', notified_team=false, auto_reply_sent=false)
    lead_id = store_lead(payload)

    # 5. Enqueue background notification tasks
    lead_dict = payload.model_dump()
    lead_dict["id"] = lead_id
    background_tasks.add_task(process_lead_notifications, lead_id, lead_dict)

    logger.info("Successfully ingested lead_id=%s from ip=%s", lead_id, client_ip)

    # 6. Immediate 201 Created response
    return LeadResponse(id=lead_id, message_key="form.success")


@app.delete("/v1/leads/{lead_id}")
async def delete_lead(lead_id: str, request: Request):
    """
    DPDP Act Right to Erasure Endpoint: Permanently erases lead personal data upon request.
    Requires administrative bearer token.
    """
    auth_header = request.headers.get("x-admin-key") or request.headers.get("authorization")
    admin_secret = getattr(settings, "ADMIN_SECRET", "shreejan_secure_admin_2026")
    if not auth_header or admin_secret not in auth_header:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized: Admin key required")

    success = delete_lead_by_id(lead_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead record not found")

    return {"status": "success", "message": f"Lead {lead_id} permanently erased under DPDP Act"}
