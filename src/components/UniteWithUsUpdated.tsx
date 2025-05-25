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
    <div
      className="min-h-screen w-full flex flex-col justify-between"
      style={{
        backgroundImage: "url('/web-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-end pt-10 pr-16">
        <div className="max-w-2xl w-full">
          <h1 className="text-5xl font-black text-black mb-4 text-right" style={{ fontFamily: "Arial Rounded MT Bold, Arial, sans-serif" }}>
            Unite with Puviyan
          </h1>
          <p className="text-lg font-semibold text-black mb-8 text-right leading-snug">
            We are dedicated to building a sustainable future by uniting with governments,<br />
            organizations committed to sustainability and CSR, businesses offering eco-friendly<br />
            solutions, investors, passionate talent, and the communities we serve.
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-8 flex flex-col gap-4 max-w-md ml-auto"
            style={{ minWidth: 370 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name*"
              className="border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              className="border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message*"
              className="border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="w-1/2 mx-auto mt-2 py-2 rounded-lg text-white font-semibold text-lg shadow-md"
              style={{
                background: "linear-gradient(to right, #63DEF3 33%, #63DEF3 50%, #FABB15 100%)",
                opacity: isLoading ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            {submitStatus === "success" && (
              <div className="text-green-600 text-center text-sm mt-2">Thank you for joining with us!</div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-600 text-center text-sm mt-2">Failed to send message. Please try again.</div>
            )}
          </form>
        </div>
      </div>
      <footer className="w-full text-xs text-white bg-black bg-opacity-90 py-2 px-4 flex justify-between items-center absolute bottom-0 left-0">
        <span>© 2025 Puviyan Digital Solutions Private Limited. All rights reserved.</span>
        <span>
          <a href="#" className="underline mr-4">Privacy Policy</a>
          <a href="#" className="underline">Terms & Conditions</a>
        </span>
      </footer>
    </div>
  );
};

export default UniteWithUsUpdated;
