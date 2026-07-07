/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DollarSign, Star, TrendingUp } from 'lucide-react';

export default function BusinessModel() {
  const models = [
    {
      title: 'Transaction Fees',
      desc: 'A small convenience fee on successful bookings and clinical procedure payments processed securely through our platform.',
      icon: DollarSign
    },
    {
      title: 'Sponsored Listings',
      desc: 'Premium visibility for vetted hospitals and certified clinics seeking to expand their patient base in specific localized zones.',
      icon: Star
    },
    {
      title: 'Financial Integration',
      desc: 'Partnerships with verified health insurance providers and micro-insurance systems to ensure high-quality care is accessible.',
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#227aba]/10 text-[#227aba] border border-[#227aba]/20 font-sans text-xs font-semibold uppercase tracking-wider">
            Revenue Mechanics
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
            Sustainable Unit Economics
          </h2>
          <p className="text-slate-600 font-sans text-sm">
            Our transparent, patient-centric revenue models support long-term healthcare infrastructure across Nigeria.
          </p>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {models.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-150 rounded-2xl p-8 hover:border-[#227aba]/30 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between shadow-sm"
                id={`biz-model-card-${idx}`}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#227aba]/10 flex items-center justify-center text-[#227aba] border border-[#227aba]/20">
                    {item.title === 'Transaction Fees' ? (
                      <span className="font-sans font-extrabold text-xl select-none">₦</span>
                    ) : (
                      <IconComp className="w-6 h-6" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-sans font-bold text-slate-800 tracking-tight">{item.title}</h4>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">{item.desc}</p>
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
