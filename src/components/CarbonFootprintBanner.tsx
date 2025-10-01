import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import CarbonFootprintBannerMobile from './CarbonFootprintBannerMobile';
import { simplifiedCO2PerView, compareToBaseline } from '@/utils/carbon';

// Constant page weight in MB (147KB = 0.147MB)
function getPageWeightMB(): number {
  return 0.147;
}

const CarbonFootprintBanner = () => {
  const [pageWeightKB, setPageWeightKB] = useState(0);
  const [co2Estimate, setCo2Estimate] = useState(0);
  const [comparison, setComparison] = useState('');
  const bannerRef = useRef<HTMLDivElement>(null);

  const calculateCarbonFootprint = () => {
    // Use constant page weight
    const effectiveMB = getPageWeightMB();
    const calculatedPageWeightKB = Number((effectiveMB * 1024).toFixed(2));

    // Calculate CO2 emissions
    const { gramsCO2 } = simplifiedCO2PerView(effectiveMB, {
      energyPerGB_kWh: 0.405,
      carbonIntensity_gPerKWh: 475,
    } as any);

    const baseline_g = 0.70;
    const { label } = compareToBaseline(gramsCO2, baseline_g);

    // Update state
    setPageWeightKB(calculatedPageWeightKB);
    setCo2Estimate(gramsCO2);
    setComparison(label);
  };

  useEffect(() => {
    // GSAP animation
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    // Calculate carbon footprint on component mount
    calculateCarbonFootprint();
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
          border: '3px solid transparent',
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
          <img src="/images/Co-2.avif" alt="CO2 Footprint Icon" className="w-8 h-8" style={{ transform: 'rotate(-19deg)' }} />
        </div>
        <div className="co2-text flex flex-col justify-center">
          <div className="main font-bold text-xs text-white leading-tight">
            {co2Estimate.toFixed(2)} g of CO2e per page view
          </div>
          <div className="sub text-xs text-gray-300 mt-0.5">
            {comparison || '—'}
          </div>
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="text-[10px] text-gray-400 mt-0.5">
              {pageWeightKB} KB
            </div>
          )} */}
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