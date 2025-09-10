import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Services = () => {
  const headerLinesRef = useRef<Array<HTMLSpanElement | null>>([]);
  const descRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
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
          if (dividerRef.current) {
            gsap.fromTo(
              dividerRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 1, delay: 0.4, ease: "power2.out" }
            );
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
      className="w-full min-h-screen flex flex-row bg-black md:hidden"
    >
      {/* Left Side: Header Lines */}
      <div className="w-[40%] flex flex-col justify-center items-end pr-2">
        <div className="space-y-36 text-right">
          <span
            ref={(el) => (headerLinesRef.current[0] = el)}
            className="block font-bold text-[#F9BB18] text-xl"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Empower <br />Ambition.
          </span>
          <span
            ref={(el) => (headerLinesRef.current[1] = el)}
            className="block font-bold text-[#74CFE6] text-xl"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Advance <br /> Sustainability.
          </span>
          <span
            ref={(el) => (headerLinesRef.current[2] = el)}
            className="block font-bold text-[#5ABA52] text-xl"
            style={{ fontFamily: "Arial Rounded MT Bold" }}
          >
            Create <br />Collective <br /> Impact
          </span>
        </div>
      </div>
      {/* Tricolour Divider */}
      <div className="flex flex-col items-center justify-center">
        <div
          ref={dividerRef}
          style={{
            width: "6px",
            height: "90%",
            background:
              "linear-gradient(to bottom, #F9BB18, #74CFE6, #5ABA52)",
            borderRadius: "8px",
          }}
        />
      </div>
      {/* Right Side: Description */}
      <div className="w-[60%] flex items-center justify-start pl-2">
        <div
          ref={descRef}
          className="text-[12px] text-gray-300 text-justify font-medium leading-tight"
          style={{ fontFamily: "Arial" }}
        >
          Progress demands more: more innovation, more responsibility, and more
          meaningful impact. Real change happens when these forces move forward
          together. By embedding sustainability into every digital transformation
          across products and services, we align with global standards and set a
          new benchmark for what technology can achieve.
          <br />
          <br />
          Sustainability is not an add-on; it is essential. We unite with
          governments, organizations, and communities worldwide to accelerate
          sustainable transformation at scale through strategic consulting and
          technology-led innovations.
          <br />
          <br />
          Our capabilities span energy-efficient infrastructure, circular IT
          strategies, advanced real-time analytics, responsible AI solutions, and
          resilient, optimized value chains, with each contributing to measurable
          environmental, social, and economic (ESG) outcomes at scale.
          <br />
          <br />
          This is progress, reimagined. Technology that is not just smart, but
          right for people and planet.
        </div>
      </div>
    </div>
  );
};

export default Services;
