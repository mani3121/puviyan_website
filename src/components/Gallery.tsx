import Header from "./Header";

const Gallery = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-black">
      <Header />
      
      {/* Image Section - Top */}
      <div className="w-full flex items-center justify-center bg-black p-4">
        <img
          src="/images/EventCollage.webp"
          alt="Event Collage"
          className="w-full max-w-4xl h-auto object-contain rounded-2xl"
          loading="lazy"
        />
      </div>
      
      {/* Text Section - Bottom */}
      <div className="w-full flex flex-col justify-center items-center p-4 md:p-8 bg-black">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-6 leading-tight">
            Walking the Talk on World Environment Day 2025
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-white text-justify leading-relaxed">
            On World Environment Day 2025, Team Puviyan proudly joined the global
            movement led by the United Nations Environment Programme (UNEP),
            emphasizing the powerful theme: "Beat Plastic Pollution."
            <br />
            <br />
            As part of this initiative, we embraced a personal commitment: "I am
            Puviyan. I pledge to beat Plastic Pollution." Guided by the pledge,
            our team took to the streets of Chennai to engage residents, spark
            conversations, and spotlight the urgent need to reduce single-use
            plastic waste.
            <br />
            <br />
            We distributed reusable cloth bags, encouraging simple, everyday
            actions that help protect the environment. Each cloth bag, when used
            150 times, can save about 0.5 kg of CO2e emissions and keep 150
            plastic bags out of landfills and waterways. It's a small switch that
            creates a big impact for our planet and future generations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;