import React, { forwardRef } from 'react';

const IDCard = forwardRef(({ formData }, ref) => {
  const { photoUrl, fullName, role, github, linkedin, cardId } = formData;

  const formattedGithub = github
    ? github.startsWith('@')
      ? github
      : `@${github}`
    : '';
  const formattedSocials = [formattedGithub, linkedin]
    .filter(Boolean)
    .join(' • ');

  return (
    <div
      ref={ref}
      className="relative w-full max-w-230 aspect-[1.47/1] rounded-3xl overflow-hidden shadow-2xl font-mono select-none bg-[#051F15]"
    >
      {/* 1. CARD BACKGROUND TEMPLATE */}
      <img
        src="/card-template.png"
        alt="Hacker House Goa Template"
        className="absolute inset-0 w-full h-full object-contain z-0"
      />

      {/* 2. DYNAMIC UPLOADED PHOTO OVERLAY */}
      <div
        className="absolute overflow-hidden flex items-center justify-center bg-[#ECE3CE] z-10 rounded-3xl"
        style={{
          top: '26.8%',
          right: '13.3%',
          width: '28.8%',
          height: '51.2%',
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Builder"
            className="w-full h-full object-cover grayscale contrast-125"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#0E3528] opacity-75">
            <svg
              className="w-12 h-12 stroke-current fill-none stroke-[1.8]"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span className="text-[12px] font-black tracking-widest mt-1 uppercase">
              NO PHOTO
            </span>
          </div>
        )}
      </div>

      {/* 3. GOA BADGE OVERLAY */}
      <div
        className="absolute z-30 flex items-center justify-center pointer-events-none"
        style={{
          bottom: '18%',
          right: '37.5%',
          width: '11%',
          aspectRatio: '1',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[#E93B67] shadow-lg"
            style={{
              clipPath:
                'polygon(50% 0%, 61% 11%, 75% 6%, 80% 20%, 94% 23%, 91% 38%, 100% 50%, 91% 62%, 94% 77%, 80% 80%, 75% 94%, 61% 89%, 50% 100%, 39% 89%, 25% 94%, 20% 80%, 6% 77%, 9% 62%, 0% 50%, 9% 38%, 6% 23%, 20% 20%, 25% 6%, 39% 11%)',
            }}
          />
          <span className="relative z-10 text-[#FAF8F5] font-black text-[11px] sm:text-xs md:text-sm tracking-wider uppercase">
            GOA
          </span>
        </div>
      </div>

      {/* 4. DYNAMIC TEXT OVERLAYS */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* FULL NAME */}
        <div
          className="absolute font-serif text-[#FAF8F5] font-semibold tracking-tight truncate whitespace-nowrap flex items-center"
          style={{
            top: '30%',
            left: '6.5%',
            width: '46%',
            height: '13%',
            fontSize: 'clamp(0.9rem, 1.6vw, 1.6rem)',
          }}
        >
          {fullName || ''}
        </div>

        {/* ROLE - Aligned baseline with icon & label */}
        <div
          className="absolute text-[#FAF8F5] font-bold truncate text-xs sm:text-sm md:text-base tracking-wide flex items-center uppercase leading-none"
          style={{
            top: '51.2%',
            left: '21%',
            width: '34%',
            height: '4.8%',
          }}
        >
          {role || ''}
        </div>

        {/* SOCIALS */}
        <div
          className="absolute text-[#FAF8F5] font-medium truncate text-[10px] sm:text-xs md:text-sm tracking-wide flex items-center leading-none"
          style={{
            top: '60.8%',
            left: '21%',
            width: '34%',
            height: '4.8%',
          }}
        >
          {formattedSocials}
        </div>

        {/* MATCHED DYNAMIC ID + HASHTAG */}
        <div
          className="absolute text-[#60856E] font-bold tracking-wider text-[9px] sm:text-[11px] md:text-xs whitespace-nowrap flex items-center justify-center gap-1.5"
          style={{
            top: '89.5%',
            right: '10.5%',
            width: '34%',
            height: '4%',
          }}
        >
          <span>{cardId || 'HH026-00000'}</span>
          <span>•</span>
          <span>#frameingoa</span>
        </div>
      </div>
    </div>
  );
});

IDCard.displayName = 'IDCard';

export default IDCard;