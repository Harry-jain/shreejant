import logging
from typing import Optional
from supabase import Client, create_client
from app.config import settings

logger = logging.getLogger("db")
TABLE_LEADS = "leads"
_client: Optional[Client] = None
_client_init_failed = False


def get_supabase_client() -> Optional[Client]:
    """Returns singleton Supabase client or None if credentials are unset or invalid."""
    global _client, _client_init_failed
    if _client is not None:
        return _client

    if _client_init_failed:
        return None

    if settings.SUPABASE_URL and settings.SUPABASE_SERVICE_KEY:
        try:
            _client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)
            return _client
        except Exception as exc:
            logger.warning(
                "Could not initialize Supabase SDK client (%s). Ensure SUPABASE_SERVICE_KEY is the JWT service_role key starting with 'eyJ...'.",
                exc,
            )
            _client_init_failed = True
            return None

    return None
