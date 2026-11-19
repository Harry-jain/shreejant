# REVIEW.md — Localization Review for Auto-Reply Email Templates

The plain-text auto-reply email templates for Hindi (`hi`) and Marathi (`mr`) have been drafted in `backend/app/notify/templates.py`. They must be reviewed by a native Hindi and Marathi speaker before commercial deployment.

## 1. Hindi (`hi`) Auto-Reply

### Subject:
`आपकी पूछताछ के लिए धन्यवाद, {name}`

### Body:
```text
नमस्ते {name},

SHREEJAN AI SOLUTIONS से संपर्क करने के लिए धन्यवाद।

हमें आपकी पूछताछ प्राप्त हो गई है (योजना: {plan})। हमारी टीम आपकी आवश्यकताओं की समीक्षा करेगी और एक कार्य दिवस के भीतर उत्तर देगी।

कॉल का समय निर्धारित करें: {booking_url}

यदि आपके पास कोई ज़रूरी प्रश्न है, तो आप सीधे इस ईमेल का उत्तर दे सकते हैं।

सादर,
SHREEJAN AI SOLUTIONS
BKC & Andheri East, Mumbai, Maharashtra 400051
Website: https://shreejanai.in

---
You received this because you asked us about a website project.
```

### Review Checklist:
- [ ] Tone is professional, polite, and matches Indian B2B standards.
- [ ] Devanagari grammar and punctuation are natural and correct.
- [ ] Address and sign-off fit Mumbai business expectations.

---

## 2. Marathi (`mr`) Auto-Reply

### Subject:
`तुमच्या चौकशीबद्दल धन्यवाद, {name}`

### Body:
```text
नमस्कार {name},

SHREEJAN AI SOLUTIONS शी संपर्क केल्याबद्दल धन्यवाद.

आम्हाला तुमची चौकशी प्राप्त झाली आहे (प्लॅन: {plan}). आमची टीम तुमच्या आवश्यकतांचा आढावा घेईल आणि एका कामाच्या दिवसात उत्तर देईल.

कॉलची वेळ निश्चित करा: {booking_url}

काही तातडीचे प्रश्न असल्यास, आपण या ईमेलला थेट उत्तर देऊ शकता.

आपला नम्र,
SHREEJAN AI SOLUTIONS
BKC & Andheri East, Mumbai, Maharashtra 400051
Website: https://shreejanai.in

---
You received this because you asked us about a website project.
```

### Review Checklist:
- [ ] Professional and courteous tone suitable for Maharashtra business owners.
- [ ] Marathi phrasing conveys respect and prompt commitment.
- [ ] Accurate terminology for website inquiry and business consultation.
