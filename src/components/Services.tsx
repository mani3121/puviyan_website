import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component

const services = [
  {
    title: 'Sustainable Digital Strategy',
    description:
      'Shape your digital transformation with sustainability at its core. We align your business goals with global ESG standards, embedding responsible practices into your growth journey without compromising innovation or agility—making your future bold, resilient, and accountable.',
    image: 'https://www.amdhservicesltd.com/wp-content/uploads/2022/08/Digital-Sustainability-Hi-Res-scaled.jpeg', // Replace with actual image URL
  },
  {
    title: 'Eco-Intelligent Digital Operations',
    description:
      'Transform your digital and IT landscape with an eco-conscious approach. We identify practical, high-impact opportunities to improve energy efficiency, reduce waste, and conserve resources—minimizing your environmental footprint while optimizing performance and productivity.',
    image: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/Eco-digital.jpg?raw=true', // Replace with actual image URL
  },
  {
    title: 'ESG Data, Reporting & Automation',
    description:
      'Elevate ESG from a compliance task to a strategic asset. Our solutions simplify data collection, streamline reporting, and automate key processes—ensuring transparency, regulatory alignment, and a clear narrative of your sustainability progress to all stakeholders.',
    image: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/Esg.jpg?raw=true', // Replace with actual image URL
  },
  {
    title: 'Sustainable IT Infrastructure',
    description:
      'Redesign your technology ecosystem for efficiency and lasting environmental benefit. We help you adopt energy-efficient, low-impact IT solutions that reduce emissions and resource use—supporting your business objectives while advancing meaningful sustainability outcomes.',
    image: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/Sustainable.jpg?raw=true', // Replace with actual image URL
  },
  {
    title: 'Sustainable Value Chains',
    description:
      'Extend your sustainability impact across your entire ecosystem. We work with you to build responsible, future-ready value chains that engage partners and suppliers—fostering collaboration, reducing risks, and ensuring that progress and preservation move forward together.',
    image: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/ValueChain.jpg?raw=true', // Replace with actual image URL
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* Add margin to push content below the header */}
      <div className="container mx-auto px-4 py-16 mt-7">
        {/* Animated Header */}
        <motion.h1
          className="text-4xl font-bold text-gray-800 text-center mb-12"
          style={{
            fontWeight: 600,
            fontStyle: 'normal',
            lineHeight: '1.3',
            color: '#000000', // Retain the black color if needed
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Services
        </motion.h1>
        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={service.image}
                alt={service.title}
                className="w-full md:w-1/2 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="md:w-1/2 md:pl-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontWeight: 600,
                    fontStyle: 'normal',
                    lineHeight: '1.3',
                    color: '#808080', // Updated to grey color
                    marginBottom: '.5em',
                  }}
                >
                  {service.title}
                </h1>
                <p
                  className="text-lg"
                  style={{
                    fontSize: '1.4em',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    color: '#808080', // Updated to grey color
                    marginBottom: '.5em',
                    lineHeight: '1.4',
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Services;