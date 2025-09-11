// components/CarbonFootprintBanner.tsx
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import CarbonFootprintBannerMobile from './CarbonFootprintBannerMobile';
import { getTransferredBytes, simplifiedCO2PerView, compareToBaseline } from '@/utils/carbon'; // adjust path alias as needed

const CarbonFootprintBanner = () => {
  const [pageWeightKB, setPageWeightKB] = useState(0); // KB
  const [co2Estimate, setCo2Estimate] = useState(0);   // grams/view
  const [comparison, setComparison] = useState('');     // optional label
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    // Only runs in browser; guard just in case of SSR
    if (typeof window === 'undefined') return;

    const calc = () => {
      const bytes = getTransferredBytes();
      const totalKB = bytes / 1024;
      const totalMB = bytes / (1024 * 1024);
      setPageWeightKB(Number(totalKB.toFixed(2)));

      // Use your preferred constants here
      const { gramsCO2 } = simplifiedCO2PerView(totalMB, {
        energyPerGB_kWh: 0.405,  // or 0.81 — your choice
        carbonIntensity_gPerKWh: 475,
      } as any); // narrow typing if you prefer exact keys

      setCo2Estimate(gramsCO2);

      // Optional: compute the “X% lower” label versus a baseline grams/view
      const baseline_g = 0.70; // e.g., your chosen “global average” grams/view
      const { label } = compareToBaseline(gramsCO2, baseline_g);
      setComparison(label);
    };

    calc();
  }, []);

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-12 right-[6%] z-50"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {/* Desktop & Tablet */}
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
          <img src="/images/Co-2.png" alt="CO2 Footprint Icon" className="w-8 h-8" />
        </div>
        <div className="co2-text flex flex-col justify-center">
          <div className="main font-bold text-xs text-white leading-tight">
            {co2Estimate} g of CO2e per page view
          </div>
          <div className="sub text-xs text-gray-300 mt-0.5">
            {comparison || '—'}
          </div>
          {/* <div className="text-[10px] text-gray-400 mt-0.5">
            Page weight: {pageWeightKB} KB
          </div> */}
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:flex md:hidden">
        <CarbonFootprintBannerMobile co2Estimate={co2Estimate} />
      </div>
    </div>
  );
};

export default CarbonFootprintBanner;
 