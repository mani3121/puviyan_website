import React, { useState, useEffect, useRef, useCallback } from "react";

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
	const [carouselIndex, setCarouselIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);

	// Auto-move carousel every 3 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCarouselIndex((prev) => (prev + 1) % albums.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	// Scroll to the current album
	useEffect(() => {
		if (carouselRef.current) {
			const albumWidth = carouselRef.current.firstChild
				? (carouselRef.current.firstChild as HTMLElement).clientWidth + 24 // 24px gap-6
				: 0;
			carouselRef.current.scrollTo({
				left: albumWidth * carouselIndex,
				behavior: "smooth",
			});
		}
	}, [carouselIndex]);

	const openAlbum = (albumIdx: number) => {
		setSelectedAlbum(albumIdx);
		setSelectedPhoto(0);
		setShowPopup(true);
	};

	const nextPhoto = () => {
		if (selectedAlbum !== null) {
			setSelectedPhoto((prev) =>
				prev < albums[selectedAlbum].photos.length - 1 ? prev + 1 : 0
			);
		}
	};

	// Close popup on Escape key
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setShowPopup(false);
				setSelectedAlbum(null);
				setSelectedPhoto(0);
			}
		},
		[]
	);

	useEffect(() => {
		if (showPopup) {
			window.addEventListener("keydown", handleKeyDown);
		} else {
			window.removeEventListener("keydown", handleKeyDown);
		}
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [showPopup, handleKeyDown]);

	const closePopup = () => {
		setShowPopup(false);
		setSelectedAlbum(null);
		setSelectedPhoto(0);
	};

	const prevAlbum = () => {
		setCarouselIndex((prev) => (prev - 1 + albums.length) % albums.length);
	};

	const nextAlbum = () => {
		setCarouselIndex((prev) => (prev + 1) % albums.length);
	};

	return (
		<section id="gallery" className="w-full bg-white py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h2
					className="text-3xl font-bold text-center mb-6"
					style={{ fontFamily: "Arial Black" }}
				>
					Gallery
				</h2>
				{/* Carousel of Albums */}
				<div className="relative flex items-center">
					{/* Left Arrow */}
					<button
						className="absolute left-0 z-10 bg-white bg-opacity-80 rounded-full shadow p-2 hover:bg-gray-200 transition"
						style={{ top: "50%", transform: "translateY(-50%)" }}
						onClick={prevAlbum}
						aria-label="Previous Album"
					>
						<svg
							className="w-6 h-6 text-gray-700"
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
					{/* Carousel */}
					<div
						ref={carouselRef}
						className="flex flex-row gap-6 justify-center pb-4 no-scrollbar overflow-x-hidden w-full"
						style={{ scrollBehavior: "smooth" }}
					>
						{albums.map((album, idx) => (
							<div
								key={album.title + idx}
								className="flex flex-col items-center cursor-pointer bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 min-w-[180px]"
								onClick={() => openAlbum(idx)}
								style={{
									border:
										carouselIndex === idx
											? "2px solid #2563eb"
											: "2px solid transparent",
									transition: "border 0.2s",
								}}
							>
								<img
									src={album.photos[0]}
									alt={album.title}
									className="w-32 h-32 object-cover rounded-md mb-2"
									loading="lazy"
								/>
								<span className="font-semibold text-lg">{album.title}</span>
							</div>
						))}
					</div>
					{/* Right Arrow */}
					<button
						className="absolute right-0 z-10 bg-white bg-opacity-80 rounded-full shadow p-2 hover:bg-gray-200 transition"
						style={{ top: "50%", transform: "translateY(-50%)" }}
						onClick={nextAlbum}
						aria-label="Next Album"
					>
						<svg
							className="w-6 h-6 text-gray-700"
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
				{/* Popup for individual photos */}
				{showPopup && selectedAlbum !== null && (
					<div
						className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]" // z-[9999] ensures it's above all other content including header
						style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
						onClick={closePopup}
					>
						<div
							className="relative flex flex-col items-center"
							onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
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
			</div>
			{/* Hide scrollbar */}
			<style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
		</section>
	);
};

export default Gallery;