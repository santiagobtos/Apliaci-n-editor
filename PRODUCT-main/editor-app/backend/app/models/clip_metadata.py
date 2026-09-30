from sqlalchemy import Column, String, Boolean, Float, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid


class ClipMetadata(Base):
    __tablename__ = "clip_metadata"

    id          = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id  = Column(String(36), ForeignKey("projects.id"), nullable=False)
    message_ids = Column(Text, default="[]")

    color_space    = Column(String(50))
    log_profile    = Column(String(50))
    lut_required   = Column(String(100))
    lut_type       = Column(String(30))
    dynamic_range  = Column(String(50))
    white_balance  = Column(String(50))
    grade_notes    = Column(Text)
    mood_palette   = Column(String(100))
    aces_workflow  = Column(Boolean, default=False)
    reference_film = Column(String(150))

    brand_name       = Column(String(150))
    client_name      = Column(String(150))
    product          = Column(String(150))
    campaign         = Column(String(150))
    brand_guidelines = Column(Text)
    target_audience  = Column(Text)

    source_type  = Column(String(50))
    camera_model = Column(String(100))
    lens         = Column(String(100))
    codec        = Column(String(50))
    resolution   = Column(String(20))
    frame_rate   = Column(String(20))
    shoot_date   = Column(String(50))
    location     = Column(Text)

    edit_style      = Column(String(100))
    rhythm          = Column(String(100))
    duration_target = Column(String(50))
    vfx_notes       = Column(Text)
    text_overlay    = Column(Text)
    priority        = Column(String(10), default="media")

    music_ref   = Column(Text)
    voiceover   = Column(Text)
    sfx_notes   = Column(Text)
    audio_sync  = Column(Text)

    platform      = Column(String(100))
    aspect_ratio  = Column(String(10))
    output_format = Column(String(100))
    deadline      = Column(String(100))

    raw_summary = Column(Text)
    confidence  = Column(Float)

    project = relationship("Project", back_populates="clip_metadata")