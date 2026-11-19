import { z } from "zod";

// Indian phone number regex: +91 or 91 or 0 followed by 10 digits starting with 6-9, or bare 10 digits
export const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(80, "Full name is too long"),
  // Accept either email address or WhatsApp / phone number
  contact: z
    .string()
    .min(5, "Please enter a valid email address or WhatsApp number")
    .max(100)
    .optional(),
  // Optional project type
  projectType: z.string().optional(),
  message: z
    .string()
    .min(10, "Please enter a message (at least 10 characters)")
    .max(3000, "Message is too long"),

  // Backward compatibility fields (optional)
  businessName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  city_state: z.string().optional(),
  preferred_language: z.string().optional(),
  consent: z.boolean().optional(),
  site_language: z.string().optional(),
  plan: z.string().optional(),
  intent: z.string().optional(),
  demo_type: z.string().optional(),
  timeline: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
