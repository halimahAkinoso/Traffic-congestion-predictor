import { useState } from "react";
import { predictTraffic } from "../services/api";

function TrafficPrediction() {
  const [form, setForm] = useState({
    segment_id: "SEG001",
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

    setForm((previous) => ({
      ...previous,
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">
        Lagos Traffic Congestion Predictor
      </h1>

      <p className="text-gray-600 mb-6">
        Enter current traffic conditions to predict the congestion level.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >

        {/* Segment */}
        <div>
          <label className="block font-medium mb-1">
            Traffic Segment
          </label>

          <input
            type="text"
            name="segment_id"
            value={form.segment_id}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="e.g. SEG001"
          />
        </div>

        {/* Latitude */}
        <div>
          <label className="block font-medium mb-1">
            Latitude
          </label>

          <input
            type="number"
            step="any"
            name="lat"
            value={form.lat}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block font-medium mb-1">
            Longitude
          </label>

          <input
            type="number"
            step="any"
            name="lon"
            value={form.lon}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Hour */}
        <div>
          <label className="block font-medium mb-1">
            Hour of Day
          </label>

          <input
            type="number"
            min="0"
            max="23"
            name="hour"
            value={form.hour}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Average Speed */}
        <div>
          <label className="block font-medium mb-1">
            Average Speed (km/h)
          </label>

          <input
            type="number"
            min="0"
            step="any"
            name="avg_speed_kmh"
            value={form.avg_speed_kmh}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Density */}
        <div>
          <label className="block font-medium mb-1">
            Traffic Density (vehicles/km)
          </label>

          <input
            type="number"
            min="0"
            step="any"
            name="density_veh_per_km"
            value={form.density_veh_per_km}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Incidents */}
        <div>
          <label className="block font-medium mb-1">
            Number of Incidents
          </label>

          <input
            type="number"
            min="0"
            name="incidents"
            value={form.incidents}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Day */}
        <div>
          <label className="block font-medium mb-1">
            Day of Week
          </label>

          <select
            name="day_of_week"
            value={form.day_of_week}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
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

        {/* Weekend */}
        <div>
          <label className="block font-medium mb-1">
            Weekend
          </label>

          <select
            name="is_weekend"
            value={form.is_weekend}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Peak Hour */}
        <div>
          <label className="block font-medium mb-1">
            Peak Hour
          </label>

          <select
            name="is_peak_hour"
            value={form.is_peak_hour}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Time of Day */}
        <div>
          <label className="block font-medium mb-1">
            Time of Day
          </label>

          <select
            name="time_of_day"
            value={form.time_of_day}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Congestion"}
        </button>

      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 p-6 bg-gray-100 rounded-xl">

          <h2 className="text-xl font-bold mb-3">
            Prediction Result
          </h2>

          <p className="text-lg">
            Congestion Level:
            <strong className="ml-2">
              {result.congestion_category}
            </strong>
          </p>

          <p className="mt-2">
            Confidence:
            <strong className="ml-2">
              {(result.confidence * 100).toFixed(1)}%
            </strong>
          </p>

        </div>
      )}

    </div>
  );
}

export default TrafficPrediction;