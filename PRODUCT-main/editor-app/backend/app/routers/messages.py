from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.message import Message

router = APIRouter(prefix="/messages", tags=["Messages"])

class MessageCreate(BaseModel):
    project_id: str
    content: str
    sender: Optional[str] = None

@router.post("/", status_code=201)
def create_message(body: MessageCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    msg = Message(project_id=body.project_id, content=body.content, sender=body.sender)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return {"id": str(msg.id), "content": msg.content, "sender": msg.sender}

@router.get("/{project_id}")
def list_messages(project_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    msgs = db.query(Message).filter(Message.project_id == project_id).all()
    return [{"id": str(m.id), "content": m.content, "sender": m.sender} for m in msgs]
class SetActiveProject(BaseModel):
    project_id: str

@router.post("/set-active-project", status_code=200)
def set_active_project(
    body: SetActiveProject,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    from app.models.project import Project
    db.query(Project).filter(
        Project.owner_id == user.id
    ).update({"status": "inactive"})

    project = db.query(Project).filter(
        Project.id == body.project_id,
        Project.owner_id == user.id
    ).first()

    if not project:
        raise HTTPException(404, "Proyecto no encontrado")

    project.status = "active"
    db.commit()

    return {
        "active_project_id": str(project.id),
        "active_project_name": project.name,
    }