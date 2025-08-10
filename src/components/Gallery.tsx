import { useState } from "react";

const carouselData = [
	{
		image: "/images/Home_at_mob.jpg",
		bg: "bg-[#c7d2d6]",
		text: "text-[#e76b5b]",
	},
	{
		image: "/images/Home_bt_mob.jpg",
		bg: "bg-[#b6a6d6]",
		text: "text-[#ff7e6b]",
	},
	{
		image: "/images/Home_at_mob.jpg",
		bg: "bg-[#f7e1c7]",
		text: "text-[#e7b86b]",
	},{
		image: "/images/Co2.png",
		bg: "bg-[#f7e1c7]",
		text: "text-[#e7b86b]",
	},
  {
		image: "/images/Mobile7.png",
		bg: "bg-[#f7e1c7]",
		text: "text-[#e7b86b]",
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
						className="text-4xl font-black text-gray-300 mb-4 text-center w-full"
						style={{ fontFamily: "Arial Rounded MT Bold", display: "block" }}
					>
						Team Puviyan: Walking the Talk on World Environment Day 2025
					</h1>
					<p className="text-lg text-gray-400 mb-8 text-center">
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

				{/* Right Section – Custom Carousel */}
				<div className="relative flex flex-col items-center justify-center w-full h-full">
					{/* Carousel Header */}
					<div className="flex w-full items-center justify-between mb-4 px-2">
						
					</div>
					{/* Carousel Cards */}
					<div className="flex items-center justify-center gap-4 w-full">
						{/* Previous Card */}
						<button
							aria-label="Previous"
							onClick={handlePrev}
							className="hidden md:flex items-center justify-center rounded-full bg-white/70 w-8 h-8 shadow hover:bg-white"
							style={{ position: "relative", left: 0, zIndex: 10 }}
						>
							<span className="text-2xl text-gray-500">&#8592;</span>
						</button>
						<div className="flex items-end justify-center gap-4 w-full">
							{/* Left */}
							<div
								className={`hidden md:block rounded-3xl shadow-lg transition-all duration-300 ${carouselData[(active + carouselData.length - 1) % carouselData.length].bg}`}
								style={{
									width: 180,
									height: 420, // increased from 260 to 420
									opacity: 0.7,
									transform: "scale(0.9)",
									overflow: "hidden",
								}}
							>
								<img
									src={carouselData[(active + carouselData.length - 1) % carouselData.length].image}
									className="w-full h-full object-cover"
								/>
								<div className={`absolute bottom-8 left-0 w-full text-center text-3xl font-bold ${carouselData[(active + carouselData.length - 1) % carouselData.length].text}`} style={{ opacity: 0.7 }}>
								</div>
							</div>
							{/* Center */}
							<div
								className={`relative rounded-3xl shadow-2xl transition-all duration-300 ${carouselData[active].bg}`}
								style={{
									width: 260, // increased from 240 to 260
									height: 420, // increased from 340 to 420
									zIndex: 20,
									overflow: "hidden",
								}}
							>
								<img
									src={carouselData[active].image}
									className="w-full h-full object-cover"
								/>
								<div className={`absolute bottom-8 left-0 w-full text-center text-5xl font-bold ${carouselData[active].text}`}>
								</div>
							</div>
							{/* Right */}
							<div
								className={`hidden md:block rounded-3xl shadow-lg transition-all duration-300 ${carouselData[(active + 1) % carouselData.length].bg}`}
								style={{
									width: 180,
									height: 340, // increased from 260 to 340
									opacity: 0.7,
									transform: "scale(0.9)",
									overflow: "hidden",
								}}
							>
								<img
									src={carouselData[(active + 1) % carouselData.length].image}
									className="w-full h-full object-cover"
								/>
								<div className={`absolute bottom-8 left-0 w-full text-center text-3xl font-bold ${carouselData[(active + 1) % carouselData.length].text}`} style={{ opacity: 0.7 }}>
								</div>
							</div>
						</div>
						{/* Next Card */}
						<button
							aria-label="Next"
							onClick={handleNext}
							className="hidden md:flex items-center justify-center rounded-full bg-white/70 w-8 h-8 shadow hover:bg-white"
							style={{ position: "relative", right: 0, zIndex: 10 }}
						>
							<span className="text-2xl text-gray-500">&#8594;</span>
						</button>
					</div>
					{/* Dots */}
					<div className="flex items-center justify-center gap-2 mt-6">
						{carouselData.map((_, idx) => (
							<span
								key={idx}
								className={`inline-block rounded-full transition-all duration-300 ${active === idx ? "bg-gray-700 w-8 h-2" : "bg-gray-400 w-2 h-2"}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
