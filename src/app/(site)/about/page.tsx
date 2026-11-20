import React from "react";
import Link from "next/link";
import { Github, Linkedin, ArrowRight, MapPin } from "lucide-react";
import { MEMBERS } from "@/data/team";

export const metadata = {
  title: "About Us & Team — SHREEJAN AI SOLUTIONS",
  description:
    "Meet the team behind SHREEJAN AI SOLUTIONS: Harsh, Ankit, and Akshay. A new web and AI agency based in Mumbai.",
};

export default function AboutPage() {
  return (
    <div className="w-full text-white pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-mono text-blue-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>MUMBAI, MAHARASHTRA, INDIA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          About SHREEJAN AI SOLUTIONS
        </h1>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          We are a new three-person web development and AI agency based in Mumbai. We build fast, reliable websites and smart automations for growing Indian businesses.
        </p>
      </div>

      {/* Honest statement */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-16 text-center max-w-2xl mx-auto">
        <h3 className="text-base font-semibold text-white mb-2">Our Stance: Honest &amp; Transparent</h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          We are a young team starting fresh. We do not use fabricated testimonials, made-up metrics, or exaggerated guarantees. What we offer is direct access to the engineers building your software, transparent pricing, and 100% code ownership.
        </p>
      </div>

      {/* Team Founders */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-1">The Team</h2>
          <p className="text-xs font-mono text-gray-400 uppercase">Founding Partners &amp; Engineers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 font-mono font-bold flex items-center justify-center text-lg">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-mono text-blue-400">{member.roleKey}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {member.bioKey}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-mono text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next step */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Want to speak directly with us?</h2>
        <p className="text-sm text-gray-300 max-w-md mx-auto">
          Reach out through our contact form or message us directly on WhatsApp.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
