import React, { forwardRef, useEffect, useRef, useState } from 'react';

/**
 * OptimizedImage delivers modern formats (AVIF/WebP) with PNG/JPEG fallback using <picture>.
 * Usage:
 *   <OptimizedImage src="/images/Co-2.png" alt="CO2" width={32} height={32} className="w-8 h-8" />
 *
 * Expectation:
 *   Pre-generate /images/Co-2.avif and /images/Co-2.webp using the provided Node script.
 *   If modern formats are missing, the browser will fall back to the original src.
 */
export type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string; // path under public, e.g. /images/foo.png
  generatePaths?: (src: string) => { avif: string; webp: string };
  /**
   * If true, and the browser supports AVIF/WebP, set the <img> src to the modern
   * format so that right-click "Save image as" downloads the optimized format.
   * Defaults to false to preserve original behavior.
   */
  preferModernSrcForDownload?: boolean;
};

const defaultGeneratePaths = (src: string) => {
  // Convert "/images/foo.png" -> "/images/foo.avif" and "/images/foo.webp"
  const base = src.replace(/\.(png|jpg|jpeg|webp|gif|ico)$/i, '');
  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
  };
};

// Lightweight format support detection with memoized result
let cachedSupport: { avif: boolean | null; webp: boolean | null } | null = null;
const checkFormatSupport = (): Promise<{ avif: boolean; webp: boolean }> => {
  if (cachedSupport && cachedSupport.avif !== null && cachedSupport.webp !== null) {
    return Promise.resolve({ avif: !!cachedSupport.avif, webp: !!cachedSupport.webp });
  }
  const supports = { avif: false, webp: false };
  const test = (type: 'avif' | 'webp'): Promise<boolean> =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img.width > 0 && img.height > 0);
      img.onerror = () => resolve(false);
      // minimal data URIs for detection
      img.src =
        type === 'avif'
          ? 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxAAABAG1ldGEAAAABAAAAAQAA'
          : 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    });

  return Promise.all([test('avif'), test('webp')]).then(([avif, webp]) => {
    cachedSupport = { avif, webp };
    return { avif, webp };
  });
};

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({ 
  src,
  alt,
  generatePaths = defaultGeneratePaths,
  preferModernSrcForDownload = false,
  ...imgProps
}, ref) => {
  const { avif, webp } = generatePaths(src);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [effectiveSrc, setEffectiveSrc] = useState<string>(src);

  useEffect(() => {
    let mounted = true;
    if (!preferModernSrcForDownload) return;
    // Decide the most modern supported src for the <img> element
    checkFormatSupport().then(({ avif: canAvif, webp: canWebp }) => {
      if (!mounted) return;
      if (canAvif) setEffectiveSrc(avif);
      else if (canWebp) setEffectiveSrc(webp);
      else setEffectiveSrc(src);
    });
    return () => {
      mounted = false;
    };
  }, [avif, webp, src, preferModernSrcForDownload]);

  const imgEl = (
    <img
      ref={(node) => {
        imgRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLImageElement | null>).current = node;
      }}
      src={preferModernSrcForDownload ? effectiveSrc : src}
      alt={alt}
      {...imgProps}
    />
  );

  return (
    <picture>
      {/* Most efficient first */}
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      {imgEl}
    </picture>
  );
});

export default OptimizedImage;
