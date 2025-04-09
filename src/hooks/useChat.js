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

  // Mock responses based on keywords
  const getMockResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Lambda configuration
    if (lowerInput.includes("lambda")) {
      return {
        type: "system",
        content: "Here's a Lambda function configuration in Terraform:",
        list: [
          `resource "aws_lambda_function" "example" {
  filename      = "lambda_function.zip"
  function_name = "example_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs16.x"

  memory_size = 128
  timeout     = 30

  environment {
    variables = {
      ENV = "production"
    }
  }
}`,
          "You can adjust memory_size (128MB to 10GB)",
          "Timeout can be set up to 15 minutes",
          "Supports various runtimes (Node.js, Python, Java, etc.)",
        ],
        closing:
          "Would you like me to add this Lambda configuration to your current file?",
      };
    }

    // API Gateway configuration
    if (lowerInput.includes("api") || lowerInput.includes("gateway")) {
      return {
        type: "system",
        content: "Here's an API Gateway configuration:",
        list: [
          `resource "aws_api_gateway_rest_api" "example" {
  name        = "example-api"
  description = "Example REST API"
}

resource "aws_api_gateway_resource" "example" {
  rest_api_id = aws_api_gateway_rest_api.example.id
  parent_id   = aws_api_gateway_rest_api.example.root_resource_id
  path_part   = "example"
}

resource "aws_api_gateway_method" "example" {
  rest_api_id   = aws_api_gateway_rest_api.example.id
  resource_id   = aws_api_gateway_resource.example.id
  http_method   = "POST"
  authorization = "NONE"
}`,
          "Supports REST and HTTP APIs",
          "Multiple integration types available",
          "Can be connected to Lambda, HTTP endpoints, or other AWS services",
        ],
        closing:
          "Would you like me to help you set up this API Gateway configuration?",
      };
    }

    // DynamoDB configuration
    if (lowerInput.includes("dynamodb")) {
      return {
        type: "system",
        content: "Here's a DynamoDB table configuration:",
        list: [
          `resource "aws_dynamodb_table" "example" {
  name           = "example-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  range_key      = "created_at"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "S"
  }

  tags = {
    Environment = "production"
  }
}`,
          "Supports both provisioned and on-demand capacity",
          "Global secondary indexes available",
          "Point-in-time recovery and server-side encryption options",
        ],
        closing:
          "Would you like me to add this DynamoDB configuration to your current file?",
      };
    }

    // S3 bucket configuration
    if (lowerInput.includes("s3") || lowerInput.includes("bucket")) {
      return {
        type: "system",
        content: "Here's an S3 bucket configuration with best practices:",
        list: [
          `resource "aws_s3_bucket" "example" {
  bucket = "my-unique-bucket-name"
}

resource "aws_s3_bucket_versioning" "example" {
  bucket = aws_s3_bucket.example.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "example" {
  bucket = aws_s3_bucket.example.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}`,
          "Includes versioning configuration",
          "Server-side encryption enabled",
          "Best practices for security applied",
        ],
        closing: "Would you like me to add this S3 bucket configuration?",
      };
    }

    // Default response
    return {
      type: "system",
      content: `I can help you with the ${activeFile} file. Here are some suggestions:`,
      list: [
        "Add new AWS resources",
        "Modify existing configurations",
        "Implement security best practices",
        "Optimize your infrastructure",
      ],
      closing: "What specific changes would you like to make?",
    };
  };

  // Function to call actual API
  const callChatAPI = async (message) => {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          // If you still need to send context, you could add it here
          // context: {
          //   activeFile,
          //   fileContent: fileContents[activeFile],
          // },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Chat API Error:", error);
      return null;
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
        // Try to call actual API first
        const apiResponse = await callChatAPI(messageToProcess);

        if (apiResponse) {
          // Use API response
          setChatMessages((prev) => [
            ...prev,
            {
              type: "system",
              ...apiResponse,
            },
          ]);

          // Handle any file updates if included
          if (apiResponse.fileUpdates) {
            for (const update of apiResponse.fileUpdates) {
              if (update.fileName && update.content) {
                updateFileContent(update.fileName, update.content);
                if (update.saveToS3) {
                  await saveFileToS3(update.fileName, update.content);
                }
              }
            }
          }
        } else {
          // Fallback to mock response if API fails
          const mockResponse = getMockResponse(messageToProcess);
          setChatMessages((prev) => [...prev, mockResponse]);
        }
      } catch (error) {
        console.error("Chat error:", error);
        // Use mock response as fallback
        const mockResponse = getMockResponse(messageToProcess);
        setChatMessages((prev) => [...prev, mockResponse]);
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
