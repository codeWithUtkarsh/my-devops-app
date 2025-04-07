from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List, Optional
import anthropic
import json
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

# FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

def get_anthropic_client(settings: Settings = Depends(get_settings)) -> anthropic.Client:
    return anthropic.Client(api_key=settings.anthropic_api_key)

@app.post("/api/chat")
async def chat(
        request: ChatRequest,
        db: Session = Depends(get_db),
        client: anthropic.Client = Depends(get_anthropic_client),
        settings: Settings = Depends(get_settings)
):
    try:
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
                model="claude-3-sonnet-20240320",
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
                        yield f"data: {json.dumps({'finish_reason': chunk.delta.stop_reason})}\n\n"

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
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/chat/{chat_id}/history")
def get_chat_history(
        chat_id: str,
        limit: Optional[int] = 50,
        db: Session = Depends(get_db)
):
    """Endpoint to retrieve chat history"""
    try:
        chat_storage = ChatStorage(db)
        history = chat_storage.get_chat_history(chat_id, limit)
        return {"chat_id": chat_id, "history": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    settings = get_settings()
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.environment == "development"
    )