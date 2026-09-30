from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid


class Message(Base):
    __tablename__ = "messages"

    id         = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    content    = Column(Text, nullable=False)
    sender     = Column(String(150))
    created_at = Column(DateTime, server_default=func.now())

    project = relationship("Project", back_populates="messages")