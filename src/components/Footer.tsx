import React from 'react';
import { ArrowUp, Cpu, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-10 border-b border-slate-800/80">
          
          {/* Brand & Mission */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white tracking-tight">
                THE ENGINEERING MIND OF SURYA TEJA
              </span>
              <span className="font-mono text-[10px] text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">
                ECE
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {RESUME_DATA.personal.tagline}
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-300">
              GROUNDED IN FACTS · NO FABRICATED PROJECTS OR STATS
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  01. Who I Am
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-cyan-400 transition-colors">
                  02. Education Timeline
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-400 transition-colors">
                  03. Experience Lab
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">
                  04. Skills Matrix
                </a>
              </li>
              <li>
                <a href="#methodology" className="hover:text-cyan-400 transition-colors">
                  05. Thinking Process
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-cyan-400 transition-colors">
                  06. Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  07. Contact Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Direct Coordinates
            </div>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p>Email: <span className="text-slate-200">{RESUME_DATA.personal.email}</span></p>
              <p>Phone: <span className="text-slate-200">{RESUME_DATA.personal.phone}</span></p>
              <p>LinkedIn: <a href={RESUME_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">in/surya-yelubandi ↗</a></p>
              <p>Location: <span className="text-slate-200">{RESUME_DATA.personal.location}</span></p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-300 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} Y. J. V. SURYA TEJA. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
