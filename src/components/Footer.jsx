import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0C372B] text-white/70 border-t border-[#185241] py-8 px-6 font-mono relative z-10">
      <div className="max-w-345 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Branding */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[13px] font-bold text-white tracking-wider uppercase">
            <span>HACKER HOUSE GOA</span>
            <span className="text-[#FFD93D]">•</span>
            <span className="text-[#FFD93D]">2026 EDITION</span>
          </div>
          <p className="text-[11px] text-white/50 tracking-wide uppercase">
            BUILD IN SUN • SHIP FROM PARADISE 🛵
          </p>
        </div>

        {/* Tagline Badge */}
        <div className="text-[12px] font-bold text-[#FFD93D] tracking-widest uppercase bg-[#185241]/50 px-4 py-1.5 rounded-full border border-[#185241]">
          #FRAMEINGOA • OCT 28-31
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-white/40 tracking-wider">
          © 2026 HACKER HOUSE GOA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}