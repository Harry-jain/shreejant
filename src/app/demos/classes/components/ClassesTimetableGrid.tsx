"use client";

import React, { useState } from "react";
import { classesData } from "../data";
import { Calendar, Clock, User, CheckCircle2 } from "lucide-react";

export function ClassesTimetableGrid() {
  const [selectedDay, setSelectedDay] = useState<string>("Mon");
  const { days, slots } = classesData.timetable;

  return (
    <section id="timetable" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#FFC93C]/20 text-[#FFC93C] mb-3 border border-[#FFC93C]/30">
          WEEKLY BATCH ROSTER
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Timetable & Live Seat Availability
        </h2>
        <p className="text-sm sm:text-base text-[#B8B3D6]">
          Pick a slot that suits your schedule. Each batch is strictly capped at 12 students to guarantee personal guidance.
        </p>
      </div>

      {/* Desktop / Tablet Timetable Grid (>=768px) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#7C5CFF]/30 bg-[#382575]/70 backdrop-blur-sm p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#7C5CFF]/30">
              <th className="p-3 text-xs font-bold text-[#FFC93C] uppercase tracking-wider w-24">
                Slot
              </th>
              {days.map((day) => (
                <th key={day} className="p-3 text-xs font-bold text-white uppercase tracking-wider text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#7C5CFF]/20 text-xs">
            {slots.map((slot) => (
              <tr key={slot.time} className="hover:bg-[#7C5CFF]/10 transition-colors">
                <td className="p-3 font-mono font-bold text-[#FFC93C] whitespace-nowrap">
                  {slot.time}
                </td>
                {days.map((day) => {
                  const item = (slot.classes as Record<string, { name: string; mentor: string; seats: string }>)[day];
                  const isFull = item?.seats === "FULL";
                  return (
                    <td key={day} className="p-2.5 text-center">
                      {item ? (
                        <div
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isFull
                              ? "bg-rose-950/40 border-rose-500/30 opacity-70"
                              : "bg-[#2A1B5C] border-[#7C5CFF]/30 hover:border-[#FFC93C]/60"
                          }`}
                        >
                          <p className="font-bold text-white text-[11px] leading-tight mb-1">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-[#B8B3D6] mb-1.5 flex items-center gap-1">
                            <User className="w-2.5 h-2.5 text-[#FFC93C]" /> {item.mentor}
                          </p>
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              isFull
                                ? "bg-rose-900/60 text-rose-300"
                                : "bg-emerald-950/60 text-emerald-400"
                            }`}
                          >
                            {item.seats}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#B8B3D6]/30">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Day Selector (<768px) */}
      <div className="md:hidden">
        {/* Day Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-4">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedDay === day
                  ? "bg-[#FFC93C] text-[#2A1B5C] shadow-md shadow-[#FFC93C]/20"
                  : "bg-[#382575] text-[#B8B3D6] hover:bg-[#382575]/80 border border-[#7C5CFF]/20"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Classes on Selected Day */}
        <div className="space-y-3">
          {slots.map((slot) => {
            const item = (slot.classes as Record<string, { name: string; mentor: string; seats: string }>)[selectedDay];
            if (!item) return null;
            const isFull = item.seats === "FULL";
            return (
              <div
                key={slot.time}
                className="p-4 rounded-xl bg-[#382575] border border-[#7C5CFF]/30 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFC93C] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.time}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-[#B8B3D6]">{item.mentor}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-2 ${
                      isFull
                        ? "bg-rose-900/60 text-rose-300"
                        : "bg-emerald-950/60 text-emerald-400"
                    }`}
                  >
                    {item.seats}
                  </span>
                  <div>
                    <a
                      href="#trial-booking"
                      className="text-xs font-bold text-[#FFC93C] hover:underline"
                    >
                      Book →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class Types & Fees Grid (6 Cards) */}
      <div id="classes" className="mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#7C5CFF]/20 text-[#7C5CFF] mb-3 border border-[#7C5CFF]/30">
            TRANSPARENT TUITION
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Discipline Courses & Monthly Fees
          </h3>
          <p className="text-xs sm:text-sm text-[#B8B3D6]">
            Includes studio usage, practice room reservations, and certificate exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classesData.classTypes.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-[#382575] border border-[#7C5CFF]/30 hover:border-[#FFC93C]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#7C5CFF]/30 text-[#FFC93C]">
                    {c.badge}
                  </span>
                  <span className="text-xs text-[#B8B3D6]">{c.ageGroup}</span>
                </div>
                <h4 className="font-bold text-lg text-white mb-2">{c.name}</h4>
                <p className="text-xs sm:text-sm text-[#B8B3D6] leading-relaxed mb-6">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#7C5CFF]/20 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-[#FFC93C]">{c.fee}</span>
                  <span className="text-xs text-[#B8B3D6] ml-1">/ {c.period}</span>
                </div>
                <a
                  href="#trial-booking"
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#FFC93C] text-[#2A1B5C] hover:bg-[#E6B32E] transition-colors"
                >
                  Free Trial →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

