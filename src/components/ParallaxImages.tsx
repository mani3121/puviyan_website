import { useEffect, useRef, useState } from 'react';
import './ParallaxImages.css';

interface ParallaxImagesProps {
  image1: string;
  image2: string;
}

const ParallaxImages = ({ image1, image2 }: ParallaxImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitionComplete && e.deltaY > 0) {
        // Allow normal scroll if transition is complete and scrolling down
        return;
      }

      e.preventDefault();

      if (!isScrolling) {
        const delta = e.deltaY;
        const newProgress = Math.min(100, Math.max(0, scrollProgress + (delta > 0 ? 5 : -5)));
        setScrollProgress(newProgress);

        // Set transition complete when reaching 100%
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
      const deltaY = touch.clientY - (parseFloat(containerRef.current?.dataset.lastTouchY || '0'));

      if (!isScrolling) {
        const newProgress = Math.min(100, Math.max(0, scrollProgress + (deltaY < 0 ? 5 : -5)));
        setScrollProgress(newProgress);

        // Set transition complete when reaching 100%
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
            backgroundImage: `url(${image1})`
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
            backgroundImage: `url(${image2})`
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxImages;