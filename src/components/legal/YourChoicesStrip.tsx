import React from "react";
import { Download, Edit3, Trash2, XCircle } from "lucide-react";

export function YourChoicesStrip() {
  const grievanceEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aishreejan@gmail.com";

  const choices = [
    {
      label: "Request a copy of your data",
      icon: <Download className="w-4 h-4 text-[#A78BFA]" />,
      subject: "Data Copy Request — DPDP Act",
      body: "Hello Privacy Officer,\n\nPlease provide an export of all personal details and enquiry records linked to my name/phone number under the Digital Personal Data Protection Act.\n\nMy Full Name:\nMy Phone Number:\nMy Email:",
    },
    {
      label: "Correct your details",
      icon: <Edit3 className="w-4 h-4 text-[#38BDF8]" />,
      subject: "Data Correction Request — DPDP Act",
      body: "Hello Privacy Officer,\n\nI would like to update or correct my personal details in your records.\n\nCurrent Contact:\nUpdated Information to Record:",
    },
    {
      label: "Ask us to delete it",
      icon: <Trash2 className="w-4 h-4 text-rose-400" />,
      subject: "Data Erasure Request — DPDP Act",
      body: "Hello Privacy Officer,\n\nPlease permanently delete all personal data, contact details, and project messages submitted via your website from your database and alert logs.\n\nMy Full Name:\nMy Phone Number:",
    },
    {
      label: "Withdraw consent",
      icon: <XCircle className="w-4 h-4 text-amber-400" />,
      subject: "Withdrawal of Consent — DPDP Act",
      body: "Hello Privacy Officer,\n\nI am withdrawing my consent for SHREEJAN AI SOLUTIONS to contact me via WhatsApp or email regarding website proposals.\n\nMy Contact Details:",
    },
  ];

  return (
    <div className="w-full my-8 p-6 rounded-2xl bg-[#0E121E]/90 border border-white/10 backdrop-blur-xl">
      <div className="mb-4">
        <h3 className="font-heading font-bold text-base sm:text-lg text-white">
          Your Choices & Rights Under Indian Privacy Law
        </h3>
        <p className="font-body text-xs sm:text-sm text-white/60">
          Under India&apos;s Digital Personal Data Protection (DPDP) Act, you maintain full control over your submitted details at all times. Click any action below to email our grievance desk directly:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {choices.map((choice) => {
          const mailto = `mailto:${grievanceEmail}?subject=${encodeURIComponent(
            choice.subject
          )}&body=${encodeURIComponent(choice.body)}`;

          return (
            <a
              key={choice.label}
              href={mailto}
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#7C5CFC]/40 transition-all text-xs font-mono text-white/90 group"
            >
              <div className="p-1.5 rounded-lg bg-white/5 shrink-0 group-hover:scale-105 transition-transform">
                {choice.icon}
              </div>
              <span className="leading-snug">{choice.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
