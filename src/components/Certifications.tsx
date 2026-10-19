import React from 'react';
import { Award, Network, Code, Terminal, CheckCircle2, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Certifications: React.FC = () => {
  const getCertIcon = (index: number) => {
    switch (index) {
      case 0:
        return Network;
      case 1:
        return Code;
      case 2:
        return Terminal;
      default:
        return Award;
    }
  };

  return (
    <section id="certifications" className="py-24 bg-[#060a13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>06</span>
            <span aria-hidden="true">·</span>
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            CERTIFICATIONS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            Official technical certifications earned through recognized academic institutions, government portals, and industry training platforms.
          </p>
        </div>

        {/* 3 Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESUME_DATA.certifications.map((cert, index) => {
            const Icon = getCertIcon(index);
            return (
              <div
                key={cert.id}
                className="rounded-2xl bg-[#090f1e] border border-cyan-500/20 hover:border-cyan-500/50 p-7 shadow-xl transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>VERIFIED</span>
                    </span>
                  </div>

                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    {cert.issuer}
                  </span>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                    {cert.credentialNote}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>ISSUER: {cert.issuer}</span>
                  <span className="text-[11px] text-slate-300">
                    ACADEMIC RECORD
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Authenticity */}
        <div className="mt-12 text-center text-xs text-slate-300">
          Certified across Computer Networks (NPTEL), DSA in Java (APSCHE), and Python Programming (Infosys Springboard).
        </div>

      </div>
    </section>
  );
};
