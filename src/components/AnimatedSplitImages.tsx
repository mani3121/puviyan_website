import emailjs from '@emailjs/browser';
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";

const AnimatedSplitImages = () => {
  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(h1Ref, { once: true }); // Trigger animation once when in view
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      setContainerHeight(`${vh}px`);
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent default scroll
      setTouchEnd(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 50) {
        // Swipe up
        if (scrollProgress < 100) {
          setScrollProgress(prev => Math.min(100, prev + 20));
        }
      } else if (touchStart - touchEnd < -50) {
        // Swipe down
        if (scrollProgress > 0) {
          setScrollProgress(prev => Math.max(0, prev - 20));
        }
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchStart, touchEnd, scrollProgress]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      emailjs.init("d1YGFS1dDCmPJB0N4");

      await emailjs.send(
        "service_m73cz7e",
        "template_mxugw58",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "maniavudai10@gmail.com",
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  
 
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 50000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row w-full overflow-hidden"
      style={{
        height: containerHeight,
        minHeight: "100vh",
        touchAction: "none" // Prevent default touch actions
      }}
    >
      <Header />

      {/* Left - Static Image */}
      <div className="w-full h-[50vh] md:h-3/4 md:w-1/2 flex justify-start items-start overflow-hidden mt-1">
        <div className="relative">
          <img
            src="https://puviyan-website.vercel.app/images/mobile_hd1.png"
            alt="Vertical Parallax"
            className="rounded-none md:rounded-2xl shadow-2xl"
            style={{
              objectFit: "contain",
              transform: "scale(0.7)",
              transformOrigin: "top center"
            }}
          />
        </div>
      </div>

      {/* Right - Content with Form */}
      <div className="w-full h-[50vh] md:h-full md:w-1/2 flex justify-center items-center bg-white-50 px-4 md:px-8 py-8 md:py-0 overflow-y-auto">
        <motion.div
          style={{
            fontFamily: "Arial Black",
          }}
          className="p-4 md:p-8 w-full max-w-md mx-auto text-left -mt-10"
        >
          <motion.h1
            ref={h1Ref}
            className="text-2xl md:text-4xl font-extrabold text-black mb-2 md:mb-6 tracking-tight text-left mt-4 md:mt-6 pl-16 w-[120%]"
            style={{
              fontFamily: "Arial Black",
              fontWeight: "950",
              letterSpacing: "-0.02em",
              borderBottom: "none"
            }}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1 } },
            }}
          >
            {`COMING SOON TO\tREWRITE YOUR ECO STORY`.split(" ").map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </motion.h1>

          <div className="flex flex-col">
            {!showForm ? (
              submitStatus === "idle" ? (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <button
                    onClick={() => setShowForm(true)}
                    disabled={submitStatus !== "idle"}
                    className="w-auto md:w-auto px-2 md:px-3 py-1.5 rounded-lg text-[10px] font-semibold hover:opacity-90 transition-opacity text-left disabled:opacity-50 disabled:cursor-not-allowed ml-16"
                    style={{
                      background: "linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)",
                      color: "white",
                      maxWidth: "150px"
                    }}
                  >
                    {submitStatus === "idle" ? "SHARE YOUR IDEAS" : "WITH YOUR IDEAS"}
                  </button>
                </motion.div>
              ) : (
                <p style={{
                  background: "linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)",
                  color: "white",
                  padding: "0.75rem 2rem",
                  borderRadius: "0.5rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  textAlign: "left",
                }}> WITH YOUR IDEAS</p>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-10 w-[60%] ml-8"
              >
                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3 text-left">
                  <div className="flex flex-row space-x-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-1/2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-[10px]"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-1/2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-[10px]"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Idea"
                      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-[10px]"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="flex flex-row space-x-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-1/2 bg-gray-900 text-white px-2 py-1 rounded-lg text-[10px] font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      style={{
                        background: 'linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)',
                        color: 'white',
                      }}
                    >
                      {isLoading ? 'Sending...' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setSubmitStatus('idle');
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="w-1/2 bg-gray-200 text-gray-900 px-2 py-1 rounded-lg text-[10px] font-semibold hover:bg-gray-300 transition-colors text-left"
                      style={{
                        background: 'linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)',
                        color: 'white',
                      }}
                    >
                      Back
                    </button>
                  </div>
                  {submitStatus === 'error' && (
                    <p className="text-red-600 mt-1 text-[10px] text-left">Failed to send message. Please try again.</p>
                  )}
                </form>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedSplitImages;
