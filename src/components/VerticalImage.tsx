import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VerticalImage = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Move second image from y = 100% (fully below) to y = 0% (fully overlaid)
  const imageY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div className="h-[200vh] bg-gray-100">
      <div
        ref={sectionRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <img
          src="https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan000.png?raw=true"
          alt="First"
          className="absolute w-auto h-auto max-w-full max-h-full object-cover z-0"
        />
        <motion.img
          src="https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan118.png?raw=true"
          alt="Second"
          style={{ y: imageY }}
          className="absolute w-auto h-auto max-w-full max-h-full object-cover z-10"
        />
      </div>
    </div>
  );
};

export default VerticalImage;
