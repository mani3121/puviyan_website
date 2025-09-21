import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./Header";
import MobileGallery from "../pages/mobileVersion/MobileGallery";

const Gallery = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  // Return mobile version for mobile screens
  if (isMobile) {
    return <MobileGallery />;
  }

  useEffect(() => {
    const updateHeight = () => {
      if (leftRef.current && rightRef.current) {
        // Calculate the natural height based on screen size
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        
        // Responsive height calculation
        // Only enforce fixed heights on desktop and above (>= 1024px)
        if (screenWidth >= 1536) {
          setContainerHeight(900); // 2xl screens
        } else if (screenWidth >= 1280) {
          setContainerHeight(800); // xl screens
        } else if (screenWidth >= 1024) {
          setContainerHeight(700); // lg screens
        } else {
          // For mobile/tablet, let the sections grow naturally
          setContainerHeight(undefined);
        }
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black -mt-12">
      <div className="w-full h-[68%] flex flex-col lg:flex-row bg-black overflow-hidden">
        {/* Left Section - 50% */}
        <div
          ref={leftRef}
          className="w-full lg:w-[45%] h-[68%] flex flex-col justify-start items-start p-8 bg-black"
        >
          <div className="-mt-8">
            <h1 className="font-bold text-white mb-6 leading-tight" style={{ fontSize: '6vh' }}>
              Walking the Talk on World Environment Day 2025
            </h1>
          <p className="text-white text-justify leading-relaxed" style={{ fontSize: '2.2vh' }}>
            On World Environment Day 2025, Team Puviyan proudly joined the global
            movement led by the United Nations Environment Programme (UNEP),
            emphasizing the powerful theme: "Beat Plastic Pollution."
            <br />
            <br />
            <span style={{
              wordSpacing: '0.5em',
              letterSpacing: '0.1em',
              textAlign: 'justify',
              textAlignLast: 'justify',
            }}>
              As part of this initiative, we embraced a personal commitment: 
            </span>

            "I am Puviyan. I pledge to beat Plastic Pollution." Guided by the pledge,
            our team took to the streets of Chennai to engage residents, spark
            conversations, and spotlight the urgent need to reduce single-use
            plastic waste.
            <br />
            <br />
            We distributed reusable cloth bags, encouraging simple, everyday
            actions that help protect the environment. Each cloth bag, when used
            150 times, can save about 0.5 kg of CO2e emissions and keep 150
            plastic bags out of landfills and waterways. It's a small switch that
            creates a big impact for our planet and future generations.
            </p>
          </div>
        </div>
        {/* Right Section - 50% */}
        <div 
          ref={rightRef}
          className="w-full lg:w-[55%] h-full flex items-center justify-center bg-black p-6"
        >
          <img
            src="/images/EventCollage.webp"
            alt="Event Collage"
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;