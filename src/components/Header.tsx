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
      <div className="container mx-auto px-2 md:px-3 py-1.5 md:py-0">
        <div className="flex items-center justify-between h-10 md:h-auto">
          {/* Logo with Text */}
          <div 
            ref={logoRef}
            className="cursor-pointer flex items-center gap-1 ml-4 md:ml-16"
            onClick={() => (window.location.href = "/")}
          >
            <img 
              src="https://puviyan-website.vercel.app/images/puviyan_logo.png" 
              alt="Puviyan Logo" 
              className="h-6 md:h-4 w-auto"
            />
            <span 
              ref={textRef}
              className="hidden md:block text-sm font-bold opacity-0 -translate-x-5 text-white flex items-center"
              style={{ fontFamily: "Arial Rounded MT Bold" }}
            >
              Puviyan
            </span>
          </div>

          {/* Center Text */}
          <div className="md:hidden">
            <span 
              className="text-white text-lg font-bold ml-4 cursor-pointer" 
              style={{ fontFamily: "Arial Rounded MT Bold" }}
              onClick={() => (window.location.href = "/")}
            >
              Puviyan
            </span>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X size={24} className="text-white hover:text-green-400 transition-colors duration-300" />
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
                  className="absolute top-12 left-0 w-full bg-black shadow-md flex flex-col items-center px-4 py-2 z-50"
                >
                  {renderLinks(currentPath, scrollToSection, true)}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-6">
              {renderLinks(currentPath, scrollToSection, isScrolled)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const renderLinks = (currentPath, scrollToSection, isScrolled) => (
  <>
    <a
      href="/animated-split-images"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("animated-split-images");
      }}
      className={`block w-full text-center px-3 py-2 text-sm font-normal transition-colors border-b border-white/20 ${
        currentPath === "/animated-split-images"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Black" }}
    >
      Product
    </a>
    <a
      href="/services"
      onClick={(e) => {
        e.preventDefault();
        document.body.style.overflowY = "scroll";
        scrollToSection("services");
      }}
      className={`block w-full text-center px-3 py-2 text-sm font-normal transition-colors border-b border-white/20 ${
        currentPath === "/services"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Black" }}
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
      className={`block w-full text-center px-3 py-2 text-sm font-normal transition-colors border-b border-white/20 ${
        currentPath === "/about-us"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Black" }}
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
      className={`block w-full text-center px-3 py-2 text-sm font-normal transition-colors ${
        currentPath === "/unite-with-us"
          ? "text-green-800 underline"
          : isScrolled ? "text-white hover:text-green-400" : " hover:text-green-800"
      }`}
      style={{ fontFamily: "Arial Black" }}
    >
      Unite with Us
    </a>
  </>
);

export default Header;