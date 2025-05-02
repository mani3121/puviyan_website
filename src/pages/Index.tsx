import AboutUs from '@/components/AboutUs';
import AnimatedSplitImages from '@/components/AnimatedSplitImages';
import CarbonFootprintBanner from '@/components/CarbonFootprintBanner';
import ImageScrollStack from '@/components/ImageScrollStack';
import ParallaxImages from '@/components/ParallaxImages';
import Footer from '../components/Footer';
import Services from '@/components/Services';
import UniteWithUs from '@/components/UniteWithUs';
import Header from '@/components/Header';


const parallaxImages = {
  first: '/src/assets/img/Puviyanworld2.jpeg',
  second: '/src/assets/img/Puviyanworld1.jpeg'
};

const Index = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-grow w-full">
        {/* Parallax Images section */}
        <section className="w-full h-screen">
          <ParallaxImages 
            image1={parallaxImages.first}
            image2={parallaxImages.second}
          />
        </section>

        {/* Next section that appears after scroll */}
        <section id="animated-split-images" className="min-h-screen w-full bg-white">
          <div className="container mx-auto px-4 py-16">
            <AnimatedSplitImages />
          </div>
        </section>
        <section id="services" className="min-h-screen w-full bg-white">
          <div className="container mx-auto px-4 py-16">
            <Services />
          </div>
        </section>
        <section id="about-us" className="min-h-screen w-full bg-white">
          <div className="container mx-auto px-4 py-16">
            <AboutUs />
          </div>
        </section>
        <section id="unite-with-us" className="min-h-screen w-full bg-white">
          <div className="container mx-auto px-4 py-16">
            <UniteWithUs />
          </div>
        </section>
        

      </main>
      <Footer />
    </div>
  );
};

export default Index;
