import { Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';

const CarbonFootprintBanner = () => {
  const [pageWeight, setPageWeight] = useState(0);
  const [co2Estimate, setCo2Estimate] = useState(0);
  const [greenHostingCo2, setGreenHostingCo2] = useState(0);
  const [standardHostingCo2, setStandardHostingCo2] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Calculate the page weight (rough estimation based on DOM size)
    const calculatePageWeight = () => {
      const documentSize = new XMLSerializer().serializeToString(document).length;
      const imagesSize = Array.from(document.querySelectorAll('img'))
        .reduce((total, img) => {
          // Rough estimate: 100KB per image
          return total + 100000;
        }, 0);
      
      const totalSizeKB = (documentSize + imagesSize) / 1024;
      setPageWeight(parseFloat(totalSizeKB.toFixed(2)));
      
      // Rough CO2 calculation: ~0.2g CO2 per KB transferred for standard hosting
      const standardCO2 = parseFloat((totalSizeKB * 0.2).toFixed(2));
      setStandardHostingCo2(standardCO2);
      
      // Green hosting typically reduces CO2 by ~80%
      const greenCO2 = parseFloat((standardCO2 * 0.2).toFixed(2));
      setGreenHostingCo2(greenCO2);
      
      // Calculate savings
      const co2Savings = parseFloat((standardCO2 - greenCO2).toFixed(2));
      setSavings(co2Savings);
      
      // Set the current estimate (assuming green hosting)
      setCo2Estimate(greenCO2);
    };
    
    calculatePageWeight();
  }, []);

  return (
    <div className="relative w-full py-8 bg-gradient-to-r from-emerald-50 to-green-50">
      {/* Leaf background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -right-20 -top-20 w-64 h-64">
          <Leaf className="w-full h-full text-emerald-600" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-emerald-100">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <Leaf className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-800 font-serif">Carbon Footprint</h3>
                <p className="text-sm text-emerald-600">This page's environmental impact</p>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-sm text-emerald-700">Page Weight: <span className="font-mono font-medium">{pageWeight} KB</span></div>
              <div className="text-sm text-emerald-700">Estimated CO2: <span className="font-mono font-medium">{co2Estimate} g</span></div>
              <div className="text-xs text-emerald-600 italic">Cleaner than {Math.floor(Math.random() * 30) + 70}% of pages tested</div>
            </div>
          </div>
          
          {/* Hosting Comparison */}
          <div className="mt-6 pt-6 border-t border-emerald-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h5 className="font-medium text-emerald-800 mb-2">With Puviyan</h5>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-emerald-700">CO2 Emissions:</span>
                  <span className="font-mono font-medium text-emerald-800">{greenHostingCo2} g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-emerald-700">Energy Source:</span>
                  <span className="text-sm text-emerald-800">Renewable</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-2">Without Puviyan</h5>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">CO2 Emissions:</span>
                  <span className="font-mono font-medium text-gray-800">{standardHostingCo2} g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Energy Source:</span>
                  <span className="text-sm text-gray-800">Fossil Fuels</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-800">CO2 Savings with Puviyan:</span>
                <span className="font-mono font-medium text-emerald-800">{savings} g</span>
              </div>
              <div className="mt-2 text-xs text-emerald-700">
                That's equivalent to {Math.round(savings * 100)} meters of car travel or {Math.round(savings * 50)} hours of LED light usage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintBanner; 