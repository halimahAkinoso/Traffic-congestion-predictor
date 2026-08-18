const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function predictTraffic(data) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Prediction failed");
  }

  return response.json();
}

