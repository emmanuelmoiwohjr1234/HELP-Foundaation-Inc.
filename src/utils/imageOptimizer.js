// Optimize image URLs with size and quality parameters
export const optimizeImageUrl = (url, { width = 800, quality = 75 } = {}) => {
  if (!url) return '';
  
  // Handle Unsplash images
  if (url.includes('unsplash.com')) {
    return `${url}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  
  // Add more image service handlers here if needed
  return url;
};

// Common image sizes
export const IMAGE_SIZES = {
  thumbnail: 200,
  small: 400,
  medium: 800,
  large: 1200,
  hero: 1600
};

// Image quality presets
export const IMAGE_QUALITY = {
  low: 60,
  medium: 75,
  high: 85,
  max: 100
};

// Generate srcSet for responsive images
export const generateSrcSet = (url, sizes = [400, 800, 1200]) => {
  if (!url) return '';
  
  return sizes
    .map(size => `${optimizeImageUrl(url, { width: size })} ${size}w`)
    .join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}) => {
  return Object.entries(breakpoints)
    .map(([breakpoint, value]) => `(min-width: ${value}px) ${value}px`)
    .join(', ') + ', 100vw';
};

// Preload critical images
export const preloadCriticalImages = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Load image with promise
export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};
