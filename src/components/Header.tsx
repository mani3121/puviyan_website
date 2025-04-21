import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind's md breakpoint

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentPath = window.location.pathname;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-transparent backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => (window.location.href = "/")} // Redirect to the home page
          >
            <img 
              src="https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan_logo.png?raw=true" 
              alt="Puviyan Logo" 
              className="h-5 w-auto"
            />
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-green-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links */}
          {isMobile ? (
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start px-4 py-2 z-50"
                >
                  {renderLinks(currentPath)}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-10">
              {renderLinks(currentPath)}
            </div>
          )}

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/company/puviyan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderLinks = (currentPath) => (
  <>
    <a
      href="/animated-split-images"
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === '/animated-split-images'
          ? 'text-green-800 underline'
          : 'text-black-600 hover:text-green-800'
      }`}
    >
      Product
    </a>
    <a
      href="/services"
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === '/services'
          ? 'text-green-800 underline'
          : 'text-black-600 hover:text-green-800'
      }`}
    >
      Services
    </a>
    <a
      href="/about-us"
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === '/about-us'
          ? 'text-green-800 underline'
          : 'text-black-600 hover:text-green-800'
      }`}
    >
      About
    </a>
    <a
      href="/unite-with-us"
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === '/unite-with-us'
          ? 'text-green-800 underline'
          : 'text-black-600 hover:text-green-800'
      }`}
    >
      Unite with Us
    </a>
  </>
);

export default Header;