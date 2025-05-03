import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Product = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const text = textRef.current;

    if (image && text) {
      // Initial state
      gsap.set(image, { y: "100%", opacity: 0 });
      gsap.set(text, { x: "-100%", opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline();
      
      tl.to(image, {
        y: "35%",
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      })
      .to(text, {
        x: "0%",
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative -translate-x-3/4 w-[30vw]">
          <img
            ref={imageRef}
            src="https://puviyan-website.vercel.app/images/mobile_hd.png"
            alt="Product Image"
            className="rounded-2xl shadow-2xl w-full h-auto"
            style={{
              transform: "scale(1.4)"
            }}
          />
          <div
            ref={textRef}
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
