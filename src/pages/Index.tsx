import React from 'react';
import Footer from '../components/Footer';
import ScrollCompare from '../components/ScrollCompare';
import useScrollPosition from '../hooks/useScrollPosition';

const Index = () => {
  // Using placeholder images - you can replace these with your own
  const citySample = {
    before: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80",
    title: "Urban Transformation",
    description: "Scroll to see how this cityscape changed over time"
  };
  
  const natureSample = {
    before: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80",
    title: "Natural Wonders",
    description: "Compare different natural landscapes as you scroll"
  };
  
  const scrollPosition = useScrollPosition();

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow"> {/* Added left padding to accommodate the vertical header */}
        {/* Hero Section with Vertical ScrollCompare */}
        <section className="relative h-screen overflow-hidden">
          <ScrollCompare 
            beforeImage={natureSample.before}
            afterImage={natureSample.after}
            title="Dynamic Image Comparison"
            description="Experience the power of scroll-based image comparison. Reveal transformations as you scroll."
            orientation="vertical"
            isHeroBanner={true}
          />
          
          {/* Additional hero content overlay */}
          <div className="absolute inset-0 bg-blue-900/30 pointer-events-none"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div 
                className="max-w-3xl ml-auto"
                style={{
                  transform: `translateY(${-scrollPosition * 0.2}px)`,
                  opacity: Math.max(0, 1 - scrollPosition * 0.002),
                  transition: 'transform 0.05s ease-out, opacity 0.05s ease-out',
                  pointerEvents: 'auto'
                }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                  Dynamic <span className="text-blue-300">Image</span> Comparison
                </h1>
                <p className="text-xl text-white/90 mb-10 max-w-2xl">
                  Experience the power of scroll-based image comparison. Reveal transformations as you scroll down the page.
                </p>
                <a 
                  href="#examples" 
                  className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors font-medium"
                >
                  See Examples
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section id="examples" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16">Scroll to Compare Examples</h2>
            <ScrollCompare 
              beforeImage={citySample.before}
              afterImage={citySample.after}
              title={citySample.title}
              description={citySample.description}
            />
          
          </div>
        </section>
    
      </main>
      
        <Footer />
    </div>
  );
};

export default Index;
