import emailjs from '@emailjs/browser';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

const Product = () => {
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
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative -translate-x-3/4 w-[28vw]">
          <img
            ref={imageRef}
            src="https://puviyan-website.vercel.app/images/mobile_hd1.png"
            alt="Product Image"
            className="rounded-2xl shadow-2xl w-full h-[40vh] md:h-[100vh]"
            style={{
              transform: "scale(1.3)",
              backgroundColor: "transparent"
            }}
          />
          <motion.h1
            ref={h1Ref}
            className="absolute left-[36vw] top-[15%] -translate-y-1/2 text-2xl md:text-6xl font-bold text-gray-900"
            style={{
              fontFamily: "Arial Black",
              fontWeight: "1000",
              letterSpacing: "-0.02em",
            }}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0, transition: { duration: 2 } },
            }}
          >
            {`COMING SOON TO\tREWRITE YOUR ECO STORY`.split(" ").map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </motion.h1>
          <div className="absolute left-[36vw] top-[80%] -translate-y-1/2 w-[200px] md:w-[300px]">
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
                    className="px-4 py-2 rounded-lg text-sm md:text-lg font-semibold hover:opacity-90 transition-opacity min-w-[200px] md:min-w-[300px]"
                    style={{
                      background: "linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)",
                      color: "white",
                    }}
                  >
                    {submitStatus === "idle" ? "SHARE YOUR IDEAS" : "WITH YOUR IDEAS"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p style={{
                    background: "linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)",
                    color: "white",
                    padding: "0.75rem 2rem",
                    borderRadius: "0.5rem",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                  }}> WITH YOUR IDEAS</p>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-row space-x-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-1/2 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="w-1/2 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Idea"
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      style={{
                        background: 'linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)',
                        color: 'white',
                      }}
                    >
                      Back
                    </button>
                  </div>
                  {submitStatus === 'error' && (
                    <p className="text-red-600 mt-2">Failed to send message. Please try again.</p>
                  )}
                </form>
              </motion.div>
            )}
          </div>
          <div
            ref={textRef}
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
