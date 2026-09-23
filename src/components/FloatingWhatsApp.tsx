import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/programsData';

export const FloatingWhatsApp: React.FC = () => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {!minimized && (
        <div className="hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-xs text-white backdrop-blur-md max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <div className="flex-1">
            <span className="font-bold text-slate-100 block">Got questions about classes?</span>
            <span className="text-slate-400 text-[11px]">Chat directly on WhatsApp</span>
          </div>
          <button
            onClick={() => setMinimized(true)}
            className="p-1 rounded text-slate-400 hover:text-white"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold shadow-xl shadow-emerald-500/30 active:scale-95 transition-all duration-300"
        title="Chat on WhatsApp (+91 9447330287)"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-slate-950" />
        <span className="text-xs font-black tracking-wide hidden sm:inline">
          Chat WhatsApp
        </span>
        <span className="text-xs font-bold text-emerald-950 bg-emerald-300/60 px-1.5 py-0.5 rounded-md text-[10px] hidden md:inline">
          {CONTACT_INFO.whatsappFormatted}
        </span>
      </a>
    </div>
  );
};
