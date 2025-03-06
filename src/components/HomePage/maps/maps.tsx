import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const IconUrl = [
  ["https://cdn-icons-png.flaticon.com/512/4874/4874937.png", "location"],
  ["https://cdn-icons-png.flaticon.com/512/2784/2784593.png", "swim"],
  ["https://cdn-icons-png.flaticon.com/512/3043/3043861.png", "golf"],
  ["https://cdn-icons-png.flaticon.com/512/3659/3659784.png", "music"],
  ["https://cdn-icons-png.flaticon.com/512/3225/3225194.png", "shopping"],
  ["https://cdn-icons-png.flaticon.com/512/2602/2602414.png", "school"],
];

const mapStyles = {
  container: {
    width: "100%",
    height: "30rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    maxWidth: "80rem",
    margin: "0 auto",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "1rem 0",
    textAlign: "center" as const,
  },
};

const mapCssContent = `
.custom-marker {
  transition: all 0.3s ease;
}
.custom-marker:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
}
.marker-pulse {
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
.popup-container {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  border-left: 5px solid #3498db;
}
.popup-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 16px;
  text-transform: uppercase;
}
.popup-rating {
  color: #f39c12;
  font-weight: bold;
  margin-bottom: 6px;
}
.popup-time {
  color: #7f8c8d;
  font-size: 13px;
  margin-bottom: 8px;
}
.popup-status-ontime {
  background-color: #2ecc71;
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  font-weight: bold;
}
.popup-status-delay {
  background-color: #e74c3c;
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  font-weight: bold;
}
.popup-button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-top: 8px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  font-weight: 500;
}
.popup-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}
.leaflet-popup-content-wrapper {
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
}
.leaflet-popup-content {
  margin: 0;
  width: auto !important;
}
.leaflet-popup-tip-container {
  visibility: hidden;
}
`;

interface MapWithPointsProps {
  coordinates: [number, number, string][];
}

const MapWithPoints: React.FC<MapWithPointsProps> = ({ coordinates }) => {
  const navigate = useNavigate();
  const mapContainerId = useRef(
    `map-container-${Math.random().toString(36).substring(2, 9)}`
  );
  const styleSheetRef = useRef<HTMLStyleElement | null>(null);
  const eventHandlerRef = useRef<((e: Event) => void) | undefined>(undefined);

  useEffect(() => {
    if (!styleSheetRef.current) {
      const style = document.createElement("style");
      style.innerHTML = mapCssContent;
      document.head.appendChild(style);
      styleSheetRef.current = style;
    }

    const map = L.map(mapContainerId.current).setView([0, 0], 1);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "© Esri, Maxar, Earthstar Geographics, and the GIS User Community",
      }
    ).addTo(map);

    const bounds = L.latLngBounds();

    const createCustomIcon = (iconUrl: string, type: string) => {
      return L.divIcon({
        html: `<div class="custom-marker marker-pulse"><img src="${iconUrl}" alt="${type}" style="width: 100%; height: 100%;" /></div>`,
        className: "",
        iconSize: [45, 45],
      });
    };

    coordinates.forEach(([lat, lon, type], index) => {
      const iconUrl =
        IconUrl.find((icon) => icon[1] === type)?.[0] ??
        "https://cdn-icons-png.flaticon.com/512/1483/1483336.png";

      const marker = L.marker([lat, lon], {
        icon: createCustomIcon(iconUrl, type),
        riseOnHover: true,
      }).addTo(map);

      bounds.extend(marker.getLatLng());

      const rating = (Math.random() * 2 + 3).toFixed(1);
      const reviewCount = Math.floor(Math.random() * 50) + 10;
      const statusText = index < 5 ? "On Time" : "Delayed";
      const statusClass =
        index < 5 ? "popup-status-ontime" : "popup-status-delay";
      const eventDate = new Date();
      eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 7));

      const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      const formattedTime = eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Create event ID for consistent reference
      const eventId = `event-${type}-${index}`;

      // Create popup content
      const popupContent = document.createElement("div");
      popupContent.className = "popup-container";
      popupContent.innerHTML = `
        <div class="popup-title">${
          type.charAt(0).toUpperCase() + type.slice(1)
        } Event</div>
        <div class="popup-rating">
          ${rating} ${Array.from(
        { length: Math.round(Number(rating)) },
        () => "★"
      ).join("")}
          <span style="color: #bdc3c7;">${Array.from(
            { length: 5 - Math.round(Number(rating)) },
            () => "★"
          ).join("")}</span>
          (${reviewCount} reviews)
        </div>
        <div class="popup-time">
          <i style="margin-right: 5px;">📅</i> ${formattedDate} at ${formattedTime}
        </div>
        <div class="popup-location">
          <i style="margin-right: 5px;">📍</i> NEOM ${
            type.charAt(0).toUpperCase() + type.slice(1)
          } Center
        </div>
        <div style="margin-top: 8px;">
          <span class="${statusClass}">${statusText}</span>
        </div>
      `;

      // Add button with direct click handler to avoid custom events
      const viewButton = document.createElement("button");
      viewButton.className = "popup-button";
      viewButton.textContent = "View Details";
      viewButton.id = eventId;
      viewButton.onclick = () => {
        navigate(`/event-details?id=${index}&type=${type}`);
      };

      popupContent.appendChild(viewButton);

      // Add popup to marker
      marker.bindPopup(popupContent, {
        closeButton: true,
        className: "custom-popup",
        minWidth: 250,
        maxWidth: 300,
      });

      marker.on("mouseover", () => {
        marker.openPopup();
      });
    });

    // Fit map to markers
    if (coordinates.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    // Clean up on component unmount
    return () => {
      map.remove();
    };
  }, [coordinates, navigate]);

  // Clean up styles on component unmount
  useEffect(() => {
    return () => {
      if (styleSheetRef.current) {
        styleSheetRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="mapContainerIt">
      <p style={mapStyles.title} className="mapContainerIt_title">
        Find Events on Map
      </p>
      <div id={mapContainerId.current} style={mapStyles.container}></div>
    </div>
  );
};

export default MapWithPoints;
