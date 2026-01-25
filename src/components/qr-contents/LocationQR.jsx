"use client";
import React, { useEffect, useMemo, useState } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";

export default function LocationQR() {
  /* ================= CONTENT ================= */
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [placeName, setPlaceName] = useState("");

  const [locationUrl, setLocationUrl] = useState("");

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  /* ================= VALIDATION ================= */
  const latitudeNumber = Number(latitude);
  const longitudeNumber = Number(longitude);

  const isValidLocationUrl =
  /^https?:\/\/.+/i.test(locationUrl.trim());

  const isValidLatitude =
    latitude.trim() === "" ||
    (!isNaN(latitudeNumber) &&
      latitudeNumber >= -90 &&
      latitudeNumber <= 90);

  const isValidLongitude =
    longitude.trim() === "" ||
    (!isNaN(longitudeNumber) &&
      longitudeNumber >= -180 &&
      longitudeNumber <= 180);

  const placeNameRegex = /^[A-Za-z0-9 ,]{3,}$/;
  const isValidPlaceName =
    placeName.trim() === "" || placeNameRegex.test(placeName.trim());

  const isFormValid =
    latitude &&
    longitude &&
    isValidLatitude &&
    isValidLongitude &&
    isValidPlaceName;

  /* ================= LOCATION QR VALUE ================= */
  const locationValue = useMemo(() => {
    if (!isFormValid) return "";
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }, [latitude, longitude, isFormValid]);

  /* ================= AUTH MODAL ================= */
  const openAuthModal = (type = "login") => {
    Swal.fire({
      title: type === "login" ? "Login Required" : "Create Account",
      html: `
        <div style="height:420px;">
          <iframe
            src="/${type}"
            style="width:100%;height:100%;border:none;border-radius:6px;"
          ></iframe>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      width: 520,
    });
  };

  /* ================= SAVE QR ================= */
  const handleSaveQR = async () => {
    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: "Invalid Location",
        text: "Please enter valid latitude and longitude values.",
      });
      return;
    }

    try {
      const payload = {
        track: 0,
        qrtype: 7, // LOCATION QR
        file: qrSvg,
        content: {
          latitude,
          longitude,
          place_name: placeName,
        },
        design: {
          qr_color: qrColor,
          bg_color: bgColor,
          size,
          pattern,
          eye_style: eyeStyle,
        },
      };

      const res = await api.post("/qr-data", payload);

      if (res?.data?.status_code === 1) {
        Swal.fire({
          icon: "success",
          title: "QR Saved!",
          text: "Your Location QR has been saved successfully.",
        });
      } else if (res?.data?.status === "unauthenticated") {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login or register to save QR codes.",
          showDenyButton: true,
          confirmButtonText: "Login",
          denyButtonText: "Register",
        }).then((result) => {
          if (result.isConfirmed) openAuthModal("login");
          if (result.isDenied) openAuthModal("signup");
        });
      } else {
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  /* ================= LOGIN SUCCESS FIX ================= */
  useEffect(() => {
    const listener = (e) => {
      if (e.origin !== window.location.origin) return;

      if (e.data === "LOGIN_SUCCESS") {
        const token = getToken();
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
        }
        Swal.close();
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* ================= CONTENT ================= */}
        <div className="card">
          <h3>Location Data</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">
                Latitude <RequiredStar />
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter latitude (e.g., 28.6139)"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              {latitude !== "" && !isValidLatitude && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  Please Enter a Valid Latitude !
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">
                Longitude <RequiredStar />
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter longitude (e.g., 77.2090)"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              {longitude !== "" && !isValidLongitude && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  Please Enter a Valid Longitude !
                </p>
              )}
            </div>

             <div className="input-group">
             <label className="input-label">
               Location Name (Optional)
              </label>
              <input
               type="text"
               className="input"
               placeholder="India Gate, New Delhi"
               value={placeName}
               onChange={(e) => setPlaceName(e.target.value)}
              />
             {placeName !== "" && !isValidPlaceName && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
             Please Enter a Valid Location Name !
            </p>
            )}
           </div>

            <div className="input-group">
            <label className="input-label">
            Location URL (Optional)
            </label>
            <input
             type="text"
             className="input"
             placeholder="https://maps.google.com/?q=India+Gate+New+Delhi"
             value={locationUrl}
             onChange={(e) => setLocationUrl(e.target.value)}
             />
            {locationUrl !== "" && !isValidLocationUrl && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
             Please Enter a Valid Location URL !
           </p>
           )}
           </div>

              </div>
             </div>

        {/* ================= CUSTOMIZATION ================= */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Customization</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* COLORS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="input-group">
                <label className="input-label">QR Color</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    className="input"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Background</label>
                <div className="color-input-group">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    className="input"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* PATTERN */}
            <div className="input-group">
              <label className="input-label">Pattern Style</label>
              <div className="pattern-grid">
                <button className={`pattern-btn ${pattern === "dots" ? "active" : ""}`} onClick={() => setPattern("dots")}>Dots</button>
                <button className={`pattern-btn ${pattern === "rounded" ? "active" : ""}`} onClick={() => setPattern("rounded")}>Rounded Dots</button>
                <button className={`pattern-btn ${pattern === "square" ? "active" : ""}`} onClick={() => setPattern("square")}>Squares</button>
                <button className={`pattern-btn ${pattern === "extra-rounded" ? "active" : ""}`} onClick={() => setPattern("extra-rounded")}>Rounded Squares</button>
                <button className={`pattern-btn ${pattern === "classy" ? "active" : ""}`} onClick={() => setPattern("classy")}>Pixel</button>
              </div>
            </div>

            {/* EYE STYLE */}
            <div className="input-group" style={{ alignItems: "baseline" }}>
              <label className="input-label">Eye Style</label>
              <div className="eye-style-grid ms-4">
                <button className={`pattern-btn ${eyeStyle === "square" ? "active" : ""}`} onClick={() => setEyeStyle("square")}>Square</button>
                <button className={`pattern-btn ${eyeStyle === "rounded" ? "active" : ""}`} onClick={() => setEyeStyle("rounded")}>Rounded</button>
                <button className={`pattern-btn ${eyeStyle === "soft" ? "active" : ""}`} onClick={() => setEyeStyle("soft")}>Soft</button>
              </div>
            </div>

            {/* LOGO */}
            <div>
              <label className="input-label">Logo Upload (Optional)</label>
              <div
                className="upload-zone"
                onClick={() => document.getElementById("location-logo-input").click()}
              >
                <input
                  id="location-logo-input"
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) {
                      alert("File must be under 2MB");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () => setLogo(reader.result);
                    reader.readAsDataURL(file);
                  }}
                />

                {logo ? (
                  <>
                    <img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    <p>Change logo</p>
                  </>
                ) : (
                  <>
                    <p>Click to upload logo</p>
                    <p>PNG, JPG up to 2MB</p>
                  </>
                )}
              </div>
            </div>

            {/* SIZE */}
            <div className="input-group">
              <label className="input-label">Size: {size} x {size}px</label>
              <input
                type="range"
                className="slider"
                min="90"
                max="310"
                step="10"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
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
      />
    </>
  );
}
