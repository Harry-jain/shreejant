import logging
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import httpx

from app.config import settings
from app.db import TABLE_LEADS, get_supabase_client
from app.schemas import LeadCreate

logger = logging.getLogger("leads")

# Local in-memory fallback for local development / testing without connected Supabase
_in_memory_leads: Dict[str, Dict[str, Any]] = {}


def store_lead(lead_in: LeadCreate) -> str:
    """
    Stores lead record in Supabase database before notifying team.
    Returns the created lead UUID.
    """
    lead_id = str(uuid.uuid4())
    now_iso = datetime.now(timezone.utc).isoformat()

    row_data: Dict[str, Any] = {
        "id": lead_id,
        "name": lead_in.name,
        "business": lead_in.business,
        "email": str(lead_in.email),
        "phone": lead_in.phone,
        "city_state": lead_in.city_state,
        "service": lead_in.service,
        "plan": lead_in.plan,
        "budget": lead_in.budget,
        "asset_pack": lead_in.asset_pack,
        "message": lead_in.message,
        "preferred_language": lead_in.preferred_language,
        "site_language": lead_in.site_language,
        "consent": lead_in.consent,
        "consent_text_version": lead_in.consent_text_version,
        "consent_at": now_iso,
        "utm_source": lead_in.utm_source,
        "utm_medium": lead_in.utm_medium,
        "utm_campaign": lead_in.utm_campaign,
        "utm_content": lead_in.utm_content,
        "utm_term": lead_in.utm_term,
        "referrer": lead_in.referrer,
        "landing_path": lead_in.landing_path,
        "status": "new",
        "notified_team": False,
        "auto_reply_sent": False,
    }

    # 1. Try Supabase Python SDK
    client = get_supabase_client()
    if client:
        try:
            res = client.table(TABLE_LEADS).insert(row_data).execute()
            if res.data and len(res.data) > 0 and "id" in res.data[0]:
                lead_id = str(res.data[0]["id"])
            logger.info("Stored lead in Supabase with id=%s", lead_id)
            return lead_id
        except Exception as exc:
            logger.error("Failed to insert lead into Supabase SDK: %s. Falling back to memory.", exc)

    # 2. Try direct Supabase PostgREST HTTP endpoint (works with sb_secret_ keys)
    elif settings.SUPABASE_URL and settings.SUPABASE_SERVICE_KEY:
        try:
            headers = {
                "apikey": settings.SUPABASE_SERVICE_KEY,
                "Authorization": f"Bearer {settings.SUPABASE_SERVICE_KEY}",
                "Content-Type": "application/json",
                "Prefer": "return=representation",
            }
            res = httpx.post(
                f"{settings.SUPABASE_URL}/rest/v1/{TABLE_LEADS}",
                headers=headers,
                json=row_data,
                timeout=5.0,
            )
            if res.status_code in (200, 201):
                data = res.json()
                if data and len(data) > 0 and "id" in data[0]:
                    lead_id = str(data[0]["id"])
                logger.info("Stored lead in Supabase via REST with id=%s", lead_id)
                return lead_id
            else:
                logger.warning(
                    "Supabase REST insert failed (status %d: %s). Falling back to memory store.",
                    res.status_code,
                    res.text,
                )
        except Exception as exc:
            logger.warning("Supabase REST call failed (%s). Falling back to memory store.", exc)

    # 3. In-memory fallback
    _in_memory_leads[lead_id] = row_data
    logger.info("Stored lead in memory store with id=%s", lead_id)
    return lead_id


def update_lead_notified_team(lead_id: str, success: bool) -> None:
    """Updates the notified_team boolean flag for a lead."""
    client = get_supabase_client()
    if client:
        try:
            client.table(TABLE_LEADS).update({"notified_team": success}).eq("id", lead_id).execute()
            logger.info("Updated notified_team=%s for lead %s in Supabase", success, lead_id)
            return
        except Exception as exc:
            logger.error("Failed to update notified_team for lead %s: %s", lead_id, exc)

    if lead_id in _in_memory_leads:
        _in_memory_leads[lead_id]["notified_team"] = success


def update_lead_auto_reply_sent(lead_id: str, success: bool) -> None:
    """Updates the auto_reply_sent boolean flag for a lead."""
    client = get_supabase_client()
    if client:
        try:
            client.table(TABLE_LEADS).update({"auto_reply_sent": success}).eq("id", lead_id).execute()
            logger.info("Updated auto_reply_sent=%s for lead %s in Supabase", success, lead_id)
            return
        except Exception as exc:
            logger.error("Failed to update auto_reply_sent for lead %s: %s", lead_id, exc)

    if lead_id in _in_memory_leads:
        _in_memory_leads[lead_id]["auto_reply_sent"] = success


def get_lead_by_id(lead_id: str) -> Optional[Dict[str, Any]]:
    """Retrieves a single lead by its UUID."""
    client = get_supabase_client()
    if client:
        try:
            res = client.table(TABLE_LEADS).select("*").eq("id", lead_id).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
        except Exception as exc:
            logger.error("Failed to query lead %s from Supabase: %s", lead_id, exc)

    return _in_memory_leads.get(lead_id)


def get_pending_retry_leads() -> List[Dict[str, Any]]:
    """Returns leads where notified_team=false or auto_reply_sent=false."""
    client = get_supabase_client()
    if client:
        try:
            res = (
                client.table(TABLE_LEADS)
                .select("*")
                .or_("notified_team.eq.false,auto_reply_sent.eq.false")
                .execute()
            )
            return res.data or []
        except Exception as exc:
            logger.error("Failed to query pending retry leads from Supabase: %s", exc)

    return [
        lead
        for lead in _in_memory_leads.values()
        if not lead.get("notified_team") or not lead.get("auto_reply_sent")
    ]


def delete_lead_by_id(lead_id: str) -> bool:
    """Deletes a lead by ID from memory and database for DPDP erasure compliance."""
    deleted = False
    if lead_id in _in_memory_leads:
        del _in_memory_leads[lead_id]
        deleted = True
    client = get_supabase_client()
    if client:
        try:
            res = client.table(TABLE_LEADS).delete().eq("id", lead_id).execute()
            if res.data:
                deleted = True
        except Exception as exc:
            logger.error("Failed to delete lead from Supabase: %s", exc)
    return deleted
