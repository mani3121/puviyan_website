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
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days for consistent values
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
          // *FIXED*: Only check URL match, ignore sessionId for consistent values
          if (parsed.url === currentUrl) {
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
      } catch (error) {
        console.warn('Storage failed:', error);
      }
    };

    // *IMPROVED*: Better detection of fresh vs cached loads
    const analyzeResourcesConsistently = () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      const navigationEntries = performance.getEntriesByType('navigation');
      const navigation = navigationEntries.length > 0 
        ? navigationEntries[0] as PerformanceNavigationTiming 
        : null;
      
      let totalTransferSize = 0;
      let totalResourcesWithTransfer = 0;
      let estimatedActualSize = 0;

      // Process resources - count actual transfers vs cached
      for (const resource of resources) {
        if (resource.transferSize > 0) {
          totalTransferSize += resource.transferSize;
          totalResourcesWithTransfer++;
          estimatedActualSize += resource.transferSize;
        } else {
          // Cached resource - use encoded body size for total page size estimation
          const bodySize = resource.encodedBodySize || resource.decodedBodySize || 0;
          if (bodySize > 0) {
            estimatedActualSize += bodySize;
          }
        }
      }

      // Process navigation entry
      let navigationTransferred = false;
      if (navigation) {
        if (navigation.transferSize && navigation.transferSize > 0) {
          totalTransferSize += navigation.transferSize;
          navigationTransferred = true;
          estimatedActualSize += navigation.transferSize;
        } else {
          const navSize = navigation.encodedBodySize || navigation.decodedBodySize || 0;
          if (navSize > 0) {
            estimatedActualSize += navSize;
          }
        }
      }

      // *KEY*: Determine if this is a fresh load
      const isFreshLoad = navigationTransferred && totalResourcesWithTransfer > 0;
      const transferRatio = resources.length > 0 ? totalResourcesWithTransfer / resources.length : 0;

      return {
        totalTransferSize,
        estimatedActualSize,
        isFreshLoad,
        transferRatio,
        resourceCount: resources.length,
        totalResourcesWithTransfer
      };
    };

    const analysis = analyzeResourcesConsistently();
    const storedData = getStoredData();
    const currentTime = Date.now();

    // *SIMPLIFIED LOGIC*: Always prefer stored data if available and valid
    let effectiveMB: number;
    let shouldStore = false;
    let dataSource = '';

    const hasValidStoredData = storedData && (currentTime - storedData.timestamp) < CACHE_DURATION;
    const totalTransferMB = analysis.totalTransferSize / (1024 * 1024);
    const estimatedMB = analysis.estimatedActualSize / (1024 * 1024);

    if (hasValidStoredData) {
      // *PRIORITY 1*: Always use stored data if available - this ensures consistency
      effectiveMB = storedData.totalMB;
      shouldStore = false;
      dataSource = 'stored (consistent value)';
    } else if (analysis.isFreshLoad && totalTransferMB > 0.01) {
      // *PRIORITY 2*: Fresh load with actual transfers - store this as the baseline
      effectiveMB = totalTransferMB;
      shouldStore = true;
      dataSource = 'fresh load (storing as baseline)';
    } else if (estimatedMB > 0.02) {
      // *PRIORITY 3*: Some data available but not ideal - use but don't store
      effectiveMB = Math.min(estimatedMB, 2.0); // Cap to prevent inflated values
      shouldStore = false;
      dataSource = 'estimated (capped, not stored)';
    } else {
      // *FALLBACK*: Conservative default
      effectiveMB = 0.5; // Conservative 500KB default
      shouldStore = false;
      dataSource = 'fallback default';
    }

    // *SAFETY BOUNDS*: Prevent extreme values
    if (effectiveMB < 0.01) {
      effectiveMB = 0.5;
      dataSource += ' (min applied)';
    }
    if (effectiveMB > 5.0) {
      effectiveMB = 5.0;
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

    // Update state
    setPageWeightKB(calculatedPageWeightKB);
    setCo2Estimate(gramsCO2);
    setComparison(label);

    // *STORE ONLY FRESH, ACCURATE MEASUREMENTS*
    if (shouldStore && analysis.isFreshLoad) {
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
            'Timestamp': new Date(data.timestamp).toLocaleString(),
            'URL': data.url,
            'Age (hours)': ((Date.now() - data.timestamp) / (1000 * 60 * 60)).toFixed(1),
            'Session ID': data.sessionId?.slice(0, 8) + '...'
          });
        } else {
          console.log('No stored carbon footprint data');
        }
      };

      (window as any).testCarbonConsistency = () => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        let transferCount = 0;
        let totalTransfer = 0;
        resources.forEach(r => {
          if (r.transferSize > 0) {
            transferCount++;
            totalTransfer += r.transferSize;
          }
        });
        
        console.table({
          'Navigation Transfer': navigation?.transferSize || 0,
          'Resources with Transfer': transferCount,
          'Total Resources': resources.length,
          'Transfer Ratio': (transferCount / resources.length * 100).toFixed(1) + '%',
          'Total Transfer (KB)': (totalTransfer / 1024).toFixed(1),
          'Load Type': (navigation?.transferSize > 0 && transferCount > 0) ? 'FRESH' : 'CACHED'
        });
      };

      console.log('Dev tools: window.clearCarbonFootprintData(), window.showCarbonFootprintData(), window.testCarbonConsistency()');
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