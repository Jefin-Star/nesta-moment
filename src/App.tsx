/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { PricingSection } from './components/PricingSection';
import { AboutStudio } from './components/AboutStudio';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TrialBookingModal } from './components/TrialBookingModal';
import { DisciplineImageProvider } from './context/DisciplineImageContext';
import { DisciplineId } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDiscipline, setBookingDiscipline] = useState<DisciplineId>('parkour');
  const [bookingAgeGroup, setBookingAgeGroup] = useState<'Kids' | 'Adults'>('Adults');
  const [bookingSlot, setBookingSlot] = useState<string>('');

  const handleOpenBooking = (
    discipline?: DisciplineId,
    ageGroup?: 'Kids' | 'Adults',
    slot?: string
  ) => {
    if (discipline) setBookingDiscipline(discipline);
    if (ageGroup) setBookingAgeGroup(ageGroup);
    if (slot) setBookingSlot(slot);
    setIsBookingOpen(true);
  };

  return (
    <DisciplineImageProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        {/* Sticky Top Navigation */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero onOpenBooking={() => handleOpenBooking()} />

          {/* Services & Disciplines (Parkour, Calisthenics, Yoga, Wing Chun) */}
          <ServicesSection onOpenBooking={handleOpenBooking} />

          {/* Comprehensive Interactive Class Schedule */}
          <ScheduleSection onOpenBooking={handleOpenBooking} />

          {/* Transparent Pricing & Memberships */}
          <PricingSection onOpenBooking={handleOpenBooking} />

          {/* Studio Philosophy, Facilities & FAQ */}
          <AboutStudio />

          {/* Contact Information & Interactive Form */}
          <ContactSection onOpenBooking={() => handleOpenBooking()} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* Interactive Booking & Inquiry Modal */}
        <TrialBookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          defaultDiscipline={bookingDiscipline}
          defaultAgeGroup={bookingAgeGroup}
          defaultSlot={bookingSlot}
        />
      </div>
    </DisciplineImageProvider>
  );
}
