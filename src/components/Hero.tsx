/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, PlayCircle, Star, MapPin, CheckCircle, Shield, ArrowRight, Heart, Send, ShieldCheck, Ticket } from 'lucide-react';
import { Doctor } from '../types';
import { doctorsData } from '../data/doctors';
import { HERO_IMAGE } from '../lib/vectorImages';

interface HeroProps {
  onSearchQuerySubmit: (query: string) => void;
  onOpenDoctorProfile: (doctor: Doctor) => void;
  onOpenChat: () => void;
}

export default function Hero({ onSearchQuerySubmit, onOpenDoctorProfile, onOpenChat }: HeroProps) {
  const [searchVal, setSearchVal] = useState('');
  
  // Waitlist form states
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [role, setRole] = useState<'Patient' | 'Doctor' | 'Investor'>('Patient');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [appliedTicket, setAppliedTicket] = useState<any | null>(null);

  // Find Dr. Folake Adeyemi from our doctor list to display as featured
  const featuredDoc = doctorsData.find((d) => d.id === 'dr-folake-adeyemi') || doctorsData[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim() !== '') {
      onSearchQuerySubmit(searchVal);
    } else {
      onOpenChat();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !workEmail) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          workEmail,
          role,
          investmentAmount: role === 'Investor' ? investmentAmount : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Application submission failed');
      }

      const data = await response.json();

console.log(data);

