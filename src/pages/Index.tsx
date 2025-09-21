import Header from '@/components/Header';
import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import Technology from './webVersion/Technology';

const AboutUs = lazy(() => import('@/components/AboutUs'));
const CarbonFootprintBanner = lazy(() => import('@/components/CarbonFootprintBanner'));
const ParallaxImageWrapper = lazy(() => import('@/components/ParallaxImageWrapper'));
const ServicesLatest = lazy(() => import('@/components/ServicesLatest'));
const Product = lazy(() => import('./webVersion/Product'));
const UniteWithUs = lazy(() => import('./UniteWithUs'));
const Gallery = lazy(() => import('@/components/Gallery'));

const parallaxImages = {
  first: '/images/Home_bt.avif',
  second: '/images/Home_at.avif',
  mobileFirst: '/images/Home_bt_mob.avif',
  mobileSecond: '/images/Home_at_color.avif',
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
      <div className="w-full overflow-x-hidden bg-black">
        <Header />
        <main className="w-full bg-black text-gray-300">
          <Suspense fallback={<div className="text-center py-8 text-gray-300">Loading...</div>}>
            <CarbonFootprintBanner />

            {/* Parallax Images section */}
            <section className="w-full h-screen m-0 p-0 bg-black text-gray-300">
              <ParallaxImageWrapper
                image1={parallaxImages.first}
                image2={parallaxImages.second}
                mobileImage1={parallaxImages.mobileFirst}
                mobileImage2={parallaxImages.mobileSecond}
                loading="lazy"
              />
            </section>

            {/* Next section that appears after scroll */}
            <section id="animated-split-images" className="w-full bg-black text-gray-300 m-0 p-0">
              <div className="w-full">
                <Technology />
              </div>
            </section>

            <section id="services" className="w-full bg-black text-gray-300">
              <div className="w-full px-4 py-8">
                <ServicesLatest />
              </div>
            </section>
                 {/* Gallery Section */}
            <section id="gallery" className="w-full bg-black text-gray-300">
              <div className="w-full px-4 py-8">
                <Gallery />
              </div>
            </section>

            <section id="about-us" className="w-full bg-black text-gray-300">
              <div className="w-full px-2 ">
                <AboutUs />
              </div>
            </section>

            <section id="unite-with-us" className="w-full bg-black text-gray-300">
              <div className="min-h-screen">
                <UniteWithUs />
              </div>
            </section>
          </Suspense>

          {/* Footer for larger screens */}
          <footer
            className="w-full flex items-center justify-between text-gray-300 text-[10px] sm:text-xs px-4 h-10 hidden sm:flex"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: "normal", backgroundColor: "#1F1F1F" }}
          >
            <span className="ml-[6%] font-normal">
              © 2025 Puviyan Digital Solutions Private Limited. All rights reserved.
            </span>
            <div className="flex space-x-4 mr-[5%]">
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-400 font-normal"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-conditions"
                className="underline hover:text-gray-400 font-normal"
              >
                Terms & Conditions
              </a>
            </div>
          </footer>
          {/* Mobile Footer */}
          <footer
            className="w-full flex items-center justify-between text-gray-300 text-[8px] px-2 h-8 sm:hidden"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: "normal", backgroundColor: "#1F1F1F" }}
          >
            <span className="font-normal">
              2025 Puviyan Digital Solutions Pvt. Ltd.
            </span>
            <div className="flex flex-row items-center space-x-6">
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-400 font-normal"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-conditions"
                className="underline hover:text-gray-400 font-normal"
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