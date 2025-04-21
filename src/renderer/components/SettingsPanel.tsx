import React, { ChangeEvent } from "react";

export interface Settings {
	directory: string;
	intervalMs: number;
	format: "png" | "jpg";
}

interface SettingsPanelProps {
	disabled: boolean;
	settings: Settings;
	setSettings: React.Dispatch<React.SetStateAction<Settings>>;
	startCapture: () => void;
	stopCapture: () => void;
}

function SettingsPanel({
	disabled,
	settings,
	setSettings,
	startCapture,
	stopCapture,
}: SettingsPanelProps) {
	const handleUpdate = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setSettings((prevSettings) => ({
			...prevSettings,
			[name]: name === "intervalMs" ? parseInt(value, 10) : value,
		}));
	};

	return (
		<div className="bg-[rgb(50,50,50)] text-white p-6 rounded-lg shadow-md mb-6">
			<h2 className="text-xl mb-4">
				Settings {disabled ? "(Editing disabled)" : ""}
			</h2>

			{/* Directory */}
			<div className="mb-4">
				<label className="block text-sm font-medium">Directory</label>
				<input
					type="text"
					name="directory"
					value={settings.directory}
					onChange={handleUpdate}
					disabled={disabled}
					className="w-full p-2 border border-gray-300 rounded mt-2"
				/>
			</div>

			{/* Interval */}
			<div className="mb-4">
				<label className="block text-sm font-medium">
					Interval (ms)
				</label>
				<input
					type="number"
					name="intervalMs"
					value={settings.intervalMs}
					onChange={handleUpdate}
					disabled={disabled}
					className="w-full p-2 border border-gray-300 rounded mt-2"
				/>
			</div>

			{/* Format */}
			<div className="mb-4">
				<label className="block text-sm font-medium">
					Image Format
				</label>
				<select
					name="format"
					value={settings.format}
					onChange={handleUpdate}
					disabled={disabled}
					className="w-full p-2 border border-gray-300 rounded mt-2"
				>
					<option value="png">PNG</option>
					<option value="jpg">JPG</option>
				</select>
			</div>

			<div className="mb-4 rounded flex grid grid-cols-2 gap-4">
				<button
					className={
						"bg-green-500 p-2 border rounded hover:bg-green-600 text-white " +
						(disabled ? "hidden" : "")
					}
					onClick={() => startCapture()}
				>
					Start
				</button>
				<button
					className={
						"bg-red-500 p-2 border rounded hover:bg-red-600 text-white " +
						(disabled ? "" : "hidden")
					}
					onClick={() => stopCapture()}
				>
					Stop
				</button>
			</div>
		</div>
	);
}

export default SettingsPanel;
