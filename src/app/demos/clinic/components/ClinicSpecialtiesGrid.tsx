"use client";

import React from "react";
import { clinicData } from "../data";
import { Stethoscope, Activity, Baby, HeartPulse, ShieldAlert, Sparkles } from "lucide-react";

const SPECIALITY_ICONS: Record<string, React.ReactNode> = {
  derm: <Sparkles className="w-5 h-5 text-[#0F8A8A]" />,
  genmed: <Stethoscope className="w-5 h-5 text-[#0F8A8A]" />,
  paediatrics: <Baby className="w-5 h-5 text-[#0F8A8A]" />,
  diabetes: <Activity className="w-5 h-5 text-[#0F8A8A]" />,
  allergy: <ShieldAlert className="w-5 h-5 text-[#0F8A8A]" />,
  checkup: <HeartPulse className="w-5 h-5 text-[#0F8A8A]" />,
};

export function ClinicSpecialtiesGrid() {
  return (
    <section id="specialities" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#0F8A8A]/10 text-[#0F8A8A] mb-3 border border-[#0F8A8A]/20">
          CLINICAL DEPARTMENTS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2A32] mb-4">
          Evidence-Based Medical Consultations
        </h2>
        <p className="text-sm sm:text-base text-[#5B6B73]">
          Clear upfront fees with zero hidden charges. Consultations include dedicated time and digital prescription.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicData.specialities.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-[#0F8A8A]/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0F8A8A]/10 flex items-center justify-center">
                  {SPECIALITY_ICONS[item.id] || <Stethoscope className="w-5 h-5 text-[#0F8A8A]" />}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F4F9F9] text-[#0F8A8A] border border-[#0F8A8A]/20">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-bold text-lg text-[#1E2A32] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6B73] leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1E2A32]/10 flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-[#1E2A32]">{item.fee}</span>
                <span className="text-xs text-[#5B6B73] ml-1.5">/ {item.duration}</span>
              </div>
              <a
                href="#appointment"
                className="text-xs font-semibold text-[#0F8A8A] hover:underline flex items-center gap-1"
              >
                Select Slot →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

