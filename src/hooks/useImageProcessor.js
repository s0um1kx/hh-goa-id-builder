import { useState } from 'react';

export const useImageProcessor = () => {
  const [photoUrl, setPhotoUrl] = useState(null);

  const processImage = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to process image to B&W
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        // Convert canvas image pixels to Grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // Red
          data[i + 1] = avg; // Green
          data[i + 2] = avg; // Blue
        }
        ctx.putImageData(imageData, 0, 0);

        setPhotoUrl(canvas.toDataURL('image/png'));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => setPhotoUrl(null);

  return { photoUrl, processImage, removePhoto };
};