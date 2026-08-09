import React, { useRef } from 'react';

export default function Controls({
  formData,
  setFormData,
  onImageUpload,
  errors = {},
  setErrors,
}) {
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (setErrors && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (setErrors && errors.photoUrl) {
      setErrors((prev) => ({ ...prev, photoUrl: null }));
    }

    if (typeof onImageUpload === 'function') {
      onImageUpload(e);
    }
  };

  return (
    <div className="bg-[#06241B] text-white p-6 md:p-8 rounded-[28px] border-2 border-[#185241] shadow-2xl font-mono space-y-7 selection:bg-[#FFD93D] selection:text-[#06241B]">
      {/* SECTION 01: BUILDER PHOTO */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-[13px] font-extrabold text-[#FFD93D] tracking-wider uppercase">
            01 / BUILDER PHOTO <span className="text-red-400">*</span>
          </h3>
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
              formData.photoUrl
                ? 'bg-[#FFD93D] text-[#06241B]'
                : 'bg-[#0B382A] text-[#A2C4B9]'
            }`}
          >
            {formData.photoUrl ? 'ADDED' : 'EMPTY'}
          </span>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg, image/heic, image/heif, .heic, .heif"
          onChange={handleFileChange}
          className="hidden"
        />

        {formData.photoUrl ? (
          <div className="border-2 border-[#185241] rounded-2xl p-4 flex items-center justify-between bg-[#082D22]">
            <div className="flex items-center gap-4">
              <img
                src={formData.photoUrl}
                alt="Builder Preview"
                className="w-16 h-20 object-cover rounded-xl border border-[#FFD93D]/40 grayscale contrast-125"
              />
              <div>
                <div className="text-[13px] font-bold text-white tracking-wide">
                  Photo Uploaded
                </div>
                <div className="text-[10px] text-[#A2C4B9] mt-0.5 tracking-tight font-semibold">
                  ✓ B&W Auto Applied
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#185241] hover:bg-[#206853] text-[#FFD93D] text-[11px] font-extrabold px-4 py-2 rounded-xl uppercase tracking-wider transition-all"
            >
              CHANGE
            </button>
          </div>
        ) : (
          <label
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 flex items-center gap-5 cursor-pointer transition-all bg-[#082D22] hover:bg-[#0A3327] ${
              errors.photoUrl
                ? 'border-red-500 bg-red-950/20'
                : 'border-[#185241] hover:border-[#FFD93D]/50'
            }`}
          >
            <div className="w-12 h-12 rounded-xl border border-[#FFD93D]/40 bg-[#06241B] flex items-center justify-center shrink-0 text-[#FFD93D]">
              <svg
                className="w-6 h-6 stroke-current fill-none stroke-2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-bold text-white tracking-wide">
                Drop photo or click to upload
              </div>
              <div className="text-[10px] text-[#A2C4B9]/70 mt-0.5 tracking-tight">
                JPG/PNG/HEIC • B&W auto
              </div>
            </div>
          </label>
        )}

        {errors.photoUrl && (
          <div className="bg-red-900/30 border border-red-500/60 text-red-300 text-[11px] font-semibold px-4 py-2 rounded-xl">
            ⚠ {errors.photoUrl}
          </div>
        )}
      </div>

      {/* SECTION 02: YOUR DETAILS */}
      <div className="space-y-4">
        <h3 className="text-[13px] font-extrabold text-[#FFD93D] tracking-wider uppercase">
          02 / YOUR DETAILS
        </h3>

        {/* FULL NAME */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black text-[#A2C4B9] tracking-widest uppercase">
            FULL NAME <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleTextChange}
            placeholder="e.g. Soumik Mondal"
            className={`w-full px-5 py-3.5 rounded-2xl text-[#06241B] font-bold text-[15px] outline-none transition-all ${
              errors.fullName
                ? 'bg-red-50 border-2 border-red-500 text-red-900'
                : 'bg-[#FAF7EE] focus:ring-2 focus:ring-[#FFD93D]'
            }`}
          />
          {errors.fullName && (
            <div className="bg-red-900/30 border border-red-500/60 text-red-300 text-[11px] font-semibold px-4 py-2 rounded-xl mt-1">
              ⚠ {errors.fullName}
            </div>
          )}
        </div>

        {/* ROLE */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-black text-[#A2C4B9] tracking-widest uppercase">
            ROLE <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="role"
            value={formData.role || ''}
            onChange={handleTextChange}
            placeholder="Full-Stack Builder"
            className={`w-full px-4 py-2.5 rounded-xl bg-[#082D22] text-white font-bold text-[13px] outline-none border transition-all ${
              errors.role
                ? 'border-red-500 bg-red-950/20'
                : 'border-[#185241] focus:border-[#FFD93D]'
            }`}
          />
          {errors.role && (
            <div className="text-red-400 text-[10px] font-semibold mt-1">
              ⚠ {errors.role}
            </div>
          )}
        </div>

        {/* SOCIALS: GITHUB & CONTACT/LINKEDIN (SPLIT ROW ON NEXT LINE OF ROLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#A2C4B9] tracking-widest uppercase">
              GITHUB
            </label>
            <input
              type="text"
              name="github"
              value={formData.github || ''}
              onChange={handleTextChange}
              placeholder="s0um1kx"
              className="w-full px-4 py-2.5 rounded-xl bg-[#082D22] text-white font-bold text-[13px] outline-none border border-[#185241] focus:border-[#FFD93D] truncate"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#A2C4B9] tracking-widest uppercase">
              CONTACT / LINKEDIN
            </label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin || ''}
              onChange={handleTextChange}
              placeholder="soumik.workmail@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#082D22] text-white font-bold text-[13px] outline-none border border-[#185241] focus:border-[#FFD93D] truncate"
            />
          </div>
        </div>
      </div>
    </div>
  );
}