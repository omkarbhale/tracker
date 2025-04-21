import React, { useState, useEffect } from "react";
// import { ipcRenderer } from "electron";

function Sidebar() {
	const [folders, setFolders] = useState([]);

	useEffect(() => {
		const fetchFolders = async () => {
			const folderList = await window.api.invoke("get-folders");
			setFolders(folderList);
		};
		fetchFolders();
	}, []);

	return (
		<div className="w-64 bg-white shadow-md p-4">
			<h2 className="text-xl mb-4">Folders</h2>
			<ul>
				{folders.map((folder, index) => (
					<li
						key={index}
						className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
					>
						{folder}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Sidebar;
