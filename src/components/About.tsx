import React from 'react';
import { 
  Cpu, 
  Lightbulb, 
  FileText, 
  Presentation, 
  Users, 
  Compass, 
  Wrench, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const About: React.FC = () => {
  const strengthIcons = [
    Lightbulb,
    TrendingUp,
    FileText,
    Presentation,
    Users,
    Compass,
    Wrench,
    ShieldCheck,
  ];

  return (
    <section id="about" className="py-24 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>01</span>
            <span aria-hidden="true">·</span>
            <span>PROFILE & IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WHO I AM
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            An Electronics and Communication Engineering fresher connecting hardware design, software programming, AI agents, and practical commercial translation.
          </p>
        </div>

        {/* Identity & Career Objective Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Objective Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0b1222] border border-cyan-500/20 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>CAREER OBJECTIVE</span>
            </div>

            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed">
              "{RESUME_DATA.careerObjective}"
            </p>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-300">Degree: B.Tech ECE (2024–2027)</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-slate-300">Status: Fresher</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-slate-300">Focus: Embedded & AI</span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Highlight */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0a1020] border border-slate-800 p-8 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              The Engineering + Communication Duality
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Many engineers focus solely on the code or the circuit board. I believe true engineering impact happens when deep technical competence is paired with the ability to communicate clearly, mentor others, and translate technical capabilities into solutions that solve real human and market challenges.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Bridging low-level embedded hardware with high-level logic</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>High clarity in technical documentation and slide graphics</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Disciplined problem management and root-cause analysis</span>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Key Strengths from Resume */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Verified Strengths & Attributes
            </h3>
            <span className="text-xs font-mono text-slate-300">
              FROM RESUME RECORD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESUME_DATA.coreStrengths.map((strength, index) => {
              const Icon = strengthIcons[index % strengthIcons.length];
              return (
                <div
                  key={strength.title}
                  className="rounded-xl bg-[#090f1e] border border-slate-800/90 p-6 hover:border-cyan-500/40 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {strength.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
