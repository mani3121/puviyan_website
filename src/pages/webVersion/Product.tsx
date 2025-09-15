import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { handleProductSubmit } from '../../utils/handleProductSubmit';
import AnimatedSplitImages from '../mobileVersion/AnimatedSplitImages';

const Product = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind's md breakpoint
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef(null);
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
  const [lastTouchY, setLastTouchY] = useState(0);
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
      // Use the existing email utility
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
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000); // Auto-hide after 5 seconds
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
            src="/images/MobileImage.jpeg"
            alt="Product Image"
            className="rounded-2xl w-full h-[100vh] -mt-8" // Added -mt-8 to move image up
            loading="lazy"
            style={{
              transform: "scale(1.1)",
              backgroundColor: "transparent",
            }}
          />
          <motion.h1
            ref={h1Ref}
            className="absolute left-[36vw] top-[24%] -translate-y-1/2 text-4xl sm:text-5xl md:text-6xl font-bold text-white w-[300px] sm:w-[400px] md:w-[500px] responsive-font-weight"
            style={{
              fontFamily: "Arial Black",
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
          
          {/* Button Section */}
          {!showForm && (
            <div className={`absolute left-[36vw] top-[calc(24%+24rem)] sm:top-[calc(24%+26rem)] w-full max-w-[450px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[400px] px-3 sm:px-4 md:px-0`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full sm:w-auto px-6 py-2 min-[1600px]:py-3 rounded-lg text-base font-semibold hover:opacity-90 transition-all duration-200 min-w-[240px] sm:min-w-[280px] text-center"
                  style={{
                    background: "linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)",
                    color: "white",
                  }}
                >
                  SHARE YOUR IDEAS
                </button>
              </motion.div>
            </div>
          )}
          
          {/* Form Section */}
          {showForm && (
            <div className={`absolute left-[35vw] top-[calc(24%+24rem)] sm:top-[calc(24%+26rem)] w-full max-w-[450px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[400px] px-3 sm:px-4 md:px-0`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="space-y-0 rounded-2xl relative form-container pb-8"
                  style={{
                    background: "#000",
                    boxShadow: "0 0px 0px 0 rgba(200,200,200,0.32)",
                  }}
                >
                  {/* Close Icon */}
                  <button
                    type="button"
                    aria-label="Close"
                    className="absolute -top-8 right-0 text-gray-400 hover:text-white text-2xl focus:outline-none"
                    onClick={() => {
                      setShowForm(false);
                      setSubmitStatus('idle');
                      setFormData({ name: '', email: '', message: '' });
                    }}
                  >
                    &times;
                  </button>
                  
                  <div className="flex flex-row space-x-2 mb-3 justify-center">
                    <div className="relative w-[45%]">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Your Name"
                        autoComplete="new-password"
                        className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm placeholder-gray-300 responsive-input bg-black text-white ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{
                          WebkitBoxShadow: errors.name ? "0 0 0 1000px rgba(127, 29, 29, 0.2) inset" : "0 0 0 1000px #000000 inset",
                          WebkitTextFillColor: "white",
                          backgroundColor: "#000000 !important"
                        }}
                      />
                    </div>
                    <div className="relative w-[45%]">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Your Email"
                        autoComplete="off"
                        className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm placeholder-gray-300 responsive-input bg-black text-white ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{
                          WebkitBoxShadow: errors.email ? "0 0 0 1000px rgba(127, 29, 29, 0.2) inset" : "0 0 0 1000px #000000 inset",
                          WebkitTextFillColor: "white",
                          backgroundColor: "#000000 !important"
                        }}
                      />
                    </div>
                  </div>
                   <div className="h-2" />
                  <div>
                    <div className="flex justify-center">
                      <div className="relative w-[92%]">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Your Idea"
                          autoComplete="off"
                          className={`w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm placeholder-gray-300 responsive-textarea bg-black text-white ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                          }`}
                          rows={5}
                          style={{ 
                            resize: 'none',
                            WebkitBoxShadow: errors.message ? "0 0 0 1000px rgba(127, 29, 29, 0.2) inset" : "0 0 0 1000px #000000 inset",
                            WebkitTextFillColor: "white",
                            backgroundColor: "#000000 !important"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Conditional spacing for 16+ inch screens */}
                  <div className="hidden min-[1600px]:block h-3" />
                  {/* Calculated spacing to center submit button between textarea and form bottom */}
                  <div className="flex flex-col h-12 justify-center items-center">
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
                      <div className="text-green-600 text-center text-lg py-2 px-6 min-w-[170px] flex items-center justify-center -mt-7" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                        Thank you for your idea!
                      </div>
                    ) : null}
                  </div>
                </form>
              </motion.div>
            </div>
          )}
          
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
