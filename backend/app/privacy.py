from fastapi import APIRouter
from app.config import settings
from app.schemas import PrivacyVersionResponse

router = APIRouter(prefix="/v1", tags=["privacy"])


@router.get("/privacy-version", response_model=PrivacyVersionResponse)
def get_privacy_version() -> PrivacyVersionResponse:
    """Returns the current consent and privacy policy text version."""
    return PrivacyVersionResponse(version=settings.PRIVACY_VERSION)
