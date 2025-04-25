import React from 'react';
import { Linkedin } from 'lucide-react'; // Import Linkedin icon

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; 2025 Puviyan. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.linkedin.com/company/puviyan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;