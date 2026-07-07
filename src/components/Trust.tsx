import React, { useRef } from 'react';
import { ShieldAlert, Award, Lock, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRUST_SAFETY_IMAGE } from '../lib/vectorImages';

export default function Trust() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const safetyPoints = [
    {
      title: 'Double-Vetted Credentials',
      desc: 'Every single doctor is rigorously vetted for active medical licenses, official clinical registration, and clean practice history.',
      icon: Award,
    },
    {
      title: 'Full Data Privacy Compliant',
      desc: 'Your medical consultations, history, and chat logs are fully encrypted and kept under strict health privacy standards.',
      icon: Lock,
    },
    {
      title: 'Continuous Quality Audits',
      desc: 'We constantly run peer-reviews and look at patient satisfaction ratings to keep our professional directory pristine.',
      icon: ShieldAlert,
    }
  ];

  const testimonials = [
    {
      quote: "Tinder Health gave me the confidence to consult a trusted gynecologist. I saw her active license registry status upfront and knew my family was in expert hands.",
      author: "Fatima O., Lagos",
      role: "Patient & Business Owner",
      rating: 5,
    },
    {
      quote: "As a practicing pediatrician, Tinder Health's thorough credential checks protect our noble profession and ensure patients receive genuine, high-quality medical care.",
      author: "Dr. Lilian D., Kaduna",
      role: "Verified Clinical Specialist",
      rating: 5,
    },
    {
      quote: "Getting matched to a certified specialist takes less than two minutes. The transparent fees saved me from guessing how much treatment would cost.",
      author: "Musa A., Kano",
      role: "Father of Three",
      rating: 5,
    },
    {
      quote: "No more guessing or dealing with fake chemists. Direct matches to accredited practitioners restored my faith in our healthcare system.",
      author: "Lucy E., Enugu",
      role: "Undergraduate Student",
      rating: 5,
    },
    {
      quote: "Using Tinder Health, I scheduled a consult in Abuja easily. The provider card list includes exact prices and real clinical addresses.",
      author: "Mark I., FCT",
      role: "Tech Entrepreneur",
      rating: 5,
    }
  ];

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="trust-safety" className="py-24 bg-white text-slate-800 relative overflow-hidden border-b border-slate-100">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#227aba]/5 blur-[130px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#74b645]/5 blur-[110px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Illustration and Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl p-2.5 bg-slate-50">
              <img
                src={TRUST_SAFETY_IMAGE}
                alt="Secure, clinical-grade medical consultations"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="absolute top-4 left-4 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs font-bold text-[#227aba] flex items-center gap-1.5 font-sans shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#227aba] animate-pulse" />
                Double-Vetted Guarantee
              </div>
            </div>

            {/* Micro License Badge Display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                <div className="text-[#227aba] font-sans text-xl font-extrabold">100%</div>
                <div className="text-slate-600 text-xs font-sans mt-1">Verified Medical Licensure</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                <div className="text-[#74b645] font-sans text-xl font-extrabold">CAC</div>
                <div className="text-slate-600 text-xs font-sans mt-1">Registered Clinical Hubs</div>
              </div>
            </div>
          </div>

          {/* Right Column: Vetting Protocols & Testimonials */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#227aba]/10 text-[#227aba] border border-[#227aba]/20 font-sans text-xs font-semibold uppercase tracking-wider">
                Verification & Standards
              </span>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
                Our Patients Deserve Absolute Safety
              </h2>
              <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                We believe finding healthcare should be simple, but the vetting behind it must be uncompromising. We verify every practitioner so you can book with total peace of mind.
              </p>
            </div>

            {/* Vetting points list */}
            <div className="space-y-6">
              {safetyPoints.map((point, index) => {
                const IconComp = point.icon;
                return (
                  <div key={index} className="flex gap-4 items-start" id={`safety-point-${index}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#227aba]/10 border border-[#227aba]/20 flex items-center justify-center shrink-0 text-[#227aba]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-sans font-bold text-slate-800">{point.title}</h4>
                      <p className="text-slate-600 font-sans text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Short Testimonials Slide Row */}
            <div className="pt-8 border-t border-slate-150 space-y-4 relative">
              <div className="flex items-center justify-between">
                <h5 className="text-xs uppercase tracking-wider text-slate-500 font-sans font-semibold">Vouched by Nigerians & Vetted Clinicians</h5>
                <div className="flex gap-2">
                  <button
                    onClick={handleScrollLeft}
                    className="p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleScrollRight}
                    className="p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-3 relative shadow-sm snap-start shrink-0 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-amber-500 mb-2">
                        {[...Array(t.rating)].map((_, rIdx) => (
                          <Star key={rIdx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 font-sans text-xs italic leading-relaxed">
                        "{t.quote}"
                      </p>
                    </div>
                    <div className="text-[11px] pt-3 border-t border-slate-200/60 mt-2">
                      <span className="block text-slate-800 font-sans font-bold">{t.author}</span>
                      <span className="block text-slate-500 text-[10px] font-sans">{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
