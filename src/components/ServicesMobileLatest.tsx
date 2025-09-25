const ServicesMobileLatest = () => {
  return (
    <div className="flex flex-col items-center p-6 lg:p-12 bg-black text-white">
      {/* Top banner */}
      <div className="bg-black text-white text-center w-full rounded-t-xl py-2">
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
        className="max-w-2xl text-lg md:text-xl text-white text-left mt-3"
        style={{ whiteSpace: 'pre-line' }} >
        <p>
        Progress demands more: more innovation, more responsibility, and more meaningful impact. Real change happens when these forces move forward together.
We bring real PEP, Puviyan Engineering Practice, across products and services, embedding sustainable engineering best practices at the core and setting a new benchmark for what technology can achieve.         </p>
        <p>
          <br/>
        By uniting with governments, organizations, and communities worldwide, we accelerate sustainable digital transformation at scale through strategic consulting and technology-led innovations.        </p>
        <p>
          <br/>
        Our capabilities span responsible AI solutions, energy-efficient infrastructure, advanced real-time analytics, circular IT strategies, and resilient, optimized value chains, each contributing to measurable environmental, social, and economic (ESG) outcomes at scale.        </p>
        <p>
          <br/>
        This is progress, reimagined: technology that is not just smart, but right for people and planet.        </p>
      </div>
    </div>
  );
};

export default ServicesMobileLatest;
