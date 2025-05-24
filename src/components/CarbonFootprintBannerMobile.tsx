import React from 'react';

interface CarbonFootprintBannerMobileProps {
  co2Estimate: number;
}

const CarbonFootprintBannerMobile: React.FC<CarbonFootprintBannerMobileProps> = ({ co2Estimate }) => {
  return (
    <div 
      className="co2-badge flex items-center gap-1 pl-4 py-1 bg-white relative w-fit text-center fixed top-4 left-4 pr-8"
      style={{
        border: '4px solid transparent',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        borderRadius: '50px',
      }}
    >
      <div className="co2-icon flex flex-col items-center">
        {/* <img src="https://puviyan-website.vercel.app/images/foot.png" alt="CO2 Footprint Icon" className="w-9 h-auto" /> */}
      </div>
      <div className="co2-text flex flex-col">
        <div className="main font-bold text-xs text-gray-800">{co2Estimate}g of CO₂/view</div>
        <div className="sub text-[10px] text-gray-600">64% lower than global average</div>
      </div>
    </div>
  );
};

export default CarbonFootprintBannerMobile; 