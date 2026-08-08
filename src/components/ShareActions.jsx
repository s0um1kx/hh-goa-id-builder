import React from 'react';

export default function ShareActions({ onDownload, onShareX, onReset, isDownloading }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
      {/* Download Pass Button */}
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className="bg-[#0A3323] hover:bg-[#07261A] text-[#FFD93D] font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 border border-[#0A3323] shadow-md transition-all active:scale-95 disabled:opacity-50"
      >
        <svg
          className="w-4 h-4 stroke-[2.5] stroke-current fill-none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5 4.5m0 0l4.5-4.5M12 3v13.5"
          />
        </svg>
        <span>{isDownloading ? 'Downloading...' : 'Download Pass'}</span>
      </button>

      {/* Share to X Button */}
      {onShareX && (
        <button
          onClick={onShareX}
          className="bg-white hover:bg-gray-50 text-[#0A3323] font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 border border-[#0A3323] shadow-sm transition-all active:scale-95"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Share to X</span>
        </button>
      )}

      {/* Generate Another Pass Button */}
      {onReset && (
        <button
          onClick={onReset}
          className="bg-white hover:bg-gray-50 text-[#0A3323] font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 border border-[#0A3323] shadow-sm transition-all active:scale-95"
        >
          <svg
            className="w-4 h-4 stroke-[2.5] stroke-current fill-none"
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
      )}
    </div>
  );
}