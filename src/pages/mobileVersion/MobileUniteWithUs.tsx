import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleProductSubmit } from "../../utils/handleProductSubmit"; // Make sure the path is correct

const MobileUniteWithUs = () => {
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
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const location = useLocation();
  // Replace '/last' with your designated route for the last page
  const isLastPage = location.pathname === "/last";

  return (
    <>
      <div
        className="w-full min-h-screen flex flex-col relative"
        style={{
          backgroundImage:
            'url("/images/UniteWithUs_mobile.webp")',
          backgroundSize: "100% auto",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header: h1 and p tags */}
        <div className="w-full px-4 pt-12 pb-2 flex flex-col items-center">
          <h1
            className="text-3xl font-black text-white mb-2 text-center w-full"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Unite with Puviyan
          </h1>
          
          <p
            className="text-sm text-white text-justify leading-tight px-5"
            style={{ fontFamily: "Arial", whiteSpace: 'pre-line' }}
          >
            We are committed to building a sustainable future by uniting with governments, mission-aligned organizations, investors, technology professionals, sustainability advocates, and the communities we serve.
          </p>
        </div>
        {/* Form container */}
        <div className="w-full px-4 py-1 flex justify-center">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="rounded-2xl p-3 flex flex-col gap-3 w-full max-w-[320px] mx-auto shadow-md"
            style={{
              backgroundColor: "#000",
              boxShadow: "0 2px 2px 0 rgba(200,200,200,0.32)",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name*"
              autoComplete="new-name"
              className={`w-full placeholder-white px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: "#070707ff" }}
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              autoComplete="off"
              className={`w-full px-4 py-2 placeholder-white rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-white ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: "#070707ff" }}
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <textarea
              name="message"
              placeholder="Your Message*"
              autoComplete="off"
              className={`w-full px-4 py-2 placeholder-white rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-sm text-white ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: "#070707ff", resize: 'none' }}
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {showSubmitButton ? (
              <button
                type="submit"
                className="mx-auto py-2 px-8 rounded-full text-white font-semibold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
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
              <div className="text-green-400 text-center text-xs py-2 px-8 min-w-[150px] flex items-center justify-center" style={{ fontFamily: "Arial Rounded MT Bold" }}>
                Thank you for your interest in uniting with us! We will reach out to you soon.
              </div>
            ) : null}
            {submitStatus === "success" && showSuccess && (
              <div className="text-green-400 text-center text-xs mt-2">
                Thank you for your interest in uniting with us! We will reach out to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-400 text-center text-xs mt-2">
                Failed to send message. Please try again.
              </div>
            )}
          </form>
        </div>
        {/* WhatsAppIconButton placed at the bottom left above the footer */}
        {/* <div className="absolute bottom-4 left-4">
          <WhatsAppIconButton />
        </div> */}
      </div>
      {/* Render footer only if this is the last page */}
      {/* <footer
        className="w-full flex items-center justify-between bg-black text-white text-[6px] px-4 h-6"
        style={{ fontFamily: "Arial" }}
      >
        <span className="text-left">
          © 2025 Puviyan Digital Solutions Private Limited. All rights reserved.
        </span>
        <div className="flex space-x-2 ml-4">
          <a
            href="/privacy-policy"
            className="underline hover:text-gray-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-conditions"
            className="underline hover:text-gray-300"
          >
            Terms & Conditions
          </a>
        </div>
      </footer> */}
    </>
  );
};

export default MobileUniteWithUs;
