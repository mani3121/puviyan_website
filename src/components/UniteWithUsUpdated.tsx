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
      className="w-full flex flex-col justify-between"
      style={{
        height: "100vh",
        backgroundImage: 'url("https://puviyan-website.vercel.app/images/Unite_with_puviyan1.jpg")',
        backgroundSize: "100% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-start pt-10 px-4 flex-1">
        <div className="max-w-2xl w-full flex flex-col items-center md:items-start md:ml-[45rem]">
          <h1
            className="text-5xl font-black text-black mb-4 text-center w-full"
            style={{ fontFamily: "Arial Rounded", display: "block" }}
          >
            Unite with Puviyan
          </h1>
          <p className="text-lg font-semibold text-black mb-8 text-center md:text-left leading-snug text-justify">
            We are dedicated to building a sustainable future by uniting with governments,<br />
            organizations committed to sustainability and CSR, businesses offering eco-friendly<br />
            solutions, investors, passionate talent, and the communities we serve.
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-4 flex flex-col gap-3 w-[1000px] max-w-xl items-center" // Reduced padding and gap
          >
            <input
              type="text"
              name="name"
              placeholder="Name*"
              className="border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address*"
              className="border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message*"
              className="border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none w-full"
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
    </div>
  );
};

export default UniteWithUsUpdated;
