import React from 'react';

export default function ShareActions({
  onDownload,
  onShareX,
  onReset,
  isDownloading,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
      {/* 1. Primary Solid Green Button (Download ID) */}
      <button
        type="button"
        onClick={onDownload}
        disabled={isDownloading}
        className="bg-[#0C372B] hover:bg-[#082920] active:scale-95 text-[#FFD93D] font-mono text-sm font-black px-7 py-3.5 rounded-full shadow-lg flex items-center gap-2.5 transition-all disabled:opacity-50 cursor-pointer"
      >
        <svg
          className={`w-4 h-4 stroke-[#FFD93D] fill-none stroke-[2.5] ${
            isDownloading ? 'animate-bounce' : ''
          }`}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 3v13.5m0 0l-4.5-4.5M12 16.5l4.5-4.5"
          />
        </svg>
        <span>{isDownloading ? 'Downloading...' : 'Download ID'}</span>
      </button>

      {/* 2. Outlined White Button (Share to X) */}
      <button
        type="button"
        onClick={onShareX}
        className="bg-white hover:bg-[#FAF7EE] active:scale-95 text-[#0C372B] font-mono text-sm font-black px-7 py-3.5 rounded-full border border-[#0C372B] shadow-sm flex items-center gap-2.5 transition-all cursor-pointer"
      >
        <svg className="w-4 h-4 fill-[#0C372B]" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>Share to X</span>
      </button>

      {/* 3. Outlined White Button (Generate Another Pass / Reset) */}
      <button
        type="button"
        onClick={onReset}
        className="bg-white hover:bg-[#FAF7EE] active:scale-95 text-[#0C372B] font-mono text-sm font-black px-7 py-3.5 rounded-full border border-[#0C372B] shadow-sm flex items-center gap-2.5 transition-all cursor-pointer"
      >
        <svg
          className="w-4 h-4 stroke-[#0C372B] fill-none stroke-[2.5]"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <span>Generate Another Pass</span>
      </button>
    </div>
  );
}