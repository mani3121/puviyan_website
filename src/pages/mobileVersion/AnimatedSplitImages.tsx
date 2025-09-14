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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'validation_error' | 'invalid_email'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showToastInPlace, setShowToastInPlace] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
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

  const validateField = (name: string, value: string) => {
    const trimmedValue = value.trim();
    
    switch (name) {
      case 'name':
        if (trimmedValue === '') return 'error';
        if (trimmedValue.length < 2) return 'error';
        return '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (trimmedValue === '') return 'error';
        if (!emailRegex.test(trimmedValue)) return 'error';
        return '';
      case 'message':
        if (trimmedValue === '') return 'error';
        if (trimmedValue.length < 10) return 'error';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (hasErrors) {
      return; // Don't submit if there are validation errors
    }
    
    // Start loading state
    setIsLoading(true);
    
    try {
      await handleProductSubmit({
        e,
        formData,
        setIsLoading,
        setSubmitStatus,
        setFormData: (data) => {
          setFormData(data);
          setErrors({ name: '', email: '', message: '' });
          setTouched({ name: false, email: false, message: false });
        },
        setShowForm: () => {
          // Hide submit button and show toast in its place
          setShowSubmitButton(false);
          setShowToastInPlace(true);
          
          // After 3 seconds, close form and restore submit button
          setTimeout(() => {
            setShowToastInPlace(false);
            setShowSubmitButton(true);
            setShowForm(false);
          }, 3000);
        },
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setIsLoading(false);
    }
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
            src="/images/MobileImage_Final.jpeg"
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
        <form 
          onSubmit={handleSubmit} 
          className="space-y-0 rounded-2xl relative p-6 bg-black"
          style={{
            background: "#000",
            boxShadow: "0 0px 0px 0 rgba(200,200,200,0.32)",
          }}
        >
          <div className="flex flex-col space-y-3 mb-3 bg-black">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Your Name"
              autoComplete="new-password"
              className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm placeholder-gray-300 bg-black text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Your Email"
              autoComplete="off"
              className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm placeholder-gray-300 bg-black text-white ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="h-2 bg-black" />
          <div className="bg-black">
            <div className="flex justify-center bg-black">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your Idea"
                autoComplete="off"
                className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm placeholder-gray-300 bg-black text-white ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={5}
                style={{ resize: 'none' }}
              />
            </div>
          </div>
          <div className="flex flex-col h-12 justify-center items-center bg-black">
            {showSubmitButton ? (
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[170px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)',
                  color: 'white',
                }}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            ) : showToastInPlace ? (
              <div className="text-green-600 text-center text-lg py-2 px-6 min-w-[170px] flex items-center justify-center" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                Thank you for your idea!
              </div>
            ) : null}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AnimatedSplitImages;


