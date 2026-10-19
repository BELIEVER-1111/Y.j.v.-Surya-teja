import React from 'react';
import { X, Printer, FileText, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#090f1d] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Toolbar (Non-printable) */}
        <div className="no-print px-6 py-4 bg-[#0c1428] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">
              Y. J. V. Surya Teja — Technical Resume
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              ECE Fresher · Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Printable Resume Sheet */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-slate-900 font-sans leading-relaxed">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                {RESUME_DATA.personal.fullName}
              </h1>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                Electronics & Communication Engineering · Embedded Systems · AI
              </p>
            </div>
            
            <div className="text-xs text-slate-700 space-y-1 font-mono text-left sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3 h-3 text-slate-900" />
                <span>{RESUME_DATA.personal.phone}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3 h-3 text-slate-900" />
                <span>{RESUME_DATA.personal.email}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Linkedin className="w-3 h-3 text-slate-900" />
                <a
                  href={RESUME_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-700 hover:underline"
                >
                  linkedin.com/in/surya-yelubandi
                </a>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3 h-3 text-slate-900" />
                <span>{RESUME_DATA.personal.location}</span>
              </div>
            </div>
          </div>

          {/* Career Objective */}
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Career Objective
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-normal">
              {RESUME_DATA.careerObjective}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {RESUME_DATA.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree} in {edu.discipline}</span>
                    <div className="text-xs text-slate-600">{edu.institution}, {edu.location}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">{edu.score}</span>
                    <div className="text-xs text-slate-500 font-mono">{edu.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internships & Industrial Training */}
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Internships & Industrial Training
            </h2>
            <div className="space-y-4">
              {RESUME_DATA.internships.map((internship) => (
                <div key={internship.id} className="text-xs sm:text-sm">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-slate-900">{internship.role}</div>
                    <div className="text-xs text-slate-600 font-mono text-right">{internship.period} ({internship.duration})</div>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mb-1">{internship.organization} · {internship.location}</div>
                  <p className="text-xs text-slate-700 leading-normal mb-2">{internship.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {internship.keyDomains.map((domain) => (
                      <span key={domain} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Certifications */}
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {RESUME_DATA.certifications.map((cert) => (
                <div key={cert.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="font-bold text-slate-900">{cert.title}</div>
                  <div className="text-[11px] text-slate-600 font-mono mt-0.5">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Technical & Professional Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
              <div>
                <span className="font-bold text-slate-900">Technical:</span> Embedded Systems, Microcontrollers, Programming, Data Structures & Algorithms, Hardware & Systems, Computer Networks
              </div>
              <div>
                <span className="font-bold text-slate-900">AI & Digital:</span> AI, AI Agents, Research, Analytical Problem Solving
              </div>
              <div>
                <span className="font-bold text-slate-900">Communication:</span> Technical Documentation, Technical-to-Commercial Translation, PPT & Graph Design, Mentoring
              </div>
              <div>
                <span className="font-bold text-slate-900">Professional:</span> Adaptability, Teamwork, Time Management
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
