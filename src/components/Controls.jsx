import React from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useImageProcessor } from '../hooks/useImageProcessor';

export default function Controls({ data, setData }) {
  const { processImage, isProcessing, error } = useImageProcessor();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64Image = await processImage(file);
    if (base64Image) setData({ ...data, image: base64Image });
  };

  return (
    <div className="space-y-5 font-mono">
      <div className="space-y-2">
        <label className="text-xs text-hh-pink uppercase tracking-widest font-bold">Builder Name</label>
        <input 
          type="text" 
          maxLength={20}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value.toUpperCase() })}
          className="w-full bg-zinc-900 border-2 border-hh-green p-3 text-white focus:outline-none focus:border-hh-yellow transition-colors placeholder:text-zinc-600"
          placeholder="ENTER NAME"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-hh-pink uppercase tracking-widest font-bold">Stack / Role</label>
        <input 
          type="text" 
          maxLength={30}
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value.toUpperCase() })}
          className="w-full bg-zinc-900 border-2 border-hh-green p-3 text-white focus:outline-none focus:border-hh-yellow transition-colors placeholder:text-zinc-600"
          placeholder="E.G. SMART CONTRACT DEV"
        />
      </div>

      <div className="space-y-2 pt-2">
        <label className="text-xs text-hh-pink uppercase tracking-widest font-bold">Profile Photo</label>
        <div className="relative">
          <input 
            type="file" 
            accept="image/*,.heic,.heif"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-full bg-hh-green hover:bg-green-800 transition-colors border-2 border-hh-green text-white p-3 flex items-center justify-center space-x-2 font-sans text-xl tracking-wider uppercase">
            {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : <Upload className="h-5 w-5" />}
            <span>{isProcessing ? 'PROCESSING HEIC...' : 'UPLOAD MUGSHOT'}</span>
          </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}