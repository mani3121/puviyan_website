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

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart(touch.clientY);
      setLastTouchY(touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const currentY = touch.clientY;
      const deltaY = lastTouchY - currentY;
      
      setLastTouchY(currentY);
      
      if (!isScrolling) {
        let newProgress;
        if (isTransitionComplete) {
          // When on second image and scrolling down (deltaY < 0), reverse the transition
          newProgress = Math.min(100, Math.max(0, scrollProgress + (deltaY < 0 ? 2 : -2)));
        } else {
          // Normal forward transition
          newProgress = Math.min(100, Math.max(0, scrollProgress + (deltaY > 0 ? 2 : -2)));
        }
        
        setScrollProgress(newProgress);

        if (newProgress === 100) {
          setIsTransitionComplete(true);
        } else if (newProgress === 0) {
          setIsTransitionComplete(false);
        }

        if (newProgress > 0 && newProgress < 100) {
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), 50);
        }
      }
    };

    const handleTouchEnd = () => {
      const deltaY = touchStart - lastTouchY;
      if (Math.abs(deltaY) > 50) {
        let newProgress;
        if (isTransitionComplete) {
          // When on second image and scrolling down (deltaY < 0), reverse the transition
          newProgress = Math.min(100, Math.max(0, scrollProgress + (deltaY < 0 ? 20 : -20)));
        } else {
          // Normal forward transition
          newProgress = Math.min(100, Math.max(0, scrollProgress + (deltaY > 0 ? 20 : -20)));
        }
        
        setScrollProgress(newProgress);

        if (newProgress === 100) {
          setIsTransitionComplete(true);
        } else if (newProgress === 0) {
          setIsTransitionComplete(false);
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
  }, [scrollProgress, isScrolling, isTransitionComplete, touchStart, lastTouchY]);

  return (
    <div 
      ref={containerRef}
      className={`parallax-container ${isTransitionComplete ? 'transition-complete' : ''}`}
      style={{ touchAction: 'none' }}
    >
      <div className="parallax-image-wrapper">
        <div 
          className="parallax-image"
          style={{ 
            backgroundImage: `url(${image1})`
          }}
        />
      </div>
      <div 
        className="parallax-image-wrapper second-image"
        style={{
          clipPath: `inset(${100 - scrollProgress}% 0 0 0)`,
          transition: 'clip-path 0.1s ease-out'
        }}
      >
        <div 
          className="parallax-image"
          style={{ 
            backgroundImage: `url(${image2})`
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxImageMobile; 