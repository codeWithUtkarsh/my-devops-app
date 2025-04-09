from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict
from .database import Chat, Message

class ChatStorage:
    def __init__(self, session: Session):
        self.session = session

    def get_chat_history(self, chat_id: str, limit: int = 50) -> List[Dict]:
        """Retrieve chat history for a given chat ID"""
        messages = (
            self.session.query(Message)
            .filter(Message.chat_id == chat_id)
            .order_by(Message.sequence)
            .limit(limit)
            .all()
        )

        return [
            {"role": msg.role, "content": msg.content}
            for msg in messages
        ]

    def add_message(self, chat_id: str, message: Dict):
        """Add a new message to the chat history"""
        # Get the next sequence number
        next_sequence = (
                self.session.query(func.coalesce(func.max(Message.sequence), 0))
                .filter(Message.chat_id == chat_id)
                .scalar() + 1
        )

        # Create chat if it doesn't exist
        chat = self.session.query(Chat).get(chat_id)
        if not chat:
            chat = Chat(id=chat_id)
            self.session.add(chat)

        # Add message
        new_message = Message(
            chat_id=chat_id,
            role=message["role"],
            content=message["content"],
            sequence=next_sequence
        )
        self.session.add(new_message)
        self.session.commit()

    def get_recent_context(self, chat_id: str, max_messages: int = 10) -> List[Dict]:
        """Get recent context messages for a chat"""
        messages = (
            self.session.query(Message)
            .filter(Message.chat_id == chat_id)
            .order_by(Message.sequence.desc())
            .limit(max_messages)
            .all()
        )

        # Return in chronological order
        return [
            {"role": msg.role, "content": msg.content}
            for msg in reversed(messages)
        ]

        def delete_chat(self, chat_id: str):
            """Delete a chat and all its messages"""
            # Delete messages first due to foreign key constraint
            self.session.query(Message).filter(Message.chat_id == chat_id).delete()
            self.session.query(Chat).filter(Chat.id == chat_id).delete()
            self.session.commit()

        def list_chats(self, limit: int = 10, offset: int = 0):
            """List all chats with pagination"""
            chats = (
                self.session.query(Chat)
                .order_by(Chat.updated_at.desc())
                .offset(offset)
                .limit(limit)
                .all()
            )

            return [
                {
                    "id": chat.id,
                    "created_at": chat.created_at,
                    "updated_at": chat.updated_at,
                    "message_count": (
                        self.session.query(Message)
                        .filter(Message.chat_id == chat.id)
                        .count()
                    )
                }
                for chat in chats
            ]
