import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapPickerProps {
  startRide: Location | null;
  endRide: Location | null;
  onStartRideChange: (location: Location) => void;
  onEndRideChange: (location: Location) => void;
  mode: "start" | "end";
}

export function MapPicker({
  startRide,
  endRide,
  onStartRideChange,
  onEndRideChange,
  mode,
}: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const startMarkerRef = useRef<any>(null);
  const endMarkerRef = useRef<any>(null);
  const routeLayerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Store mode in a ref so it's always current in the click handler
  const modeRef = useRef(mode);

  // Update the ref whenever mode changes
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Reverse geocoding function
  const getAddress = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  // Calculate route between two points
  const updateRoute = async (start: Location, end: Location) => {
    if (!mapInstanceRef.current) return;

    // Remove existing route
    if (routeLayerRef.current) {
      mapInstanceRef.current.removeLayer(routeLayerRef.current);
    }

    try {
      // Using OSRM for routing
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes[0]) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]]
        );

        // @ts-ignore - Leaflet types
        const L = window.L;
        routeLayerRef.current = L.polyline(coordinates, {
          color: "#6366f1",
          weight: 4,
          opacity: 0.7,
        }).addTo(mapInstanceRef.current);

        // Fit map to show entire route
        const bounds = L.latLngBounds([
          [start.lat, start.lng],
          [end.lat, end.lng],
        ]);
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // @ts-ignore - Leaflet types
    const L = window.L;

    // Initialize map
    const map = L.map(mapRef.current).setView([23.8103, 90.4125], 12);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Handle map clicks - Use modeRef.current to always get the latest mode value
    map.on("click", async (e: any) => {
      const { lat, lng } = e.latlng;
      const address = await getAddress(lat, lng);

      // Use modeRef.current instead of mode to get the current value
      if (modeRef.current === "start") {
        onStartRideChange({ lat, lng, address });
      } else {
        onEndRideChange({ lat, lng, address });
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLoaded, onStartRideChange, onEndRideChange]);

  // Update markers and route when locations change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // @ts-ignore - Leaflet types
    const L = window.L;

    // Custom icon for start marker
    const startIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <svg style="transform: rotate(45deg); width: 20px; height: 20px; color: white;" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    // Custom icon for end marker
    const endIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <svg style="transform: rotate(45deg); width: 20px; height: 20px; color: white;" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    // Update start marker
    if (startRide) {
      if (startMarkerRef.current) {
        mapInstanceRef.current.removeLayer(startMarkerRef.current);
      }
      startMarkerRef.current = L.marker([startRide.lat, startRide.lng], {
        icon: startIcon,
      })
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `<strong>Pickup Location</strong><br/>${
            startRide.address || "Loading..."
          }`
        );
    }

    // Update end marker
    if (endRide) {
      if (endMarkerRef.current) {
        mapInstanceRef.current.removeLayer(endMarkerRef.current);
      }
      endMarkerRef.current = L.marker([endRide.lat, endRide.lng], {
        icon: endIcon,
      })
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `<strong>Destination</strong><br/>${endRide.address || "Loading..."}`
        );
    }

    // Update route if both locations are set
    if (startRide && endRide) {
      updateRoute(startRide, endRide);
    }
  }, [startRide, endRide, isLoaded]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-2xl overflow-hidden border-4 border-white/50 shadow-2xl"
      />
      <div className="absolute top-4 left-4 z-[1000] space-y-2">
        <Badge
          className={`px-4 py-2 ${
            mode === "start"
              ? "bg-gradient-to-r from-blue-600 to-purple-600"
              : "bg-gradient-to-r from-pink-600 to-orange-600"
          } text-white border-0 shadow-lg`}
        >
          {mode === "start" ? (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Click to set pickup location
            </>
          ) : (
            <>
              <Navigation className="mr-2 h-4 w-4" />
              Click to set destination
            </>
          )}
        </Badge>
      </div>
    </div>
  );
}
