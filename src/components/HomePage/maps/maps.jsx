import React, { useEffect } from "react";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./maps.css";

let IconUrl = [
  [
    "https://img.icons8.com/?size=100&id=3nOZtpH7KQrP&format=png&color=000000",
    "location",
  ],
  [
    "https://img.icons8.com/?size=100&id=c6ewObnLF0MS&format=png&color=000000",
    "swim",
  ],
  [
    "https://img.icons8.com/?size=100&id=xUv6v2ef9Tua&format=png&color=000000",
    "golf",
  ],
  [
    "https://img.icons8.com/?size=100&id=QCNE0Uy4iZhq&format=png&color=000000",
    "music",
  ],
  [
    "https://img.icons8.com/?size=100&id=8Na1VyvcBemC&format=png&color=000000",
    "shopping",
  ],
  [
    "https://img.icons8.com/?size=100&id=hGzLo79r7KzD&format=png&color=000000",
    "school",
  ],
];

const MapWithPoints = ({ coordinates }) => {
  useEffect(() => {
    const map = L.map("map-container").setView([0, 0], 1);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "© Esri, Maxar, Earthstar Geographics, and the GIS User Community",
      }
    ).addTo(map);

    const bounds = L.latLngBounds();

    coordinates.forEach(([lat, lon, type], index) => {
      const marker = L.marker([lat, lon], {
        icon: L.icon({
          iconUrl: IconUrl.find((icon) => icon[1] === type)[0],
          iconSize: [30, 30],
        }),
      }).addTo(map);
      bounds.extend(marker.getLatLng());

      marker.bindPopup(`
        <div style="text-align: center; background-color: #fafafa; padding: 10px; border-radius: 6px;">
            <p style="margin: 0; font-weight: bold; color: #333;">
                ${type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
            <p style="margin: 0; color: #999;">
                Rating 5.0 ${Array.from({ length: index + 1 }, () => "★").join(
                  ""
                )} (23 reviews)
            </p>
            <p style="margin: 0; color: #999;">
                ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
            </p>
                
            <p style="margin: 0;" className=${index<5 ? "onSchedule" : "onDelay" } > ${index<5 ? "On Time" : "Delayed" }</p>
        </div>
    `);
    });
    map.fitBounds(bounds);

    return () => map.remove();
  }, [coordinates]);
  return (
    <div className="mapContainerIt">
      <p className="mapContainerIt_title">Find Events on Map</p>
      <div id="map-container" style={{ width: "70rem", height: "30rem" }}></div>
    </div>
  );
};

export default MapWithPoints;
