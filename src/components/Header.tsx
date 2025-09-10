import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind's md breakpoint
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (isMobile) {
        setIsMenuOpen(false);
      }
    }
  };

  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleTouch = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouch);
  }, [isMenuOpen]);

  useEffect(() => {
    const logo = logoRef.current;
    const text = textRef.current;

    const handleMouseEnter = () => {
      gsap.to(logo, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(text, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(text, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    if (logo) {
      logo.addEventListener('mouseenter', handleMouseEnter);
      logo.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (logo) {
        logo.removeEventListener('mouseenter', handleMouseEnter);
        logo.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] shadow-sm bg-black text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-1.5 md:py-0">
        <div className="flex items-center justify-between h-10 md:h-auto">
          {/* Logo with Text */}
          <div 
            ref={logoRef}
            className="cursor-pointer flex items-center gap-2"
            onClick={() => (window.location.href = "/")}
          >
            <img 
              src="/images/puviyan_logo.png" 
              alt="Puviyan Logo" 
              className="h-5 md:h-4 w-auto"
              loading="lazy"
            />
            <span 
              ref={textRef}
              className="hidden md:block text-xs font-bold opacity-0 -translate-x-5 text-green-400 flex items-center"
              style={{ fontFamily: "Arial Rounded MT Bold, Arial, sans-serif" }}
            >
              Puviyan
            </span>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden -mr-2">
            <button 
              onClick={() => setIsMenuOpen((prev) => !prev)} 
              className="p-2 rounded-md hover:bg-black transition-all duration-300"
            >
              {isMenuOpen ? (
                <X size={24} className="text-white hover:text-white transition-colors duration-300" />
              ) : (
                <Menu size={24} className="text-white hover:text-green-400 transition-colors duration-300" />
              )}
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
                  className="absolute top-12 left-0 w-full bg-black shadow-md flex flex-col items-center px-0 py-2 z-50"
                >
                  {renderLinks(currentPath, scrollToSection, true, isMobile)}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-6 md:mr-4">
              {renderLinks(currentPath, scrollToSection, isScrolled, isMobile)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const renderLinks = (currentPath, scrollToSection, isScrolled, isMobile) => (
  <>
    <a
      href="/animated-split-images"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("animated-split-images");
      }}
      className={`block px-3 py-2 text-sm transition-colors ${
        isMobile 
          ? "w-full text-center font-normal border-b border-white/20" 
          : "font-semibold"
      } ${
        currentPath === "/animated-split-images"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: isMobile ? "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" : "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      Product
    </a>
    { <a
      href="/services"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("services");
      }}
      className={`block px-3 py-2 text-sm transition-colors ${
        isMobile 
          ? "w-full text-center font-normal border-b border-white/20" 
          : "font-semibold"
      } ${
        currentPath === "/services"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: isMobile ? "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" : "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      Services
    </a> }
    {/* <a
      href="/gallery"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("gallery");
      }}
      className={`block px-3 py-2 text-sm transition-colors ${
        isMobile 
          ? "w-full text-center font-normal border-b border-white/20" 
          : "font-semibold"
      } ${
        currentPath === "/gallery"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: isMobile ? "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" : "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      People and Planet
    </a> */}
    <a
      href="/about-us"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("about-us");
      }}
      className={`block px-3 py-2 text-sm transition-colors ${
        isMobile 
          ? "w-full text-center font-normal border-b border-white/20" 
          : "font-semibold"
      } ${
        currentPath === "/about-us"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: isMobile ? "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" : "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      About Puviyan
    </a>
    <a
      href="/unite-with-us"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("unite-with-us");
      }}
      className={`block px-3 py-2 text-sm transition-colors ${
        isMobile 
          ? "w-full text-center font-normal" 
          : "font-semibold"
      } ${
        currentPath === "/unite-with-us"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: isMobile ? "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" : "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      Unite with Us
    </a>
  </>
);

export default Header;