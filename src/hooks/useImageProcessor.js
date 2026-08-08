import { useState } from 'react';
import heic2any from 'heic2any';

export function useImageProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processImage = async (file) => {
    setIsProcessing(true);
    setError(null);

    try {
      let processedFile = file;
      
      // Intercept HEIC/HEIF files
      if (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8,
        });
        processedFile = new File([convertedBlob], 'converted.jpg', { type: 'image/jpeg' });
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setIsProcessing(false);
          resolve(e.target.result);
        };
        reader.onerror = (e) => {
          setIsProcessing(false);
          setError('Failed to read file');
          reject(e);
        };
        reader.readAsDataURL(processedFile);
      });
    } catch (err) {
      setIsProcessing(false);
      setError('Failed to process image. Try another format.');
      console.error(err);
      return null;
    }
  };

  return { processImage, isProcessing, error };
}