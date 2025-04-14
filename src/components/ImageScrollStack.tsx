'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ImageScrollStack.module.css';

interface ImageScrollStackProps {
  images: string[];
}

const ImageScrollStack: React.FC<ImageScrollStackProps> = ({ images }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpeedMultiplier = 5; // Reduced multiplier for even slower scrolling

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollTop = window.scrollY;
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll position relative to container
        const relativeScroll = Math.max(0, scrollTop - containerTop);
        const maxScroll = containerHeight - windowHeight;
        // Apply the scroll speed multiplier to slow down the effect
        const scrollPercent = Math.min(1, (relativeScroll / maxScroll) * scrollSpeedMultiplier);
        
        setScrollPosition(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Base image container with fixed frame */}
      <div className={styles.baseImageContainer}>
        <img
          src={images[0]}
          alt="Base image"
          className={styles.image}
        />
        
        {/* Overlay images */}
        {images.slice(1).map((image, index) => {
          const isActive = scrollPosition > (index / (images.length - 1));
          const progress = isActive ? 
            (scrollPosition - (index / (images.length - 1))) * (images.length - 1) : 
            0;

          return (
            <div
              key={index + 1}
              className={styles.overlayContainer}
              style={{
                clipPath: `inset(${100 - (progress * 100)}% 0 0 0)`,
              }}
            >
              <img
                src={image}
                alt={`Overlay ${index + 1}`}
                className={styles.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageScrollStack; 