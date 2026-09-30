from pydantic import BaseModel,Field
from typing import Optional,Literal
from enum import Enum

class LutType(str,Enum):
    transform="transform"
    creative="creative"
    calibration="calibration" 
class ColorimetryData(BaseModel):
    color_space: Optional[str] = Field(
        None,
        examples=["Rec.709", "Rec.2020", "DCI-P3", "S-Gamut3.Cine"]
    )
    color_space: Optional[str] = Field(
        None,
        examples=["Rec.709", "Rec.2020", "DCI-P3", "S-Gamut3.Cine"]
    )
    

    log_profile: Optional[str] = Field(
        None,
        examples=["S-Log3", "V-Log", "C-Log3", "LogC4", "D-Log M", "HLG"]
    )
    

    lut_required: Optional[str] = Field(
        None,
        examples=["S-Log3 to Rec.709", "V-Log to Rec.709", "Creative - Teal & Orange"]
    )
   
    lut_type: Optional[LutType] = None
   

    dynamic_range: Optional[str] = Field(
        None,
        examples=["14 stops ARRI", "15+ stops Sony Venice", "HDR10", "SDR"]
    )
   

    white_balance: Optional[str] = Field(
        None,
        examples=["5600K luz día", "3200K tungsteno", "4300K nublado", "Auto WB"]
    )
    grade_notes: Optional[str] = Field(
        None,
             
       examples=["look cálido, piel natural, cielo azul saturado"] )
        #grade notes es para las instrucciones específicas del cliente para la colorimetría,
        #estas notas le dicen al editor que objetivo visuald debe cumplir

    mood_palette: Optional[str]= Field(
        None,
         examples=["Moody oscuro", "Vibrante comercial", "Pastel romántico", "Crudo documental"]
    )
         #el mood palete , es el feeling que quiere el cliente que la colorimetría represente
         #La IA debe detectar cosas como :" debe ser mas comercial " o "debe ser un poco mas lúgubre"

    aces_workflow: bool = False
     # ACES = "Academy Color Encoding System". Es un estándar de color de la
    # Academia de Hollywood para producciones de alto presupuesto.
    # Garantiza que los colores se vean igual en cualquier monitor del mundo.
    # Por defecto es False porque la mayoría de proyectos no lo usan,
    # pero si el cliente lo pide (campañas globales, broadcast internacional),
    # se activa aquí. es necesario porque no sabemos que tipo de alcance pueda tener la aplicacion y debe estar preparada
    #para los tecnicismos que tiene el mercado
    reference_film: Optional[str] = Field(
        None,
        examples=["Blade Runner 2049", "Breaking Bad S5", " como los videos de Apple"]
        #como dijo el editor que hace parte del equipo , a veces las personas añaden referencias a
        # otras fuentes filmicas , asi que es importante 
    )
class BrandData(BaseModel):
    #MARCA Y CLIENTE - en esta clase quiero ubicar la información comercial del proyecto 
    #esta seccion va a organizar automáticamente a que marca pertenece cierto lote de mensajes
    # ya que la relacion marcas editor es de muchas marcas a un solo editor


    brand_name: Optional[str]= None

    #nombre de la empresa o marca 

    client_name:Optional[str]=None
    #nombre de la persona de contacto


    product: Optional[str]= None 
    #producto o servicio específico del video . "nike jordan spring 2026".
    #una misma empresa puede tener muchos proyectos asi que el editor debe saber a cual hace referencia el proyecto

    campaign:Optional[str]= None


    brand_guidelines: Optional[str]= None
    #restricciones de la identidad de la marca , necesarias para definir las reglas de juego

    target_audience: Optional[str] = None
    #a quien va dirigido el video

