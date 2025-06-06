const ServicesMobileLatest = () => {
  return (
    <div className="flex flex-col items-center p-6 lg:p-12 bg-white text-black">
      {/* Top banner */}
      <div className="bg-white text-gray-600 text-center w-full rounded-t-xl py-2">
        <h2 className="text-xl md:text-2xl font-bold">Empower Ambition.</h2>
        <h2 className="text-xl md:text-2xl font-bold">Advance Sustainability.</h2>
        <h2 className="text-xl md:text-2xl font-bold">Create Collective Impact.</h2>
      </div>

      {/* Horizontal black line */}
      <hr
        className="w-full border-t-4 my-1"
        style={{
          borderImage: "linear-gradient(to right, #FABB15, #63DEF3) 1",
          borderTop: "4px solid",
          borderColor: "transparent"
        }}
      />

      {/* Body content */}
      <div
        className="max-w-2xl text-lg md:text-xl text-gray-700 text-justify"
        style={{ whiteSpace: 'pre-line' }}
      >
        <p>
          Progress demands more—more innovation, more responsibility, more meaningful impact. Real change happens when these forces move forward together. By embedding sustainability into every digital transformation, vision aligns with the United Nations Sustainable Development Goals and global ESG standards—setting a new benchmark for what technology can achieve.
        </p>
        <br/>
        <p>
          Our services empower governments, businesses, and communities to drive sustainable progress. Leveraging advanced analytics, automation, and cloud technologies, we unlock efficiency, transparency, and measurable outcomes—reducing environmental footprints and creating long-term value.
        </p>
        <br/>
        <p>
          Sustainability isn't an add-on; it's essential. From energy-efficient infrastructure and circular IT to real-time ESG insights and responsible value chains, our solutions enable purposeful leadership and deliver results that matter—for all stakeholders and for the planet.
        </p>
        <br/>
        <p>
          This is progress, reimagined. Technology that's not just smart, but right. For everyone. For the future.
        </p>
      </div>
    </div>
  );
};

export default ServicesMobileLatest;
