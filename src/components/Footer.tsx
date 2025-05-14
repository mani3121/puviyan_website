import React from 'react';

interface FooterProps {
  className?: string; // Add className as an optional prop
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`bg-black text-white py-4 ${className || ''}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="flex-1">
          <p className="text-sm">&copy; 2025 Puviyan Digital Solutions Private Limited. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4 mr-4">
            <a 
              href="/privacy-policy" 
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms-conditions" 
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
          <a 
            href="https://www.linkedin.com/company/puviyan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            {/* <Linkedin size={20} /> */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;