import { API_CONFIG } from "../config/api";

export const chatService = {
  sendMessage: async (chatId, message, context) => {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`, // if needed
          },
          body: JSON.stringify({
            chat_id: chatId,
            message: message,
            context: {
              activeFile: context.activeFile,
              fileContent: context.fileContent,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Chat API Error:", error);
      throw error;
    }
  },
};
