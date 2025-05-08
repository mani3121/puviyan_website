import { useEffect, useState } from 'react';
import ParallaxImageMobile from './ParallaxImageMobile';
import ParallaxImages from './ParallaxImages';

interface ParallaxImageWrapperProps {
  image1: string;
  image2: string;
  mobileImage1: string;
  mobileImage2: string;
}

const ParallaxImageWrapper = ({ image1, image2, mobileImage1, mobileImage2 }: ParallaxImageWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile ? (
    <ParallaxImageMobile 
      image1={mobileImage1}
      image2={mobileImage2}
    />
  ) : (
    <ParallaxImages 
      image1={image1}
      image2={image2}
    />
  );
};

export default ParallaxImageWrapper; 