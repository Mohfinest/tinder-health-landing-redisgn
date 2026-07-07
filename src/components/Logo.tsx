/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { textClass: 'text-base font-bold' },
    md: { textClass: 'text-lg sm:text-xl font-bold' },
    lg: { textClass: 'text-xl sm:text-2xl font-bold' },
    xl: { textClass: 'text-3xl sm:text-4xl font-bold' },
  };

  const currentDim = dimensions[size];

  return (
    <div className={`flex items-center ${className}`}>
      {showText && (
        <div className={`flex items-center font-sans tracking-tight ${currentDim.textClass}`}>
          <span className="font-bold text-[#227aba] select-none" style={{ fontFamily: '"Inter", sans-serif' }}>
            TINDER
          </span>
          <span className="font-bold text-[#74b645] select-none ml-1.5" style={{ fontFamily: '"Inter", sans-serif' }}>
            HEALTH
          </span>
        </div>
      )}
    </div>
  );
}
