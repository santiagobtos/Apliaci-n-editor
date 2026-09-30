from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    owner_id = Column(
        String(36),
        ForeignKey("users.id"),
        nullable=False
    )

    name = Column(String(200), nullable=False)
    deliverables = Column(JSON, nullable=True)
    members = Column(JSON, nullable=True)

    description = Column(Text)

    status = Column(String(50), default="active")

    notes = Column(Text, default="")

    links = Column(JSON, default=list)

    colors = Column(JSON, default=list)

    typography = Column(String(120), default="Sans-serif")

    deadline = Column(DateTime, nullable=True)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    updated_at = Column(
        DateTime,
        onupdate=func.now()
    )

    owner = relationship(
        "User",
        back_populates="projects"
    )

    clip_metadata = relationship(
        "ClipMetadata",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    videos = relationship(
        "Video",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    messages = relationship(
        "Message",
        back_populates="project",
        cascade="all, delete-orphan"
    )

    payments = relationship(
        "Payment",
        back_populates="project",
        cascade="all, delete-orphan"
    )
    