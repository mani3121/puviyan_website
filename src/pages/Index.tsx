import AboutUs from '@/components/AboutUs';
import Header from '@/components/Header';
import ParallaxImages from '@/components/ParallaxImages';
import Services from '@/components/Services';
import UniteWithUs from '@/components/UniteWithUs';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import Product from './Product';
import ParallaxImageWrapper from '@/components/ParallaxImageWrapper';

const parallaxImages = {
  first: 'https://puviyan-website.vercel.app/images/Puviyanworld2.jpeg',
  second: 'https://puviyan-website.vercel.app/images/Puviyanworld1.jpeg',
  mobileFirst: 'https://puviyan-website.vercel.app/images/Puv_mob2.jpeg',
  mobileSecond: 'https://puviyan-website.vercel.app/images/Puv_mob1.jpeg',
};

const Index = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <div className="w-full overflow-x-hidden">
        <Header />
        <main className="w-full">
          {/* Parallax Images section */}
          <section className="w-full h-screen">
            <ParallaxImageWrapper 
              image1={parallaxImages.first}
              image2={parallaxImages.second}
              mobileImage1={parallaxImages.mobileFirst}
              mobileImage2={parallaxImages.mobileSecond}
            />
          </section>

          {/* Separator */}
          <div className="w-full h-1 bg-black"></div>

          {/* Next section that appears after scroll */}
          <section id="animated-split-images" className="w-full bg-white">
            <div className="w-full px-4 py-16">
              <Product />
            </div>
          </section>

          {/* Separator */}

          <section id="services" className="w-full bg-white">
            <div className="w-full px-4 py-16">
              <Services />
            </div>
          </section>

  

          <section id="about-us" className="w-full bg-white">
            <div className="w-full px-4 py-16">
              <AboutUs />
            </div>
          </section>


          <section id="unite-with-us" className="w-full bg-white">
            <div className="w-full px-4 py-16">
              <UniteWithUs />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
