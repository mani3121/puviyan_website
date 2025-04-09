
import React, { useRef, useEffect, useState } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';
import '../styles/scrollCompare.css';

interface ScrollCompareProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
  isHeroBanner?: boolean;
}

const ScrollCompare: React.FC<ScrollCompareProps> = ({ 
  beforeImage, 
  afterImage, 
  title = "Scroll to compare", 
  description = "Scroll down to see the transformation",
  orientation = 'horizontal',
  isHeroBanner = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get scroll position
  const scrollPosition = useScrollPosition();
  
  useEffect(() => {
    const calculateProgress = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Element is below viewport
      if (rect.top >= windowHeight) {
        setIsVisible(false);
        setProgress(0);
        return;
      }
      
      // Element is above viewport
      if (rect.bottom <= 0) {
        setIsVisible(false);
        setProgress(1);
        return;
      }
      
      setIsVisible(true);
      
      // Calculate how much of the element is in view
      const elementHeight = rect.height;
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      
      // Calculate progress based on scroll position relative to the element
      let scrollProgress = 1 - (rect.bottom - windowHeight/2) / (elementHeight + windowHeight/2);
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      
      setProgress(scrollProgress);
    };
    
    calculateProgress();
  }, [scrollPosition]);
  
  return (
    <div 
      ref={containerRef}
      className={`scroll-compare-container ${orientation === 'vertical' ? 'vertical' : ''} ${isHeroBanner ? 'hero-banner' : ''}`}
      data-visible={isVisible}
    >
      <div className="scroll-compare-text">
        <h2 className="scroll-compare-title">{title}</h2>
        <p className="scroll-compare-description">{description}</p>
        <div className="scroll-progress">
          <div className="progress-indicator" style={{ width: `${progress * 100}%` }}></div>
        </div>
        <p className="scroll-percentage">{Math.round(progress * 100)}% compared</p>
      </div>
      
      <div className="scroll-compare-images">
        <div className="image-container">
          <img 
            src={beforeImage} 
            alt="Before" 
            className="image before-image" 
          />
          <div 
            className={`after-image-container ${orientation === 'vertical' ? 'vertical' : ''}`}
            style={orientation === 'vertical' 
              ? { height: `${progress * 100}%` } 
              : { width: `${progress * 100}%` }
            }
          >
            <img 
              src={afterImage} 
              alt="After" 
              className="image after-image" 
            />
          </div>
        </div>
        <div 
          className={`comparison-slider ${orientation === 'vertical' ? 'vertical' : ''}`} 
          style={orientation === 'vertical' 
            ? { top: `${progress * 100}%` } 
            : { left: `${progress * 100}%` }
          }
        >
          <div className={`slider-line ${orientation === 'vertical' ? 'horizontal-line' : ''}`}></div>
          <div className="slider-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              {orientation === 'vertical' ? (
                <>
                  <path d="M3.5 11.5L10 18L16.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.5 8.5L10 2L3.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              ) : (
                <>
                  <path d="M11.5 3.5L18 10L11.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 16.5L2 10L8.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollCompare;
