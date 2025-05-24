import { motion } from "framer-motion";
import { useEffect } from "react";

export default function UniteWithPuviyan() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-sans overflow-hidden">
      {/* Page Header */}
      <div className="absolute top-0 left-0 w-full flex justify-center pt-16 z-50">
        <h2 className="text-3xl font-bold text-gray-800">Unite with Puviyan</h2>
      </div>
      {/* Sun and hill silhouette with people */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute left-0 top-0 z-10 w-1/2 h-full flex items-start justify-start"
      >
        <div className="relative left-0 w-[500px] h-[500px] mt-10 ml-0">
          <img
            src="https://puviyan-website.vercel.app/images/sun.png"
            alt="Sun"
            className="absolute top-0 left-0 w-full h-full rounded-full z-10"
          />
        </div>
      </motion.div>
      {/* people climbing */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute left-40 top-10 z-20 w-1/2 h-full flex items-start justify-start"
      >
        <div className="relative w-[200%] h-[500px] mt-20 ml-[-10%]">
          <div className="absolute bottom-0 left-0 w-full h-auto z-10">
            <img
              src="https://puviyan-website.vercel.app/images/People_claimbing.png"
              alt="People Climbing"
              className="w-full h-auto"
              style={{ transform: 'scaleX(1.2)' }}
            />
          </div>
        </div>
      </motion.div>
      {/* Background waves as images */}
      <motion.img
        src="https://puviyan-website.vercel.app/images/Green_wave.png"
        alt="Green Wave"
        className="absolute bottom-10 left-0 w-full h-auto z-30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 3 }}
      />
      <motion.img
        src="https://puviyan-website.vercel.app/images/Blue_wave.png"
        alt="Blue Wave"
        className="absolute bottom-0 left-0 w-full h-auto z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 4 }}
      />
      <motion.img
        src="https://puviyan-website.vercel.app/images/Black_wave.png"
        alt="Black Wave"
        className="absolute bottom-0 left-0 w-full h-auto z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 5 }}
      />
      {/* Contact Form */}
      <div className="relative z-50 flex justify-end items-center h-[70vh] pr-16 mt-[-50px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 6 }}
        >
          <form className="bg-white shadow-xl p-6 w-[400px] space-y-4 rounded-xl">
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              placeholder="Name*"
              required
            />
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="email"
              placeholder="Email address*"
              required
            />
            <textarea
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              placeholder="Your Message*"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-yellow-300 text-white font-semibold py-2 px-4 rounded-md w-full hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-black text-xs z-50">
        © 2025 Puviyan Digital Solutions Private Limited. All rights reserved. &nbsp;|&nbsp;
        <a href="#" className="underline text-black">Privacy Policy</a> &nbsp;|&nbsp;
        <a href="#" className="underline text-black">Terms & Conditions</a>
      </div>
    </div>
  );
}
