from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.core.database import Base, engine
from app.core.config import settings
from app.models import user, project, video, comment, message, payment, clip_metadata  # noqa
from app.routers import auth, projects, messages, ai_classify, videos, comments, payments, webhooks, google_auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Editor App API", version="0.1.0")

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])

app.include_router(auth.router,        prefix="/api")
app.include_router(projects.router,    prefix="/api")
app.include_router(messages.router,    prefix="/api")
app.include_router(ai_classify.router, prefix="/api")
app.include_router(videos.router,      prefix="/api")
app.include_router(comments.router,    prefix="/api")
app.include_router(payments.router,    prefix="/api")
app.include_router(webhooks.router,    prefix="/api")
app.include_router(google_auth.router, prefix="/api")

@app.get("/health")
def health():
    return {"status": "ok"}
#