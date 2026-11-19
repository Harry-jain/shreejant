from unittest.mock import AsyncMock, patch
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.ratelimit import reset_rate_limits
from app.schemas import CURRENT_PRIVACY_VERSION

client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_rate_limits():
    reset_rate_limits()
    yield
    reset_rate_limits()


def make_valid_payload():
    return {
        "name": "Rohan Verma",
        "business": "Verma Steels & Engineering",
        "email": "rohan@vermasteels.in",
        "phone": "+91 98200 12345",
        "service": "website",
        "plan": "growth",
        "budget": "30_60k",
        "asset_pack": "none",
        "city_state": "Pune, Maharashtra",
        "preferred_language": "en",
        "site_language": "en",
        "message": "We need a complete company website redesign to showcase industrial manufacturing capabilities.",
        "consent": True,
        "consent_text_version": CURRENT_PRIVACY_VERSION,
        "website": "",
        "turnstile_token": "mock-token",
    }


def test_healthz_endpoint():
    res = client.get("/healthz")
    assert res.status_code == 200
    assert res.json() == {"ok": True}


def test_privacy_version_endpoint():
    res = client.get("/v1/privacy-version")
    assert res.status_code == 200
    assert res.json() == {"version": CURRENT_PRIVACY_VERSION}


@patch("app.main.verify_turnstile", new_callable=AsyncMock)
@patch("app.main.send_telegram_alert", new_callable=AsyncMock)
@patch("app.main.send_team_email", new_callable=AsyncMock)
@patch("app.main.send_auto_reply_email", new_callable=AsyncMock)
def test_submit_valid_lead(mock_reply, mock_team, mock_tg, mock_turnstile):
    mock_turnstile.return_value = True
    mock_tg.return_value = True
    mock_team.return_value = True
    mock_reply.return_value = True

    payload = make_valid_payload()
    res = client.post("/v1/leads", json=payload, headers={"x-forwarded-for": "10.0.0.1"})

    assert res.status_code == 201
    data = res.json()
    assert "id" in data
    assert data["message_key"] == "form.success"


@patch("app.main.verify_turnstile", new_callable=AsyncMock)
def test_submit_honeypot_filled_returns_201_and_stores_nothing(mock_turnstile):
    payload = make_valid_payload()
    payload["website"] = "https://bot-link.ru"

    with patch("app.main.store_lead") as mock_store:
        res = client.post("/v1/leads", json=payload, headers={"x-forwarded-for": "10.0.0.2"})
        assert res.status_code == 201
        data = res.json()
        assert "id" in data
        assert data["message_key"] == "form.success"
        # Database store must NOT be called
        mock_store.assert_not_called()
        # Turnstile verification must NOT be called for bots
        mock_turnstile.assert_not_called()


def test_submit_invalid_payload_returns_422():
    payload = make_valid_payload()
    payload["email"] = "not-an-email"
    payload["phone"] = "123"  # invalid

    res = client.post("/v1/leads", json=payload)
    assert res.status_code == 422


@patch("app.main.verify_turnstile", new_callable=AsyncMock)
@patch("app.main.send_telegram_alert", new_callable=AsyncMock)
@patch("app.main.send_team_email", new_callable=AsyncMock)
@patch("app.main.send_auto_reply_email", new_callable=AsyncMock)
def test_rate_limiting_fourth_request_returns_429(mock_reply, mock_team, mock_tg, mock_turnstile):
    mock_turnstile.return_value = True
    mock_tg.return_value = True
    mock_team.return_value = True
    mock_reply.return_value = True

    test_ip = "192.168.1.100"
    headers = {"x-forwarded-for": test_ip}
    payload = make_valid_payload()

    # Submissions 1, 2, 3 should succeed
    for i in range(3):
        res = client.post("/v1/leads", json=payload, headers=headers)
        assert res.status_code == 201, f"Submission {i+1} failed"

    # Submission 4 must be rate-limited with 429
    res4 = client.post("/v1/leads", json=payload, headers=headers)
    assert res4.status_code == 429
    assert res4.headers.get("Retry-After") is not None
    assert "Too many attempts" in res4.json()["detail"]


@patch("app.main.verify_turnstile", new_callable=AsyncMock)
@patch("app.main.send_telegram_alert", new_callable=AsyncMock)
@patch("app.main.send_team_email", new_callable=AsyncMock)
@patch("app.main.send_auto_reply_email", new_callable=AsyncMock)
def test_notification_failures_do_not_fail_submission(mock_reply, mock_team, mock_tg, mock_turnstile):
    mock_turnstile.return_value = True
    # Simulate notifiers throwing exceptions
    mock_tg.side_effect = Exception("Telegram API timeout")
    mock_team.side_effect = Exception("Resend connection refused")
    mock_reply.side_effect = Exception("Resend quota exceeded")

    payload = make_valid_payload()
    res = client.post("/v1/leads", json=payload, headers={"x-forwarded-for": "10.0.0.99"})

    # Submission must still return 201 Created because lead is persisted first
    assert res.status_code == 201
    assert "id" in res.json()
