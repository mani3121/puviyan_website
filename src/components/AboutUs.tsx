import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Why Puviyan
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          “How can I contribute to a sustainable future while pursuing my dreams and honoring my priorities—and how can we, as a collective, align our efforts to create meaningful change?”

          At Puviyan, our mission is to democratize sustainability at a large scale, making it accessible and impactful without requiring significant compromise in priorities. We believe the urgent imperative isn’t just recognizing the sentiment of climate change, biodiversity loss, or pollution—it’s about empowering actionable solutions that deliver immediate impact and drive lasting transformation.

          ‘Puviyan’ signifies a person with a deep sense of environmental consciousness and harmony with nature, perfectly reflecting our vision to advance sustainability as an opportunity to innovate and reimagine possibilities.

          Real change begins with individual action, but its true strength lies in the shared responsibility of governments, businesses, and communities. By uniting people, the planet, and technology, we help rewrite the EcoStory toward a future where progress and preservation thrive together.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutUs;