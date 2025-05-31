import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Services = () => {
  const headerLinesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const descRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          gsap.from(headerLinesRef.current, {
            opacity: 0,
            y: 30,
            stagger: 0.18,
            duration: 0.7,
            ease: "power2.out",
          });
          if (descRef.current) {
            gsap.from(descRef.current, {
              opacity: 0,
              y: 30,
              duration: 0.8,
              delay: 0.7,
              ease: "power2.out",
            });
          }
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
  }, [animated]);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen flex flex-row bg-white md:hidden"
    >
      {/* Left Side: Header Lines */}
      <div className="w-[40%] flex flex-col justify-center items-end pr-2">
        <div className="space-y-36 text-right">
          <span
            ref={(el) => (headerLinesRef.current[0] = el)}
            className="block font-bold text-[#3a8a7c] text-2xl"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Empower <br />Ambition.
          </span>
          <span
            ref={(el) => (headerLinesRef.current[1] = el)}
            className="block font-bold text-[#20444a] text-xl"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Advance <br /> Sustainability.
          </span>
          <span
            ref={(el) => (headerLinesRef.current[2] = el)}
            className="block font-bold text-[#FABB15] text-2xl"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Create <br />Collective <br /> Impact
          </span>
        </div>
      </div>
      {/* Tricolour Divider */}
      <div className="flex flex-col items-center justify-center">
        <div
          style={{
            width: "6px",
            height: "90%",
            background:
              "linear-gradient(to bottom, #3a8a7c 0%, #20444a 50%, #FABB15 100%)",
            borderRadius: "8px",
          }}
        />
      </div>
      {/* Right Side: Description */}
      <div className="w-[60%] flex items-center justify-start pl-2">
        <div
          ref={descRef}
          className="text-[12px] text-gray-800 text-justify font-medium leading-tight"
          style={{ fontFamily: "Century Gothic" }}
        >
          Progress demands more—more innovation, greater responsibility, and
          measurable, enduring impact. Real change happens when these forces align,
          powered by purpose and partnership. By embedding sustainability into every
          digital transformation, we align our vision with the UN Sustainable
          Development Goals and global ESG standards—setting a new benchmark for
          what technology can achieve.
          <br />
          <br />
          Our services empower governments, businesses, and communities to lead
          the way in sustainable development. Through advanced analytics,
          automation, and cloud technologies, we drive efficiency, transparency, and
          outcomes that reduce environmental impact and create long-term value.
          <br />
          <br />
          Sustainability isn’t an add-on—it’s a global imperative. From energy-efficient
          infrastructure and circular IT to real-time ESG insights and responsible value
          chains, our solutions enable purposeful leadership and deliver results that
          matter—for all stakeholders, and for the planet.
          Together, we’re engineering a better future.
          <br />
          <br />
          This is progress, reimagined. Technology that’s not just smart, but right. For
          everyone. For the future.
        </div>
      </div>
    </div>
  );
};

export default Services;
