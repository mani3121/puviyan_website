import React from 'react';
import Header from './Header'; 
import Footer from './Footer';

const UniteWithUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <Header />
      {/* Add padding to push content below the header */}
      <div className="mt-16 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Unite with Puviyan</h1>
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
          {/* Question Section */}
          <fieldset className="mb-4">
            <legend className="block text-gray-700 text-sm font-bold mb-2">
              How would you like to contribute?
            </legend>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contribution"
                  value="partner"
                  className="mr-2"
                />
                Partner with us
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contribution"
                  value="csr"
                  className="mr-2"
                />
                CSR Funding
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contribution"
                  value="investor"
                  className="mr-2"
                />
                Investor
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contribution"
                  value="job-seeker"
                  className="mr-2"
                />
                Job Seeker
              </label>
            </div>
          </fieldset>
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