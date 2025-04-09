import React from "react";

const ChatPanel = ({
  chatMessages,
  chatInput,
  setChatInput,
  isLoading,
  handleSendMessage,
  handleKeyDown,
  chatId,
  setChatId,
  enhancePrompt,
  handleSaveCurrentFile,
}) => {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto min-h-0">
        <div className="p-4 space-y-6">
          {chatMessages.map((message, index) =>
            message.type === "system" ? (
              <div key={index} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-accent-500 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                      <path d="M20.96 11.5A9 9 0 1 1 11.5 2.04"></path>
                      <circle cx="12" cy="12" r="2.5"></circle>
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="text-white">{message.content}</p>
                    {message.list && (
                      <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                        {message.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {message.orderedList && (
                      <ol className="list-decimal pl-5 mt-2 text-gray-300 space-y-1">
                        {message.orderedList.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ol>
                    )}
                    {message.closing && (
                      <p className="mt-2 text-white">{message.closing}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={index} className="bg-gray-800 rounded-lg p-4 ml-8">
                <div className="flex items-start">
                  <div className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="text-white">{message.content}</p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-800 p-4 shrink-0">
        <div className="relative">
          <textarea
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 pr-12 resize-none text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-500"
            placeholder="Ask about the Terraform code or request modifications..."
            rows={3}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          ></textarea>
          <button
            className={`absolute right-3 bottom-3 ${
              isLoading ? "bg-gray-600" : "bg-accent-500 hover:bg-accent-600"
            } text-white p-2 rounded-md`}
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
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
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <div>Use Shift+Enter for new lines</div>
          <div className="flex gap-3 items-center">
            <div className="text-gray-400">
              Chat ID:{" "}
              <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="w-8 bg-gray-800 border border-gray-700 rounded px-1 focus:outline-none focus:border-accent-500"
              />
            </div>
            <button
              className="flex items-center gap-1 text-gray-400 hover:text-accent-500"
              onClick={enhancePrompt}
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
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
              Enhance Prompt
            </button>
            <button
              className="flex items-center gap-1 text-gray-400 hover:text-accent-500"
              onClick={handleSaveCurrentFile}
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
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
              </svg>
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
