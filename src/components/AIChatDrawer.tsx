/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, ArrowUpRight, HelpCircle, AlertCircle, Bot, User, CheckCircle } from 'lucide-react';
import { ChatMessage, Doctor } from '../types';
import { doctorsData } from '../data/doctors';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
  initialQuery?: string;
}

export default function AIChatDrawer({ isOpen, onClose, onSelectDoctor, initialQuery }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: "Hello! I am your Tinder Health AI Clinical Matcher. Describe your symptoms, medical concerns, or location, and I will safely analyze them, suggest clinical specialties, and match you with the most qualified verified specialists across our partner clinic networks.",
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        }
      ]);
    }
  }, [messages]);

  // Handle passed initial query from the hero search bar
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== '' && isOpen) {
      handleSendQuery(initialQuery);
    }
  }, [initialQuery, isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/search-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText })
      });

      if (!response.ok) {
        throw new Error('Clinical server returned an error');
      }

      const data = await response.json();

      // Formulate assistant message response
      let assistantText = `${data.analysis}\n\n**Recommended Specialty**: ${data.recommendedSpecialty}`;
      if (data.matchingExplanation) {
        assistantText += `\n\n*${data.matchingExplanation}*`;
      }

      // Find the first matched doctor if any are returned
      let matchedDocId = null;
      if (data.matchedDoctorIds && data.matchedDoctorIds.length > 0) {
        matchedDocId = data.matchedDoctorIds[0];
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: assistantText,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        suggestedAction: matchedDocId ? {
          type: 'doctor_profile',
          payload: matchedDocId
        } : undefined
      };

      setMessages((prev) => [...prev, assistantMsg]);

    } catch (error: any) {
      console.error("Clinical AI match failure:", error);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        sender: 'assistant',
        text: "I experienced an error connecting to our clinical matcher. However, I highly suggest searching our verified specialties like Cardiology, Oncology, Pediatrics, Orthopedics, OB/GYN, or Dermatology in the sections below.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuery(inputText);
  };

  const sampleQuestions = [
    "I have joint and lower knee pain",
    "Looking for a child allergy doctor near me",
    "Where can I get high-risk pregnancy prenatal tests?",
    "Need a dermatologist for adult skin acne",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white border-l border-slate-200 z-50 shadow-2xl flex flex-col animate-slideLeft">
      {/* Drawer Header */}
      <div className="px-6 py-4 border-b border-slate-150 bg-slate-50 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#227aba]/10 flex items-center justify-center border border-[#227aba]/20">
            <Sparkles className="w-4 h-4 text-[#227aba] animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-sans font-bold text-slate-800">AI Clinical Matcher</h3>
            <span className="text-[10px] text-slate-500 font-sans tracking-wider uppercase">Specialist Recommendations</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
          id="ai-drawer-close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Symptoms Warning / Medical Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-100 px-6 py-2.5 flex items-start gap-2 text-[10px] text-amber-800 shrink-0">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-normal">
          <strong>Disclaimer:</strong> This matching tool uses Google Gemini for semantic matches. It does not provide official medical diagnosis. For life-threatening symptoms, seek immediate emergency clinic care.
        </p>
      </div>

      {/* Messages Thread */}
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          // Find matched doctor if suggestion action exists
          let suggestedDoc: Doctor | null = null;
          if (msg.suggestedAction?.type === 'doctor_profile') {
            suggestedDoc = doctorsData.find((d) => d.id === msg.suggestedAction?.payload) || null;
          }

          return (
            <div key={msg.id} className={`flex gap-3 text-left ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {/* Bot Avatar */}
              {isAssistant && (
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#227aba]" />
                </div>
              )}

              <div className="space-y-2 max-w-[85%]">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#227aba] text-white rounded-tr-none font-medium shadow-sm'
                    : 'bg-slate-50 border border-slate-150 text-slate-800 rounded-tl-none'
                }`}>
                  {/* Handle Markdown-style bold strings briefly */}
                  {msg.text.split('\n\n').map((para, i) => {
                    if (para.startsWith('**Recommended Specialty**:')) {
                      const spec = para.replace('**Recommended Specialty**:', '').trim();
                      return (
                        <p key={i} className="font-bold text-[#227aba] mt-2 block">
                          Recommended Specialty: <span className="text-slate-800 underline decoration-[#227aba]/30">{spec}</span>
                        </p>
                      );
                    }
                    return <p key={i} className="mb-2 last:mb-0">{para.replace(/\*\*/g, '')}</p>;
                  })}
                </div>

                {/* Render Doctor card recommendation if matched */}
                {suggestedDoc && (
                  <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-3 shadow-md animate-fadeIn text-left">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-sans font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-100">
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-600" /> Best Specialist Match
                      </span>
                      <span className="text-amber-600 font-bold text-[11px]">★ {suggestedDoc.rating}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img src={suggestedDoc.image} alt={suggestedDoc.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover border border-slate-100" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{suggestedDoc.name}</h4>
                        <p className="text-[10px] text-slate-500">{suggestedDoc.specialty}</p>
                        <p className="text-[9px] text-slate-400 font-sans mt-0.5">{suggestedDoc.locationName} • {suggestedDoc.distance}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 text-[11px] pt-1 border-t border-slate-100">
                      <div className="flex-grow text-slate-500 font-sans self-center">
                        Consult: <span className="text-slate-800 font-bold">₦{suggestedDoc.consultationFeeMin.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => onSelectDoctor(suggestedDoc!)}
                        className="bg-[#227aba] text-white font-sans font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#227aba]/90 active:scale-95 transition-all cursor-pointer shadow-sm"
                      >
                        Book Consultation
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 font-sans block pl-1">{msg.timestamp}</span>
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#227aba]/10 border border-[#227aba]/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#227aba]" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start items-center text-left">
            <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-150 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#227aba] animate-spin" />
            </div>
            <div className="bg-slate-50 border border-slate-150 px-4 py-3 rounded-2xl rounded-tl-none max-w-[85%]">
              <p className="text-xs text-slate-500 animate-pulse font-sans">AI is scanning available clinical registries...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion tags for quick typing */}
      {messages.length === 1 && (
        <div className="px-6 py-4 border-t border-slate-150 bg-slate-50/60">
          <p className="text-[10px] font-sans font-semibold text-slate-500 uppercase tracking-wider text-left mb-2 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#227aba]" /> Quick Search Templates
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(q)}
                className="text-[11px] text-left text-slate-600 hover:text-[#227aba] bg-white hover:bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form Footer */}
      <div className="p-4 border-t border-slate-150 bg-slate-50 shrink-0">
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Type symptoms or questions..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#227aba] focus:ring-1 focus:ring-[#227aba] outline-none transition-all shadow-sm"
            id="ai-chat-input"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="w-12 h-12 rounded-xl bg-[#227aba] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#227aba]/90 active:scale-95 transition-all cursor-pointer shadow-sm"
            id="ai-chat-send-btn"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
