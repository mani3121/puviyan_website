import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import CarbonFootprintBannerMobile from './CarbonFootprintBannerMobile';

const CarbonFootprintBanner = () => {
  const [pageWeight, setPageWeight] = useState(0); // Page weight in KB
  const [co2Estimate, setCo2Estimate] = useState(0); // CO₂ emissions in grams
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // stable wheel handler so we can add/remove reliably
  const wheelHandler = useCallback((e: WheelEvent) => {
    // prevent the page from scrolling while pointer is over the banner
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    // GSAP animation for fade-in and slide-in
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    // Calculate the page weight and CO₂ emissions
    const calculatePageWeightAndCO2 = () => {
      const documentSize = new XMLSerializer().serializeToString(document).length;
      const imagesSize = Array.from(document.querySelectorAll('img')).reduce(
        (total) => total + 100000, // Rough estimate: 100KB per image
        0
      );

      const totalSizeKB = (documentSize + imagesSize) / 1024; // Convert to KB
      setPageWeight(parseFloat(totalSizeKB.toFixed(2)));

      // Correct CO₂ calculation: ~0.5g CO₂ per MB transferred
      const totalSizeMB = totalSizeKB / 1024; // Convert KB to MB
      const estimatedCO2 = parseFloat((totalSizeMB * 0.5).toFixed(2)); // CO₂ in grams
      setCo2Estimate(estimatedCO2);
    };

    calculatePageWeightAndCO2();
  }, []);

  // add/remove wheel listener on hover to block page scrolling when pointer is over banner
  const handleMouseEnter = () => {
    if (bannerRef.current) {
      bannerRef.current.addEventListener('wheel', wheelHandler, { passive: false });
    }
  };
  const handleMouseLeave = () => {
    if (bannerRef.current) {
      bannerRef.current.removeEventListener('wheel', wheelHandler as EventListener);
    }
  };

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-12 right-16 z-50"
      style={{
        fontFamily: 'Arial, sans-serif',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Desktop and Tablet View */}
      <div
        className="hidden md:flex items-center relative"
        style={{
          minWidth: 300, // reduced from 370
          minHeight: 70, // reduced from 90
        }}
      >
                 {/* Gradient border background */}
         <div
           className="absolute rounded-[24px] pointer-events-none" // reduced radius
           style={{
             background: 'linear-gradient(90deg, #F9BB18 0%, #74CFE6 60%, #5ABA52 100%)',
             zIndex: 0,
             filter: 'blur(0.5px)',
             top: '-4px',
             left: '-4px',
             right: '-4px',
             bottom: '-4px',
           }}
         />
        {/* Main badge */}
        <div
          className="relative flex items-center pl-4 pr-6 py-2 bg-black rounded-[24px] min-h-[70px] min-w-[300px] shadow-lg"
          style={{
            zIndex: 1,
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
          }}
        >
                     {/* Left icons */}
           <div className="flex flex-col items-center justify-center mr-4">
             <img
               src="/images/Co2.png"
               alt="CO2 Footprint Icon"
               className="w-10 h-10 mb-1"
               loading="lazy"
               style={{ filter: 'brightness(0) invert(1)' }} // Ensures icon is pure white
             />
           </div>
           {/* Center text */}
           <div className="flex flex-col justify-center ml-2">
            <span className="text-white font text-base leading-tight">
              {co2Estimate}g of CO<sub>2</sub>/view
            </span>
            <span className="text-white text-xs mt-1">
              64% lower than global average
            </span>
          </div>
          {/* Top right label */}
                                           <span
              className="absolute top-0 right-0 rounded-tl-[24px] rounded-tr-[30px] px-3 py-1 text-black font-semibold text-sm"
                         style={{
               background: 'linear-gradient(90deg, #74CFE6 30%, #5ABA52 100%)',
               transform: 'translateY(-95%)',
               minWidth: 110,
               textAlign: 'right',
             }}
          >
            Puviyan Certified
          </span>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:flex md:hidden">
        <CarbonFootprintBannerMobile co2Estimate={co2Estimate} />
      </div>
    </div>
  );
};

export default CarbonFootprintBanner;