setAppliedTicket({
  id: `TH-${Date.now()}`,
  fullName,
  workEmail,
  role,
  investmentAmount: role === "Investor" ? investmentAmount : null,
  submittedAt: new Date().toISOString(),
});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-12 pb-16 overflow-hidden bg-gradient-to-b from-white via-cyan-50/10 to-white">
      {/* Visual background gradient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#227aba]/10 blur-[130px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#74b645]/10 blur-[110px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#227aba]/10 text-[#227aba] border border-[#227aba]/20 font-sans text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4 text-[#74b645]" /> Quality Healthcare. Verified Experts.
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Find & Get<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#227aba] to-[#74b645]">
              Better Health.
            </span>
          </h1>

          <p className="text-slate-600 font-sans text-base sm:text-lg max-w-xl leading-relaxed">
            Nigeria's first patient-centric healthcare platform bridging the gap between verified specialists and families through extreme price transparency, compassionate support, and smart matching.
          </p>

          {/* Interactive Search Bar widget */}
          <form 
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-100 max-w-lg"
            id="hero-search-form"
          >
            <div className="flex-grow flex items-center px-3 py-2.5 gap-3">
              <Search className="w-5 h-5 text-[#227aba]" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search specialty, doctor name or symptom..."
                className="bg-transparent border-none text-slate-800 w-full text-sm focus:outline-none placeholder-slate-400 font-sans"
                id="hero-search-input"
              />
            </div>
            <button
              type="submit"
              className="bg-[#227aba] hover:bg-[#1a5f91] text-white font-sans text-sm font-bold px-6 py-3 rounded-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#227aba]/20"
              id="hero-search-submit-btn"
            >
              Scan Registry
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick links & interactive video popup mock */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2.5 text-slate-500 hover:text-[#227aba] transition-colors cursor-pointer group text-xs sm:text-sm font-semibold font-sans"
              id="hero-btn-learn"
            >
              <PlayCircle className="w-5 h-5 text-[#227aba] group-hover:scale-105 transition-transform" />
              <span>How we match you with trusted specialists</span>
            </button>
          </div>
        </div>

        {/* Right column: Illustration + Interactive waitlist application form or successful pass card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Hero Illustration */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-150 shadow-xl bg-white p-2">
            <img
              src={HERO_IMAGE}
              alt="Friendly doctor consulting a patient warmly"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-xl object-cover hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-slate-100 rounded-lg p-2.5 shadow-md flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#74b645] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-800 font-sans">100% Vetted Doctors Only</span>
            </div>
          </div>

          <div className="relative group scroll-mt-24" id="waitlist-section">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#227aba] to-[#74b645] rounded-2xl blur opacity-15 group-hover:opacity-20 transition duration-1000"></div>
            
            <div className="relative">
              {!appliedTicket ? (
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xl space-y-5 text-left">
                  <div className="space-y-1">
                    <h3 className="text-xl font-sans font-bold text-slate-800">Join the Waitlist</h3>
                    <p className="text-xs text-slate-500 font-sans">Secure early access, register as a clinical provider, or apply for seed allocation.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-3.5">
                    {/* Name field */}
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all placeholder-slate-400 font-sans"
                        id="waitlist-name"
                      />
                    </div>

                    {/* Email field */}
                    <div>
                      <input
                        type="email"
                        placeholder="Work Email Address"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all placeholder-slate-400 font-sans"
                        id="waitlist-email"
                      />
                    </div>

                    {/* Role select buttons */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['Patient', 'Doctor', 'Investor'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`py-2 px-1 rounded-lg border text-[10px] font-semibold transition-all cursor-pointer ${
                            role === r
                              ? 'bg-[#227aba]/10 border-[#227aba] text-[#227aba]'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                          id={`waitlist-role-btn-${r}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>

                    {/* Conditional input: Investment amount if Investor role is selected */}
                    {role === 'Investor' && (
                      <div className="animate-fadeIn">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">$</span>
                          <input
                            type="text"
                            placeholder="Intended Allocation Amount (USD)"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2.5 text-xs text-slate-800 focus:border-[#227aba] outline-none transition-all placeholder-slate-400 font-mono"
                            id="waitlist-investment-amount"
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit application button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#227aba] hover:bg-[#1a5f91] text-white font-sans font-bold py-3 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs shadow-md shadow-[#227aba]/10"
                      id="waitlist-submit"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {submitting ? 'Submitting Application...' : 'Submit Application'}
                    </button>
                  </form>

                  <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                    By joining, you agree to receive vetted credential reports and investment prospectus files. No medical recommendations are made through this submission.
                  </div>
                </div>
              ) : (
                /* Success Early Access pass card */
                <div className="bg-white border border-[#74b645]/20 p-6 rounded-2xl shadow-xl relative overflow-hidden text-center space-y-4 animate-fadeIn text-left">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#74b645]/5 blur-xl rounded-full"></div>
                  
                  <div className="w-10 h-10 rounded-full bg-[#227aba]/10 border border-[#227aba]/20 flex items-center justify-center mx-auto text-[#227aba]">
                    <ShieldCheck className="w-5 h-5 animate-bounce text-[#74b645]" />
                  </div>

                  <div className="space-y-1 text-center">
                    <h3 className="text-lg font-sans font-bold text-slate-800">Application Approved!</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-sans">
                      Welcome to the Tinder Health digital ecosystem. Your clinical credential file has been created.
                    </p>
                  </div>

                  {/* Simulated early access ticket */}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 text-left font-mono text-[11px] space-y-2 relative text-slate-700">
                    <div className="absolute right-2 top-2 text-slate-300 opacity-20">
                      <Ticket className="w-12 h-12" />
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                      <span className="text-slate-400 text-[9px] tracking-wider font-semibold uppercase">EARLY ACCESS TICKET</span>
                      <span className="text-[#227aba] font-bold">{appliedTicket.id.toUpperCase()}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-1.5 text-[10px]">
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase">Applicant</span>
                        <span className="text-slate-800 font-sans font-semibold truncate block max-w-[100px]">{appliedTicket.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase">Role</span>
                        <span className="text-[#227aba] font-semibold">{appliedTicket.role}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase">Status</span>
                        <span className="text-emerald-600 font-semibold">VERIFIED</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase">Date</span>
                        <span className="text-slate-700 text-[9px]">{new Date(appliedTicket.submittedAt).toLocaleDateString()}</span>
                      </div>
                      {appliedTicket.investmentAmount && (
                        <div className="col-span-2 border-t border-slate-200 pt-1.5 mt-0.5">
                          <span className="text-slate-400 block text-[8px] uppercase">Allocation Intention</span>
                          <span className="text-[#74b645] font-bold font-mono text-[10px]">${parseFloat(appliedTicket.investmentAmount).toLocaleString()} USD</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center pt-1">
                    <button
                      onClick={() => setAppliedTicket(null)}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-600 font-sans text-[10px] px-4 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer"
                    >
                      Register Another Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
