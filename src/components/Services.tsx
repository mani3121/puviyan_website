import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Services = () => {
  const sectionRef = useRef(null);
  const headerLinesRef = useRef([]);
  const paraRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Animate header lines
          gsap.from(headerLinesRef.current, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
          });
          // Animate paragraphs
          gsap.from(paraRefs.current, {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5,
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #3a8a7c 0%, #20444a 100%)'
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Header */}
          <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col justify-center">
            <h1
              className="mb-4 font-bold text-white text-justify"
              style={{ fontFamily: 'Century Gothic', fontSize: 50 }}
            >
              {['Empower', 'Ambition.', 'Advance', 'Sustainability.', 'Create', 'Collective', 'Impact.'].map((line, idx) => (
                <span
                  key={idx}
                  ref={el => headerLinesRef.current[idx] = el}
                  style={{ display: 'block' }}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>
          {/* Vertical Line */}
          <div className="hidden md:block w-px bg-sky-300 mx-6"></div>
          {/* Right side - Content */}
          <div className="md:w-2/3">
            <div className="space-y-8">
              <div className="bg-transparent p-0">
                {[
                  "Progress demands more—more innovation, more responsibility, more meaningful impact. Real change happens when these forces move forward together. By embedding sustainability into every digital transformation, vision aligns with the United Nations Sustainable Development Goals and global ESG standards—setting a new benchmark for what technology can achieve.",
                  "Our services empower governments, businesses, and communities to drive sustainable progress. Leveraging advanced analytics, automation, and cloud technologies, we unlock efficiency, transparency, and measurable outcomes—reducing environmental footprints and creating long-term value.",
                  "Sustainability isn't an add-on; it's essential. From energy-efficient infrastructure and circular IT to real-time ESG insights and responsible value chains, our solutions enable purposeful leadership and deliver results that matter—for all stakeholders and for the planet.",
                  "This is progress, reimagined. Technology that's not just smart, but right. For everyone. For the future."
                ].map((text, idx) => (
                  <p
                    key={idx}
                    className={`text-white mb-4${idx === 3 ? '' : ''}`}
                    style={{ fontSize: 20, lineHeight: 1.7 }}
                    ref={el => paraRefs.current[idx] = el}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
