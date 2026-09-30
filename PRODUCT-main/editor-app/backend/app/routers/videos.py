from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import secrets
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.video import Video

router = APIRouter(prefix="/videos", tags=["Videos"])

class VideoCreate(BaseModel):
    project_id: str
    title: Optional[str] = None

@router.post("/", status_code=201)
def create_video(body: VideoCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    video = Video(project_id=body.project_id, title=body.title, review_token=secrets.token_urlsafe(32))
    db.add(video)
    db.commit()
    db.refresh(video)
    return {"id": str(video.id), "title": video.title, "status": video.status, "review_token": video.review_token}

@router.get("/review/{token}")
def get_video_by_token(token: str, db: Session = Depends(get_db)):
    video = db.query(Video).filter(Video.review_token == token).first()
    if not video:
        raise HTTPException(404, "Video no encontrado")
    return {"id": str(video.id), "title": video.title, "status": video.status, "download_enabled": video.download_enabled}