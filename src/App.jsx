import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import Controls from './components/Controls';
import IDCard from './components/IDCard';
import ShareActions from './components/ShareActions';
import logoImg from './assets/logo-background-remove.png';
import studioImg from './assets/studio-bg remove.png';

export default function App() {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const initialFormData = {
    fullName: 'Soumik Mondal',
    role: 'Full-Stack Builder',
    location: 'Goa, India',
    selectedTech: ['Full-Stack', 'Rust', 'AI', 'Design'],
    github: 's0um1kx',
    linkedin: 'soumik.workmail@gmail.com',
    builderTitle: 'CODE WIZARD',
    photoUrl: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (formData.photoUrl && formData.photoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(formData.photoUrl);
      }
      setFormData((prev) => ({
        ...prev,
        photoUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) {
      alert('Card reference not found. Please try again.');
      return;
    }
    
    setIsDownloading(true);

    try {
      // Temporarily remove 3D perspective/tilt to capture flat canvas
      const originalTransform = cardRef.current.style.transform;
      cardRef.current.style.transform = 'none';

      // Small delay to ensure browser repaints without transform
      await new Promise((resolve) => setTimeout(resolve, 50));

      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
      });

      // Restore original 3D tilt
      cardRef.current.style.transform = originalTransform;

      // Create download trigger link
      const link = document.createElement('a');
      link.download = `${formData.fullName.toLowerCase().replace(/\s+/g, '-')}-builder-pass.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export ID Card image:', err);
      alert('Failed to generate PNG download. Ensure html-to-image is installed (`npm install html-to-image`).');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareX = () => {
    const text = encodeURIComponent(
      `Just generated my Builder Pass for Hacker House Goa 2026! Check it out ⚡ #frameingoa`
    );
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://x.com/intent/post?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleReset = () => {
    if (formData.photoUrl && formData.photoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(formData.photoUrl);
    }
    setFormData(initialFormData);
  };

  const tickerItems = [
    'BUILD IN SUN',
    '•',
    'SHIP FROM PARADISE',
    '•',
    '#FRAMEINGOA',
    '•',
    'GOA 28-31 OCT 2026',
    '•',
  ];

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#0C372B] flex flex-col font-mono selection:bg-[#FFD93D]">
      {/* Top Header Bar */}
      <header className="bg-[#0C372B] text-white px-8 py-5 border-b border-[#185241] flex justify-between items-center">
        <div className="flex items-center gap-6">
          <img
            src={logoImg}
            alt="Hacker House Goa Logo"
            className="h-14 w-auto object-contain shrink-0"
          />
          <div className="h-8 w-px bg-white/20" />
          <div className="font-mono">
            <div className="text-[13px] font-bold text-[#FFD93D] tracking-wide uppercase">
              BUILDER ID CARD GENERATOR • GOA 2026
            </div>
            <div className="text-[11px] text-white/50 tracking-wider font-semibold uppercase mt-0.5">
              SINGLE THEME • BUILDER ID CARD
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <img
            src={studioImg}
            alt="Studio Logo"
            className="h-10 w-auto object-contain shrink-0 cursor-pointer transition-transform hover:scale-105"
          />
        </div>
      </header>

      {/* Infinite Scrolling Yellow Marquee Ticker */}
      <div className="bg-[#FFD93D] border-b-2 border-[#0C372B] py-2 overflow-hidden flex whitespace-nowrap text-[12px] font-black tracking-widest uppercase text-[#0C372B]">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 16s linear infinite;
          }
        `}</style>
        <div className="animate-marquee flex gap-6 items-center pr-6">
          {[
            ...tickerItems,
            ...tickerItems,
            ...tickerItems,
            ...tickerItems,
            ...tickerItems,
            ...tickerItems,
          ].map((item, idx) => (
            <span key={idx} className={item === '•' ? 'text-[#0C372B]/40' : ''}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid Section */}
      <main className="max-w-345 mx-auto w-full p-6 md:p-10 flex-1 grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-10 items-start">
        {/* Left Form Controls Panel */}
        <Controls
          formData={formData}
          setFormData={setFormData}
          onImageUpload={handleImageUpload}
        />

        {/* Right Preview Section */}
        <div className="flex flex-col items-center space-y-6 sticky top-6 w-full">
          <div className="w-full flex justify-start items-center px-2 max-w-175">
            <div className="bg-[#0C372B] text-[#FFD93D] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD93D] animate-pulse" />
              LIVE PREVIEW • NO. 047 • GOA • 28-31 OCT 2026
            </div>
          </div>

          <div className="w-full flex justify-center overflow-x-auto py-2">
            <IDCard ref={cardRef} formData={formData} />
          </div>

          <ShareActions
            onDownload={handleDownload}
            onShareX={handleShareX}
            onReset={handleReset}
            isDownloading={isDownloading}
          />
        </div>
      </main>
    </div>
  );
}