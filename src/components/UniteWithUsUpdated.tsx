import React, { useState } from "react";

const UniteWithUsUpdated = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center -mt-10 relative"
      style={{
        height: "100vh",
        backgroundImage: 'url("https://puviyan-website.vercel.app/images/Unite_with_puviyan4.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        // border: "none", // <-- Ensure no border is set here
        // boxShadow: "none", // <-- Ensure no box-shadow is set here
      }}
    >
      <div className="flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl w-full flex flex-col items-center -mt-6">
          <h1
            className="text-4xl font-black text-black mb-2 text-center w-full -mt-20"
            style={{ fontFamily: "Arial Rounded MT Bold", display: "block" }}
          >
            Unite with Puviyan
          </h1>
          <br/>
          <p
            className="text-lg text-black mb-8 text-center leading-snug text-justify"
            style={{ fontFamily: "Arial" }}
          >
            We are dedicated to building a sustainable future by uniting with governments,
            organizations committed to sustainability and CSR, businesses offering eco-friendly
            solutions, investors, passionate talent, and the communities we serve.
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-4 flex flex-col gap-4 w-[1000px] max-w-xl items-center -mt-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name*"
              className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message*"
              className="w-full px-6 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none text-base"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="mx-auto py-3 px-8 rounded-full text-white font-semibold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isLoading ? "gray" : "gray",
                transition: "background 0.3s ease",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            {submitStatus === "success" && (
              <div className="text-green-600 text-center text-sm mt-2">
                Thank you for joining with us!
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-600 text-center text-sm mt-2">
                Failed to send message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
      <footer
  className="absolute bottom-0 left-0 w-full h-6 flex items-center justify-between px-8 text-sm text-white bg-black"
  style={{ fontFamily: "Arial Rounded, Arial, sans-serif" }}
>
  <span>
    © 2025 Puviyan Digital Solutions Private Limited. All rights reserved.
  </span>
  <div className="flex space-x-4">
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
</footer>
    </div>
  );
};

export default UniteWithUsUpdated;
