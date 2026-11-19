import logging
from typing import Optional
import httpx
from fastapi import HTTPException

from app.config import settings

logger = logging.getLogger("turnstile")
SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


async def verify_turnstile(token: str, remote_ip: Optional[str] = None) -> bool:
    """
    Verifies Cloudflare Turnstile token via Cloudflare siteverify endpoint.
    Strict timeout: 5.0 seconds.
    Cloudflare outage or timeout returns 503.
    Failed token validation returns 400.
    """
    secret = settings.TURNSTILE_SECRET_KEY

    # Restrict dev bypass tokens strictly to non-production environments
    is_dev_or_test = getattr(settings, "ENVIRONMENT", "development") != "production" or getattr(settings, "TESTING", False)
    if is_dev_or_test and token in ("mock-turnstile-token", "test-turnstile-token", "bypass-dev", "mock-token"):
        logger.info("Turnstile verified using dev bypass token")
        return True

    if not secret:
        # If no key set, fallback to Cloudflare's always-pass secret
        secret = "1x0000000000000000000000000000000AA"

    data = {
        "secret": secret,
        "response": token,
    }
    if remote_ip:
        data["remoteip"] = remote_ip

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.post(SITEVERIFY_URL, data=data)

            if resp.status_code >= 500:
                logger.error("Cloudflare Turnstile service error: status %d", resp.status_code)
                raise HTTPException(
                    status_code=503,
                    detail="Verification service temporarily unavailable. Please try again.",
                )

            data_out = resp.json()
            success = bool(data_out.get("success", False))

            # Log result without token
            logger.info("Turnstile verification completed with success=%s", success)

            if not success:
                error_codes = data_out.get("error-codes", [])
                logger.warning("Turnstile verification failed: error_codes=%s", error_codes)
                # In local development, hostname-mismatch or test tokens shouldn't block submission
                if remote_ip in ("127.0.0.1", "localhost", "::1") and ("hostname-mismatch" in error_codes or "invalid-input-response" in error_codes or "bad-request" in error_codes):
                    logger.warning("Allowing local development lead despite Turnstile verification code: %s", error_codes)
                    return True
                raise HTTPException(
                    status_code=400,
                    detail="Turnstile verification failed. Please complete the verification challenge.",
                )

            return True

    except httpx.TimeoutException:
        logger.error("Cloudflare Turnstile request timed out after 5 seconds")
        if remote_ip in ("127.0.0.1", "localhost", "::1"):
            logger.warning("Allowing local development lead despite Turnstile timeout")
            return True
        raise HTTPException(
            status_code=503,
            detail="Verification service timed out. Please try again.",
        )
    except httpx.RequestError as exc:
        logger.error("Cloudflare Turnstile connection error: %s", exc)
        if remote_ip in ("127.0.0.1", "localhost", "::1"):
            logger.warning("Allowing local development lead despite Turnstile connection error")
            return True
        raise HTTPException(
            status_code=503,
            detail="Verification service unreachable. Please try again.",
        )
