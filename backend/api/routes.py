from fastapi import APIRouter
from backend.schemas.job import JobRequest, JobResponse
from backend.services.inference import run_inference

router = APIRouter(
    prefix="/analyze-job",
    tags=["Job Analysis"]
)

@router.post("/", response_model=JobResponse)
def analyze_job(payload: JobRequest):

    label, confidence, tx_hash = run_inference(
        payload.title,
        payload.description,
        payload.requirements
    )

    return JobResponse(
        prediction=label,
        confidence=confidence,
        blockchain_tx=tx_hash
    )
