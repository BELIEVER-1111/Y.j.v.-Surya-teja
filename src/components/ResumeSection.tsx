import React from 'react';
import { Eye, Download, Shield } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const handleDownload = () => {
    // Open resume modal which triggers instant print/PDF save or download
    onOpenResumeModal();
  };

  return (
    <section id="resume" className="py-24 bg-[#070b14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>07</span>
            <span aria-hidden="true">·</span>
            <span>VERIFIED DOCUMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            MY RESUME
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            A comprehensive, verified technical curriculum vitae detailing educational background, embedded systems & DSA internships, and validated certifications.
          </p>
        </div>

        {/* Resume Interactive Preview Box */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0a1122] to-[#070b14] border border-cyan-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left summary */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>OFFICIAL CURRICULUM VITAE · SOURCE OF TRUTH</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {RESUME_DATA.personal.fullName}
                </h3>
                <p className="text-sm font-mono text-cyan-300 mt-1">
                  Electronics & Communication Engineering · DNR College & Smt B Seetha Polytechnic
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300 pt-2">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-300 block mb-0.5">ACADEMIC LEVEL:</span>
                  <span className="text-white font-semibold">B.Tech Fresher (ECE)</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-300 block mb-0.5">INTERNSHIPS:</span>
                  <span className="text-cyan-300 font-semibold">2 Completed (6m + 2m)</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-300 block mb-0.5">CERTIFICATIONS:</span>
                  <span className="text-white font-semibold">NPTEL · APSCHE · Infosys</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onOpenResumeModal}
                  type="button"
                  className="px-6 py-3 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-400/20 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>VIEW RESUME</span>
                </button>

                <button
                  onClick={handleDownload}
                  type="button"
                  className="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>DOWNLOAD RESUME</span>
                </button>
              </div>

            </div>

            {/* Right mini document mockup */}
            <div className="lg:col-span-4 flex justify-center">
              <div 
                onClick={onOpenResumeModal}
                className="w-full max-w-xs rounded-xl bg-white text-slate-900 p-5 shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer border border-slate-200 space-y-3 font-sans text-[10px]"
              >
                <div className="border-b border-slate-900 pb-2">
                  <div className="font-extrabold text-xs text-slate-950">{RESUME_DATA.personal.fullName}</div>
                  <div className="text-[9px] text-slate-600">ECE · Embedded Systems · AI</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[9px] uppercase tracking-wide text-slate-800 border-b border-slate-200 pb-0.5">Education</div>
                  <div className="flex justify-between text-slate-700">
                    <span>B.Tech ECE (DNR College)</span>
                    <span className="font-mono">65.38%</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Diploma ECE (Smt B Seetha)</span>
                    <span className="font-mono">76.00%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[9px] uppercase tracking-wide text-slate-800 border-b border-slate-200 pb-0.5">Internships</div>
                  <div className="text-slate-700 font-medium">Embedded Systems Design (6 Months)</div>
                  <div className="text-slate-500">Protective Technologies, Vijayawada</div>
                  <div className="text-slate-700 font-medium mt-1">DSA in Java (2 Months)</div>
                  <div className="text-slate-500">CSC India (APSCHE)</div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-center text-cyan-700 font-bold text-[10px] flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Click to view full resume</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
