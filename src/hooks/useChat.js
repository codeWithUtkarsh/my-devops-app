import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const useChat = (
  activeFile,
  fileContents,
  updateFileContent,
  saveFileToS3,
) => {
  const [chatMessages, setChatMessages] = useState([
    {
      type: "system",
      content: "I'm your Terraform assistant. I can help you with:",
      list: [
        "Writing and modifying Terraform configurations",
        "AWS resource configuration",
        "Best practices and security recommendations",
        "Infrastructure optimization",
      ],
      closing: "What would you like help with?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState("1");

  // Function to call the API
  const callChatAPI = async (message) => {
    try {
      const request_data = JSON.stringify({
        chat_id: chatId,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        context: {
          activeFile,
          fileContent: fileContents[activeFile],
        },
      });

      console.log("Request:", request_data);

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: request_data,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Get the full text response
      const responseText = await response.text();
      console.log("Raw response:", responseText.substring(0, 200));

      // Process streaming SSE format
      // Split by "data:" and process each chunk
      const chunks = responseText.split("data:");
      let fullText = "";
      let fileUpdates = [];
      let finishReason = null;

      for (let chunk of chunks) {
        chunk = chunk.trim();
        if (!chunk) continue;

        // Handle the [DONE] marker
        if (chunk === "[DONE]") {
          break;
        }

        try {
          const parsedChunk = JSON.parse(chunk);

          // Handle text chunks
          if (parsedChunk.text) {
            fullText += parsedChunk.text;
          }

          // Handle file updates if present
          if (parsedChunk.fileUpdates) {
            fileUpdates = [...fileUpdates, ...parsedChunk.fileUpdates];
          }

          // Capture finish reason if present
          if (parsedChunk.finish_reason) {
            finishReason = parsedChunk.finish_reason;
          }

          // Update chat ID if present
          if (parsedChunk.chat_id) {
            setChatId(parsedChunk.chat_id);
          }
        } catch (e) {
          console.warn("Failed to parse chunk:", chunk, e);
        }
      }

      console.log("Processed response:", {
        content: fullText,
        fileUpdates,
        finishReason,
      });

      // Return the processed response in the expected format
      return {
        content:
          fullText ||
          "I received your message but couldn't generate a proper response.",
        list: [], // If your API sends back list items, you'd process them here
        closing: "", // If your API sends a closing statement, you'd include it here
        fileUpdates: fileUpdates || [],
      };
    } catch (error) {
      console.error("Chat API Error:", error);
      return {
        content: `Sorry, I encountered an error while processing your request: ${error.message}`,
        list: [],
        closing: "Please try again or contact support if the problem persists.",
      };
    }
  };

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      // Add user message
      const userMessage = { type: "user", content: chatInput };
      setChatMessages((prev) => [...prev, userMessage]);

      // Clear input and show loading
      const messageToProcess = chatInput;
      setChatInput("");
      setIsLoading(true);

      try {
        // Call the API
        const apiResponse = await callChatAPI(messageToProcess);

        // Use API response
        setChatMessages((prev) => [
          ...prev,
          {
            type: "system",
            ...apiResponse,
          },
        ]);

        // Handle any file updates if included
        if (apiResponse.fileUpdates && apiResponse.fileUpdates.length > 0) {
          for (const update of apiResponse.fileUpdates) {
            if (update.fileName && update.content) {
              updateFileContent(update.fileName, update.content);
              if (update.saveToS3) {
                await saveFileToS3(update.fileName, update.content);
              }
            }
          }
        }
      } catch (error) {
        console.error("Chat error:", error);
        // Add error message to chat
        setChatMessages((prev) => [
          ...prev,
          {
            type: "system",
            content: `An unexpected error occurred: ${error.message}`,
            list: [],
            closing:
              "Please try again or contact support if the problem persists.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const enhancePrompt = (currentFile) => {
    const enhancedPrompt = `For the file ${currentFile}, I want to: ${chatInput}`;
    setChatInput(enhancedPrompt);
  };

  const addSystemMessage = (message) => {
    setChatMessages((prev) => [
      ...prev,
      {
        type: "system",
        ...message,
      },
    ]);
  };

  return {
    chatMessages,
    setChatMessages,
    chatInput,
    setChatInput,
    isLoading,
    chatId,
    setChatId,
    handleSendMessage,
    handleKeyDown,
    enhancePrompt,
    addSystemMessage,
  };
};

export default useChat;
