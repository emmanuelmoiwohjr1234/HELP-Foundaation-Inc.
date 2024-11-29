import { useState, useEffect } from 'react';

const useImagePreload = (imageUrls) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };

        img.onerror = () => {
          reject(new Error(`Failed to load image: ${url}`));
        };

        img.src = url;
      });
    };

    Promise.all(imageUrls.map(url => preloadImage(url)))
      .catch(err => {
        setError(err);
        console.error('Error preloading images:', err);
      });

    return () => {
      // Cleanup
      setImagesLoaded(false);
      setError(null);
    };
  }, [imageUrls]);

  return { imagesLoaded, error };
};

export default useImagePreload;
