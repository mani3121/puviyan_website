import { useEffect, useRef, useState } from 'react';
import './ParallaxImages.css';

interface ParallaxImageMobileProps {
  image1: string;
  image2: string;
}

const ParallaxImageMobile = ({ image1, image2 }: ParallaxImageMobileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [lastTouchY, setLastTouchY] = useState(0);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPath = window.location.pathname;
      if (currentPath === '/animated-split-images' && window.scrollY === 0) {
        setIsReversing(true);
        setIsTransitionComplete(false);
        setScrollProgress(100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!isTransitionComplete) {
        e.preventDefault();
        const touch = e.touches[0];
        setTouchStart(touch.clientY);
        setLastTouchY(touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTransitionComplete) {
        e.preventDefault();
        const touch = e.touches[0];
        const currentY = touch.clientY;
        const deltaY = lastTouchY - currentY;
        
        setLastTouchY(currentY);
        
        if (!isScrolling) {
          const newProgress = isReversing
            ? Math.max(0, Math.min(100, scrollProgress + (deltaY < 0 ? 2 : -2)))
            : Math.min(100, Math.max(0, scrollProgress + (deltaY > 0 ? 2 : -2)));
          
          setScrollProgress(newProgress);

          if (newProgress === 0 && isReversing) {
            setIsTransitionComplete(true);
            setIsReversing(false);
          } else if (newProgress === 100 && !isReversing) {
            setIsTransitionComplete(true);
          } else if (newProgress < 100 && !isReversing) {
            setIsTransitionComplete(false);
          } else if (newProgress > 0 && isReversing) {
            setIsTransitionComplete(false);
          }

          if ((newProgress > 0 && newProgress < 100) || (isReversing && newProgress > 0)) {
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 50);
          }
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isTransitionComplete) {
        const deltaY = touchStart - lastTouchY;
        if (Math.abs(deltaY) > 50) {
          const newProgress = isReversing
            ? Math.max(0, Math.min(100, scrollProgress + (deltaY < 0 ? 20 : -20)))
            : Math.min(100, Math.max(0, scrollProgress + (deltaY > 0 ? 20 : -20)));
          
          setScrollProgress(newProgress);

          if (newProgress === 0 && isReversing) {
            setIsTransitionComplete(true);
            setIsReversing(false);
          } else if (newProgress === 100 && !isReversing) {
            setIsTransitionComplete(true);
          } else if (newProgress < 100 && !isReversing) {
            setIsTransitionComplete(false);
          } else if (newProgress > 0 && isReversing) {
            setIsTransitionComplete(false);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [scrollProgress, isScrolling, isTransitionComplete, touchStart, lastTouchY, isReversing]);

  return (
    <div 
      ref={containerRef}
      className={`parallax-container ${isTransitionComplete ? 'transition-complete' : ''}`}
      style={{ 
        touchAction: isTransitionComplete ? 'auto' : 'none',
        position: 'relative',
        top: '40px', // Height of the header
        height: 'calc(100vh - 40px)', // Subtract header height from viewport height
        width: '100%'
      }}
    >
      <div className="parallax-image-wrapper">
        <div 
          className="parallax-image"
          style={{ 
            backgroundImage: `url(${image1})`,
            height: '100%',
            width: '100%'
          }}
        />
      </div>
      <div 
        className="parallax-image-wrapper second-image"
        style={{
          clipPath: `inset(${100 - scrollProgress}% 0 0 0)`,
          transition: 'clip-path 0.1s ease-out',
          height: '100%',
          width: '100%'
        }}
      >
        <div 
          className="parallax-image"
          style={{ 
            backgroundImage: `url(${image2})`,
            height: '100%',
            width: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxImageMobile; 