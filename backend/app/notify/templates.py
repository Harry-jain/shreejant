from typing import Any, Dict, Tuple
from app.config import settings


def get_auto_reply_content(lead: Dict[str, Any]) -> Tuple[str, str]:
    """
    Returns (subject, plain_text_body) for the auto-reply email
    based on the user's preferred language (en, hi, mr).
    """
    name = lead.get("name", "there")
    plan = lead.get("plan")
    lang = lead.get("preferred_language") or lead.get("site_language") or "en"
    if lang not in ("en", "hi", "mr"):
        lang = "en"

    booking_url = settings.BOOKING_URL.strip()

    if lang == "hi":
        subject = f"आपकी पूछताछ के लिए धन्यवाद, {name}"
        plan_line = f" (योजना: {plan})" if plan else ""
        booking_line = f"\nकॉल का समय निर्धारित करें: {booking_url}\n" if booking_url else ""
        body = (
            f"नमस्ते {name},\n\n"
            f"SHREEJAN AI SOLUTIONS से संपर्क करने के लिए धन्यवाद।\n\n"
            f"हमें आपकी पूछताछ प्राप्त हो गई है{plan_line}। हमारी टीम आपकी आवश्यकताओं की समीक्षा करेगी और एक कार्य दिवस के भीतर उत्तर देगी।\n"
            f"{booking_line}\n"
            f"यदि आपके पास कोई ज़रूरी प्रश्न है, तो आप सीधे इस ईमेल का उत्तर दे सकते हैं।\n\n"
            f"सादर,\n"
            f"SHREEJAN AI SOLUTIONS\n"
            f"Mumbai, Maharashtra, India\n"
            f"Website: https://shreejanai.in\n\n"
            f"---\n"
            f"You received this because you asked us about a website project."
        )
    elif lang == "mr":
        subject = f"तुमच्या चौकशीबद्दल धन्यवाद, {name}"
        plan_line = f" (प्लॅन: {plan})" if plan else ""
        booking_line = f"\nकॉलची वेळ निश्चित करा: {booking_url}\n" if booking_url else ""
        body = (
            f"नमस्कार {name},\n\n"
            f"SHREEJAN AI SOLUTIONS शी संपर्क केल्याबद्दल धन्यवाद.\n\n"
            f"आम्हाला तुमची चौकशी प्राप्त झाली आहे{plan_line}. आमची टीम तुमच्या आवश्यकतांचा आढावा घेईल आणि एका कामाच्या दिवसात उत्तर देईल.\n"
            f"{booking_line}\n"
            f"काही तातडीचे प्रश्न असल्यास, आपण या ईमेलला थेट उत्तर देऊ शकता.\n\n"
            f"आपला नम्र,\n"
            f"SHREEJAN AI SOLUTIONS\n"
            f"Mumbai, Maharashtra, India\n"
            f"Website: https://shreejanai.in\n\n"
            f"---\n"
            f"You received this because you asked us about a website project."
        )
    else:
        subject = f"Thanks for your enquiry, {name}"
        plan_line = f" (Plan: {plan})" if plan else ""
        booking_line = f"\nSchedule a discovery call with our team: {booking_url}\n" if booking_url else ""
        body = (
            f"Hi {name},\n\n"
            f"Thank you for contacting SHREEJAN AI SOLUTIONS.\n\n"
            f"We have received your enquiry regarding your project{plan_line}. Our team will review your requirements and reply within one working day.\n"
            f"{booking_line}\n"
            f"If you have any questions, feel free to reply directly to this email.\n\n"
            f"Best regards,\n"
            f"SHREEJAN AI SOLUTIONS\n"
            f"Mumbai, Maharashtra, India\n"
            f"Website: https://shreejanai.in\n\n"
            f"---\n"
            f"You received this because you asked us about a website project."
        )

    return subject, body
