import { useState } from "react";
import { predictTraffic } from "../services/api";
import "../App.css";

function TrafficPrediction() {
  const [form, setForm] = useState({
    segment_id: "LAG-001",
    lat: 6.5244,
    lon: 3.3792,
    hour: 8,
    avg_speed_kmh: 25,
    density_veh_per_km: 70,
    incidents: 2,
    day_of_week: "Monday",
    is_weekend: 0,
    is_peak_hour: 1,
    time_of_day: "Morning",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const prediction = await predictTraffic({
        ...form,
        lat: Number(form.lat),
        lon: Number(form.lon),
        hour: Number(form.hour),
        avg_speed_kmh: Number(form.avg_speed_kmh),
        density_veh_per_km: Number(form.density_veh_per_km),
        incidents: Number(form.incidents),
        is_weekend: Number(form.is_weekend),
        is_peak_hour: Number(form.is_peak_hour),
      });

      setResult(prediction);
    } catch (err) {
      setError(
        "Unable to generate prediction. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (category) => {
    if (!category) return "status-default";

    switch (category.toLowerCase()) {
      case "low":
        return "status-low";
      case "moderate":
        return "status-moderate";
      case "high":
        return "status-high";
      case "severe":
        return "status-severe";
      default:
        return "status-default";
    }
  };

  const formatConfidence = (confidence) => {
    if (confidence === undefined || confidence === null) return "—";

    const value =
      confidence <= 1 ? confidence * 100 : confidence;

    return `${value.toFixed(1)}%`;
  };

  return (
    <main className="app-shell">

      {/* Navigation */}
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">🚦</div>

          <div>
            <h1>Lagos Traffic</h1>
            <span>Congestion Predictor</span>
          </div>
        </div>

        <div className="nav-status">
          <span className="online-dot"></span>
          AI Prediction System
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            AI-POWERED TRAFFIC INTELLIGENCE
          </div>

          <h2>
            Predict traffic.
            <br />
            <span>Plan your journey.</span>
          </h2>

          <p>
            Get intelligent congestion estimates for Lagos roads
            using machine learning and real-time traffic conditions.
          </p>

          <div className="hero-stats">
            <div>
              <strong>4</strong>
              <span>Congestion Levels</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Prediction Model</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Prediction Access</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">
          <div className="road-card">

            <div className="road-header">
              <span>LIVE TRAFFIC OUTLOOK</span>
              <span className="live-indicator">
                ● LIVE
              </span>
            </div>

            <div className="road-map">

              <div className="road-line road-one"></div>
              <div className="road-line road-two"></div>
              <div className="road-line road-three"></div>

              <div className="location-point point-one">
                <span></span>
              </div>

              <div className="location-point point-two">
                <span></span>
              </div>

              <div className="location-point point-three">
                <span></span>
              </div>

              <div className="map-label label-one">
                Ikeja
              </div>

              <div className="map-label label-two">
                Lagos Island
              </div>

              <div className="map-label label-three">
                Victoria Island
              </div>

            </div>

            <div className="traffic-legend">
              <span>
                <i className="legend-dot low"></i>
                Low
              </span>

              <span>
                <i className="legend-dot moderate"></i>
                Moderate
              </span>

              <span>
                <i className="legend-dot high"></i>
                High
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Prediction Area */}
      <section className="prediction-section">

        <div className="section-heading">
          <div>
            <span className="section-kicker">
              TRAFFIC ANALYSIS
            </span>

            <h3>Predict congestion</h3>

            <p>
              Enter the current road conditions to generate an AI
              congestion prediction.
            </p>
          </div>

          <div className="model-badge">
            <span>●</span>
            Model Online
          </div>
        </div>

        <div className="prediction-grid">

          {/* Form */}
          <form
            className="prediction-card"
            onSubmit={handleSubmit}
          >

            <div className="card-title">
              <div className="title-icon">📍</div>

              <div>
                <h4>Traffic conditions</h4>
                <p>Provide current road information</p>
              </div>
            </div>

            <div className="form-grid">

              <div className="field full-width">
                <label>Traffic Segment</label>

                <input
                  type="text"
                  name="segment_id"
                  value={form.segment_id}
                  onChange={handleChange}
                  placeholder="e.g. LAG-001"
                />
              </div>

              <div className="field">
                <label>Latitude</label>

                <input
                  type="number"
                  step="any"
                  name="lat"
                  value={form.lat}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Longitude</label>

                <input
                  type="number"
                  step="any"
                  name="lon"
                  value={form.lon}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Hour of Day</label>

                <input
                  type="number"
                  min="0"
                  max="23"
                  name="hour"
                  value={form.hour}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Average Speed</label>

                <div className="input-with-unit">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    name="avg_speed_kmh"
                    value={form.avg_speed_kmh}
                    onChange={handleChange}
                  />
                  <span>km/h</span>
                </div>
              </div>

              <div className="field">
                <label>Traffic Density</label>

                <div className="input-with-unit">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    name="density_veh_per_km"
                    value={form.density_veh_per_km}
                    onChange={handleChange}
                  />
                  <span>veh/km</span>
                </div>
              </div>

              <div className="field">
                <label>Road Incidents</label>

                <input
                  type="number"
                  min="0"
                  name="incidents"
                  value={form.incidents}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Day</label>

                <select
                  name="day_of_week"
                  value={form.day_of_week}
                  onChange={handleChange}
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>

              <div className="field">
                <label>Time of Day</label>

                <select
                  name="time_of_day"
                  value={form.time_of_day}
                  onChange={handleChange}
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>
              </div>

              <div className="field">
                <label>Weekend</label>

                <select
                  name="is_weekend"
                  value={form.is_weekend}
                  onChange={handleChange}
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

              <div className="field">
                <label>Peak Hour</label>

                <select
                  name="is_peak_hour"
                  value={form.is_peak_hour}
                  onChange={handleChange}
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="predict-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing traffic...
                </>
              ) : (
                <>
                  Predict Congestion
                  <span>→</span>
                </>
              )}
            </button>

            {error && (
              <div className="error-message">
                <span>!</span>
                {error}
              </div>
            )}

          </form>

          {/* Result */}
          <div className="result-card">

            {!result && !loading && (
              <div className="empty-result">

                <div className="prediction-icon">
                  ✦
                </div>

                <h4>Prediction result</h4>

                <p>
                  Your AI-generated congestion estimate
                  will appear here.
                </p>

                <div className="result-placeholder">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            )}

            {loading && (
              <div className="empty-result">

                <div className="loading-orbit">
                  <div></div>
                </div>

                <h4>Analyzing traffic...</h4>

                <p>
                  Our machine learning model is evaluating
                  the traffic conditions.
                </p>

              </div>
            )}

            {result && (
              <div className="result-content">

                <div className="result-top">
                  <span className="section-kicker">
                    AI PREDICTION
                  </span>

                  <span className="result-time">
                    Just now
                  </span>
                </div>

                <div
                  className={`congestion-status ${getStatusClass(
                    result.congestion_category
                  )}`}
                >
                  <div className="status-icon">
                    {result.congestion_category?.toLowerCase() ===
                    "low"
                      ? "✓"
                      : result.congestion_category?.toLowerCase() ===
                        "moderate"
                      ? "!"
                      : "⚠"}
                  </div>

                  <div>
                    <span>Congestion level</span>

                    <strong>
                      {result.congestion_category}
                    </strong>
                  </div>
                </div>

                <div className="confidence-box">

                  <div className="confidence-header">
                    <span>Model confidence</span>

                    <strong>
                      {formatConfidence(result.confidence)}
                    </strong>
                  </div>

                  <div className="confidence-track">
                    <div
                      className="confidence-fill"
                      style={{
                        width: formatConfidence(
                          result.confidence
                        ),
                      }}
                    ></div>
                  </div>

                </div>

                <div className="result-summary">

                  <div>
                    <span>Speed</span>
                    <strong>
                      {form.avg_speed_kmh} km/h
                    </strong>
                  </div>

                  <div>
                    <span>Density</span>
                    <strong>
                      {form.density_veh_per_km} veh/km
                    </strong>
                  </div>

                  <div>
                    <span>Time</span>
                    <strong>
                      {form.hour}:00
                    </strong>
                  </div>

                  <div>
                    <span>Day</span>
                    <strong>
                      {form.day_of_week}
                    </strong>
                  </div>

                </div>

                <div className="recommendation">
                  <span>💡</span>

                  <div>
                    <strong>Travel insight</strong>

                    <p>
                      {result.congestion_category
                        ?.toLowerCase() === "low"
                        ? "Traffic conditions look favorable. This may be a good time to travel."
                        : result.congestion_category
                            ?.toLowerCase() === "moderate"
                        ? "Expect some delays. Consider allowing additional travel time."
                        : result.congestion_category
                            ?.toLowerCase() === "high"
                        ? "Heavy traffic is expected. Consider an alternative route or travel time."
                        : "Severe congestion is expected. Consider postponing your journey if possible."}
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">

        <div>
          <strong>🚦 Lagos Traffic Predictor</strong>
          <span>
            AI-powered congestion intelligence
          </span>
        </div>

        <p>
          Built with React, FastAPI & Machine Learning
        </p>

      </footer>

    </main>
  );
}

export default TrafficPrediction;