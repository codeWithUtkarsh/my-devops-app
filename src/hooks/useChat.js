import { useState } from "react";

export const useChat = (
  activeFile,
  fileContents,
  updateFileContent,
  saveFileToS3,
) => {
  const [chatMessages, setChatMessages] = useState([
    {
      type: "system",
      content:
        "I've generated Terraform code for your Express.js API based on the analyzed repository structure. The infrastructure includes:",
      list: [
        "API Gateway for RESTful endpoints",
        "Lambda functions for authentication and API logic",
        "DynamoDB as a NoSQL database replacement for MongoDB",
        "Parameter Store for environment variables and secrets",
      ],
      closing:
        "You can edit any of the files to customize your infrastructure. What specific aspects would you like to modify?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState("1");

  // Mock responses based on keywords
  const getMockResponse = (message) => {
    if (message.toLowerCase().includes("lambda")) {
      return {
        type: "system",
        content:
          "I'll help you with Lambda configuration. Here are the key parameters you can modify:",
        list: [
          "Memory size (128MB to 10GB)",
          "Timeout (up to 15 minutes)",
          "Runtime environment",
          "Environment variables",
        ],
        closing: "Which of these would you like to adjust?",
      };
    }

    if (message.toLowerCase().includes("api gateway")) {
      return {
        type: "system",
        content: "For API Gateway configuration, you can modify:",
        list: [
          "Endpoint types (Regional, Edge, Private)",
          "Authentication methods",
          "Request/Response mappings",
          "Stage variables",
        ],
        closing: "What aspects of the API Gateway would you like to configure?",
      };
    }

    if (message.toLowerCase().includes("dynamodb")) {
      return {
        type: "system",
        content: "For DynamoDB configuration, consider these settings:",
        list: [
          "Read/Write capacity modes",
          "Global secondary indexes",
          "Encryption settings",
          "Backup configurations",
        ],
        closing: "Which DynamoDB settings would you like to modify?",
      };
    }

    // Default response
    return {
      type: "system",
      content: `I can help you with the ${activeFile} configuration. Here are some common tasks:`,
      list: [
        "Modify resource configurations",
        "Add new resources",
        "Update provider settings",
        "Configure variables and outputs",
      ],
      closing: "What would you like to do?",
    };
  };

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      // Add user message
      setChatMessages((prev) => [
        ...prev,
        { type: "user", content: chatInput },
      ]);

      // Clear input and show loading
      const messageToProcess = chatInput;
      setChatInput("");
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get mock response
      const response = getMockResponse(messageToProcess);

      // Add system response
      setChatMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const enhancePrompt = (currentFile) => {
    const enhancedPrompt = `I'm working on the file ${currentFile}. Here's what I'd like help with: ${chatInput}`;
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
