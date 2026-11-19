"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n";
import { PrimaryCta } from "@/components/PrimaryCta";

export function StickyMobileBar() {
  const { t, lang } = useLanguage();
  const [hidden, setHidden] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";

  // Pre-filled WhatsApp message per active language
  const messagesByLang: Record<string, string> = {
    en: "Hi SHREEJAN AI SOLUTIONS, I would like to inquire about building a website or AI automation for my business.",
    hi: "नमस्ते SHREEJAN AI SOLUTIONS, मैं अपने व्यवसाय के लिए वेबसाइट या AI ऑटोमेशन बनवाने के बारे में पूछताछ करना चाहता हूँ।",
    mr: "नमस्कार SHREEJAN AI SOLUTIONS, मला माझ्या व्यवसायासाठी वेबसाइट किंवा AI ऑटोमेशन बनवण्याबद्दल चौकशी करायची आहे.",
  };

  const whatsappText = encodeURIComponent(messagesByLang[lang] || messagesByLang.en);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  useEffect(() => {
    // Hide bar when contact form is visible in viewport
    const formElement = document.getElementById("contact-form") || document.querySelector("form");
    if (!formElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(formElement);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Mobile quick actions"
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong rounded-t-[20px] rounded-b-none border-b-0 border-x-0 border-t border-black/10 dark:border-white/10 px-4 py-2.5 transition-transform duration-300 shadow-[0_-8px_30px_rgba(124,92,252,0.15)] ${
        hidden ? "translate-y-full pointer-events-none" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[12px] bg-[#25D366] text-white px-3 py-2 text-xs font-heading font-medium shadow-sm hover:brightness-105 active:scale-95 transition-all shrink-0"
          aria-label={t("cta.whatsapp")}
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="ml-1.5 hidden xs:inline">{t("cta.whatsapp")}</span>
        </a>

        <div className="flex-1">
          <PrimaryCta
            size="sm"
            className="w-full text-center py-2.5 text-xs truncate"
          />
        </div>
      </div>
    </aside>
  );
}
