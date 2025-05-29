const ServicesUpdated = () => (
  <>
    {/* Web version: show only on md and up */}
    <div className="w-full min-h-screen flex items-center justify-center bg-white hidden md:flex">
      <img
        src="https://puviyan-website.vercel.app/images/Services1.gif"
        alt="Services"
        className="max-w-full h-auto"
        loading="lazy"
      />
    </div>
    {/* Mobile version: show only below md */}
    <div className="w-full min-h-screen flex flex-row bg-white md:hidden">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="https://puviyan-website.vercel.app/images/Services_mob.gif"
          alt="Services Mobile"
          className="max-w-full h-72 md:h-auto"
          loading="lazy"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
      </div>
    </div>
  </>
);

export default ServicesUpdated;
