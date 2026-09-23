/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { AdminPanel } from './components/admin/AdminPanel';
import { DisciplineImageProvider } from './context/DisciplineImageContext';
import { DisciplineId } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDiscipline, setBookingDiscipline] = useState<DisciplineId>('parkour');
  const [bookingAgeGroup, setBookingAgeGroup] = useState<'Kids' | 'Adults'>('Adults');
  const [bookingSlot, setBookingSlot] = useState<string>('');

  // Stealth Admin Panel state - completely hidden from public view
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL hash and query params for admin access
  useEffect(() => {
    const checkHashOrParams = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (
        hash === '#admin' ||
        hash === '#media-admin' ||
        hash === '#nesta-admin' ||
        pathname === '/admin' ||
        pathname.endsWith('/admin') ||
        params.get('admin') === 'true'
      ) {
        setIsAdminOpen(true);
      }
    };

    checkHashOrParams();
    window.addEventListener('hashchange', checkHashOrParams);

    // Global stealth keyboard shortcuts (Ctrl+Shift+A or Cmd+Shift+A or Ctrl+Alt+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.ctrlKey && e.altKey && (e.key === 'a' || e.key === 'A'))
      ) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const handleCustomAdminOpen = () => setIsAdminOpen(true);
    window.addEventListener('nesta:open-admin', handleCustomAdminOpen);

    return () => {
      window.removeEventListener('hashchange', checkHashOrParams);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('nesta:open-admin', handleCustomAdminOpen);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#media-admin' || window.location.hash === '#nesta-admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

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
        {/* Sticky Top Navigation with hidden admin trigger on triple-click */}
        <Navbar
          onOpenBooking={handleOpenBooking}
          onSecretAdminTrigger={() => setIsAdminOpen(true)}
        />

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

        {/* Footer with hidden secret admin trigger */}
        <Footer onSecretAdminTrigger={() => setIsAdminOpen(true)} />

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

        {/* Completely Hidden Password-Protected Admin Panel */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={handleCloseAdmin}
        />
      </div>
    </DisciplineImageProvider>
  );
}
