import emailjs from '@emailjs/browser';
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const AnimatedSplitImages = () => {
  const containerRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [containerHeight, setContainerHeight] = useState('100vh');

  // Update container height based on viewport
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      setContainerHeight(`${vh}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  // Hook into scroll inside this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Left Image: vertical movement - from top to bottom
  const verticalY = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  
  // Zoom out effect for the image
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 0.5]);

  // Right Content: horizontal movement
  const horizontalX = useTransform(scrollYProgress, [0, 1], ["-400px", "80px"]);
  
  // Heading text: opacity and position animation
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headingX = useTransform(scrollYProgress, [0, 0.2], ["-100px", "0px"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS with your public key
      emailjs.init("d1YGFS1dDCmPJB0N4"); // Replace with your actual public key

      // Send email using EmailJS
      await emailjs.send(
        "service_m73cz7e", // Replace with your EmailJS service ID
        "template_mxugw58", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "maniavudai10@gmail.com",
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row w-full overflow-hidden"
      style={{ 
        height: containerHeight,
        minHeight: '100vh'
      }}
    >
      {/* Left - Vertical Parallax */}
      <div className="w-full h-[60vh] md:h-full md:w-1/2 flex justify-center items-center bg-white-50 overflow-hidden">
        <div className="relative w-full h-full">
          <motion.img
            src="https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/mobile-trans.png?raw=true"
            alt="Vertical Parallax"
            style={{ 
              y: verticalY,
              scale: imageScale
            }}
            className="absolute inset-0 w-full h-full fill rounded-none md:rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Right - Content with Form */}
      <div className="w-full h-[60vh] md:h-full md:w-1/2 flex justify-center items-center bg-white-50 px-4 md:px-8 py-8 md:py-0 overflow-y-auto">
        <motion.div
          style={{ x: horizontalX }}
          className="p-4 md:p-8 w-full max-w-md mx-auto text-left"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight text-left"
            style={{ 
              opacity: headingOpacity,
              x: headingX,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}
          >
            COMING SOON TO REWRITE YOUR ECO STORY
          </motion.h2>
          
          {!showForm ? (
            submitStatus === 'idle' ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full md:w-auto bg-gray-900 text-white px-6 md:px-8 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-800 transition-colors text-left"
              >
                SHARE YOUR IDEAS
              </button>
            ) : (
              <p className="text-xl font-semibold text-gray-900 text-left">YOUR IDEAS</p>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 text-left">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-base text-left"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-base text-left"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-base text-left"
                  rows={4}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
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
                  className="w-full md:w-auto bg-gray-200 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-left"
                >
                  Back
                </button>
              </div>
              {submitStatus === 'success' && (
                <p className="text-green-600 mt-2 text-left">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 mt-2 text-left">Failed to send message. Please try again.</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedSplitImages;
