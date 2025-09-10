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
        className="w-full min-h-screen flex flex-col relative"
        style={{
          backgroundImage:
            'url("/images/UniteWithUs2.png")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
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
            className="rounded-2xl p-4 flex flex-col gap-4 w-full max-w-[320px] mx-auto shadow-md"
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
              className="w-full placeholder-white px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-white"
              style={{ backgroundColor: "#070707ff" }}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              autoComplete="off"
              className="w-full px-4 py-2.5 placeholder-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-white"
              style={{ backgroundColor: "#070707ff" }}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message*"
              autoComplete="off"
              className="w-full px-4 py-2.5 placeholder-white rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-sm text-white"
              style={{ backgroundColor: "#070707ff", resize: 'none' }}
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
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