class SourceData(BaseModel):
     # ─────────────────────────────────────────────────────────────────────
    # FUENTE Y MATERIAL — De dónde viene el video y cómo fue grabado
    #
    # Saber el origen técnico del material es crítico para el flujo de
    # trabajo. Un ProRes 4444 se importa diferente a un H.265 de WhatsApp.
    # Una Sony FX3 necesita un LUT diferente a una ARRI.
    # ─────────────────────────────────────────────────────────────────────

    source_type: Optional[Literal["rodaje propio", "stock", "cliente", "archivo"]] = None
    # Literal con 4 opciones fijas:
    #   "rodaje propio" → el editor o la productora filmó el material
    #   "stock"         → material comprado (Shutterstock, Artgrid, etc.)
    #   "cliente"       → el cliente envió su propio material (grabado en iPhone, etc.)
    #   "archivo"       → material de archivo histórico o de proyectos anteriores

    camera_model: Optional[str] = Field(
        None,
        examples=["Sony FX3", "ARRI Alexa Mini LF", "Canon C300 Mark III", "iPhone 15 Pro"]
    )
    # El modelo exacto de la cámara. Esto es crucial porque determina
    # automáticamente el log_profile y el LUT necesario.
    # La IA tiene en sus instrucciones (ver prompts.py) una tabla de
    # cámaras → log profiles para inferir esto aunque el editor no lo diga.

    lens: Optional[str] = Field(
        None,
        examples=["Sigma 35mm Art f1.4", "Canon 24-70mm f2.8 II", "Zeiss CP.3 50mm"]
    )
    # La lente afecta el look visual (bokeh, distorsión, rendering de colores).
    # Útil para el colorista y para mantener consistencia entre proyectos.

    codec: Optional[str] = Field(
        None,
        examples=["ProRes 4444 XQ", "XAVC-S 4K", "H.265 10-bit", "BRAW 5:1"]
    )
    # El codec es el formato de compresión del video.
    # ProRes = calidad máxima, archivos enormes, para edición profesional.
    # H.265 = más comprimido, archivos pequeños, a veces problemático en edición.
    # BRAW = formato RAW de Blackmagic, da control total de color en post.
    # Saber el codec permite al editor configurar correctamente su software
    # (Premiere, DaVinci Resolve, Final Cut).

    resolution: Optional[str] = Field(None, examples=["4K UHD", "6K RAW", "1080p HD", "8K"])
    # Resolución del material fuente. Afecta el rendimiento del equipo
    # de edición y las opciones de reencuadre 

    frame_rate: Optional[str] = Field(
        None,
        examples=["24fps", "25fps", "60fps", "120fps slow-mo", "240fps overcranked"]
    )
    # Fotogramas por segundo. 24fps = cine. 25fps = estándar europeo/broadcast.
    # 60fps+ = slow motion cuando se interpreta a 24fps (60/24 = 2.5x más lento).
    # "Overcranked" = grabado a alta velocidad intencionalmente para cámara lenta.

    shoot_date: Optional[str] = None
    # Fecha del rodaje. La IA entiende lenguaje natural: "ayer", "el martes",
    # "15 de marzo". Se guarda como string porque el editor raramente da
    # la fecha en formato ISO.

    location: Optional[str] = None
    # Lugar donde se grabó. Puede ser muy específico ("Estudio 3, Medellín")
    # o general ("exteriores, luz de día, playa").

class TakeQuality(str, Enum):
    # En producción profesional, cada toma tiene una calificación.
    # El director o el mismo editor anota esto en los mensajes.
    # La IA lo detecta y lo clasifica automáticamente.

    circle  = "circle"  # "Circle take" = toma aprobada, usar esta.
                        # Viene de cuando los directores hacían un círculo
                        # en el claquetero físico.

    no_good = "NG"      # "No Good" = toma descartada, no usar.
                        # Puede ser por actuación, técnica, o continuidad.

    pickup  = "pickup"  # Re-toma parcial. Se grabó solo parte de la escena
                        # para corregir algo específico (un diálogo, un movimiento).

    ok      = "ok"      # Toma aceptable pero no la primera opción.
                        # Se usa si la "circle" tiene algún problema menor.

class ShotData(BaseModel):
    # ─────────────────────────────────────────────────────────────────────
    # TIPO DE PLANO Y DIRECCIÓN
    #
    # 
    # ─────────────────────────────────────────────────────────────────────

    shot_type: Optional[str] = Field(
        None,
        examples=["close-up", "primer plano", "plano general", "plano americano",
                  "aerial / drone", "over the shoulder", "POV"]
    )
    # Tipo de encuadre. Determina qué tan cerca está la cámara del sujeto.
    # El editor necesita saber esto para organizar el material: "¿tengo
    # suficientes planos generales para el inicio y close-ups para el climax?"

    camera_movement: Optional[str] = Field(
        None,
        examples=["gimbal / steadicam", "trípode estático", "handheld / cámara al hombro",
                  "slider horizontal", "dolly in", "grúa / jib", "FPV drone"]
    )
    # Cómo se movió la cámara. El movimiento afecta el ritmo y el feeling:
    # gimbal = suave y cinematográfico; handheld = crudo y documental.

    take_quality: Optional[TakeQuality] = None
    # Calificación de la toma (ver el Enum TakeQuality arriba).
    # La IA detecta frases como "esa toma estuvo perfecta" → circle take,
    # o "esa salió movida, descártala" → NG.

    continuity_notes: Optional[str] = None
    # Notas sobre errores de continuidad que el editor debe considerar al cortar.
    # Ej: "en la toma 3 la actriz tenía el cabello suelto, en la 4 amarrado".
    # Estas notas evitan que el editor arme una secuencia con saltos de continuidad.

class EditorialData(BaseModel):
     # ─────────────────────────────────────────────────────────────────────
    # NOTAS EDITORIALES — Instrucciones sobre cómo editar
    #
    # Esta sección captura el "brief creativo" que el cliente da
    # informalmente en WhatsApp y que el editor necesita para tomar
    # decisiones de edición.
    # ─────────────────────────────────────────────────────────────────────
    edit_style: Optional[str]= None
    #estilo general de la edicion
    rhythm: Optional[str]=None
    #ritmo interno del video

    duration_target: Optional[str] = None
    #duracion objetivo del video final

    vfx_notes: Optional[str]= None
    #efectos visuales requeridos

    text_overlay: Optional[str] = None
    # textos que deben aparecer en el video

    priority:Literal["alta","media","baja"]= "media"
