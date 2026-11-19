import pytest
from pydantic import ValidationError
from app.schemas import CURRENT_PRIVACY_VERSION, LeadCreate


def valid_payload_dict():
    return {
        "name": "Aarav Sharma",
        "business": "Sharma Logistics Pvt Ltd",
        "email": "aarav@sharmalogistics.in",
        "phone": "+91 98765 43210",
        "service": "website",
        "plan": "growth",
        "budget": "30_60k",
        "asset_pack": "basic",
        "city_state": "Mumbai, Maharashtra",
        "preferred_language": "en",
        "site_language": "en",
        "message": "We need a modern website with client tracking portal and WhatsApp notifications.",
        "consent": True,
        "consent_text_version": CURRENT_PRIVACY_VERSION,
        "website": "",
        "turnstile_token": "valid-token-example",
    }


def test_valid_payload():
    payload = valid_payload_dict()
    lead = LeadCreate(**payload)
    assert lead.name == "Aarav Sharma"
    assert lead.phone == "+919876543210"
    assert lead.consent is True


@pytest.mark.parametrize(
    "phone_input,expected_output",
    [
        ("9876543210", "+919876543210"),
        ("+91 98765 43210", "+919876543210"),
        ("+91-98765-43210", "+919876543210"),
        ("09876543210", "+919876543210"),
        ("919876543210", "+919876543210"),
        ("(+91) 9876543210", "+919876543210"),
        ("6123456789", "+916123456789"),
        ("7123456789", "+917123456789"),
        ("8123456789", "+918123456789"),
    ],
)
def test_valid_phone_formats(phone_input, expected_output):
    payload = valid_payload_dict()
    payload["phone"] = phone_input
    lead = LeadCreate(**payload)
    assert lead.phone == expected_output


@pytest.mark.parametrize(
    "bad_phone",
    [
        "1234567890",       # Starts with 1 (invalid in India)
        "5123456789",       # Starts with 5 (invalid in India)
        "98765",            # Too short
        "+1 9876543210",    # Country code is US (+1)
        "9876543210123",    # Too long
        "abcdefghij",       # Alphabetic
        "",                 # Empty
    ],
)
def test_invalid_phone_formats(bad_phone):
    payload = valid_payload_dict()
    payload["phone"] = bad_phone
    with pytest.raises(ValidationError):
        LeadCreate(**payload)


def test_unknown_fields_rejected():
    payload = valid_payload_dict()
    payload["unexpected_injected_field"] = "hacker"
    with pytest.raises(ValidationError) as excinfo:
        LeadCreate(**payload)
    assert "extra_forbidden" in str(excinfo.value)


def test_consent_required():
    payload = valid_payload_dict()
    payload["consent"] = False
    with pytest.raises(ValidationError):
        LeadCreate(**payload)


def test_consent_version_mismatch():
    payload = valid_payload_dict()
    payload["consent_text_version"] = "outdated-version"
    with pytest.raises(ValidationError):
        LeadCreate(**payload)


def test_message_length_constraints():
    payload = valid_payload_dict()
    payload["message"] = "Too short"  # < 20 chars
    with pytest.raises(ValidationError):
        LeadCreate(**payload)


def test_invalid_email():
    payload = valid_payload_dict()
    payload["email"] = "not-an-email"
    with pytest.raises(ValidationError):
        LeadCreate(**payload)


def test_honeypot_allowed_in_schema():
    # Schema allows string in website (honeypot logic handled in controller)
    payload = valid_payload_dict()
    payload["website"] = "http://spam-bot.xyz"
    lead = LeadCreate(**payload)
    assert lead.website == "http://spam-bot.xyz"
