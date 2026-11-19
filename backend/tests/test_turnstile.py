from unittest.mock import AsyncMock, MagicMock, patch
import httpx
import pytest
from fastapi import HTTPException
from app.turnstile import verify_turnstile


@pytest.mark.asyncio
async def test_turnstile_success():
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {"success": True}

    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.return_value = mock_resp
        result = await verify_turnstile("valid-test-token", remote_ip="1.2.3.4")
        assert result is True
        mock_post.assert_called_once()


@pytest.mark.asyncio
async def test_turnstile_failure_returns_400():
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {"success": False, "error-codes": ["invalid-input-response"]}

    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.return_value = mock_resp
        with pytest.raises(HTTPException) as exc_info:
            await verify_turnstile("invalid-test-token", remote_ip="1.2.3.4")
        assert exc_info.value.status_code == 400
        assert "Turnstile verification failed" in exc_info.value.detail


@pytest.mark.asyncio
async def test_turnstile_timeout_returns_503():
    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.side_effect = httpx.TimeoutException("Timed out after 5.0s")
        with pytest.raises(HTTPException) as exc_info:
            await verify_turnstile("any-token", remote_ip="1.2.3.4")
        assert exc_info.value.status_code == 503
        assert "timed out" in exc_info.value.detail


@pytest.mark.asyncio
async def test_turnstile_network_error_returns_503():
    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.side_effect = httpx.NetworkError("DNS failure")
        with pytest.raises(HTTPException) as exc_info:
            await verify_turnstile("any-token", remote_ip="1.2.3.4")
        assert exc_info.value.status_code == 503
        assert "unreachable" in exc_info.value.detail


@pytest.mark.asyncio
async def test_turnstile_500_response_returns_503():
    mock_resp = AsyncMock()
    mock_resp.status_code = 502

    with patch("httpx.AsyncClient.post", new_callable=AsyncMock) as mock_post:
        mock_post.return_value = mock_resp
        with pytest.raises(HTTPException) as exc_info:
            await verify_turnstile("any-token", remote_ip="1.2.3.4")
        assert exc_info.value.status_code == 503
