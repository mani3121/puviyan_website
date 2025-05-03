import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind's md breakpoint

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentPath = window.location.pathname;

  // Determine header background based on the current path
  const headerBackground =
    currentPath === '/' ? 'bg-transparent' : 'bg-gray-800 text-white';

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] shadow-sm ${headerBackground}`}>
      <div className="container mx-auto px-4 py-1"> {/* Reduced padding-y from py-4 to py-2 */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => (window.location.href = "/")} // Redirect to the home page
          >
            <img 
              src="https://puviyan-website.vercel.app/images/puviyan_logo.png" 
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
                  {renderLinks(currentPath, scrollToSection)}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-10">
              {renderLinks(currentPath, scrollToSection)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const renderLinks = (currentPath, scrollToSection) => (
  <>
    <a
      href="/animated-split-images"
      onClick={(e) => {
        e.preventDefault();
        // Enable the browser scrollbar
        document.body.style.overflowY = "scroll";
        scrollToSection("animated-split-images");
      }}
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === "/animated-split-images"
          ? "text-green-800 underline"
          : "text-black-600 hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Rounded MT Bold" }} // Updated font-family
    >
      Products
    </a>
    <a
      href="/services"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("services");
      }}
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === "/services"
          ? "text-green-800 underline"
          : "text-black-600 hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Rounded MT Bold" }} // Updated font-family
    >
      Services
    </a>
    <a
      href="/about-us"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("about-us");
      }}
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === "/about-us"
          ? "text-green-800 underline"
          : "text-black-600 hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Rounded MT Bold" }} // Updated font-family
    >
      About
    </a>
    <a
      href="/unite-with-us"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("unite-with-us");
      }}
      className={`block px-4 py-2 text-lg font-semibold transition-colors ${
        currentPath === "/unite-with-us"
          ? "text-green-800 underline"
          : "text-black-600 hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Rounded MT Bold" }} // Updated font-family
    >
      Unite with Us
    </a>
  </>
);

export default Header;