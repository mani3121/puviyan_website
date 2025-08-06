// Carousel.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/images/Puviyanworld1.jpg',
  '/images/Puviyanworld2.jpg',
  '/images/Puviyanworld1.jpg',
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: ['easeInOut'] },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.8, ease: ['easeInOut'] },
  }),
};

export default function Carousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = ((page % images.length) + images.length) % images.length;

  return (
    <div className="relative w-full max-w-xl mx-auto h-64 overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
        //   variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() => paginate(-1)}
          className="bg-white/70 hover:bg-white/90 backdrop-blur p-2 rounded-full shadow-md"
        >
          ◀
        </button>
        <button
          onClick={() => paginate(1)}
          className="bg-white/70 hover:bg-white/90 backdrop-blur p-2 rounded-full shadow-md"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
