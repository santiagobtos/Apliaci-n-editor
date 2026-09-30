from fastapi import APIRouter, Request

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])

@router.post("/mercadopago")
async def mercadopago_webhook(request: Request):
    body = await request.json()
    print("Webhook MercadoPago:", body)
    return {"received": True}

@router.post("/stripe")
async def stripe_webhook(request: Request):
    body = await request.json()
    print("Webhook Stripe:", body)
    return {"received": True}