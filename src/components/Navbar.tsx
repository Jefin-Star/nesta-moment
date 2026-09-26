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
    { label: 'Schedule', href: '#schedule' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
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
            ? 'bg-black/95 backdrop-blur-xl border-b border-neutral-900 shadow-xl py-3'
            : 'bg-black/90 backdrop-blur-md border-b border-neutral-900/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 1. Brand Logo */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <a href="#" className="flex items-center group focus:outline-none py-1">
              <NestaLogo
                size="lg"
                className="h-10 sm:h-11 md:h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
                theme="dark-blue"
                solidBackground={true}
              />
            </a>
          </div>

          {/* 2. Desktop Nav Links - Evenly centered with consistent font, size, and padding */}
          <nav className="hidden md:flex items-center justify-center flex-initial gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 lg:px-4 py-2 text-sm font-medium tracking-normal text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-150 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. Action CTAs */}
          <div className="flex-1 hidden sm:flex items-center justify-end gap-3 min-w-0">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 hover:bg-emerald-900/50 transition whitespace-nowrap"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{CONTACT_INFO.whatsappFormatted}</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 active:scale-95 transition whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
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
