import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Instagram, Mail, Calendar, ArrowRight } from 'lucide-react';
import { NestaLogo } from './NestaLogo';
import { CONTACT_INFO } from '../data/programsData';

interface NavbarProps {
  onOpenBooking: (discipline?: any, ageGroup?: any, slot?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Disciplines', href: '#disciplines' },
    { label: 'Class Schedule', href: '#schedule' },
    { label: 'Pricing & Plans', href: '#pricing' },
    { label: 'About Studio', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro contact bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-xs py-1.5 px-4 sm:px-8 text-slate-400 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: <strong className="text-slate-200">{CONTACT_INFO.whatsappFormatted}</strong></span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-blue-400 transition"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-pink-400 transition"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </a>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">Parkour • Calisthenics • Yoga • Wing Chun</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-xl py-3'
            : 'bg-slate-950/70 backdrop-blur-md border-b border-slate-850 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative p-1.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 transition">
              <NestaLogo className="h-9 px-2" theme="dark" />
            </div>
            <div className="hidden lg:block">
              <span className="block text-[11px] font-semibold text-blue-400 tracking-wider uppercase">
                Movement Studio
              </span>
              <span className="block text-[10px] text-slate-400">
                Agility • Strength • Flow • Martial Art
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 hover:bg-emerald-900/50 transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{CONTACT_INFO.whatsappFormatted}</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 active:scale-95 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Trial</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition"
            >
              Book Trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-850 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-200" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drop down */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-sm font-semibold"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  WhatsApp: {CONTACT_INFO.whatsappFormatted}
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                {CONTACT_INFO.email}
              </a>

              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                Instagram
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
