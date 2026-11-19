import time
from typing import Dict, List
from fastapi import HTTPException

# In-memory per-IP rate limiting: 3 submissions per hour, 15 per day, 150 global/day
RATE_LIMIT_WINDOW_SECONDS = 3600
RATE_LIMIT_DAILY_SECONDS = 86400
MAX_SUBMISSIONS_PER_WINDOW = 3
MAX_SUBMISSIONS_PER_DAY = 15
MAX_GLOBAL_SUBMISSIONS_PER_DAY = 150

_ip_submissions: Dict[str, List[float]] = {}
_daily_ip_submissions: Dict[str, List[float]] = {}
_global_submissions: List[float] = []


def check_rate_limit(ip: str) -> None:
    """
    Checks if client IP has exceeded rate limits.
    Raises HTTPException(429) if exceeded.
    """
    global _global_submissions

    # In local development / testing, allow unblocked requests from loopback
    if ip in ("127.0.0.1", "localhost", "::1", "testclient"):
        return

    now = time.time()
    cutoff_hourly = now - RATE_LIMIT_WINDOW_SECONDS
    cutoff_daily = now - RATE_LIMIT_DAILY_SECONDS

    # 1. Global Daily Circuit Breaker
    _global_submissions = [t for t in _global_submissions if t > cutoff_daily]
    if len(_global_submissions) >= MAX_GLOBAL_SUBMISSIONS_PER_DAY:
        raise HTTPException(
            status_code=429,
            detail="System submission threshold reached. Please connect with us directly on WhatsApp.",
            headers={"Retry-After": "3600"},
        )

    # 2. Hourly Per-IP Limit
    submissions = _ip_submissions.get(ip, [])
    valid_submissions = [t for t in submissions if t > cutoff_hourly]
    _ip_submissions[ip] = valid_submissions

    if len(valid_submissions) >= MAX_SUBMISSIONS_PER_WINDOW:
        oldest = valid_submissions[0]
        retry_after = max(1, int(oldest + RATE_LIMIT_WINDOW_SECONDS - now))
        raise HTTPException(
            status_code=429,
            detail="Too many attempts, try again later.",
            headers={"Retry-After": str(retry_after)},
        )

    # 3. Daily Per-IP Limit
    daily = _daily_ip_submissions.get(ip, [])
    valid_daily = [t for t in daily if t > cutoff_daily]
    _daily_ip_submissions[ip] = valid_daily

    if len(valid_daily) >= MAX_SUBMISSIONS_PER_DAY:
        raise HTTPException(
            status_code=429,
            detail="Daily submission limit reached for this IP. Please reach out via WhatsApp.",
            headers={"Retry-After": "86400"},
        )


def record_submission(ip: str) -> None:
    """Records an accepted submission timestamp for this IP."""
    global _global_submissions
    now = time.time()
    cutoff_hourly = now - RATE_LIMIT_WINDOW_SECONDS
    cutoff_daily = now - RATE_LIMIT_DAILY_SECONDS

    submissions = _ip_submissions.get(ip, [])
    valid_submissions = [t for t in submissions if t > cutoff_hourly]
    valid_submissions.append(now)
    _ip_submissions[ip] = valid_submissions

    daily = _daily_ip_submissions.get(ip, [])
    valid_daily = [t for t in daily if t > cutoff_daily]
    valid_daily.append(now)
    _daily_ip_submissions[ip] = valid_daily

    _global_submissions = [t for t in _global_submissions if t > cutoff_daily]
    _global_submissions.append(now)


def reset_rate_limits() -> None:
    """Clears rate limit store (used in test suite)."""
    _ip_submissions.clear()
