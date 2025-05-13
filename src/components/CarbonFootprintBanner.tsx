import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const CarbonFootprintBanner = () => {
  const [pageWeight, setPageWeight] = useState(0); // Page weight in KB
  const [co2Estimate, setCo2Estimate] = useState(0); // CO₂ emissions in grams
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for fade-in and slide-up
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
      style={{
        fontFamily: "'Arial', sans-serif", // Font style
        backgroundColor: '#333333', // Dark background
        color: '#ffffff', // Light text color
        border: '1px solid #555555', // Dark gray border
        borderRadius: '6px', // Rounded corners
        padding: '8px', // Padding
        width: '200px', // Width
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', // Subtle shadow
      }}
    >
      <div
        style={{
          fontSize: '14px', // Font size
          fontWeight: 'bold',
          marginBottom: '6px', // Margin
        }}
      >
        {co2Estimate ? `${co2Estimate}g of CO₂/view` : 'Loading...'}
      </div>
      <div
        style={{
          fontSize: '12px', // Font size
          color: '#cccccc', // Light gray text for cleaner percentage
        }}
      >
        Cleaner than {Math.floor((1 - (co2Estimate / 100)) * 100)}% of pages tested
      </div>
      <div
        style={{
          fontSize: '12px', // Font size
          color: '#cccccc', // Light gray text for page weight
          marginTop: '6px', // Margin
        }}
      >
        Page Weight: {pageWeight} KB
      </div>
    </div>
  );
};

export default CarbonFootprintBanner;