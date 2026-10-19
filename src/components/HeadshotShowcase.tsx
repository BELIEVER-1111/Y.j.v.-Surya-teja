import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Lightbulb, 
  Sliders, 
  Info, 
  UserCheck, 
  Lock 
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';
import { PERMANENT_PORTRAIT } from '../data/permanentPortrait';

export const HeadshotShowcase: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem('surya_teja_custom_photo') || PERMANENT_PORTRAIT || '/surya_teja_portrait.png';
  });
  const [imageError, setImageError] = useState(false);
  const [borderGlow, setBorderGlow] = useState<'cyan' | 'orange' | 'emerald'>('cyan');

  // Sync with storage changes
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

  const glowStyles = {
    cyan: 'border-cyan-500/50 shadow-cyan-500/20 text-cyan-400',
    orange: 'border-orange-500/50 shadow-orange-500/20 text-orange-400',
    emerald: 'border-emerald-500/50 shadow-emerald-500/20 text-emerald-400',
  };

  const importancePillars = [
    {
      title: "The 3-Second Cognitive Anchor",
      description: "Recruiters and hiring managers scan dozens of technical resumes in minutes. A sharp, confident portrait provides an immediate human connection, transforming an anonymous list of credentials into a memorable, authentic candidate.",
      icon: Eye,
      tag: "Recruitment Impact"
    },
    {
      title: "Signaling Attention to Detail & Professional Care",
      description: "In hardware design and software engineering, precision is everything. Investing in a crisp, well-composed headshot signals discipline, maturity, and pride in your professional presentation before you write a single line of code.",
      icon: ShieldCheck,
      tag: "Professional Presence"
    },
    {
      title: "The 'Technical-to-Commercial' Bridge",
      description: "As an ECE engineer bridging engineering logic with commercial strategy, an approachable, professional image proves you are ready for cross-functional collaboration, client briefings, mentor roles, and executive pitches.",
      icon: UserCheck,
      tag: "Stakeholder Trust"
    },
    {
      title: "Unified Digital Footprint",
      description: "A consistent 1:1 professional portrait creates cohesive branding across your portfolio, LinkedIn, GitHub, IEEE technical submissions, and internship applications, establishing instant recognition across platforms.",
      icon: Lightbulb,
      tag: "Brand Cohesion"
    }
  ];

  const guidelines = [
    "Clean, non-distracting background (deep neutral, dark slate, or subtle studio backdrop)",
    "Direct eye contact with a natural, confident and approachable expression",
    "Professional attire (smart collared shirt, polo, or clean blazer)",
    "Soft, balanced lighting without harsh shadows or blowout highlights",
    "Square 1:1 aspect ratio with comfortable headroom above the hair"
  ];

  return (
    <section id="headshot-guide" className="py-24 bg-[#060a13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>OFFICIAL VISUAL IDENTITY</span>
            <span aria-hidden="true">·</span>
            <span>LOCKED DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            THE PROFESSIONAL PORTRAIT
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            In competitive engineering hiring, your headshot is the human handshake preceding your technical interview. This verified portrait permanently represents Surya Teja across all evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Permanent Locked Headshot Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full max-w-md rounded-3xl bg-[#090f1f] border border-slate-800 p-6 shadow-2xl relative">
              
              {/* Top Frame Telemetry */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Camera className="w-4 h-4" />
                  <span>HEADSHOT // SPEC.1:1</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>LOCKED OFFICIAL</span>
                </div>
              </div>

              {/* Main Photo Frame */}
              <div
                className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col items-center justify-center ${glowStyles[borderGlow]} shadow-xl bg-[#0a1222]`}
              >
                {!imageError && photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Surya Teja - Professional Headshot"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-top filter contrast-[1.03]"
                  />
                ) : (
                  /* Engineered Technical Portrait Silhouette */
                  <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                    <div className="w-20 h-20 rounded-full bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
                      <Camera className="w-9 h-9" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">
                        {RESUME_DATA.personal.fullName}
                      </h4>
                      <p className="text-xs text-cyan-400 font-mono">
                        B.Tech ECE · Embedded Systems & AI
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 pt-1">
                      AUTHENTIC CANDIDATE RECORD · VERIFIED
                    </div>
                  </div>
                )}

                {/* Subtle corner tech accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
              </div>

              {/* Accent Lighting Controls for Visitors */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PREVIEW ACCENT:</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBorderGlow('cyan')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-all cursor-pointer ${
                      borderGlow === 'cyan'
                        ? 'border-cyan-400 text-cyan-300 bg-cyan-950/60'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    CYAN
                  </button>
                  <button
                    onClick={() => setBorderGlow('orange')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-all cursor-pointer ${
                      borderGlow === 'orange'
                        ? 'border-orange-400 text-orange-300 bg-orange-950/60'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    AMBER
                  </button>
                  <button
                    onClick={() => setBorderGlow('emerald')}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-all cursor-pointer ${
                      borderGlow === 'emerald'
                        ? 'border-emerald-400 text-emerald-300 bg-emerald-950/60'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    EMERALD
                  </button>
                </div>
              </div>

            </div>

            {/* Verification badge */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>PERMANENT & LOCKED RECORD · IMMUTABLE</span>
            </div>

          </div>

          {/* RIGHT: Why a Good Headshot is Crucial */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* The 4 Core Pillars */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Why a Quality Headshot Matters for Engineers</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {importancePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="rounded-xl bg-[#090f1e] border border-slate-800/90 p-5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                            {pillar.tag}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5 Technical Standards for an Engineering Headshot */}
            <div className="rounded-2xl bg-[#0a1224] border border-cyan-500/30 p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>ENGINEERING HEADSHOT STANDARDS</span>
              </div>

              <h4 className="text-base font-bold text-white">
                Technical Specifications for Surya Teja's Portfolio Portrait
              </h4>

              <div className="space-y-2.5">
                {guidelines.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                <span>IDEAL DIMENSIONS: 1000 × 1000 PX</span>
                <span className="text-cyan-300">ACTIVE IN PORTFOLIO & RESUME DOSSIER</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
