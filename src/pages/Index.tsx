import AboutUs from '@/components/AboutUs';
import AnimatedSplitImages from '@/components/AnimatedSplitImages';
import CarbonFootprintBanner from '@/components/CarbonFootprintBanner';
import ImageScrollStack from '@/components/ImageScrollStack';
import ParallaxImages from '@/components/ParallaxImages';
import Footer from '../components/Footer';
import Header from '../components/Header';

const images: string[] = [
  'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan000.png?raw=true',
  'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan118.png?raw=true'
];

const parallaxImages = {
  first: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan000.png?raw=true',
  second: 'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan118.png?raw=true'
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
        <section id="about-us">
          <AboutUs />
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
