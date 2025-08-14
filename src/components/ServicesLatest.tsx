import { useMediaQuery } from "react-responsive";
import ServicesMobileLatest from "./ServicesMobileLatest";

const ServicesLatest = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return <ServicesMobileLatest />;
  }

  return (
    <div className="flex flex-col lg:flex-row p-6 lg:p-12 gap-8 bg-black text-white min-h-[90vh] relative">
      {/* Left panel */}
      <div className="bg-black text-white p-8 flex flex-col justify-center items-center text-center w-full lg:w-1/3 min-h-[65vh]">
        <h1 className="text-5xl mb-20 break-words" style={{ fontFamily: "Arial Rounded MT Bold" }}>
          Empower<br /> Ambition.
        </h1>
        <h1 className="text-5xl mb-20 break-words" style={{ fontFamily: "Arial Rounded MT Bold" }}>
          Advance <br />Sustainability.
        </h1>
        <h1 className="text-5xl break-words" style={{ fontFamily: "Arial Rounded MT Bold" }}>
          Create <br />
          Collective<br />
          Impact.
        </h1>
      </div>

      {/* Vertical Divider */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-[33%] h-[68vh] justify-center items-center pointer-events-none z-10">
        <div
          className="w-2 rounded-full"
          style={{
            height: "100%",
            background: "linear-gradient(to bottom, #F9BB18, #74CFE6, #5ABA52 )",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Right panel */}
      <div
        className="w-full lg:w-2/3 space-y-6 text-justify flex flex-col justify-center min-h-[70vh] text-xl pl-8 text-white"
        style={{ fontFamily: "Arial" }}
      >
        <p>
         Progress demands more: more innovation, more responsibility, and more meaningful impact. Real change happens when these forces move forward together. By embedding sustainability into every digital transformation across products and services, we align with global standards and set a new benchmark for what technology can achieve.
        </p>
        <br/>
        <p>
         Sustainability is not an add-on; it is essential. We unite with governments, organizations, and communities worldwide to accelerate sustainable transformation at scale through strategic consulting and technology-led innovations.
        </p>
        <br/>
        <p>
          Our capabilities span energy-efficient infrastructure, circular IT strategies, advanced real-time analytics, responsible AI solutions, and resilient, optimized value chains, with each contributing to measurable environmental, social, and economic (ESG) outcomes at scale.
        </p>

        <p>
          This is progress, reimagined. Technology that is not just smart, but right for people and planet.
        </p>
      </div>
    </div>
  );
};

export default ServicesLatest;
