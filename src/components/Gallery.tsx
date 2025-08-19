import { useRef, useEffect, useState } from "react";

const carouselData = [
	{
		image: "/images/EventCollage1.webp",
		bg: "bg-[#c7d2d6]",
		text: "text-[#e76b5b]",
	},

];

const Gallery = () => {
	const leftRef = useRef<HTMLDivElement>(null);
	const [leftHeight, setLeftHeight] = useState<number | undefined>(undefined);

	useEffect(() => {
		const updateHeight = () => {
			if (leftRef.current) {
				setLeftHeight(leftRef.current.offsetHeight);
			}
		};
		updateHeight();
		window.addEventListener("resize", updateHeight);
		return () => window.removeEventListener("resize", updateHeight);
	}, []);

	return (
		<div className="bg-black px-8 py-4"> {/* Reduced py-16 to py-4 */}
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-[70vh]"> {/* Reduced min-h-[90vh] to min-h-[70vh] */}
				{/* Left Section */}
				<div
					ref={leftRef}
					className="flex flex-col justify-center items-center h-full"
				>
					<h1
						className="text-4xl font-black text-white mb-4 text-center w-full"
						style={{ fontFamily: "Arial Rounded MT Bold", display: "block" }}
					>
						Walking the Talk on World Environment Day 2025
					</h1>
					<p className="text-lg text-white mb-8 text-justify">
						On World Environment Day 2025, Team Puviyan proudly joined the global movement led by the United Nations Environment Programme (UNEP), emphasizing the powerful theme: “Beat Plastic Pollution.”
						<br />
						<br />
					As part of this initiative, we embraced a personal commitment: “I am Puviyan. I pledge to beat Plastic Pollution.” Guided by the pledge, our team took to the streets of Chennai to engage residents, spark conversations, and spotlight the urgent need to reduce single-use plastic waste.
						<br />
						<br />
						We distributed reusable cloth bags, encouraging simple, everyday actions that help protect the environment. Each cloth bag, when used 150 times, can save about 0.5 kg of CO2e emissions and keep 150 plastic bags out of landfills and waterways. It’s a small switch that creates a big impact for our planet and future generations.
					</p>
				</div>

				{/* Right Section – Single Image */}
				<div className="flex flex-col items-center justify-center w-full h-full">
					<div className="flex items-center justify-center w-full">
						<div
							className="relative rounded-3xl shadow-2xl transition-all duration-300 flex items-center justify-center"
							style={{
								width: 800,
								height: leftHeight ? leftHeight : 500,
								overflow: "hidden",
								margin: "0 auto",
							}}
						>
							<img
								src={carouselData[0].image}
								className="object-contain"
								style={{
									width: "100%",
									height: "100%",
									display: "block",
									margin: "0 auto",
								}}
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
