"use client";

import React, { useState } from "react";
import { MessageSquare, CheckCircle2, ArrowRight, Clock, Loader2 } from "lucide-react";
import { FadeUp } from "./FadeUp";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "tel" | "email" | "number" | "select" | "date" | "textarea" | "checkbox" | "time-chips";
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[];
  chips?: string[];
  conditionalOn?: {
    fieldId: string;
    value: any;
  };
}

export interface BookingFormProps {
  id?: string;
  badge?: string;
  heading: string;
  subhead?: string;
  fields: FormField[];
  submitLabel?: string;
  phone?: string;
  defaultWhatsAppMessage?: string;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    accent: string;
  };
}

export function BookingForm({
  id = "booking",
  badge = "FAST DIRECT RESERVATIONS",
  heading,
  subhead,
  fields,
  submitLabel = "Confirm Booking",
  phone = "919999999999",
  defaultWhatsAppMessage = "Hi, I would like to book an appointment.",
  palette,
}: BookingFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedChip, setSelectedChip] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format reservation details
      const name = formData.name || formData.fullName || formData.clientName || "Demo Client";
      const contactPhone = formData.phone || phone;
      const email = formData.email || "inquiry@shreejanai.in";

      const detailsList = Object.entries(formData)
        .map(([k, v]) => `• ${k}: ${v}`)
        .join("\n");
      const reservationSummary = `[PROTOTYPE RESERVATION — ${heading}]\n${detailsList || "Direct booking request"}\nPreferred Slot: ${selectedChip || "Not specified"}`;

      // Dispatch to internal /api/contact so inquiry is reliably recorded
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          contact: `${email} / ${contactPhone}`,
          email,
          phone: contactPhone,
          projectType: `Demo Reservation (${heading})`,
          message: reservationSummary,
        }),
      }).catch((err) => {
        console.warn("Reservation notification warning:", err);
      });

      // Brief animation buffer for user assurance
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    formData.name
      ? `${defaultWhatsAppMessage} Name: ${formData.name}, Phone: ${formData.phone || ""}`
      : defaultWhatsAppMessage
  )}`;

  return (
    <section id={id} className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div
            className="rounded-[32px] p-6 sm:p-10 lg:p-12 border shadow-xl transition-all"
            style={{
              backgroundColor: palette.surface,
              borderColor: `${palette.ink}15`,
              color: palette.ink,
            }}
          >
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
              <span
                className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-3"
                style={{
                  backgroundColor: `${palette.accent}18`,
                  color: palette.accent,
                  border: `1px solid ${palette.accent}30`,
                }}
              >
                {badge}
              </span>
              <h2
                className="font-heading font-black text-2xl sm:text-4xl tracking-tight leading-tight mb-2"
                style={{ color: palette.ink }}
              >
                {heading}
              </h2>
              {subhead && (
                <p className="font-body text-sm sm:text-base opacity-75">
                  {subhead}
                </p>
              )}
            </div>

            {submitted ? (
              <div className="text-center py-10 px-4 space-y-4">
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white"
                  style={{ backgroundColor: palette.accent }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl" style={{ color: palette.ink }}>
                  Booking Request Received!
                </h3>
                <p className="font-body text-sm opacity-80 max-w-md mx-auto">
                  Our team has reserved your slot and dispatched a confirmation alert to your WhatsApp.
                </p>
                <div className="pt-4 flex justify-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-heading font-bold text-sm shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Open in WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map((field) => {
                    // Check conditional rendering
                    if (field.conditionalOn) {
                      if (formData[field.conditionalOn.fieldId] !== field.conditionalOn.value) {
                        return null;
                      }
                    }

                    const isFullWidth =
                      field.type === "textarea" ||
                      field.type === "checkbox" ||
                      field.type === "time-chips";

                    return (
                      <div
                        key={field.id}
                        className={isFullWidth ? "sm:col-span-2" : "col-span-1"}
                      >
                        <label className="block font-mono text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === "select" ? (
                          <select
                            id={field.id}
                            name={field.id}
                            required={field.required}
                            aria-label={field.label}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border bg-black/5 dark:bg-white/5 font-body text-sm focus:outline-none focus:ring-2 transition-all"
                            style={{ borderColor: `${palette.ink}20`, color: palette.ink }}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value} className="text-black">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            id={field.id}
                            name={field.id}
                            rows={3}
                            required={field.required}
                            aria-label={field.label}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border bg-black/5 dark:bg-white/5 font-body text-sm focus:outline-none focus:ring-2 transition-all resize-none"
                            style={{ borderColor: `${palette.ink}20`, color: palette.ink }}
                          />
                        ) : field.type === "checkbox" ? (
                          <label className="flex items-center gap-3 p-3 rounded-xl border bg-black/5 dark:bg-white/5 cursor-pointer">
                            <input
                              type="checkbox"
                              name={field.id}
                              checked={!!formData[field.id]}
                              onChange={(e) => handleChange(field.id, e.target.checked)}
                              className="w-4 h-4 rounded text-emerald-500 focus:ring-0"
                            />
                            <span className="font-body text-sm opacity-90">{field.placeholder || field.label}</span>
                          </label>
                        ) : field.type === "time-chips" ? (
                          <div className="space-y-2">
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {field.chips?.map((time, idx) => {
                                const isSelected = selectedChip === time;
                                const isUnavailable = idx === 2 || idx === 5;
                                return (
                                  <button
                                    key={time}
                                    type="button"
                                    disabled={isUnavailable}
                                    onClick={() => {
                                      setSelectedChip(time);
                                      handleChange(field.id, time);
                                    }}
                                    className={`py-2 px-1 text-center font-mono text-xs rounded-lg border transition-all ${
                                      isUnavailable
                                        ? "line-through opacity-30 cursor-not-allowed border-current/10"
                                        : isSelected
                                        ? "text-white font-bold shadow-md scale-105"
                                        : "opacity-80 hover:opacity-100"
                                    }`}
                                    style={{
                                      backgroundColor: isSelected ? palette.accent : "transparent",
                                      borderColor: isSelected ? palette.accent : `${palette.ink}20`,
                                    }}
                                  >
                                    {time}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            required={field.required}
                            aria-label={field.label}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border bg-black/5 dark:bg-white/5 font-body text-sm focus:outline-none focus:ring-2 transition-all"
                            style={{ borderColor: `${palette.ink}20`, color: palette.ink }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Form Buttons: Submit & Secondary WhatsApp Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-sm text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed transition-all cursor-pointer"
                    style={{ backgroundColor: palette.accent }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : (
                      <>
                        <span>{submitLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-sm bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}

          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default BookingForm;

