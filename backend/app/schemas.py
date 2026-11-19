import re
from typing import Literal, Optional
import email_validator
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

# Disable DNS deliverability check to prevent blocking network queries
email_validator.CHECK_DELIVERABILITY = False

CONTROL_CHARS_PATTERN = re.compile(r"[\x00-\x1f\x7f]")
MULTILINE_CONTROL_CHARS_PATTERN = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
VALID_PHONE_RE = re.compile(r"^[6-9]\d{9}$")
CURRENT_PRIVACY_VERSION = "2026-11-v1"


def clean_string(value: Optional[str], allow_newlines: bool = False) -> Optional[str]:
    if value is None:
        return None
    val = value.strip()
    pattern = MULTILINE_CONTROL_CHARS_PATTERN if allow_newlines else CONTROL_CHARS_PATTERN
    if pattern.search(val):
        raise ValueError("Control characters are not permitted")
    return val


class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(..., min_length=2, max_length=100)
    business: Optional[str] = Field(default="Not specified", max_length=150)
    email: EmailStr = Field(..., max_length=254)
    phone: str
    message: str = Field(..., min_length=20, max_length=2000)

    service: Optional[str] = Field(default="website", max_length=100)
    plan: Optional[str] = Field(default="growth", max_length=50)
    budget: Optional[str] = Field(default="30_60k", max_length=50)
    asset_pack: Optional[str] = Field(default="none", max_length=50)

    city_state: Optional[str] = Field(None, max_length=100)
    preferred_language: Optional[str] = "en"
    site_language: Optional[str] = "en"

    consent: Literal[True] = Field(..., description="Consent must be true")
    consent_text_version: str = Field(..., description="Privacy version string")

    # Honeypot field - must be empty
    website: Optional[str] = Field(default="", max_length=200)

    # Cloudflare Turnstile token
    turnstile_token: Optional[str] = Field(default="", max_length=2048)

    # Project type alias
    projectType: Optional[str] = Field(None, max_length=150)
    fullName: Optional[str] = Field(None, max_length=100)
    contact: Optional[str] = Field(None, max_length=100)

    # UTM parameters & analytics
    utm_source: Optional[str] = Field(None, max_length=100)
    utm_medium: Optional[str] = Field(None, max_length=100)
    utm_campaign: Optional[str] = Field(None, max_length=100)
    utm_content: Optional[str] = Field(None, max_length=100)
    utm_term: Optional[str] = Field(None, max_length=100)
    referrer: Optional[str] = Field(None, max_length=500)
    landing_path: Optional[str] = Field(None, max_length=500)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        cleaned = clean_string(v)
        if not cleaned or len(cleaned) < 2:
            raise ValueError("Must be at least 2 characters")
        return cleaned

    @field_validator("business")
    @classmethod
    def validate_business(cls, v: Optional[str]) -> str:
        if not v or not v.strip():
            return "Not specified"
        cleaned = clean_string(v)
        return cleaned or "Not specified"

    @field_validator("city_state")
    @classmethod
    def validate_city_state(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        cleaned = clean_string(v)
        if not cleaned:
            return None
        return cleaned

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        cleaned = clean_string(v, allow_newlines=True)
        if not cleaned or len(cleaned) < 10:
            raise ValueError("Message must be at least 10 characters")
        if len(cleaned) > 2000:
            raise ValueError("Message cannot exceed 2000 characters")
        return cleaned

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = clean_string(v)
        if not cleaned:
            raise ValueError("Phone number is required")

        # Strip spaces, dashes, parentheses
        digits_clean = re.sub(r"[\s\-\(\)]", "", cleaned)

        # Handle +91 prefix
        if digits_clean.startswith("+91"):
            raw_ten = digits_clean[3:]
        elif digits_clean.startswith("91") and len(digits_clean) == 12:
            raw_ten = digits_clean[2:]
        elif digits_clean.startswith("0") and len(digits_clean) == 11:
            raw_ten = digits_clean[1:]
        elif len(digits_clean) == 10:
            raw_ten = digits_clean
        else:
            raise ValueError("Invalid phone format. Must be a 10-digit Indian mobile number")

        if not VALID_PHONE_RE.match(raw_ten):
            raise ValueError("Invalid Indian mobile number. Must start with 6, 7, 8, or 9 and be 10 digits")

        return f"+91{raw_ten}"

    @field_validator("consent_text_version")
    @classmethod
    def validate_consent_version(cls, v: str) -> str:
        if v != CURRENT_PRIVACY_VERSION:
            raise ValueError(f"Consent text version mismatch: expected {CURRENT_PRIVACY_VERSION}")
        return v

    @field_validator("website")
    @classmethod
    def validate_honeypot(cls, v: Optional[str]) -> str:
        if v is None:
            return ""
        return v.strip()

    @field_validator(
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "referrer",
        "landing_path",
    )
    @classmethod
    def validate_optional_clean(cls, v: Optional[str]) -> Optional[str]:
        return clean_string(v)


class LeadResponse(BaseModel):
    id: str
    message_key: str = "form.success"


class PrivacyVersionResponse(BaseModel):
    version: str
