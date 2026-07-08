/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Journey from './components/Journey';
import Services from './components/Services';
import Trust from './components/Trust';
import MapGIS from './components/MapGIS';
import BusinessModel from './components/BusinessModel';
import Team from './components/Team';
import Footer from './components/Footer';
import DoctorModal from './components/DoctorModal';
import AIChatDrawer from './components/AIChatDrawer';
import TryItNow from './components/TryItNow';
import { Doctor } from './types';

export default function App() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  const handleSearchQuerySubmit = (query: string) => {
    setChatInitialQuery(query);
    setChatOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDoctorProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleOpenWaitlist = () => {
    handleScrollToSection('waitlist-section');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col relative overflow-x-hidden font-sans antialiased selection:bg-cyan-500/20 selection:text-slate-900">
      {/* Dynamic Background Grid Pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px),
                            linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Top Navbar */}
      <Navbar 
        onOpenChat={() => {
          setChatInitialQuery('');
          setChatOpen(true);
        }}
        onScrollToSection={handleScrollToSection}
        onOpenWaitlist={handleOpenWaitlist}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* 1. Hero Landing & Specialty Registry Search */}
        <Hero 
          onSearchQuerySubmit={handleSearchQuerySubmit}
          onOpenDoctorProfile={handleOpenDoctorProfile}
          onOpenChat={() => {
            setChatInitialQuery('');
            setChatOpen(true);
          }}
        />

        {/* 2. Systems in Crisis Section */}
        <Problem />

        {/* 2.5. Patient-First Medical Solutions */}
        <Services />

        {/* 3. The Redefined Journey Steps */}
        <Journey />

        {/* 3.2. Verification & Safety standards */}
        <Trust />

        {/* 3.8. Patient Data Capture Matching Flow */}
        <TryItNow />

        {/* 4. GIS Mapping (Interactive vector coordinates) */}
        <MapGIS onSelectDoctor={handleOpenDoctorProfile} />

        {/* 6. Sustainable Unit Revenue Economics */}
        <BusinessModel />

        {/* 8. Clinical Leadership profiles */}
        <Team />
      </main>

      {/* Footer & Live UTC Clock */}
      <Footer />

      {/* Interactive Symptom Diagnostic AI Chat Drawer */}
      <AIChatDrawer 
        isOpen={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setChatInitialQuery('');
        }}
        onSelectDoctor={handleOpenDoctorProfile}
        initialQuery={chatInitialQuery}
      />

      {/* Specialist Profile Details & Booking Scheduler Modal */}
      {selectedDoctor && (
        <DoctorModal 
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
