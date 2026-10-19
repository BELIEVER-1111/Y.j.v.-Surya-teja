import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  FileDown, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Upload, 
  Cpu, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

import { PERMANENT_PORTRAIT } from '../data/permanentPortrait';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem('surya_teja_custom_photo') || PERMANENT_PORTRAIT || '/surya_teja_portrait.png';
  });
  const [imageError, setImageError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('surya_teja_custom_photo');
      if (stored) {
        setPhotoUrl(stored);
        setImageError(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Subtle parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] pt-28 pb-16 lg:py-36 flex items-center overflow-hidden bg-[#070b14] bg-circuit-grid"
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${-mousePos.x * 30}px, ${-mousePos.y * 30}px)`,
        }}
      />

      {/* Engineering circuit watermark traces */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M20 20 h40 v40 h40 v40" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" />
              <circle cx="20" cy="20" r="3" fill="rgba(6, 182, 212, 0.7)" />
              <circle cx="140" cy="140" r="3" fill="rgba(249, 115, 22, 0.7)" />
              <path d="M140 20 v40 h-40 v40" fill="none" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Hero text and actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Eyebrow: Electronics & Communication Engineering */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>ELECTRONICS & COMMUNICATION ENGINEERING</span>
            </div>

            {/* Large headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Building at the intersection of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
                Hardware, Software
              </span>{' '}
              & <span className="text-orange-400">AI</span>.
            </h1>

            {/* Intro and greeting */}
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-semibold text-slate-200">
                Hi, I'm <span className="text-cyan-300">{RESUME_DATA.personal.preferredName}</span>.
              </p>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                {RESUME_DATA.personal.tagline}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 rounded-xl transition-all duration-200 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Quick Contact & Verified Channels */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>Direct Contact Channels</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${RESUME_DATA.personal.email}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-cyan-300 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-lg transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{RESUME_DATA.personal.email}</span>
                </a>

                <a
                  href={`tel:${RESUME_DATA.personal.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-cyan-300 bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-lg transition-colors"
                  title="Direct Phone"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>{RESUME_DATA.personal.phone}</span>
                </a>

                <a
                  href={RESUME_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-blue-300 hover:text-white bg-blue-950/40 hover:bg-blue-900/40 border border-blue-500/30 hover:border-blue-400/60 rounded-lg transition-colors group shadow-sm"
                  title="Surya Teja on LinkedIn (surya-yelubandi)"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">LinkedIn</span>
                  <span className="text-[10px] text-blue-400 font-mono">↗</span>
                </a>

                <a
                  href={RESUME_DATA.personal.githubPlaceholder}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900/40 border border-slate-800/80 rounded-lg transition-colors group"
                  title="GitHub (Configurable)"
                >
                  <Github className="w-3.5 h-3.5 text-slate-300" />
                  <span>GitHub</span>
                  <span className="text-[10px] text-slate-300 font-mono">↗</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Profile Portrait in Technical Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div 
              className="relative w-72 sm:w-84 md:w-96 aspect-square transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              }}
            >
              {/* Circuit backdrop aura */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-600/20 via-teal-500/10 to-orange-500/15 blur-xl -z-10" />
              
              {/* Outer Technical Frame */}
              <div className="relative w-full h-full rounded-3xl p-1 bg-gradient-to-b from-cyan-500/40 via-slate-800 to-slate-900/80 shadow-2xl shadow-cyan-950/40 border border-cyan-500/30 overflow-hidden flex flex-col">
                
                {/* Circuit header status strip */}
                <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SYS.PORTRAIT // 01</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Inner Image Container (Locked Permanent Display) */}
                <div className="relative flex-1 bg-[#090f1d] flex items-center justify-center overflow-hidden">
                  {!imageError && photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Y. J. V. Surya Teja - Electronics & Communication Engineering"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center filter contrast-[1.05]"
                    />
                  ) : (
                    /* Default Engineered Technical Portrait Silhouette */
                    <div className="w-full h-full flex flex-col items-center justify-center relative p-6 bg-gradient-to-b from-slate-900/90 via-[#0a1122] to-[#060a14]">
                      {/* Stylized Circuit Geometry */}
                      <svg className="w-48 h-48 text-cyan-500/40 mb-2" viewBox="0 0 200 200" fill="none">
                        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
                        <circle cx="100" cy="100" r="72" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1" />
                        
                        {/* Abstract Head & Shoulder geometry */}
                        <path d="M100 45 C80 45 68 62 68 82 C68 102 82 114 100 114 C118 114 132 102 132 82 C132 62 120 45 100 45 Z" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="1.5" />
                        <path d="M48 165 C52 135 72 124 100 124 C128 124 148 135 152 165" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="1.5" />
                        
                        {/* Circuit Pins */}
                        <line x1="100" y1="15" x2="100" y2="45" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1.5" />
                        <circle cx="100" cy="15" r="3" fill="#22d3ee" />
                        
                        <line x1="30" y1="100" x2="68" y2="100" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1.5" />
                        <circle cx="30" cy="100" r="3" fill="#22d3ee" />
                        
                        <line x1="170" y1="100" x2="132" y2="100" stroke="rgba(249, 115, 22, 0.6)" strokeWidth="1.5" />
                        <circle cx="170" cy="100" r="3" fill="#f97316" />
                      </svg>
                      
                      <div className="text-center space-y-1">
                        <p className="text-sm font-semibold text-slate-200">
                          {RESUME_DATA.personal.fullName}
                        </p>
                        <p className="text-xs text-cyan-400/90 font-mono">
                          B.Tech ECE · Embedded Systems
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Subtle technical corner accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />
                </div>

                {/* Footer metadata bar */}
                <div className="px-3 py-1.5 bg-slate-950/90 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>LOC: BHIMAVARAM, IN</span>
                  <span className="text-cyan-400">ACTIVE</span>
                </div>
              </div>

              {/* Floating Technical Labels: ECE, EMBEDDED, AI, PROBLEM SOLVING */}
              {/* ECE label - Top Left */}
              <div 
                className="absolute -top-3 -left-4 px-2.5 py-1 rounded-md bg-[#0b1324] border border-cyan-500/40 text-[11px] font-mono font-semibold text-cyan-300 shadow-md shadow-cyan-950/40 flex items-center gap-1.5 transition-transform"
                style={{
                  transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>ECE</span>
              </div>

              {/* EMBEDDED label - Top Right */}
              <div 
                className="absolute -top-3 -right-4 px-2.5 py-1 rounded-md bg-[#0b1324] border border-orange-500/40 text-[11px] font-mono font-semibold text-orange-300 shadow-md shadow-orange-950/30 flex items-center gap-1.5 transition-transform"
                style={{
                  transform: `translate(${-mousePos.x * 12}px, ${mousePos.y * 12}px)`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span>EMBEDDED</span>
              </div>

              {/* AI label - Bottom Left */}
              <div 
                className="absolute -bottom-3 -left-4 px-2.5 py-1 rounded-md bg-[#0b1324] border border-teal-500/40 text-[11px] font-mono font-semibold text-teal-300 shadow-md shadow-teal-950/30 flex items-center gap-1.5 transition-transform"
                style={{
                  transform: `translate(${mousePos.x * 10}px, ${-mousePos.y * 10}px)`,
                }}
              >
                <Sparkles className="w-3 h-3 text-teal-400" />
                <span>AI</span>
              </div>

              {/* PROBLEM SOLVING label - Bottom Right */}
              <div 
                className="absolute -bottom-3 -right-6 px-2.5 py-1 rounded-md bg-[#0b1324] border border-cyan-500/40 text-[11px] font-mono font-semibold text-cyan-300 shadow-md shadow-cyan-950/30 flex items-center gap-1.5 transition-transform"
                style={{
                  transform: `translate(${-mousePos.x * 15}px, ${-mousePos.y * 15}px)`,
                }}
              >
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                <span>PROBLEM SOLVING</span>
              </div>
            </div>

            {/* Permanent Verified Candidate Caption */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Y. J. V. SURYA TEJA · OFFICIAL DOSSIER</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
