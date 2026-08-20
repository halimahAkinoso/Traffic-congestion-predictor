function getColor(category) {
  switch (category?.toLowerCase()) {
    case "low":
      return "low";

    case "moderate":
      return "moderate";

    case "high":
      return "high";

    case "severe":
      return "severe";

    default:
      return "unknown";
  }
}

export default function PredictionResult({ prediction }) {
  if (!prediction) {
    return null;
  }

  const category = prediction.congestion_category;
  const confidence = prediction.confidence ?? 0;

  return (
    <div className={`prediction-result ${getColor(category)}`}>
      <div className="result-header">
        <span className="result-label">
          Predicted Congestion
        </span>

        <span className="result-category">
          {category}
        </span>
      </div>

      <div className="confidence-section">
        <span>Model Confidence</span>

        <strong>
          {(confidence * 100).toFixed(1)}%
        </strong>
      </div>

      <div className="confidence-bar">
        <div
          className="confidence-fill"
          style={{
            width: `${confidence * 100}%`,
          }}
        />
      </div>
    </div>
  );
}