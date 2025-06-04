import { useMediaQuery } from "react-responsive";
import ServicesMobileLatest from "./ServicesMobileLatest";

const ServicesLatest = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return <ServicesMobileLatest />;
  }

  return (
    <div className="flex flex-col lg:flex-row p-6 lg:p-12 gap-8 bg-white text-black min-h-[90vh] relative">
      {/* Left panel */}
      <div className="bg-white text-black p-8 flex flex-col justify-center items-center text-center w-full lg:w-1/3 min-h-[65vh]">
        <h1 className="text-5xl mb-20 break-words" style={{ fontFamily: "Century Gothic" }}>
          Empower<br /> Ambition.
        </h1>
        <h1 className="text-5xl mb-20 break-words" style={{ fontFamily: "Century Gothic" }}>
          Advance <br />Sustainability.
        </h1>
        <h1 className="text-5xl break-words" style={{ fontFamily: "Century Gothic" }}>
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
            background: "linear-gradient(to bottom, #FABB15, #63DEF3 )",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Right panel */}
      <div
        className="w-full lg:w-2/3 space-y-6 text-justify flex flex-col justify-center min-h-[70vh] text-xl pl-8"
        style={{ fontFamily: "Arial" }}
      >
        <p>
          Progress demands more—more innovation, more responsibility, more
          meaningful impact. Real change happens when these forces move forward
          together. By embedding sustainability into every digital transformation,
          vision aligns with the United Nations Sustainable Development Goals and
          global ESG standards—setting a new benchmark for what technology can
          achieve.
        </p>
          <br/>
        <p>
          Our services empower governments, businesses, and communities to drive
          sustainable progress. Leveraging advanced analytics, automation, and
          cloud technologies, we unlock efficiency, transparency, and measurable
          outcomes—reducing environmental footprints and creating long-term value.
        </p>
<br/>
        <p>
          Sustainability isn't an add-on; it's essential. From energy-efficient
          infrastructure and circular IT to real-time ESG insights and responsible
          value chains, our solutions enable purposeful leadership and deliver
          results that matter—for all stakeholders and for the planet.
        </p>

        <p>
          This is progress, reimagined. Technology that's not just smart, but
          right. For everyone. For the future.
        </p>
      </div>
    </div>
  );
};

export default ServicesLatest;
