import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/programsData';
import { DisciplineId } from '../types';

interface TrialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDiscipline?: DisciplineId;
  defaultAgeGroup?: 'Kids' | 'Adults';
  defaultSlot?: string;
}

export const TrialBookingModal: React.FC<TrialBookingModalProps> = ({
  isOpen,
  onClose,
  defaultDiscipline = 'parkour',
  defaultAgeGroup = 'Adults',
  defaultSlot = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [discipline, setDiscipline] = useState<DisciplineId>(defaultDiscipline);
  const [ageGroup, setAgeGroup] = useState<'Kids' | 'Adults'>(defaultAgeGroup);
  const [preferredSlot, setPreferredSlot] = useState(defaultSlot);
  const [experience, setExperience] = useState('Beginner (First time)');
  const [submitted, setSubmitted] = useState(false);

  // Sync state when props change
  useEffect(() => {
    if (defaultDiscipline) setDiscipline(defaultDiscipline);
    if (defaultAgeGroup) setAgeGroup(defaultAgeGroup);
    if (defaultSlot) setPreferredSlot(defaultSlot);
  }, [defaultDiscipline, defaultAgeGroup, defaultSlot, isOpen]);

  if (!isOpen) return null;

  // Calisthenics, Yoga, Wing Chun are strictly Adults Only
  const isAdultsOnlyDiscipline = discipline === 'calisthenics' || discipline === 'yoga' || discipline === 'wing-chun';
  const effectiveAgeGroup = isAdultsOnlyDiscipline ? 'Adults' : ageGroup;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const disciplineLabel =
      discipline === 'parkour'
        ? 'Parkour'
        : discipline === 'calisthenics'
        ? 'Calisthenics (Adults 2-2.5h)'
        : discipline === 'yoga'
        ? 'Yoga (Adults)'
        : 'Wing Chun Kung Fu';

    const messageText = `Hi Nesta Movement Studio! I would like to book a trial session.%0A%0A*Name:* ${encodeURIComponent(
      name || 'Guest'
    )}%0A*Phone:* ${encodeURIComponent(phone || 'Not specified')}%0A*Discipline:* ${encodeURIComponent(
      disciplineLabel
    )}%0A*Group:* ${encodeURIComponent(effectiveAgeGroup)}%0A*Preferred Slot:* ${encodeURIComponent(
      preferredSlot || 'Flexible / Next Available'
    )}%0A*Experience:* ${encodeURIComponent(experience)}%0A%0APlease let me know the confirmation and guidelines. Thank you!`;

    const fullWaUrl = `https://wa.me/919447330287?text=${messageText}`;

    // Delay slightly to show confirmation state before redirect
    setTimeout(() => {
      window.location.href = fullWaUrl;
      onClose();
      setSubmitted(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-slate-100 my-8 transition-transform duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">Opening WhatsApp...</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              Redirecting to official Nesta Movement Studio WhatsApp (+91 9447330287) with your class details.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Trial Class Registration
              </div>
              <h3 className="text-2xl font-extrabold font-display text-white tracking-tight">
                Book Your Movement Session
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Connect directly with our head coaching team via WhatsApp to secure your slot.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" /> Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Discipline Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Discipline</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'parkour', label: 'Parkour', sub: 'Kids & Adults' },
                    { id: 'calisthenics', label: 'Calisthenics', sub: 'Adults Only (2-2.5h)' },
                    { id: 'yoga', label: 'Yoga', sub: 'Adults Only' },
                    { id: 'wing-chun', label: 'Wing Chun', sub: 'Fridays 6–8 PM (4 sess/mo)' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setDiscipline(item.id as DisciplineId)}
                      className={`text-left p-2.5 rounded-xl border transition-all ${
                        discipline === item.id
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm ring-1 ring-blue-500/50'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Age Group</label>
                {isAdultsOnlyDiscipline ? (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-300">
                    This discipline is exclusively for <span className="font-bold">Adults (16+)</span>.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {(['Kids', 'Adults'] as const).map((group) => (
                      <button
                        type="button"
                        key={group}
                        onClick={() => setAgeGroup(group)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                          ageGroup === group
                            ? 'bg-blue-600 text-white border-blue-500 shadow'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        {group === 'Kids' ? 'Kids Session (6-15 yrs)' : 'Adults Session (16+ yrs)'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Preferred Slot or Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" /> Preferred Slot / Day
                </label>
                <input
                  type="text"
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  placeholder="e.g. Parkour Kids Sat 10:30 AM or Yoga Morning"
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              {/* Submit via WhatsApp button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition transform active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  Send Trial Inquiry via WhatsApp ({CONTACT_INFO.whatsappFormatted})
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Instant response • No automated bots • Head coaches assist you directly
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
