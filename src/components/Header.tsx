import { Linkedin } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-transparent backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Why Us */}
          <div className="flex items-center space-x-10">
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
            <a 
              href="#about-us" // Scroll to the About Us section
              className="hidden md:block text-lg font-semibold text-black-600 hover:text-green-800 transition-colors" // Show only on desktop
            >
              About
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
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

export default Header;