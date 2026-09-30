from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id         = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email      = Column(String(255), unique=True, nullable=False, index=True)
    name       = Column(String(150), nullable=False)
    password   = Column(String(255), nullable=False)
    is_active  = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    language = Column(String(5), default='es', nullable=False, server_default='es')  # ← agregá esto

    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")