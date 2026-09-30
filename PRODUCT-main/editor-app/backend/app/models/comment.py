from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Float
from sqlalchemy import String as UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid
from sqlalchemy import Column, String


class Comment(Base):
    __tablename__ = "comments"


    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    video_id = Column(String, ForeignKey("videos.id"), nullable=False)
    author_name      = Column(String(150))
    content          = Column(Text, nullable=False)
    timecode_seconds = Column(Float, nullable=False)
    created_at       = Column(DateTime(timezone=True), server_default=func.now())

    video = relationship("Video", back_populates="comments")