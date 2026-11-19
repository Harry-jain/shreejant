import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { AuditPageContent } from "@/components/sections/audit/AuditPageContent";

export const metadata = constructMetadata({
  title: "Website & AI Technical Audit — ₹499",
  description:
    "Request a comprehensive technical audit of your website's performance, mobile UX, SEO ranking, and AI automation opportunities with SHREEJAN AI SOLUTIONS for ₹499.",
  canonicalUrl: "/audit",
});

export default function AuditPage() {
  return <AuditPageContent />;
}
