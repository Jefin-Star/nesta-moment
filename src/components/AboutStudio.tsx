import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Compass,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  Zap,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/programsData';

export const AboutStudio: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I need prior athletic experience or gymnastics background to join?',
      a: 'No prior experience is necessary. All programs at Nesta Movement Studio—including Parkour, Calisthenics, Yoga, and Wing Chun—are structured with foundational progressions. Our coaches scale every movement to your current strength, mobility, and confidence level.',
    },
    {
      q: 'Why are Calisthenics sessions 2 to 2.5 hours long?',
      a: 'Unlike standard gym workouts that rush through sets, our extended Calisthenics format allows for comprehensive joint preparation, straight-arm tendon conditioning, dedicated skill practice (handstands, muscle-ups, levers), strength volume, and thorough mobility decompression without risk of injury.',
    },
    {
      q: 'How are Kids and Adults separated in Parkour?',
      a: 'Safety and age-appropriate pedagogy are paramount. Kids (ages 6–15) train in dedicated sessions focusing on motor coordination, spatial play, risk assessment, and safe landings. Adults train in evening sessions focusing on functional agility, power, obstacle navigation, and adult biomechanics.',
    },
    {
      q: 'What should I bring and wear to my first class?',
      a: 'Wear comfortable athletic attire allowing full range of motion (track pants/shorts, breathable t-shirt). For Parkour and Calisthenics, wear flexible athletic shoes with good rubber grip. Yoga and Wing Chun are practiced barefoot or in grip socks.',
    },
    {
      q: 'How do I book a trial class or enroll?',
      a: `Simply click any "Book Trial" or WhatsApp button, or message us directly on WhatsApp at ${CONTACT_INFO.whatsappFormatted}. Our coaching staff will confirm your slot and guide you through the process.`,
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Studio Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight leading-tight">
              Redefining Human Movement
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              At <strong className="text-white">Nesta Movement Studio</strong>, we believe modern fitness has become
              isolated and repetitive. Our mission is to restore natural human agility, spatial freedom, and resilience
              through multidisciplinary bodyweight arts.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Whether you are an energetic child learning to vault obstacles safely, an adult unlocking their first strict
              muscle-up, a practitioner seeking spinal decompression in yoga, or cultivating unwavering centerline
              composure through traditional Wing Chun, our coaches guide every step with patience and science.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-blue-400 mb-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white font-display">Zero-Ego Culture</div>
                <div className="text-xs text-slate-400 mt-0.5">Encouraging and beginner-safe training environment.</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-emerald-400 mb-1">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white font-display">Custom Facilities</div>
                <div className="text-xs text-slate-400 mt-0.5">Calisthenics rigs, crash mats, wooden dummy kwoon.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
                alt="Nesta Movement Studio Atmosphere"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                      Direct Coach Access
                    </span>
                    <span className="text-sm font-bold text-white font-display">
                      Need help picking the right discipline?
                    </span>
                  </div>
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
                  >
                    Ask a Coach
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Everything you need to know before attending your first session at Nesta.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition"
                  >
                    <span className="text-sm sm:text-base font-bold text-white font-display">{faq.q}</span>
                    <span className="p-1 rounded-lg bg-slate-800 text-slate-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-850 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
