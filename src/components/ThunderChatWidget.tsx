import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Zap, 
  X, 
  Send, 
  RotateCcw, 
  Copy, 
  Check, 
  ChevronDown, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  Mail
} from 'lucide-react';
import { sendThunderMessage, ChatMessage } from '../services/thunderService';
import { RESUME_DATA } from '../data/resumeData';

export interface ThunderChatWidgetProps {
  externalOpen?: boolean;
  onCloseExternal?: () => void;
}

export const ThunderChatWidget: React.FC<ThunderChatWidgetProps> = ({
  externalOpen,
  onCloseExternal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptedGreeting, setHasPromptedGreeting] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'thunder',
      text: `Hello! I am **Thunder**, Surya Teja's official AI Portfolio Guide.

I have full ground-truth access to Surya's academic records, 6-month embedded systems internship at Protective Technologies, DSA training, microcontroller skills, and verified dossier.

How can I help you evaluate Surya today?`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external open trigger
  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsOpen(externalOpen);
      if (externalOpen) {
        setHasPromptedGreeting(false);
      }
    }
  }, [externalOpen]);

  // Auto-scroll when messages change or loading state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setHasPromptedGreeting(false);
    }
    if (!nextState && onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const replyText = await sendThunderMessage(query, messages);
      const thunderMessage: ChatMessage = {
        id: `thunder-${Date.now()}`,
        sender: 'thunder',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, thunderMessage]);
    } catch {
      const thunderErrorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'thunder',
        text: `I apologize, I encountered a temporary connection glitch. Surya is an ECE graduate with expertise in Embedded Systems (8051) and Java DSA. You can reach him directly at ${RESUME_DATA.personal.email}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, thunderErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'thunder',
        text: `Conversation cleared. I am ready to answer any questions about Surya Teja's background, embedded systems projects, or recruitment details.`,
        timestamp: 'Just now',
      },
    ]);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickQuestions = [
    { label: "Tell me about his internships", icon: Briefcase, query: "Tell me about Surya Teja's internship experience and hands-on industrial training." },
    { label: "What are his core technical skills?", icon: Cpu, query: "What are Surya's core technical skills, microcontrollers, and programming languages?" },
    { label: "What is his academic record?", icon: GraduationCap, query: "What is Surya Teja's educational background, B.Tech and Diploma scores?" },
    { label: "How can I contact Surya?", icon: Mail, query: "How do I contact or hire Surya Teja? What is his location and availability?" },
  ];

  // Helper to render simple markdown cleanly (bold, lists, links)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Render bullet points
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-cyan-400 font-bold mt-0.5">•</span>
                <span className="flex-1">{formatInlineMarkup(content)}</span>
              </div>
            );
          }

          // Numbered lists (e.g. 1. )
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-cyan-400 font-mono text-[11px] font-semibold mt-0.5">{numMatch[1]}.</span>
                <span className="flex-1">{formatInlineMarkup(numMatch[2])}</span>
              </div>
            );
          }

          return <p key={idx}>{formatInlineMarkup(trimmed)}</p>;
        })}
      </div>
    );
  };

  const formatInlineMarkup = (text: string): React.ReactNode => {
    // Parse bold **text** and [link](url)
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 font-medium"
          >
            {linkMatch[1]}
          </a>
        );
      }

      return part;
    });
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING CHAT TRIGGER BUBBLE (Bottom Corner)
          ========================================================================= */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 select-none">
        
        {/* Subtle greeting bubble shown initially */}
        {!isOpen && hasPromptedGreeting && (
          <div className="relative group bg-[#090f1f]/95 backdrop-blur-md border border-cyan-500/40 text-slate-200 text-xs py-2.5 px-3.5 rounded-2xl shadow-xl shadow-cyan-950/40 max-w-[260px] animate-bounce-subtle">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasPromptedGreeting(false);
              }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-[10px] border border-slate-700"
              title="Dismiss"
            >
              ×
            </button>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0 animate-ping" />
              <div>
                <p className="font-semibold text-cyan-300 text-[11px] mb-0.5 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Thunder · AI Assistant</span>
                </p>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Ask me about Surya Teja's embedded systems, projects, or background!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={handleToggle}
          type="button"
          aria-label={isOpen ? 'Close Thunder AI Assistant' : 'Open Thunder AI Assistant'}
          className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 cursor-pointer border ${
            isOpen
              ? 'bg-slate-900 border-cyan-500/50 text-cyan-400 shadow-cyan-900/30'
              : 'bg-[#091224] hover:bg-[#0c1830] border-cyan-500/60 text-slate-100 hover:border-cyan-400 shadow-cyan-950/60 hover:shadow-cyan-500/20'
          }`}
        >
          {/* Avatar / Bot Icon with glowing pulse ring */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-cyan-400 group-hover:scale-105 transition-transform">
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-cyan-300" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            )}
            {/* Live active indicator */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#070b14]" />
          </div>

          <div className="text-left font-sans">
            <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Thunder</span>
              <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                AI
              </span>
            </div>
            <div className="text-[10px] text-slate-400 leading-none">
              {isOpen ? 'Click to minimize' : 'Ask anything about Surya'}
            </div>
          </div>
        </button>

      </div>

      {/* =========================================================================
          2. EXPANDABLE CHAT PANEL (Anchored Bottom-Right)
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Thunder AI Portfolio Assistant"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[550px] max-h-[82vh] bg-[#090f20]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden animate-fadeIn font-sans"
        >
          {/* Panel Header */}
          <div className="px-4 py-3 bg-[#0b1428] border-b border-slate-800/90 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-sm">
                <Zap className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0b1428]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">Thunder</h3>
                  <span className="font-mono text-[9px] text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    PORTFOLIO AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Surya Teja's Official AI Guide</span>
                </p>
              </div>
            </div>

            {/* Header controls: Clear chat & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                type="button"
                className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleToggle}
                type="button"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                title="Close Thunder"
                aria-label="Close Thunder"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel Message Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scroll-smooth select-text">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {(msg.sender === 'thunder' || msg.sender === 'vishva') && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`relative group max-w-[84%] rounded-2xl p-3 text-xs leading-relaxed transition-all ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-cyan-500/20'
                      : 'bg-[#0d162d] border border-slate-800/90 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    renderFormattedText(msg.text)
                  )}

                  {/* Metadata and Quick Copy */}
                  <div className="mt-2 pt-1.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/50">
                    <span className={msg.sender === 'user' ? 'text-cyan-900 font-mono' : 'text-slate-400 font-mono'}>
                      {msg.timestamp}
                    </span>

                    {(msg.sender === 'thunder' || msg.sender === 'vishva') && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#0d162d] border border-slate-800 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-slate-300 flex items-center gap-1.5 shadow-md">
                  <span className="text-[11px] text-cyan-400 font-mono">Thunder is thinking</span>
                  <div className="flex items-center gap-1 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Question Starters */}
          <div className="px-3 pt-2 pb-1.5 bg-[#080d1a] border-t border-slate-800/80 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-[11px] whitespace-nowrap pb-1">
              {quickQuestions.map((q) => {
                const Icon = q.icon;
                return (
                  <button
                    key={q.label}
                    onClick={() => handleSendMessage(q.query)}
                    disabled={isLoading}
                    type="button"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/70 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    <Icon className="w-3 h-3 text-cyan-400" />
                    <span>{q.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Bar Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0a1226] border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Thunder about Surya's skills, projects, background..."
              disabled={isLoading}
              className="flex-1 bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-3 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 font-semibold text-xs flex items-center justify-center transition-all cursor-pointer shadow-sm shadow-cyan-400/20 disabled:cursor-not-allowed"
              title="Send Message"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Ground Truth Disclaimer */}
          <div className="px-3 py-1 bg-[#070b14] text-[10px] font-mono text-slate-300 flex items-center justify-between border-t border-slate-900">
            <span>GROUNDED IN VERIFIED DOSSIER</span>
            <span className="text-cyan-400/80">GEMINI 3.8 FLASH</span>
          </div>

        </div>
      )}
    </>
  );
};
