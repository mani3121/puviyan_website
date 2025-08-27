import { useEffect, useState } from 'react';
import ParallaxImageMobile from './ParallaxImageMobile';
import ParallaxImages from './ParallaxImages';

interface ParallaxImageWrapperProps {
  image1: string;
  image2: string;
  mobileImage1: string;
  mobileImage2: string;
  loading?: 'eager' | 'lazy';
}

const ParallaxImageWrapper = ({ image1, image2, mobileImage1, mobileImage2, loading = 'lazy' }: ParallaxImageWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Preload next section images when user scrolls 50%
    const preloadNextImages = () => {
      const link1 = document.createElement('link');
      link1.rel = 'preload';
      link1.as = 'image';
      link1.href = '/images/MobileImage3.webp';
      document.head.appendChild(link1);
    };

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY > window.innerHeight * 0.5) {
          preloadNextImages();
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile ? (
    <ParallaxImageMobile 
      image1={mobileImage1}
      image2={mobileImage2}
      loading={loading}
    />
  ) : (
    <ParallaxImages 
      image1={image1}
      image2={image2}
      loading={loading}
    />
  );
};

export default ParallaxImageWrapper;