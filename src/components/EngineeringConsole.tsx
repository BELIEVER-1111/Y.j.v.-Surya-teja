import React, { useState, useEffect, useRef } from 'react';
import { Play, CornerDownLeft, Sparkles, FastForward, Check, Terminal } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface LogLine {
  id: string;
  prefix?: string;
  text: string;
  color?: string;
  isHeader?: boolean;
}

export const EngineeringConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'hardware' | 'education' | 'contact' | 'skills'>('profile');
  const [customInput, setCustomInput] = useState('');
  const [completedLines, setCompletedLines] = useState<LogLine[]>([]);
  const [currentLinePartial, setCurrentLinePartial] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [customHistory, setCustomHistory] = useState<string[]>([]);

  const typingTimeoutRef = useRef<number | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const presetCommands = [
    { id: 'profile', cmd: 'system.profile', label: 'Profile' },
    { id: 'hardware', cmd: 'hardware.inspect()', label: 'Hardware Spec' },
    { id: 'education', cmd: 'academics.status()', label: 'Academics' },
    { id: 'skills', cmd: 'skills.audit()', label: 'Skills' },
    { id: 'contact', cmd: 'contact.ping()', label: 'Ping Surya' },
  ];

  // System diagnostic logs mapped to each command
  const logData: Record<string, LogLine[]> = {
    profile: [
      { id: 'p0', prefix: 'SYS >', text: 'INITIALIZING CANDIDATE TELEMETRY STREAM...', color: 'text-cyan-400 font-bold', isHeader: true },
      { id: 'p1', prefix: '[0.012s]', text: `IDENTITY: ${RESUME_DATA.personal.fullName} (Preferred: ${RESUME_DATA.personal.preferredName})`, color: 'text-white font-semibold' },
      { id: 'p2', prefix: '[0.026s]', text: 'DISCIPLINE: Electronics & Communication Engineering (ECE Fresher)', color: 'text-cyan-300' },
      { id: 'p3', prefix: '[0.041s]', text: 'CORE PHILOSOPHY: Building at the intersection of Hardware, Software & AI', color: 'text-slate-200' },
      { id: 'p4', prefix: '[0.058s]', text: 'STATUS: ACTIVE CANDIDATE · OPEN FOR INTERNSHIPS & JUNIOR ROLES', color: 'text-emerald-400 font-bold' },
      { id: 'p5', prefix: '[0.074s]', text: 'ACADEMIC PATH: B.Tech ECE (DNR College) · Diploma ECE (Smt B Seetha Polytechnic)', color: 'text-slate-300' },
      { id: 'p6', prefix: '[0.090s]', text: 'TRAINING RECORD: 6-Mo Embedded Microcontrollers @ Protective Tech · 2-Mo DSA @ CSC India', color: 'text-orange-300' },
      { id: 'p7', prefix: '[0.105s]', text: 'DIAGNOSTIC VERDICT: ALL METRICS VERIFIED FROM AUTHENTIC DOSSIER', color: 'text-cyan-400' },
    ],
    hardware: [
      { id: 'h0', prefix: 'SYS >', text: 'RUNNING LOW-LEVEL HARDWARE & EMBEDDED DIAGNOSTICS...', color: 'text-cyan-400 font-bold', isHeader: true },
      { id: 'h1', prefix: '[0.015s]', text: 'MICROCONTROLLER ARCH: 8051 / ARM / PIC Architecture fundamentals verified', color: 'text-white' },
      { id: 'h2', prefix: '[0.033s]', text: 'BUS PROTOCOLS: GPIO, UART Serial, I2C, SPI, Timer Interrupts, ADC conversion', color: 'text-cyan-300' },
      { id: 'h3', prefix: '[0.052s]', text: 'LANGUAGES & TOOLING: Embedded C, Assembly fundamentals, Keil uVision, Proteus Simulation', color: 'text-slate-200' },
      { id: 'h4', prefix: '[0.070s]', text: 'INDUSTRIAL LAB: 6-month hands-on diploma internship @ Protective Technologies Ltd, Vijayawada', color: 'text-orange-300 font-medium' },
      { id: 'h5', prefix: '[0.089s]', text: 'DOMAIN FOCUS: Embedded system board testing, peripheral interfacing, schematic design', color: 'text-slate-300' },
      { id: 'h6', prefix: '[0.108s]', text: 'HARDWARE-TO-SOFTWARE BRIDGE: FIRMWARE LOGIC LINKED TO HIGH-LEVEL DSA', color: 'text-emerald-400 font-semibold' },
    ],
    education: [
      { id: 'e0', prefix: 'SYS >', text: 'VERIFYING INSTITUTIONAL ACADEMIC CREDENTIALS...', color: 'text-cyan-400 font-bold', isHeader: true },
      { id: 'e1', prefix: '[0.014s]', text: 'UNDERGRADUATE: B.Tech in Electronics & Communication Engineering (2024–2027)', color: 'text-white' },
      { id: 'e2', prefix: '[0.031s]', text: 'INSTITUTION: DNR College of Engineering & Technology, Bhimavaram · SCORE: 65.38%', color: 'text-cyan-300' },
      { id: 'e3', prefix: '[0.050s]', text: 'POLYTECHNIC: Diploma in Electronics & Communication Engineering (2021–2024)', color: 'text-white' },
      { id: 'e4', prefix: '[0.068s]', text: 'INSTITUTION: Smt B Seetha Polytechnic, Bhimavaram · SCORE: 76.00%', color: 'text-cyan-300' },
      { id: 'e5', prefix: '[0.087s]', text: 'SECONDARY: SSC 10th Standard · PRZPHS Adavikolanu (2023–2024) · SCORE: 8.6 CGPA', color: 'text-slate-200' },
      { id: 'e6', prefix: '[0.104s]', text: 'ATTESTATION: OFFICIAL EDUCATIONAL PROGRESSION 100% VALIDATED', color: 'text-emerald-400 font-bold' },
    ],
    skills: [
      { id: 's0', prefix: 'SYS >', text: 'AUDITING VERIFIED COMPETENCY MATRIX (NO ARBITRARY PERCENTAGES)...', color: 'text-cyan-400 font-bold', isHeader: true },
      { id: 's1', prefix: '[0.016s]', text: 'TECHNICAL: Embedded Systems, Microcontrollers, Programming, Data Structures & Algorithms, Computer Networks', color: 'text-white' },
      { id: 's2', prefix: '[0.035s]', text: 'AI & DIGITAL: Artificial Intelligence, AI Agents, Systems Research, Analytical Problem Solving', color: 'text-cyan-300' },
      { id: 's3', prefix: '[0.055s]', text: 'COMMUNICATION: Technical-to-Commercial Translation, Technical Documentation, PPT & Graph Design, Mentoring', color: 'text-slate-200' },
      { id: 's4', prefix: '[0.074s]', text: 'PROFESSIONAL ATTRIBUTES: Adaptability, Teamwork, Time Management, Solution Design', color: 'text-slate-300' },
      { id: 's5', prefix: '[0.093s]', text: 'CERTIFICATIONS: NPTEL (Networks), CSC India / APSCHE (DSA Java), Infosys (Python)', color: 'text-orange-300' },
      { id: 's6', prefix: '[0.111s]', text: 'ETHICAL AUDIT: ZERO INVENTED SKILLS · STRICT RESUME CONFORMANCE', color: 'text-emerald-400 font-bold' },
    ],
    contact: [
      { id: 'c0', prefix: 'SYS >', text: 'PINGING DIRECT VERIFIED RECRUITMENT CHANNELS...', color: 'text-cyan-400 font-bold', isHeader: true },
      { id: 'c1', prefix: '[0.018s]', text: `PHONE PROTOCOL: ${RESUME_DATA.personal.phone} [VOICE / SMS ACTIVE]`, color: 'text-white font-mono' },
      { id: 'c2', prefix: '[0.038s]', text: `EMAIL ENDPOINT: ${RESUME_DATA.personal.email} [DIRECT INBOX]`, color: 'text-cyan-300 font-mono' },
      { id: 'c3', prefix: '[0.059s]', text: `GEOGRAPHIC BASE: ${RESUME_DATA.personal.location} [OPEN TO HYBRID / RELOCATION]`, color: 'text-slate-200' },
      { id: 'c4', prefix: '[0.079s]', text: 'INTERVIEW READINESS: IMMEDIATE AVAILABILITY FOR TECHNICAL ROUNDS', color: 'text-emerald-400 font-bold' },
      { id: 'c5', prefix: '[0.098s]', text: 'PACKET STATUS: 200 OK · 0% PACKET LOSS · ROUNDTRIP LATENCY 0.04ms', color: 'text-cyan-400' },
    ],
  };

  // Start typewriter streaming when activeTab changes
  useEffect(() => {
    startTypewriterForTab(activeTab);
    return () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [activeTab]);

  const startTypewriterForTab = (tabKey: string) => {
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }
    const targetLines = logData[tabKey] || logData.profile;
    setCompletedLines([]);
    setCurrentLinePartial('');
    setCurrentLineIndex(0);
    setIsTyping(true);

    typeLine(targetLines, 0, 0);
  };

  const typeLine = (lines: LogLine[], lineIdx: number, charIdx: number) => {
    if (lineIdx >= lines.length) {
      setIsTyping(false);
      setCurrentLinePartial('');
      return;
    }

    const currentLine = lines[lineIdx];
    const fullText = currentLine.text;

    if (charIdx < fullText.length) {
      // Type next character
      setCurrentLinePartial(fullText.substring(0, charIdx + 1));
      setCurrentLineIndex(lineIdx);

      // Typing speed: 12ms per character for brisk, natural terminal feel
      typingTimeoutRef.current = window.setTimeout(() => {
        typeLine(lines, lineIdx, charIdx + 1);
      }, 12);
    } else {
      // Completed current line, commit it to completedLines
      setCompletedLines((prev) => [...prev, currentLine]);
      setCurrentLinePartial('');

      // Inter-line micro pause: 45ms before starting next line
      typingTimeoutRef.current = window.setTimeout(() => {
        typeLine(lines, lineIdx + 1, 0);
      }, 45);
    }

    // Keep terminal scrolled to bottom while streaming
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  // Instant skip button so users can instantly display full output
  const handleSkipAnimation = () => {
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }
    const targetLines = logData[activeTab] || logData.profile;
    setCompletedLines(targetLines);
    setCurrentLinePartial('');
    setCurrentLineIndex(targetLines.length);
    setIsTyping(false);
  };

  const handleCommandRun = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setCompletedLines([]);
      setCurrentLinePartial('');
      setCustomHistory([]);
      setCustomInput('');
      setIsTyping(false);
      return;
    }

    if (trimmed === 'profile' || trimmed === 'system.profile') {
      setActiveTab('profile');
      startTypewriterForTab('profile');
    } else if (trimmed === 'hardware' || trimmed === 'hardware.inspect()') {
      setActiveTab('hardware');
      startTypewriterForTab('hardware');
    } else if (trimmed === 'education' || trimmed === 'academics.status()') {
      setActiveTab('education');
      startTypewriterForTab('education');
    } else if (trimmed === 'skills' || trimmed === 'skills.audit()') {
      setActiveTab('skills');
      startTypewriterForTab('skills');
    } else if (trimmed === 'contact' || trimmed === 'contact.ping()') {
      setActiveTab('contact');
      startTypewriterForTab('contact');
    } else if (trimmed === 'help') {
      setCustomHistory((prev) => [
        ...prev.slice(-3),
        `> ${customInput}`,
        'Commands available: profile, hardware, education, skills, contact, clear, help',
      ]);
    } else {
      setCustomHistory((prev) => [
        ...prev.slice(-3),
        `> ${customInput}`,
        `[EXEC ERROR] Directive '${trimmed}' not found. Try 'profile', 'hardware', 'education', 'skills', or 'contact'.`,
      ]);
    }

    setCustomInput('');
  };

  const activeLines = logData[activeTab] || logData.profile;
  const currentLineConfig = activeLines[currentLineIndex];

  return (
    <section className="py-10 bg-[#060911] border-y border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Container */}
        <div className="rounded-2xl bg-[#090f1e] border border-cyan-500/30 shadow-2xl shadow-cyan-950/20 overflow-hidden font-mono text-xs">
          
          {/* Terminal Title Bar */}
          <div className="px-4 py-2.5 bg-[#0b1326] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-300 font-semibold pl-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>surya-teja@ece-diagnostic-console:~#</span>
              </span>
            </div>

            {/* Controls & Quick Command Presets */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {presetCommands.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveTab(c.id as any);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === c.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {c.cmd}
                </button>
              ))}

              {/* Instant Skip Animation Button */}
              {isTyping && (
                <button
                  onClick={handleSkipAnimation}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
                  title="Skip typewriter animation and display full log immediately"
                >
                  <FastForward className="w-3 h-3 text-cyan-400" />
                  <span>Instant</span>
                </button>
              )}
            </div>
          </div>

          {/* Terminal Output Area with Typewriter Rendering */}
          <div
            ref={terminalBodyRef}
            onClick={handleSkipAnimation}
            className="p-5 space-y-2 text-slate-300 leading-relaxed min-h-[220px] max-h-[380px] overflow-y-auto cursor-text select-text scroll-smooth"
          >
            {/* Previously completed lines */}
            {completedLines.map((line) => (
              <div key={line.id} className="flex items-start gap-2.5 leading-snug">
                {line.prefix && (
                  <span className="text-cyan-400/80 shrink-0 font-bold select-none text-[11px]">
                    {line.prefix}
                  </span>
                )}
                <span className={`${line.color || 'text-slate-200'} text-[12px]`}>
                  {line.text}
                </span>
              </div>
            ))}

            {/* Currently animating typewriter line */}
            {isTyping && currentLineConfig && (
              <div className="flex items-start gap-2.5 leading-snug animate-fadeIn">
                {currentLineConfig.prefix && (
                  <span className="text-cyan-400 shrink-0 font-bold select-none text-[11px]">
                    {currentLineConfig.prefix}
                  </span>
                )}
                <span className={`${currentLineConfig.color || 'text-slate-200'} text-[12px]`}>
                  {currentLinePartial}
                  <span className="inline-block w-2 h-3.5 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
                </span>
              </div>
            )}

            {/* Idle cursor when typing finishes */}
            {!isTyping && (
              <div className="pt-1 flex items-center gap-2 text-slate-300 text-[11px]">
                <span className="text-emerald-400 font-bold">READY</span>
                <span>— awaiting next diagnostic directive</span>
                <span className="inline-block w-2 h-3 bg-cyan-400 animate-pulse" />
              </div>
            )}

            {/* Custom interactive execution log */}
            {customHistory.length > 0 && (
              <div className="pt-3 mt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                {customHistory.map((item, idx) => (
                  <p
                    key={idx}
                    className={
                      item.startsWith('>')
                        ? 'text-cyan-400 font-bold'
                        : item.startsWith('[EXEC ERROR]')
                        ? 'text-rose-400'
                        : 'text-slate-300'
                    }
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Input Bar */}
          <form
            onSubmit={handleCommandRun}
            className="px-4 py-2.5 bg-[#0b1326] border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-bold select-none">&gt;</span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Try typing 'hardware', 'education', 'skills', 'contact', or 'clear'..."
              className="flex-1 bg-transparent border-none text-slate-200 text-xs placeholder:text-slate-300 focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/50 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Execute</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>

        </div>

        {/* Diagnostic console note */}
        <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-300 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>REAL-TIME SYSTEM DIAGNOSTIC READOUT</span>
          </div>
          <span>CLICK ANY PRESET OR TYPE DIRECTIVES</span>
        </div>

      </div>
    </section>
  );
};
