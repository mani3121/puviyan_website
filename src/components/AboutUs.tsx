import { motion } from 'framer-motion';
import Header from './Header';
  
const AboutUs = () => {
  const description = `
  "How can I contribute to a sustainable future while pursuing my dreams and honoring my priorities? And how can we, as a collective, align our efforts to create meaningful change?"

At Puviyan, our mission is to democratize sustainability at a large scale, making it accessible and impactful without requiring significant compromise in priorities. We advance this commitment through Puviyan Digital Solutions, which delivers technology-led sustainable innovations, and Puviyan Foundation, which leads grassroots initiatives.

‘Puviyan’ signifies a person with a deep sense of environmental consciousness and harmony with nature, perfectly reflecting our vision to advance sustainability as an opportunity to innovate and reimagine possibilities.

Real change begins with individual action, but its true strength lies in the shared responsibility of governments, organizations, and communities. Uniting people, the planet, and technology, we shape a future where progress and preservation thrive together.
  `;
  
  return (
    <section className="w-full bg-white relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Three-line border & Header */}
      <Header />
      {/* Main content centered */}
      <div className="container mx-auto px-8 md:px-20 pt-4 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-stretch w-full">
          {/* Top: Image */}
          <div className="w-full mb-6 mt-12 flex justify-center items-center">
            <img
              src="/images/ppt1.gif"
              alt="About Puviyan"
              className="mx-auto w-full max-w-[550px] object-contain max-h-[550px]"
              loading="lazy"
            />
          </div>
          {/* Bottom: Description */}
          <div className="w-full flex justify-center items-center">
            <motion.p
              className="text-lg md:text-xl text-gray-700 text-justify"
              style={{ whiteSpace: 'pre-line' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
      {/* Inherited Separator from Index.tsx placed at the bottom */}
      {/*
      <div className="w-full m-0 p-0">
        <img
          src="/images/ribbon.jpg"
          alt="Separator"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      */}
    </section>
  );
};

export default AboutUs;