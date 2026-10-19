import React, { useState } from 'react';
import { Cpu, Bot, MessageSquare, Briefcase, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, any> = {
    Technical: Cpu,
    'AI & Digital': Bot,
    Communication: MessageSquare,
    Professional: Briefcase,
  };

  const allSkills = RESUME_DATA.skillGroups.flatMap((g) =>
    g.skills.map((s) => ({ ...s, category: g.category }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 bg-[#060a13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>04</span>
            <span aria-hidden="true">·</span>
            <span>CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            SKILLS & EXPERTISE
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            A verified competency matrix categorized across hardware engineering, computational AI, technical communication, and professional execution.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto">
            {['All', 'Technical', 'AI & Digital', 'Communication', 'Professional'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-400/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Microcontrollers, AI)..."
              className="w-full bg-[#0a1122] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-300 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = categoryIcons[skill.category] || Cpu;
            return (
              <div
                key={skill.name}
                className="rounded-xl bg-[#090f1e] border border-slate-800/90 p-6 hover:border-cyan-500/40 hover:bg-[#0b1428] transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{skill.category}</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>RESUME VERIFIED</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Anti-Fabrication Notice */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
          <span className="text-cyan-400 font-bold font-mono">NOTE:</span>
          <span>
            Unlike generic portfolios with arbitrary percentages (e.g. "Java 90%", "AI 95%"), this matrix strictly communicates factual domain competencies verified by academic training and coursework.
          </span>
        </div>

      </div>
    </section>
  );
};
