from pydantic import BaseModel, Field


class TrafficPredictionRequest(BaseModel):
    segment_id: str
    lat: float
    lon: float
    hour: int = Field(..., ge=0, le=23)
    avg_speed_kmh: float = Field(..., ge=0)
    density_veh_per_km: float = Field(..., ge=0)
    incidents: int = Field(..., ge=0)

    day_of_week: str
    is_weekend: int = Field(..., ge=0, le=1)
    is_peak_hour: int = Field(..., ge=0, le=1)
    time_of_day: str


class TrafficPredictionResponse(BaseModel):
    congestion_category: str
    confidence: float