import { useRef, useEffect, useState } from "react";
import Header from "./Header";

const Gallery = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-[1450px] flex flex-row bg-black rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section - 40% */}
        <div
          ref={leftRef}
          className="w-2/5 flex flex-col justify-center items-start p-10 bg-black"
        >
          <Header />
          <h1 className="text-4xl font-bold justify-center text-white mb-6 mt-4 ">
            Walking the Talk on World Environment Day 2025
          </h1>
          <p className="text-lg text-white text-justify">
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
        {/* Right Section - 60% */}
        <div className="w-3/5 flex items-center justify-center bg-black">
          <img
            src="/images/EventCollage.webp"
            alt="Event Collage"
            className="max-w-full object-contain rounded-2xl"
            style={{
              height: leftHeight ? `${Math.round(leftHeight * 0.95)}px` : "auto",
              maxHeight: "80vh",
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;