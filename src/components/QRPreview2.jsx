"use client";
import { useRef } from "react";

export default function QRPreview2({
  value,
  size,
  bgColor,
  qrColor,
  pattern,
  eyeStyle,
  logo,
  onSave,
}) {
  const ref = useRef(null);

  const hasValue = value && value.trim().length > 0;

  // Download buttons remain but disabled (no QR logic)
  const downloadPNG = () => {};
  const downloadSVG = () => {};

  return (
    <div className="qr-preview">
      <div className="card">
        <h3 style={{ marginBottom: "1rem" }}>Preview</h3>

        <div
          className="preview-qr"
          style={{
            minHeight: 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!hasValue ? (
            <div style={{ opacity: 0.5, fontSize: 14 }}>Save to generate QR code </div>
          ) : (
            <div ref={ref} />
          )}
        </div>

        {/* DOWNLOAD BUTTONS */}
        <div className="download-buttons">
        
          </div>
      </div>

      <button
        className="btn btn-secondary"
        style={{ width: "100%", marginTop: "1rem" }}
       
        onClick={onSave}
      >
        Save to Dashboard
      </button>
    </div>
  );
}
