import React, { useState } from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, ChevronRight } from 'lucide-react';
import { RESUME_DATA, EducationItem } from '../data/resumeData';

export const EducationTimeline: React.FC = () => {
  const [selectedEdu, setSelectedEdu] = useState<string>(RESUME_DATA.education[0].id);

  return (
    <section id="education" className="py-24 bg-[#060a13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>02</span>
            <span aria-hidden="true">·</span>
            <span>ACADEMIC TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            EDUCATION TIMELINE
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            A continuous progression in Electronics & Communication Engineering, from secondary school foundations to polytechnic diploma and B.Tech degree.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual Circuit Bus (Vertical timeline) */}
          <div className="lg:col-span-8 relative">
            
            {/* Glowing circuit line */}
            <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-slate-700 pointer-events-none" />

            <div className="space-y-12">
              {RESUME_DATA.education.map((item, idx) => {
                const isSelected = selectedEdu === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEdu(item.id)}
                    className="relative pl-16 sm:pl-20 group cursor-pointer"
                  >
                    {/* Circuit Node Pin */}
                    <div className="absolute left-4 sm:left-6 top-1.5 -translate-x-1/2 flex items-center justify-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950 shadow-lg shadow-cyan-400/40 scale-110'
                            : 'border-slate-600 bg-slate-900 group-hover:border-cyan-400'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isSelected ? 'bg-cyan-400' : 'bg-slate-500 group-hover:bg-cyan-300'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`rounded-2xl p-6 sm:p-7 border transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#0b1326] border-cyan-500/50 shadow-xl shadow-cyan-950/30'
                          : 'bg-[#090e1c] border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                            {item.degree}
                          </span>
                          <span className="text-xs text-slate-300 font-mono">
                            {item.duration}
                          </span>
                        </div>
                        
                        {/* Score Metric with Tabular Numerals */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700/60 font-mono">
                          <span className="text-[11px] text-slate-300">SCORE:</span>
                          <span className="text-sm font-bold text-cyan-300 tabular-nums">
                            {item.score}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.discipline}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                        <span className="font-medium text-slate-200">{item.institution}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="flex items-center gap-1 text-xs text-slate-300">
                          <MapPin className="w-3 h-3 text-cyan-400/80" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-cyan-400 font-bold mt-0.5">›</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic Snapshot Card (Side Summary) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0a1122] border border-cyan-500/30 p-7 space-y-6 sticky top-28">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 pb-3 border-b border-slate-800">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC VERIFICATION SUMMARY</span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-300 mb-1">Undergraduate Degree</div>
                <div className="text-sm font-semibold text-white">B.Tech ECE (Pursuing)</div>
                <div className="text-xs text-cyan-400 mt-1 font-mono">DNR College · 65.38%</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-300 mb-1">Polytechnic Foundation</div>
                <div className="text-sm font-semibold text-white">Diploma in ECE</div>
                <div className="text-xs text-cyan-400 mt-1 font-mono">Smt B Seetha Polytechnic · 76.00%</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-300 mb-1">Secondary Schooling</div>
                <div className="text-sm font-semibold text-white">SSC (10th Standard)</div>
                <div className="text-xs text-cyan-400 mt-1 font-mono">PRZPHS Adavikolanu · 8.6 CGPA</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
              <p>
                All records faithfully represent the official educational progression submitted by Surya Teja. No unverified institutions or simulated honors.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
