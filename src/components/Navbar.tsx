import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Zap } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenThunder?: () => void;
  onOpenVishva?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenThunder, onOpenVishva }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleOpenAssistant = onOpenThunder || onOpenVishva;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Portrait', href: '#headshot-guide' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#070b14]/90 backdrop-blur-md border-cyan-500/20 shadow-lg shadow-cyan-950/20 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="#"
          className="group flex items-center gap-2 text-slate-100 hover:text-cyan-400 transition-colors"
        >
          <span className="font-bold tracking-tight text-base sm:text-lg">
            {RESUME_DATA.personal.fullName}
          </span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-cyan-400/80 px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">
            ECE
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-cyan-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          {handleOpenAssistant && (
            <button
              onClick={handleOpenAssistant}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 rounded-lg transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask Thunder</span>
            </button>
          )}

          <button
            onClick={onOpenResume}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#070b14] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-sm shadow-cyan-400/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          {handleOpenAssistant && (
            <button
              onClick={handleOpenAssistant}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-md"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>Thunder</span>
            </button>
          )}

          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 text-xs font-semibold text-slate-900 bg-cyan-400 rounded-md"
          >
            CV
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle menu"
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1020] border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            {handleOpenAssistant && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenAssistant();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-lg cursor-pointer"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Ask Thunder AI Guide</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
