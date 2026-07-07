/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, X, Sparkles, Star, MapPin, CheckCircle, Languages, 
  Calendar, Building, HelpCircle, SlidersHorizontal, Trash2, 
  Bookmark, Check, RefreshCw, MessageSquare, History, Info, Send 
} from 'lucide-react';
import { Doctor } from '../types';
import { doctorsData } from '../data/doctors';

interface ConsultationMatcherProps {
  onMatchDoctor: (doctor: Doctor) => void;
}

interface Filters {
  specialty: string;
  location: string;
  maxFee: number;
  language: string;
}

export default function ConsultationMatcher({ onMatchDoctor }: ConsultationMatcherProps) {
  // State for index and matched overlay
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedDoc, setMatchedDoc] = useState<Doctor | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  // Filters State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    specialty: '',
    location: '',
    maxFee: 5000,
    language: '',
  });

  // Favorites (Patients Favorites) State with LocalStorage persistence
  const [favorites, setFavorites] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem('tinder_health_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Match History State with LocalStorage persistence
  const [matchHistory, setMatchHistory] = useState<Array<{ doctor: Doctor; timestamp: string }>>(() => {
    try {
      const saved = localStorage.getItem('tinder_health_matches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Smart Match Tooltip State
  const [showTooltipId, setShowTooltipId] = useState<string | null>(null);

  // Simulated Medical Chat States
  const [chatDoctor, setChatDoctor] = useState<Doctor | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'doctor'; text: string; time: string }>>([]);
  const [customMsgText, setCustomMsgText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Sync favorites with local storage
  useEffect(() => {
    localStorage.setItem('tinder_health_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync match history with local storage
  useEffect(() => {
    localStorage.setItem('tinder_health_matches', JSON.stringify(matchHistory));
  }, [matchHistory]);

  // Extract unique filter options from full doctors database
  const specialties = Array.from(new Set(doctorsData.map(d => d.specialty))).sort();
  const locations = Array.from(new Set(doctorsData.map(d => {
    // Just get the State/City part for cleaner UI
    const parts = d.locationName.split(',');
    return parts[parts.length - 1]?.trim() || d.locationName;
  }))).sort();
  const languages = Array.from(new Set(doctorsData.flatMap(d => d.languages))).sort();

  // Apply filters to doctors data
  const filteredDoctors = doctorsData.filter(doctor => {
    if (filters.specialty && doctor.specialty !== filters.specialty) return false;
    if (filters.location && !doctor.locationName.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (doctor.consultationFeeMin > filters.maxFee) return false;
    if (filters.language && !doctor.languages.includes(filters.language)) return false;
    return true;
  });

  const currentDoctor = filteredDoctors[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (filteredDoctors.length === 0) return;
    
    setSwipeDirection(direction);
    
    // Let animation finish
    setTimeout(() => {
      if (direction === 'right') {
        const doc = filteredDoctors[currentIndex];
        setMatchedDoc(doc);
        // Automatically add to favorites on right swipe/match if not already added
        if (!favorites.some(f => f.id === doc.id)) {
          setFavorites(prev => [...prev, doc]);
        }
        // Automatically append to match history if not already listed
        if (!matchHistory.some(m => m.doctor.id === doc.id)) {
          setMatchHistory(prev => [
            { doctor: doc, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            ...prev
          ]);
        }
      }
      
      setCurrentIndex((prev) => {
        if (filteredDoctors.length <= 1) return 0;
        return (prev + 1) % filteredDoctors.length;
      });
      setSwipeDirection(null);
      setDragOffset(0);
    }, 300);
  };

  const handleBookingTrigger = () => {
    if (matchedDoc) {
      onMatchDoctor(matchedDoc);
      setMatchedDoc(null);
    }
  };

  const toggleFavorite = (doctor: Doctor, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isFav = favorites.some(f => f.id === doctor.id);
    if (isFav) {
      setFavorites(prev => prev.filter(f => f.id !== doctor.id));
    } else {
      setFavorites(prev => [...prev, doctor]);
    }
  };

  const clearFilters = () => {
    setFilters({
      specialty: '',
      location: '',
      maxFee: 5000,
      language: '',
    });
    setCurrentIndex(0);
  };

  // Chat launcher
  const openChatWithDoctor = (doctor: Doctor, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setChatDoctor(doctor);
    setChatMessages([
      {
        sender: 'doctor',
        text: `Hello! I'm ${doctor.name}, a specialist in ${doctor.specialty} at ${doctor.hospital}. How can I support your healthcare goals today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Send message and trigger smart automated reply
  const sendChatMessage = (text: string) => {
    if (!text.trim() || !chatDoctor) return;

    const userMsg = {
      sender: 'user' as const,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setCustomMsgText('');
    setIsTyping(true);

    // Dynamic responses tailored to clinical keywords
    setTimeout(() => {
      let reply = `Thank you for reaching out. To evaluate this properly, let's schedule a formal virtual consultation. I am available during my regular hours (${chatDoctor.availability.join(', ')}).`;

      const textLower = text.toLowerCase();
      if (textLower.includes('insurance') || textLower.includes('hmo') || textLower.includes('cover') || textLower.includes('nhis')) {
        reply = `Yes, my clinical team at ${chatDoctor.hospital} coordinates directly with major NHIS and domestic HMO insurance providers. Let's register your coverage codes during our scheduled session.`;
      } else if (textLower.includes('urgent') ||textLower.includes('emergency') || textLower.includes('today') || textLower.includes('now')) {
        reply = `For emergency attention, please report directly to the ER or ward desk at ${chatDoctor.hospital}. For urgent but non-life-threatening clinical guidance, book a slot now so my assistants can fit you in today!`;
      } else if (textLower.includes('prescription') || textLower.includes('drug') || textLower.includes('refill') || textLower.includes('medicine')) {
        reply = `I can review clinical charts and issue certified prescription renewals securely online, provided we complete a brief diagnostic check-in.`;
      } else if (textLower.includes('fee') || textLower.includes('cost') || textLower.includes('price')) {
        reply = `My standard upfront clinical consult fee ranges from ₦${chatDoctor.consultationFeeMin.toLocaleString()} to ₦${chatDoctor.consultationFeeMax.toLocaleString()}. This includes comprehensive clinical reviews and preliminary treatment pathways.`;
      }

      setChatMessages(prev => [...prev, {
        sender: 'doctor',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1100);
  };

  // Algorithmic Match Score generation (85% to 99% based on affinity + criteria)
  const calculateMatchScore = (doctor: Doctor) => {
    let score = 86 + Math.round(doctor.rating * 2); // Base score from rating 4.7 - 4.95
    
    // Deterministic offset based on ID length & string hash
    const hash = doctor.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    score += (hash % 5);

    // Boost score if they match user preferences/languages
    if (filters.language && doctor.languages.includes(filters.language)) {
      score += 3;
    }
    if (filters.specialty && doctor.specialty === filters.specialty) {
      score += 4;
    }
    if (doctor.consultationFeeMin < 3000) {
      score += 2; // affordability boost
    }

    return Math.min(99, Math.max(82, score));
  };

  return (
    <section id="consultation-matcher" className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-100">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#227aba]/5 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#74b645]/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#227aba]/10 text-[#227aba] border border-[#227aba]/20 font-sans text-xs font-semibold uppercase tracking-wider mb-3">
            Swipe Consultation
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
            Tinder-Style Clinical Matcher
          </h2>
          <p className="text-slate-600 font-sans text-sm mt-3">
            Swipe right to Match &amp; save to Favorites, or swipe left to skip. Adjust your clinical parameters using the Filter Drawer.
          </p>
        </div>

        {/* Toolbar: Filters, Favorites, and Match History triggers */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            id="toolbar-filter-btn"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#227aba] hover:border-[#227aba]/30 transition-all text-xs font-semibold cursor-pointer shadow-sm shadow-slate-100"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#227aba]" />
            Adjust Filters
            {(filters.specialty || filters.location || filters.language || filters.maxFee < 5000) && (
              <span className="w-2 h-2 rounded-full bg-[#74b645] animate-ping" />
            )}
          </button>

          <button
            id="toolbar-favorites-btn"
            onClick={() => setIsFavoritesOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-200 transition-all text-xs font-semibold cursor-pointer shadow-sm shadow-slate-100"
          >
            <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
            Patients Favorites
            {favorites.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            id="toolbar-history-btn"
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#227aba] hover:border-[#227aba]/30 transition-all text-xs font-semibold cursor-pointer shadow-sm shadow-slate-100"
          >
            <History className="w-4 h-4 text-[#227aba]" />
            Match History
            {matchHistory.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#227aba] text-white text-[10px] font-bold">
                {matchHistory.length}
              </span>
            )}
          </button>
        </div>

        {/* Match Deck Display area */}
        <div className="flex flex-col items-center justify-center max-w-md mx-auto min-h-[580px] relative">
          
          <AnimatePresence mode="wait">
            {matchedDoc ? (
              /* MATCH SUCCESS DIALOG OVERLAY WITH CELEBRATION PARTICLES */
              <motion.div
                key="match-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-[#142236] border border-[#74b645]/30 p-8 rounded-3xl shadow-2xl shadow-[#74b645]/10 text-center space-y-6 flex flex-col items-center relative overflow-hidden"
              >
                {/* Float-up medical celebration particles */}
                {Array.from({ length: 12 }).map((_, idx) => (
                  <motion.span
                    key={`celebration-particle-${idx}`}
                    initial={{ x: 0, y: 150, scale: 0, opacity: 1 }}
                    animate={{
                      x: (idx % 2 === 0 ? 1 : -1) * (15 + (idx * 15) % 110),
                      y: -190 - ((idx * 20) % 140),
                      scale: [0, 1.25, 0.9, 0],
                      opacity: [1, 1, 0.7, 0],
                    }}
                    transition={{
                      duration: 1.8 + (idx * 0.1) % 1.0,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: (idx * 0.12) % 1.2,
                    }}
                    className="absolute z-10 text-base pointer-events-none select-none"
                  >
                    {['❤️', '✨', '⭐', '🩺', '💖', '⚡'][idx % 6]}
                  </motion.span>
                ))}

                <div className="relative z-20">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#74b645] shadow-lg mx-auto">
                    <img 
                      src={matchedDoc.image} 
                      alt={matchedDoc.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 right-2 bg-[#74b645] text-[#101415] rounded-full p-2 border-2 border-[#142236]">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                </div>

                <div className="space-y-2 relative z-20">
                  <span className="text-[#74b645] font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-4 h-4 animate-bounce" /> It's a Match! 🎉
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">{matchedDoc.name}</h3>
                  <p className="text-gray-400 text-xs font-mono">{matchedDoc.specialty} at {matchedDoc.hospital}</p>
                </div>

                <div className="bg-[#0B0F10] p-4 rounded-xl border border-white/5 w-full text-left text-xs space-y-2 relative z-20">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Consultation Cost:</span>
                    <span className="text-[#74b645] font-bold font-mono">₦{matchedDoc.consultationFeeMin.toLocaleString()} upfront</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hospital:</span>
                    <span className="text-white font-medium">{matchedDoc.hospital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Supported Languages:</span>
                    <span className="text-[#227aba] font-medium">{matchedDoc.languages.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full relative z-20">
                  <button
                    id="match-book-btn"
                    onClick={handleBookingTrigger}
                    className="w-full bg-[#74b645] hover:bg-[#74b645]/90 text-[#101415] font-sans text-sm font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#74b645]/20 active:scale-95"
                  >
                    Instantly Book Consultation
                  </button>
                  <button
                    id="match-chat-btn"
                    onClick={() => {
                      const doc = matchedDoc;
                      setMatchedDoc(null);
                      openChatWithDoctor(doc);
                    }}
                    className="w-full bg-[#227aba] hover:bg-[#227aba]/90 text-white font-sans text-xs py-2.5 rounded-lg border border-white/5 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Quick Message Specialist
                  </button>
                  <button
                    id="match-swipe-btn"
                    onClick={() => setMatchedDoc(null)}
                    className="w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-sans text-xs py-2.5 rounded-lg border border-white/5 transition-all cursor-pointer"
                  >
                    Keep Swiping Specialists
                  </button>
                </div>
              </motion.div>
            ) : filteredDoctors.length === 0 ? (
              /* EMPTY FILTER FALLBACK DECK */
              <motion.div
                key="empty-deck"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[#142236]/90 border border-white/10 p-8 rounded-3xl text-center space-y-6 flex flex-col justify-center items-center min-h-[480px]"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-white">No Match Found</h3>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto">
                    Try relaxing your filters, extending your budget, or changing states.
                  </p>
                </div>
                <button
                  id="empty-reset-btn"
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#227aba] hover:bg-[#227aba]/90 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#227aba]/20 active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Filter Parameters
                </button>
              </motion.div>
            ) : (
              /* TINDER CARD WRAPPER */
              <div className="w-full flex flex-col justify-between h-full space-y-6">
                
                {/* Drag-enabled sliding card */}
                <div className="relative w-full min-h-[480px]">
                  <motion.div
                    key={currentDoctor.id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDrag={(event, info) => {
                      setDragOffset(info.offset.x);
                    }}
                    onDragEnd={(event, info) => {
                      const threshold = 100;
                      if (info.offset.x > threshold) {
                        handleSwipe('right');
                      } else if (info.offset.x < -threshold) {
                        handleSwipe('left');
                      } else {
                        setDragOffset(0);
                      }
                    }}
                    animate={{
                      x: swipeDirection === 'left' ? -350 : swipeDirection === 'right' ? 350 : 0,
                      rotate: swipeDirection === 'left' ? -15 : swipeDirection === 'right' ? 15 : (dragOffset * 0.04),
                      opacity: swipeDirection ? 0 : 1,
                      scale: 1,
                    }}
                    initial={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="w-full absolute inset-y-0 bg-white border border-slate-200 p-6 rounded-3xl shadow-lg hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1 hover:border-[#227aba]/30 relative select-none cursor-grab active:cursor-grabbing group min-h-[480px] flex flex-col justify-between transition-all duration-300 ease-out overflow-hidden"
                  >
                    {/* Swipe Visual Feedback Badges */}
                    {dragOffset > 20 && (
                      <div 
                        style={{ opacity: Math.min(0.9, (dragOffset - 20) / 80) }}
                        className="absolute top-6 left-6 z-20 border-4 border-emerald-500 text-emerald-500 bg-white font-sans font-black text-xl uppercase tracking-widest px-4 py-1.5 rounded-lg rotate-[-12deg] pointer-events-none shadow-lg"
                      >
                        MATCH
                      </div>
                    )}
                    {dragOffset < -20 && (
                      <div 
                        style={{ opacity: Math.min(0.9, (-dragOffset - 20) / 80) }}
                        className="absolute top-6 right-6 z-20 border-4 border-rose-500 text-rose-500 bg-white font-sans font-black text-xl uppercase tracking-widest px-4 py-1.5 rounded-lg rotate-[12deg] pointer-events-none shadow-lg"
                      >
                        SKIP
                      </div>
                    )}

                    {/* Card top branding indicators */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-[#227aba]/10 text-[#227aba] border border-[#227aba]/20 px-2.5 py-1 rounded-md text-[10px] font-bold font-sans tracking-wider flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-[#227aba]" /> {currentDoctor.hospital}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {/* Algorithmic Match Score Indicator with Interactive Tooltip */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTooltipId(showTooltipId === currentDoctor.id ? null : currentDoctor.id);
                              }}
                              className="bg-[#74b645]/10 hover:bg-[#74b645]/25 text-[#74b645] border border-[#74b645]/30 px-2.5 py-1 rounded text-[10px] font-bold font-sans flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                              title="Click for Smart Match details"
                            >
                              ⚡ {calculateMatchScore(currentDoctor)}% Match
                              <Info className="w-3 h-3 text-[#74b645]" />
                            </button>

                            {/* Smart Match Tooltip popup */}
                            <AnimatePresence>
                              {showTooltipId === currentDoctor.id && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowTooltipId(null);
                                    }} 
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-[#0B0F10] border border-white/10 p-4 rounded-2xl shadow-xl z-50 text-left space-y-2 select-none"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <h5 className="font-serif font-bold text-white text-[11px] flex items-center gap-1">
                                      <Sparkles className="w-3.5 h-3.5 text-[#227aba]" />
                                      Smart Match Analysis
                                    </h5>
                                    <p className="text-gray-400 text-[10px] leading-relaxed">
                                      This personalized rating matches your clinical and personal coordinates in real-time:
                                    </p>
                                    <div className="space-y-1 text-[9px] font-mono text-gray-400">
                                      <div className="flex justify-between">
                                        <span>Specialty Alignment:</span>
                                        <span className="text-[#74b645]">
                                          {filters.specialty ? "100% Fit" : "90% general"}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Pricing & Fee Level:</span>
                                        <span className="text-[#74b645]">
                                          {currentDoctor.consultationFeeMin < 3000 ? "Affordable" : "Standard"}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Language Fit:</span>
                                        <span className="text-[#227aba]">
                                          {filters.language ? "Direct Match" : "Compatible"}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Provider Reputation:</span>
                                        <span className="text-yellow-500">{currentDoctor.rating} ★ Rating</span>
                                      </div>
                                    </div>
                                    <div className="pt-2 border-t border-white/5 flex justify-end">
                                      <button 
                                        onClick={() => setShowTooltipId(null)}
                                        className="text-[9px] text-[#227aba] hover:underline font-bold"
                                      >
                                        Close Info
                                      </button>
                                    </div>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded text-[10px] font-bold font-sans shadow-sm">
                            <Star className="w-3 h-3 fill-current" /> {currentDoctor.rating}
                          </div>
                        </div>
                      </div>

                      {/* Specialist Photo and Title */}
                      <div className="flex items-center gap-4 mb-4 relative">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 shrink-0 relative">
                          <img 
                            src={currentDoctor.image} 
                            alt={currentDoctor.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </div>
                        <div className="text-left flex-grow">
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1">
                              <h4 className="font-sans font-bold text-lg text-slate-800 leading-tight">{currentDoctor.name}</h4>
                              <CheckCircle className="w-4 h-4 text-[#227aba] shrink-0 fill-[#227aba]/10" />
                            </div>
                            
                            {/* Star/Heart Bookmark for Patients Favorites & Quick Message */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={(e) => openChatWithDoctor(currentDoctor, e)}
                                className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all text-slate-500 hover:text-[#227aba] cursor-pointer"
                                title="Send a Quick Message"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>

                              <button
                                onClick={(e) => toggleFavorite(currentDoctor, e)}
                                className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all text-slate-500 hover:text-rose-500 cursor-pointer"
                                title={favorites.some(f => f.id === currentDoctor.id) ? "Remove from Favorites" : "Save to Favorites"}
                              >
                                <Heart 
                                  className={`w-4 h-4 transition-all ${
                                    favorites.some(f => f.id === currentDoctor.id) 
                                      ? 'fill-rose-500 text-rose-500' 
                                      : 'text-slate-400 hover:text-rose-500'
                                  }`} 
                                />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-[#227aba] font-sans text-xs font-semibold uppercase tracking-wide mt-0.5">{currentDoctor.specialty}</p>
                          <span className="text-[10px] text-slate-500 font-sans flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-[#227aba]" /> {currentDoctor.locationName}
                          </span>
                        </div>
                      </div>

                      {/* Pricing Highlight Tag */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 text-left mb-4 flex justify-between items-center">
                        <span className="text-slate-500 text-[10px] uppercase font-sans tracking-wider">Up-Front Fee:</span>
                        <span className="text-[#227aba] font-extrabold text-sm font-sans">
                          ₦{currentDoctor.consultationFeeMin.toLocaleString()} – ₦{currentDoctor.consultationFeeMax.toLocaleString()}
                        </span>
                      </div>

                      {/* Description Bio */}
                      <div className="text-left text-xs text-slate-600 leading-relaxed mb-4">
                        <span className="text-slate-400 font-sans text-[9px] uppercase tracking-widest block mb-1">Provider Brief:</span>
                        <p className="line-clamp-3">{currentDoctor.bio}</p>
                      </div>
                    </div>

                    {/* Languages and Availability Footer section */}
                    <div className="space-y-3 pt-3 border-t border-slate-100 text-left">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Languages className="w-3.5 h-3.5 text-[#227aba]" />
                        <span className="font-semibold text-slate-500">Languages:</span>
                        <span className="text-slate-700 font-medium">{currentDoctor.languages.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-[#74b645]" />
                        <span className="font-semibold text-slate-500">Schedules:</span>
                        <span className="text-slate-700 font-medium">{currentDoctor.availability.join(', ')}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* SWIPE CONTROL BUTTONS */}
                <div className="flex justify-center items-center gap-6">
                  {/* Skip Left Button */}
                  <button
                    onClick={() => handleSwipe('left')}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#142236] to-[#0B0F10] border border-red-500/20 hover:border-red-500/50 shadow-lg shadow-red-500/5 hover:scale-105 active:scale-95 text-red-400 flex items-center justify-center transition-all cursor-pointer group"
                    id="swipe-btn-skip"
                    title="Skip (Swipe Left)"
                  >
                    <X className="w-6 h-6 group-hover:rotate-9deg transition-transform" />
                  </button>

                  <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5 select-none">
                    Drag card or tap
                  </span>

                  {/* Match Right Button */}
                  <button
                    onClick={() => handleSwipe('right')}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#142236] to-[#0B0F10] border border-[#74b645]/20 hover:border-[#74b645]/50 shadow-lg shadow-[#74b645]/5 hover:scale-105 active:scale-95 text-[#74b645] flex items-center justify-center transition-all cursor-pointer group animate-pulse"
                    id="swipe-btn-match"
                    title="Match Specialist (Swipe Right)"
                  >
                    <Heart className="w-6 h-6 group-hover:scale-110 transition-transform fill-current" />
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FILTER DRAWER SLIDE OUT (FROM LEFT) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-[#0B0F10]/85 backdrop-blur-sm z-50 cursor-pointer"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-sm bg-[#142236] border-r border-white/10 p-6 z-50 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-[#227aba]" />
                    <h3 className="font-serif font-bold text-white text-lg">Clinical Filters</h3>
                  </div>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Filter specialty */}
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-mono uppercase tracking-wider block">Specialty</label>
                  <select
                    value={filters.specialty}
                    onChange={(e) => handleFilterChange({ specialty: e.target.value })}
                    className="w-full bg-[#0B0F10] border border-white/10 p-3 rounded-xl text-xs text-white focus:border-[#227aba] focus:outline-none"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* Filter location */}
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-mono uppercase tracking-wider block">Location / State</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange({ location: e.target.value })}
                    className="w-full bg-[#0B0F10] border border-white/10 p-3 rounded-xl text-xs text-white focus:border-[#227aba] focus:outline-none"
                  >
                    <option value="">All States</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Filter language */}
                <div className="space-y-2">
                  <label className="text-gray-400 text-xs font-mono uppercase tracking-wider block">Preferred Language</label>
                  <select
                    value={filters.language}
                    onChange={(e) => handleFilterChange({ language: e.target.value })}
                    className="w-full bg-[#0B0F10] border border-white/10 p-3 rounded-xl text-xs text-white focus:border-[#227aba] focus:outline-none"
                  >
                    <option value="">Any Language</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Filter price ceiling */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-400 text-xs font-mono uppercase tracking-wider">Max Up-Front Fee</label>
                    <span className="text-[#74b645] font-mono text-xs font-bold">₦{filters.maxFee.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="5000"
                    step="250"
                    value={filters.maxFee}
                    onChange={(e) => handleFilterChange({ maxFee: Number(e.target.value) })}
                    className="w-full accent-[#74b645] cursor-pointer bg-white/10 h-1.5 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>₦2,000</span>
                    <span>₦3,500</span>
                    <span>₦5,000</span>
                  </div>
                </div>
              </div>

              {/* Reset trigger in Drawer */}
              <div className="pt-6 border-t border-white/5 space-y-2">
                <button
                  onClick={clearFilters}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Filter Parameters
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#227aba] hover:bg-[#227aba]/90 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  Apply Filters &amp; Explore
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PATIENTS FAVORITES DRAWER SLIDE OUT (FROM RIGHT) */}
      <AnimatePresence>
        {isFavoritesOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFavoritesOpen(false)}
              className="fixed inset-0 bg-[#0B0F10]/85 backdrop-blur-sm z-50 cursor-pointer"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#142236] border-l border-white/10 p-6 z-50 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#74b645] fill-[#74b645]/20" />
                    <h3 className="font-sans font-bold text-white text-lg">Saved Specialists</h3>
                  </div>
                  <button 
                    onClick={() => setIsFavoritesOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {favorites.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
                      <Heart className="w-6 h-6" />
                    </div>
                    <p className="text-gray-400 text-xs font-sans max-w-xs mx-auto">
                      No saved specialists yet. Swipe right on matching cards to save providers automatically.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                    {favorites.map((fav) => (
                      <div 
                        key={fav.id}
                        className="p-3 rounded-xl bg-[#0B0F10] border border-white/5 hover:border-white/15 transition-all flex items-center gap-3 group relative"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <img 
                            src={fav.image} 
                            alt={fav.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow text-left">
                          <h4 className="text-xs font-bold text-white group-hover:text-[#227aba] transition-colors">{fav.name}</h4>
                          <p className="text-[10px] text-[#74b645] font-mono">{fav.specialty}</p>
                          <span className="text-[9px] text-gray-500 font-mono block">₦{fav.consultationFeeMin.toLocaleString()} Upfront</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 z-10">
                          <button
                            onClick={() => {
                              openChatWithDoctor(fav);
                              setIsFavoritesOpen(false);
                            }}
                            className="p-1.5 rounded bg-white/5 hover:bg-[#227aba]/20 text-gray-400 hover:text-[#227aba] transition-all cursor-pointer"
                            title="Chat now"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              onMatchDoctor(fav);
                              setIsFavoritesOpen(false);
                            }}
                            className="px-2.5 py-1.5 rounded bg-[#227aba] hover:bg-[#227aba]/90 text-white font-sans text-[10px] font-bold transition-all cursor-pointer"
                          >
                            Book
                          </button>
                          <button
                            onClick={(e) => toggleFavorite(fav, e)}
                            className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-red-400 transition-all cursor-pointer flex justify-center"
                            title="Remove favorite"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {favorites.length > 0 && (
                <div className="pt-6 border-t border-white/5">
                  <button
                    onClick={() => {
                      if (window.confirm("Clear all your saved specialists?")) {
                        setFavorites([]);
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Clear All Favorites
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MATCH HISTORY DRAWER SLIDE OUT (FROM RIGHT) */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 bg-[#0B0F10]/85 backdrop-blur-sm z-50 cursor-pointer"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#142236] border-l border-white/10 p-6 z-50 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-[#227aba]" />
                    <h3 className="font-sans font-bold text-white text-lg">Match History</h3>
                  </div>
                  <button 
                    onClick={() => setIsHistoryOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {matchHistory.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
                      <History className="w-6 h-6" />
                    </div>
                    <p className="text-gray-400 text-xs font-sans max-w-xs mx-auto">
                      No matches registered this session. Swipe right on specialist cards to trigger clinical matches!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                    {matchHistory.map(({ doctor, timestamp }) => (
                      <div 
                        key={`history-${doctor.id}`}
                        className="p-3 rounded-xl bg-[#0B0F10] border border-white/5 hover:border-white/15 transition-all flex items-center gap-3 group relative"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow text-left">
                          <h4 className="text-xs font-bold text-white group-hover:text-[#227aba] transition-colors">{doctor.name}</h4>
                          <p className="text-[10px] text-[#74b645] font-mono">{doctor.specialty}</p>
                          <span className="text-[9px] text-gray-500 font-mono block">Matched at {timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 z-10">
                          <button
                            onClick={() => {
                              openChatWithDoctor(doctor);
                              setIsHistoryOpen(false);
                            }}
                            className="p-1.5 rounded bg-white/5 hover:bg-[#227aba]/20 text-gray-400 hover:text-[#227aba] transition-all cursor-pointer"
                            title="Chat now"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              onMatchDoctor(doctor);
                              setIsHistoryOpen(false);
                            }}
                            className="px-2.5 py-1.5 rounded bg-[#74b645] hover:bg-[#74b645]/90 text-[#101415] font-sans text-[10px] font-bold transition-all cursor-pointer"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {matchHistory.length > 0 && (
                <div className="pt-6 border-t border-white/5">
                  <button
                    onClick={() => {
                      if (window.confirm("Clear your full match history?")) {
                        setMatchHistory([]);
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Clear Match History
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SIMULATED MEDICAL CHAT OVERLAY MODAL */}
      <AnimatePresence>
        {chatDoctor && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatDoctor(null)}
              className="fixed inset-0 bg-[#0B0F10]/90 backdrop-blur-md z-50 cursor-pointer"
            />
            
            {/* Chat Dialog container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-w-md w-full md:w-[440px] bg-[#142236] border border-white/10 rounded-3xl z-50 shadow-2xl overflow-hidden flex flex-col h-[520px]"
            >
              {/* Chat Header */}
              <div className="p-4 bg-[#0B0F10]/40 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#74b645]/40 relative">
                    <img 
                      src={chatDoctor.image} 
                      alt={chatDoctor.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#142236] rounded-full" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white">{chatDoctor.name}</h4>
                    <span className="text-[10px] text-gray-400 font-mono">{chatDoctor.specialty} • Active Now</span>
                  </div>
                </div>
                <button 
                  onClick={() => setChatDoctor(null)}
                  className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Stream */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3 flex flex-col justify-between">
                <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={`chat-msg-${i}`}
                      className={`flex flex-col max-w-[80%] ${
                        msg.sender === 'user' ? 'ml-auto text-right items-end' : 'mr-auto text-left items-start'
                      }`}
                    >
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-[#227aba] text-white rounded-br-none' 
                          : 'bg-[#0B0F10] text-gray-200 border border-white/5 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-gray-500 font-mono mt-1">{msg.time}</span>
                    </div>
                  ))}

                  {/* Doctor typing placeholder */}
                  {isTyping && (
                    <div className="flex items-center gap-2 mr-auto text-left">
                      <div className="bg-[#0B0F10] border border-white/5 p-2.5 rounded-2xl rounded-bl-none flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#74b645] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#74b645] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#74b645] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[8px] text-gray-500 font-mono">Dr. typing...</span>
                    </div>
                  )}
                </div>

                {/* Instant Clinical Preset questions */}
                <div className="pt-3 border-t border-white/5">
                  <span className="text-[9px] text-gray-500 font-mono block text-left mb-2 uppercase tracking-wider">Quick Inquiries:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => sendChatMessage("Do you accept domestic HMO and NHIS medical insurance?")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-[10px] text-left transition-all active:scale-95 cursor-pointer"
                    >
                      💳 Insurance Coverage?
                    </button>
                    <button
                      onClick={() => sendChatMessage("Is it possible to request virtual consultation slot today?")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-[10px] text-left transition-all active:scale-95 cursor-pointer"
                    >
                      🗓️ Urgent Session Today?
                    </button>
                    <button
                      onClick={() => sendChatMessage("Do you support online drug prescription renewals?")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-[10px] text-left transition-all active:scale-95 cursor-pointer"
                    >
                      💊 Prescription Renewals?
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Input form */}
              <div className="p-3 bg-[#0B0F10]/20 border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a clinical message..."
                  value={customMsgText}
                  onChange={(e) => setCustomMsgText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendChatMessage(customMsgText);
                    }
                  }}
                  className="flex-grow bg-[#0B0F10] border border-white/10 px-4 py-2.5 rounded-xl text-xs text-white focus:border-[#227aba] focus:outline-none"
                />
                <button
                  onClick={() => sendChatMessage(customMsgText)}
                  className="p-2.5 rounded-xl bg-[#74b645] hover:bg-[#74b645]/90 text-[#101415] transition-all flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );

  // Helper inside component to trigger reset and reload index appropriately
  function handleFilterChange(newFilters: Partial<Filters>) {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      return updated;
    });
    setCurrentIndex(0);
  }
}

