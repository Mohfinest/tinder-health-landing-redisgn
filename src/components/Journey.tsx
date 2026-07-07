import React from 'react';
import { Search, MapPin, DollarSign, BrainCircuit, ShieldCheck } from 'lucide-react';
import { HOW_IT_WORKS_IMAGE } from '../lib/vectorImages';

export default function Journey() {
  const steps = [
    {
      num: 1,
      title: 'Smart Search',
      desc: 'AI-powered specialty match. Describe your symptoms in plain language to instantly locate the exact clinical specialist you need.',
      icon: Search,
    },
    {
      num: 2,
      title: 'Live Location',
      desc: 'Real-time location data. Find nearby high-quality clinics and verified doctors for convenient, on-demand physical or virtual appointments.',
      icon: MapPin,
    },
    {
      num: 3,
      title: 'Transparency',
      desc: 'Up-front, honest pricing. View verified, transparent costs for every consultation and procedure before making any commitment.',
      icon: DollarSign,
    },
    {
      num: 4,
      title: 'AI Matching',
      desc: 'Optimized clinical mapping. Our secure recommendation engine matches your medical history with the most highly qualified specialists.',
      icon: BrainCircuit,
    },
    {
      num: 5,
      title: 'Verified Care',
      desc: 'Connect with fully vetted clinical providers. Experience verified medical expertise and safe, active-licensed care for ultimate peace of mind.',
      icon: ShieldCheck,
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      {/* Background soft glow decor */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#227aba]/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#227aba]/10 text-[#227aba] border border-[#227aba]/20 font-sans text-xs font-semibold uppercase tracking-wider">
            Patient-First Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
            How Tinder Health Works
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            We've simplified access to premium medical services, giving you confidence and control at every step.
          </p>
        </div>

        {/* Split layout: steps on left, custom illustration on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Steps */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex gap-6 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300 shadow-sm"
                  id={`journey-step-${step.num}`}
                >
                  {/* Step Badge & Icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#227aba] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#227aba]/10">
                      {step.num}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      {step.title === 'Transparency' ? (
                        <span className="w-5 h-5 flex items-center justify-center font-sans font-extrabold text-lg text-[#227aba] leading-none select-none" id="journey-naira-icon">
                          ₦
                        </span>
                      ) : (
                        <IconComp className="w-5 h-5 text-[#227aba]" />
                      )}
                      <h3 className="text-lg font-sans font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Custom Illustration Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-xl bg-white p-3 space-y-4">
              <img
                src={HOW_IT_WORKS_IMAGE}
                alt="Search, book, and receive quality clinical care"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="p-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Instant Booking Vetted
                </span>
                <span>Secure PACS Storage</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
