from fastapi import FastAPI
from backend.api.routes import router as job_router

app = FastAPI(
    title="AI Scam Detection API",
    description="AI + Blockchain powered fake job detection",
    version="1.0.0"
)

app.include_router(job_router)

@app.get("/")
def health_check():
    return {"status": "ok"}
