"use client";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";
import { callLoginModal } from "@/utils/authModal";

// ─── Replace with your key or set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env ────
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";

// Singleton loader — only injects the <script> once regardless of re-renders
let _mapsPromise = null;
function loadGoogleMaps() {
  if (_mapsPromise) return _mapsPromise;
  _mapsPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve(window.google.maps);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
  return _mapsPromise;
}

export default function LocationQR() {
  /* ================= CONTENT ================= */
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [mapsError, setMapsError] = useState(false);

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);
  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrSvg, setQrSvg] = useState(null);

  /* ================= REFS ================= */
  const searchInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  /* ================= LOAD GOOGLE MAPS SDK ================= */
  useEffect(() => {
    loadGoogleMaps()
      .then(() => setMapsLoaded(true))
      .catch(() => setMapsError(true));
  }, []);

  /* ================= INIT MAP ================= */
  useEffect(() => {
    if (!mapsLoaded || !mapContainerRef.current || mapInstanceRef.current) return;
    mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 39.8283, lng: -98.5795 }, // USA default
      zoom: 4,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
  }, [mapsLoaded]);

  /* ================= INIT AUTOCOMPLETE ================= */
  useEffect(() => {
    if (!mapsLoaded || !searchInputRef.current || autocompleteRef.current) return;

    const ac = new window.google.maps.places.Autocomplete(searchInputRef.current, {
      fields: ["geometry", "formatted_address", "name"],
    });

    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place.geometry?.location) {
        Swal.fire({
          icon: "warning", title: "Place Not Found",
          text: "No location details available for the selected place."
        });
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const name = place.name || place.formatted_address || "";

      setLatitude(lat.toFixed(6));
      setLongitude(lng.toFixed(6));
      setPlaceName(name);
      setSearchQuery(place.formatted_address || name);

      panMapTo(lat, lng);
    });

    autocompleteRef.current = ac;
    return () => window.google.maps.event.clearInstanceListeners(ac);
  }, [mapsLoaded]);

  /* ================= MAP HELPER ================= */
  const panMapTo = useCallback((lat, lng) => {
    if (!mapInstanceRef.current) return;
    const position = { lat, lng };
    mapInstanceRef.current.setCenter(position);
    mapInstanceRef.current.setZoom(15);
    if (markerRef.current) {
      markerRef.current.setPosition(position);
    } else {
      markerRef.current = new window.google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        animation: window.google.maps.Animation.DROP,
      });
    }
  }, []);

  // Called onBlur of the manual lat/lng inputs
  const syncMapToCoords = useCallback(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (!latitude || !longitude || isNaN(lat) || isNaN(lng)) return;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return;
    panMapTo(lat, lng);
  }, [latitude, longitude, panMapTo]);

  /* ================= CLEAR ================= */
  const handleClear = () => {
    setLatitude("");
    setLongitude("");
    setPlaceName("");
    setSearchQuery("");
    if (searchInputRef.current) searchInputRef.current.value = "";
    if (markerRef.current) { markerRef.current.setMap(null); markerRef.current = null; }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat: 39.8283, lng: -98.5795 });
      mapInstanceRef.current.setZoom(4);
      mapInstanceRef.current.setZoom(4);
    }
  };

  /* ================= VALIDATION ================= */
  const latNum = Number(latitude);
  const lngNum = Number(longitude);

  const isValidLatitude = latitude.trim() === "" || (!isNaN(latNum) && latNum >= -90 && latNum <= 90);
  const isValidLongitude = longitude.trim() === "" || (!isNaN(lngNum) && lngNum >= -180 && lngNum <= 180);

  const placeNameRegex = /^[A-Za-z0-9 ,.'\-]{2,}$/;
  const isValidPlaceName = placeName.trim() === "" || placeNameRegex.test(placeName.trim());

  const isFormValid = latitude && longitude && isValidLatitude && isValidLongitude && isValidPlaceName;

  /* ================= LOCATION QR VALUE ================= */
  const locationValue = useMemo(() => {
    if (!isFormValid) return "";
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }, [latitude, longitude, isFormValid]);

  /* ================= SAVE QR ================= */
  const handleSaveQR = async () => {
    getToken() || callLoginModal("/qr-generator/location");
    if (!isFormValid) {
      Swal.fire({
        icon: "error", title: "Invalid Location",
        text: "Please enter valid latitude and longitude values."
      });
      return;
    }
    try {
      setLoading(true);
      const payload = {
        track: 0, qrtype: 7, file: qrSvg,
        content: { latitude, longitude, place_name: placeName },
        design: { qr_color: qrColor, bg_color: bgColor, size, pattern, eye_style: eyeStyle },
      };
      const res = await api.post("/qr-data", payload);
      if (res?.data?.status_code === 1) {
        Swal.fire({
          icon: "success", title: "QR Saved!",
          text: "Your Location QR has been saved successfully.", confirmButtonText: "OK"
        });
      } else if (res?.data?.status === "unauthenticated") {
        callLoginModal("/qr-generator/location");
      } else {
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      console.error(err);
      if (err.status === 401) { callLoginModal("/qr-generator/location"); return; }
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER ================= */
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* ── CONTENT CARD ── */}
        <div className="card">
          <h3>Location Data</h3>

          <div className="card-body px-0 pb-0">

            {/* Search box */}
            <div className="mb-3">
              {/* <label className="input-label">
                Search Location <RequiredStar />
              </label> */}
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 10, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                  color: "#9ca3af", display: "flex", alignItems: "center",
                }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>

                <input
                  ref={searchInputRef}
                  type="text"
                  className="input"
                  placeholder={
                    mapsError ? "Google Maps failed to load" :
                      !mapsLoaded ? "Loading Google Maps…" :
                        "Search a place, address, or landmark…"
                  }
                  disabled={!mapsLoaded || mapsError}
                  style={{ paddingLeft: 34, paddingRight: (latitude || searchQuery) ? 36 : 12 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {(latitude || searchQuery) && (
                  <button type="button" onClick={handleClear} title="Clear" style={{
                    position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#6b7280", fontSize: 20, lineHeight: 1, padding: 0,
                  }}>×</button>
                )}
              </div>

              {mapsError && (
                <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  Could not load Google Maps. Check your API key or network connection.
                </p>
              )}
            </div>

            {/* Google Map embed */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div
                ref={mapContainerRef}
                style={{
                  width: "100%", height: 240, borderRadius: 10,
                  border: "1px solid #e5e7eb", background: "#f3f4f6", overflow: "hidden",
                }}
              />
            </div>

            {/* Lat / Lng side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Latitude <RequiredStar /></label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. 40.7128"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  onBlur={syncMapToCoords}
                />
                {latitude !== "" && !isValidLatitude && (
                  <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>Must be between −90 and 90</p>
                )}
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Longitude <RequiredStar /></label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. -74.0060"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  onBlur={syncMapToCoords}
                />
                {longitude !== "" && !isValidLongitude && (
                  <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>Must be between −180 and 180</p>
                )}
              </div>
            </div>

            {/* Place name */}
            <div className="input-group" style={{ marginTop: "1rem" }}>
              <label className="input-label">Location Name (Optional)</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Times Square, New York"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
              {placeName !== "" && !isValidPlaceName && (
                <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  Please enter a valid location name (min 2 characters)
                </p>
              )}
            </div>

            {/* Open in Maps link */}
            {isFormValid && (
              <a
                href={locationValue}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, color: "#2563eb", textDecoration: "none", marginTop: 4,
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Preview on Google Maps
              </a>
            )}
          </div>
        </div>

        {/* ── CUSTOMIZATION CARD ── */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Customization</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="input-group">
                <label className="input-label">QR Color</label>
                <div className="color-input-group">
                  <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="color-picker" />
                  <input type="text" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="input" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Background</label>
                <div className="color-input-group">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="color-picker" />
                  <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="input" />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Pattern Style</label>
              <div className="pattern-grid">
                {[["dots", "Dots"], ["rounded", "Rounded Dots"], ["square", "Squares"], ["extra-rounded", "Rounded Squares"], ["classy", "Pixel"]].map(([v, l]) => (
                  <button key={v} className={`pattern-btn ${pattern === v ? "active" : ""}`} onClick={() => setPattern(v)}>{l}</button>
                ))}
              </div>
            </div>

            <div className="input-group" style={{ alignItems: "baseline" }}>
              <label className="input-label">Eye Style</label>
              <div className="eye-style-grid ms-4">
                {[["square", "Square"], ["rounded", "Rounded"], ["soft", "Soft"]].map(([v, l]) => (
                  <button key={v} className={`pattern-btn ${eyeStyle === v ? "active" : ""}`} onClick={() => setEyeStyle(v)}>{l}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="input-label">Logo Upload (Optional)</label>
              <div className="upload-zone" onClick={() => document.getElementById("location-logo-input").click()}>
                <input
                  id="location-logo-input" type="file" accept="image/png,image/jpeg" hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) { alert("File must be under 2MB"); return; }
                    const reader = new FileReader();
                    reader.onload = () => setLogo(reader.result);
                    reader.readAsDataURL(file);
                  }}
                />
                {logo ? (
                  <><img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%" }} /><p>Change logo</p></>
                ) : (
                  <><p>Click to upload logo</p><p>PNG, JPG up to 2MB</p></>
                )}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Size: {size} x {size}px</label>
              <input type="range" className="slider" min="90" max="310" step="10"
                value={size} onChange={(e) => setSize(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= PREVIEW ================= */}
      <QRPreview
        value={locationValue}
        qrColor={qrColor}
        bgColor={bgColor}
        size={size}
        pattern={pattern}
        eyeStyle={eyeStyle}
        logo={logo}
        onSave={handleSaveQR}
        onSvgReady={setQrSvg}
        loading={loading}
      />
    </>
  );
}
