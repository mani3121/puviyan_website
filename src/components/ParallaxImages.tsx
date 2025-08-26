import { useEffect, useRef, useState } from 'react';
import './ParallaxImages.css';

interface ParallaxImagesProps {
  image1: string;
  image2: string;
  loading?: 'eager' | 'lazy';
}

const ParallaxImages = ({ image1, image2, loading }: ParallaxImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

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

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle arrow keys and page up/down keys
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.key)) {
        // Only prevent default if we're in the transition area
        const container = containerRef.current;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const isInView = containerRect.top <= window.innerHeight && containerRect.bottom >= 0;
          
          if (isInView && !isTransitionComplete) {
            e.preventDefault();
            
            if (!isScrolling) {
              let delta = 0;
              
              // Determine scroll direction based on key
              if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'Space') {
                delta = 5; // Scroll down
              } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                delta = -5; // Scroll up
              }
              
              const newProgress = Math.min(100, Math.max(0, scrollProgress + delta));
              setScrollProgress(newProgress);

              // Calculate the scroll position based on progress
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
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Add keyboard event listener to document
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('keydown', handleKeyDown);
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