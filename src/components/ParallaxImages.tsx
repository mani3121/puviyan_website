import { useEffect, useRef, useState } from 'react';
import './ParallaxImages.css';

interface ParallaxImagesProps {
  image1: string;
  image2: string;
  mobileImage1?: string;
  mobileImage2?: string;
}

const ParallaxImages = ({ image1, image2, mobileImage1, mobileImage2 }: ParallaxImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitionComplete && e.deltaY > 0) {
        return;
      }

      e.preventDefault();

      if (!isScrolling) {
        const delta = e.deltaY;
        const newProgress = Math.min(100, Math.max(0, scrollProgress + (delta > 0 ? 5 : -5)));
        setScrollProgress(newProgress);

        // Calculate the scroll position based on progress
        const container = containerRef.current;
        if (container) {
          const containerTop = container.offsetTop;
          const containerHeight = container.offsetHeight;
          const windowHeight = window.innerHeight;
          const maxScroll = containerHeight - windowHeight;
          const targetScroll = containerTop + (maxScroll * (newProgress / 100));
          
          // Smoothly scroll to the calculated position
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }

        if (newProgress === 100) {
          setIsTransitionComplete(true);
        } else if (newProgress < 100) {
          setIsTransitionComplete(false);
        }

        if (newProgress > 0 && newProgress < 100) {
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 50);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitionComplete) {
        return;
      }

      const touch = e.touches[0];
      const lastTouchY = parseFloat(containerRef.current?.dataset.lastTouchY || '0');
      const deltaY = touch.clientY - lastTouchY;

      if (!isScrolling) {
        const newProgress = Math.min(100, Math.max(0, scrollProgress + (deltaY < 0 ? 5 : -5)));
        setScrollProgress(newProgress);

        // Calculate the scroll position based on progress
        const container = containerRef.current;
        if (container) {
          const containerTop = container.offsetTop;
          const containerHeight = container.offsetHeight;
          const windowHeight = window.innerHeight;
          const maxScroll = containerHeight - windowHeight;
          const targetScroll = containerTop + (maxScroll * (newProgress / 100));
          
          // Smoothly scroll to the calculated position
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }

        if (newProgress === 100) {
          setIsTransitionComplete(true);
        } else if (newProgress < 100) {
          setIsTransitionComplete(false);
        }

        if (newProgress > 0 && newProgress < 100) {
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 50);
        }
      }

      if (containerRef.current) {
        containerRef.current.dataset.lastTouchY = `${touch.clientY}`;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [scrollProgress, isScrolling, isTransitionComplete]);

  return (
    <div 
      ref={containerRef}
      className={`parallax-container ${isTransitionComplete ? 'transition-complete' : ''}`}
    >
      <div className="parallax-image-wrapper">
        <div 
          className="parallax-image"
          style={{ 
            backgroundImage: `url(${isMobile && mobileImage1 ? mobileImage1 : image1})`
          }}
        />
      </div>
      <div 
        className="parallax-image-wrapper second-image"
        style={{
          clipPath: `inset(${100 - scrollProgress}% 0 0 0)`
        }}
      >
        <div 
          className="parallax-image"
          style={{ 
            backgroundImage: `url(${isMobile && mobileImage2 ? mobileImage2 : image2})`
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxImages;