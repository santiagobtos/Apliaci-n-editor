from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid


class Video(Base):
    __tablename__ = "videos"

    id               = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id       = Column(String(36), ForeignKey("projects.id"), nullable=False)
    title            = Column(String(200))
    storage_key      = Column(String(500))
    review_token     = Column(String(100), unique=True, index=True)
    status           = Column(String(50), default="processing")
    duration_secs    = Column(Integer)
    download_enabled = Column(Boolean, default=False)
    created_at       = Column(DateTime, server_default=func.now())

    project  = relationship("Project", back_populates="videos")
    comments = relationship("Comment", back_populates="video", cascade="all, delete-orphan")