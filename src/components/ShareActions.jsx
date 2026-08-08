import React from 'react';

export default function ShareActions({ onDownload }) {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-lg pt-2 font-mono">
      <button
        onClick={onDownload}
        className="flex-1 bg-[#0A251C] text-[#FFD93D] hover:bg-[#12382b] border-2 border-[#0A251C] font-black py-3 px-6 rounded-full shadow-[4px_4px_0px_0px_#0A251C] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#0A251C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase text-xs tracking-wider flex items-center justify-center gap-2"
      >
        <span>↓</span> DOWNLOAD HQ PNG
      </button>

      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        className="bg-[#FFFBEB] text-[#0A251C] hover:bg-[#FFD93D] border-2 border-[#0A251C] font-black py-3 px-5 rounded-full shadow-[4px_4px_0px_0px_#0A251C] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#0A251C] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none uppercase text-xs tracking-wider shrink-0"
      >
        COPY LINK
      </button>
    </div>
  );
}