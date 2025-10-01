import { compareToBaseline, simplifiedCO2PerView } from '@/utils/carbon';
import React, { useEffect, useState } from 'react';

interface CarbonFootprintBannerMobileProps {
  co2Estimate: number;
}

// Constant page weight in MB (147KB = 0.147MB)
function getPageWeightMB(): number {
  return 0.147;
}

const CarbonFootprintBannerMobile: React.FC<CarbonFootprintBannerMobileProps> = ({ co2Estimate: propCo2Estimate }) => {
  const [co2Estimate, setCo2Estimate] = useState(propCo2Estimate);
  const [comparison, setComparison] = useState('');

  const calculateCarbonFootprint = () => {
    // Use constant page weight
    const effectiveMB = getPageWeightMB();

    // Calculate CO2 emissions
    const { gramsCO2 } = simplifiedCO2PerView(effectiveMB, {
      energyPerGB_kWh: 0.405,
      carbonIntensity_gPerKWh: 475,
    } as any);

    // Use mobile-specific baseline (0.60 instead of 0.70)
    const baseline_g = 0.60;
    const { label } = compareToBaseline(gramsCO2, baseline_g);

    // Update state
    setCo2Estimate(gramsCO2);
    setComparison(label);
  };

  useEffect(() => {
    // Calculate carbon footprint on component mount
    calculateCarbonFootprint();
  }, []);

  return (
    <div 
      className="co2-badge flex items-center gap-2 pl-2 py-1 bg-black relative text-center fixed top-[-4px] pr-2"
      style={{
        width: '155px',
        height: '45px',
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(black, black), linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        borderRadius: '50px 5px 5px 50px',
        left: '10px',
      }}
    >
      <div className="co2-icon flex flex-col items-center">
        <img src="/images/Co-2.avif" alt="CO2 Icon" style={{ width: '20px', height: '24px', transform: 'rotate(-14.596deg)' }} />
      </div>
      <div className="co2-text flex flex-col">
        <div className="main font-bold text-[7.85px] text-white-800">{co2Estimate.toFixed(2)}g of CO2e per page view</div>
        <div className="sub text-[7.75px] text-white-600" >{comparison}</div>
      </div>
    </div>
  );
};

export default CarbonFootprintBannerMobile;