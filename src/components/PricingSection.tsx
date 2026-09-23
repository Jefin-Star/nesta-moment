import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CreditCard,
  Check,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Shield,
  Clock,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { PRICING_TIERS, MEMBERSHIP_PERKS } from '../data/pricingData';
import { CONTACT_INFO, DISCIPLINES } from '../data/programsData';
import { DisciplineId } from '../types';

interface PricingSectionProps {
  onOpenBooking: (discipline?: DisciplineId, ageGroup?: 'Kids' | 'Adults', slot?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const [selectedDuration, setSelectedDuration] = useState<'1 Month' | '3 Months' | '6 Months' | '1 Year'>('1 Month');

  const currentTier = PRICING_TIERS.find((t) => t.period === selectedDuration) || PRICING_TIERS[0];

  const getEnrollWhatsAppUrl = (disciplineName: string, fee: number) => {
    const text = `Hi Nesta Movement Studio! I would like to enroll in the ${disciplineName} program for the ${selectedDuration} plan (Fee: ₹${fee.toLocaleString(
      'en-IN'
    )}). Please guide me with payment and batch start dates.`;
    return `https://wa.me/919447330287?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative border-t border-slate-900">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transparent Investment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            Membership & Pricing
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Straightforward pricing with zero hidden registration fees. Train on your terms with single-month
            flexibility or long-term multi-month savings.
          </p>
        </div>

        {/* Highlighted 1-Month Prominent Disciplines Card Grid (Prompt Requirement: "showing the one-month fees for each discipline") */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Official Monthly Baseline</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                1-Month Fees by Discipline
              </h3>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Allocated sessions • Expert coach led
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Parkour 1-Month */}
            <div className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Parkour</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-300">
                    Kids & Adults
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-display">₹2,000</span>
                  <span className="text-xs text-slate-400">/ 1 month</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <span>12 Sessions per Month</span>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Vaults, landings, wall climbs, and obstacle navigation. Separate batches for Kids (Mon/Wed/Fri/Sat/Sun) and Adults.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span>₹166 effective per session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span>Foam pit & obstacle zone access</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <a
                  href={getEnrollWhatsAppUrl('Parkour (1 Month)', 2000)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enroll Parkour (₹2,000)</span>
                </a>
              </div>
            </div>

            {/* Calisthenics 1-Month */}
            <div className="rounded-2xl p-6 bg-slate-900/80 border border-amber-900/40 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg relative">
              <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                Extended Deep Dive
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Calisthenics</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300">
                    Adults Only
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-display">₹2,000</span>
                  <span className="text-xs text-slate-400">/ 1 month</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-amber-300 flex items-center gap-1">
                  <span>8 Sessions • 2 to 2.5 hrs each!</span>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Extensive masterclasses covering muscle-ups, handstands, front/back levers, rings, and weighted calisthenics.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Up to 20 coaching hours / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rig, rings, dip bars & chalk</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <a
                  href={getEnrollWhatsAppUrl('Calisthenics (1 Month)', 2000)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enroll Calisthenics (₹2,000)</span>
                </a>
              </div>
            </div>

            {/* Yoga 1-Month */}
            <div className="rounded-2xl p-6 bg-slate-900/80 border border-emerald-900/40 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Yoga</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300">
                    Adults Only
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-display">₹2,500</span>
                  <span className="text-xs text-slate-400">/ 1 month</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <span>12 Sessions per Month</span>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Morning (6:30 AM) & Evening (6 PM) sessions. Spinal mobility, pranayama breathwork, and kinetic decompression.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Choose Morning or Evening slots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Props, mats, and serene studio</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <a
                  href={getEnrollWhatsAppUrl('Yoga (1 Month)', 2500)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enroll Yoga (₹2,500)</span>
                </a>
              </div>
            </div>

            {/* Wing Chun 1-Month */}
            <div className="rounded-2xl p-6 bg-slate-900/80 border border-rose-900/40 hover:border-rose-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Wing Chun</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-300">
                    Adults Only
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-display">₹2,500</span>
                  <span className="text-xs text-slate-400">/ 1 month</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-rose-300 flex items-center gap-1">
                  <span>4 Sessions/Month • Every Friday 6–8 PM</span>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Traditional Chinese Kung Fu held every Friday from 6 to 8 PM (2-hour deep dives). Siu Nim Tao hand forms, Chi Sau sticky hands, and wooden dummy (Muk Yan Jong) conditioning.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-rose-400" />
                    <span>Every Friday: 6:00 PM – 8:00 PM (2 hrs)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-rose-400" />
                    <span>Traditional kwoon & wooden dummy</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <a
                  href={getEnrollWhatsAppUrl('Wing Chun (1 Month)', 2500)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enroll Wing Chun (₹2,500)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Month Plans Duration Toggle & Calculator */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Multi-Month Commitments
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                Official Studio Membership Schedule
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Save significantly with longer packages. Certified directly by Nesta Movement Studio management.
              </p>
            </div>

            {/* Duration Selector Buttons */}
            <div className="flex items-center p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
              {PRICING_TIERS.map((tier) => {
                const isSelected = selectedDuration === tier.period;
                return (
                  <button
                    key={tier.period}
                    onClick={() => setSelectedDuration(tier.period)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{tier.period}</span>
                    {tier.isPopular && (
                      <span className="absolute -top-2 -right-1 px-1.5 py-0.2 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full uppercase">
                        Save 10%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tier Overview Grid for Selected Period */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Parkour Package */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Parkour Program</div>
                <div className="text-3xl font-black text-white font-display">
                  ₹{currentTier.parkourFee.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  for {currentTier.period} ({12 * currentTier.durationMonths} total sessions)
                </div>

                {currentTier.durationMonths > 1 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-semibold">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>
                      Save ₹{(2000 * currentTier.durationMonths - currentTier.parkourFee).toLocaleString('en-IN')}!
                    </span>
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-300">
                  Open to Kids & Adults with dedicated curriculum and certified coaches.
                </p>
              </div>

              <a
                href={getEnrollWhatsAppUrl(`Parkour (${currentTier.period})`, currentTier.parkourFee)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Join Parkour ({currentTier.period})</span>
              </a>
            </div>

            {/* Calisthenics Package */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-amber-900/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Calisthenics (Adults)</div>
                <div className="text-3xl font-black text-white font-display">
                  ₹{currentTier.calisthenicsFee.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  for {currentTier.period} ({8 * currentTier.durationMonths} extended 2-2.5h sessions)
                </div>

                {currentTier.durationMonths > 1 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-semibold">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>
                      Save ₹{(2000 * currentTier.durationMonths - currentTier.calisthenicsFee).toLocaleString('en-IN')}!
                    </span>
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-300">
                  Strictly Adults Only. Deep-dive strength, rings, levers, and handstands.
                </p>
              </div>

              <a
                href={getEnrollWhatsAppUrl(`Calisthenics (${currentTier.period})`, currentTier.calisthenicsFee)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Join Calisthenics ({currentTier.period})</span>
              </a>
            </div>

            {/* Yoga Package */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-emerald-900/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Yoga & Wing Chun</div>
                <div className="text-3xl font-black text-white font-display">
                  ₹{currentTier.yogaFee.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  for {currentTier.period} ({12 * currentTier.durationMonths} sessions)
                </div>

                {currentTier.durationMonths > 1 && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-semibold">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>
                      Save ₹{(2500 * currentTier.durationMonths - currentTier.yogaFee).toLocaleString('en-IN')}!
                    </span>
                  </div>
                )}

                <p className="mt-4 text-xs text-slate-300">
                  Morning & Evening tracks for Yoga, or traditional Wing Chun Kung Fu discipline.
                </p>
              </div>

              <a
                href={getEnrollWhatsAppUrl(`Yoga / Wing Chun (${currentTier.period})`, currentTier.yogaFee)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Join Yoga / Wing Chun ({currentTier.period})</span>
              </a>
            </div>
          </div>

          {/* Official Complete Fee Schedule Comparison Table (matching the OCR user attachment exactly) */}
          <div className="mt-12">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Full Official Fee Schedule Matrix (INR ₹)</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-200 uppercase font-bold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Discipline</th>
                    <th className="py-3.5 px-4 text-center">1 Month</th>
                    <th className="py-3.5 px-4 text-center">3 Months</th>
                    <th className="py-3.5 px-4 text-center">6 Months</th>
                    <th className="py-3.5 px-4 text-center">1 Year</th>
                    <th className="py-3.5 px-4 text-right">Inquire</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      Parkour <span className="text-slate-400 font-normal">(12 sessions/month)</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-white">₹2,000</td>
                    <td className="py-3.5 px-4 text-center text-blue-300 font-semibold">₹5,400</td>
                    <td className="py-3.5 px-4 text-center text-blue-300 font-semibold">₹10,800</td>
                    <td className="py-3.5 px-4 text-center text-blue-300 font-semibold">₹21,600</td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={getEnrollWhatsAppUrl('Parkour', 2000)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-bold hover:underline"
                      >
                        Enroll
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      Calisthenics <span className="text-slate-400 font-normal">(8 sessions/month • 2-2.5h)</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-white">₹2,000</td>
                    <td className="py-3.5 px-4 text-center text-amber-300 font-semibold">₹5,400</td>
                    <td className="py-3.5 px-4 text-center text-amber-300 font-semibold">₹10,800</td>
                    <td className="py-3.5 px-4 text-center text-amber-300 font-semibold">₹21,600</td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={getEnrollWhatsAppUrl('Calisthenics', 2000)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-bold hover:underline"
                      >
                        Enroll
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      Yoga <span className="text-slate-400 font-normal">(12 sessions/month)</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-white">₹2,500</td>
                    <td className="py-3.5 px-4 text-center text-emerald-300 font-semibold">₹6,750</td>
                    <td className="py-3.5 px-4 text-center text-emerald-300 font-semibold">₹13,500</td>
                    <td className="py-3.5 px-4 text-center text-emerald-300 font-semibold">₹27,000</td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={getEnrollWhatsAppUrl('Yoga', 2500)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-bold hover:underline"
                      >
                        Enroll
                      </a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      Wing Chun <span className="text-slate-400 font-normal">(12 sessions/month)</span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-white">₹2,500</td>
                    <td className="py-3.5 px-4 text-center text-rose-300 font-semibold">₹6,750</td>
                    <td className="py-3.5 px-4 text-center text-rose-300 font-semibold">₹13,500</td>
                    <td className="py-3.5 px-4 text-center text-rose-300 font-semibold">₹27,000</td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={getEnrollWhatsAppUrl('Wing Chun', 2500)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-bold hover:underline"
                      >
                        Enroll
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Membership Perks */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEMBERSHIP_PERKS.map((perk, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">{perk.title}</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
