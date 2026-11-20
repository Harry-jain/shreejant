"use client";

import React from "react";
import { clinicData } from "../data";
import { Stethoscope, Activity, Baby, HeartPulse, ShieldAlert, Sparkles } from "lucide-react";

const SPECIALITY_ICONS: Record<string, React.ReactNode> = {
  derm: <Sparkles className="w-5 h-5 text-teal-700" />,
  genmed: <Stethoscope className="w-5 h-5 text-teal-700" />,
  paediatrics: <Baby className="w-5 h-5 text-teal-700" />,
  diabetes: <Activity className="w-5 h-5 text-teal-700" />,
  allergy: <ShieldAlert className="w-5 h-5 text-teal-700" />,
  checkup: <HeartPulse className="w-5 h-5 text-teal-700" />,
};

export function ClinicSpecialtiesGrid() {
  return (
    <section id="specialities" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-teal-700/10 text-teal-700 mb-3 border border-teal-700/20">
          CLINICAL DEPARTMENTS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          Evidence-Based Medical Consultations
        </h2>
        <p className="text-sm sm:text-base text-stone-600">
          Clear upfront fees with zero hidden charges. Consultations include dedicated time and digital prescription.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicData.specialities.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-teal-700/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-700/10 flex items-center justify-center">
                  {SPECIALITY_ICONS[item.id] || <Stethoscope className="w-5 h-5 text-teal-700" />}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-700/20">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-bold text-lg text-stone-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-stone-900">{item.fee}</span>
                <span className="text-xs text-stone-500 ml-1.5">/ {item.duration}</span>
              </div>
              <a
                href="#appointment"
                className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
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
