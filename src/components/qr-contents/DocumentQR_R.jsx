//src/components/qr-contents/DocumentQR.jsx
import React from "react";
import { useState } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired";

export default function DocumentQR() {
  const [fileUrl, setFileUrl] = useState("");

  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [error, setError] = useState("");

  /* FILE VALIDATION */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("PLEASE UPLOAD A DOCUMENT !");
      setFileUrl("");
      return;
    }

    setError("");
    setFileUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* CONTENT */}
        <div className="card">
          <h3>Content</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">Upload Document <RequiredStar/></label>
              <input
                type="file"
                className="input"
                accept=".doc,.docx,.txt,.rtf,.odt,.ppt,.pptx,.xls,.xlsx"
                onChange={handleFileUpload}
              />

              {error && (
                <p style={{ color: "red", fontSize: 12, marginTop: "4px" }}>
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CUSTOMIZATION */}
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
                onClick={() => document.getElementById("doc-logo-input").click()}
              >
                <input
                  id="doc-logo-input"
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
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
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

      {/* QR PREVIEW */}
      <QRPreview
        value={fileUrl}
        qrColor={qrColor}
        bgColor={bgColor}
        size={size}
        pattern={pattern}
        eyeStyle={eyeStyle}
        logo={logo}
      />
    </>
  );
}
