// Image optimization utilities for carbon footprint reduction

export const createOptimizedImageSrc = (
  originalSrc: string,
  width?: number,
  height?: number,
  quality: number = 80
): string => {
  // For production, you could integrate with image CDN services like Cloudinary, ImageKit, etc.
  // For now, we'll return the original src but this structure allows for future optimization
  return originalSrc;
};

export const getImageFormat = (src: string): 'webp' | 'avif' | 'jpeg' | 'png' | 'unknown' => {
  const lowerSrc = src.toLowerCase();
  if (lowerSrc.includes('.webp')) return 'webp';
  if (lowerSrc.includes('.avif')) return 'avif';
  if (lowerSrc.includes('.jpg') || lowerSrc.includes('.jpeg')) return 'jpeg';
  if (lowerSrc.includes('.png')) return 'png';
  return 'unknown';
};

export const estimateImageSize = (
  width: number,
  height: number,
  format: ReturnType<typeof getImageFormat>
): number => {
  const pixels = width * height;
  
  switch (format) {
    case 'webp':
      return pixels * 0.1; // WebP ~70% smaller than JPEG
    case 'avif':
      return pixels * 0.08; // AVIF ~80% smaller than JPEG
    case 'jpeg':
      return pixels * 0.3; // JPEG with compression
    case 'png':
      return pixels * 0.8; // PNG less compressed
    default:
      return 50000; // Default fallback
  }
};

export const preloadCriticalImages = (imageSrcs: string[]) => {
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

export const lazyLoadImage = (
  img: HTMLImageElement,
  src: string,
  callback?: () => void
) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src;
          img.onload = callback;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  } else {
    // Fallback for older browsers
    img.src = src;
    img.onload = callback;
  }
};
