from groq import Groq
from app.core.config import settings


def get_groq_client() -> Groq:
    key = settings.GROQ_API_KEY
    if not key:
        raise RuntimeError(
            "GROQ_API_KEY no está configurado. "
            "Agregá GROQ_API_KEY=gsk_... al archivo .env"
        )
    return Groq(api_key=key)