from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    APP_NAME: str = "Editor App"
    DEBUG: bool = True
    SECRET_KEY: str = "dev-secret-key-cambiar-en-produccion"
    DATABASE_URL: str = "sqlite:///./editorapp.db"
    REDIS_URL: str = "redis://localhost:6379/0"

    S3_BUCKET: Optional[str] = None
    S3_REGION: Optional[str] = "us-east-1"
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None

    ANTHROPIC_API_KEY: Optional[str] = None

    MERCADOPAGO_ACCESS_TOKEN: Optional[str] = None
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None

    GROQ_API_KEY: Optional[str] = None  # read from .env — never hardcode here

    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/api/auth/google/callback"


settings = Settings()