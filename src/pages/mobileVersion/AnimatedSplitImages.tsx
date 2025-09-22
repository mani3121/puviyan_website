import { useAnimation, useInView } from "framer-motion";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { handleProductSubmit } from "../../utils/handleProductSubmit";

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
        if (trimmedValue.length < 1) return 'error';
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
      className="flex flex-col w-full overflow-hidden bg-black min-h-screen"
      style={{
        height: containerHeight,
        minHeight: "100vh"
      }}
    >
      <Header />

      {/* Main Content */}
      <div className="w-full h-screen flex flex-col items-center justify-start overflow-hidden relative bg-black">
        {/* Text and Button Section */}
        <div className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-8 z-10">
          <h1
            ref={h1Ref}
            className="text-4xl font-black text-white leading-tight mb-8 max-w-sm"
            style={{
              fontFamily: "Arial Black, Arial-BoldMT, Arial, Helvetica, sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            COMING SOON TO<br />REWRITE YOUR<br />ECOSTORY
          </h1>

          {/* Button */}
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 min-[1600px]:py-3 rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 min-w-[240px] sm:min-w-[280px] text-center"
            style={{
              background: "linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)",
              color: "white",
            }}
          >
            SHARE YOUR IDEAS
          </button>
        </div>

        {/* Mobile Image */}
        <div className="relative flex justify-center items-center flex-1 w-full max-w-sm mx-auto">
          <img
            src="/images/MobileImage.jpeg"
            alt="Mobile App Preview"
            className="rounded-2xl shadow-2xl object-cover"
            loading="lazy"
            style={{
              width: "80%",
              height: "75vh",
              objectPosition: "top center",
            }}
          />
        </div>
      </div>


      {/* Popup Modal */}
      <Modal
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-black p-6 rounded-2xl shadow-2xl z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        shouldCloseOnOverlayClick={true}
        preventScroll={true}
      >
        <form 
          onSubmit={handleSubmit} 
          className="space-y-0 rounded-2xl relative pb-2"
          style={{
            background: "#000",
            boxShadow: "1 1px 1px 0 rgba(200,200,200,0.32)",
          }}
        >
          {/* Close Icon */}
          <button
            type="button"
            aria-label="Close"
            className="absolute -top-10 right-0 text-gray-400 hover:text-white text-2xl focus:outline-none"
            onClick={() => {
              setShowForm(false);
              setSubmitStatus('idle');
              setFormData({ name: '', email: '', message: '' });
              setErrors({ name: '', email: '', message: '' });
            }}
          >
            &times;
          </button>
          
          <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your Name"
                autoComplete="new-password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 bg-black text-white transition-all duration-200 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white hover:border-gray-300'
                }`}
              style={{
                WebkitBoxShadow: "0 0 0 1000px #000000 inset",
                WebkitTextFillColor: "white",
                backgroundColor: "#000000 !important"
              }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your Email"
                autoComplete="off"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 bg-black text-white transition-all duration-200 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white hover:border-gray-300'
              }`}
              style={{
                WebkitBoxShadow: "0 0 0 1000px #000000 inset",
                WebkitTextFillColor: "white",
                backgroundColor: "#000000 !important"
              }}
              />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Your Idea"
                  autoComplete="off"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 bg-black text-white transition-all duration-200 resize-none ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-white hover:border-gray-300'
              }`}
              rows={4}
              style={{
                WebkitBoxShadow: "0 0 0 1000px #000000 inset",
                WebkitTextFillColor: "white",
                backgroundColor: "#000000 !important"
              }}
                />
              </div>
          
          <div className="flex flex-col justify-center items-center pt-4">
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
              <div className="text-green-400 text-center text-lg py-3 px-6 min-w-[170px] flex items-center justify-center font-bold">
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


