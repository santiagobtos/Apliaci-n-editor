from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid


class Payment(Base):
    __tablename__ = "payments"

    id          = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id  = Column(String(36), ForeignKey("projects.id"), nullable=False)
    amount      = Column(Float, nullable=False)
    currency    = Column(String(10), default="COP")
    status      = Column(String(50), default="pending")
    provider    = Column(String(50))
    provider_id = Column(String(200))
    payment_url = Column(String(500))
    created_at  = Column(DateTime, server_default=func.now())
    updated_at  = Column(DateTime, onupdate=func.now())

    project = relationship("Project", back_populates="payments")