import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, Linkedin, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a message or inquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build mailto url
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${RESUME_DATA.personal.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#060a13] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>08</span>
            <span aria-hidden="true">·</span>
            <span>DIRECT ENGAGEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LET'S BUILD SOMETHING USEFUL.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            Interested in engineering, embedded systems, AI, technology and practical problem solving? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Direct Verified Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#090f1f] border border-cyan-500/20 p-8 space-y-6">
              
              {/* Phone */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-300">DIRECT PHONE</div>
                    <a
                      href={`tel:${RESUME_DATA.personal.phone.replace(/\s+/g, '')}`}
                      className="text-base font-bold text-white hover:text-cyan-300 font-mono transition-colors"
                    >
                      {RESUME_DATA.personal.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(RESUME_DATA.personal.phone, 'phone')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-start justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="break-all">
                    <div className="text-xs font-mono text-slate-300">EMAIL ADDRESS</div>
                    <a
                      href={`mailto:${RESUME_DATA.personal.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 font-mono transition-colors"
                    >
                      {RESUME_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(RESUME_DATA.personal.email, 'email')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors shrink-0"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn Network */}
              <div className="flex items-start justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-300">LINKEDIN NETWORK</div>
                    <a
                      href={RESUME_DATA.personal.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-blue-300 hover:text-white font-mono transition-colors"
                    >
                      <span>in/surya-yelubandi</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    </a>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Professional profile & network connections
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(RESUME_DATA.personal.linkedin, 'linkedin')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors shrink-0"
                  title="Copy LinkedIn URL"
                >
                  {copiedField === 'linkedin' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-300">BASE LOCATION</div>
                  <div className="text-sm font-semibold text-white">
                    {RESUME_DATA.personal.location}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Open to relocation & hybrid engineering roles.
                  </div>
                </div>
              </div>

            </div>

            {/* Recruiter / Quick note */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-semibold">
                RECRUITER & INTERVIEWER NOTE
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Available for technical interviews, internship programs, and junior engineering roles across Embedded Systems, Firmware, Applied AI, and Software Engineering.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#090f1f] border border-cyan-500/30 p-8 shadow-xl">
              
              <div className="mb-6 pb-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  Send a Direct Message
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  SECURE CLIENT DISPATCH
                </span>
              </div>

              {/* Form implementation */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan / Technical Recruiter"
                    className="w-full bg-[#0a1326] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@company.com"
                    className="w-full bg-[#0a1326] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Embedded Systems Internship / Project Discussion"
                    className="w-full bg-[#0a1326] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Message / Inquiry Details *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note, job opportunity details, or collaboration ideas..."
                    className="w-full bg-[#0a1326] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-300 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Clear Architecture Notice: No fake mock backend */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                  <span className="text-cyan-400 font-mono font-bold">INFO:</span>
                  <span>
                    Submitting this form routes directly to your native mail client addressed to <strong className="text-cyan-300 font-mono">yelubandisuryateja@gmail.com</strong>.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Directly</span>
                </button>
              </form>

              {submitted && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your email client was triggered with your pre-formatted note!</span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
