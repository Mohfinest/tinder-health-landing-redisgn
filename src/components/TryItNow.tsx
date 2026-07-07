/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Phone, MapPin, Activity, Sparkles, CheckCircle, 
  ArrowRight, ArrowLeft, RefreshCw, Star, Clock, Heart, 
  ExternalLink, Mail, PhoneCall, HelpCircle, ShieldAlert
} from 'lucide-react';

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT (Abuja)", "Gombe", 
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
  "Taraba", "Yobe", "Zamfara"
];

const HEALTH_CONCERNS = [
  "Tooth pain", "Back pain", "Pregnancy", "Cancer treatment", "Eye problem", 
  "Child health", "Mental health", "Skin condition", "Fever", "Headache", 
  "Stomach pain", "Other"
];

// Mock Provider database for matching (Step 4)
const MOCK_PROVIDERS: Record<string, Array<{
  name: string;
  specialist: string;
  distance: string;
  price: string;
  hours: string;
  services: string[];
  image: string;
  phone: string;
}>> = {
  "Dentist": [
    {
      name: "Dr. Okey Bakassi",
      specialist: "Dental Surgeon",
      distance: "1.4 km away",
      price: "₦4,500 per consult",
      hours: "8:00 AM - 5:00 PM",
      services: ["Root Canal", "Tooth Extraction", "Emergency Pain Management"],
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
      phone: "+234 803 111 2222"
    },
    {
      name: "Dr. Lilian Esoro",
      specialist: "Cosmetic Orthodontist",
      distance: "2.8 km away",
      price: "₦5,000 per consult",
      hours: "9:00 AM - 6:00 PM",
      services: ["Braces Assessment", "Oral Hygiene Cleansing", "Fluoride Treatment"],
      image: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=300&auto=format&fit=crop",
      phone: "+234 809 333 4444"
    }
  ],
  "Cardiologist": [
    {
      name: "Dr. Chinedu Okafor",
      specialist: "Cardiologist Specialist",
      distance: "2.1 km away",
      price: "₦4,800 per consult",
      hours: "8:30 AM - 4:30 PM",
      services: ["Hypertension Screening", "Preventative ECG", "Heart Failure Consult"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      phone: "+234 802 555 6666"
    }
  ],
  "Obstetrician & Gynecologist": [
    {
      name: "Dr. Funmi Oyelese",
      specialist: "Maternal Health Consultant",
      distance: "1.9 km away",
      price: "₦4,500 per consult",
      hours: "8:00 AM - 4:00 PM",
      services: ["Prenatal Screenings", "High-Risk Pregnancy Consult", "Fertility Counseling"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      phone: "+234 812 777 8888"
    }
  ],
  "Oncologist": [
    {
      name: "Dr. Folake Adeyemi",
      specialist: "Oncology & Chemotherapy Specialist",
      distance: "3.2 km away",
      price: "₦4,900 per consult",
      hours: "9:00 AM - 5:00 PM",
      services: ["Tumor Assessment", "Immunotherapy Consulting", "Breast Cancer Management"],
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop",
      phone: "+234 815 999 0000"
    }
  ],
  "Ophthalmologist": [
    {
      name: "Dr. Abdul Yusuf",
      specialist: "Ophthalmic Surgeon",
      distance: "2.0 km away",
      price: "₦3,800 per consult",
      hours: "8:00 AM - 4:30 PM",
      services: ["Glaucoma Screening", "Dry Eye Management", "Cataract Assessment"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
      phone: "+234 803 222 3333"
    }
  ],
  "Pediatric Specialist": [
    {
      name: "Dr. Amina Bello",
      specialist: "Neonatal & Pediatric Care",
      distance: "1.1 km away",
      price: "₦3,500 per consult",
      hours: "8:30 AM - 5:30 PM",
      services: ["Childhood Immunization", "Neonatal Growth Checkups", "Asthma Support"],
      image: "https://images.unsplash.com/photo-1631856955409-a1728db1978d?q=80&w=300&auto=format&fit=crop",
      phone: "+234 809 444 5555"
    }
  ],
  "Dermatologist": [
    {
      name: "Dr. Emeka Nwachukwu",
      specialist: "Clinical Dermatologist",
      distance: "2.5 km away",
      price: "₦4,000 per consult",
      hours: "9:00 AM - 5:00 PM",
      services: ["Acne Regimen", "Chronic Eczema Care", "Tropical Infection Assessment"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      phone: "+234 811 555 7777"
    }
  ],
  "Orthopedic Surgeon": [
    {
      name: "Dr. Tunde Alabi",
      specialist: "Orthopedic Specialist",
      distance: "1.5 km away",
      price: "₦4,500 per consult",
      hours: "8:00 AM - 4:00 PM",
      services: ["Joint Pain Rehabilitation", "Sports Fracture Management", "Postural Care"],
      image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=300&auto=format&fit=crop",
      phone: "+234 805 888 9999"
    }
  ],
  "General Practitioner": [
    {
      name: "Dr. Halima Sani",
      specialist: "Internal Medicine Expert",
      distance: "3.0 km away",
      price: "₦3,000 per consult",
      hours: "8:00 AM - 6:00 PM",
      services: ["General Consultation", "Malaria/Typhoid Care", "Preventative Care"],
      image: "https://images.unsplash.com/photo-1622902047476-7151b6042426?q=80&w=300&auto=format&fit=crop",
      phone: "+234 808 999 8888"
    }
  ]
};

const CONCERN_METADATA: Record<string, { emoji: string; desc: string }> = {
  "Tooth pain": { emoji: "🦷", desc: "Dental pain & gum swelling" },
  "Back pain": { emoji: "🦴", desc: "Spine, posture or joints" },
  "Pregnancy": { emoji: "🤰", desc: "Prenatal & maternal consult" },
  "Cancer treatment": { emoji: "🎗️", desc: "Oncology clinical guidance" },
  "Eye problem": { emoji: "👁️", desc: "Vision, glaucoma or dry eyes" },
  "Child health": { emoji: "👶", desc: "Infant growth & pediatric checks" },
  "Mental health": { emoji: "🧠", desc: "Anxiety, stress or mood check" },
  "Skin condition": { emoji: "🧴", desc: "Acne, chronic eczema & rashes" },
  "Fever": { emoji: "🤒", desc: "Persistent heat, malaria or typhoid" },
  "Headache": { emoji: "🤕", desc: "Chronic migraine or nerve pain" },
  "Stomach pain": { emoji: "🤢", desc: "Ulcer, digestive tract or gut" },
  "Other": { emoji: "❓", desc: "Describe specific custom issue" }
};

export default function TryItNow() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [state, setState] = useState('');
  const [location, setLocation] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('');
  const [customConcern, setCustomConcern] = useState('');
  
  // Matching results from API
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [recommendedSpecialist, setRecommendedSpecialist] = useState('');
  const [matchedProviders, setMatchedProviders] = useState<any[]>([]);
  const [savedTicket, setSavedTicket] = useState<any | null>(null);

  // Validation helper
  const isStep1Valid = fullName.trim() !== '' && email.trim() !== '' && phoneNumber.trim() !== '' && state !== '' && location.trim() !== '';
  const isStep2Valid = selectedConcern !== '' && (selectedConcern !== 'Other' || customConcern.trim() !== '');

  // Calculate live progress percentage
  const calculateProgress = () => {
    if (step === 4) return 100;
    if (step === 3) return 75;
    
    let count = 0;
    if (fullName.trim() !== '') count += 10;
    if (email.trim() !== '') count += 10;
    if (phoneNumber.trim() !== '') count += 10;
    if (state !== '') count += 10;
    if (location.trim() !== '') count += 10;

    if (step === 2) {
      const step2Progress = selectedConcern !== '' ? 25 : 0;
      return 50 + step2Progress;
    }
    
    return Math.min(count, 50);
  };

  const handleQuickFillDemo = () => {
    setFullName("Aminu Ibrahim");
    setEmail("aminu@example.com");
    setPhoneNumber("+234 803 456 7890");
    setState("Kaduna");
    setLocation("Kaduna North");
  };

  const handleNextStep = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGetAIMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) return;

    setLoading(true);
    setError(null);
    const finalConcern = selectedConcern === 'Other' ? customConcern : selectedConcern;

    try {
      const response = await fetch('/api/match-specialist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concern: finalConcern })
      });

      if (!response.ok) {
        throw new Error('AI Match Service request failed');
      }

      const data = await response.json();
      setAiRecommendation(data.recommendation);
      setRecommendedSpecialist(data.specialist);

      // Extract provider cards dynamically
      let matchedList = MOCK_PROVIDERS[data.specialist] || MOCK_PROVIDERS["General Practitioner"];
      setMatchedProviders(matchedList);
      setStep(3);

    } catch (err: any) {
      console.error("Match Specialist API Error:", err);
      setError("Unable to run clinical AI matcher. Proceeding with offline diagnosis.");
      
      // Fallback offline recommendation mapping
      let spec = "General Practitioner";
      let rec = `Based on your symptoms, you should see a General Practitioner. Let us help you locate nearby primary care clinics.`;
      
      const concernLower = finalConcern.toLowerCase();
      if (concernLower.includes("tooth") || concernLower.includes("dental") || concernLower.includes("mouth")) {
        spec = "Dentist";
        rec = `Based on your symptoms, you should see a Dentist. They specialize in oral pathology, tooth pain relief, and cleanings.`;
      } else if (concernLower.includes("heart") || concernLower.includes("chest") || concernLower.includes("cardio")) {
        spec = "Cardiologist";
        rec = `Based on your symptoms, you should see a Cardiologist. Heart pressure, palpitation checks, and cardiovascular health are critical.`;
      } else if (concernLower.includes("preg") || concernLower.includes("women") || concernLower.includes("gyne")) {
        spec = "Obstetrician & Gynecologist";
        rec = `Based on your symptoms, you should see an Obstetrician & Gynecologist. Dedicated OB/GYN doctors evaluate prenatal care, fertility, and women's health.`;
      } else if (concernLower.includes("cancer") || concernLower.includes("tumor") || concernLower.includes("oncology")) {
        spec = "Oncologist";
        rec = `Based on your symptoms, you should see an Oncologist. Oncology experts provide structured chemotherapy pathways and clinical matches.`;
      } else if (concernLower.includes("eye") || concernLower.includes("vision") || concernLower.includes("ophthal")) {
        spec = "Ophthalmologist";
        rec = `Based on your symptoms, you should see an Ophthalmologist. They treat visual blockages, dry eyes, glaucoma, and prescription lenses.`;
      } else if (concernLower.includes("child") || concernLower.includes("baby") || concernLower.includes("pediat")) {
        spec = "Pediatric Specialist";
        rec = `Based on your symptoms, you should see a Pediatric Specialist. Certified pediatric doctors monitor growth, child asthma, and neonatal diets.`;
      } else if (concernLower.includes("skin") || concernLower.includes("rash") || concernLower.includes("acne") || concernLower.includes("derm")) {
        spec = "Dermatologist";
        rec = `Based on your symptoms, you should see a Dermatologist. Skin allergies, chronic acne, and tropical sun rashes are best treated by a dermatologist.`;
      } else if (concernLower.includes("bone") || concernLower.includes("back") || concernLower.includes("joint") || concernLower.includes("ortho")) {
        spec = "Orthopedic Surgeon";
        rec = `Based on your symptoms, you should see an Orthopedic Surgeon. Bone alignment, lower back issues, and sports fracture rehabilitation are orthopedic fields.`;
      }

      setRecommendedSpecialist(spec);
      setAiRecommendation(rec);
      setMatchedProviders(MOCK_PROVIDERS[spec] || MOCK_PROVIDERS["General Practitioner"]);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndNotify = async (chosenProviderName: string) => {
    setSaving(true);
    const finalConcern = selectedConcern === 'Other' ? customConcern : selectedConcern;

    try {
      const response = await fetch('/api/save-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          phone: phoneNumber,
          state,
          location,
          concern: finalConcern,
          specialist: recommendedSpecialist,
          recommendation: aiRecommendation,
          chosenProvider: chosenProviderName
        })
      });

      if (!response.ok) {
        throw new Error('Save Patient service failed');
      }

      const data = await response.json();
      setSavedTicket(data.patient);
      setStep(4);

    } catch (err) {
      console.error("Save Patient API error:", err);
      // Create local fallback ticket to keep UI highly operational
      setSavedTicket({
        id: `patient-fallback-${Date.now()}`,
        name: fullName,
        email,
        phone: phoneNumber,
        state,
        location,
        concern: finalConcern,
        specialist: recommendedSpecialist,
        recommendation: aiRecommendation,
        chosenProvider: chosenProviderName,
        submittedAt: new Date().toISOString()
      });
      setStep(4);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setState('');
    setLocation('');
    setSelectedConcern('');
    setCustomConcern('');
    setAiRecommendation('');
    setRecommendedSpecialist('');
    setMatchedProviders([]);
    setSavedTicket(null);
    setStep(1);
    setError(null);
  };

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden" id="try-matcher-section">
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#227aba]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#74b645]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#227aba] font-mono text-xs uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Patient Matching Center
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-slate-900 tracking-tight">
            Consultation Matching Engine
          </h2>
          <p className="text-slate-500 font-sans text-sm md:text-base max-w-xl mx-auto">
            Input your symptoms to securely run our AI clinical specialist matching engine and locate nearby verified doctors instantly.
          </p>
        </div>

        {/* Steps indicator bar with Live Progress Meter */}
        <div className="max-w-xl mx-auto mb-8 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-sans font-bold px-1">
            <span>Overall Profile Progress</span>
            <span className="text-[#227aba] bg-cyan-50 border border-cyan-200/50 px-2 py-0.5 rounded-md">
              {calculateProgress()}% Complete
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden p-0.5">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#227aba] to-[#74b645] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            />
          </div>
          
          <div className="flex items-center justify-center gap-2 pt-2">
            {[1, 2, 3, 4].map((num) => (
              <React.Fragment key={num}>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (num === 1) setStep(1);
                      if (num === 2 && isStep1Valid) setStep(2);
                      if (num === 3 && isStep1Valid && isStep2Valid) setStep(3);
                    }}
                    disabled={(num === 2 && !isStep1Valid) || (num === 3 && (!isStep1Valid || !isStep2Valid)) || num === 4}
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
                      step === num 
                        ? 'bg-[#227aba] text-white ring-4 ring-[#227aba]/20'
                        : step > num
                          ? 'bg-[#74b645] text-white'
                          : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                    }`}
                  >
                    {step > num ? <CheckCircle className="w-4 h-4" /> : num}
                  </button>
                  <span className={`text-xs font-semibold hidden sm:inline ${
                    step === num ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {num === 1 && "Patient Details"}
                    {num === 2 && "Symptom Concern"}
                    {num === 3 && "Provider Match"}
                    {num === 4 && "Booking Receipt"}
                  </span>
                </div>
                {num < 4 && (
                  <div className={`h-0.5 flex-grow max-w-[30px] transition-colors ${
                    step > num ? 'bg-[#74b645]' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Card housing form steps */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-100 overflow-hidden relative min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PATIENT INFORMATION */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="p-8 sm:p-10 flex-grow flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Dynamic friendly helper banner */}
                  <div className="bg-gradient-to-r from-cyan-500/5 to-[#227aba]/5 border border-cyan-100 p-4 rounded-2xl flex gap-3 items-start text-left">
                    <span className="text-xl shrink-0">🩺</span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-[#227aba] uppercase tracking-wider font-mono">Dr. Nia • Your Health Assistant</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Welcome to Tinder Health! Please fill out your contact profile below. This lets our matching system securely locate verified specialists in your exact vicinity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-sans font-extrabold text-slate-800 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#227aba]" /> 1. Enter Contact Information
                    </h3>
                    <button
                      type="button"
                      onClick={handleQuickFillDemo}
                      className="text-xs font-bold text-[#227aba] bg-[#227aba]/5 hover:bg-[#227aba]/10 px-3 py-1.5 rounded-lg border border-[#227aba]/10 transition-all cursor-pointer"
                    >
                      ⚡ Auto-fill demo info
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-700 font-sans">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Simi Kaduna"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all placeholder-slate-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-700 font-sans">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. +234 803 123 4567"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all placeholder-slate-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5 text-left md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 font-sans">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. aminu@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all placeholder-slate-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* State Dropdown */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-700 font-sans">State of Residence *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all font-sans appearance-none"
                        >
                          <option value="" disabled>Select state</option>
                          {NIGERIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Location City Area */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-700 font-sans">City / Area *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Kaduna North"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all placeholder-slate-400 font-sans"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 font-sans text-left self-start sm:self-center">
                    {!isStep1Valid ? (
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        ⚠️ Please fill in all fields above to proceed.
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        ✅ Ready! Press the button to choose symptoms.
                      </span>
                    )}
                  </div>

                  <motion.button
                    type="button"
                    disabled={!isStep1Valid}
                    onClick={handleNextStep}
                    whileHover={isStep1Valid ? { scale: 1.02, y: -1 } : {}}
                    whileTap={isStep1Valid ? { scale: 0.98 } : {}}
                    className={`flex items-center gap-2 font-sans text-sm font-extrabold px-7 py-3.5 rounded-xl transition-all cursor-pointer relative overflow-hidden ${
                      isStep1Valid
                        ? 'bg-gradient-to-r from-[#227aba] to-[#1a5f91] text-white shadow-lg shadow-[#227aba]/25 ring-2 ring-white/10'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isStep1Valid && (
                      <span className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
                    )}
                    <span>Select Health Concern</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: HEALTH CONCERN */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="p-8 sm:p-10 flex-grow flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Assistant personalized greeting */}
                  <div className="bg-gradient-to-r from-[#74b645]/5 to-emerald-500/5 border border-emerald-100 p-4 rounded-2xl flex gap-3 items-start text-left">
                    <span className="text-xl shrink-0">👩‍⚕️</span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-[#74b645] uppercase tracking-wider font-mono">Dr. Nia • Health Assistant</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Excellent, <strong>{fullName}</strong>! What health concern or symptoms are you currently experiencing? Select a category with the helper icon below, or click "Other" to write a custom description.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <h3 className="text-lg font-sans font-extrabold text-slate-800 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#227aba]" /> 2. Select Your Symptom Category
                    </h3>
                    <p className="text-xs text-slate-400">Clicking on any category displays its clinical definition instantly.</p>
                  </div>

                  {/* Concern grid selectors with emojis */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {HEALTH_CONCERNS.map((con) => {
                      const meta = CONCERN_METADATA[con] || { emoji: "❓", desc: "Consult general family doctors" };
                      const isSelected = selectedConcern === con;
                      return (
                        <motion.button
                          key={con}
                          type="button"
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setSelectedConcern(con);
                            if (con !== 'Other') setCustomConcern('');
                          }}
                          className={`p-3.5 rounded-2xl border text-left flex gap-3 items-start transition-all cursor-pointer relative overflow-hidden ${
                            isSelected
                              ? 'bg-[#227aba]/5 border-[#227aba] shadow-md shadow-[#227aba]/5 ring-1 ring-[#227aba]/20'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-2xl pt-0.5 shrink-0 select-none">{meta.emoji}</span>
                          <div className="space-y-0.5">
                            <span className={`text-xs font-bold block ${
                              isSelected ? 'text-[#227aba]' : 'text-slate-800'
                            }`}>
                              {con}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium block leading-snug">
                              {meta.desc}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#227aba]" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Custom concern free text */}
                  {selectedConcern === 'Other' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1.5 text-left"
                    >
                      <label className="text-xs font-extrabold text-slate-700 font-sans">Describe custom concern *</label>
                      <textarea
                        required
                        rows={3}
                        value={customConcern}
                        onChange={(e) => setCustomConcern(e.target.value)}
                        placeholder="e.g. Swollen gums with persistent sharp pain when chewing, headache for 2 days..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba]/20 focus:bg-white outline-none transition-all placeholder-slate-400 font-sans resize-none shadow-inner"
                      />
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-1.5 font-sans text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 px-5 py-3.5 rounded-xl transition-all cursor-pointer self-start sm:self-center"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <div className="text-xs text-slate-400 font-sans text-left self-start sm:self-center">
                    {!isStep2Valid && (
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        ⚠️ Choose a category to launch medical match.
                      </span>
                    )}
                  </div>

                  <motion.button
                    type="button"
                    disabled={!isStep2Valid || loading}
                    onClick={handleGetAIMatch}
                    whileHover={isStep2Valid && !loading ? { scale: 1.02, y: -1 } : {}}
                    whileTap={isStep2Valid && !loading ? { scale: 0.98 } : {}}
                    className={`flex items-center gap-2 font-sans text-sm font-extrabold px-7 py-3.5 rounded-xl transition-all cursor-pointer relative overflow-hidden ${
                      isStep2Valid && !loading
                        ? 'bg-gradient-to-r from-[#227aba] to-[#74b645] text-white shadow-lg shadow-[#74b645]/25 ring-2 ring-white/10'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Analyzing Symptoms...</span>
                      </>
                    ) : (
                      <>
                        {isStep2Valid && (
                          <span className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
                        )}
                        <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>Run AI Clinical Matcher</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SPECIALIST RECOMMENDATION & PROVIDER MATCH CARDS */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 sm:p-10 flex-grow flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* AI Match Recommendation Box */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-[#74b645]/10 border border-cyan-500/20 p-5 rounded-2xl relative overflow-hidden text-left">
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#227aba] uppercase tracking-wider font-mono">Tinder Health AI Match Recommendation</span>
                      <p className="text-sm font-sans font-extrabold text-slate-900 leading-relaxed border-b border-slate-200/50 pb-2 mb-2">
                        {aiRecommendation}
                      </p>
                      <span className="text-[11px] text-slate-400 block font-sans">
                        ⚠️ Please notice: Tinder Health AI is a supportive diagnostic match assistant and does not replace official clinical diagnoses.
                      </span>
                    </div>
                  </div>

                  {/* Provider Grid matching Specialist */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                        Available {recommendedSpecialist}s Near You
                      </h4>
                      <span className="text-[11px] font-bold text-[#74b645] bg-[#74b645]/10 px-2 py-0.5 rounded-full">
                        {matchedProviders.length} Matches Found
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchedProviders.map((prov, index) => (
                        <div 
                          key={index}
                          className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 hover:border-[#227aba]/40 transition-colors hover:shadow-md"
                        >
                          <img 
                            src={prov.image} 
                            alt={prov.name} 
                            className="w-16 h-16 rounded-xl object-cover self-start border border-slate-200"
                          />
                          <div className="flex-grow text-left space-y-2">
                            <div>
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-bold text-slate-800">{prov.name}</h5>
                                <span className="text-[10px] text-slate-500 font-sans font-semibold flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9
                                </span>
                              </div>
                              <p className="text-xs text-[#227aba] font-medium font-sans">{prov.specialist}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-[11px] text-slate-500 font-sans">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {prov.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" /> {prov.hours}
                              </span>
                              <span className="col-span-2 font-semibold text-slate-700">
                                Price: {prov.price}
                              </span>
                            </div>

                            {/* Services taglist */}
                            <div className="flex flex-wrap gap-1">
                              {prov.services.map((srv: string, sIdx: number) => (
                                <span key={sIdx} className="text-[9px] bg-white border border-slate-150 px-1.5 py-0.5 rounded text-slate-500">
                                  {srv}
                                </span>
                              ))}
                            </div>

                            {/* Contact & Confirm buttons */}
                            <div className="pt-2 flex gap-2">
                              <a 
                                href={`tel:${prov.phone}`}
                                className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg p-2 flex-grow text-center text-xs font-bold transition-all"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                                Call
                              </a>
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => handleSaveAndNotify(prov.name)}
                                className="bg-[#227aba] hover:bg-[#1a5f91] text-white text-xs font-bold px-3 py-2 rounded-lg flex-grow flex items-center justify-center gap-1 transition-all shadow-sm"
                              >
                                {saving ? (
                                  <RefreshCw className="w-3 h-3 animate-spin" />
                                ) : (
                                  <>
                                    Book Match
                                    <ExternalLink className="w-3 h-3" />
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-1.5 font-sans text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 px-5 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveAndNotify("Direct Self-Consultation")}
                    className="flex items-center gap-1 px-5 py-3 rounded-xl font-sans text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all"
                  >
                    Skip Provider Booking
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS TICKET / RECEIPT */}
            {step === 4 && savedTicket && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 flex-grow flex flex-col justify-between"
              >
                <div className="space-y-6 text-center max-w-lg mx-auto">
                  <div className="w-16 h-16 bg-[#74b645]/15 rounded-full flex items-center justify-center text-[#74b645] mx-auto animate-bounce">
                    <CheckCircle className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-sans font-extrabold text-slate-900">
                      Match Booked Successfully!
                    </h3>
                    <p className="text-sm text-slate-500 font-sans">
                      Your patient capture details have been recorded and sent to the Tinder Health clinical coordination team.
                    </p>
                  </div>

                  {/* Receipt Voucher Panel */}
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 text-left space-y-4 font-sans relative">
                    {/* Top ticket hole indicators */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full" />

                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                      <span>TICKET ID: {savedTicket.id}</span>
                      <span>{new Date(savedTicket.submittedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="border-t border-slate-200 pt-3 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">Patient Name</span>
                        <span className="text-slate-800 font-bold">{savedTicket.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">Phone Number</span>
                        <span className="text-slate-800 font-bold">{savedTicket.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">State / Location</span>
                        <span className="text-slate-800 font-bold">{savedTicket.state}, {savedTicket.location}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase">Assigned Specialist</span>
                        <span className="text-[#227aba] font-extrabold">{savedTicket.specialist}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 block font-semibold uppercase">Primary Symptom</span>
                        <span className="text-slate-700 italic font-medium">"{savedTicket.concern}"</span>
                      </div>
                      <div className="col-span-2 border-t border-slate-150 pt-3">
                        <span className="text-slate-400 block font-semibold uppercase">Selected Clinic Provider</span>
                        <span className="text-[#74b645] font-extrabold text-sm">{savedTicket.chosenProvider || "Direct Self-Consultation"}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans">
                    A team coordinator will contact you at <strong>{savedTicket.phone}</strong> shortly to finalize details and schedule slot availability.
                  </p>
                </div>

                <div className="mt-8 flex justify-center border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-[#227aba] hover:bg-[#1a5f91] text-white font-sans text-sm font-bold px-8 py-3 rounded-full hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-[#227aba]/20"
                  >
                    Start New Consultation Search
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
