/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Heart, ShieldCheck, Globe, Linkedin, Instagram, Facebook } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-slate-50 border-t border-slate-150 py-12 text-left text-xs text-slate-500 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left column branding */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
          </div>
          <p className="max-w-xs text-slate-600 leading-relaxed text-[11px]">
            Bridging the gap between verified clinical specialists and patients across Nigeria through radical price transparency and user-friendly matching.
          </p>
          <div className="flex items-center gap-4 text-slate-500 pt-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#227aba]" />
              <span className="font-mono text-[10px] tracking-wider uppercase text-slate-600">
                System Clock: {currentTime || 'Loading...'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <a 
              href="https://www.linkedin.com/company/tinder-health/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-[#0a66c2]/10 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white transition-all shadow-sm" 
              title="LinkedIn"
              id="footer-social-linkedin"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://www.instagram.com/tinder.health?igsh=MWpoamR6OGlkNzZpYg==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-[#e1306c]/10 text-[#e1306c] hover:bg-[#e1306c] hover:text-white transition-all shadow-sm" 
              title="Instagram"
              id="footer-social-instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://www.facebook.com/share/1GYg7fGRGk/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2] hover:text-white transition-all shadow-sm" 
              title="Facebook"
              id="footer-social-facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links column 1 */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="text-slate-800 font-sans text-xs font-bold uppercase tracking-wider">Solutions</h5>
          <ul className="space-y-2 text-[11px]">
            <li>
              <a href="#how-it-works" className="hover:text-[#227aba] transition-colors">
                How Health Matching Works
              </a>
            </li>
            <li>
              <a href="#live-location" className="hover:text-[#227aba] transition-colors">
                Live Location Map
              </a>
            </li>
          </ul>
        </div>

        {/* Links column 2 */}
        <div className="md:col-span-4 space-y-3">
          <h5 className="text-slate-800 font-sans text-xs font-bold uppercase tracking-wider">Provider Vetting</h5>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            All registered medical practitioners undergo verification checks to ensure high standards of care and authentic clinical credentials.
          </p>
          <div className="flex gap-1.5 items-center bg-white border border-slate-200 p-2 rounded-lg self-start max-w-[220px] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#227aba] shrink-0" />
            <span className="text-[10px] text-slate-500 font-sans">100% Verified Providers</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px]">
        <div>
          © {new Date().getFullYear()} Tinder Health. All rights reserved. Registered under CAC Nigeria.
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <span>Engineered with care in Nigeria</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse fill-rose-500" />
        </div>
      </div>
    </footer>
  );
}
