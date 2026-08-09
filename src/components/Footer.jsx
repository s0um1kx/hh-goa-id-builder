import React from 'react';
import footerTrees from '../assets/footer trees.png';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0C372B] text-white mt-16 py-8 overflow-hidden border-t border-[#185241]">
      {/* Background Floral Layer with Dark Green Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: `url('${footerTrees}')` }}
      />
      
      {/* Dark tint overlay to ensure high contrast for text */}
      <div className="absolute inset-0 bg-[#0C372B]/60 pointer-events-none" />

      {/* Content Container - Rendered directly over the graphic layer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Section: Event Title & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="font-mono text-sm md:text-base font-bold text-white tracking-wide drop-shadow">
            HACKER HOUSE GOA <span className="text-[#FFD93D]">• 2026 EDITION</span>
          </div>
          <div className="font-mono text-xs text-white/80 tracking-wider mt-1 flex items-center gap-1.5 drop-shadow">
            BUILD IN SUN • SHIP FROM PARADISE 🛵
          </div>
        </div>

        {/* Center Section: Badge Pill */}
        <div className="border border-white/30 bg-[#0C372B]/80 backdrop-blur-md rounded-full px-5 py-1.5 font-mono text-xs font-semibold text-[#FFD93D] tracking-widest uppercase shadow-sm">
          #FRAMEINGOA • OCT 28–31
        </div>

        {/* Right Section: Copyright Notice */}
        <div className="font-mono text-[11px] text-white/70 tracking-wider text-center md:text-right drop-shadow">
          © 2026 HACKER HOUSE GOA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}