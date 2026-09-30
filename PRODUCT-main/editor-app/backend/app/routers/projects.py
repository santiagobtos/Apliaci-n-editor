from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.project import Project
from datetime import datetime
router = APIRouter(prefix="/projects", tags=["Projects"])

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    status: Optional[str] = "active"


    notes: Optional[str] = None
    links: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    typography: Optional[str] = None
    deadline: Optional[datetime] = None
    deliverables: Optional[List[dict]] = None
    members: Optional[List[dict]] = None
class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    links: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    typography: Optional[str] = None
    deadline: Optional[datetime] = None
    deliverables: Optional[List[dict]] = None
    members: Optional[List[dict]] = None

@router.post("/", status_code=201)
def create_project(body: ProjectCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    p = Project(
    owner_id=user.id,
    name=body.name,
    description=body.description,
    notes=body.notes,
    links=body.links,
    colors=body.colors,
    typography=body.typography,
    deadline=body.deadline,
    deliverables=body.deliverables,
    members=body.members,
    status=body.status,
)
    db.add(p)
    db.commit()
    db.refresh(p)
    return {"id": str(p.id), "name": p.name, "description": p.description, "status": p.status,"deliverables": p.deliverables,
"members": p.members}

@router.get("/")
def list_projects(db: Session = Depends(get_db), user=Depends(get_current_user)):
    projects = db.query(Project).filter(Project.owner_id == user.id).all()
    return [
    {
        "id": str(p.id),
        "name": p.name,
        "description": p.description,
        "status": p.status,
        "notes": p.notes,
        "links": p.links,
        "colors": p.colors,
        "typography": p.typography,
        "deadline": p.deadline,
        "deliverables": p.deliverables,
        "members": p.members,
    }
    for p in projects
]

@router.get("/{project_id}")
def get_project(project_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    p = db.query(Project).filter(Project.id == project_id, Project.owner_id == user.id).first()
    if not p:
        raise HTTPException(404, "Proyecto no encontrado")
    return {
    "id": str(p.id),
    "name": p.name,
    "description": p.description,
    "status": p.status,
    "notes": p.notes,
    "links": p.links,
    "colors": p.colors,
    "typography": p.typography,
    "deadline": p.deadline,
    "deliverables": p.deliverables,
    "members": p.members,
}
@router.delete("/{project_id}", status_code=200)
def delete_project(
    project_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    p = db.query(Project).filter(
        Project.id == project_id,
        Project.owner_id == user.id
    ).first()
    if not p:
        raise HTTPException(404, "Proyecto no encontrado")
    db.delete(p)
    db.commit()
    return {"deleted": True, "project_id": project_id}
@router.put("/{project_id}")
def update_project(
    project_id: str,
    body: ProjectUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    p = db.query(Project).filter(
        Project.id == project_id,
        Project.owner_id == user.id
    ).first()

    if not p:
        raise HTTPException(404, "Proyecto no encontrado")

    data = body.dict(exclude_unset=True)

    for key, value in data.items():
        setattr(p, key, value)

    db.commit()
    db.refresh(p)

    return {
    "id": str(p.id),
    "name": p.name,
    "description": p.description,
    "status": p.status,

    "notes": p.notes,
    "links": p.links,
    "colors": p.colors,
    "typography": p.typography,
    "deadline": p.deadline,

    "deliverables": p.deliverables,
    "members": p.members,
}