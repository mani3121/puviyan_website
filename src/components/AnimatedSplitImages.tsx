import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedSplitImages = () => {
  const containerRef = useRef(null);

  // Hook into scroll inside this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Left Image: vertical movement
  const verticalY = useTransform(scrollYProgress, [0, 1], ["80px", "-400px"]);

  // Right Image: horizontal movement
  const horizontalX = useTransform(scrollYProgress, [0, 1], ["-400px", "80px"]);

  return (
    <div
      ref={containerRef}
      className="flex h-screen w-full overflow-hidden"
    >
      {/* Left - Vertical Parallax */}
      <div className="w-1/2 flex items-center justify-center bg-white">
          <motion.img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80p"
            alt="Vertical Parallax"
            style={{ y: verticalY }}
            className="rounded-2xl shadow-2xl"
          />
        </div>

      {/* Right - Horizontal Parallax */}
      <div className="w-1/2 flex justify-center items-center">
        <motion.img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80"
          alt="Horizontal"
          style={{ x: horizontalX }}
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default AnimatedSplitImages;
