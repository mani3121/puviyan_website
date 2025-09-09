import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import CarbonFootprintBannerMobile from './CarbonFootprintBannerMobile';

const CarbonFootprintBanner = () => {
  const [pageWeight, setPageWeight] = useState(0); // Page weight in KB
  const [co2Estimate, setCo2Estimate] = useState(0); // CO₂ emissions in grams
  const bannerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-12 right-16 z-50" // changed right-8 to right-12 to move left
      style={{
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Desktop and Tablet View */}
      <div
        className="co2-badge items-center justify-center gap-1.5 px-2 py-1.5 bg-gray-900 relative hidden md:flex shadow-lg"
        style={{
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(#1f2937,rgb(12, 12, 12)), linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          borderRadius: '30px 12px 12px 30px',
          minWidth: '60px',
          minHeight: '24px',
        }}
      >
        <div className="co2-icon flex flex-col items-center justify-center">
          <img
            src="/images/Co-2.png"
            alt="CO2 Footprint Icon"
            className="w-8 h-8"
            style={{ transform: 'rotate(-18deg)' }}
          />
        </div>
        <div className="co2-text flex flex-col justify-center">
          <div className="main font-bold text-xs text-white leading-tight">
            {co2Estimate} g of CO₂e per page view
          </div>
          <div className="sub text-xs text-gray-300 mt-0.5">
            64% lower than global average
          </div>
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
