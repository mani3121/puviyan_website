import { motion } from 'framer-motion';
import Header from './Header';
const AboutUs = () => {
  const description = `
"How can I contribute to a sustainable future while pursuing my dreams and honoring my priorities—and how can we, as a collective, align our efforts to create meaningful change?"

At Puviyan, our mission is to democratize sustainability at a large scale, making it accessible and impactful without requiring significant compromise in priorities. We believe the urgent imperative isn't just recognizing the sentiment of climate change, biodiversity loss, or pollution—it's about empowering actionable solutions that deliver immediate impact and drive lasting transformation.

'Puviyan' signifies a person with a deep sense of environmental consciousness and harmony with nature, perfectly reflecting our vision to advance sustainability as an opportunity to innovate and reimagine possibilities.

Real change begins with individual action, but its true strength lies in the shared responsibility of governments, businesses, and communities. By uniting people, the planet, and technology, we help rewrite the EcoStory toward a future where progress and preservation thrive together.
  

`;

  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Three-line border */}
 
      <Header />
      <div className="container mx-auto px-8 md:px-20 pt-8 relative z-10">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left side - Image */}
          <div className="md:w-1/2 h-full w-full mb-8 md:mb-0 md:mr-8 mt-16 flex justify-center items-center">
            <img
              src="https://puviyan-website.vercel.app/images/People_Planet_Technology.png"
              alt="About Puviyan"
                className="w-full max-w-[750px] object-contain max-h-[650px] mt-14"
                loading="lazy"
            />
            <br/>
          </div>
          {/* Right side - Description */}
          <div className="md:w-1/2 h-full">
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
    </section>
  );
};

export default AboutUs;