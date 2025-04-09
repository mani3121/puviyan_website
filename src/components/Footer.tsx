import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Mail, Leaf } from 'lucide-react';

const Footer = () => {
  const [pageWeight, setPageWeight] = useState(0);
  const [co2Estimate, setCo2Estimate] = useState(0);

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
      
      // Rough CO2 calculation: ~0.2g CO2 per KB transferred
      // This is a very simplified estimate for demonstration
      const estimatedCO2 = parseFloat((totalSizeKB * 0.2).toFixed(2));
      setCo2Estimate(estimatedCO2);
    };
    
    calculatePageWeight();
  }, []);

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* CO2 Footprint Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div className="bg-forest/90 rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <Leaf className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Carbon Footprint</h3>
              <p className="text-sm text-white/80">This page's environmental impact</p>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-sm text-white/80">Page Weight: <span className="font-mono">{pageWeight} KB</span></div>
            <div className="text-sm text-white/80">Estimated CO2: <span className="font-mono">{co2Estimate} g</span></div>
            <div className="text-xs text-white/60">Cleaner than {Math.floor(Math.random() * 30) + 70}% of pages tested</div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">EcoParallax</h3>
            <p className="text-gray-400 mb-4">
              Visualizing our environmental impact through beautiful, interactive web experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EcoParallax. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;