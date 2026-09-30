from app.ai.output_schema import ClassificationResult
from app.ai.prompts import CLASSIFIER_SYSTEM_PROMPT, CLASSIFIER_USER_TEMPLATE
from app.ai.groq_client import get_groq_client


async def classify_messages(
    messages: list[str],
    project_name: str = "Sin nombre",
) -> ClassificationResult:

    client = get_groq_client()

    messages_text = "\n".join(f"- {m}" for m in messages)
    user_prompt = CLASSIFIER_USER_TEMPLATE.format(
        project_name=project_name,
        messages=messages_text,
    )

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": CLASSIFIER_SYSTEM_PROMPT},
            {"role": "user",   "content": user_prompt},
        ],
        temperature=0.2,
        max_tokens=2000,
    )

    raw_text = response.choices[0].message.content.strip()

    if raw_text.startswith("```"):
        raw_text = raw_text.split("\n", 1)[1]
        raw_text = raw_text.rsplit("```", 1)[0]

    try:
        result = ClassificationResult.model_validate_json(raw_text)
        return result
    except Exception as first_error:
        # Llama returned invalid Literal values — patch known offenders and retry parse
        import json, re

        try:
            data = json.loads(raw_text)
        except Exception:
            raise first_error

        # Fix source_type: map any non-allowed value to the closest allowed one
        ALLOWED_SOURCE = {"rodaje propio", "stock", "cliente", "archivo"}
        src = data.get("source", {})
        if isinstance(src, dict) and src.get("source_type") not in ALLOWED_SOURCE | {None}:
            val = (src.get("source_type") or "").lower()
            if any(w in val for w in ["captura", "screenshot", "pantalla", "cliente", "whatsapp", "enviado"]):
                src["source_type"] = "cliente"
            elif any(w in val for w in ["stock", "shutterstock", "artgrid", "comprado"]):
                src["source_type"] = "stock"
            elif any(w in val for w in ["archivo", "histórico", "anterior"]):
                src["source_type"] = "archivo"
            else:
                src["source_type"] = None
            data["source"] = src

        # Fix take_quality
        ALLOWED_TAKE = {"circle", "NG", "pickup", "ok", None}
        shot = data.get("shot", {})
        if isinstance(shot, dict) and shot.get("take_quality") not in ALLOWED_TAKE:
            shot["take_quality"] = None
            data["shot"] = shot

        # Fix lut_type
        ALLOWED_LUT = {"transform", "creative", "calibration", None}
        col = data.get("colorimetry", {})
        if isinstance(col, dict) and col.get("lut_type") not in ALLOWED_LUT:
            col["lut_type"] = None
            data["colorimetry"] = col

        try:
            result = ClassificationResult.model_validate(data)
            return result
        except Exception:
            raise first_error