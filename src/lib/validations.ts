import { z } from "zod";

// Indian phone number regex: +91 or 91 or 0 followed by 10 digits starting with 6-9, or bare 10 digits
export const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email address"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  service: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
