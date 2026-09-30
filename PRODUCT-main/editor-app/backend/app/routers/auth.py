from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, Field
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User
from app.core.security import get_current_user
router = APIRouter(prefix="/auth", tags=["Auth"])


# ── Schemas ──────────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., max_length=72)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    name: str

class UpdateEmailRequest(BaseModel):
    new_email: EmailStr

class UpdatePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=6, max_length=72)

class UpdateLanguageRequest(BaseModel):
    language: str = Field(..., pattern="^(es|en)$")   # sólo 'es' o 'en'


# ── Register / Login (sin cambios) ───────────────────────────────────────────

@router.post("/register", status_code=201, response_model=TokenResponse)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(400, "Ya existe una cuenta con ese email")

    user = User(
        name=body.name,
        email=body.email,
        password=hash_password(body.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer", "user_id": str(user.id), "name": user.name}


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password):
        raise HTTPException(401, "Email o contraseña incorrectos")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer", "user_id": str(user.id), "name": user.name}


# ── Account settings (requieren JWT) ─────────────────────────────────────────

@router.patch("/email")
def update_email(
    body: UpdateEmailRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Cambia el email del usuario autenticado."""
    existing = db.query(User).filter(User.email == body.new_email).first()
    if existing and existing.id != current_user.id:
        raise HTTPException(400, "Ese email ya está en uso por otra cuenta")

    current_user.email = body.new_email
    db.commit()
    return {"message": "Email actualizado correctamente"}


@router.patch("/password")
def update_password(
    body: UpdatePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Cambia la contraseña del usuario autenticado."""
    if not verify_password(body.current_password, current_user.password):
        raise HTTPException(401, "La contraseña actual es incorrecta")

    current_user.password = hash_password(body.new_password)
    db.commit()
    return {"message": "Contraseña actualizada correctamente"}


@router.patch("/language")
def update_language(
    body: UpdateLanguageRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Guarda la preferencia de idioma del usuario ('es' | 'en')."""
    # Asegurate de que el modelo User tenga la columna `language` (ver nota abajo).
    current_user.language = body.language
    db.commit()
    return {"message": "Idioma actualizado", "language": body.language}


@router.delete("/account", status_code=204)
def delete_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Elimina permanentemente la cuenta del usuario autenticado."""
    db.delete(current_user)
    db.commit()