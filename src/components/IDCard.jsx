import React, { useRef, useState } from 'react';

export default function IDCard({ formData }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (((y - centerY) / centerY) * -2.5).toFixed(2);
    const rotateY = (((x - centerX) / centerX) * 2.5).toFixed(2);

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
    });
  };

  const getInitials = (name) => {
    if (!name) return 'AR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(formData?.fullName);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="relative w-175 h-110 bg-[#0E3528] text-white rounded-3xl p-5 border-[1.5px] border-[#185945] shadow-2xl overflow-hidden font-mono select-none"
    >
      <div className="absolute inset-1 rounded-[20px] border border-[#FFD93D]/20 pointer-events-none z-20" />

      {/* Left Vertical Decorative Bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-9 bg-[#0B2C21] border-r-2 border-[#165440] z-10 overflow-hidden shadow-inner"
        style={{
          backgroundImage: `url('/assets/border-pattern.png')`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'top center',
          backgroundSize: '100% auto'
        }}
      />

      {/* Main Content Area */}
      <div className="pl-9 h-full flex flex-col justify-between relative z-10">
        
        {/* Top Header & Avatar Block */}
        <div className="flex justify-between items-start pt-1">
          
          {/* Left Text Block */}
          <div className="flex flex-col">
            <div className="flex items-start">
              <svg width="250" height="52" viewBox="0 0 250 52" fill="none" className="shrink-0">
                <text
                  x="0"
                  y="22"
                  fill="#FFD93D"
                  fontSize="28"
                  fontWeight="900"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  letterSpacing="1"
                  transform="scale(1.45, 0.85)"
                >
                  BUILDER
                </text>
                <text
                  x="0"
                  y="52"
                  fill="#FFD93D"
                  fontSize="28"
                  fontWeight="900"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  letterSpacing="1"
                  transform="scale(1.45, 0.85)"
                >
                  ID CARD
                </text>
              </svg>
            </div>

            {/* "hello my name is..." Line */}
            <div className="mt-4 flex items-center">
              <span className="text-[11px] text-white/60 tracking-wider font-sans">
                hello my name is...
              </span>
            </div>

            {/* Name Header */}
            <h2 className="text-[36px] font-serif font-black text-white tracking-wide leading-none mt-1">
              {formData?.fullName || 'Alex Rivera'}
            </h2>

            {/* Code Wizard Pill & Role */}
            <div className="flex items-center gap-3 mt-3">
              <div className="relative">
                <span className="bg-[#FFD93D] text-[#0E3528] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-[#0E3528] shadow-[2px_2px_0px_#072018] block">
                  {formData?.builderTitle || 'CODE WIZARD'}
                </span>
              </div>
              <span className="text-xs text-[#FFD93D] font-bold tracking-wide">
                • {formData?.role || 'Full-Stack Builder'}
              </span>
            </div>
          </div>

          {/* Right Avatar Card Frame */}
          <div className="relative shrink-0 mr-1 mt-0.5">
            <div className="w-45 h-55 bg-black rounded-xl border-2 border-[#FFD93D] overflow-hidden relative shadow-2xl flex items-center justify-center">
              
              {/* Removed B&W tag completely as requested */}

              {formData?.photoUrl ? (
                <img
                  src={formData.photoUrl}
                  alt="Builder Photo"
                  className="w-full h-full object-cover grayscale"
                />
              ) : (
                <div className="font-serif text-[68px] font-bold text-white tracking-widest z-10">
                  {initials}
                </div>
              )}

              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 0, transparent 8px)`,
                }}
              />
            </div>

            {/* Unique Spiky Burst Badge ("SHIP IT") */}
            <div className="absolute -bottom-4 -left-5 z-20">
              <div className="relative flex items-center justify-center">
                <svg width="60" height="60" viewBox="0 0 100 100" className="text-[#FF3366] drop-shadow-md">
                  <path
                    fill="currentColor"
                    d="M50 0 L61 19 L82 9 L80 31 L100 43 L88 60 L98 79 L77 82 L70 100 L50 88 L30 100 L23 82 L2 79 L12 60 L0 43 L20 31 L18 9 L39 19 Z"
                  />
                </svg>
                <span className="absolute text-white font-black text-[9px] uppercase leading-none text-center -rotate-12 font-sans tracking-tighter">
                  SHIP <br /> IT!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Filmstrip Section */}
        <div className="flex flex-col gap-3 pb-1">
          <div className="grid grid-cols-[1fr_210px] gap-4 items-end">
            
            {/* Field Table with perfectly aligned grid rows */}
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-[110px_1fr] items-center">
                <span className="text-[#7A9A8B] font-bold uppercase text-[10px] tracking-wider">ROLE</span>
                <span className="text-[#FFD93D] font-bold tracking-wide truncate">
                  {formData?.role || 'Full-Stack Builder'}
                </span>
              </div>

              <div className="grid grid-cols-[110px_1fr] items-center">
                <span className="text-[#7A9A8B] font-bold uppercase text-[10px] tracking-wider">STACK</span>
                <span className="text-[#FFD93D] font-bold tracking-wide truncate">
                  {formData?.selectedTech?.length > 0
                    ? formData.selectedTech.join(', ')
                    : ''}
                </span>
              </div>

              <div className="grid grid-cols-[110px_1fr] items-center">
                <span className="text-[#7A9A8B] font-bold uppercase text-[10px] tracking-wider">LOCATION</span>
                <span className="text-white font-bold tracking-wide truncate">
                  {formData?.location || 'Goa, India'}
                </span>
              </div>

              <div className="grid grid-cols-[110px_1fr] items-center">
                <span className="text-[#7A9A8B] font-bold uppercase text-[10px] tracking-wider">GOA EDITION</span>
                <span className="text-[#9BB3A7] text-[10px] font-semibold tracking-widest truncate">
                  GOA, INDIA • 28-31 OCT 2026
                </span>
              </div>
            </div>

            {/* Verification & QR Code */}
            <div className="flex flex-col gap-1.5">
              <div>
                <div className="text-[10px] font-black text-[#FF3366] tracking-widest uppercase flex items-center gap-1">
                  BUILDER VERIFIED ★
                </div>
                <div className="text-[9px] text-[#FFD93D] tracking-wider font-semibold uppercase mt-0.5">
                  FRONTAL VIEW • ID R13268
                </div>
                <div className="text-[9px] text-[#7A9A8B] tracking-widest font-mono truncate mt-0.5">
                  #alexbuilds • alex.hh
                </div>
              </div>

              <div className="bg-white text-black rounded-xl p-1.5 flex items-center gap-2.5 shadow-md">
                <div className="w-8 h-8 bg-black p-0.5 rounded flex flex-wrap gap-0.5 shrink-0 items-center justify-center">
                  <div className="w-2 h-2 bg-white" />
                  <div className="w-2 h-2 bg-white" />
                  <div className="w-2 h-2 bg-black" />
                  <div className="w-2 h-2 bg-white" />
                  <div className="w-2 h-2 bg-black" />
                  <div className="w-2 h-2 bg-white" />
                  <div className="w-2 h-2 bg-white" />
                  <div className="w-2 h-2 bg-white" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-black tracking-wider text-[#0E3528] leading-none mb-0.5">
                    HH GOA • QR
                  </span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                    SCAN TO VERIFY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Yellow Perforated Film Strip */}
          <div className="pt-2 border-t border-[#185945]/50 flex flex-col gap-1.5 shrink-0">
            <div className="flex gap-1 justify-between">
              {[...Array(22)].map((_, i) => (
                <div
                  key={i}
                  className="h-2.5 w-5 bg-[#FFD93D] rounded-[1px] border border-[#0E3528]/30 shadow-inner"
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-[9px] text-[#7A9A8B] font-mono tracking-widest">
              <span>ID: HHG26-R13268 • #FrameInGoa • HH GOA 2026</span>
              <span className="text-[#FFD93D] font-bold">#R13268</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}