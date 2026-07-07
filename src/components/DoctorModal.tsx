/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ChevronRight, Sparkles, CreditCard, ShieldAlert } from 'lucide-react';
import { Doctor, Booking } from '../types';

interface DoctorModalProps {
  doctor: Doctor;
  onClose: () => void;
}

export default function DoctorModal({ doctor, onClose }: DoctorModalProps) {
  const [step, setStep] = useState<'details' | 'booking' | 'confirmed'>('details');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Paystack' | 'CashAtClinic' | 'CareNowPayLater'>('Paystack');
  const [submitting, setSubmitting] = useState(false);

  // Generate 4 upcoming dates starting from tomorrow
  const getUpcomingDates = () => {
    const dates = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 1; i <= 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = weekdays[d.getDay()];
      // Check if doctor is available on this weekday
      if (doctor.availability.includes(dayName)) {
        dates.push({
          raw: d.toISOString().split('T')[0],
          dayName: dayName,
          formatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
      }
    }
    return dates;
  };

  const datesAvailable = getUpcomingDates();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !name || !email || !phone) {
      alert("Please fill in all details and select an appointment slot.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep('confirmed');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div 
        className="bg-[#142236] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-scaleIn max-h-[90vh] flex flex-col"
        id={`dr-modal-${doctor.id}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#0A1628]/80 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#227aba] animate-pulse"></span>
            <span className="text-xs font-mono text-gray-400 tracking-wider uppercase">
              {step === 'details' ? 'Provider Profile' : step === 'booking' ? 'Schedule Booking' : 'Booking Success'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all cursor-pointer"
            id="dr-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {step === 'details' && (
            <div className="space-y-6">
              {/* Doctor Details Summary */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pb-6 border-b border-white/5">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#227aba]/20"
                />
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-sans font-bold text-white leading-tight">{doctor.name}</h3>
                    {doctor.verified && (
                      <span className="bg-[#74b645]/15 text-[#74b645] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[#227aba] font-sans font-medium text-sm">{doctor.specialty}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-sans">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500 font-bold">★</span> {doctor.rating} Rating
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#227aba]" /> {doctor.locationName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Clinical Subspecialties */}
              <div className="space-y-3">
                <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">About Doctor</h4>
                <p className="text-gray-300 font-sans text-sm leading-relaxed">{doctor.bio}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Subspecialties</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.subspecialties.map((sub, i) => (
                      <span key={i} className="bg-white/5 border border-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-md">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Pricing Transparency</h4>
                  <div className="bg-[#0A1628] rounded-xl p-3 border border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Consultation Fee</span>
                      <span className="text-white font-bold font-sans text-sm">
                        ₦{doctor.consultationFeeMin.toLocaleString()} – ₦{doctor.consultationFeeMax.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#227aba] mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> No hidden fees or surprise costs.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Credentials & Education</h4>
                <ul className="space-y-1.5">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs text-gray-300 leading-relaxed">
                      <span className="text-[#74b645] font-bold mt-0.5">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer action */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-sans text-sm font-semibold py-3.5 rounded-xl border border-white/10 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep('booking')}
                  className="flex-1 bg-[#227aba] hover:bg-[#227aba]/90 text-[#0A1628] font-sans text-sm font-bold py-3.5 rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="dr-modal-book-trigger"
                >
                  Schedule Appointment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'booking' && (
            <form onSubmit={handleBookingSubmit} className="space-y-5 text-left">
              {/* Profile Bar */}
              <div className="flex items-center gap-3 bg-[#0A1628] p-3 rounded-xl border border-white/5">
                <img src={doctor.image} alt={doctor.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-white">{doctor.name}</h4>
                  <p className="text-[11px] text-[#227aba]">{doctor.specialty}</p>
                </div>
              </div>

              {/* Step 1: Select Date */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
                  1. Select Available Date
                </label>
                {datesAvailable.length === 0 ? (
                  <p className="text-xs text-yellow-500">No appointments scheduled for this week.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {datesAvailable.map((d) => (
                      <button
                        key={d.raw}
                        type="button"
                        onClick={() => {
                          setSelectedDate(d.raw);
                          setSelectedSlot('');
                        }}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          selectedDate === d.raw
                            ? 'bg-[#227aba]/10 border-[#227aba] text-[#227aba]'
                            : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-bold font-sans">{d.formatted}</span>
                        <span className="text-[10px] text-gray-400 font-sans">{d.dayName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Select Slot */}
              {selectedDate && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
                    2. Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {doctor.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-lg border text-xs font-medium font-mono text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-[#227aba]/10 border-[#227aba] text-[#227aba]'
                            : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Patient Info */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
                  3. Patient Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#227aba] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#227aba] outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g., +234 ...)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#227aba] outline-none transition-all"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Briefly describe your symptoms or medical concerns (optional)"
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full bg-[#0A1628] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#227aba] outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Step 4: Secure Payment Tier */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
                  4. Consultation Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Paystack')}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                      paymentMethod === 'Paystack'
                        ? 'bg-[#227aba]/10 border-[#227aba] text-[#227aba]'
                        : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">Secure Paystack</span>
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] text-gray-400">Card, Bank Transfer, USSD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CashAtClinic')}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                      paymentMethod === 'CashAtClinic'
                        ? 'bg-[#227aba]/10 border-[#227aba] text-[#227aba]'
                        : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300'
                    }`}
                  >
                    <span className="text-xs font-bold">Pay at Clinic</span>
                    <span className="text-[10px] text-gray-400">Pay directly at hospital arrival</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CareNowPayLater')}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                      paymentMethod === 'CareNowPayLater'
                        ? 'bg-[#227aba]/10 border-[#227aba] text-[#227aba]'
                        : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">Care Now, Pay Later</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#74b645]" />
                    </div>
                    <span className="text-[10px] text-gray-400">0% Interest medical microfinance</span>
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-sans text-sm font-semibold py-3.5 rounded-xl border border-white/10 transition-all cursor-pointer"
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-[#227aba] to-[#74b645] disabled:opacity-50 text-[#0A1628] font-sans text-sm font-bold py-3.5 rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="dr-modal-submit-booking"
                >
                  {submitting ? 'Confirming Appointment...' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#74b645]/10 border border-[#74b645]/30 flex items-center justify-center mx-auto shadow-lg shadow-[#74b645]/10">
                <CheckCircle2 className="w-8 h-8 text-[#74b645]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-sans font-bold text-white">Appointment Confirmed!</h3>
                <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                  Your booking ticket with <span className="text-[#227aba] font-bold">{doctor.name}</span> has been securely authorized and scheduled.
                </p>
              </div>

              {/* Receipt Ticket Card */}
              <div className="bg-[#0A1628] rounded-2xl border border-[#227aba]/20 p-5 max-w-md mx-auto text-left space-y-4 shadow-xl">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs font-mono text-gray-400 tracking-wider">TICKET REF:</span>
                  <span className="text-xs font-mono text-white font-bold">TH-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                  <div>
                    <span className="text-gray-400 block mb-0.5">Patient:</span>
                    <span className="text-white font-semibold block">{name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Specialist:</span>
                    <span className="text-[#227aba] font-semibold block">{doctor.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Date Scheduled:</span>
                    <span className="text-white font-semibold block">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Scheduled Slot:</span>
                    <span className="text-white font-semibold block font-mono">{selectedSlot}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Consultation Tier:</span>
                    <span className="text-white font-semibold block">₦{doctor.consultationFeeMin.toLocaleString()} – ₦{doctor.consultationFeeMax.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Payment Status:</span>
                    <span className="text-[#74b645] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#74b645] animate-ping"></span>
                      {paymentMethod === 'Paystack' ? 'Authorized (Paystack)' : paymentMethod === 'CashAtClinic' ? 'Pay at Arrival' : 'Approved Financing'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#142236] p-3 rounded-xl flex items-start gap-2.5 border border-white/5">
                  <ShieldAlert className="w-4 h-4 text-[#227aba] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-400 leading-normal">
                    Please arrive 15 minutes before your slot. Present this digital ticket or check your email for confirmation details. For modifications, consult our Support team.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-[#227aba] hover:bg-[#227aba]/90 text-[#0A1628] font-sans text-sm font-bold px-8 py-3 rounded-xl transition-all cursor-pointer"
                  id="dr-modal-confirmed-done"
                >
                  Done & Close Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
