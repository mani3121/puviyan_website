import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AnimatedSplitImages from '../mobileVersion/AnimatedSplitImages';
import { handleProductSubmit } from '../../utils/handleProductSubmit';

const Product = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind's md breakpoint
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(h1Ref, { once: true });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [lastTouchY, setLastTouchY] = useState(0);

  useEffect(() => {
    const image = imageRef.current;
    const text = textRef.current;

    if (image && text) {
      gsap.set(image, { y: "100%", opacity: 0 });
      gsap.set(text, { x: "-100%", opacity: 0 });

      const tl = gsap.timeline();
      
      tl.to(image, {
        y: "20%",
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

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        const deltaY = touch.clientY - lastTouchY;
        
        if (Math.abs(deltaY) > 5) {
          gsap.to(image, {
            y: `+=${deltaY * 0.5}`,
            duration: 0.1,
            ease: "power2.out"
          });
        }
        setLastTouchY(touch.clientY);
      };

      const handleTouchStart = (e: TouchEvent) => {
        setLastTouchY(e.touches[0].clientY);
      };

      const handleTouchEnd = () => {
        gsap.to(image, {
          y: "20%",
          duration: 0.5,
          ease: "power2.out"
        });
      };

      image.addEventListener('touchstart', handleTouchStart);
      image.addEventListener('touchmove', handleTouchMove, { passive: false });
      image.addEventListener('touchend', handleTouchEnd);

      return () => {
        image.removeEventListener('touchstart', handleTouchStart);
        image.removeEventListener('touchmove', handleTouchMove);
        image.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [lastTouchY]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    handleProductSubmit({
      e,
      formData,
      setIsLoading,
      setSubmitStatus,
      setFormData,
      setShowForm,
    });
  };

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 50000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  
  // Return AnimatedSplitImages for mobile view
  if (isMobile) {
    return <AnimatedSplitImages />;
  }

  // Return original Product component for desktop view
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative -translate-x-[95%] w-[28vw]">
          <img
            ref={imageRef}
            src="/images/MobileImage_Final.jpeg"
            alt="Product Image"
            className="rounded-2xl w-full h-[100vh]"
            loading="lazy"
            style={{
              transform: "scale(1.1)",
              backgroundColor: "transparent",
            }}
          />
          <motion.h1
            ref={h1Ref}
            className="absolute left-[36vw] top-[24%] -translate-y-1/2 text-4xl sm:text-5xl md:text-6xl font-bold text-white w-[300px] sm:w-[400px] md:w-[500px]"
            style={{
              fontFamily: "Arial Black",
              fontWeight: "1000",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0, transition: { duration: 2 } },
            }}
          >
            {`COMING 
SOON
TO
REWRITE YOUR
ECOSTORY`.split("\n").map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </motion.h1>
          
          {/* CTA Section with proper spacing */}
          <div className={`absolute left-[36vw] ${showForm ? 'top-[calc(24%+28rem)] sm:top-[calc(24%+30rem)]' : 'top-[calc(24%+24rem)] sm:top-[calc(24%+26rem)]'} w-full max-w-[320px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[640px] px-3 sm:px-4 md:px-0`}>
            {!showForm ? (
              submitStatus === "idle" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    onClick={() => setShowForm(true)}
                    disabled={submitStatus !== "idle"}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 min-w-[240px] sm:min-w-[280px] text-center"
                    style={{
                      background: "linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)",
                      color: "white",
                    }}
                  >
                    SHARE YOUR IDEAS
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    disabled={true}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 min-w-[240px] sm:min-w-[280px] text-center"
                    style={{
                      background: "linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)",
                      color: "white",
                    }}
                  >
                    WITH YOUR IDEAS
                  </button>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-black rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="absolute top-2 right-2 text-white hover:text-gray-300"
                  >
                    ✕
                  </button>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share your ideas..."
                    rows={4}
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 resize-none"
                    required
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 rounded-lg font-semibold text-white"
                      style={{
                        background: isLoading 
                          ? "#6B7280" 
                          : "linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)",
                      }}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                  {submitStatus === 'success' && (
                    <p className="text-green-400 text-sm text-center">Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center">Failed to send message. Please try again.</p>
                  )}
                </form>
              </motion.div>
            )}
          </div>
          
          <div
            ref={textRef}
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Product;
