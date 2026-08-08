import React, { useRef } from 'react';

export default function Controls({ formData, setFormData, onImageUpload }) {
  const fileInputRef = useRef(null);

  const techOptions = [
    'Full-Stack',
    'Rust',
    'AI',
    'Design',
    'Protocol',
    'Solana',
    'Founder',
    'Infra',
    'ZK',
  ];

  const builderTitles = [
    'CODE WIZARD',
    'RUST ARCHITECT',
    'SOLANA NINJA',
    'AI HACKER',
    'FULL-STACK PRO',
    'INFRA DEGEN',
    'PROTOCOL BUILDER',
    '0X SHINOBI',
  ];

  const handleRandomizeTitle = () => {
    const currentTitle = formData.builderTitle;
    const filtered = builderTitles.filter((t) => t !== currentTitle);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setFormData((prev) => ({
      ...prev,
      builderTitle: filtered[randomIndex],
    }));
  };

  const handleTechToggle = (tech) => {
    setFormData((prev) => {
      const current = prev.selectedTech || [];
      if (current.includes(tech)) {
        return { ...prev, selectedTech: current.filter((t) => t !== tech) };
      }
      if (current.length >= 4) return prev;
      return { ...prev, selectedTech: [...current, tech] };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = objectUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }

      ctx.putImageData(imgData, 0, 0);
      const processedUrl = canvas.toDataURL('image/png');

      setFormData((prev) => ({
        ...prev,
        photoUrl: processedUrl,
      }));
    };
  };

  return (
    <div className="bg-[#0C372B] text-white rounded-3xl p-6 border-[1.5px] border-[#185241] shadow-2xl font-mono flex flex-col gap-6">
      {/* 01 / BUILDER PHOTO */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-bold text-[#FFD93D] uppercase tracking-wider">
            01 / BUILDER PHOTO
          </span>
          <span className="text-[10px] text-[#A2C4B9] bg-[#082920] px-2 py-0.5 rounded border border-[#185241]">
            {formData.photoUrl ? 'UPLOADED' : 'EMPTY'}
          </span>
        </div>

        <label className="border border-dashed border-[#185241] bg-[#082920] rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-[#FFD93D] transition-colors">
          <div className="w-14 h-14 bg-[#061F18] border border-[#FFD93D] rounded-xl flex items-center justify-center text-[#FFD93D] shrink-0 overflow-hidden">
            {formData.photoUrl ? (
              <img
                src={formData.photoUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            )}
          </div>

          <div>
            <div className="text-xs font-bold text-white mb-0.5">
              Drop photo or click to upload
            </div>
            <div className="text-[10px] text-[#A2C4B9]">
              JPG/PNG/HEIC • B&W auto • 180×220 crop • Works with object URL
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/heic,image/heif,.heic,.heif"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* 02 / YOUR DETAILS */}
      <div className="flex flex-col gap-4">
        <span className="text-[11px] font-bold text-[#FFD93D] uppercase tracking-wider">
          02 / YOUR DETAILS
        </span>

        {/* FULL NAME */}
        <div>
          <label className="block text-[10px] font-bold text-[#A2C4B9] uppercase tracking-wider mb-1">
            FULL NAME *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-[#FAF7EE] text-[#0C372B] font-bold rounded-2xl px-4 py-3 outline-none border border-transparent focus:border-[#FFD93D]"
            placeholder="Soumik Mondal"
          />
        </div>

        {/* ROLE & LOCATION */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-[#A2C4B9] uppercase tracking-wider mb-1">
              ROLE
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-[#082920] text-white font-semibold rounded-xl px-3 py-2.5 text-xs outline-none border border-[#185241] focus:border-[#FFD93D]"
              placeholder="Full-Stack Builder"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#A2C4B9] uppercase tracking-wider mb-1">
              LOCATION
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-[#082920] text-white font-semibold rounded-xl px-3 py-2.5 text-xs outline-none border border-[#185241] focus:border-[#FFD93D]"
              placeholder="Goa, India"
            />
          </div>
        </div>

        {/* TECH STACK CHIPS */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-bold text-[#A2C4B9] uppercase tracking-wider">
              TECH STACK — PICK UP TO 4
            </label>
            <span className="text-[10px] text-[#FFD93D] font-bold">
              {formData.selectedTech?.length || 0}/4 SELECTED
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {techOptions.map((tech) => {
              const isSelected = formData.selectedTech?.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechToggle(tech)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#FFD93D] text-[#0C372B] border-[#FFD93D]'
                      : 'bg-[#082920] text-white border-[#185241] hover:border-[#A2C4B9]'
                  }`}
                >
                  {tech} {isSelected && '•'}
                </button>
              );
            })}
          </div>
        </div>

        {/* GITHUB & LINKEDIN / EMAIL */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-[#A2C4B9] uppercase tracking-wider mb-1">
              GITHUB
            </label>
            <input
              type="text"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full bg-[#082920] text-white font-semibold rounded-xl px-3 py-2.5 text-xs outline-none border border-[#185241] focus:border-[#FFD93D]"
              placeholder="s8um1kx"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#A2C4B9] uppercase tracking-wider mb-1">
              CONTACT / LINKEDIN
            </label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full bg-[#082920] text-white font-semibold rounded-xl px-3 py-2.5 text-xs outline-none border border-[#185241] focus:border-[#FFD93D]"
              placeholder="soumik.workmail@gmail.com"
            />
          </div>
        </div>
      </div>

      {/* 03 / BUILDER IDENTITY */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-bold text-[#FFD93D] uppercase tracking-wider">
            03 / BUILDER IDENTITY
          </span>
          <button
            type="button"
            onClick={handleRandomizeTitle}
            className="bg-[#FFD93D] text-[#0C372B] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 hover:bg-yellow-300 transition-colors"
          >
            RANDOMIZE ↺
          </button>
        </div>

        <div className="bg-[#051C16] border border-[#185241] rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="block text-[9px] font-bold text-[#A2C4B9] uppercase tracking-wider mb-1">
              BUILDER TITLE
            </span>
            <span className="text-xl font-black text-[#FFD93D] tracking-wide uppercase">
              {formData.builderTitle || 'CODE WIZARD'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRandomizeTitle}
            className="w-10 h-10 bg-[#FFD93D] text-[#0C372B] rounded-full flex items-center justify-center font-bold text-lg hover:scale-105 transition-transform shrink-0"
          >
            ⚡
          </button>
        </div>
      </div>
    </div>
  );
}