class AudioData(BaseModel):
    # ─────────────────────────────────────────────────────────────────────
    # AUDIO — Música, voiceover y efectos de sonido
    # ─────────────────────────────────────────────────────────────────────

    music_ref: Optional[str] = None
    # Referencia musical que el cliente menciona.
    # Ej: "algo como Bad Bunny pero más suave", "música épica tipo Hans Zimmer",
    # "lo que usamos en el video anterior", "sin música, solo ambiente".

    voiceover: Optional[str] = None
    # Si hay narración en off. Ej: "sí, voz en off con el guion adjunto",
    # "solo música", "el entrevistado habla a cámara, sin off".

    sfx_notes: Optional[str] = None
    # Efectos de sonido específicos.
    # Ej: "whoosh en cada transición", "ambiente de café en las escenas interiores",
    # "sonido de notificación en el momento del CTA".

    audio_sync: Optional[str] = None
    # Instrucciones de sincronización audio-video.
    # Ej: "el corte principal tiene que caer exactamente en el primer beat",
    # "el logo aparece en el drop de la música".
class DeliveryData(BaseModel):
     # ─────────────────────────────────────────────────────────────────────
    # ENTREGA — Especificaciones técnicas del producto final
    #
    # Esta sección define QUÉ hay que entregar, en QUÉ formato y CUÁNDO.
    # Es la información que determina el render final.
    
    platform:Optional[str]=Field(
        None,
        examples=["Instagram Reels", "YouTube", "TikTok", "Broadcast TV", "Cine digital", "LinkedIn"]

    )
        #Plataforma de destino. cada plataforma tiene specificaciones distintas

    aspect_ratio: Optional[str] = Field(
        None,
        examples=["9:16 vertical", "16:9 horizontal", "1:1 cuadrado", "4:5 feed Instagram"]
    )   
    #relacion de aspecto del video final
    output_format: Optional[str] = None
    # Formato técnico del archivo final.
    # Ej: "H.264 1080p para web", "ProRes 422 HQ para broadcast",
    # "HEVC 4K 10-bit HDR para streaming premium".

    deadline: Optional[str] = None
    # Fecha límite de entrega. La IA entiende lenguaje natural:
    # "para el viernes", "el 20 de abril antes del mediodía",
    # "en 3 días", "urgente para mañana"
    # ------------------------------------------------------------------------------
# SCHEMA RAÍZ — El resultado completo de la clasificación
#
# Esta es la clase que "envuelve" todos los bloques anteriores.
# Cuando la IA termina de analizar los mensajes, devuelve un JSON
# que tiene exactamente esta estructura.
#
# Ejemplo de JSON real que devolvería la IA:
# {
#   "brand": { "brand_name": "Nike Colombia", "product": "Air Max 2024", ... },
#   "colorimetry": { "color_space": "S-Gamut3.Cine", "log_profile": "S-Log3", ... },
#   "source": { "camera_model": "Sony FX3", "frame_rate": "120fps", ... },
#   ...
#   "raw_summary": "Material de Nike para lanzamiento Air Max, grabado en FX3...",
#   "confidence": 0.87
# }
# ------------------------------------------------------------------------------
class ClassificationResult(BaseModel):
    """Resultado completo de clasificar un lote de mensajes de WhatsApp."""

    brand:       BrandData        # → todo lo relacionado con el cliente/marca
    colorimetry: ColorimetryData  # → espacio de color, LUT, log profile, etc.
    source:      SourceData       # → cámara, codec, resolución, fecha rodaje
    shot:        ShotData         # → tipo de plano, movimiento, calidad de toma
    editorial:   EditorialData    # → estilo, ritmo, duración, VFX, textos
    audio:       AudioData        # → música, voiceover, efectos de sonido
    delivery:    DeliveryData     # → plataforma, aspect ratio, formato, deadline

    raw_summary: str = Field(
        ...,  # Los "..." en Pydantic significan que el campo es OBLIGATORIO
              # (no puede ser None, la IA SIEMPRE debe proveer esto)
        description="Resumen de 1-2 líneas de los mensajes en lenguaje natural"
    )
    # Un resumen humano de todo el lote de mensajes.
    # Ej: "Cliente Nike pide video de lanzamiento Air Max, grabado en Sony FX3,
    #      para Instagram Reels 9:16, entrega urgente el viernes."
    # Le permite al editor entender el proyecto de un vistazo sin leer
    # todos los mensajes originales.

    confidence: float = Field(
        ...,
        ge=0.0,  # ge = "greater than or equal" → mínimo 0.0
        le=1.0,  # le = "less than or equal"    → máximo 1.0
        description="Confianza global de la clasificación entre 0.0 y 1.0"
    )
    # Qué tan segura está la IA de su clasificación.
    # 0.95 = casi todo era explícito en los mensajes, muy confiable
    # 0.75 = algunos campos fueron inferidos (ej: log_profile por cámara)
    # 0.50 = muchos campos son ambiguos o contradictorios, revisar manualmente
    # Esto le permite a la app móvil mostrar un indicador visual de confianza
    # y alertar al editor cuando debe revisar la clasificación manualmente.
    


    




    
    
