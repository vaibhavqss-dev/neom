import React, { useEffect, useRef, useState } from "react";
import L from "leaflet"; // Change from * as L to just L
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

// Improved category-to-icon mapping with more professional icons
const categoryIcons = {
  location: "https://cdn-icons-png.flaticon.com/512/4874/4874937.png",
  swim: "https://cdn-icons-png.flaticon.com/512/2784/2784593.png",
  golf: "https://cdn-icons-png.flaticon.com/512/3043/3043861.png",
  music: "https://cdn-icons-png.flaticon.com/512/3659/3659784.png",
  shopping: "https://cdn-icons-png.flaticon.com/512/3225/3225194.png",
  school: "https://cdn-icons-png.flaticon.com/512/2602/2602414.png",
  restaurant: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
  hiking: "https://cdn-icons-png.flaticon.com/512/1247/1247758.png",
  sport: "https://cdn-icons-png.flaticon.com/512/857/857418.png",
  festival: "https://cdn-icons-png.flaticon.com/512/3075/3075918.png",
  default: "https://cdn-icons-png.flaticon.com/512/1483/1483336.png",
};

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
  coordinates?: [number, number, string][];
}

interface Event {
  event: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    latitude: string;
    longitude: string;
    image_urls: string[];
    overall_rating: number;
    no_reviews: number;
    status?: string;
    date?: string;
    time?: string;
  };
}

