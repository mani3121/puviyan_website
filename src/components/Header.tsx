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
    // Close mobile menu first
    if (isMobile) {
      setIsMenuOpen(false);
    }
    
    // Small delay to ensure menu animation completes and DOM is ready
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        // Ensure body overflow is set correctly
        document.body.style.overflowY = "scroll";
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If section not found, try again after a short delay
        setTimeout(() => {
          const retrySection = document.getElementById(id);
          if (retrySection) {
            document.body.style.overflowY = "scroll";
            retrySection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }, isMobile ? 300 : 0); // Wait for mobile menu animation to complete
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
    const handleTouch = (e: TouchEvent) => {
      if (isMenuOpen) {
        // Don't close if touching the menu button or menu itself
        const target = e.target as Element;
        if (target && (
          target.closest('button') || 
          target.closest('.mobile-menu') ||
          target.closest('[data-menu-button]')
        )) {
          return;
        }
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
    <header className="fixed top-0 left-0 w-full z-[100] shadow-sm text-white transition-colors duration-300"
    style={{ backgroundColor: "#1F1F1F" }}>
      <div className="w-full">
        <div className="flex items-center h-14 md:h-auto">
          {/* Logo with Text */}
          <div 
            ref={logoRef}
            className="cursor-pointer flex items-center gap-2 ml-4 md:ml-[6%]"
            onClick={() => {
              // Create a loading overlay to prevent FOUC during reload
              const overlay = document.createElement('div');
              overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: #1F1F1F;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.2s ease-in-out;
              `;
              
              // Add loading spinner or logo
              overlay.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                  <img src="/images/puviyan_logo.avif" alt="Loading..." style="width: 40px; height: auto; opacity: 0.8;" />
                  <div style="color: white; font-size: 14px; opacity: 0.7;">Loading...</div>
                </div>
              `;
              
              document.body.appendChild(overlay);
              
              // Small delay to ensure overlay is visible, then reload
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
          >
            <img 
              src="/images/puviyan_logo.avif" 
              alt="Puviyan Logo" 
              className="h-7 md:h-4 w-auto"
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
          <div className="md:hidden ml-auto mr-2">
            <button 
              data-menu-button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }} 
              className="p-2 rounded-md transition-all duration-300"
              style={{ backgroundColor: isMenuOpen ? '#1F1F1F' : 'transparent' }}
            >
              {isMenuOpen ? (
                <X size={28} className="text-white hover:text-gray-400 transition-colors duration-300" />
              ) : (
                <Menu size={28} className="text-white hover:text-gray-400 transition-colors duration-300" />
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
                  className="absolute top-12 left-0 w-full shadow-md flex flex-col items-center px-0 py-2 z-50"
                  style={{ backgroundColor: "#1F1F1F" }}
                >
                  {renderLinks(currentPath, scrollToSection, true, isMobile)}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <nav className="hidden md:flex md:items-center md:space-x-6 ml-auto mr-[6%]">
              {renderMainLinks(currentPath, scrollToSection, isScrolled, isMobile)}
              {renderUniteWithUsLink(currentPath, scrollToSection, isScrolled, isMobile)}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

// For mobile, render all links together
const renderLinks = (currentPath, scrollToSection, isScrolled, isMobile) => (
  <>
    <button
      onClick={() => {
        scrollToSection("animated-split-images");
      }}
      className={`block px-3 py-2 text-xs transition-colors ${
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
      Technology
    </button>
    {/* <a
      href="/services"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("services");
      }}
      className={`block px-3 py-2 text-xs transition-colors ${
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
    </a> */}
    <button
      onClick={() => {
        scrollToSection("gallery");
      }}
      className={`block px-3 py-2 text-xs transition-colors ${
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
    </button>
    <button
      onClick={() => {
        scrollToSection("about-us");
      }}
      className={`block px-3 py-2 text-xs transition-colors ${
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
    </button>
    <button
      onClick={() => {
        scrollToSection("unite-with-us");
      }}
      className={`block px-3 py-2 text-xs transition-colors ${
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
    </button>
  </>
);

// For desktop, split the main links from the Unite With Us link
const renderMainLinks = (currentPath, scrollToSection, isScrolled, isMobile) => (
  <div className="flex items-center">
    <button
      onClick={() => {
        scrollToSection("animated-split-images");
      }}
      className={`block px-6 py-2 text-xs transition-colors font-semibold ${
        currentPath === "/animated-split-images"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      Technology
    </button>
    <button
      onClick={() => {
        scrollToSection("gallery");
      }}
      className={`block px-6 py-2 text-xs transition-colors font-semibold ${
        currentPath === "/gallery"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      People and Planet
    </button>
    <button
      onClick={() => {
        scrollToSection("about-us");
      }}
      className={`block px-6 py-2 text-xs transition-colors font-semibold ${
        currentPath === "/about-us"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Rounded MT Bold, Arial, sans-serif" }}
    >
      About Puviyan
    </button>
  </div>
);

// Separate function for the Unite With Us link to position it at the edge
const renderUniteWithUsLink = (currentPath, scrollToSection, isScrolled, isMobile) => (
  <button
    onClick={() => {
      document.body.style.overflowY = "scroll";
      scrollToSection("unite-with-us");
    }}
    className={`block py-2 text-xs transition-colors font-semibold ${
      currentPath === "/unite-with-us"
        ? "text-green-800 underline"
        : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
    }`}
    style={{ fontFamily: "Arial Rounded MT Bold, Arial, sans-serif" }}
  >
    Unite with Us
  </button>
);

export default Header;