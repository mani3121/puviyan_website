import React, { useEffect, useState } from 'react';
import { getTransferredBytes, simplifiedCO2PerView, compareToBaseline } from '@/utils/carbon';

interface CarbonFootprintBannerMobileProps {
  co2Estimate: number;
}

const CarbonFootprintBannerMobile: React.FC<CarbonFootprintBannerMobileProps> = ({ co2Estimate: propCo2Estimate }) => {
  const [pageWeightKB, setPageWeightKB] = useState(0);
  const [co2Estimate, setCo2Estimate] = useState(propCo2Estimate);
  const [comparison, setComparison] = useState('64% lower than global average');

  useEffect(() => {
    // Only runs in browser; guard just in case of SSR
    if (typeof window === 'undefined') return;

    const calc = () => {
      const bytes = getTransferredBytes();
      const totalKB = bytes / 1024;
      const totalMB = bytes / (1024 * 1024);
      setPageWeightKB(Number(totalKB.toFixed(2)));

      // Use the same constants as web version
      const { gramsCO2 } = simplifiedCO2PerView(totalMB, {
        energyPerGB_kWh: 0.405,
        carbonIntensity_gPerKWh: 475,
      } as any);

      setCo2Estimate(gramsCO2);

      // Compute the "X% lower" label versus baseline
      const baseline_g = 0.70; // same baseline as web version
      const { label } = compareToBaseline(gramsCO2, baseline_g);
      setComparison(label || '64% lower than global average');
    };

    calc();
  }, []);

  return (
    <div 
      className="co2-badge flex items-center gap-1 pl-2 py-1 bg-black relative w-fit text-center fixed top-[-4px] right-[6%] pr-3"
      style={{
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(black, black), linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        borderRadius: '25px 8px 8px 25px',
      }}
    >
      <div className="co2-icon flex flex-col items-center">
        <img src="/images/Co-2.avif" alt="CO2 Icon" className="w-6 h-6"  style={{ transform: 'rotate(-19deg)' }} />
      </div>
      <div className="co2-text flex flex-col">
        <div className="main font-bold text-[10px] text-white-800">{co2Estimate.toFixed(2)}g of CO2e/view</div>
        <div className="sub text-[8px] text-white-600">{comparison}</div>
      </div>
    </div>
  );
};

export default CarbonFootprintBannerMobile;