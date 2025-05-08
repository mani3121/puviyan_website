import { motion } from 'framer-motion';
import Header from './Header'; // Import the Header component

const services = [
  {
    title: 'Sustainable Digital Strategy',
    description:
      'Shape your digital transformation with sustainability at its core. We align your business goals with global ESG standards, embedding responsible practices into your growth journey without compromising innovation or agility—making your future bold, resilient, and accountable.',
    image: 'https://puviyan-website.vercel.app/images/Digital-Sustainability.jpeg', // Replace with actual image URL
  },
  {
    title: 'Eco-Intelligent Digital Operations',
    description:
      'Transform your digital and IT landscape with an eco-conscious approach. We identify practical, high-impact opportunities to improve energy efficiency, reduce waste, and conserve resources—minimizing your environmental footprint while optimizing performance and productivity.',
    image: 'https://puviyan-website.vercel.app/images/Eco-digital.jpg', // Replace with actual image URL
  },
  {
    title: 'ESG Data, Reporting & Automation',
    description:
      'Elevate ESG from a compliance task to a strategic asset. Our solutions simplify data collection, streamline reporting, and automate key processes—ensuring transparency, regulatory alignment, and a clear narrative of your sustainability progress to all stakeholders.',
    image: 'https://puviyan-website.vercel.app/images/Esg.jpg', // Replace with actual image URL
  },
  {
    title: 'Sustainable IT Infrastructure',
    description:
      'Redesign your technology ecosystem for efficiency and lasting environmental benefit. We help you adopt energy-efficient, low-impact IT solutions that reduce emissions and resource use—supporting your business objectives while advancing meaningful sustainability outcomes.',
    image: 'https://puviyan-website.vercel.app/images/Sustainable.jpg', // Replace with actual image URL
  },
  {
    title: 'Sustainable Value Chains',
    description:
      'Extend your sustainability impact across your entire ecosystem. We work with you to build responsible, future-ready value chains that engage partners and suppliers—fostering collaboration, reducing risks, and ensuring that progress and preservation move forward together.',
    image: 'https://puviyan-website.vercel.app/images/ValueChain.jpg', // Replace with actual image URL
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center"
            variants={itemVariants}
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Empower Ambition. Advance Sustainability. Create Collective Impact.
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Progress demands more-more innovation, more responsibility, more meaningful impact. Real change happens when these forces move forward together. By embedding sustainability into every digital transformation, vision aligns with the United Nations Sustainable Development Goals and global ESG standards-setting a new benchmark for what technology can achieve.
          </motion.p>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Our services empower governments, businesses, and communities to drive sustainable progress. Leveraging advanced analytics, automation, and cloud technologies, we unlock efficiency, transparency, and measurable outcomes-reducing environmental footprints and creating long-term value.
          </motion.p>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Sustainability isn't an add-on; it's essential. From energy-efficient infrastructure and circular IT to real-time ESG insights and responsible value chains, our solutions enable purposeful leadership and deliver results that matter-for all stakeholders and for the planet.
          </motion.p>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
            variants={itemVariants}
          >
            This is progress, reimagined. Technology that's not just smart, but right. For everyone. For the future.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;