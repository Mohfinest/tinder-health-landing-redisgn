/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles, Activity } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onOpenChat: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenWaitlist: () => void;
}

export default function Navbar({ onOpenChat, onScrollToSection, onOpenWaitlist }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How it Works', id: 'how-it-works' },
    { label: 'Health Matcher', id: 'try-matcher-section' },
    { label: 'Live Location', id: 'gis-map' },
    { label: 'Team', id: 'team' },
  ];

  const handleLinkClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 border-b border-slate-100 z-40 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center focus:outline-none"
            id="nav-logo"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-slate-600 hover:text-[#227aba] transition-colors font-sans text-sm font-semibold cursor-pointer"
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 text-slate-700 hover:text-[#227aba] transition-colors font-sans text-sm font-medium border border-slate-200 hover:border-[#227aba]/30 px-4 py-2 rounded-lg bg-slate-50 cursor-pointer"
              id="nav-btn-chat"
            >
              <Sparkles className="w-4 h-4 text-[#227aba] animate-pulse" />
              AI Matcher
            </button>
            <button
              onClick={onOpenWaitlist}
              className="bg-[#227aba] hover:bg-[#1a5f91] text-white font-sans text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#227aba]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              id="nav-btn-access"
            >
              Get Early Access
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
              id="nav-mobile-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-2 text-slate-700 hover:text-[#227aba] transition-colors font-sans text-base font-semibold cursor-pointer"
                id={`nav-mobile-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <hr className="border-slate-100 my-2" />
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full text-center text-slate-700 border border-slate-200 py-3 rounded-xl bg-slate-50 hover:text-[#227aba] hover:border-[#227aba]/30 transition-all cursor-pointer font-medium"
              id="nav-mobile-btn-chat"
            >
              <Sparkles className="w-4 h-4 text-[#227aba]" />
              AI Matcher Assistant
            </button>
            <button
              onClick={() => {
                onOpenWaitlist();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-[#227aba] hover:bg-[#1a5f91] text-white font-sans font-semibold py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              id="nav-mobile-btn-access"
            >
              Get Early Access
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
