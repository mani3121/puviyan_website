import emailjs from '@emailjs/browser';
import Footer from './Footer';
import Header from './Header';
import { useEffect, useState } from 'react';

const UniteWithUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setShowToast(true); // Show toast on success
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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false); // Hide toast after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-fit bg-white-100 flex flex-col items-center justify-start px-0 ">
      <div className="relative min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full flex flex-col items-center -mt-24">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Unite with Puviyan</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            We are dedicated to building a sustainable future by uniting with governments, organizations committed to sustainability and CSR, businesses offering eco-friendly solutions, investors, passionate talent, and the communities we serve.
          </p>
          <form onSubmit={handleSubmit} className="bg-yellow-500 shadow-md rounded px-12 pt-6 pb-8 w-full max-w-2xl relative z-10">
            {showToast && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-20 pointer-events-none">
                Thank you for joining with us!
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded-lg w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="custom-button w-1/2 ml-48"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </div>
            {submitStatus === 'error' && (
              <p className="text-red-600 mt-2 text-center">Failed to send message. Please try again.</p>
            )}
            <div className="mt-24"></div>
          </form>
        </div>

        {/* Image for web version */}
        <img
          src="https://puviyan-website.vercel.app/images/unite_with_us.png" // Replace with your image
          alt="Foreground Overlay"
          className="hidden sm:block absolute -bottom-32 -left-4 w-full h-31 z-10 object-fill" // Visible only on screens >=640px
        />

        {/* Image for mobile version */}
        <img
          src="https://puviyan-website.vercel.app/images/unite_with_us.png" // Replace with your image
          alt="Foreground Overlay"
          className="block sm:hidden absolute bottom-0 -left-4 w-full h-40 z-10 object-fill" // Adjusted bottom position for mobile
        />
      </div>
      <Footer className="footer-custom" />
    </div>
  );
};

export default UniteWithUs;