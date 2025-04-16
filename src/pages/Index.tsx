import AnimatedSplitImages from '@/components/AnimatedSplitImages';
import CarbonFootprintBanner from '@/components/CarbonFootprintBanner';
import ImageScrollStack from '@/components/ImageScrollStack';
import ParallaxImages from '@/components/ParallaxImages';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const images: string[] = [
  'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan000.png?raw=true',
  'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan118.png?raw=true'
];

const parallaxImages = {
  first: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan000.png?raw=true', // The black and white mountain image
  second: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan118.png?raw=true' // The colored version with grass and bee
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-grow w-full">
        {/* First section with ImageScrollStack */}
        {/* <section className="h-[calc(100vh-56px)] w-full relative overflow-hidden">
          <div className="w-full h-full">
            <ImageScrollStack images={images} />
          </div>
        </section> */}

        {/* Parallax Images section */}
        <section className="w-full h-screen">
          <ParallaxImages 
            image1={parallaxImages.first}
            image2={parallaxImages.second}
          />
        </section>

        {/* Next section that appears after scroll */}
        <section className="min-h-screen w-full bg-white">
          <div className="container mx-auto px-4 py-16">
            <AnimatedSplitImages />
          </div>
        </section>

        {/* About Us Section */}
        <section className="w-full bg-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              About Us
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              We are committed to rewriting the eco-story of the planet with innovative solutions and sustainable practices.
            </motion.p>
          </div>
        </section>

        {/* Carbon Footprint Banner section */}
        <section className="w-full">
          <CarbonFootprintBanner />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
