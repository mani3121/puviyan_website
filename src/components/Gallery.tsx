import { useRef, useEffect, useState } from "react";
import Header from "./Header";

const Gallery = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateHeight = () => {
      if (leftRef.current && rightRef.current) {
        // Calculate the natural height based on screen size
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        
        // Responsive height calculation
        let targetHeight = 520; // Reduced base height for ~13" screens
        if (screenWidth >= 1536) targetHeight = 900; // 2xl screens
        else if (screenWidth >= 1280) targetHeight = 800; // xl screens
        else if (screenWidth >= 1024) targetHeight = 700; // lg screens
        
        setContainerHeight(targetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-[1800px] flex flex-row bg-black rounded-2xl shadow-lg overflow-hidden min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px]">
        {/* Left Section - 50% */}
        <div
          ref={leftRef}
          className="w-1/2 flex flex-col justify-center items-start p-3 md:p-8 lg:p-10 xl:p-12 2xl:p-16 bg-black"
          style={{
            height: containerHeight ? `${containerHeight}px` : "auto",
          }}
        >
          <Header />
          <h1 className="text-lg md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold justify-center text-white mb-2 md:mb-6 mt-2 md:mt-4 leading-tight">
            Walking the Talk on World Environment Day 2025
          </h1>
          <p className="text-[10px] md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white text-justify leading-tight md:leading-relaxed">
            On World Environment Day 2025, Team Puviyan proudly joined the global
            movement led by the United Nations Environment Programme (UNEP),
            emphasizing the powerful theme: “Beat Plastic Pollution.”
            <br />
            <br />
            As part of this initiative, we embraced a personal commitment: “I am
            Puviyan. I pledge to beat Plastic Pollution.” Guided by the pledge,
            our team took to the streets of Chennai to engage residents, spark
            conversations, and spotlight the urgent need to reduce single-use
            plastic waste.
            <br />
            <br />
            We distributed reusable cloth bags, encouraging simple, everyday
            actions that help protect the environment. Each cloth bag, when used
            150 times, can save about 0.5 kg of CO2e emissions and keep 150
            plastic bags out of landfills and waterways. It’s a small switch that
            creates a big impact for our planet and future generations.
          </p>
        </div>
        {/* Right Section - 50% */}
        <div 
          ref={rightRef}
          className="w-1/2 flex items-center justify-center bg-black p-6"
          style={{
            height: containerHeight ? `${containerHeight}px` : "auto",
          }}
        >
          <img
            src="/images/EventCollage.webp"
            alt="Event Collage"
            className="w-full h-full object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;