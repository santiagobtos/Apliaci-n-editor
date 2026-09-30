from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.payment import Payment

router = APIRouter(prefix="/payments", tags=["Payments"])

class PaymentCreate(BaseModel):
    project_id: str
    amount: float
    currency: str = "COP"

@router.post("/", status_code=201)
def create_payment(body: PaymentCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    p = Payment(project_id=body.project_id, amount=body.amount, currency=body.currency,
                provider="mercadopago", payment_url="https://placeholder.com/pay")
    db.add(p)
    db.commit()
    db.refresh(p)
    return {"id": p.id, "status": p.status, "amount": p.amount, "payment_url": p.payment_url}