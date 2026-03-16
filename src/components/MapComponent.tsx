"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CountryData {
  code: string;
  name: string;
  users: number;
  sessions: number;
  growth: number;
  percentage: number;
}

const countryCodeToName: Record<string, string> = {
  US: "United States of America",
  IN: "India",
  GB: "United Kingdom",
  DE: "Germany",
  CA: "Canada",
  AU: "Australia",
  SG: "Singapore",
  JP: "Japan",
  NL: "Netherlands",
  FR: "France",
};

export default function MapComponent({ data }: { data: CountryData[] }) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up existing map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Create the map
    const map = L.map(containerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: true,
    });
    mapRef.current = map;

    // Add dark tile layer without labels
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; CARTO",
        maxZoom: 19,
      },
    ).addTo(map);

    // Create data lookup by country code
    const dataLookup: Record<string, CountryData> = {};
    data.forEach((country) => {
      dataLookup[country.code] = country;
    });

    console.log("MapComponent - Data lookup created:", dataLookup);
    const maxUsers = Math.max(...data.map((d) => d.users));
    console.log("MapComponent - Max users:", maxUsers);

    // Function to get color based on user count (blue shade heatmap)
    const getColor = (users: number | undefined): string => {
      if (!users || users === 0) return "#1e293b";
      const intensity = users / maxUsers;
      if (intensity > 0.75) return "#0c4a6e"; // darkest blue
      if (intensity > 0.5) return "#075985"; // dark blue
      if (intensity > 0.25) return "#0369a1"; // medium blue
      if (intensity > 0.1) return "#0284c7"; // light blue
      return "#38bdf8"; // lightest blue
    };

    // Load world GeoJSON and create heatmap
    // Using Natural Earth data which has proper ISO country codes
    // Fetch via local API route to avoid CORS issues
    fetch("/api/geojson")
      .then((res) => {
        console.log("GeoJSON fetch response status:", res.status);
        return res.json();
      })
      .then((geojson: any) => {
        console.log(
          "GeoJSON loaded successfully, feature count:",
          geojson.features?.length,
        );
        console.log(
          "Sample feature ISO_A2 codes:",
          geojson.features?.slice(0, 5).map((f: any) => f.properties?.ISO_A2),
        );

        L.geoJSON(geojson, {
          style: (feature: any) => {
            const props = feature.properties;
            // Match using ISO_A2 code
            const code = props?.ISO_A2;
            const countryData = code ? dataLookup[code] : undefined;
            const users = countryData?.users || 0;
            const color = getColor(users);

            console.log(
              `Feature: ${props?.NAME}, Code: ${code}, Users: ${users}, Color: ${color}`,
            );

            return {
              fillColor: color,
              weight: 0.5,
              opacity: 1,
              color: "#0f172a",
              fillOpacity: 0.85,
            };
          },
          onEachFeature: (feature: any, layer: L.Layer) => {
            const props = feature.properties;
            const code = props?.ISO_A2;
            const countryData = code ? dataLookup[code] : undefined;
            const countryName = props?.NAME || "Unknown Country";

            if (countryData) {
              const popupContent = `
                <div style="color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width: 200px;">
                  <div style="font-weight: bold; font-size: 15px; margin-bottom: 8px; color: #e0f2fe;">${countryName}</div>
                  <div style="font-size: 13px; margin: 4px 0; color: #cbd5e1;">
                    👥 <strong>${countryData.users.toLocaleString()}</strong> users
                  </div>
                  <div style="font-size: 13px; margin: 4px 0; color: #cbd5e1;">
                    📊 <strong>${countryData.sessions.toLocaleString()}</strong> sessions
                  </div>
                  <div style="font-size: 13px; margin: 4px 0; color: ${countryData.growth > 0 ? "#10b981" : "#ef4444"};">
                    ${countryData.growth > 0 ? "📈" : "📉"} <strong>${Math.abs(countryData.growth)}%</strong> growth
                  </div>
                  <div style="font-size: 12px; margin-top: 6px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px;">
                    <strong>${((countryData.users / maxUsers) * 100).toFixed(1)}%</strong> of total market
                  </div>
                </div>
              `;

              (layer as any).bindPopup(popupContent, {
                className: "map-popup",
                maxWidth: 280,
              });

              // Add hover effects
              const featureLayer = layer as any;
              featureLayer.on("mouseover", () => {
                featureLayer.setStyle({
                  fillOpacity: 1,
                  weight: 1.5,
                  color: "#0ea5e9",
                });
                featureLayer.bringToFront();
              });

              featureLayer.on("mouseout", () => {
                featureLayer.setStyle({
                  fillOpacity: 0.85,
                  weight: 0.5,
                  color: "#0f172a",
                });
              });
            } else {
              // For countries without data
              const featureLayer = layer as any;
              featureLayer.on("mouseover", () => {
                featureLayer.setStyle({
                  fillOpacity: 0.6,
                  weight: 1.5,
                  color: "#64748b",
                });
              });

              featureLayer.on("mouseout", () => {
                featureLayer.setStyle({
                  fillOpacity: 0.5,
                  weight: 0.5,
                  color: "#0f172a",
                });
              });
            }
          },
        }).addTo(map);

        // Add custom popup styling
        const style = document.createElement("style");
        style.textContent = `
          .map-popup .leaflet-popup-content-wrapper {
            background-color: rgba(15, 23, 42, 0.98) !important;
            border: 1px solid rgba(6, 182, 212, 0.6) !important;
            border-radius: 12px !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(6, 182, 212, 0.2) !important;
            backdrop-filter: blur(12px);
            padding: 10px 12px !important;
          }
          .map-popup .leaflet-popup-tip {
            background-color: rgba(15, 23, 42, 0.98) !important;
            border-top-color: rgba(15, 23, 42, 0.98) !important;
          }
          .map-popup .leaflet-popup-close-button {
            color: #94a3b8 !important;
          }
          .map-popup .leaflet-popup-close-button:hover {
            color: #e0f2fe !important;
          }
        `;
        if (!document.body.querySelector('style[data-map-popup="true"]')) {
          style.setAttribute("data-map-popup", "true");
          document.head.appendChild(style);
        }
      })
      .catch((error) => {
        console.error("Error loading GeoJSON:", error);
        console.error("Full error details:", error?.message, error?.stack);
      });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="w-full h-96 rounded-lg border border-white/10 overflow-hidden shadow-lg"
        style={{ backgroundColor: "#0f172a" }}
      />
      <div className="grid grid-cols-5 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#0c4a6e" }}
          ></div>
          <span className="text-slate-300">Highest</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#075985" }}
          ></div>
          <span className="text-slate-300">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#0369a1" }}
          ></div>
          <span className="text-slate-300">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#0284c7" }}
          ></div>
          <span className="text-slate-300">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#1e293b" }}
          ></div>
          <span className="text-slate-300">None</span>
        </div>
      </div>
    </div>
  );
}
