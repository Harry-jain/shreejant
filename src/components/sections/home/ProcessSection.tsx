import React from "react";

export function ProcessSection() {
  const steps = [
    { number: "01", title: "Discovery", desc: "We review your requirements and business goals." },
    { number: "02", title: "Strategy & Scope", desc: "You receive a clear scope, wireframes, and timeline." },
    { number: "03", title: "Build & Review", desc: "We develop your site with Next.js and host a staging preview." },
    { number: "04", title: "Launch & Support", desc: "We deploy to your domain and provide post-launch support." },
  ];

  return (
    <section id="process" className="py-16 px-4 max-w-5xl mx-auto text-white">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">How We Work</h2>
        <p className="text-sm text-gray-400 mt-2">A clean 4-step engineering process.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.number} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400">{s.number}</span>
            <h3 className="text-base font-semibold text-white">{s.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProcessSection;
