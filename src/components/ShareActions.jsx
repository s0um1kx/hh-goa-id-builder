import React from 'react';

export default function ShareActions({ onDownload, onShareX, onReset, isDownloading }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className="bg-[#0C372B] hover:bg-[#082920] text-[#FFD93D] font-black px-6 py-3 rounded-full flex items-center gap-2 border-2 border-[#185241] shadow-lg transition-all active:scale-95 disabled:opacity-50"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        <span>{isDownloading ? 'GENERATING...' : 'DOWNLOAD PASS'}</span>
      </button>

      {onShareX && (
        <button
          onClick={onShareX}
          className="bg-[#0C372B] hover:bg-[#082920] text-white font-bold px-6 py-3 rounded-full border-2 border-[#185241] shadow-lg transition-all active:scale-95"
        >
          SHARE TO X
        </button>
      )}

      {onReset && (
        <button
          onClick={onReset}
          className="text-[#0C372B]/60 hover:text-[#0C372B] font-bold text-xs uppercase tracking-wider px-4 py-2"
        >
          RESET
        </button>
      )}
    </div>
  );
}