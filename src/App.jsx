import React, { useState } from 'react';
import Controls from './components/Controls';
import IDCard from './components/IDCard';
import ShareActions from './components/ShareActions';
import logoImg from './assets/logo-background-remove.png';
import studioImg from './assets/studio-bg remove.png';

export default function App() {
  const [formData, setFormData] = useState({
    fullName: 'Alex Rivera',
    role: 'Full-Stack Builder',
    location: 'Goa, India',
    selectedTech: ['React', 'Node.js', 'AI', 'Next.js'],
    github: 'alexbuilds',
    linkedin: 'alex.hh',
    builderTitle: 'CODE WIZARD',
    currentlyShipping: 'Building local-first GPU mesh + cold brews on the beach. Shipping daily from Goa',
    photoUrl: null,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photoUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleDownload = () => {
    alert('Generating HQ PNG export...');
  };

  const tickerItems = [
    '• BUILDER ID CARD',
    '• GOA 28-31 OCT 2026',
    '• BUILD IN SUN',
    '• SHIP FROM PARADISE',
    '★ #FRAMEINGOA',
  ];

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#0A251C] flex flex-col font-mono selection:bg-[#FFD93D]">
      {/* Top Header Bar */}
      <header className="bg-[#0A251C] text-white px-8 py-6 border-b border-black flex justify-between items-center">
        {/* Left Section: Asset Logo + Divider + Subtitle Details */}
        <div className="flex items-center gap-6">
          <img
            src={logoImg}
            alt="Hacker House Goa Logo"
            className="h-16 w-auto object-contain shrink-0"
          />

          <div className="h-10 w-px bg-white/20" />

          <div className="font-mono">
            <div className="text-[13px] font-bold text-[#FFD93D] tracking-wide uppercase">
              BUILDER ID CARD GENERATOR • GOA 2026
            </div>
            <div className="text-[11px] text-white/50 tracking-wider font-semibold uppercase mt-0.5">
              PRODUCT EDITION • PORTFOLIO ID • V4
            </div>
          </div>
        </div>

        {/* Right Section: Studio Branding Image with Hover Animation */}
        <div className="flex items-center">
          <img
            src={studioImg}
            alt="2:47PM Studio Logo"
            className="h-12 w-auto object-contain shrink-0 cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-rotate-2 hover:drop-shadow-[0_0_12px_rgba(255,217,61,0.5)] active:scale-95"
          />
        </div>
      </header>

      {/* Infinite Scrolling Yellow Marquee Ticker */}
      <div className="bg-[#FFD93D] border-b-2 border-[#0A251C] py-2.5 overflow-hidden flex whitespace-nowrap text-[12px] font-black tracking-widest uppercase">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 18s linear infinite;
          }
        `}</style>
        <div className="animate-marquee flex gap-8 items-center pr-8">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-345 mx-auto w-full p-6 md:p-8 flex-1 grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-8 items-start">
        <Controls
          formData={formData}
          setFormData={setFormData}
          onImageUpload={handleImageUpload}
        />

        <div className="flex flex-col items-center justify-center space-y-6 sticky top-6">
          <div className="w-full flex justify-between items-center px-2">
            <div className="bg-[#0A251C] text-[#FFD93D] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD93D] animate-pulse" />
              LIVE PREVIEW • HORIZONTAL ID
            </div>
            <span className="text-[11px] text-[#0A251C]/50">700×440 • Portfolio ID Card</span>
          </div>

          <IDCard formData={formData} />

          <ShareActions onDownload={handleDownload} />
        </div>
      </main>
    </div>
  );
}