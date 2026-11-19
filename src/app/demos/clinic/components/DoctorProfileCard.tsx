"use client";

import React from "react";
import { clinicData } from "../data";
import { Award, Clock, Languages, CheckCircle2 } from "lucide-react";

export function DoctorProfileCard() {
  const { doctor } = clinicData;

  return (
    <section id="doctor" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0F8A8A]/20 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F8A8A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 relative z-10">
          {/* Doctor Avatar / Visual Column */}
          <div className="shrink-0 flex flex-col items-center text-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-[#0F8A8A]/20 to-[#0F8A8A]/40 border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden mb-4">
              {/* Stylized Doctor Icon Avatar */}
              <div className="w-full h-full flex flex-col items-center justify-end">
                <div className="w-16 h-16 rounded-full bg-[#0F8A8A] text-white flex items-center justify-center font-bold text-2xl shadow-sm mb-2">
                  AV
                </div>
                <div className="w-28 h-14 bg-[#1E2A32] rounded-t-full flex items-center justify-center">
                  <div className="w-4 h-8 bg-white rounded-t-sm" />
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" title="In Clinic Now" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0F8A8A]/10 text-[#0F8A8A]">
              <Clock className="w-3.5 h-3.5" /> Next Slot: {doctor.nextAvailableSlot}
            </span>
          </div>

          {/* Doctor Bio and Credentials */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-[#0F8A8A] text-white">
                Chief Consultant
              </span>
              <span className="text-xs text-[#5B6B73] font-medium">
                Reg: {doctor.regNo}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2A32] mb-1">
              {doctor.name}
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#0F8A8A] mb-4">
              {doctor.qualifications} · {doctor.experience}
            </p>

            <p className="text-sm sm:text-base text-[#1E2A32]/80 leading-relaxed mb-6">
              {doctor.bio}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {doctor.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#1E2A32]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#0F8A8A] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Languages & CTA Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1E2A32]/10">
              <div className="flex items-center gap-2 text-xs text-[#5B6B73]">
                <Languages className="w-4 h-4 text-[#0F8A8A]" />
                <span>Languages: </span>
                <span className="font-semibold text-[#1E2A32]">
                  {doctor.languages.join(", ")}
                </span>
              </div>

              <a
                href="#appointment"
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[#0F8A8A] text-white hover:bg-[#0C6E6E] transition-colors shadow-md shadow-[#0F8A8A]/20"
              >
                Book with Dr. Anaya →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

