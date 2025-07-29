import React, { useState, useEffect } from "react";

const albums = [
	{
		title: "Nature",
		photos: [
			"/images/puviyan_logo.png",
			"/images/Puviyanworld1.jpg",
			"/images/Puv_mob2.jpg",
		],
	},
	{
		title: "Events",
		photos: [
			"/images/puviyan_logo.png",
			"/images/Puviyanworld1.jpg",
			"/images/Puv_mob2.jpg",
		],
	},
	{
		title: "People",
		photos: [
			"/images/puviyan_logo.png",
			"/images/Puviyanworld1.jpg",
			"/images/Puv_mob2.jpg",
		],
	},
	{
		title: "Nature",
		photos: [
			"/images/puviyan_logo.png",
			"/images/Puviyanworld1.jpg",
			"/images/Puv_mob2.jpg",
		],
	},
	{
		title: "Events",
		photos: [
			"/images/puviyan_logo.png",
			"/images/Puviyanworld1.jpg",
			"/images/Puv_mob2.jpg",
		],
	},
	{
		title: "People",
		photos: [
			"/images/puviyan_logo.png",
			"/images/Puviyanworld1.jpg",
			"/images/Puv_mob2.jpg",
		],
	},
];

const Gallery = () => {
	const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
	const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
	const [showPopup, setShowPopup] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 640);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const openAlbum = (albumIdx: number) => {
		setSelectedAlbum(albumIdx);
		setSelectedPhoto(0);
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
		setSelectedAlbum(null);
		setSelectedPhoto(0);
	};

	return (
		<section id="gallery" className="w-full min-h-screen bg-white py-8 flex flex-col items-center justify-center">
			{!isMobile && (
				<h1
					className="text-4xl font-black text-gray-600 mb-2 text-center w-full -mt-20"
					style={{ fontFamily: "Arial Rounded MT Bold", display: "block" }}
				>
					Community
				</h1>
			)}
			{/* Cards Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
				{albums.map((album, idx) => (
					<div
						key={album.title + idx}
						className="flex flex-col items-center cursor-pointer bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
						onClick={() => openAlbum(idx)}
					>
						<img
							src={album.photos[0]}
							alt={album.title}
							className="w-40 h-40 object-cover rounded-md mb-4"
							loading="lazy"
						/>
						<span className="font-semibold text-xl">{album.title}</span>
					</div>
				))}
			</div>
			{/* Popup for individual photos */}
			{showPopup && selectedAlbum !== null && (
				<div
					className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]"
					style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
					onClick={closePopup}
				>
					<div
						className="relative flex flex-col items-center"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-2 right-2 text-white text-3xl font-bold z-10"
							onClick={closePopup}
							aria-label="Close"
							style={{ right: "-2rem", top: "-2rem" }}
						>
							×
						</button>
						<div className="relative flex items-center">
							{/* Left Arrow */}
							<button
								className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 rounded-full p-2 z-10 hover:bg-opacity-70"
								onClick={() =>
									setSelectedPhoto((prev) =>
										prev === 0
											? albums[selectedAlbum].photos.length - 1
											: prev - 1
									)
								}
								aria-label="Previous Photo"
							>
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<img
								src={albums[selectedAlbum].photos[selectedPhoto]}
								alt={`Photo ${selectedPhoto + 1}`}
								className="w-[95vw] h-[90vh] object-contain rounded-lg shadow-2xl mb-4"
								style={{ background: "transparent" }}
							/>
							{/* Right Arrow */}
							<button
								className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 rounded-full p-2 z-10 hover:bg-opacity-70"
								onClick={() =>
									setSelectedPhoto((prev) =>
										prev === albums[selectedAlbum].photos.length - 1
											? 0
											: prev + 1
									)
								}
								aria-label="Next Photo"
							>
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
						<div className="flex items-center justify-between w-full mt-2">
							<span className="font-semibold text-lg text-white drop-shadow">
								{albums[selectedAlbum].title}
							</span>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Gallery;