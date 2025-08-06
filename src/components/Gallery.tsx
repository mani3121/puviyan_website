import React from "react";
import Carousel from "./Carousel";

const Gallery = () => {
  return (
    <div className="bg-[#fdfdfb] px-8 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-snug text-black mb-6">
            Team Puviyan: Walking the Talk on World Environment Day 2025
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            On World Environment Day 2025, Team Puviyan proudly joined the global movement led by the United Nations Environment Programme, united under this year’s theme: “Beat Plastic Pollution.”

As part of this initiative, we embraced a personal commitment: “I am Puviyan. I pledge to beat Plastic Pollution.” Guided by this pledge, our team took to the streets of Chennai to engage residents, spark conversations, and spotlight the urgent need to reduce single-use plastic waste. We distributed reusable cloth bags, encouraging simple, everyday actions that help protect the environment.
Each cloth bag, when used 150 times, can save about 0.5 kg of CO₂ emissions and keep 150 plastic bags out of landfills and waterways. It’s a small switch that creates a big impact for our planet and future generations.
          </p>
        
        </div>

        {/* Right Section – Image Collage */}
        <div className="relative w-full h-full">
          {/* Image 1
          <img
            src="/images/Puviyanworld1.jpg"
            alt="Placeholder 1"
            className="absolute top-0 left-0 w-[60%] rounded-md shadow-lg"
          />

          <img
            src="/images/Puv_mob1.jpg"
            alt="Placeholder 2"
            className="absolute top-0 right-0 w-[55%] translate-x-1/3 -translate-y-1/4 rounded-md shadow-lg"
          />

          <img
            src="/images/Puviyanworld2.jpg"
            alt="Placeholder 3"
            className="absolute bottom-0 right-0 w-[75%] translate-x-1/4 translate-y-1/3 rounded-md shadow-lg"
          /> */}
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
