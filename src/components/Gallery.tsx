import { useState } from "react";

const carouselData = [
	{
		image: "/images/EventCollage1.webp",
		bg: "bg-[#c7d2d6]",
		text: "text-[#e76b5b]",
	},

];

const Gallery = () => {
	const [active, setActive] = useState(1);

	const handlePrev = () =>
		setActive((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
	const handleNext = () =>
		setActive((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));

	return (
		<div className="bg-black px-8 py-16">
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
				{/* Left Section */}
				<div className="flex flex-col justify-center items-center h-full">
					<h1
						className="text-4xl font-black text-white mb-4 text-center w-full"
						style={{ fontFamily: "Arial Rounded MT Bold", display: "block" }}
					>
						Team Puviyan: Walking the Talk on World Environment Day 2025
					</h1>
					<p className="text-lg text-white mb-8 text-justify">
						On World Environment Day 2025, Team Puviyan proudly joined the global
						movement led by the United Nations Environment Programme, united under
						this year’s theme: “Beat Plastic Pollution.”
						<br />
						<br />
						As part of this initiative, we embraced a personal commitment: “I am
						Puviyan. I pledge to beat Plastic Pollution.” Guided by this pledge,
						our team took to the streets of Chennai to engage residents, spark
						conversations, and spotlight the urgent need to reduce single-use
						plastic waste.
						<br />
						<br />
						We distributed reusable cloth bags, encouraging simple, everyday
						actions that help protect the environment. Each cloth bag, when used
						150 times, can save about 0.5 kg of CO₂ emissions and keep 150
						plastic bags out of landfills and waterways. It’s a small switch that
						creates a big impact for our planet and future generations.
					</p>
				</div>

				{/* Right Section – Single Image */}
				<div className="relative flex flex-col items-center justify-center w-full h-full">
					{/* Single Image Display */}
					<div className="flex items-center justify-center w-full">
						<div
							className={`relative rounded-3xl shadow-2xl transition-all duration-300`}
							style={{
								width: 800,
								height: 500,
								overflow: "hidden",
							}}
						>
							<img
								src={carouselData[0].image}
								className="w-full h-full object-contain"
								alt="Gallery Image"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
