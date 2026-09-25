import React, { useState } from 'react';
import {
  Check,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { DISCIPLINES } from '../data/programsData';
import { DisciplineId } from '../types';
import { useDisciplineImages } from '../context/DisciplineImageContext';
import { DisciplineImageDisplay } from './DisciplineImageDisplay';

interface ServicesSectionProps {
  onOpenBooking: (discipline: DisciplineId, ageGroup?: 'Kids' | 'Adults') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<DisciplineId>('parkour');

  const { getImageForDiscipline } = useDisciplineImages();

  const selectedDiscipline = DISCIPLINES.find((d) => d.id === activeTab) || DISCIPLINES[0];
  const activeDisciplineImage = getImageForDiscipline(selectedDiscipline.id, selectedDiscipline.imageUrl);

  return (
    <section id="disciplines" className="py-24 bg-slate-950 relative border-t border-slate-900">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            Four Paths to Physical Mastery
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Every program at Nesta Movement Studio is engineered with scientific progressions, uncompromising safety
            standards, and dedicated coaching for both children and adults.
          </p>
        </div>

        {/* Tab Navigation Selector */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 gap-2 sm:gap-3 mb-12 scrollbar-none">
          {DISCIPLINES.map((discipline) => {
            const isActive = activeTab === discipline.id;
            return (
              <button
                key={discipline.id}
                onClick={() => setActiveTab(discipline.id)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-850 border border-slate-800'
                }`}
              >
                <span>{discipline.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {discipline.targetAudience}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Feature Showcase */}
        <div
          key={selectedDiscipline.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch transition-all duration-300"
        >
            {/* Visual Photography Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <DisciplineImageDisplay
                disciplineId={selectedDiscipline.id}
                disciplineName={selectedDiscipline.name}
                imageUrl={activeDisciplineImage}
                badgeText={selectedDiscipline.badgeText}
                monthlyFee={selectedDiscipline.monthlyFee}
                sessionsPerMonth={selectedDiscipline.sessionsPerMonth}
              />

              {/* Session Format & Quick Action Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 p-5 hidden sm:flex items-center justify-between backdrop-blur-md">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold text-blue-400 tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Session Format
                  </div>
                  <div className="text-sm font-semibold text-white">{selectedDiscipline.sessionDuration}</div>
                </div>
                <button
                  onClick={() => onOpenBooking(selectedDiscipline.id)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition shadow-sm"
                >
                  Try This Discipline
                </button>
              </div>
            </div>

            {/* Detailed Content & Syllabus (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm">
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      {selectedDiscipline.targetAudience}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                      {selectedDiscipline.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedDiscipline.sessionDuration}
                    </span>
                  </div>
                </div>

                {/* Tagline & Description */}
                <p className="mt-4 text-base sm:text-lg text-slate-200 font-medium">
                  {selectedDiscipline.tagline}
                </p>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {selectedDiscipline.description}
                </p>

                {/* Movement Philosophy */}
                <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Movement Philosophy
                  </span>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{selectedDiscipline.philosophy}"
                  </p>
                </div>

                {/* Monthly Schedule & Timing Block */}
                <div
                  className={`mt-5 p-4 rounded-xl border transition-all ${
                    selectedDiscipline.id === 'wing-chun'
                      ? 'bg-rose-950/30 border-rose-800/60 shadow-lg shadow-rose-950/20'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar
                        className={`w-4 h-4 ${
                          selectedDiscipline.id === 'wing-chun' ? 'text-rose-400' : 'text-blue-400'
                        }`}
                      />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Monthly Schedule & Timings
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        selectedDiscipline.id === 'wing-chun'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {selectedDiscipline.sessionsPerMonth} Sessions / Month
                    </span>
                  </div>

                  {selectedDiscipline.id === 'wing-chun' ? (
                    <div className="space-y-3 pt-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-rose-900/50">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex flex-col items-center justify-center font-bold text-xs">
                            <span className="text-[10px] text-rose-300 font-normal">EVERY</span>
                            <span>FRI</span>
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-white flex items-center gap-2">
                              <span>Friday Evening Session</span>
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-semibold border border-rose-500/30">
                                4 Sessions / Month
                              </span>
                            </div>
                            <div className="text-xs text-rose-300 font-semibold flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>6:00 PM – 8:00 PM (2 Hours Deep Dive)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex items-center sm:block gap-2 sm:gap-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                            Target Group
                          </span>
                          <span className="text-xs font-bold text-emerald-400">Strictly Adults (16+)</span>
                        </div>
                      </div>

                      {/* 4 Weekly Sessions Progression in a Month */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Monthly 4-Week Curriculum Roadmap:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-600/20 text-rose-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              1
                            </span>
                            <div>
                              <strong className="text-white block font-semibold text-[11px]">
                                Week 1 (Fri 6-8 PM): Siu Nim Tao & Rooting
                              </strong>
                              <span className="text-[10px] text-slate-400">
                                Centerline geometry, stance rooting & structural power.
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-600/20 text-rose-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              2
                            </span>
                            <div>
                              <strong className="text-white block font-semibold text-[11px]">
                                Week 2 (Fri 6-8 PM): Chi Sau Sensitivity
                              </strong>
                              <span className="text-[10px] text-slate-400">
                                Tactile sticky hands, energy redirection & reflex flow.
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-600/20 text-rose-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              3
                            </span>
                            <div>
                              <strong className="text-white block font-semibold text-[11px]">
                                Week 3 (Fri 6-8 PM): Muk Yan Jong (Dummy)
                              </strong>
                              <span className="text-[10px] text-slate-400">
                                Wooden dummy conditioning, limb trapping & deflection angles.
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-rose-600/20 text-rose-300 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              4
                            </span>
                            <div>
                              <strong className="text-white block font-semibold text-[11px]">
                                Week 4 (Fri 6-8 PM): Tactical Applications
                              </strong>
                              <span className="text-[10px] text-slate-400">
                                Close-quarter trapping, centerline control under pressure.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 pt-1 gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span>{selectedDiscipline.scheduleDays || selectedDiscipline.sessionDuration}</span>
                      </div>
                      <span className="text-[11px] text-blue-400 font-semibold">
                        {selectedDiscipline.scheduleDetails}
                      </span>
                    </div>
                  )}
                </div>

                {/* Key Syllabus & Curriculum */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Core Elements Taught
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {selectedDiscipline.keyElements.map((elem, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{elem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Conditioning & Benefits
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {selectedDiscipline.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-slate-400 w-full sm:w-auto">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>
                      {selectedDiscipline.id === 'parkour'
                        ? 'Kids (6-15) & Adults (16+)'
                        : 'Strictly Adults (16+)'}
                    </span>
                  </div>
                  <span>•</span>
                  <span>1-Month Fee: <strong className="text-white">₹{selectedDiscipline.monthlyFee}</strong></span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#schedule"
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition text-center flex-1 sm:flex-initial"
                  >
                    View Timetable
                  </a>
                  <button
                    onClick={() => onOpenBooking(selectedDiscipline.id)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition active:scale-95 flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                  >
                    <span>Book Trial Class</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
        </div>

        {/* Quick Grid of all 4 disciplines preview cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISCIPLINES.map((d) => (
            <div
              key={d.id}
              onClick={() => setActiveTab(d.id)}
              className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 ${
                activeTab === d.id
                  ? 'bg-slate-900 border-blue-500 ring-1 ring-blue-500/50'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">{d.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-blue-300 font-semibold">
                  ₹{d.monthlyFee}/mo
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{d.tagline}</p>
              <div className="mt-3 text-[11px] text-blue-400 flex items-center gap-1 font-medium">
                <span>Explore Details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Wing Chun Monthly Schedule Section */}
        <div
          id="wing-chun-monthly-schedule"
          className="mt-16 rounded-3xl overflow-hidden border border-rose-900/60 bg-gradient-to-br from-rose-950/40 via-slate-900/95 to-slate-950 shadow-2xl relative"
        >
          {/* Decorative ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="p-6 sm:p-10 relative z-10">
            {/* Header Tag & Title */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Shield className="w-3.5 h-3.5 text-rose-400" />
                <span>Wing Chun Program • Monthly Schedule</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                Wing Chun Monthly Schedule
              </h3>
              <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
                Our traditional Wing Chun Kung Fu curriculum is structured into{' '}
                <strong className="text-white">four focused sessions per month</strong>, held{' '}
                <strong className="text-rose-400">every Friday from 6:00 PM to 8:00 PM</strong>. Each 2-hour
                session delivers intensive coaching in centerline structure, tactile sensitivity (Chi Sau), and
                wooden dummy mechanics for adults.
              </p>
            </div>

            {/* 3 Core Schedule Highlights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {/* Card 1: 4 Sessions / Month */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-rose-900/50 hover:border-rose-700/60 transition shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-extrabold text-base">
                    4
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                    Monthly Allocation
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-display">4 Sessions / Month</div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  One deep-dive session every single week of the month, designed for progressive neuromuscular reflex
                  adaptation.
                </p>
              </div>

              {/* Card 2: Every Friday 6 to 8 PM */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-rose-900/50 hover:border-rose-700/60 transition shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                    Weekly Slot
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-display">Every Friday: 6 – 8 PM</div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Intensive <strong>2-hour session</strong> (6:00 PM – 8:00 PM) allowing thorough form work,
                  repetitive drills, and free sparring flow.
                </p>
              </div>

              {/* Card 3: Adults Only */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-rose-900/50 hover:border-rose-700/60 transition shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Eligibility
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-display">Strictly Adults (16+)</div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Serious martial environment tailored for mature practitioners, ensuring disciplined partner work and
                  safety.
                </p>
              </div>
            </div>

            {/* Monthly 4-Session Breakdown Progression */}
            <div className="mt-8 pt-6 border-t border-rose-950">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-400" />
                <span>4-Week Monthly Session Breakdown (Every Friday 6:00 PM – 8:00 PM)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Week 1 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      Session 1 • 1st Friday
                    </span>
                    <span className="text-[10px] text-slate-400">6:00 – 8:00 PM</span>
                  </div>
                  <div className="font-bold text-white text-sm mb-1">Centerline & Siu Nim Tao</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Stance rooting, Yee Jee Kim Yeung Ma balance, fundamental punch mechanics, and centerline defensive angles.
                  </p>
                </div>

                {/* Week 2 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      Session 2 • 2nd Friday
                    </span>
                    <span className="text-[10px] text-slate-400">6:00 – 8:00 PM</span>
                  </div>
                  <div className="font-bold text-white text-sm mb-1">Chi Sau & Tactile Sensitivity</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Sticky hands training: Dan Chi Sau (single) and Seung Chi Sau (double), learning to read opponent pressure through tactile reflex.
                  </p>
                </div>

                {/* Week 3 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      Session 3 • 3rd Friday
                    </span>
                    <span className="text-[10px] text-slate-400">6:00 – 8:00 PM</span>
                  </div>
                  <div className="font-bold text-white text-sm mb-1">Wooden Dummy & Trapping</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Muk Yan Jong (wooden dummy) conditioning, simultaneous block-and-strike (Lin Sil Dai Da), and angles of limb trapping.
                  </p>
                </div>

                {/* Week 4 */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      Session 4 • 4th Friday
                    </span>
                    <span className="text-[10px] text-slate-400">6:00 – 8:00 PM</span>
                  </div>
                  <div className="font-bold text-white text-sm mb-1">Close-Quarter Combat Flow</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Practical self-defense applications, reaction flow under stress, Chum Kiu footwork transitions, and stance recovery.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action Bar */}
            <div className="mt-8 pt-6 border-t border-rose-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Wing Chun Program Fee
                </div>
                <div className="text-2xl font-extrabold text-white font-display">
                  ₹2,500 <span className="text-xs font-normal text-slate-400">/ month (Includes all 4 sessions)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setActiveTab('wing-chun');
                    window.scrollTo({ top: document.getElementById('programs')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl border border-rose-800 text-rose-300 hover:text-white hover:bg-rose-900/40 text-xs font-semibold transition text-center flex-1 sm:flex-initial"
                >
                  View Wing Chun Syllabus
                </button>
                <button
                  onClick={() => onOpenBooking('wing-chun', 'Adults')}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition active:scale-95 flex items-center justify-center gap-2 flex-1 sm:flex-initial"
                >
                  <span>Book Friday Wing Chun Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
