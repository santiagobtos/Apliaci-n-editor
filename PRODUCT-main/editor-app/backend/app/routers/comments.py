from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core.database import get_db
from app.models.comment import Comment
from app.models.video import Video

router = APIRouter(prefix="/comments", tags=["Comments"])

class CommentCreate(BaseModel):
    video_token: str
    author_name: str
    content: str
    timecode_seconds: float

@router.post("/", status_code=201)
def add_comment(body: CommentCreate, db: Session = Depends(get_db)):
    video = db.query(Video).filter(Video.review_token == body.video_token).first()
    if not video:
        raise HTTPException(404, "Video no encontrado")
    c = Comment(video_id=video.id, author_name=body.author_name, content=body.content, timecode_seconds=body.timecode_seconds)
    db.add(c)
    db.commit()
    db.refresh(c)
    return {"id": str(c.id), "author_name": c.author_name, "content": c.content, "timecode_seconds": c.timecode_seconds}

@router.get("/{video_token}")
def list_comments(video_token: str, db: Session = Depends(get_db)):
    video = db.query(Video).filter(Video.review_token == video_token).first()
    if not video:
        raise HTTPException(404, "Video no encontrado")
    return [{"id": str(c.id), "author_name": c.author_name, "content": c.content, "timecode_seconds": c.timecode_seconds}
            for c in db.query(Comment).filter(Comment.video_id == video.id).order_by(Comment.timecode_seconds).all()]