import React from 'react';
import { Download, X } from 'lucide-react';

export default function ShareActions({ exportNodeRef, isExporting, setIsExporting, fileName, data }) {
  
  const generateImage = async () => {
    if (!exportNodeRef.current) return null;
    setIsExporting(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(exportNodeRef.current, { 
        cacheBust: true, 
        quality: 1,
        pixelRatio: 2 
      });
      setIsExporting(false);
      return dataUrl;
    } catch (err) {
      console.error('Render failed:', err);
      setIsExporting(false);
      return null;
    }
  };

  const handleDownload = async () => {
    if (!exportNodeRef.current) return;
    setIsExporting(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(exportNodeRef.current, { cacheBust: true, quality: 1, pixelRatio: 2 });
      setIsExporting(false);
      
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const tweetText = `🌴 Built my Hacker Goa House Builder Card!\n\n👤 ${data.name || 'Builder'}\n🆔 Builder ID: #HH-GOA-6825\n\nExcited to build, ship, and connect with amazing builders in Goa. 🚀\n\n#FrameInGoa #HHGoa2026`;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile || !navigator.canShare) {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
      return;
    }

    if (!exportNodeRef.current) return;
    setIsExporting(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(exportNodeRef.current, { cacheBust: true, quality: 1, pixelRatio: 2 });
      setIsExporting(false);

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], fileName, { type: 'image/png' });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Hacker House Goa 2026',
          text: tweetText,
          files: [file],
        });
      } else {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
      }
    } catch (error) {
      setIsExporting(false);
      if (error.name !== 'AbortError') {
         window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
      }
    }
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={handleDownload}
        disabled={isExporting}
        className="flex-1 bg-hh-green text-hh-yellow border-2 border-hh-green p-4 font-sans text-xl tracking-wider hover:bg-green-900 transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-2xl shadow-md"
      >
        <Download size={22} />
        {isExporting ? 'RENDERING...' : 'Download Pass'}
      </button>
      
      <button 
        onClick={handleShare}
        disabled={isExporting}
        className="flex-1 bg-white text-zinc-900 border-2 border-zinc-900 p-4 font-sans text-xl tracking-wider hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-2xl shadow-md"
      >
        <X size={20} className="fill-current" />
        <span>Share to X</span>
      </button>
    </div>
  );
}