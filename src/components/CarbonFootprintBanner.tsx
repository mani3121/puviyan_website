import { useEffect, useState } from 'react';

const CarbonFootprintBanner = () => {
  const [pageWeight, setPageWeight] = useState(0); // Page weight in KB
  const [co2Estimate, setCo2Estimate] = useState(0); // CO₂ emissions in grams

  useEffect(() => {
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
      style={{
        fontFamily: "'Arial', sans-serif", // Font style similar to the image
        backgroundColor: '#ffffff', // White background
        color: '#000000', // Black text color
        border: '1px solid #dcdcdc', // Light gray border
        borderRadius: '6px', // Smaller rounded corners
        padding: '8px', // Reduced padding
        width: '200px', // Reduced width
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
      }}
    >
      <div
        style={{
          fontSize: '14px', // Smaller font size
          fontWeight: 'bold',
          marginBottom: '6px', // Reduced margin
        }}
      >
        {co2Estimate ? `${co2Estimate}g of CO₂/view` : 'Loading...'}
      </div>
      <div
        style={{
          fontSize: '12px', // Smaller font size
          color: '#555555', // Gray text for cleaner percentage
        }}
      >
        Cleaner than {Math.floor((1 - (co2Estimate / 100)) * 100)}% of pages tested
      </div>
      <div
        style={{
          fontSize: '12px', // Smaller font size
          color: '#555555', // Gray text for page weight
          marginTop: '6px', // Reduced margin
        }}
      >
        Page Weight: {pageWeight} KB
      </div>
    </div>
  );
};

export default CarbonFootprintBanner;