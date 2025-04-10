import { Linkedin } from 'lucide-react';

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-gray-900/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="cursor-pointer"
            onClick={scrollToTop}
          >
            <img 
              src="https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/Puviyan.ico?raw=true" 
              alt="Puviyan Logo" 
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a> */}
            <a href="https://www.linkedin.com/company/puviyan/" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 