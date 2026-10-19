import React, { useState } from 'react';
import { 
  ArrowRight, 
  Workflow, 
  Lightbulb, 
  Briefcase, 
  CheckCircle2, 
  Layers, 
  Code, 
  Cpu, 
  Sparkles 
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const ThinkingProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { thinkingProcess } = RESUME_DATA;

  return (
    <section id="methodology" className="py-24 bg-[#070b14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>05</span>
            <span aria-hidden="true">·</span>
            <span>ENGINEERING MINDSET</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {thinkingProcess.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            {thinkingProcess.subtitle}
          </p>
        </div>

        {/* 7-Stage Interactive Pipeline */}
        <div className="rounded-2xl bg-[#0a1122] border border-cyan-500/30 p-8 shadow-xl mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Workflow className="w-4 h-4 text-cyan-400" />
              <span>THE 7-PHASE DECONSTRUCTION PIPELINE</span>
            </div>
            <div className="text-xs font-mono text-cyan-400">
              CLICK A PHASE TO INSPECT
            </div>
          </div>

          {/* Horizontal / Grid Step Sequence */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {thinkingProcess.steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left ${
                    isActive
                      ? 'bg-cyan-950/50 border-cyan-400 shadow-md shadow-cyan-950/30 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">
                      {step.step}
                    </span>
                    {idx < thinkingProcess.steps.length - 1 && (
                      <span className="hidden lg:inline text-slate-600 text-xs font-mono">→</span>
                    )}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">
                    {step.name}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 leading-snug">
                    {step.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The Two Distinct Strengths: Technical -> Simple & Technical -> Commercial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {thinkingProcess.examples.map((example) => (
            <div
              key={example.number}
              className="rounded-2xl bg-[#090f20] border border-cyan-500/20 hover:border-cyan-500/40 p-8 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-semibold uppercase">
                    EXAMPLE {example.number} · {example.label}
                  </span>
                  {example.number === '01' ? (
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Briefcase className="w-5 h-5 text-orange-400" />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {example.heading}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {example.summary}
                </p>
              </div>

              {/* Pillars */}
              <div className="pt-6 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Methodology Pillars:
                </div>
                <div className="space-y-2">
                  {example.pillars.map((pillar) => (
                    <div key={pillar} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
