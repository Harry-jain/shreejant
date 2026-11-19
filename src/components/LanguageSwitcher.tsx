"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n";
import { LANGUAGES, LanguageCode } from "@/i18n/languages";

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export function LanguageSwitcher({ className = "", isMobile = false }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      data-testid="language-switcher"
      aria-label="Language / भाषा / भाषा निवडा"
      className={`inline-flex items-center rounded-full p-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md ${
        isMobile ? "w-full justify-between px-2" : "gap-1"
      } ${className}`}
    >
      {/* Globe Icon */}
      <div 
        className="pl-2 pr-1 text-[#7C5CFC] flex items-center justify-center shrink-0" 
        aria-hidden="true"
      >
        <Globe className="w-3.5 h-3.5" />
      </div>

      <div className={`flex items-center ${isMobile ? "flex-1 justify-around gap-1" : "gap-1"}`}>
        {LANGUAGES.map((language) => {
          const isActive = lang === language.code;
          return (
            <button
              key={language.code}
              type="button"
              lang={language.htmlLang}
              aria-pressed={isActive}
              onClick={() => setLang(language.code as LanguageCode)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-full transition-all duration-150 flex items-center justify-center select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] ${
                isActive
                  ? "bg-[#7C5CFC] text-white shadow-[0_2px_8px_rgba(124,92,252,0.4)] scale-100"
                  : "text-ink/65 dark:text-white/70 hover:text-ink dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              } ${isMobile ? "flex-1 text-center" : ""}`}
            >
              <span>{language.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
