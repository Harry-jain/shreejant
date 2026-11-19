import logging
from typing import Any, Dict
import httpx

from app.config import settings

logger = logging.getLogger("notify.telegram")


def format_telegram_message(lead: Dict[str, Any]) -> str:
    lead_id = lead.get("id", "")
    business = lead.get("business", "Unknown")
    name = lead.get("name", "")
    phone = lead.get("phone", "")
    email = lead.get("email", "")
    service = lead.get("service") or "N/A"
    plan = lead.get("plan") or "N/A"
    budget = lead.get("budget") or "N/A"
    city_state = lead.get("city_state") or "Not provided"
    source = lead.get("utm_source") or "direct"
    msg = lead.get("message") or ""
    message_snippet = msg[:300]

    return (
        f"New enquiry — {business}\n"
        f"Name: {name}\n"
        f"Phone: {phone}\n"
        f"Email: {email}\n"
        f"Service: {service} | Plan: {plan} | Budget: {budget}\n"
        f"City: {city_state}\n"
        f"Source: {source}\n"
        f"Message: {message_snippet}\n"
        f"Lead id: {lead_id}"
    )


async def send_telegram_alert(lead: Dict[str, Any]) -> bool:
    """
    Sends Telegram alert to the team group.
    Uses plain text without parse_mode to prevent escaping bugs.
    Timeout 5 seconds.
    """
    lead_id = lead.get("id", "unknown")
    token = settings.TELEGRAM_BOT_TOKEN
    chat_id = settings.TELEGRAM_CHAT_ID

    if not token or not chat_id:
        logger.warning("Telegram notification skipped: credentials not configured for lead_id=%s", lead_id)
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": format_telegram_message(lead),
        "disable_web_page_preview": True,
    }

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                logger.info("Telegram notification succeeded for lead_id=%s", lead_id)
                return True
            else:
                logger.error(
                    "Telegram notification failed for lead_id=%s with status %d: %s",
                    lead_id,
                    resp.status_code,
                    resp.text,
                )
                return False
    except Exception as exc:
        logger.error("Telegram notification exception for lead_id=%s: %s", lead_id, exc)
        return False
