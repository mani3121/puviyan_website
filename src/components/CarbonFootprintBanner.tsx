// components/CarbonFootprintBanner.tsx
import { gsap } from 'gsap';
import { useEffect, useRef, useState, useCallback } from 'react';
import CarbonFootprintBannerMobile from './CarbonFootprintBannerMobile';
import { getTransferredBytes, simplifiedCO2PerView, compareToBaseline } from '@/utils/carbon';

interface StoredCarbonData {
  totalMB: number;
  pageWeightKB: number;
  co2Estimate: number;
  comparison: string;
  timestamp: number;
  url: string;
  sessionId: string;
}

const CarbonFootprintBanner = () => {
  const [pageWeightKB, setPageWeightKB] = useState(0);
  const [co2Estimate, setCo2Estimate] = useState(0);
  const [comparison, setComparison] = useState('');
  const bannerRef = useRef<HTMLDivElement>(null);
  
  const calculationDoneRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<string>('');

  const STORAGE_KEY = 'carbon_footprint_data';
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
        console.log(`Carbon data stored: ${data.co2Estimate.toFixed(3)}g CO2e`);
      } catch (error) {
        console.warn('Storage failed:', error);
      }
    };

    // **FIXED**: Proper TypeScript casting for navigation timing
    const analyzeResourcesConsistently = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      // **CORRECT WAY**: Get navigation timing with proper type checking
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

      // **FIXED**: Process navigation with proper null checking
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

    // Improved decision logic to prevent value drift
    let effectiveMB: number;
    let shouldStore = false;
    let dataSource = '';

    const hasValidStoredData = storedData && (currentTime - storedData.timestamp) < CACHE_DURATION;
    const totalTransferMB = analysis.totalTransferSize / (1024 * 1024);
    const estimatedMB = analysis.estimatedActualSize / (1024 * 1024);

    // **KEY FIX**: More restrictive storage conditions to prevent drift
    if (analysis.significantTransferDetected && estimatedMB > 0.02) {
      // Fresh load with significant transfer - this is the "true" measurement
      effectiveMB = estimatedMB;
      shouldStore = true;
      dataSource = 'fresh measurement';
    } else if (hasValidStoredData && totalTransferMB < 0.01) {
      // Cached load - use stored data consistently
      effectiveMB = storedData.totalMB;
      shouldStore = false; // **IMPORTANT**: Don't overwrite good stored data
      dataSource = 'stored (cached load)';
    } else if (estimatedMB > 0.01) {
      // Some transfer detected but not significant - use estimated but don't store
      effectiveMB = estimatedMB;
      shouldStore = false; // **KEY**: Don't store potentially inaccurate measurements
      dataSource = 'estimated (not stored)';
    } else {
      // Fallback - use stored data or conservative default
      effectiveMB = hasValidStoredData ? storedData.totalMB : 1.0; // Reduced fallback
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

    // Calculate CO2 emissions
    const { gramsCO2 } = simplifiedCO2PerView(effectiveMB, {
      energyPerGB_kWh: 0.405,
      carbonIntensity_gPerKWh: 475,
    } as any);

    const baseline_g = 0.70;
    const { label } = compareToBaseline(gramsCO2, baseline_g);

    console.log(`Carbon footprint: ${gramsCO2.toFixed(3)}g CO2e (${effectiveMB.toFixed(3)}MB) - ${dataSource}`);

    // Update state
    setPageWeightKB(calculatedPageWeightKB);
    setCo2Estimate(gramsCO2);
    setComparison(label);

    // **CRITICAL**: Only store if this is truly a fresh, accurate measurement
    if (shouldStore && analysis.significantTransferDetected) {
      const dataToStore: StoredCarbonData = {
        totalMB: effectiveMB,
        pageWeightKB: calculatedPageWeightKB,
        co2Estimate: gramsCO2,
        comparison: label,
        timestamp: currentTime,
        url: currentUrl,
        sessionId: sessionId
      };
      storeData(dataToStore);
    }

    calculationDoneRef.current = true;
  }, [STORAGE_KEY, CACHE_DURATION, getSessionId]);

  useEffect(() => {
    // GSAP animation
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

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

  // Enhanced development tools
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).clearCarbonFootprintData = () => {
        localStorage.removeItem(STORAGE_KEY);
        calculationDoneRef.current = false;
        console.log('Carbon data cleared - will recalculate on next refresh');
      };

      (window as any).showCarbonFootprintData = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          console.table({
            'CO2 Estimate (g)': data.co2Estimate?.toFixed(3),
            'Page Size (MB)': data.totalMB?.toFixed(3),
            'Timestamp': new Date(data.timestamp).toLocaleTimeString(),
            'URL': data.url,
            'Session ID': data.sessionId?.slice(0, 8) + '...'
          });
        } else {
          console.log('No stored carbon footprint data');
        }
      };

      console.log('Dev tools: window.clearCarbonFootprintData(), window.showCarbonFootprintData()');
    }
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
          minWidth: '75px',
          minHeight: '24px',
        }}
      >
        <div className="co2-icon flex flex-col items-center justify-center">
          <img src="/images/Co-2.avif" alt="CO2 Footprint Icon" className="w-8 h-8" style={{ transform: 'rotate(-19deg)' }} />
        </div>
        <div className="co2-text flex flex-col justify-center">
          <div className="main font-bold text-[11px] text-white leading-tight">
            {co2Estimate.toFixed(2)} g of CO2e per page view
          </div>
          <div className="sub text-[11px] text-gray-300 mt-0.5">
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
