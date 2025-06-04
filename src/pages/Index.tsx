import AboutUs from '@/components/AboutUs';
import CarbonFootprintBanner from '@/components/CarbonFootprintBanner';
import Header from '@/components/Header';
import ParallaxImageWrapper from '@/components/ParallaxImageWrapper';
import ServicesLatest from '@/components/ServicesLatest';
import { Helmet } from 'react-helmet';
import Product from './Product';
import UniteWithUs from './UniteWithUs';

const parallaxImages = {
  first: 'https://puviyan-website.vercel.app/images/Puviyanworld2.jpg',
  second: 'https://puviyan-website.vercel.app/images/Puviyanworld1.jpg',
  mobileFirst: 'https://puviyan-website.vercel.app/images/Puv_mob2.jpg',
  mobileSecond: 'https://puviyan-website.vercel.app/images/Puv_mob1.jpg',
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
       
              <CarbonFootprintBanner />
          
          {/* Parallax Images section */}
          <section className="w-full h-screen m-0 p-0">
            <ParallaxImageWrapper 
              image1={parallaxImages.first}
              image2={parallaxImages.second}
              mobileImage1={parallaxImages.mobileFirst}
              mobileImage2={parallaxImages.mobileSecond}
              loading="lazy" // Ensure lazy loading for images
            />
          </section>

          {/* Next section that appears after scroll */}
          <section id="animated-split-images" className="w-full bg-white m-0 p-0">
            <div className="w-full">
              <Product />
            </div>
          </section>

          {/* Separator */}
          {/* <div className="w-full h-1 bg-black"></div> */} {/* <-- Remove this line */}

          <section id="services" className="w-full bg-white">
            <div className="w-full px-4 py-8">
              <ServicesLatest />
            </div>
          </section>

          <section id="about-us" className="w-full bg-white">
            <div className="w-full px-2 ">
              <AboutUs />
            </div>
          </section>


          {/* Separator Image between About Us and Unite with Us
          <section id="separator-image" className="w-full">
            <img
              src="https://puviyan-website.vercel.app/images/ribbon.jpg"
              alt="Separator"
              className="w-full object-cover"
              loading="lazy"
            />
          </section> */}

          <section id="unite-with-us" className="w-full bg-white">
            <div className="min-h-screen">
              <UniteWithUs />
            </div>
          </section>

          {/* Footer */}
          <footer
            className="w-full flex items-center justify-between bg-black text-white text-[10px] sm:text-xs px-4 h-10"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: "normal" }}
          >
            <span className="ml-4 font-normal">
              © 2025 Puviyan Digital Solutions Private Limited. All rights reserved.
            </span>
            <div className="flex space-x-4 mr-12">
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-300 font-normal"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-conditions"
                className="underline hover:text-gray-300 font-normal"
              >
                Terms & Conditions
              </a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Index;
