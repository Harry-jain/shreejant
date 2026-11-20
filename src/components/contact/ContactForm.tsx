"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string; // Honeypot
}

const INITIAL_FORM_DATA: FormDataState = {
  name: "",
  email: "",
  phone: "",
  service: "Business Website",
  message: "",
  website: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormDataState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormDataState, string>> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your name (at least 2 characters).";
    } else if (formData.name.trim().length > 100) {
      errors.name = "Name cannot exceed 100 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please enter a message (at least 10 characters).";
    } else if (formData.message.trim().length > 2000) {
      errors.message = "Message cannot exceed 2000 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    // Silent handling if bot triggered honeypot on client
    if (formData.website) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          service: formData.service || undefined,
          message: formData.message.trim(),
          website: formData.website,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        const errorText =
          data.error ||
          "Failed to send message. Please reach out directly on WhatsApp.";
        setErrorMessage(errorText);
      }
    } catch {
      setErrorMessage("Failed to send message. Please reach out directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setFieldErrors({});
    setErrorMessage(null);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <Card className="text-center py-10 px-6 space-y-5 bg-surface border-border">
        <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mx-auto text-accent">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <Heading level="h2" className="text-2xl font-bold text-text">
            Thank you. We&apos;ll reply as soon as we can.
          </Heading>
          <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
            Your inquiry has been received. We review every message personally and will get in touch with you.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            href="https://wa.me/918976517353"
            variant="primary"
            size="default"
          >
            Message on WhatsApp
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="default"
          >
            Send Another Message
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 bg-surface border-border">
      <div className="mb-6 space-y-1">
        <Heading level="h2" className="text-xl sm:text-2xl font-semibold text-text">
          Send Us a Message
        </Heading>
        <p className="text-sm text-muted">
          Fill in your details below and we will get back to you.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-border bg-bg p-4 text-sm text-text space-y-3"
        >
          <p className="font-medium text-text">{errorMessage}</p>
          <div>
            <Button
              href="https://wa.me/918976517353"
              variant="primary"
              size="sm"
            >
              Message on WhatsApp
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
          value={formData.website}
          onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        />

        <Input
          label="Your Name"
          name="name"
          id="name"
          required
          placeholder="Harsh Sharma"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
            if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={fieldErrors.name}
          disabled={isSubmitting}
        />

        <Input
          label="Email Address"
          name="email"
          id="email"
          type="email"
          required
          placeholder="harsh@example.com"
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={fieldErrors.email}
          disabled={isSubmitting}
        />

        <Input
          label="Phone / WhatsApp"
          name="phone"
          id="phone"
          type="tel"
          placeholder="+91 89765 17353 (Optional)"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          helperText="Optional. Convenient if you prefer a quick WhatsApp response."
          disabled={isSubmitting}
        />

        <div className="w-full space-y-1.5 text-left">
          <label htmlFor="service" className="block text-sm font-medium text-text">
            Service Interest <span className="text-muted text-xs font-normal">(Optional)</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="Business Website">Business Website</option>
            <option value="E-Commerce / Catalog">E-Commerce / Catalog</option>
            <option value="Web Application">Web Application</option>
            <option value="Custom Project">Custom Project / Other</option>
          </select>
        </div>

        <Textarea
          label="Project Details"
          name="message"
          id="message"
          required
          rows={5}
          placeholder="Tell us about your business, the goals for your website, and any reference sites you like."
          value={formData.message}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, message: e.target.value }));
            if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
          }}
          error={fieldErrors.message}
          disabled={isSubmitting}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>

        <p className="text-xs text-muted text-center pt-1">
          We respect your privacy. Your information is only used to respond to your inquiry.
        </p>
      </form>
    </Card>
  );
}

export default ContactForm;
