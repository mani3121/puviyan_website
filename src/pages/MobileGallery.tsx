import React from 'react';
import { motion } from 'framer-motion';

const MobileGallery = () => {
  const description = `On World Environment Day 2025, Team Puviyan proudly joined the global movement led by the United Nations Environment Programme (UNEP), emphasizing the powerful theme: "Beat Plastic Pollution."

As part of this initiative, we embraced a personal commitment: "I am Puviyan. I pledge to beat Plastic Pollution." Guided by the pledge, our team took to the streets of Chennai to engage residents, spark conversations, and spotlight the urgent need to reduce single-use plastic waste.

We distributed reusable cloth bags, encouraging simple, everyday actions that help protect the environment. Each cloth bag, when used 150 times, can save about 0.5 kg of CO2e emissions and keep 150 plastic bags out of landfills and waterways. It's a small switch that creates a big impact for our planet and future generations.`;

  return (
    <section className="w-full bg-black relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Main content centered */}
      <div className="container mx-auto px-8 md:px-20 pt-4 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-stretch w-full">
          {/* Top: Title */}
          <div className="w-full mb-4 mt-12 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-white text-center leading-tight">
              Walking the Talk on World Environment Day 2025
            </h1>
          </div>
          
          {/* Middle: Image */}
          <div className="w-full mb-6 flex justify-center items-center overflow-hidden">
            <img
              src="/images/EventCollage.webp"
              alt="Event Collage - World Environment Day 2025"
              className="mx-auto w-full max-w-[550px] object-contain max-h-[400px] rounded-2xl"
              loading="lazy"
            />
          </div>
          
          {/* Bottom: Description */}
          <div className="w-full flex justify-center items-center">
            <motion.p
              className="text-lg md:text-xl text-white text-left"
              style={{ whiteSpace: 'pre-line', opacity: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileGallery;
