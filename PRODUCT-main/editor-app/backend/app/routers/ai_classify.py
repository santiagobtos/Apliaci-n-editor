from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import base64

from app.ai.groq_client import get_groq_client
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.clip_metadata import ClipMetadata
from app.ai.classifier import classify_messages

router = APIRouter(prefix="/ai", tags=["AI Classifier"])


class ClassifyRequest(BaseModel):
    project_id: str
    messages: List[str]


@router.post("/classify", status_code=201)
async def classify(
    body: ClassifyRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    if not body.messages:
        raise HTTPException(400, "Envía al menos un mensaje")

    result = await classify_messages(
        messages=body.messages,
        project_name=body.project_id,
    )

    meta = ClipMetadata(
        project_id=body.project_id,
        color_space=result.colorimetry.color_space,
        log_profile=result.colorimetry.log_profile,
        lut_required=result.colorimetry.lut_required,
        lut_type=result.colorimetry.lut_type,
        dynamic_range=result.colorimetry.dynamic_range,
        white_balance=result.colorimetry.white_balance,
        grade_notes=result.colorimetry.grade_notes,
        mood_palette=result.colorimetry.mood_palette,
        aces_workflow=result.colorimetry.aces_workflow,
        reference_film=result.colorimetry.reference_film,
        brand_name=result.brand.brand_name,
        client_name=result.brand.client_name,
        product=result.brand.product,
        campaign=result.brand.campaign,
        edit_style=result.editorial.edit_style,
        rhythm=result.editorial.rhythm,
        duration_target=result.editorial.duration_target,
        priority=result.editorial.priority,
        platform=result.delivery.platform,
        aspect_ratio=result.delivery.aspect_ratio,
        deadline=result.delivery.deadline,
        raw_summary=result.raw_summary,
        confidence=result.confidence,
    )
    db.add(meta)
    db.commit()
    db.refresh(meta)

    return {
        "metadata_id": meta.id,
        "summary": result.raw_summary,
        "confidence": result.confidence,
        "colorimetry": {
            "color_space":    result.colorimetry.color_space,
            "log_profile":    result.colorimetry.log_profile,
            "lut_required":   result.colorimetry.lut_required,
            "grade_notes":    result.colorimetry.grade_notes,
            "mood_palette":   result.colorimetry.mood_palette,
            "reference_film": result.colorimetry.reference_film,
        },
        "brand": {
            "brand_name": result.brand.brand_name,
            "product":    result.brand.product,
            "campaign":   result.brand.campaign,
        },
        "editorial": {
            "edit_style":      result.editorial.edit_style,
            "rhythm":          result.editorial.rhythm,
            "duration_target": result.editorial.duration_target,
            "priority":        result.editorial.priority,
        },
        "delivery": {
            "platform":     result.delivery.platform,
            "aspect_ratio": result.delivery.aspect_ratio,
            "deadline":     result.delivery.deadline,
        },
        # Include audio fields so frontend can access them
        "audio": {
            "music_ref":  result.audio.music_ref,
            "voiceover":  result.audio.voiceover,
            "sfx_notes":  result.audio.sfx_notes,
            "audio_sync": result.audio.audio_sync,
        },
    }


@router.post("/transcribe", status_code=200)
async def transcribe_audio(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
):
    """
    Transcribe audio using Whisper on Groq.
    Returns { "text": "..." }
    """
    audio_bytes = await file.read()

    if len(audio_bytes) > 25 * 1024 * 1024:
        raise HTTPException(400, "El archivo de audio no puede superar 25 MB")

    client = get_groq_client()

    transcription = client.audio.transcriptions.create(
        model="whisper-large-v3-turbo",
        file=(file.filename or "audio.m4a", audio_bytes, file.content_type or "audio/m4a"),
        response_format="text",
        # No language forced — Whisper auto-detects (handles Spanish/English mix better)
    )

    text = transcription if isinstance(transcription, str) else transcription.text
    return {"text": text.strip()}


@router.post("/describe-image", status_code=200)
async def describe_image(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
):
    """
    Describe an image using Llama 4 Scout vision on Groq.
    Returns { "description": "..." }
    """
    image_bytes = await file.read()

    if len(image_bytes) > 20 * 1024 * 1024:
        raise HTTPException(400, "La imagen no puede superar 20 MB")

    b64 = base64.standard_b64encode(image_bytes).decode("utf-8")

    fname = (file.filename or "image.jpg").lower()
    if fname.endswith(".png"):
        mime = "image/png"
    elif fname.endswith(".webp"):
        mime = "image/webp"
    elif fname.endswith(".gif"):
        mime = "image/gif"
    else:
        mime = "image/jpeg"

    client = get_groq_client()

    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime};base64,{b64}"},
                    },
                    {
                        "type": "text",
                        "text": (
                            "Eres un colorista y director de fotografía experto. "
                            "Analiza esta imagen como referencia creativa para un editor de video profesional. "
                            "Responde en español, sin markdown, en este formato exacto:\n\n"
                            "PALETA: [colores dominantes con temperatura estimada en Kelvin si es posible]\n"
                            "MOOD: [feeling visual en 3-5 palabras: ej. 'cálido comercial aspiracional']\n"
                            "ESTILO: [referencia cinematográfica o fotográfica específica: ej. 'estilo Blade Runner 2049, luz práctica, neón']\n"
                            "TÉCNICA: [iluminación, composición, profundidad de campo, movimiento aparente]\n"
                            "LUT SUGERIDO: [tipo de gradación que requeriría: ej. 'S-Log3 to Rec.709 + creative warm teal-orange']\n"
                            "USO: [para qué tipo de proyecto sirve como referencia: ej. 'campaña de moda lujo, reel de producto cosmético']\n\n"
                            "Sé técnico y específico. Si la imagen es de baja calidad o ambigua, indícalo en TÉCNICA."
                        ),
                    },
                ],
            }
        ],
        max_tokens=300,
        temperature=0.3,
    )

    description = response.choices[0].message.content.strip()
    return {"description": description}