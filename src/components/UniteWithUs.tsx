import Header from './Header';

const UniteWithUs = () => {
  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center justify-start px-4">
      <Header />
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Unite with Puviyan</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Inviting partners, CSR funders, investors, and aspiring job seekers to build a sustainable future together
        </p>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Your Message"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UniteWithUs;