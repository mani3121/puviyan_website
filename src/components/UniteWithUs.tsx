import Header from './Header';

const UniteWithUs = () => {
  return (
    <div className="min-h-fit bg-white-100 flex flex-col items-center justify-start px-4">
      <div className="relative min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full flex flex-col items-center -mt-24">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Unite with Puviyan</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
        We are dedicated to building a sustainable future by uniting with governments, organizations committed to sustainability and CSR, businesses offering eco-friendly solutions, investors, passionate talent, and the communities we serve.
        </p>
        <form className="bg-yellow-500 shadow-md rounded px-12 pt-6 pb-8 w-full max-w-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded-lg w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Your Message"
              rows={4}
            ></textarea>
          </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="custom-button w-1/2 ml-48"
              >
                Submit
              </button>
            </div>
          <div className="mt-48"></div>
        </form>
      </div>

      <img
        src="https://puviyan-website.vercel.app/images/unite_with_us.png" // Replace with your image
        alt="Foreground Overlay"
        className="absolute -bottom-32 left-0 w-full z-10 object-cover"
      />
    </div>
    </div>
  );
};

export default UniteWithUs;