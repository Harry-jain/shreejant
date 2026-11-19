"use client";

import React from "react";
import { classesData } from "../data";
import { Award, GraduationCap } from "lucide-react";

export function InstructorCards() {
  return (
    <section id="instructors" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#FFC93C]/20 text-[#FFC93C] mb-3 border border-[#FFC93C]/30">
          MASTER FACULTY
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Learn from Performing Artists & Certified Coaches
        </h2>
        <p className="text-sm sm:text-base text-[#B8B3D6]">
          Every faculty member brings over 7 to 12 years of professional performance and pedagogy experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {classesData.instructors.map((inst, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#382575] border border-[#7C5CFF]/30 hover:border-[#7C5CFF]/70 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C5CFF] to-[#FFC93C] p-0.5 mb-4 shadow-md">
                <div className="w-full h-full rounded-2xl bg-[#2A1B5C] flex items-center justify-center text-white font-bold text-lg">
                  {inst.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FFC93C] mb-1">
                <Award className="w-3.5 h-3.5" /> {inst.experience}
              </span>

              <h3 className="font-bold text-lg text-white mb-1">{inst.name}</h3>
              <p className="text-xs font-medium text-[#B8B3D6] mb-3">{inst.discipline}</p>
              <p className="text-xs text-[#B8B3D6]/80 leading-relaxed">{inst.bio}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#7C5CFF]/20">
              <a
                href="#trial-booking"
                className="text-xs font-bold text-[#FFC93C] hover:underline flex items-center gap-1"
              >
                Join {inst.name.split(" ")[0]}&apos;s Batch →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

