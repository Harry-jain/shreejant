"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Globe,
  Zap,
  Search,
  MessageSquare,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/i18n";

const auditFormSchema = z.object({
  website_url: z.string().min(3, "Please enter your website URL or domain."),
  website_status: z.string(),
  primary_goals: z.array(z.string()).min(1, "Please select at least one primary goal or bottleneck."),
  business_name: z.string().min(2, "Business name is required."),
  contact_name: z.string().min(2, "Your name is required."),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z.string().email("Enter a valid email address."),
  preferred_language: z.string(),
});

type AuditFormData = z.infer<typeof auditFormSchema>;

export function AuditForm() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      website_url: "",
      website_status: "status_live",
      primary_goals: ["goal_speed", "goal_leads"],
      business_name: "",
      contact_name: "",
      phone: "",
      email: "",
      preferred_language: lang === "hi" ? "Hindi" : lang === "mr" ? "Marathi" : "English",
    },
    mode: "onTouched",
  });

  const selectedGoals = watch("primary_goals") || [];
  const currentStatus = watch("website_status");

  const toggleGoal = (goalKey: string) => {
    if (selectedGoals.includes(goalKey)) {
      setValue("primary_goals", selectedGoals.filter((g) => g !== goalKey), { shouldValidate: true });
    } else {
      setValue("primary_goals", [...selectedGoals, goalKey], { shouldValidate: true });
    }
  };

  const handleNext = async () => {
    setErrorMessage(null);
    const valid = await trigger(["website_url", "website_status", "primary_goals"]);
    if (valid) setStep(2);
  };

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const payload = {
      name: data.contact_name.trim(),
      business: data.business_name.trim() || `${data.contact_name.trim()} Brand`,
      phone: data.phone.trim(),
      email: data.email.trim(),
      service: "website",
      plan: "starter",
      budget: "under_15k",
      city_state: "Online Pan-India",
      preferred_language: ["en", "hi", "mr"].includes(lang) ? lang : "en",
      site_language: ["en", "hi", "mr"].includes(lang) ? lang : "en",
      message: `[WEBSITE FORENSIC AUDIT REQUEST — ₹499]
Website URL: ${data.website_url.trim()}
Current Status: ${data.website_status}
Goals/Bottlenecks: ${data.primary_goals.join(", ")}
Language Preference: ${data.preferred_language}`,
      consent: true,
      consent_text_version: "2026-11-v1",
      website: "",
      turnstile_token: "mock-turnstile-token",
    };

    try {
      let submissionSuccess = false;

      // Try FastAPI backend first (to trigger real-time Telegram notification)
      try {
        const res = await fetch(`${apiUrl}/v1/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok || res.status === 201) {
          submissionSuccess = true;
        } else {
          throw new Error(`Backend response status ${res.status}`);
        }
      } catch {
        // Fallback to internal route if backend not available or returns error
        try {
          const fallbackRes = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: data.contact_name,
              contact: `${data.email} / ${data.phone}`,
              email: data.email,
              phone: data.phone,
              projectType: "Website Forensic Audit (₹499)",
              message: payload.message,
            }),
          });

          if (fallbackRes.ok) {
            submissionSuccess = true;
          }
        } catch {
          // fallback error
        }
      }

      if (submissionSuccess) {
        setIsSuccess(true);
        reset();
        setStep(1);
      } else {
        throw new Error("Unable to submit request. Please try connecting via WhatsApp.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="relative max-w-xl mx-auto rounded-[28px] bg-gradient-to-b from-[#111626] to-[#0A0D15] border border-white/[0.08] p-8 sm:p-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.85)] space-y-6">
        <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#7C5CFC]/40 to-transparent" />
        
        <div className="w-16 h-16 rounded-full bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#A78BFA] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#7C5CFC]" />
        </div>

        <div className="space-y-2">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            {t("audit_page.success_title") || "Audit Request Queued"}
          </h3>
          <p className="font-body text-sm text-white/70 leading-relaxed max-w-md mx-auto">
            {t("audit_page.success_desc") ||
              "Your website URL has been received by our engineering team. We will analyze Core Web Vitals, conversion bottlenecks, and security headers and deliver your teardown within 24 hours."}
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hi SHREEJAN AI team, I just requested a website technical audit for my website."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-mono text-xs uppercase tracking-wider transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t("cta.whatsapp") || "Confirm via WhatsApp"}</span>
          </a>

          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="w-full sm:w-auto px-6 py-3.5 text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            {t("cta.submit_another") || "Submit Another Audit"}
          </button>
        </div>
      </div>
    );
  }

  const goalOptions = [
    { key: "goal_speed", label: t("audit_page.goal_speed") || "Slow mobile loading", icon: Zap },
    { key: "goal_leads", label: t("audit_page.goal_leads") || "Low customer leads", icon: MessageSquare },
    { key: "goal_design", label: t("audit_page.goal_design") || "Outdated look & feel", icon: Globe },
    { key: "goal_seo", label: t("audit_page.goal_seo") || "Poor Google rankings", icon: Search },
    { key: "goal_ai", label: t("audit_page.goal_ai") || "Need AI chatbot / automation", icon: CheckCircle2 },
  ];

  // Removed "Starting fresh (no website yet)" as requested
  const statusOptions = [
    { key: "status_live", label: t("audit_page.status_live") || "Live website needing optimization" },
    { key: "status_redesign", label: t("audit_page.status_redesign") || "Need a complete redesign" },
  ];

  return (
    <div className="relative max-w-3xl mx-auto rounded-[28px] bg-gradient-to-b from-[#111626] to-[#0A0D15] border border-white/[0.08] p-6 sm:p-10 xl:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
      {/* Decorative architectural hairline accent */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#7C5CFC]/40 to-transparent" />

      {/* Step Indicator Header */}
      <div className="mb-8 pb-5 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A78BFA] block mb-1">
            Step {step} of 2 • Forensic Audit
          </span>
          <h3 className="font-heading font-bold text-2xl text-white tracking-tight">
            {step === 1 ? t("audit_page.step1_title") || "Website & Challenges" : t("audit_page.step2_title") || "Delivery & Contact"}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
              step === 1
                ? "bg-[#7C5CFC] text-white shadow-[0_0_15px_rgba(124,92,252,0.5)]"
                : "bg-emerald-500 text-white"
            }`}
          >
            {step === 1 ? "1" : "✓"}
          </div>
          <div className="w-6 h-[2px] bg-white/10" />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
              step === 2
                ? "bg-[#7C5CFC] text-white shadow-[0_0_15px_rgba(124,92,252,0.5)]"
                : "bg-white/5 border border-white/10 text-white/40"
            }`}
          >
            2
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: Website Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                {t("audit_page.website_url") || "Website URL"} <span className="text-[#7C5CFC]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. yourbusiness.com or https://company.in"
                {...register("website_url")}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder:text-white/30 text-sm font-body transition-all outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 ${
                  errors.website_url ? "border-rose-500" : "border-white/10 hover:border-white/20"
                }`}
              />
              {errors.website_url && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.website_url.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                {t("audit_page.website_status") || "Current Website Status"}
              </label>
              <div className="space-y-2.5">
                {statusOptions.map((opt) => {
                  const isSelected = currentStatus === opt.key;
                  return (
                    <label
                      key={opt.key}
                      onClick={() => setValue("website_status", opt.key)}
                      className={`p-3.5 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#7C5CFC]/15 border-[#7C5CFC] text-white font-medium shadow-[0_0_18px_rgba(124,92,252,0.2)]"
                          : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <input
                        type="radio"
                        value={opt.key}
                        checked={isSelected}
                        onChange={() => setValue("website_status", opt.key)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? "border-[#7C5CFC]" : "border-white/30"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#7C5CFC]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-body">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                {t("audit_page.primary_goals") || "Primary Goals & Bottlenecks"} <span className="text-[#7C5CFC]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {goalOptions.map((goal) => {
                  const isChecked = selectedGoals.includes(goal.key);
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.key}
                      type="button"
                      onClick={() => toggleGoal(goal.key)}
                      className={`p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isChecked
                          ? "bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-[0_4px_18px_rgba(124,92,252,0.4)] font-medium"
                          : "bg-white/[0.02] border-white/10 text-white/80 hover:border-[#7C5CFC]/40 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-body leading-tight">{goal.label}</span>
                    </button>
                  );
                })}
              </div>
              {errors.primary_goals && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.primary_goals.message}</p>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-bold text-sm shadow-[0_6px_24px_rgba(124,92,252,0.45)] hover:shadow-[0_8px_32px_rgba(124,92,252,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>{t("form.next") || "Next"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Delivery & Contact Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                  {t("form.name") || "Your Full Name"} <span className="text-[#7C5CFC]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Singhania"
                  {...register("contact_name")}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder:text-white/30 text-sm font-body transition-all outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 ${
                    errors.contact_name ? "border-rose-500" : "border-white/10 hover:border-white/20"
                  }`}
                />
                {errors.contact_name && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.contact_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                  {t("form.business") || "Business / Brand Name"} <span className="text-[#7C5CFC]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Singhania Logistics"
                  {...register("business_name")}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder:text-white/30 text-sm font-body transition-all outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 ${
                    errors.business_name ? "border-rose-500" : "border-white/10 hover:border-white/20"
                  }`}
                />
                {errors.business_name && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.business_name.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                  WhatsApp Number (For PDF Report) <span className="text-[#7C5CFC]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-xs font-mono text-white/40">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    {...register("phone")}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder:text-white/30 text-sm font-mono transition-all outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 ${
                      errors.phone ? "border-rose-500" : "border-white/10 hover:border-white/20"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                  Email Address (For Audit Dossier) <span className="text-[#7C5CFC]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="founder@company.in"
                  {...register("email")}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder:text-white/30 text-sm font-body transition-all outline-none focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC]/30 ${
                    errors.email ? "border-rose-500" : "border-white/10 hover:border-white/20"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                {t("form.preferred_language") || "Preferred Discussion Language"}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["English", "Hindi", "Marathi"].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setValue("preferred_language", l)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-heading font-bold transition-all border cursor-pointer ${
                      watch("preferred_language") === l
                        ? "bg-[#7C5CFC] text-white border-[#7C5CFC] shadow-[0_4px_14px_rgba(124,92,252,0.35)]"
                        : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {l === "English" ? "English" : l === "Hindi" ? "हिन्दी" : "मराठी"}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 py-3 px-5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t("form.back") || "Back"}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-bold text-sm shadow-[0_6px_28px_rgba(124,92,252,0.45)] hover:shadow-[0_8px_36px_rgba(124,92,252,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{t("form.sending") || "Submitting Audit Request..."}</span>
                  </>
                ) : (
                  <>
                    <span>{t("audit_page.submit_btn") || "Request Forensic Audit — ₹499"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default AuditForm;
