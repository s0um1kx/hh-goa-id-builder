import React from 'react';

export default function Controls({ formData, setFormData, onImageUpload }) {
  const allTechOptions = [
    'Full-Stack',
    'Rust',
    'AI',
    'Design',
    'Protocol',
    'Solana',
    'Founder',
    'Infra',
    'ZK',
    'Mobile',
    'TypeScript',
    'Web3',
  ];

  const builderTitles = [
    'CODE WIZARD',
    'PIXEL ALCHEMIST',
    'SYSTEMS ARCHITECT',
    'PROTOCOL ENGINE',
    'SOLANA BUILDER',
    'AI RESEARCHER',
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTech = (tech) => {
    setFormData((prev) => {
      const current = prev.selectedTech || [];
      if (current.includes(tech)) {
        return { ...prev, selectedTech: current.filter((t) => t !== tech) };
      }
      if (current.length < 4) {
        return { ...prev, selectedTech: [...current, tech] };
      }
      return prev;
    });
  };

  const handleRandomizeTitle = () => {
    const available = builderTitles.filter((t) => t !== formData.builderTitle);
    const randomTitle = available[Math.floor(Math.random() * available.length)];
    setFormData((prev) => ({ ...prev, builderTitle: randomTitle }));
  };

  return (
    <div className="bg-[#0A251C] text-[#E0E7E3] rounded-3xl p-7 border border-[#143D2F] shadow-2xl flex flex-col gap-6 font-mono selection:bg-[#FFD93D] selection:text-[#0A251C]">
      {/* Header Banner */}
      <div className="space-y-3 pb-3 border-b border-[#143D2F]/70">
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight leading-none flex items-center gap-2">
          Builder{' '}
          <span className="bg-[#FFD93D] text-[#0A251C] px-2.5 py-0.5 rounded-md font-sans text-2xl font-black">
            ID Card
          </span>
        </h1>
        <p className="text-[12px] text-[#A3B8B0] leading-relaxed">
          Single theme. No confusion. Front = Builder ID. Back = Sticker board. Real photo upload.
        </p>
      </div>

      {/* 01 / BUILDER PHOTO */}
      <div className="border border-[#143D2F] bg-[#071D16] rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center text-[11px] font-bold tracking-wider text-[#FFD93D] uppercase">
          <span>01 / BUILDER PHOTO</span>
          <span className="text-[10px] text-[#A3B8B0]/70 bg-[#143D2F]/60 px-2.5 py-0.5 rounded-full">
            {formData.photoUrl ? 'UPLOADED' : 'EMPTY'}
          </span>
        </div>

        <label className="relative flex items-center gap-4 bg-[#0A251C] hover:bg-[#0E3327] border border-dashed border-[#1B4D3C] hover:border-[#FFD93D]/60 p-4 rounded-xl cursor-pointer transition-all duration-200 group">
          <div className="w-14 h-14 rounded-xl bg-[#0A251C] border border-[#FFD93D]/40 flex items-center justify-center font-serif text-lg font-bold text-[#FFD93D] overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            {formData.photoUrl ? (
              <img
                src={formData.photoUrl}
                alt="Uploaded portrait"
                className="w-full h-full object-cover grayscale"
              />
            ) : (
              <span>SM</span>
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-white group-hover:text-[#FFD93D] transition-colors">
              Drop photo or click to upload
            </span>
            <span className="text-[10px] text-[#A3B8B0]/70">
              JPG/PNG • B&W auto • 180×220 crop • Works with object URL
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* 02 / YOUR DETAILS */}
      <div className="border border-[#143D2F] bg-[#071D16] rounded-2xl p-5 flex flex-col gap-4">
        <div className="text-[11px] font-bold tracking-wider text-[#FFD93D] uppercase">
          02 / YOUR DETAILS
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#A3B8B0] tracking-wider uppercase">
            FULL NAME *
          </label>
          <input
            type="text"
            value={formData.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full bg-[#FFFBEB] text-[#0A251C] font-extrabold text-[15px] px-4 py-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#FFD93D] shadow-sm transition-all"
            placeholder="Soumik Mondal"
          />
        </div>

        {/* Role & Location */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#A3B8B0] tracking-wider uppercase">
              ROLE
            </label>
            <input
              type="text"
              value={formData.role || ''}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full bg-[#0A251C] text-white text-[12px] px-3.5 py-2.5 rounded-xl border border-[#143D2F] outline-none focus:border-[#FFD93D] transition-colors"
              placeholder="Full-Stack Builder"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#A3B8B0] tracking-wider uppercase">
              LOCATION
            </label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full bg-[#0A251C] text-white text-[12px] px-3.5 py-2.5 rounded-xl border border-[#143D2F] outline-none focus:border-[#FFD93D] transition-colors"
              placeholder="Goa, India"
            />
          </div>
        </div>

        {/* Tech Stack Picker */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-[#A3B8B0] tracking-wider uppercase">
              TECH STACK — PICK UP TO 4
            </label>
            <span className="text-[10px] font-bold text-[#FFD93D]">
              {(formData.selectedTech || []).length}/4 SELECTED
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTechOptions.map((tech) => {
              const isSelected = (formData.selectedTech || []).includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-[#FFD93D] text-[#0A251C] border-[#FFD93D] shadow-[2px_2px_0px_#072018]'
                      : 'bg-[#0A251C] text-[#A3B8B0] border-[#143D2F] hover:border-[#A3B8B0]/60 hover:text-white'
                  }`}
                >
                  {tech}
                  {isSelected && <span className="text-[9px]">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* GitHub & Email */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#A3B8B0] tracking-wider uppercase">
              GITHUB HANDLE
            </label>
            <input
              type="text"
              value={formData.github || ''}
              onChange={(e) => handleInputChange('github', e.target.value)}
              className="w-full bg-[#0A251C] text-white text-[12px] px-3.5 py-2.5 rounded-xl border border-[#143D2F] outline-none focus:border-[#FFD93D] transition-colors"
              placeholder="s0um1kx"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#A3B8B0] tracking-wider uppercase">
              EMAIL / LINKEDIN
            </label>
            <input
              type="text"
              value={formData.linkedin || ''}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              className="w-full bg-[#0A251C] text-white text-[12px] px-3.5 py-2.5 rounded-xl border border-[#143D2F] outline-none focus:border-[#FFD93D] transition-colors"
              placeholder="soumik.workmail@gmail.com"
            />
          </div>
        </div>
      </div>

      {/* 03 / BUILDER IDENTITY */}
      <div className="border border-[#143D2F] bg-[#071D16] rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center text-[11px] font-bold tracking-wider text-[#FFD93D] uppercase">
          <span>03 / BUILDER IDENTITY</span>
          <button
            type="button"
            onClick={handleRandomizeTitle}
            className="bg-[#FFD93D] hover:bg-[#ffe366] text-[#0A251C] text-[10px] font-black px-3 py-1 rounded-full uppercase transition-all active:scale-90 shadow-sm cursor-pointer"
          >
            RANDOMIZE ↺
          </button>
        </div>

        {/* Title Banner Card */}
        <div className="bg-[#0A251C] border border-[#143D2F] rounded-xl p-4 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-[#A3B8B0] uppercase tracking-wider">
              BUILDER TITLE
            </span>
            <span className="text-xl font-black text-[#FFD93D] tracking-wider uppercase">
              {formData.builderTitle || 'CODE WIZARD'}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#FFD93D] text-[#0A251C] flex items-center justify-center font-black text-sm shadow">
            ⚡
          </div>
        </div>

        {/* Currently Shipping */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#A3B8B0] tracking-wider uppercase">
            CURRENTLY SHIPPING
          </label>
          <textarea
            rows={3}
            value={formData.currentlyShipping || ''}
            onChange={(e) =>
              handleInputChange('currentlyShipping', e.target.value)
            }
            className="w-full bg-[#0A251C] text-white text-[12px] p-3 rounded-xl border border-[#143D2F] outline-none focus:border-[#FFD93D] resize-none leading-relaxed transition-colors"
            placeholder="Building local-first GPU mesh + cold brews on the beach. Shipping daily from Goa."
          />
          <span className="text-[10px] text-[#A3B8B0]/60 mt-0.5">
            Appears on back + QR landing • {(formData.currentlyShipping || '').length} chars
          </span>
        </div>
      </div>
    </div>
  );
}