from pathlib import Path
import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[1]

MODEL_PATH = BASE_DIR / "models" / "traffic_congestion_model.pkl"

model = joblib.load(MODEL_PATH)


def predict_congestion(data: dict):

    features = pd.DataFrame([{
        "segment_id": data["segment_id"],
        "lat": data["lat"],
        "lon": data["lon"],
        "hour": data["hour"],
        "avg_speed_kmh": data["avg_speed_kmh"],
        "density_veh_per_km": data["density_veh_per_km"],
        "incidents": data["incidents"],
        "day_of_week": data["day_of_week"],
        "is_weekend": data["is_weekend"],
        "is_peak_hour": data["is_peak_hour"],
        "time_of_day": data["time_of_day"],
    }])

    prediction = model.predict(features)[0]

    probabilities = model.predict_proba(features)[0]

    confidence = float(max(probabilities))

    return {
        "congestion_category": str(prediction),
        "confidence": round(confidence, 4)
    }