import React from 'react';

export default function IDCard({ data }) {
  return (
    <div className="w-[1080px] h-[600px] bg-hh-green relative overflow-hidden flex bg-noise border-8 border-black box-border">
      
      {/* Left Geometric Border Pattern */}
      <div className="w-16 h-full border-r-4 border-black bg-hh-yellow flex flex-col justify-around py-4 shrink-0 z-10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-black mx-auto rotate-45 transform">
             <div className="w-full h-full bg-hh-pink translate-x-1 translate-y-1"></div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-12 flex flex-col justify-between relative z-10">
        {/* Header */}
        <div className="border-b-4 border-black pb-4">
          <h2 className="text-[100px] leading-none text-hh-yellow tracking-tighter">PORTFOLIO ID CARD</h2>
          <div className="flex justify-between items-center mt-2 font-mono text-xl text-black bg-hh-yellow px-4 py-1 w-fit border-2 border-black">
            <span>GOA, INDIA</span>
            <span className="mx-4">•</span>
            <span>28 - 31 OCT 2026</span>
          </div>
        </div>

        {/* User Details */}
        <div className="flex-1 mt-10">
          <div className="mb-2">
            <span className="bg-black text-white font-mono text-sm px-2 py-1 tracking-widest uppercase">BUILDER NAME</span>
          </div>
          <h1 className="text-[80px] leading-none text-hh-pink text-shadow-brutal mb-8 truncate w-[600px]">
            {data.name || '---'}
          </h1>

          <div className="mb-2">
            <span className="bg-black text-white font-mono text-sm px-2 py-1 tracking-widest uppercase">PRIMARY STACK</span>
          </div>
          <p className="text-4xl text-white tracking-wide truncate w-[600px]">
            {data.role || '---'}
          </p>
        </div>

        {/* Footer Bar */}
        <div className="border-t-4 border-black pt-4 flex justify-between font-mono text-zinc-300">
          <span>ACCESS LEVEL: OMNI</span>
          <span>HACKER HOUSE GOA 2026</span>
        </div>
      </div>

      {/* Right Side Photo Area */}
      <div className="w-[400px] h-full bg-black/20 p-8 flex items-center justify-center relative shrink-0 border-l-4 border-black">
        {/* Tilted Photo Container */}
        <div className="w-72 h-96 bg-zinc-800 -rotate-3 border-4 border-black shadow-[8px_8px_0px_0px_#FF0066] relative overflow-hidden group">
          {data.image ? (
            <img src={data.image} alt="Builder" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-center p-4">
              AWAITING<br/>IMAGE DATA
            </div>
          )}
          
          {/* Decorative Corner Element */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-hh-yellow border-4 border-black rotate-12 flex items-center justify-center shadow-lg">
             <span className="text-4xl">🌴</span>
          </div>
        </div>
        
        {/* Background typographic noise */}
        <div className="absolute top-4 right-4 text-[120px] font-sans font-bold text-white/5 select-none -rotate-90 origin-top-right">
          BUILD
        </div>
      </div>
      
    </div>
  );
}