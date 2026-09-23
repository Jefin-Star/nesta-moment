import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle, ArrowRight, ShieldCheck, Flame, Compass, ChevronDown } from 'lucide-react';
import { CONTACT_INFO } from '../data/programsData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-8 pb-16">
      {/* Background Graphic & Subtle Glow Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 left-1/4 w-[450px] h-[450px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[120px]" />

        {/* Dynamic geometric subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-blue-300 mb-6 shadow-inner backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Kerala's Premier Movement & Agility Facility</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">New Batches Now Enrolling</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display uppercase max-w-5xl mx-auto leading-[1.08]"
        >
          Master Your Body.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Defy Your Limits.
          </span>
        </motion.h1>

        {/* Subtitle description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Welcome to <strong className="text-white font-semibold">Nesta Movement Studio</strong>. An elite, intentional training space combining the spatial mastery of{' '}
          <span className="text-blue-300 font-medium">Parkour</span>, the raw strength of{' '}
          <span className="text-amber-300 font-medium">Calisthenics</span>, the kinetic decompression of{' '}
          <span className="text-emerald-300 font-medium">Yoga</span>, and the centerline precision of{' '}
          <span className="text-rose-300 font-medium">Wing Chun</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
        >
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Chat on WhatsApp ({CONTACT_INFO.whatsappFormatted})</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 active:scale-[0.98] transition border border-blue-400/30"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Trial Class</span>
          </button>
        </motion.div>

        {/* Quick Nav Anchors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400 font-medium"
        >
          <a href="#schedule" className="hover:text-blue-400 transition flex items-center gap-1">
            <span>View Interactive Schedule</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <span>•</span>
          <a href="#pricing" className="hover:text-blue-400 transition flex items-center gap-1">
            <span>Transparent Pricing from ₹2,000</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Studio Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left max-w-5xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-blue-400 mb-2">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">Parkour</div>
            <div className="text-xs text-slate-400 mt-1">
              Kids & Adults separate tracks. Vaults, spatial agility, & safe landings.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-amber-400 mb-2">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">Calisthenics</div>
            <div className="text-xs text-slate-400 mt-1">
              Adults Only. <strong>2 to 2.5 hours</strong> per session of intense bodyweight mastery.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">Yoga</div>
            <div className="text-xs text-slate-400 mt-1">
              Adults Only. Morning (6:30 AM) & Evening (6 PM) mobility & breathwork.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-rose-400 mb-2">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-display">Wing Chun</div>
            <div className="text-xs text-slate-400 mt-1">
              Traditional Chinese Kung Fu, Chi Sau sensitivity & centerline defense.
            </div>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#disciplines"
            aria-label="Scroll to Disciplines"
            className="p-2 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition animate-bounce"
          >
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
