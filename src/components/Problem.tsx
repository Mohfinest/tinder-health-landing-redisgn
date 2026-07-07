/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, MapPin, AlertTriangle } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      title: 'Information Gap',
      desc: 'Patients rely on guesswork or unverified referrals, leading to delayed treatments and poor outcomes.',
      icon: HelpCircle,
      highlight: false
    },
    {
      title: 'Location Barrier',
      desc: 'Finding specialized care within immediate proximity remains a logistical nightmare for millions.',
      icon: MapPin,
      highlight: true
    },
    {
      title: 'Affordability Crisis',
      desc: 'Opaque pricing structures often lead to unexpected financial strain at the point of care.',
      icon: AlertTriangle,
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
            A System in Crisis
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            Nigeria's healthcare landscape faces systemic challenges that prevent timely and affordable care. We are solving these fundamental broken links with empathy and clear communication.
          </p>
        </div>

        {/* 3 Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {problems.map((prob, idx) => {
            const IconComp = prob.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between text-left bg-white ${
                  prob.highlight
                    ? 'border-[#227aba]/30 shadow-xl shadow-[#227aba]/5 -translate-y-2'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-lg shadow-md shadow-slate-100'
                }`}
                id={`problem-card-${idx}`}
              >
                {prob.highlight && (
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#227aba] to-[#74b645] rounded-t-2xl"></div>
                )}

                <div className="space-y-6">
                  {/* Icon wrapper */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    prob.highlight
                      ? 'bg-[#227aba]/10 border-[#227aba]/20 text-[#227aba]'
                      : 'bg-slate-50 border-slate-100 text-slate-700'
                  }`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-lg font-sans font-bold text-slate-900 tracking-tight">{prob.title}</h4>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">{prob.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
