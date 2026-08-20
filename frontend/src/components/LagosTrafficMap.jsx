import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function getCongestionColor(category) {
  switch (category?.toLowerCase()) {
    case "low":
      return "green";

    case "moderate":
      return "orange";

    case "high":
      return "red";

    case "severe":
      return "darkred";

    default:
      return "blue";
  }
}

function LagosTrafficMap({
  latitude = 6.5244,
  longitude = 3.3792,
  congestion = "Unknown",
}) {
  const color = getCongestionColor(congestion);

  return (
    <div className="traffic-map">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: "450px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          center={[latitude, longitude]}
          radius={1000}
          pathOptions={{
            color: color,
            fillColor: color,
            fillOpacity: 0.35,
          }}
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>Lagos Traffic Prediction</strong>
            <br />
            Congestion: {congestion}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LagosTrafficMap;