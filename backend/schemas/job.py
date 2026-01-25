from pydantic import BaseModel, Field
from typing import Optional, Literal


class JobRequest(BaseModel):
    title: str = Field(..., example="Work From Home Data Entry")
    description: str = Field(..., example="Earn money from home...")
    requirements: str = Field(..., example="Basic computer skills")


class JobResponse(BaseModel):
    prediction: Literal["SCAM", "LEGIT", "UNCERTAIN"]
    confidence: float = Field(..., ge=0.0, le=1.0)
    blockchain_tx: Optional[str]
