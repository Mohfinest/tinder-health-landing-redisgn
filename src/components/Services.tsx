import React from 'react';
import { Heart, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SPECIALIST_CARE_IMAGE } from '../lib/vectorImages';

export default function Services() {
  const service = {
    id: 'specialist-care',
    title: 'Specialist Care',
    subtitle: 'AI-matched appointments with top vetted specialists',
    desc: 'Tell us your symptoms and our AI instantly matches you with verified cardiologists, gynecologists, pediatricians, and more. Skip the long referral chains and connect with the right expert in minutes.',
    icon: Heart,
    image: SPECIALIST_CARE_IMAGE,
    benefits: ['AI-powered symptom-to-specialist matching', 'Double-vetted clinical credentials', 'Flexible offline & online bookings'],
    tag: 'Expert Medical Care',
  };

  const IconComp = service.icon;

  return (
    <section id="services" className="py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
      {/* Soft background decor blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#227aba]/5 blur-[130px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#74b645]/5 blur-[110px] rounded-full -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#227aba]/10 text-[#227aba] border border-[#227aba]/20 font-sans text-xs font-semibold uppercase tracking-wider">
            Our Care Service
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
            AI-Powered Specialist Matching
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            Describe your symptoms and get matched instantly with fully verified medical specialists, no hidden fees, no long referral chains.
          </p>
        </div>

        {/* Single Service Card */}
        <div
          className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 flex flex-col shadow-md shadow-slate-100 max-w-2xl mx-auto"
          id={`service-card-${service.id}`}
        >
          {/* Image & tag header */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-full border border-slate-100 shadow-sm font-sans">
              {service.tag}
            </span>
          </div>

          {/* Card Content */}
          <div className="p-8 flex flex-col justify-between flex-grow space-y-6 text-left">
            <div className="space-y-4">
              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#227aba]/10 border border-[#227aba]/20 text-[#227aba] flex items-center justify-center shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-sans font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#227aba] font-semibold font-sans">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                {service.desc}
              </p>

              {/* Benefits List */}
              <ul className="space-y-2 pt-2 border-t border-slate-50">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const matcher = document.getElementById('try-matcher-section');
                  if (matcher) matcher.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-slate-50 group-hover:bg-[#227aba] group-hover:text-white border border-slate-200 group-hover:border-[#227aba] text-slate-700 text-xs font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Try Specialist Matching</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
