import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Mail,
  Instagram,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/programsData';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: 'Parkour',
    ageGroup: 'Adults',
    message: '',
  });
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Nesta Movement Studio!%0A%0A*Name:* ${encodeURIComponent(formData.name || 'Visitor')}%0A*Phone:* ${encodeURIComponent(
      formData.phone || 'Not specified'
    )}%0A*Program of Interest:* ${encodeURIComponent(formData.program)} (${encodeURIComponent(
      formData.ageGroup
    )})%0A*Message:* ${encodeURIComponent(formData.message || 'I would like more information.')}%0A%0APlease let me know how to get started!`;

    window.open(`https://wa.me/919447330287?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
            Get in Touch
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Ready to begin your movement journey? Reach out directly via WhatsApp, email, or social media. Our coaches
            are always here to guide you.
          </p>
        </div>

        {/* 3 Prominent Contact Channels Cards (Explicit User Prompt Requirement) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* WhatsApp Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center ring-4 ring-emerald-500/10">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-300 uppercase tracking-wider">
                  Fastest Response
                </span>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct WhatsApp Support</h3>
              <div className="text-2xl font-black text-white font-display mt-1">
                {CONTACT_INFO.whatsappFormatted}
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Chat directly with our head coaching desk for trial slot confirmations, membership queries, and guidelines.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopy(CONTACT_INFO.whatsappNumber, 'whatsapp')}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy Number"
                aria-label="Copy WhatsApp number"
              >
                {copied === 'whatsapp' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Email Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center ring-4 ring-blue-500/10">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/15 text-blue-300 uppercase tracking-wider">
                  Official Email
                </span>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Studio Inquiries & Corporate</h3>
              <div className="text-base sm:text-lg font-bold text-white font-display mt-1 break-all">
                {CONTACT_INFO.email}
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Send us formal inquiries, corporate workshop proposals, or comprehensive registration forms.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 active:scale-95"
              >
                <span>Send Email</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy Email"
                aria-label="Copy Email address"
              >
                {copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-pink-500/30 hover:border-pink-400 transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center ring-4 ring-pink-500/10">
                  <Instagram className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Instagram</h3>
              <div className="text-2xl font-black text-white font-display mt-1">
                Follow Our Community
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Watch daily student breakthroughs, coach reels, movement tutorials, and upcoming studio jam events.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-md shadow-pink-600/20 active:scale-95"
              >
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Studio Location & Interactive Direct Message Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Quick Inquiry via WhatsApp Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight">
              Instant WhatsApp Inquiry
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-6">
              Fill in your details below and we will automatically create a pre-formatted message for our team on
              WhatsApp ({CONTACT_INFO.whatsappFormatted}).
            </p>

            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Program</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  >
                    <option value="Parkour">Parkour (Kids & Adults)</option>
                    <option value="Calisthenics">Calisthenics (Adults Only • 2-2.5h)</option>
                    <option value="Yoga">Yoga (Adults Only • Morning & Evening)</option>
                    <option value="Wing Chun">Wing Chun (Adults Only)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age Group</label>
                  <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  >
                    <option value="Adults">Adults Session (16+)</option>
                    <option value="Kids">Kids Session (6-15)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Questions (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ask about batch timings, beginner advice, or fee packages..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Launch WhatsApp with this Inquiry</span>
              </button>
            </form>
          </div>

          {/* Location & Facility Information (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-white font-display">Studio Headquarters</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Nesta Movement Studio is located in a dedicated high-ceiling movement warehouse outfitted with custom
                calisthenics bar rigs, modular parkour boxes, high-density crash foam, and a serene yoga sanctuary.
              </p>

              <div className="mt-6 space-y-3 text-xs border-t border-slate-800 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Location</strong>
                    <span className="text-slate-300">{CONTACT_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Operating Schedule</strong>
                    <span className="text-slate-400">
                      Monday to Sunday: Morning sessions from 6:30 AM • Evening sessions until 9:30 PM.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Facility Amenities</strong>
                    <span className="text-slate-400">
                      Filtered hydration station, shower & changing rooms, personal storage cubbies, free parking.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 active:scale-95"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
              <button
                onClick={onOpenBooking}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Schedule a Visit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center ring-4 ring-blue-500/10 flex-shrink-0 mt-0.5">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg sm:text-2xl font-extrabold text-white font-display">
                    Find Us at NESTA MOVEMENT
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Interactive Map
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  NESTA MOVEMENT • Thiruvananthapuram, Kerala
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition shadow-lg shadow-blue-600/25 active:scale-95"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="relative w-full h-[380px] sm:h-[460px] bg-slate-950">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.7403431096773!2d76.9292378!3d8.5289834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05b96e7f323d63%3A0x5374e7496fecb453!2sNESTA%20MOVEMENT!5e1!3m2!1sen!2sin!4v1790077474581!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="NESTA MOVEMENT Location Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
