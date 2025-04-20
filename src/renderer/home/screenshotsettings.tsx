import { useState } from "react";
import {
	FolderOpen,
	ImageIcon,
	TimerIcon,
	PlayIcon,
	SoupIcon,
} from "lucide-react";

export default function ScreenshotSettings() {
	const [isCapturing, setIsCapturing] = useState(false);
	const [interval, setInterval] = useState("5");
	const [folderPath, setFolderPath] = useState("");
	const [imageFormat, setImageFormat] = useState("png");

	const toggleCapture = () => setIsCapturing(!isCapturing);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
			<div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
				<h1 className="text-2xl font-bold text-center mb-6">
					Screenshot Capture
				</h1>

				<div className="mb-4">
					<label
						htmlFor="interval"
						className="block font-medium mb-1 flex items-center gap-2"
					>
						<TimerIcon className="w-4 h-4" /> Capture Interval
						(seconds)
					</label>
					<input
						id="interval"
						type="number"
						value={interval}
						onChange={(e) => setInterval(e.target.value)}
						min={1}
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="folder"
						className="block font-medium mb-1 flex items-center gap-2"
					>
						<FolderOpen className="w-4 h-4" /> Destination Folder
					</label>
					<input
						id="folder"
						type="text"
						value={folderPath}
						onChange={(e) => setFolderPath(e.target.value)}
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="/path/to/folder"
					/>
				</div>

				<div className="mb-6">
					<label className="block font-medium mb-1 flex items-center gap-2">
						<ImageIcon className="w-4 h-4" /> Image Format
					</label>
					<select
						value={imageFormat}
						onChange={(e) => setImageFormat(e.target.value)}
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="png">PNG</option>
						<option value="jpg">JPG</option>
					</select>
				</div>

				<button
					onClick={toggleCapture}
					className={`w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white rounded-lg transition-colors ${
						isCapturing
							? "bg-red-500 hover:bg-red-600"
							: "bg-blue-500 hover:bg-blue-600"
					}`}
				>
					{isCapturing ? (
						<SoupIcon className="w-4 h-4" />
					) : (
						<PlayIcon className="w-4 h-4" />
					)}
					{isCapturing ? "Stop Capturing" : "Start Capturing"}
				</button>
			</div>
		</div>
	);
}
