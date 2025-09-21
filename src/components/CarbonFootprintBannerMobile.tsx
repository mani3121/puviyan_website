import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getTransferredBytes, simplifiedCO2PerView, compareToBaseline } from '@/utils/carbon';

interface CarbonFootprintBannerMobileProps {
  co2Estimate: number;
}

interface StoredCarbonData {
  totalMB: number;
  pageWeightKB: number;
  co2Estimate: number;
  comparison: string;
  timestamp: number;
  url: string;
  sessionId: string;
}

const CarbonFootprintBannerMobile: React.FC<CarbonFootprintBannerMobileProps> = ({ co2Estimate: propCo2Estimate }) => {
  const [pageWeightKB, setPageWeightKB] = useState(0);
  const [co2Estimate, setCo2Estimate] = useState(propCo2Estimate);
  const [comparison, setComparison] = useState('64% lower than global average');

  const calculationDoneRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<string>('');

  const STORAGE_KEY = 'carbon_footprint_data_mobile';
  const CACHE_DURATION = 24 * 60 * 60 * 1000;
  const QUICK_RETRY_DELAY = 200;

  const getSessionId = useCallback(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = Date.now().toString(36) + Math.random().toString(36);
    }
    return sessionIdRef.current;
  }, []);

  const calculateCarbonFootprint = useCallback(() => {
    if (calculationDoneRef.current) return;

    const currentUrl = window.location.pathname;
    const sessionId = getSessionId();

    const getStoredData = (): StoredCarbonData | null => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsed = JSON.parse(storedData) as StoredCarbonData;
          if (parsed.url === currentUrl && parsed.sessionId !== sessionId) {
            return parsed;
          }
        }
      } catch (error) {
        console.warn('Error reading stored data:', error);
      }
      return null;
    };

    const storeData = (data: StoredCarbonData) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log(`Carbon data stored (mobile): ${data.co2Estimate.toFixed(3)}g CO2e`);
      } catch (error) {
        console.warn('Storage failed:', error);
      }
    };

    // Use the same comprehensive resource analysis as desktop version
    const analyzeResourcesConsistently = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      const navigationEntries = performance.getEntriesByType('navigation');
      const navigation = navigationEntries.length > 0 
        ? navigationEntries[0] as PerformanceNavigationTiming 
        : null;
      
      let totalTransferSize = 0;
      let estimatedActualSize = 0;
      let significantTransferDetected = false;

      // Process resources with consistent logic
      for (const resource of resources) {
        if (resource.transferSize > 0) {
          totalTransferSize += resource.transferSize;
          estimatedActualSize += resource.transferSize;
          if (resource.transferSize > 5120) { // 5KB threshold for significant transfer
            significantTransferDetected = true;
          }
        } else {
          // For cached resources, use the actual body size
          const bodySize = resource.encodedBodySize || resource.decodedBodySize || 0;
          if (bodySize > 0) {
            estimatedActualSize += bodySize;
          }
        }
      }

      // Process navigation with proper null checking
      if (navigation) {
        if (navigation.transferSize && navigation.transferSize > 0) {
          totalTransferSize += navigation.transferSize;
          estimatedActualSize += navigation.transferSize;
          significantTransferDetected = true;
        } else {
          const navSize = navigation.encodedBodySize || navigation.decodedBodySize || 0;
          if (navSize > 0) {
            estimatedActualSize += navSize;
          }
        }
      }

      return {
        totalTransferSize,
        estimatedActualSize,
        significantTransferDetected,
        resourceCount: resources.length + (navigation ? 1 : 0)
      };
    };

    const analysis = analyzeResourcesConsistently();
    const storedData = getStoredData();
    const currentTime = Date.now();

    // Use the same decision logic as desktop version
    let effectiveMB: number;
    let shouldStore = false;
    let dataSource = '';

    const hasValidStoredData = storedData && (currentTime - storedData.timestamp) < CACHE_DURATION;
    const totalTransferMB = analysis.totalTransferSize / (1024 * 1024);
    const estimatedMB = analysis.estimatedActualSize / (1024 * 1024);

    // Same restrictive storage conditions as desktop to prevent drift
    if (analysis.significantTransferDetected && estimatedMB > 0.02) {
      // Fresh load with significant transfer - this is the "true" measurement
      effectiveMB = estimatedMB;
      shouldStore = true;
      dataSource = 'fresh measurement';
    } else if (hasValidStoredData && totalTransferMB < 0.01) {
      // Cached load - use stored data consistently
      effectiveMB = storedData.totalMB;
      shouldStore = false;
      dataSource = 'stored (cached load)';
    } else if (estimatedMB > 0.01) {
      // Some transfer detected but not significant - use estimated but don't store
      effectiveMB = estimatedMB;
      shouldStore = false;
      dataSource = 'estimated (not stored)';
    } else {
      // Fallback - use stored data or conservative default
      effectiveMB = hasValidStoredData ? storedData.totalMB : 1.0;
      shouldStore = false;
      dataSource = 'fallback';
    }

    // Sanity bounds - prevent extreme values
    if (effectiveMB < 0.02) {
      effectiveMB = hasValidStoredData ? storedData.totalMB : 1.0;
      dataSource += ' (min applied)';
    }
    if (effectiveMB > 10) {
      effectiveMB = 5.0; // Cap at 5MB
      dataSource += ' (max applied)';
    }

    const calculatedPageWeightKB = Number((effectiveMB * 1024).toFixed(2));

    // Calculate CO2 emissions using same constants as desktop
    const { gramsCO2 } = simplifiedCO2PerView(effectiveMB, {
      energyPerGB_kWh: 0.405,
      carbonIntensity_gPerKWh: 475,
    } as any);

    // Use same baseline as desktop version
    const baseline_g = 0.60;
    const { label } = compareToBaseline(gramsCO2, baseline_g);

    console.log(`Carbon footprint (mobile): ${gramsCO2.toFixed(3)}g CO2e (${effectiveMB.toFixed(3)}MB) - ${dataSource}`);

    // Update state
    setPageWeightKB(calculatedPageWeightKB);
    setCo2Estimate(gramsCO2);
    setComparison(label || '64% lower than global average');

    // Only store if this is truly a fresh, accurate measurement
    if (shouldStore && analysis.significantTransferDetected) {
      const dataToStore: StoredCarbonData = {
        totalMB: effectiveMB,
        pageWeightKB: calculatedPageWeightKB,
        co2Estimate: gramsCO2,
        comparison: label || '64% lower than global average',
        timestamp: currentTime,
        url: currentUrl,
        sessionId: sessionId
      };
      storeData(dataToStore);
    }

    calculationDoneRef.current = true;
  }, [STORAGE_KEY, CACHE_DURATION, getSessionId]);

  useEffect(() => {
    // Only runs in browser; guard just in case of SSR
    if (typeof window === 'undefined') return;

    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset calculation state
    calculationDoneRef.current = false;

    // Immediate calculation
    calculateCarbonFootprint();

    // Quick retry only if needed
    const quickRetry = () => {
      timeoutRef.current = setTimeout(() => {
        if (!calculationDoneRef.current) {
          calculateCarbonFootprint();
        }
      }, QUICK_RETRY_DELAY);
    };

    if (document.readyState !== 'complete') {
      const handleLoad = () => {
        if (!calculationDoneRef.current) {
          calculateCarbonFootprint();
        }
      };
      
      window.addEventListener('load', handleLoad);
      quickRetry();
      
      return () => {
        window.removeEventListener('load', handleLoad);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [calculateCarbonFootprint]);

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
        <div className="main font-bold text-[7.5px] text-white-800">{co2Estimate.toFixed(2)}g of CO2e per page view</div>
        <div className="sub text-[7.5px] text-white-600">{comparison}</div>
      </div>
    </div>
  );
};

export default CarbonFootprintBannerMobile;