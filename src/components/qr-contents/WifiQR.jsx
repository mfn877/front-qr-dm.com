//src/components/qr-contents/WifiQR.jsx
"use client";
import { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";
import { callLoginModal } from "@/utils/authModal";

export default function WifiQR() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("WPA");

  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [loading, setLoading] = useState(false);

  const [qrSvg, setQrSvg] = useState(null);

  const [passwordTouched, setPasswordTouched] = useState(false);

 
 
  useEffect(() => {
  if (security === "nopass") {
    setPassword("");
  }
}, [security]);
 

  /* ======================
   VALIDATION
  ====================== */

// SSID must be 3–32 characters
const isSSIDValid =
  ssid.trim().length >= 3 &&
  ssid.trim().length <= 32;

// Password validation
let isValidPassword = true;

if (security !== "nopass") {
  isValidPassword =
    password.trim().length >= 8 &&
    password.trim().length <= 63;
}

// Final form validation
const isFormValid = isSSIDValid && isValidPassword;


  /* ======================
     WIFI QR VALUE
  ======================= */
  const escapeWifi = (value = "") =>
    value.replace(/([\\;,:"])/g, "\\$1");

  const buildWifiQR = ({ ssid, password, security }) => {
    if (!ssid) return "";
    if (security === "nopass") {
      return `WIFI:T:nopass;S:${escapeWifi(ssid)};;`;
    }
    return `WIFI:T:${security};S:${escapeWifi(
      ssid
    )};P:${escapeWifi(password)};;`;
  };

  const wifiValue = isFormValid
    ? buildWifiQR({ ssid, password, security })
    : "";



  /* ======================
     SAVE QR
  ======================= */
  const handleSaveQR = async () => {
    getToken() || callLoginModal("/qr-generator/wifi");
    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: "Invalid WiFi Details",
        text: "Please fill all required WiFi details correctly.",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        track: 0,
        qrtype: 2, // WIFI QR
        file: qrSvg,
        content: {
          ssid,
          password: security === "nopass" ? "" : password,
          security,
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
          text: "Your WiFi QR has been saved successfully.",
          confirmButtonText: "OK",
        });
      } else if (res?.data?.status === "unauthenticated") {
        callLoginModal("/qr-generator/wifi");
      } else {
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      if (err.status === 401) {
        callLoginModal("/qr-generator/wifi");
        return;
      }
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* CONTENT */}
        <div className="card">
          <h3>WiFi Data</h3>
          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">
                Network Name (SSID) <RequiredStar />
              </label>
              <input
                type="text"
                className="input"
                placeholder="My WiFi Network"
                value={ssid}
                  autoComplete="off"
                onChange={(e) => setSsid(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                Password {security !== "nopass" && <RequiredStar />}
              </label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && !isValidPassword && (
  <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
    Please enter at least 8 characters!
  </p>
)}
           
            </div>

            <div className="input-group">
              <label className="input-label">
                Security Type <RequiredStar />
              </label>
              <select
                className="input"
                value={security}
                onChange={(e) => setSecurity(e.target.value)}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
          </div>
        </div>

        {/* CUSTOMIZATION — UNCHANGED */}
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
                onClick={() => document.getElementById("wifi-logo").click()}
              >
                <input
                  id="wifi-logo"
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

      {/* PREVIEW */}
      <QRPreview
        value={wifiValue}
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
