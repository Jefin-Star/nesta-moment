import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Filter,
  Users,
  Sparkles,
  MessageCircle,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Layers,
  ChevronRight,
  Sun,
  Moon,
  MoonStar,
} from 'lucide-react';
import { SCHEDULE_SESSIONS, DAYS_OF_WEEK } from '../data/scheduleData';
import { CONTACT_INFO } from '../data/programsData';
import { DisciplineId } from '../types';

interface ScheduleSectionProps {
  onOpenBooking: (discipline?: DisciplineId, ageGroup?: 'Kids' | 'Adults', slot?: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onOpenBooking }) => {
  // Filter state
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [ageFilter, setAgeFilter] = useState<'All' | 'Kids' | 'Adults'>('All');
  const [disciplineFilter, setDisciplineFilter] = useState<'All' | DisciplineId>('All');
  const [timeOfDayFilter, setTimeOfDayFilter] = useState<'All' | 'morning' | 'evening'>('All');
  const [viewMode, setViewMode] = useState<'day-by-day' | 'full-week'>('day-by-day');
  const [activeDayTab, setActiveDayTab] = useState<string>('Monday');

  // Filtered session list
  const filteredSessions = useMemo(() => {
    return SCHEDULE_SESSIONS.filter((session) => {
      // Day filter (if not viewing via active day tab)
      if (viewMode === 'day-by-day') {
        if (session.dayOfWeek !== activeDayTab) return false;
      } else {
        if (selectedDay !== 'All' && session.dayOfWeek !== selectedDay) return false;
      }

      // Age group filter
      if (ageFilter === 'Kids' && !session.isKids) return false;
      if (ageFilter === 'Adults' && !session.isAdults) return false;

      // Discipline filter
      if (disciplineFilter !== 'All' && session.disciplineId !== disciplineFilter) return false;

      // Time of day filter
      if (timeOfDayFilter !== 'All' && session.timeOfDay !== timeOfDayFilter) return false;

      return true;
    });
  }, [viewMode, activeDayTab, selectedDay, ageFilter, disciplineFilter, timeOfDayFilter]);

  // Quick WhatsApp direct link for a specific class slot
  const getWhatsAppBookLink = (session: typeof SCHEDULE_SESSIONS[0]) => {
    const text = `Hi Nesta Movement Studio! I want to book the following session:%0A%0A*Class:* ${encodeURIComponent(
      session.title
    )}%0A*Group:* ${session.targetGroup}%0A*Day:* ${session.dayOfWeek}%0A*Time:* ${encodeURIComponent(
      session.timeSlot
    )} (${session.duration})%0A%0APlease confirm slot availability.`;
    return `https://wa.me/919447330287?text=${text}`;
  };

  return (
    <section id="schedule" className="py-24 bg-slate-900/60 relative border-t border-slate-800">
      {/* Subtle background effects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Interactive Timetable</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            Official Class Schedule
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Structured sessions tailored for peak development. Clearly segregated between{' '}
            <span className="text-blue-400 font-semibold">Kids</span> and{' '}
            <span className="text-emerald-400 font-semibold">Adults Only</span> tracks.
          </p>
        </div>

        {/* Highlight callouts for prompt-specified program timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 text-xs">
          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-blue-300 font-bold block">Parkour Segregation</strong>
              <span className="text-slate-300">
                Kids: Mon/Wed 5:30-6:30 PM, Fri 5-6 PM, Sat/Sun 10:30 AM.<br />
                Adults: Mon/Wed 7:30-9 PM, Fri 8-9:30 PM.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-amber-300 font-bold block">Calisthenics (Adults Only)</strong>
              <span className="text-slate-300">
                Mon 6:30 PM, Tue 7 PM, Sat 7 AM, Sun 8:30 AM.<br />
                Comprehensive <strong>2 to 2.5 hour</strong> extended skill deep-dives.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-emerald-300 font-bold block">Yoga (Adults Only)</strong>
              <span className="text-slate-300">
                Morning: Tue/Wed/Thu 6:30-7:30 AM.<br />
                Evening: Tue/Thu/Sat 6:00-7:00 PM.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-rose-300 font-bold block">Wing Chun (Adults Only)</strong>
              <span className="text-slate-300">
                Every Friday: <strong>6:00 PM – 8:00 PM</strong>.<br />
                Dedicated <strong>4 sessions per month</strong> (2-hour immersive deep dive).
              </span>
            </div>
          </div>
        </div>

        {/* Primary Interactive Filter Bar */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Age Group Segregation Buttons (High Priority Requirement) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold px-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Age:
              </span>
              {(['All', 'Kids', 'Adults'] as const).map((age) => (
                <button
                  key={age}
                  onClick={() => setAgeFilter(age)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    ageFilter === age
                      ? age === 'Kids'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : age === 'Adults'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {age === 'All' ? 'All Sessions' : age === 'Kids' ? 'Kids Only (6-15)' : 'Adults Only (16+)'}
                </button>
              ))}
            </div>

            {/* Discipline Dropdown / Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <span className="text-xs text-slate-400 font-semibold px-1 hidden sm:inline">Discipline:</span>
              {[
                { id: 'All', label: 'All Disciplines' },
                { id: 'parkour', label: 'Parkour' },
                { id: 'calisthenics', label: 'Calisthenics (2-2.5h)' },
                { id: 'yoga', label: 'Yoga' },
                { id: 'wing-chun', label: 'Wing Chun' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDisciplineFilter(item.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    disciplineFilter === item.id
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 self-end lg:self-auto">
              <button
                onClick={() => setViewMode('day-by-day')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                  viewMode === 'day-by-day'
                    ? 'bg-slate-800 text-white border-slate-700'
                    : 'text-slate-400 border-transparent hover:text-white'
                }`}
              >
                Day-by-Day
              </button>
              <button
                onClick={() => setViewMode('full-week')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                  viewMode === 'full-week'
                    ? 'bg-slate-800 text-white border-slate-700'
                    : 'text-slate-400 border-transparent hover:text-white'
                }`}
              >
                Full Week
              </button>
            </div>
          </div>

          {/* If Day-by-Day view: Horizontal Day of Week Selector */}
          {viewMode === 'day-by-day' && (
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
              {DAYS_OF_WEEK.map((day) => {
                const isActive = activeDayTab === day;
                const count = SCHEDULE_SESSIONS.filter(
                  (s) =>
                    s.dayOfWeek === day &&
                    (ageFilter === 'All' || (ageFilter === 'Kids' ? s.isKids : s.isAdults)) &&
                    (disciplineFilter === 'All' || s.disciplineId === disciplineFilter)
                ).length;

                return (
                  <button
                    key={day}
                    onClick={() => setActiveDayTab(day)}
                    className={`flex-1 min-w-[90px] py-2 px-2 rounded-xl text-center transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-900/50 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800/60'
                    }`}
                  >
                    <span className="block text-xs font-bold uppercase">{day.slice(0, 3)}</span>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        isActive ? 'text-blue-100 font-medium' : 'text-slate-500'
                      }`}
                    >
                      {count} {count === 1 ? 'class' : 'classes'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sessions Results Display */}
        {filteredSessions.length === 0 ? (
          <div className="p-12 text-center bg-slate-950/60 border border-slate-800 rounded-2xl text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-500 mb-2" />
            <div className="text-base font-bold text-white">No classes match your selected filters</div>
            <p className="text-xs text-slate-400 mt-1">
              Try switching your age group, day, or discipline filters to view available schedules.
            </p>
            <button
              onClick={() => {
                setAgeFilter('All');
                setDisciplineFilter('All');
                setSelectedDay('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSessions.map((session) => {
              const isCalisthenicsLong = session.disciplineId === 'calisthenics';
              const isKidsClass = session.isKids;

              return (
                <div
                  key={session.id}
                  className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                    isKidsClass
                      ? 'bg-slate-950/90 border-blue-850 hover:border-blue-500/50 shadow-md'
                      : isCalisthenicsLong
                      ? 'bg-slate-950/90 border-amber-900/50 hover:border-amber-500/50 shadow-md'
                      : 'bg-slate-950/90 border-slate-800 hover:border-slate-700 shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Day & Age Group Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
                        {session.dayOfWeek}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {session.isKids ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 border border-blue-500/40 text-blue-300 uppercase tracking-wider">
                            Kids Program
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 uppercase tracking-wider">
                            Adults Only
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Class Title */}
                    <h3 className="text-lg font-bold text-white font-display leading-snug">
                      {session.title}
                    </h3>

                    {/* Time Slot & Duration Badge */}
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        {session.timeOfDay === 'evening' || session.timeSlot.toLowerCase().includes('pm') ? (
                          <MoonStar className="w-4 h-4 text-indigo-400 shrink-0" />
                        ) : (
                          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                        <span>{session.timeSlot}</span>
                      </div>

                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          isCalisthenicsLong
                            ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {session.duration}
                      </span>
                    </div>

                    {/* Highlights & Level */}
                    <div className="mt-3.5 space-y-1.5">
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span>{session.location}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{session.highlights}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <a
                      href={getWhatsAppBookLink(session)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Book on WhatsApp</span>
                    </a>

                    <button
                      onClick={() =>
                        onOpenBooking(
                          session.disciplineId,
                          session.targetGroup,
                          `${session.dayOfWeek} ${session.timeSlot}`
                        )
                      }
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition"
                      title="Quick Inquiry"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Schedule Notes */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              All classes begin on time. Please arrive 10 minutes prior for warmup and safety debriefing.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Questions about schedules?</span>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
            >
              WhatsApp Support ({CONTACT_INFO.whatsappFormatted})
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
