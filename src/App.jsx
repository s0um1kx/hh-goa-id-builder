import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import IDCard from './components/IDCard';
import Controls from './components/Controls';
import ShareActions from './components/ShareActions';

export default function App() {
  const [data, setData] = useState({
    name: 'ANONYMOUS BUILDER',
    role: 'FULLSTACK ENGINEER',
    image: null,
  });
  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef(null);
  const containerRef = useRef(null);

  // Dynamically scale the preview to fit mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const newScale = Math.min(parentWidth / 1080, 1);
        setScale(newScale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-noise bg-zinc-900 flex flex-col md:flex-row">
      {/* Left Pane: Preview */}
      <div className="w-full md:w-3/5 p-4 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-700/50 relative overflow-hidden" ref={containerRef}>
        <div 
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top left',
            width: '1080px',
            height: '600px'
          }}
          className="shadow-2xl ring-1 ring-white/10"
        >
          <IDCard data={data} />
        </div>
      </div>

      {/* Right Pane: Controls */}
      <div className="w-full md:w-2/5 p-6 md:p-12 flex flex-col justify-center space-y-8 bg-zinc-950/50 backdrop-blur-sm z-10">
        <div>
          <h1 className="text-4xl text-hh-yellow tracking-wider">GENERATE YOUR ID</h1>
          <p className="text-zinc-400 font-mono text-sm mt-2">HACKER HOUSE GOA 2026</p>
        </div>

        <Controls data={data} setData={setData} />
        
        <ShareActions 
        exportNodeRef={exportRef} 
        isExporting={isExporting} 
        setIsExporting={setIsExporting} 
        fileName={`HH-GOA-${data.name.replace(/\s+/g, '-').toUpperCase()}.png`}
        data={data}
      />  
      </div>

      {/* Hidden Canonical Export Node (Strict 1080x600) */}
      <div className="fixed top-[-9999px] left-[-9999px]">
        <div ref={exportRef} style={{ width: '1080px', height: '600px' }}>
          <IDCard data={data} />
        </div>
      </div>
    </div>
  );
}