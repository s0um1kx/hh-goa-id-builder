import React from 'react';

export default function ShareActions({
  onDownload,
  onShareX,
  onReset,
  isDownloading,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      <button
        type="button"
        onClick={onDownload}
        disabled={isDownloading}
        className="bg-[#06241B] hover:bg-[#0A3327] active:scale-95 text-[#FFD93D] font-mono text-sm font-extrabold px-6 py-3 rounded-full border border-[#185241] shadow-lg flex items-center gap-2.5 transition-all disabled:opacity-50 cursor-pointer"
      >
        <svg
          className={`w-4 h-4 stroke-current fill-none stroke-[2.5] ${
            isDownloading ? 'animate-spin' : ''
          }`}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 3v13.5m0 0l-4.5-4.5M12 16.5l4.5-4.5"
          />
        </svg>
        {isDownloading ? 'GENERATING ID...' : 'DOWNLOAD ID'}
      </button>

      <button
        type="button"
        onClick={onShareX}
        className="bg-[#000000] hover:bg-[#111111] active:scale-95 text-white font-mono text-sm font-extrabold px-6 py-3 rounded-full border border-white/20 shadow-lg flex items-center gap-2.5 transition-all cursor-pointer"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        SHARE ON X
      </button>

      <button
        type="button"
        onClick={onReset}
        className="bg-transparent hover:bg-black/5 text-[#0C372B]/60 hover:text-[#0C372B] font-mono text-xs font-bold px-4 py-3 rounded-full transition-all cursor-pointer"
      >
        RESET
      </button>
    </div>
  );
}