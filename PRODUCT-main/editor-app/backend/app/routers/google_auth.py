from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.config import Config
from app.core.database import get_db
from app.core.security import create_access_token
from app.core.config import settings
from app.models.user import User
import httpx

router = APIRouter(prefix="/auth", tags=["Auth Google"])

# Configurar OAuth con Google
config = Config(environ={
    "GOOGLE_CLIENT_ID": settings.GOOGLE_CLIENT_ID or "",
    "GOOGLE_CLIENT_SECRET": settings.GOOGLE_CLIENT_SECRET or "",
})

oauth = OAuth(config)
oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)


@router.get("/google")
async def login_with_google(request: Request):
    """
    El editor toca 'Entrar con Google'.
    Redirige al popup de Google para autenticarse.
    """
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        # Limpiar sesión y redirigir de nuevo al login
        request.session.clear()
        raise HTTPException(400, f"Error al autenticar con Google. Intenta de nuevo.")

    user_info = token.get("userinfo")
    if not user_info:
        raise HTTPException(400, "No se pudo obtener información del usuario")

    email = user_info.get("email")
    name = user_info.get("name")

    if not email:
        raise HTTPException(400, "Google no proporcionó email")

    user = db.query(User).filter(User.email == email).first()

    is_new_user = False

    if not user:
        is_new_user = True
        user = User(
            name=name or email.split("@")[0],
            email=email,
            password="google-oauth-no-password",
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    request.session.clear()

    token_jwt = create_access_token({"sub": str(user.id)})

    return {
        "access_token": token_jwt,
        "token_type": "bearer",
        "user_id": str(user.id),
        "name": user.name,
        "email": user.email,
        "is_new_user": is_new_user,
    }