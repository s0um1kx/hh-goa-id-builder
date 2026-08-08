import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

const borderPattern = new URL('../assets/border-pattern.png', import.meta.url).href;

const IDCard = forwardRef(({ formData }, ref) => {
  const cardRef = useRef(null);

  useImperativeHandle(ref, () => cardRef.current);

  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
  });

  const handlePointerMove = (clientX, clientY) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (((y - centerY) / centerY) * -5).toFixed(2);
    const rotateY = (((x - centerX) / centerX) * 5).toFixed(2);

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleResetTilt = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
    });
  };

  return (
    /* CLEAN RESPONSIVE CONTAINER WITH NO SCROLLBARS */
    <div className="w-full flex justify-center items-center overflow-hidden py-2">
      {/* Aspect ratio bounding box with canonical syntax */}
      <div className="w-full max-w-175 aspect-700/440 relative flex items-center justify-center">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleResetTilt}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleResetTilt}
          style={tiltStyle}
          className="absolute inset-0 w-full h-full bg-[#0C372B] text-white rounded-3xl p-4 sm:p-6 border-[1.5px] border-[#185241] shadow-2xl overflow-hidden font-mono select-none flex flex-col justify-between"
        >
          {/* Outer Card Outline Accent */}
          <div className="absolute inset-1.5 rounded-[20px] border border-[#FFD93D]/30 pointer-events-none z-20" />

          {/* Left Vertical Decorative Pattern Bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-[#082920] border-r border-[#185241] z-10 overflow-hidden"
            style={{
              backgroundImage: `url(${borderPattern})`,
              backgroundRepeat: 'repeat-y',
              backgroundPosition: 'top center',
              backgroundSize: '100% auto',
            }}
          />

          {/* Main Content Body */}
          <div className="pl-5 sm:pl-7 h-full flex flex-col justify-between relative z-10 min-w-0">
            {/* Top Header & Top-Right Pill */}
            <div className="flex justify-between items-center pt-0.5 sm:pt-1 min-w-0">
              <h1 className="text-[20px] xs:text-[24px] sm:text-[32px] font-black text-[#FFD93D] leading-none tracking-wider font-sans uppercase">
                BUILDER ID CARD
              </h1>
              <div className="bg-[#082920] border border-[#185241] text-[#FFD93D] text-[7px] xs:text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 shrink-0">
                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#FFD93D]" />
                GOA • INDIA • 28-31 OCT 2026
              </div>
            </div>

            {/* Center Grid: Left Details vs Right Photo Card */}
            <div className="grid grid-cols-[1fr_130px] xs:grid-cols-[1fr_160px] sm:grid-cols-[1fr_200px] gap-3 sm:gap-6 items-start mt-1 sm:mt-2 min-w-0">
              {/* Left Column Details */}
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] xs:text-[9px] sm:text-[11px] text-[#A2C4B9] tracking-wider font-sans">
                  hello my name is...
                </span>

                <h2 className="text-[18px] xs:text-[24px] sm:text-[32px] font-serif font-black text-white tracking-tight leading-tight mt-0.5 truncate min-w-0">
                  {formData?.fullName || 'Soumik Mondal'}
                </h2>

                <div className="mt-1 sm:mt-2">
                  <span className="bg-[#FFD93D] text-[#0C372B] text-[8px] xs:text-[9px] sm:text-[11px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider border border-[#0C372B] shadow-[1px_1px_0px_#000] sm:shadow-[2px_2px_0px_#000] inline-block">
                    {formData?.builderTitle || 'CODE WIZARD'}
                  </span>
                </div>

                {/* Key-Value Details Grid */}
                <div className="mt-2 sm:mt-5 space-y-1 sm:space-y-2 text-[8px] xs:text-[9px] sm:text-[11px] min-w-0">
                  <div className="grid grid-cols-[50px_1fr] xs:grid-cols-[65px_1fr] sm:grid-cols-[80px_1fr] items-center min-w-0">
                    <span className="text-[#628A7D] font-bold uppercase tracking-wider">
                      ROLE
                    </span>
                    <span className="text-[#FFD93D] font-bold tracking-wide truncate uppercase">
                      {formData?.role || 'FULL-STACK BUILDER'}
                    </span>
                  </div>

                  <div className="grid grid-cols-[50px_1fr] xs:grid-cols-[65px_1fr] sm:grid-cols-[80px_1fr] items-center min-w-0">
                    <span className="text-[#628A7D] font-bold uppercase tracking-wider">
                      STACK
                    </span>
                    <span className="text-white font-semibold tracking-wide truncate">
                      {formData?.selectedTech?.length > 0
                        ? formData.selectedTech.join(', ')
                        : 'React, Node.js, AI'}
                    </span>
                  </div>

                  <div className="grid grid-cols-[50px_1fr] xs:grid-cols-[65px_1fr] sm:grid-cols-[80px_1fr] items-center min-w-0">
                    <span className="text-[#628A7D] font-bold uppercase tracking-wider">
                      GOA ID
                    </span>
                    <span className="text-white font-semibold tracking-wide truncate">
                      GOA, INDIA • 28-31 OCT 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-[50px_1fr] xs:grid-cols-[65px_1fr] sm:grid-cols-[80px_1fr] items-center min-w-0">
                    <span className="text-[#628A7D] font-bold uppercase tracking-wider">
                      GITHUB
                    </span>
                    <span className="text-[#628A7D] font-medium tracking-wide truncate">
                      @{formData?.github || 's0um1kx'} •{' '}
                      {formData?.linkedin || 'soumik.workmail@gmail.com'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Photo Card */}
              <div className="flex flex-col items-center shrink-0 w-full">
                <div className="relative w-full aspect-200/220">
                  <div className="w-full h-full bg-[#061F18] rounded-xl sm:rounded-2xl border sm:border-2 border-[#FFD93D] overflow-hidden relative shadow-2xl flex items-center justify-center">
                    {formData?.photoUrl ? (
                      <img
                        src={formData.photoUrl}
                        alt="Builder Photo"
                        className="w-full h-full object-cover grayscale contrast-125"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-[#A2C4B9]/60">
                        <svg
                          className="w-8 h-8 sm:w-16 sm:h-16 text-[#FFD93D]/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-[7px] sm:text-[10px] font-bold tracking-widest uppercase text-[#FFD93D]/80">
                          NO PHOTO
                        </span>
                      </div>
                    )}
                  </div>

                  {/* GOA Star Sticker */}
                  <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-4 z-20">
                    <div className="relative flex items-center justify-center">
                      <svg
                        className="w-7 h-7 sm:w-12 sm:h-12 text-[#FF3366] drop-shadow-md"
                        viewBox="0 0 100 100"
                      >
                        <path
                          fill="currentColor"
                          d="M50 0 L61 19 L82 9 L80 31 L100 43 L88 60 L98 79 L77 82 L70 100 L50 88 L30 100 L23 82 L2 79 L12 60 L0 43 L20 31 L18 9 L39 19 Z"
                        />
                      </svg>
                      <span className="absolute text-white font-black text-[5px] sm:text-[8px] uppercase tracking-wider -rotate-12">
                        GOA
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-1.5 sm:mt-3 bg-[#FF3366] text-white text-[7px] xs:text-[9px] sm:text-[11px] font-black py-1 sm:py-2 rounded-full uppercase tracking-widest shadow-md text-center">
                  BUILDER VERIFIED
                </button>
                <span className="text-[6px] xs:text-[7px] sm:text-[9px] text-[#628A7D] tracking-widest font-mono mt-0.5 sm:mt-1">
                  {formData?.builderId || 'HH026-42952'} • #frameingoa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default IDCard;