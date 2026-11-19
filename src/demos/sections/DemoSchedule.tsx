import React from 'react';
import { DemoConfig } from '../demos.config';

export function DemoSchedule({ config }: { config: DemoConfig }) {
  const { id, palette } = config;

  if (id === 'gym') {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const sessions = [
      { time: '06:30 AM - 07:30 AM', name: 'Power Hypertrophy', coach: 'Coach Vikram' },
      { time: '08:00 AM - 09:00 AM', name: 'Metabolic Conditioning', coach: 'Coach Sarah' },
      { time: '05:30 PM - 06:30 PM', name: 'Olympic Barbell Technique', coach: 'Coach Vikram' },
      { time: '07:00 PM - 08:00 PM', name: 'High Intensity Mobility', coach: 'Coach Priya' },
    ];

    const trainers = [
      { name: 'Vikram Shinde', role: 'Head of Strength & Conditioning', cert: 'CSCS • 10+ yrs' },
      { name: 'Sarah Khan', role: 'Functional Mobility Specialist', cert: 'NASM-CPT • FRC' },
      { name: 'Priya Nair', role: 'Performance Nutrition & Endurance', cert: 'ISSN • CrossFit L2' },
    ];

    return (
      <section id="timetable" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}20` }}>
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Timetable Header */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: palette.surface, color: palette.accent }}>
              Class Schedule
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), sans-serif', color: palette.ink }}>
              Weekly Training Timetable
            </h2>
            <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
              Small group training capped at 12 athletes per session
            </p>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto rounded-xl border" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: `${palette.accent}30` }}>
                  <th className="p-3.5 font-bold uppercase tracking-wider" style={{ color: palette.accent }}>Slot</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider" style={{ color: palette.ink }}>Training Focus</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider" style={{ color: palette.ink }}>Lead Coach</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-right" style={{ color: palette.ink }}>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: `${palette.accent}15` }}>
                {sessions.map((s, idx) => (
                  <tr key={idx} className="hover:bg-black/5 transition-colors">
                    <td className="p-3.5 font-mono font-medium" style={{ color: palette.ink }}>{s.time}</td>
                    <td className="p-3.5 font-semibold" style={{ color: palette.ink }}>{s.name}</td>
                    <td className="p-3.5 opacity-80" style={{ color: palette.ink }}>{s.coach}</td>
                    <td className="p-3.5 text-right">
                      <a href="#demo-note" className="px-2.5 py-1 rounded text-[11px] font-semibold" style={{ backgroundColor: palette.accent, color: '#FFFFFF' }}>
                        Reserve Slot
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Trainer Role Cards */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-demo-display), sans-serif', color: palette.ink }}>
              Elite Coaching Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trainers.map((t, idx) => (
                <div key={idx} className="p-5 rounded-xl border space-y-2 text-center" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
                  <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center font-bold text-sm" style={{ backgroundColor: palette.bg, color: palette.accent, border: `2px solid ${palette.accent}` }}>
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h4 className="font-semibold text-sm" style={{ color: palette.ink }}>{t.name}</h4>
                  <p className="text-xs opacity-75" style={{ color: palette.ink }}>{t.role}</p>
                  <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: `${palette.accent}15`, color: palette.accent }}>
                    {t.cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Classes / BrightPath Academy
  const courses = [
    { title: 'Class 10 CBSE Math & Science Masterclass', timing: 'Mon, Wed, Fri • 4:30 PM - 6:30 PM', target: 'Board Exam Precision' },
    { title: 'Class 11-12 JEE Foundation & Advanced Physics', timing: 'Tue, Thu, Sat • 5:00 PM - 7:30 PM', target: 'Engineering Entrance' },
    { title: 'Class 11-12 NEET Comprehensive Biology & Chem', timing: 'Mon, Wed, Fri • 6:30 PM - 9:00 PM', target: 'Medical Entrance' },
    { title: 'Middle School Junior Olympiad & STEM Thinking', timing: 'Sat & Sun • 10:00 AM - 12:30 PM', target: 'Logical Foundation' },
  ];

  const faculty = [
    { name: 'Prof. Arvind Deshmukh', subject: 'Head of Physics & Olympiad Lead', exp: 'Ex-BITS Pilani • 18 yrs' },
    { name: 'Dr. Shalini Raman', subject: 'Advanced Organic & Inorganic Chem', exp: 'Ph.D. IIT Bombay • 14 yrs' },
    { name: 'Kavita Menon', subject: 'Pure & Applied Mathematics', exp: 'M.Sc. Mathematics • 12 yrs' },
  ];

  return (
    <section id="courses" className="w-full py-12 sm:py-16 px-4 sm:px-8 border-b" style={{ backgroundColor: palette.bg, borderColor: `${palette.accent}20` }}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: palette.surface, color: palette.accent }}>
            Academic Programs
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-demo-display), sans-serif', color: palette.ink }}>
            Batches & Comprehensive Courses
          </h2>
          <p className="text-xs sm:text-sm opacity-80" style={{ color: palette.ink }}>
            Strictly limited to 20 students per batch for direct faculty engagement
          </p>
        </div>

        {/* 4 Course / Batch Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((c, idx) => (
            <div key={idx} className="p-5 rounded-xl border flex flex-col justify-between space-y-4 shadow-sm" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: `${palette.accent}15`, color: palette.accent }}>
                  {c.target}
                </span>
                <h3 className="font-bold text-base" style={{ color: palette.ink }}>{c.title}</h3>
                <p className="text-xs opacity-75 font-mono" style={{ color: palette.ink }}>🕒 {c.timing}</p>
              </div>

              <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                <span className="text-xs opacity-70 italic" style={{ color: palette.ink }}>Fees: Shared on enquiry</span>
                <a
                  href="#demo-note"
                  className="px-3 py-1.5 rounded text-xs font-semibold"
                  style={{ backgroundColor: palette.accent, color: '#FFFFFF' }}
                >
                  Enquire Batch
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Roles */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-center" style={{ fontFamily: 'var(--font-demo-display), sans-serif', color: palette.ink }}>
            Senior Mentorship Faculty
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {faculty.map((f, idx) => (
              <div key={idx} className="p-4 rounded-xl border space-y-2 text-center" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}20` }}>
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-xs" style={{ backgroundColor: palette.bg, color: palette.accent, border: `2px solid ${palette.accent}` }}>
                  {f.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h4 className="font-semibold text-xs" style={{ color: palette.ink }}>{f.name}</h4>
                <p className="text-[11px] opacity-75" style={{ color: palette.ink }}>{f.subject}</p>
                <p className="text-[10px] font-mono opacity-60" style={{ color: palette.ink }}>{f.exp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results & Student Portal Teasers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border space-y-2" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>Academic Record</span>
            <h4 className="text-sm font-semibold" style={{ color: palette.ink }}>Your toppers and results show here.</h4>
            <p className="text-xs opacity-75 leading-relaxed" style={{ color: palette.ink }}>
              Showcase student percentiles, AIR ranks, and board toppers with verified roll numbers.
            </p>
          </div>
          <div className="p-5 rounded-xl border space-y-2" style={{ backgroundColor: palette.surface, borderColor: `${palette.accent}30` }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>Digital Learning System</span>
            <h4 className="text-sm font-semibold" style={{ color: palette.ink }}>Student & Parent Portal</h4>
            <p className="text-xs opacity-75 leading-relaxed" style={{ color: palette.ink }}>
              Real-time attendance tracking, recorded lectures archive, and automated test analysis report cards.
            </p>
            <a href="#demo-note" className="text-xs font-semibold hover:underline inline-block pt-1" style={{ color: palette.accent }}>
              Student login demo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoSchedule;
