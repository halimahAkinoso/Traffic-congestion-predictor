from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import (
    TrafficPredictionRequest,
    TrafficPredictionResponse
)

from app.model_service import predict_congestion


app = FastAPI(
    title="Lagos Traffic Congestion Predictor",
    description="AI-powered traffic congestion prediction API",
    version="1.0.0"
)


# Temporary development CORS
# We will replace this with your Netlify URL after deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Lagos Traffic Congestion Predictor API",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post(
    "/predict",
    response_model=TrafficPredictionResponse
)
def predict(
    request: TrafficPredictionRequest
):
    return predict_congestion(
        request.model_dump()
    )