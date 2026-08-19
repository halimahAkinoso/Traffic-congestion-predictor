const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function predictTraffic(data) {
  console.log("API URL:", API_URL);
  console.log("Sending:", data);

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", responseText);

    if (!response.ok) {
      throw new Error(
        `API Error ${response.status}: ${responseText}`
      );
    }

    return JSON.parse(responseText);

  } catch (error) {
    console.error("Prediction failed:", error);
    throw error;
  }
}