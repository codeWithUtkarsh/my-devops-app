// src/components/TerraformEditor/FileExplorer.js
import React from "react";

const FileExplorer = ({
  files,
  activeFile,
  setActiveFile,
  saveFileToS3,
  deleteFileFromS3,
  createNewFile,
}) => {
  const handleNewFile = async () => {
    const fileName = prompt("Enter new file name (with .tf extension):");
    if (fileName) {
      if (!fileName.endsWith(".tf")) {
        alert("File name must end with .tf");
        return;
      }

      const result = await createNewFile(fileName);
      if (!result.success) {
        alert(result.message || "Failed to create file");
      }
    }
  };

  const handleDeleteFile = async (fileName) => {
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      await deleteFileFromS3(fileName);
    }
  };

  return (
    <div className="border-t border-gray-800 h-1/3 bg-gray-900 flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <div className="text-sm font-medium">Terraform Files</div>
        <div className="flex">
          <button
            className="p-1 text-gray-400 hover:text-white"
            onClick={() => {
              // Could implement a new folder creation functionality here
              console.log("Create folder clicked");
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
            </svg>
          </button>
          <button
            className="p-1 text-gray-400 hover:text-white ml-1"
            onClick={handleNewFile}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-auto flex-1 p-2">
        <div className="flex items-center text-gray-300 hover:bg-gray-800 p-1 rounded cursor-pointer">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ECC94B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          modules/
        </div>
        {files.map((file) => (
          <div
            key={file.name}
            className={`flex items-center justify-between ${activeFile === file.name ? "text-accent-500 font-medium bg-gray-800" : "text-gray-300 hover:bg-gray-800"} p-1 rounded cursor-pointer`}
            onClick={() => setActiveFile(file.name)}
          >
            <div className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={activeFile === file.name ? "#3B82F6" : "#60A5FA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {file.name}
            </div>
            <div className="flex items-center">
              <button
                className="p-1 text-gray-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  saveFileToS3(file.name, file.content);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </button>
              <button
                className="p-1 text-gray-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.name);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
