import React from "react";

const CodeEditor = ({
  files,
  activeFile,
  setActiveFile,
  fileContents,
  handleFileContentChange,
  isLoadingFiles,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Tabs */}
      <div className="flex bg-gray-800 border-b border-gray-700">
        {files.map((file) => (
          <button
            key={file.name}
            onClick={() => setActiveFile(file.name)}
            className={`px-4 py-2 text-sm border-r border-gray-700 ${
              activeFile === file.name
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-4">
        {isLoadingFiles ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full"></div>
          </div>
        ) : errorMessage ? (
          <div className="text-red-500 p-4">{errorMessage}</div>
        ) : (
          <div className="flex">
            {/* Line Numbers */}
            <div className="pr-4 text-gray-500 select-none text-right font-mono">
              {(fileContents[activeFile] || "").split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Text Area */}
            <textarea
              value={fileContents[activeFile] || ""}
              onChange={handleFileContentChange}
              className="flex-1 bg-gray-900 text-white font-mono border-0 outline-none resize-none"
              style={{
                minHeight: "100%",
                lineHeight: "1.5",
                whiteSpace: "pre",
                overflowWrap: "normal",
                overflowX: "auto",
              }}
              spellCheck="false"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
