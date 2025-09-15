import React, { useEffect, useState } from "react";
import { handleProductSubmit } from "../../utils/handleProductSubmit"; // Make sure the path is correct

const UniteWithUsUpdated = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "validation_error" | "invalid_email">("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showToastInPlace, setShowToastInPlace] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          setErrors({ name: "", email: "", message: "" });
          setTouched({ name: false, email: false, message: false });
        },
        setShowForm: () => {
          // Hide submit button and show toast in its place
          setShowSubmitButton(false);
          setShowToastInPlace(true);
          
          // After 3 seconds, restore submit button
          setTimeout(() => {
            setShowToastInPlace(false);
            setShowSubmitButton(true);
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
    if (submitStatus === "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div
      className="w-full flex flex-col justify-center items-center relative"
      style={{
        height: "100vh",
        backgroundImage: 'url("/images/UniteWithUs2.avif")',
        backgroundSize: "contain",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full flex flex-col items-center -mt-6">
          <h1
            className="text-4xl font-black text-white mb text-center w-full -mt-20"
            style={{  fontFamily: "Arial Rounded MT Bold", display: "block" }}
          >
            Unite with Puviyan
          </h1>
          <br />
          <p
            className="text-lg text-white mb-8 text-center leading-snug text-justify"
            style={{ fontFamily: "Arial" }}
          >
            We are committed to building a sustainable future by uniting with governments, mission-aligned organizations, investors,technology professionals, sustainability advocates, and the communities we serve.
          </p>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="rounded-2xl p-4 flex flex-col gap-4 w-[1000px] max-w-xl items-center -mt-4 shadow-md"
            style={{
              backgroundColor: "#000",
              boxShadow: "0 2px 2px 0 rgba(200,200,200,0.32)", // increased shadow spread and opacity
            }}
          >
            <div className="w-full relative">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                autoComplete="new-name"
                className={`w-full placeholder-white px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-200 text-base ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{  
                  backgroundColor: "#070707ff",
                  WebkitBoxShadow: "0 0 0 1000px #070707ff inset",
                  WebkitTextFillColor: "white"
                }}
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="w-full relative">
              <input
                type="email"
                name="email"
                placeholder="Email address*"
                autoComplete="off"
                className={`w-full px-6 py-3 placeholder-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-200 text-base ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ 
                  backgroundColor: "#070707ff",
                  WebkitBoxShadow: "0 0 0 1000px #070707ff inset",
                  WebkitTextFillColor: "white"
                }}
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="w-full relative">
              <textarea
                name="message"
                placeholder="Your Message*"
                autoComplete="off"
                className={`w-full px-6 py-3 placeholder-white rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-base ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ 
                  backgroundColor: "#070707ff",
                  WebkitBoxShadow: "0 0 0 1000px #070707ff inset",
                  WebkitTextFillColor: "white"
                }}
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
            {showSubmitButton ? (
              <button
                type="submit"
                className="mx-auto py-2 px-12 rounded-full text-white font-semibold text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                style={{
                 background: 'linear-gradient(to right, #F9BB18, #74CFE6, #5ABA52)',
                          color: 'white',
                  transition: "background 0.3s ease",
                }}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            ) : showToastInPlace ? (
              <div className="text-green-600 text-center text-lg py-2 px-12 min-w-[200px] flex items-center justify-center" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                Thank you for your interest in uniting with us!<br />We will reach out to you soon.
              </div>
            ) : null}
            {submitStatus === "success" && showSuccess && !showToastInPlace && (
              <div className="text-green-600 text-center text-lg mt-2" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                Thank you for your interest in uniting with us!<br />We will reach out to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-600 text-center text-sm mt-2" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                Failed to send message. Please try again.
              </div>
            )}
            {submitStatus === "validation_error" && (
              <div className="text-red-600 text-center text-sm mt-2" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                Please fill in all required fields correctly.
              </div>
            )}
            {submitStatus === "invalid_email" && (
              <div className="text-red-600 text-center text-sm mt-2" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                Please enter a valid email address.
              </div>
            )}
          </form>
        </div>
      </div>
      {/* <footer
        className="absolute bottom-0 left-0 w-full h-4 flex items-end justify-between px-6 text-xs text-white bg-black"
        style={{ fontFamily: "Arial" }}
      >
        <span>
          © 2025 Puviyan Digital Solutions Private Limited. All rights reserved.
        </span>
        <div className="flex space-x-4 mt-2">
          <a href="/privacy-policy" className="underline hover:text-white-300">
            Privacy Policy
          </a>
          <a href="/terms-conditions" className="underline hover:text-white-300">
            Terms &amp; Conditions
          </a>
        </div>
      </footer> */}
    </div>
  );
};

export default UniteWithUsUpdated;
