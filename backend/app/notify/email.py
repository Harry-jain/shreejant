import logging
import smtplib
from email.mime.text import MIMEText
from typing import Any, Dict
import httpx

from app.config import settings
from app.notify.telegram import format_telegram_message
from app.notify.templates import get_auto_reply_content

logger = logging.getLogger("notify.email")
RESEND_ENDPOINT = "https://api.resend.com/emails"


def _send_via_gmail_smtp(to_email: str, subject: str, body: str) -> bool:
    """
    Sends email directly through Gmail SMTP using a Google App Password.
    Zero third-party library dependencies (uses Python's standard library smtplib).
    """
    user = settings.GMAIL_USER or settings.TEAM_INBOX
    app_pass = settings.GMAIL_APP_PASSWORD.replace(" ", "")

    if not user or not app_pass:
        return False

    try:
        msg = MIMEText(body, "plain", "utf-8")
        msg["Subject"] = subject
        msg["From"] = f"SHREEJAN AI SOLUTIONS <{user}>"
        msg["To"] = to_email

        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10.0) as server:
            server.starttls()
            server.login(user, app_pass)
            server.send_message(msg)
        return True
    except Exception as exc:
        logger.error("Gmail SMTP dispatch failed to %s: %s", to_email, exc)
        return False


async def send_team_email(lead: Dict[str, Any]) -> bool:
    """
    Sends notification email to TEAM_INBOX.
    Supports either direct Gmail SMTP or Resend HTTP API.
    Optional: controlled by TEAM_EMAIL_ENABLED (default True).
    """
    lead_id = lead.get("id", "unknown")

    if not settings.TEAM_EMAIL_ENABLED:
        logger.info("Team email notification is disabled via configuration for lead_id=%s", lead_id)
        return True

    to_inbox = settings.TEAM_INBOX or settings.GMAIL_USER
    business = lead.get("business", "Unknown")
    subject = f"New enquiry: {business}"
    body = format_telegram_message(lead)

    # 1. Prefer direct Gmail SMTP if Google App Password is provided
    if settings.GMAIL_APP_PASSWORD and to_inbox:
        if _send_via_gmail_smtp(to_inbox, subject, body):
            logger.info("Team email dispatched via Gmail SMTP for lead_id=%s", lead_id)
            return True

    # 2. Resend HTTP API fallback
    api_key = settings.RESEND_API_KEY
    from_email = settings.FROM_EMAIL

    if not api_key or not to_inbox or not from_email:
        logger.warning("Team email skipped: neither Gmail SMTP nor Resend credentials configured for lead_id=%s", lead_id)
        return False

    payload = {
        "from": from_email,
        "to": [to_inbox],
        "subject": subject,
        "text": body,
    }

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.post(
                RESEND_ENDPOINT,
                headers={"Authorization": f"Bearer {api_key}"},
                json=payload,
            )
            if resp.status_code in (200, 201):
                logger.info("Team email dispatched successfully via Resend for lead_id=%s", lead_id)
                return True
            else:
                logger.error(
                    "Team email failed via Resend for lead_id=%s with status %d: %s",
                    lead_id,
                    resp.status_code,
                    resp.text,
                )
                return False
    except Exception as exc:
        logger.error("Team email exception for lead_id=%s: %s", lead_id, exc)
        return False


async def send_auto_reply_email(lead: Dict[str, Any]) -> bool:
    """
    Sends automated plain-text confirmation email to the user.
    Supports either direct Gmail SMTP or Resend HTTP API.
    """
    lead_id = lead.get("id", "unknown")
    user_email = lead.get("email")

    if not user_email:
        logger.warning("Auto-reply skipped: user email not provided for lead_id=%s", lead_id)
        return False

    subject, text_body = get_auto_reply_content(lead)

    # 1. Prefer direct Gmail SMTP if Google App Password is provided
    if settings.GMAIL_APP_PASSWORD:
        if _send_via_gmail_smtp(user_email, subject, text_body):
            logger.info("Auto-reply dispatched via Gmail SMTP for lead_id=%s", lead_id)
            return True

    # 2. Resend HTTP API fallback
    api_key = settings.RESEND_API_KEY
    from_email = settings.FROM_EMAIL

    if not api_key or not from_email:
        logger.warning("Auto-reply skipped: neither Gmail SMTP nor Resend credentials configured for lead_id=%s", lead_id)
        return False

    payload = {
        "from": from_email,
        "to": [user_email],
        "subject": subject,
        "text": text_body,
    }

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.post(
                RESEND_ENDPOINT,
                headers={"Authorization": f"Bearer {api_key}"},
                json=payload,
            )
            if resp.status_code in (200, 201):
                logger.info("Auto-reply email dispatched successfully via Resend for lead_id=%s", lead_id)
                return True
            else:
                logger.error(
                    "Auto-reply email failed via Resend for lead_id=%s with status %d: %s",
                    lead_id,
                    resp.status_code,
                    resp.text,
                )
                return False
    except Exception as exc:
        logger.error("Auto-reply email exception for lead_id=%s: %s", lead_id, exc)
        return False
