import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { handleProductSubmit } from "../utils/handleProductSubmit"; // Make sure the path is correct

const MobileUniteWithUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    handleProductSubmit({
      e,
      formData,
      setIsLoading,
      setSubmitStatus,
      setFormData,
      setShowForm: () => {}, // No showForm in this component, so pass a noop
    });
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
        className="w-full min-h-screen flex flex-col bg-cover relative"
        style={{
          backgroundImage:
            'url("https://puviyan-website.vercel.app/images/Unite_with_puviyan4.jpg")',
          backgroundPosition: "left center",
        }}
      >
        {/* Header: h1 and p tags */}
        <div className="w-full px-4 pt-12 pb-2 flex flex-col items-center">
          <h1
            className="text-2xl font-black text-black mb-2 text-center w-full"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Unite with Puviyan
          </h1>
          <p
            className="text-sm text-black mb-2 text-center leading-snug"
            style={{ fontFamily: "Arial" }}
          >
            We are dedicated to building a sustainable future by uniting with governments,
            organizations committed to sustainability and CSR, businesses offering eco-friendly
            solutions, investors, passionate talent, and the communities we serve.
          </p>
        </div>
        {/* Form container */}
        <div className="w-full px-4 py-1 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-90 rounded-xl shadow-lg p-1 flex flex-col gap-1 w-full max-w-[270px] mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder="Name*"
              className="w-full px-2 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm mb-1"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              className="w-full px-2 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm mb-1"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message*"
              className="w-full px-2 py-1 mt-1 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-sm mb-1"
              rows={3}
              style={{ resize: 'none', height: '60px' }}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="mx-auto py-1 px-3 rounded-full text-white font-semibold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "gray",
                transition: "background 0.3s ease",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            {submitStatus === "success" && showSuccess && (
              <div className="text-green-600 text-center text-xs mt-1">
                Thank you for joining with us!
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-600 text-center text-xs mt-1">
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