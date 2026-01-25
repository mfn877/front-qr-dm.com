"use client";
import React, { useEffect, useState } from "react";
import QRPreview2 from "../QRPreview2";
import RequiredStar from "@/lib/starRequired";
import { validateAppDownload } from "@/lib/appDownloadValidation";
import { isValidHttpsUrl } from "@/lib/urlValidation";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";

export default function AppDownloadQR() {
  /* ================= CONTENT ================= */
  const [ios, setIos] = useState("");
  const [android, setAndroid] = useState("");
  const [apk, setApk] = useState("");
  const [appName, setAppName] = useState("");


  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  /* ================= VALIDATION ================= */
  const { canGenerate, error, finalUrl } =
    validateAppDownload(ios, android, apk);

  /* ================= QR VALUE ================= */
  const qrValue = canGenerate ? finalUrl : "";

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
    if (!canGenerate) {
      Swal.fire({
        icon: "error",
        title: "Invalid App Links",
        text: "Please provide at least one valid app download link.",
      });
      return;
    }

    try {
      const payload = {
        track: 0,
        qrtype: 13, // APP DOWNLOAD QR
        file: qrSvg,
        content: {
          ios,
          android,
          apk,
          final_url: finalUrl,
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
          text: "Your App Download QR has been saved successfully.",
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
          <div>
            <h3>App Download QR Data</h3>
          </div>

          <div className="card-body px-0 pb-0">
          <div className="input-group">
          <label className="input-label">
           App Name
        </label>
           <input
             type="text"
             className="input"
             placeholder="Enter App Name"
             value={appName}
             onChange={(e) => setAppName(e.target.value)}
          />
        </div>
</div>
         
            <div className="input-group">
              <label className="input-label">
                App Store Link (iOS)
              </label>
              <input
                type="url"
                className="input"
                placeholder="https://apps.apple.com/app/..."
                value={ios}
                onChange={(e) => setIos(e.target.value)}
              />
            </div>
            {ios && !isValidHttpsUrl(ios) && (
              <p style={{ color: "red", fontSize: 12 }}>
                Invalid IOS App Store URL
              </p>
            )}

            <div className="input-group">
              <label className="input-label">
                Google Play Link (Android)
              </label>
              <input
                type="url"
                className="input"
                placeholder="https://play.google.com/store/apps/details?id=..."
                value={android}
                onChange={(e) => setAndroid(e.target.value)}
              />
            </div>
            {android && !isValidHttpsUrl(android) && (
              <p style={{ color: "red", fontSize: 12 }}>
                Invalid Play Store URL
              </p>
            )}

            <div className="input-group">
              <label className="input-label">
                Alternative APK Link (Optional)
              </label>
              <input
                type="url"
                className="input"
                placeholder="https://example.com/app.apk"
                value={apk}
                onChange={(e) => setApk(e.target.value)}
              />
            </div>

            {apk && !isValidHttpsUrl(apk) && (
              <p style={{ color: "red", fontSize: 12 }}>
                Please enter at least one app download link or Invalid APK URL
              </p>
            )}

            {error && (
              <p style={{ color: "red", fontSize: 12, marginTop: "8px" }}>
                {error}
              </p>
            )}
          </div>
    

        {/* ================= CUSTOMIZATION ================= */}
        <div className="card">
          <h3
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Customization
          </h3>

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
                    style={{ flex: 1 }}
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
                    style={{ flex: 1 }}
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
                onClick={() => document.getElementById("app-logo").click()}
              >
                <input
                  id="app-logo"
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
                  <img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
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
              <label className="input-label">
                Size: {size} x {size}px
              </label>
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

      {/* ================= QR PREVIEW ================= */}
      <QRPreview2
        value={qrValue}
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
