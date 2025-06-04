import React from 'react';

interface FooterProps {
  className?: string; // Add className as an optional prop
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
        className="w-full flex items-center justify-between bg-black text-white text-[6px] px-4 h-6"
        style={{ fontFamily: "Arial" }}
      >
        <span className="text-left">
          © 2025 Puviyan Digital Solutions Private Limited. All rights reserved.
        </span>
        <div className="flex space-x-2 ml-4">
          <a
            href="/privacy-policy"
            className="underline hover:text-gray-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-conditions"
            className="underline hover:text-gray-300"
          >
            Terms & Conditions
          </a>
        </div>
      </footer>
  );
};

export default Footer;