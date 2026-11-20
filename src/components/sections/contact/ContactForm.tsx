"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, MessageSquare } from "lucide-react";

export function ContactForm() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918976517353";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "Business Website",
    message: "",
    consent: true,
    website: "", // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    // Honeypot check
    if (formData.website) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
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

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again or message on WhatsApp.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Unable to send your inquiry. Please contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact-form"
      className="relative rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-10 shadow-xl"
    >
      {isSuccess ? (
        <div className="text-center py-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, {formData.fullName}. We have received your project details and will review them and get back to you as soon as we can.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hi SHREEJAN AI team, I just submitted an inquiry for "${formData.projectType}" on your website.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  projectType: "Business Website",
                  message: "",
                  consent: true,
                  website: "",
                });
              }}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1 mb-2">
            <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
            <p className="text-xs text-gray-400">
              Fill in your details below and we will get back to you with next steps.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Honeypot */}
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

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
              Full Name <span className="text-blue-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Vikram Singhania"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-sm text-white placeholder:text-gray-500 transition-all outline-none"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
                Email Address <span className="text-blue-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vikram@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-sm text-white placeholder:text-gray-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
                WhatsApp / Phone <span className="text-blue-400">*</span>
              </label>
              <input
                type="tel"
                name="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-sm text-white placeholder:text-gray-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
              Project Type
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0E121E] border border-white/10 hover:border-white/20 focus:border-blue-500 text-sm text-white transition-all outline-none"
            >
              <option value="Business Website">Business Website</option>
              <option value="Custom Web Application">Custom Web Application</option>
              <option value="WhatsApp & Chat Automation">WhatsApp &amp; Chat Automation</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
              Message <span className="text-blue-400">*</span>
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your business, what you need, and any launch timeline..."
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-sm text-white placeholder:text-gray-500 transition-all outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span className="text-xs text-gray-400 leading-relaxed">
                I agree to be contacted via WhatsApp and email regarding this inquiry. Read our{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
