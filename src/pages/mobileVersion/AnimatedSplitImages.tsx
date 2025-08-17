import { useAnimation, useInView } from "framer-motion";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { handleProductSubmit } from "../../utils/handleProductSubmit";
import "../AnimatedSplitImages.css";

import Header from "../../components/Header";

Modal.setAppElement('#root');

const AnimatedSplitImages = () => {
  const containerRef = useRef(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const controls = useAnimation();
  const isInView = useInView(h1Ref, { once: true });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [containerHeight, setContainerHeight] = useState('100vh');

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

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (h1Ref.current) {
      gsap.fromTo(
        h1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      }, 50000); // Reset after 50 seconds
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row w-full overflow-hidden"
      style={{
        height: containerHeight,
        minHeight: "100vh"
      }}
    >
      <Header />

      {/* Left - Static Image */}
      <div className="w-full h-screen md:h-3/4 md:w-1/2 flex flex-col items-center overflow-hidden relative">
        {/* "COMING SOON" text above the image */}
        <h1
          ref={h1Ref}
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-extrabold text-gray-600 w-[90vw] text-center z-10"
          style={{
            fontFamily: "Arial Black, Arial-BoldMT, Arial, Helvetica, sans-serif",
            fontWeight: "bolder",
            letterSpacing: "-0.0em",
            lineHeight: 1.1,
            padding: "0.5rem 1.5rem",
            borderRadius: "1rem",
            top: "4.5rem",
          }}
        >
          <h1
            className="text-3xl font-extrabold text-white mb-2 text-center w-full"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            COMING SOON TO REWRITE OUR CARBON STORY
          </h1>

          {/* Button next to the h1 */}
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-yellow-400 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{
              fontFamily: "Arial",
              lineHeight: 1.2,
              background: "linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)",
              zIndex: 10,
            }}
          >
            {submitStatus === 'idle' ? "SHARE YOUR IDEAS" : "WITH YOUR IDEAS"}
          </button>
        </h1>
        <div className="relative w-full h-full flex justify-center items-start overflow-hidden">
          <img
            src="/images/MobileImage1.jpg"
            alt="Vertical Parallax"
            className="rounded-none md:rounded-2xl shadow-2xl"
            loading="lazy"
            style={{
              objectFit: "cover",
              width: "80%",
              height: "70vh",
              objectPosition: "top center",
              display: "block",
              marginTop: "16rem", // Move the image further down
            }}
          />
        </div>
      </div>


      {/* Popup Modal */}
      <Modal
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
        className="modal"
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={true} // Allow closing on overlay click
        preventScroll={true} // Prevent background scrolling
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            name="message"
            placeholder="Your Idea"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows={4}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 text-white font-semibold rounded-lg w-full"
            style={{
              background: "linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)"
            }}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AnimatedSplitImages;


