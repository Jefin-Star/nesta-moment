import React from 'react';
import { MessageCircle, Mail, Instagram, ArrowUp } from 'lucide-react';
import { NestaLogo } from './NestaLogo';
import { CONTACT_INFO } from '../data/programsData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <NestaLogo size="xl" className="h-11 sm:h-12 md:h-14 w-auto transition-transform group-hover:scale-[1.02]" theme="dark-blue" solidBackground={true} />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Nesta Movement Studio is Kerala’s dedicated home for functional human agility, relative bodyweight
              strength, kinetic breathwork, and martial arts.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center hover:bg-emerald-950/50 hover:border-emerald-800 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-pink-400 flex items-center justify-center hover:bg-pink-950/50 hover:border-pink-800 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 flex items-center justify-center hover:bg-blue-950/50 hover:border-blue-800 transition"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Disciplines Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Disciplines</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#disciplines" className="hover:text-white transition flex items-center gap-1.5">
                  <span>Parkour (Kids & Adults)</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition flex items-center gap-1.5">
                  <span>Calisthenics (Adults 2-2.5h)</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition flex items-center gap-1.5">
                  <span>Yoga (Morning & Evening)</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition flex items-center gap-1.5">
                  <span>Wing Chun (Kung Fu)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#schedule" className="hover:text-white transition">
                  Interactive Timetable
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition">
                  Pricing & Memberships
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About the Studio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact & Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Direct Contact</h4>
            <ul className="space-y-3">
              <li>
                <span className="block text-[10px] uppercase font-bold text-slate-500">WhatsApp</span>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  {CONTACT_INFO.whatsappFormatted}
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Email</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-200 hover:text-white break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Instagram</span>
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:underline"
                >
                  Instagram
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase font-bold text-slate-500">Studio Location</span>
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white block mt-0.5"
                >
                  {CONTACT_INFO.location}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="cursor-default select-none">
            © {new Date().getFullYear()} Nesta Movement Studio. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Move Freely • Defy Limits</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 transition flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
