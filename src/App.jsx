import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import heic2any from 'heic2any';
import Controls from './components/Controls';
import IDCard from './components/IDCard';
import ShareActions from './components/ShareActions';
import logoImg from './assets/logo-background-remove.png';
import studioImg from './assets/studio-bg remove.png';
import { generateBuilderId } from './utils/generateId';

export default function App() {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [errors, setErrors] = useState({});

  const initialFormData = {
    fullName: '',
    role: '',
    location: '',
    selectedTech: [],
    github: '',
    linkedin: '',
    builderTitle: 'CODE WIZARD',
    photoUrl: null,
    builderId: generateBuilderId(''),
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (formData.fullName) {
      setFormData((prev) => ({
        ...prev,
        builderId: generateBuilderId(prev.fullName),
      }));
    }
  }, [formData.fullName]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.role || !formData.role.trim()) {
      newErrors.role = 'Please enter your role';
    }
    if (!formData.selectedTech || formData.selectedTech.length === 0) {
      newErrors.selectedTech = 'Please select at least 1 tech stack';
    }
    if (!formData.photoUrl) {
      newErrors.photoUrl = 'Please upload a photo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processAndSetImage = (fileToRead) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        // B&W filter transformation
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const brightness =
            0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          data[i] = brightness;
          data[i + 1] = brightness;
          data[i + 2] = brightness;
        }
        ctx.putImageData(imgData, 0, 0);

        const bwImageUrl = canvas.toDataURL('image/png');
        setFormData((prev) => ({ ...prev, photoUrl: bwImageUrl }));
        setErrors((prev) => ({ ...prev, photoUrl: null }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(fileToRead);
  };

  const handleImageUpload = async (e) => {
    const file = e.target?.files?.[0] || e;
    if (!file || !(file instanceof Blob)) return;

    try {
      let fileToProcess = file;

      // Check if file is HEIC / HEIF format
      const isHeic =
        file.name?.toLowerCase().endsWith('.heic') ||
        file.name?.toLowerCase().endsWith('.heif') ||
        file.type === 'image/heic' ||
        file.type === 'image/heif';

      if (isHeic) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        });
        fileToProcess = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob;
      }

      if (formData.photoUrl && formData.photoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(formData.photoUrl);
      }

      processAndSetImage(fileToProcess);
    } catch (err) {
      console.error('HEIC processing failed:', err);
      alert('Unable to process this image. Please try another photo.');
    }
  };

  const handleDownload = async () => {
    if (!validateForm()) return;
    if (!cardRef.current) return;

    setIsDownloading(true);

    try {
      const cardElement = cardRef.current;

      const originalTransform = cardElement.style.transform;
      cardElement.style.transform = 'none';

      await new Promise((resolve) => setTimeout(resolve, 150));

      const dataUrl = await toPng(cardElement, {
        quality: 1.0,
        pixelRatio: 2,
        skipFonts: true,
        cacheBust: false,
      });

      cardElement.style.transform = originalTransform;

      const link = document.createElement('a');
      const safeName = (formData.fullName || 'builder')
        .toLowerCase()
        .replace(/\s+/g, '-');
      link.download = `${safeName}-id-${formData.builderId}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to generate image. Please try re-uploading your photo.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareX = () => {
  if (!validateForm()) return;

  // Ensure full https:// protocol is included
  const appUrl = 'https://hh-goa-id-builder.vercel.app/';
  const tweetText = `🛵 Built my Hacker Goa House Builder ID Card!\n\n👤 ${formData.fullName}\n🪪 Builder ID: #${formData.builderId}\n\nExcited to build, ship, and connect with amazing builders in Goa. 🌊\n\nCreate your own Builder Card: ${appUrl}\n\n#FrameInGoa #HHGoa2026`;

  const twitterUrl = `https://x.com/intent/post?text=${encodeURIComponent(tweetText)}`;

  window.open(twitterUrl, '_blank', 'noopener,noreferrer');
};

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
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
    <div className="min-h-screen text-[#0C372B] flex flex-col font-mono selection:bg-[#FFD93D] relative bg-[#FAF8F5]">
      {/* Sage Cross Background Pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="sage-cross-pattern"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M8 10H12M10 8V12"
              stroke="#DCE4D6"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sage-cross-pattern)" />
      </svg>

      <header className="bg-[#0C372B] text-white px-8 py-5 border-b border-[#185241] flex justify-between items-center relative z-10 shadow-sm">
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

      <div className="bg-[#FFD93D] border-b-2 border-[#0C372B] py-2 overflow-hidden flex whitespace-nowrap text-[12px] font-black tracking-widest uppercase text-[#0C372B] relative z-10">
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
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
            (item, idx) => (
              <span
                key={idx}
                className={item === '•' ? 'text-[#0C372B]/40' : ''}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      <main className="max-w-345 mx-auto w-full p-6 md:p-10 flex-1 grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-10 items-start relative z-10">
        <Controls
          formData={formData}
          setFormData={setFormData}
          onImageUpload={handleImageUpload}
          errors={errors}
          setErrors={setErrors}
        />

        <div className="flex flex-col items-center space-y-6 sticky top-6 w-full">
          <div className="w-full flex justify-start items-center px-2 max-w-175">
            <div className="bg-[#0C372B] text-[#FFD93D] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFD93D] animate-pulse" />
              LIVE PREVIEW • ID: {formData.builderId} • GOA 2026
            </div>
          </div>

          <div className="w-full flex justify-center overflow-hidden py-2">
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