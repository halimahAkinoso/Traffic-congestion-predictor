export default function TrafficRecommendation({ category }) {
  const recommendations = {
    Low: {
      title: "Traffic is flowing well",
      message:
        "Current traffic conditions appear favorable. Your selected route should have relatively smooth movement.",
    },

    Moderate: {
      title: "Allow extra travel time",
      message:
        "Traffic is moderately congested. Consider leaving a little earlier if your journey is time-sensitive.",
    },

    High: {
      title: "Consider an alternative route",
      message:
        "Heavy congestion is predicted. Consider an alternative route or delaying your journey if possible.",
    },

    Severe: {
      title: "Avoid peak congestion if possible",
      message:
        "Severe congestion is predicted. Consider postponing the trip, using an alternative route, or allowing significantly more travel time.",
    },
  };

  const recommendation =
    recommendations[category] || {
      title: "Traffic information unavailable",
      message: "Please run another prediction.",
    };

  return (
    <div className="traffic-recommendation">
      <h3>{recommendation.title}</h3>

      <p>{recommendation.message}</p>
    </div>
  );
}