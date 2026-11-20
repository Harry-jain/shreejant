import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { LegalSummaryTile } from "@/components/legal/LegalSummaryTile";
import { YourChoicesStrip } from "@/components/legal/YourChoicesStrip";
import { Database, Eye, Clock, MapPin, ShieldCheck, FileText } from "lucide-react";

export const metadata = constructMetadata({
  title: "Privacy Policy & Data Rights | SHREEJAN AI SOLUTIONS",
  description:
    "Plain-English summary and details on how SHREEJAN AI SOLUTIONS collects, protects, and handles business enquiries.",
  canonicalUrl: "/privacy",
});

export default function PrivacyPage() {
  const summaryTiles = [
    {
      title: "What we collect",
      description: "Name, email, phone number, project type, and message.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Why we collect it",
      description: "To review your inquiry and respond with a project proposal.",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      title: "Who sees it",
      description: "Only our small engineering team and verified email providers (Resend).",
      icon: <Eye className="w-5 h-5" />,
    },
    {
      title: "How long we keep it",
      description: "Inquiries are kept during active communication and deleted upon request.",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      title: "Where it is stored",
      description: "Securely delivered to our inbox and stored in authorized cloud services.",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      title: "Your rights",
      description: "Request a copy, correction, or deletion of your information at any time.",
      icon: <Database className="w-5 h-5" />,
    },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-white">
      <div className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-blue-400 mb-4">
          <span>DATA PROTECTION NOTICE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          We believe in total transparency. Here is our plain-English summary of what we collect and how we handle your enquiry details.
        </p>
      </div>

      {/* Visual Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {summaryTiles.map((tile) => (
          <LegalSummaryTile
            key={tile.title}
            title={tile.title}
            description={tile.description}
            icon={tile.icon}
          />
        ))}
      </div>

      {/* Your Choices Strip */}
      <YourChoicesStrip />

      {/* Policy Text */}
      <article className="mt-12 pt-8 border-t border-white/10 text-gray-300 text-sm sm:text-base leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">1. Information We Collect</h2>
          <p>
            When you submit an enquiry through our contact form, we collect: full name, email address, phone/WhatsApp number, project type, and your message.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">2. Use of Information</h2>
          <p>
            We use your information exclusively to reply to your message, understand your requirements, and provide project estimates. We never sell, rent, or share your details with data brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">3. Contact &amp; Rights</h2>
          <p>
            You may request the deletion or correction of your contact details at any time by emailing us at{" "}
            <a href="mailto:aishreejan@gmail.com" className="text-blue-400 underline">
              aishreejan@gmail.com
            </a>{" "}
            or messaging our WhatsApp desk.
          </p>
        </section>
      </article>
    </div>
  );
}
