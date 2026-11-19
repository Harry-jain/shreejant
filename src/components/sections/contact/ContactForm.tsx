"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n";

const CONSENT_TEXT_VERSION = "2026-11-v1";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "dark" | "light" | "auto";
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove?: (widgetId: string) => void;
    };
  }
}

export function ContactForm() {
  const { t, lang } = useLanguage();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "AI Website Flagship (Latest version Next JS)",
    message: "",
    consent: true,
    website: "", // Honeypot
  });

  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  // 1. Auto-select service if passed via URL ?service=...
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");

    if (serviceParam === "ui-ux-redesign") {
      setFormData((prev) => ({ ...prev, projectType: "UI/UX Redesign & Modernization" }));
    } else if (serviceParam === "websites") {
      setFormData((prev) => ({ ...prev, projectType: "AI Website Flagship (Latest version Next JS)" }));
    } else if (serviceParam === "custom-web-apps") {
      setFormData((prev) => ({ ...prev, projectType: "Custom Web Application & Architecture" }));
    } else if (serviceParam === "website-audit" || serviceParam === "audit") {
      setFormData((prev) => ({ ...prev, projectType: "Website Forensic Speed & Security Audit" }));
    }

    // Capture UTM parameters into sessionStorage
    try {
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
      utmKeys.forEach((key) => {
        const val = params.get(key);
        if (val && !sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, val);
        }
      });
      if (document.referrer && !sessionStorage.getItem("referrer")) {
        sessionStorage.setItem("referrer", document.referrer);
      }
      if (!sessionStorage.getItem("landing_path")) {
        sessionStorage.setItem("landing_path", window.location.pathname);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // 2. Cloudflare Turnstile loader
  useEffect(() => {
    if (isSuccess) return;

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainerRef.current) return;
      if (turnstileWidgetIdRef.current) return;

      try {
        const id = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "error-callback": () => {
            setTurnstileToken("");
          },
          "expired-callback": () => {
            setTurnstileToken("");
          },
        });
        turnstileWidgetIdRef.current = id;
      } catch {
        // ignore
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const existingScript = document.getElementById("cloudflare-turnstile-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "cloudflare-turnstile-script";
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          renderWidget();
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // ignore
        }
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const digitsOnly = formData.phone.replace(/[\s\-\(\)]/g, "");
    let rawTen = digitsOnly;
    if (rawTen.startsWith("+91")) rawTen = rawTen.slice(3);
    else if (rawTen.startsWith("91") && rawTen.length === 12) rawTen = rawTen.slice(2);
    else if (rawTen.startsWith("0") && rawTen.length === 11) rawTen = rawTen.slice(1);

    if (!/^[6-9]\d{9}$/.test(rawTen)) {
      setErrorMessage("Please enter a valid 10-digit Indian WhatsApp / mobile number.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage("Please enter a brief message describing your project (at least 10 characters).");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("You must agree to be contacted.");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // Read stored UTM parameters
      const utm_source = (typeof window !== "undefined" && sessionStorage.getItem("utm_source")) || undefined;
      const utm_medium = (typeof window !== "undefined" && sessionStorage.getItem("utm_medium")) || undefined;
      const utm_campaign = (typeof window !== "undefined" && sessionStorage.getItem("utm_campaign")) || undefined;
      const referrer =
        (typeof window !== "undefined" && sessionStorage.getItem("referrer")) ||
        (typeof document !== "undefined" ? document.referrer : undefined) ||
        undefined;
      const landing_path =
        (typeof window !== "undefined" && sessionStorage.getItem("landing_path")) ||
        (typeof window !== "undefined" ? window.location.pathname : undefined) ||
        undefined;

      const payload = {
        name: formData.fullName.trim(),
        business: formData.fullName.trim() + " Project",
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: "website",
        plan: "growth",
        budget: "30_60k",
        projectType: formData.projectType,
        message: `[Project Type: ${formData.projectType}]\n${formData.message.trim()}`,
        preferred_language: ["en", "hi", "mr"].includes(lang) ? lang : "en",
        site_language: ["en", "hi", "mr"].includes(lang) ? lang : "en",
        consent: true,
        consent_text_version: CONSENT_TEXT_VERSION,
        website: formData.website || "", // Honeypot
        turnstile_token: turnstileToken || "mock-turnstile-token",
        utm_source,
        utm_medium,
        utm_campaign,
        referrer,
        landing_path,
      };

      // Try FastAPI backend first
      let submissionSuccess = false;

      try {
        const res = await fetch(`${apiUrl}/v1/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.status === 429) {
          throw new Error("Too many attempts, try again later.");
        }

        if (res.ok || res.status === 201) {
          submissionSuccess = true;
        } else {
          // If backend returns 503, 500, 422, or 400, trigger fallback to /api/contact
          throw new Error(`Backend service unavailable (status ${res.status})`);
        }
      } catch (backendErr: any) {
        if (backendErr.message?.includes("Too many attempts")) {
          throw backendErr;
        }
        // Fallback to internal /api/contact if backend service is unreachable or returned error
        try {
          const fallbackRes = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: formData.fullName,
              contact: `${formData.email} / ${formData.phone}`,
              email: formData.email,
              phone: formData.phone,
              projectType: formData.projectType,
              message: formData.message,
            }),
          });

          if (fallbackRes.ok) {
            submissionSuccess = true;
          } else {
            const fbData = await fallbackRes.json().catch(() => ({}));
            throw new Error(fbData.error || "Submission failed. Please try again.");
          }
        } catch (fallbackErr: any) {
          throw new Error(fallbackErr.message || "Unable to send your inquiry. Please reach out via WhatsApp.");
        }
      }

      if (submissionSuccess) {
        setIsSuccess(true);
      } else {
        throw new Error("Unable to submit inquiry at this moment. Please contact us directly on WhatsApp.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Unable to send your inquiry. Please contact us via WhatsApp.");
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        } catch {
          // ignore
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact-form"
      className="relative rounded-[28px] bg-gradient-to-b from-[#111626] to-[#0A0D15] border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.85)]"
    >
      {/* Decorative architectural hairline accent */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#7C5CFC]/40 to-transparent" />

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#7C5CFC]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Inquiry Received
            </h3>
            <p className="font-body text-base text-white/70 max-w-md mx-auto leading-relaxed">
              Thank you, {formData.fullName}. A founding systems architect will review your project requirements and respond within 4 hours.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hi SHREEJAN AI team, I just submitted an inquiry for "${formData.projectType}" on your website.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-mono text-xs uppercase tracking-wider transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp Now</span>
            </a>

            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  projectType: "AI Website Flagship (Latest version Next JS)",
                  message: "",
                  consent: true,
                  website: "",
                });
                setTurnstileToken("");
              }}
              className="text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 select-none">
          <div className="space-y-1 mb-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#A78BFA] uppercase tracking-wider mb-1">
              <span>Direct Architecture Brief</span>
              <span className="text-white/40">SHREEJAN AI</span>
            </div>
            <h3 className="font-heading font-bold text-2xl text-white tracking-tight">
              Initiate Project Brief
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-body">
              Fill in your essential details. We will assess architecture, timeline, and ROI.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Hidden Honeypot Field */}
          <div
            className="sr-only"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
          >
            <label htmlFor="website-field">Website</label>
            <input
              id="website-field"
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* 1. Full Name */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
              Full Name <span className="text-[#7C5CFC]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Vikram Singhania"
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 text-sm text-white placeholder:text-white/30 transition-all outline-none"
            />
          </div>

          {/* 2. Contact Details: Email & WhatsApp Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
                Email Address <span className="text-[#7C5CFC]">*</span>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vikram@enterprise.in"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 text-sm text-white placeholder:text-white/30 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
                WhatsApp Number <span className="text-[#7C5CFC]">*</span>
              </label>
              <input
                type="tel"
                name="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 text-sm text-white placeholder:text-white/30 transition-all outline-none"
              />
            </div>
          </div>

          {/* 3. Project Type */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
              Project Type <span className="text-white/40">(Optional)</span>
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0E121E] border border-white/10 hover:border-white/20 focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 text-sm text-white/90 transition-all outline-none"
            >
              <option value="AI Website Flagship (Latest version Next JS)">AI Website Flagship (Latest version Next JS)</option>
              <option value="Custom Web Application & Architecture">Custom Web Application & Architecture</option>
              <option value="UI/UX Redesign & Modernization">UI/UX Redesign & Modernization</option>
              <option value="Website Forensic Speed & Security Audit">Website Forensic Speed & Security Audit</option>
              <option value="Autonomous WhatsApp Sales Agent">Autonomous WhatsApp Sales Agent</option>
              <option value="E-Commerce & UPI Automation Engine">E-Commerce & UPI Automation Engine</option>
              <option value="General Inquiry & Strategy Call">General Inquiry & Strategy Call</option>
            </select>
          </div>

          {/* 4. Message */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-white/80">
              Message <span className="text-[#7C5CFC]">*</span>
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Briefly describe your business goals, target audience, and ideal launch timeline..."
              required
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 text-sm text-white placeholder:text-white/30 transition-all outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Turnstile Container */}
          <div ref={turnstileContainerRef} className="flex justify-center min-h-[50px] my-1" />

          {/* 5. Consent */}
          <div className="space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-[#7C5CFC] focus:ring-[#7C5CFC] accent-[#7C5CFC]"
              />
              <span className="text-[11px] text-white/60 leading-relaxed font-body">
                I agree to be contacted on WhatsApp and email regarding this inquiry. Read our{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-[#A78BFA] hover:text-white underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {/* 6. One Clear Submit Button: "Send Inquiry" in Radiant Violet Brand Theme */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-bold text-base shadow-[0_6px_28px_rgba(124,92,252,0.45)] hover:shadow-[0_10px_36px_rgba(124,92,252,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Sending Your Inquiry...</span>
              </>
            ) : (
              <>
                <span>Send Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] font-mono text-center text-white/40">
            Guaranteed response within 4 hours. No sales spam.
          </p>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
