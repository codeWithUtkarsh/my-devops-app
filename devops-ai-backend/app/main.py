from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List, Optional
from anthropic import AsyncAnthropic
import json
import os
import logging
from uuid import uuid4

from .database import get_db, init_db
from .chat_storage import ChatStorage
from .config import get_settings, Settings

# Models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    chat_id: Optional[str] = Field(default_factory=lambda: str(uuid4()))
    messages: List[Message]

class ChatResponse(BaseModel):
    chat_id: str
    response: str

# Initialize FastAPI with title and description
app = FastAPI(
    title="Chat API",
    description="API for chat interactions with Claude",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Anthropic client on startup
@app.on_event("startup")
async def startup_event():
    init_db()

client = AsyncAnthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),  # This is the default and can be omitted
)


@app.get("/", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "chat-api"}

@app.post("/api/chat", tags=["Chat"])
async def chat(
        request: ChatRequest,
        db: Session = Depends(get_db)
):
    """
    Send a message to chat and get a streaming response.

    - If chat_id is not provided, a new chat will be created
    - The response will be streamed as server-sent events
    - Message history is maintained for context
    """
    try:
        logging.info(request)
        chat_storage = ChatStorage(db)

        # Get existing chat context
        context = chat_storage.get_recent_context(request.chat_id)

        # Combine context with new messages
        all_messages = context + [
            {"role": msg.role, "content": msg.content}
            for msg in request.messages
        ]

        # Create streaming response
        async def generate():
            stream = await client.messages.create(
                model="claude-3-5-sonnet-latest",
                max_tokens=8192,
                messages=all_messages,
                stream=True
            )

            full_response = ""

            async for chunk in stream:
                if chunk.type == "content_block_delta":
                    full_response += chunk.delta.text
                    yield f"data: {json.dumps({'text': chunk.delta.text})}\n\n"
                elif chunk.type == "message_delta":
                    if chunk.delta.stop_reason:
                        # Store the assistant's response
                        chat_storage.add_message(
                            request.chat_id,
                            {"role": "assistant", "content": full_response}
                        )
                        yield f"data: {json.dumps({'finish_reason': chunk.delta.stop_reason, 'chat_id': request.chat_id})}\n\n"

            # Store the user's messages
            for message in request.messages:
                chat_storage.add_message(
                    request.chat_id,
                    {"role": message.role, "content": message.content}
                )

            yield "data: [DONE]\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get("/api/chat/{chat_id}/history", tags=["Chat"])
async def get_chat_history(
        chat_id: str,
        limit: Optional[int] = 50,
        db: Session = Depends(get_db)
):
    """
    Retrieve chat history for a specific chat.

    Parameters:
    - chat_id: The ID of the chat to retrieve
    - limit: Maximum number of messages to return (default: 50)
    """
    try:
        chat_storage = ChatStorage(db)
        history = chat_storage.get_chat_history(chat_id, limit)
        return {
            "chat_id": chat_id,
            "history": history,
            "message_count": len(history)
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve chat history: {str(e)}"
        )

@app.delete("/api/chat/{chat_id}", tags=["Chat"])
async def delete_chat(
        chat_id: str,
        db: Session = Depends(get_db)
):
    """
    Delete a chat and all its messages.

    Parameters:
    - chat_id: The ID of the chat to delete
    """
    try:
        chat_storage = ChatStorage(db)
        # Note: You'll need to add this method to ChatStorage
        chat_storage.delete_chat(chat_id)
        return {"status": "success", "message": f"Chat {chat_id} deleted"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete chat: {str(e)}"
        )

@app.get("/api/chats", tags=["Chat"])
async def list_chats(
        limit: Optional[int] = 10,
        offset: Optional[int] = 0,
        db: Session = Depends(get_db)
):
    """
    List all chats with pagination.

    Parameters:
    - limit: Maximum number of chats to return (default: 10)
    - offset: Number of chats to skip (default: 0)
    """
    try:
        chat_storage = ChatStorage(db)
        # Note: You'll need to add this method to ChatStorage
        chats = chat_storage.list_chats(limit, offset)
        return {
            "chats": chats,
            "count": len(chats),
            "offset": offset,
            "limit": limit
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to list chats: {str(e)}"
        )

# Example of a more complex endpoint
@app.post("/api/chat/{chat_id}/enhance", tags=["Chat"])
async def enhance_chat(
        chat_id: str,
        request: ChatRequest,
        db: Session = Depends(get_db),
):
    """
    Enhance a message with additional context before sending.

    This endpoint demonstrates how to modify the user's message
    before sending it to the AI model.
    """
    try:
        chat_storage = ChatStorage(db)

        # Get existing context
        context = chat_storage.get_recent_context(chat_id)

        # Enhance the message with additional instructions
        enhanced_messages = []
        for msg in request.messages:
            if msg.role == "user":
                enhanced_content = f"""Please provide a detailed and technical response to:

{msg.content}

Include:
- Specific examples
- Best practices
- Common pitfalls
- Code snippets where appropriate
"""
                enhanced_messages.append({"role": msg.role, "content": enhanced_content})
            else:
                enhanced_messages.append({"role": msg.role, "content": msg.content})

        # Combine context with enhanced messages
        all_messages = context + enhanced_messages

        # Create streaming response with enhanced messages
        async def generate():
            stream = await client.messages.create(
                model="claude-3-5-sonnet-latest",
                max_tokens=8192,
                messages=all_messages,
                stream=True
            )

            full_response = ""

            async for chunk in stream:
                if chunk.type == "content_block_delta":
                    full_response += chunk.delta.text
                    yield f"data: {json.dumps({'text': chunk.delta.text})}\n\n"
                elif chunk.type == "message_delta":
                    if chunk.delta.stop_reason:
                        chat_storage.add_message(
                            chat_id,
                            {"role": "assistant", "content": full_response}
                        )
                        yield f"data: {json.dumps({'finish_reason': chunk.delta.stop_reason, 'chat_id': chat_id})}\n\n"

            # Store the original (not enhanced) messages
            for message in request.messages:
                chat_storage.add_message(
                    chat_id,
                    {"role": message.role, "content": message.content}
                )

            yield "data: [DONE]\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

if __name__ == "__main__":
    import uvicorn
    settings = get_settings()
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.environment == "development"
    )
