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
      className="bg-black text-white p-1 rounded-md inline-block text-center space-y-0.5 text-[9px] font-medium border border-gray-300 md:p-2 md:text-xs"
      style={{ position: 'fixed', bottom: '8px', right: '8px', zIndex: 50 }}
    >
      <div className="inline-flex items-center space-x-0.5">
        <span className="bg-black text-white px-0.5 py-0.5 rounded-l-full md:px-1.5 md:py-0.5">{co2Estimate}g of CO₂/view</span>
        <a
          href="https://www.websitecarbon.com/website/puviyan-website-vercel-app/"
          target="_blank"
          className="bg-teal-400 text-black px-0.5 py-0.5 rounded-r-full hover:underline md:px-1.5 md:py-0.5"
        >
          Website Carbon
        </a>
      </div>
      <div className="bg-black text-gray md:text-gray-300">Cleaner than {Math.floor((1 - (co2Estimate / 100)) * 100)}% of pages tested</div>
    </div>
  );
};

export default CarbonFootprintBanner;