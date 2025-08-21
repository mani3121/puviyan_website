import { motion } from 'framer-motion';
import Header from './Header';
  
const AboutUs = () => {
  const description = `
  "How can I contribute to a sustainable future while pursuing my dreams and honoring my priorities? And how can we, as a collective, align our efforts to create meaningful change?"

We advance this commitment through Puviyan Digital Solutions, delivering technology-led sustainable innovations, and Puviyan Foundation, leading grassroots initiatives.

‘Puviyan’ signifies a person with a deep sense of environmental consciousness and harmony with nature, perfectly reflecting our vision to advance sustainability as an opportunity to innovate and reimagine possibilities.

Real change begins with individual action, but its true strength lies in the shared responsibility of governments, organizations, and communities. Uniting people, the planet, and technology, we shape a future where progress and preservation thrive together.
  `;
  
  return (
    <section className="w-full bg-black relative overflow-hidden flex items-center justify-center min-h-[70vh] py-4">
      {/* Three-line border & Header */}
      <Header />
      {/* Main content centered */}
      <div className="container mx-auto px-8 md:px-20 pt-0 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-stretch w-full">
          {/* Top: Image */}
          <div
            className="w-full flex justify-center items-center overflow-hidden mt-0 mb-0"
            style={{ marginBottom: "0px" }} // Remove gap below image
          >
            <img
              src="/images/ppt1.gif"
              alt="Puviyan Presentation"
              className="mx-auto w-full max-w-[550px] object-contain max-h-[450px] bg-transparent"
              style={{ border: "none", width: "100%", height: "600px" }}
              loading="lazy"
            />
          </div>
          {/* Bottom: Description */}
          <div className="w-full flex justify-center items-center mt-0" style={{ marginTop: "0px" }}>
            <motion.p
              className="text-lg md:text-xl text-white text-justify"
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