import React from "react";

interface Screenshot {
	path: string;
	filename: string;
}

interface ScreenshotGalleryProps {
	screenshots: Screenshot[];
}

function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl mb-4">Captured Screenshots</h2>

			<div className="grid grid-cols-3 gap-4">
				{screenshots.length === 0 ? (
					<p>No screenshots captured yet.</p>
				) : (
					screenshots.map((screenshot, index) => (
						<div
							key={index}
							className="border border-gray-200 rounded-lg p-2"
						>
							<img
								src={screenshot.path}
								alt={`Screenshot ${index}`}
								className="w-full h-auto rounded"
							/>
							<p className="text-center text-sm mt-2">
								{screenshot.filename}
							</p>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default ScreenshotGallery;