const MapWithPoints: React.FC<MapWithPointsProps> = ({ coordinates = [] }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  const mapContainerId = useRef(
    `map-container-${Math.random().toString(36).substring(2, 9)}`
  );
  const styleSheetRef = useRef<HTMLStyleElement | null>(null);
  // Fix the map ref type
  const mapRef = useRef<any | null>(null);

  // Fetch events data from API - adding cleanup flag to prevent state updates after unmount
  useEffect(() => {
    let isMounted = true;

    async function fetchEvents() {
      setLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:3001/api/user/reserveevent?coordinates=true`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!isMounted) return;

        if (data.error) {
          setError(data.error);
          console.error("API error:", data.error);
          return;
        }

        setEvents(data.events || []);
      } catch (err) {
        if (isMounted) {
          console.error("Fetch error:", err);
          setError("Failed to fetch events");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // Make sure stylesheet is added only once
  useEffect(() => {
    if (!styleSheetRef.current) {
      const style = document.createElement("style");
      style.innerHTML = mapCssContent;
      document.head.appendChild(style);
      styleSheetRef.current = style;
    }

    return () => {
      if (styleSheetRef.current) {
        styleSheetRef.current.remove();
        styleSheetRef.current = null;
      }
    };
  }, []);

  // Setup map only after DOM is ready and cleanup properly
  useEffect(() => {
    let mapInstance: any | null = null;

    // Wait for DOM to be ready
    const initializeMap = () => {
      // Safety check to ensure the container exists
      const container = document.getElementById(mapContainerId.current);
      if (!container) {
        console.error("Map container not found");
        return;
      }

      // Add explicit height to make sure the container is visible
      container.style.height = "30rem";

      // Initialize map
      mapInstance = L.map(container, {
        // Add fade animation: false to prevent some positioning errors
        fadeAnimation: false,
      }).setView([28.0, 35.0], 7);

      mapRef.current = mapInstance;

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "© Esri, Maxar, Earthstar Geographics, and the GIS User Community",
        }
      ).addTo(mapInstance);

      setMapInitialized(true);
    };

    // Small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeMap();
    }, 100);

    // Clean up function
    return () => {
      clearTimeout(timer);
      if (mapInstance) {
        // Properly remove map to prevent memory leaks
        mapInstance.remove();
        mapRef.current = null;
        setMapInitialized(false);
      }
    };
  }, []);

  // Fix for the map markers effect - memoize complex values
  const memoizedEvents = React.useMemo(() => events, [events]);
  const memoizedCoordinates = React.useMemo(() => coordinates, [coordinates]);

  // Add markers after map is initialized and events are loaded - with memoized dependencies
  useEffect(() => {
    // Only proceed if map is initialized and we have data
    if (!mapInitialized || !mapRef.current) return;

    const map = mapRef.current;
    const bounds = L.latLngBounds();
    let hasMarkers = false;

    // Clear existing markers if needed
    // Fix the layer parameter type
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Create custom icon for each marker
    const createCustomIcon = (iconUrl: string, type: string) => {
      return L.divIcon({
        html: `<div class="custom-marker marker-pulse"><img src="${iconUrl}" alt="${type}" style="width: 100%; height: 100%;" /></div>`,
        className: "",
        iconSize: [45, 45],
      });
    };

    // Add markers from coordinates prop (for backward compatibility)
    memoizedCoordinates.forEach(([lat, lon, type]) => {
      const iconUrl =
        categoryIcons[type as keyof typeof categoryIcons] ||
        categoryIcons.default;

      try {
        const marker = L.marker([lat, lon], {
          icon: createCustomIcon(iconUrl, type),
          riseOnHover: true,
        }).addTo(map);

        bounds.extend(marker.getLatLng());
        hasMarkers = true;

        // ...existing popup code...
      } catch (e) {
        console.error("Error adding marker:", e);
      }
    });

    // Add markers from fetched events data
    memoizedEvents.forEach((eventItem, index) => {
      const { event } = eventItem;

      // Parse coordinates from strings to numbers
      const lat = parseFloat(event.latitude);
      const lon = parseFloat(event.longitude);

      // Skip if we don't have valid coordinates
      if (isNaN(lat) || isNaN(lon)) return;

      // Get icon URL based on event category
      const category = event.category.toLowerCase();
      const iconUrl =
        categoryIcons[category as keyof typeof categoryIcons] ||
        categoryIcons.default;

      try {
        const marker = L.marker([lat, lon], {
          icon: createCustomIcon(iconUrl, category),
          riseOnHover: true,
        }).addTo(map);

        bounds.extend(marker.getLatLng());
        hasMarkers = true;

        // Create popup with real event data
        const popupContent = document.createElement("div");
        popupContent.className = "popup-container";
        popupContent.innerHTML = `
        <div class="popup-title">${event.title}</div>
        <div class="popup-rating">
          ${event.overall_rating} ${Array.from(
          { length: Math.round(event.overall_rating) },
          () => "★"
        ).join("")}
          <span style="color: #bdc3c7;">${Array.from(
            { length: 5 - Math.round(event.overall_rating) },
            () => "★"
          ).join("")}</span>
          (${event.no_reviews} reviews)
        </div>
        <div class="popup-time">
          <i style="margin-right: 5px;">📅</i> ${event.date || "Upcoming"} ${
          event.time ? `at ${event.time}` : ""
        }
        </div>
        <div class="popup-location">
          <i style="margin-right: 5px;">📍</i> ${event.location}
        </div>
        <div style="margin-top: 8px;">
          <span class="${
            event.status === "delayed"
              ? "popup-status-delay"
              : "popup-status-ontime"
          }">
            ${event.status === "delayed" ? "Delayed" : "On Time"}
          </span>
        </div>
      `;

        const viewButton = document.createElement("button");
        viewButton.className = "popup-button";
        viewButton.textContent = "View Details";
        viewButton.onclick = () => {
          navigate(`/event-details?id=${event.id}`);
        };

        popupContent.appendChild(viewButton);

        marker.bindPopup(popupContent, {
          closeButton: true,
          className: "custom-popup",
          minWidth: 250,
          maxWidth: 300,
        });

        marker.on("mouseover", () => {
          marker.openPopup();
        });
      } catch (e) {
        console.error("Error adding event marker:", e);
      }
    });

    // Fit map to markers if we have any
    if (hasMarkers) {
      try {
        map.fitBounds(bounds, { padding: [40, 40] });
      } catch (e) {
        console.error("Error fitting bounds:", e);
        // Fallback to default view
        map.setView([28.0, 35.0], 7);
      }
    }
  }, [memoizedCoordinates, memoizedEvents, mapInitialized, navigate]);

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
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading events...
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
          {error}
        </div>
      )}
      <div
        id={mapContainerId.current}
        style={{
          ...mapStyles.container,
          height: "30rem", // Explicitly set height
          visibility: loading ? "hidden" : "visible", // Hide until loaded
        }}
      ></div>
    </div>
  );
};

export default MapWithPoints;
