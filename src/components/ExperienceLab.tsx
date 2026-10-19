import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  Calendar, 
  Clock, 
  Code2, 
  CircuitBoard, 
  Binary 
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const ExperienceLab: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="experience" className="py-24 bg-[#070b14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>03</span>
            <span aria-hidden="true">·</span>
            <span>APPLIED INDUSTRIAL TRAINING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            EXPERIENCE LAB
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            Rigorous hands-on internships focusing on industrial embedded system design and foundational algorithmic software engineering.
          </p>
        </div>

        {/* 2 Internship Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {RESUME_DATA.internships.map((internship, index) => (
            <div
              key={internship.id}
              className="rounded-2xl bg-[#090f20] border border-cyan-500/20 hover:border-cyan-500/50 p-8 shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag / Duration */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                    INTERNSHIP {index === 0 ? '01' : '02'} · {internship.duration}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{internship.period}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {internship.role}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-300 font-medium">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{internship.organization}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-xs text-slate-300">{internship.location}</span>
                </div>

                <p className="mt-6 text-sm text-slate-300 leading-relaxed">
                  {internship.description}
                </p>
              </div>

              {/* Verified Domain Tags */}
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-3">
                  Core Competencies Tested:
                </div>
                <div className="flex flex-wrap gap-2">
                  {internship.keyDomains.map((domain) => (
                    <span
                      key={domain}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-900/90 text-slate-200 border border-slate-700/80 group-hover:border-cyan-500/40 transition-colors"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VISUAL COMPARISON: HARDWARE → SOFTWARE BRIDGE */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0a1224] via-[#0b1428] to-[#070b16] border border-cyan-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <CircuitBoard className="w-4 h-4 text-cyan-400" />
                <span>ARCHITECTURAL CONVERGENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                HARDWARE → SOFTWARE CONTINUUM
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              How low-level embedded hardware translates systematically into high-performance software and algorithmic execution.
            </p>
          </div>

          {/* Stepped Pipeline Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {RESUME_DATA.hardwareToSoftwareBridge.map((item, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={item.stage}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/40 scale-[1.02]'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400 mb-2">
                      {item.category}
                    </div>
                    <div className="font-bold text-sm sm:text-base text-white">
                      {item.stage}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 leading-snug">
                    {item.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom takeaway banner */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Embedded Hardware ↔ Software Algorithms</span>
            </div>
            <span className="text-cyan-300">
              Active Focus: Microcontroller Systems & DSA in Java
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
