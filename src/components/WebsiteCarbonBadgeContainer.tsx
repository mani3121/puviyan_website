import React, { useEffect, useState } from 'react';
import { WebsiteCarbonBadge } from 'react-websitecarbon-badge';
import { getTransferredBytes, simplifiedCO2PerView } from '@/utils/carbon';

/**
 * WebsiteCarbonBadgeContainer
 * - Computes an approximate grams CO2 per view using the existing utils
 * - Feeds it into react-websitecarbon-badge via props
 * - Positions badge similarly to the previous CarbonFootprintBanner (bottom-right)
 */
const WebsiteCarbonBadgeContainer: React.FC = () => {
  const [co2, setCo2] = useState<string>('0'); // grams/view, string per badge API
  const [percentage, setPercentage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calc = () => {
      const bytes = getTransferredBytes();
      const totalMB = bytes / (1024 * 1024);
      const { gramsCO2 } = simplifiedCO2PerView(totalMB, {
        energyPerGB_kWh: 0.405,
        carbonIntensity_gPerKWh: 475,
      } as any);

      // Round to 2 decimals for display
      const g = Number(gramsCO2.toFixed(2));
      setCo2(String(g));

      // Optional: derive a percentage "cleaner than" estimate versus a baseline
      // This is a heuristic for display where 1.76 g/view is sometimes used as an average.
      const baseline = 1.76; // grams/view
      const pct = Math.max(0, Math.min(100, Math.round(((baseline - g) / baseline) * 100)));
      // Only show if positive; otherwise omit to avoid confusing negative values
      setPercentage(pct > 0 ? String(pct) : undefined);
    };

    calc();
  }, []);

  return (
    <div
      className="fixed bottom-12 right-16 z-50 hidden md:block"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <WebsiteCarbonBadge co2={co2} percentage={percentage} />
    </div>
  );
};

export default WebsiteCarbonBadgeContainer;
