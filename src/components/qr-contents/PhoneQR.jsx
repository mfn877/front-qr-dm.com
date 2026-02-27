"use client";
import React, { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired";
import { validatePhone } from "@/lib/phoneValidation";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";
import PhoneField from "@/components/common/PhoneField";
import "react-phone-input-2/lib/style.css";
import { callLoginModal } from "@/utils/authModal";



export default function PhoneQR() {
  const [phone, setPhone] = useState("");

  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);

  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [loading, setLoading] = useState(false);

  const [qrSvg, setQrSvg] = useState(null);

  /* ======================
     PHONE VALIDATION
  ======================= */
  const phoneResult = validatePhone(phone);
  const isValidPhone = phoneResult.isValid;
  const [isPhoneComplete, setIsPhoneComplete] = useState(false);

  /* ======================
     QR VALUE
  ======================= */
  const phoneValue = isValidPhone
    ? `${phoneResult.cleanPhone}`
    : "";


  /* ======================
     SAVE QR
  ======================= */
  const handleSaveQR = async () => {
    getToken() || callLoginModal("/qr-generator/phone");
    if (!isValidPhone) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number.",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        track: 0,
        qrtype: 3, // PHONE QR
        file: qrSvg,
        content: {
          phone: phoneResult.cleanPhone,
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
          text: "Your Phone QR has been saved successfully.",
          confirmButtonText: "OK",
        });

      } else if (res?.data?.status === "unauthenticated") {
        callLoginModal("/qr-generator/phone");
      } else {
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      if (err.status === 401) {
        callLoginModal("/qr-generator/phone");
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
          <div>
            <h3>Phone Data</h3>
          </div>
          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">

              </label>


              {/* ✅ FLAG + COUNTRY CODE INPUT */}
              <div className="input-group">
                <PhoneField
                  label="Phone Number"
                  required
                  value={phone}
                    onChange={(value) => {
    setPhone(value);
    setIsPhoneComplete(value.length > 3); // 👈 user started typing
  }}
                />
              </div>
{ isPhoneComplete && !isValidPhone && (
  <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
    Enter a valid phone number.
  </p>
)}

            </div>
          </div>
        </div>

        {/* ===== CUSTOMIZATION SECTION UNCHANGED ===== */}
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

            {/* PATTERN STYLE */}
            <div className="input-group">
              <label className="input-label">Pattern Style</label>
              <div className="pattern-grid">
                <button className={`pattern-btn ${pattern === "dots" ? "active" : ""}`} onClick={() => setPattern("dots")}>
                  Dots
                </button>
                <button className={`pattern-btn ${pattern === "rounded" ? "active" : ""}`} onClick={() => setPattern("rounded")}>
                  Rounded Dots
                </button>
                <button className={`pattern-btn ${pattern === "square" ? "active" : ""}`} onClick={() => setPattern("square")}>
                  Squares
                </button>
                <button className={`pattern-btn ${pattern === "extra-rounded" ? "active" : ""}`} onClick={() => setPattern("extra-rounded")}>
                  Rounded Squares
                </button>
                <button className={`pattern-btn ${pattern === "classy" ? "active" : ""}`} onClick={() => setPattern("classy")}>
                  Pixel
                </button>
              </div>
            </div>

            {/* ✅ EYE STYLE (FIXED) */}
            <div className="input-group" style={{ alignItems: "baseline" }}>
              <label className="input-label">Eye Style</label>
              <div className="eye-style-grid ms-4">
                <button
                  className={`pattern-btn ${eyeStyle === "square" ? "active" : ""}`}
                  onClick={() => setEyeStyle("square")}
                >
                  Square
                </button>
                <button
                  className={`pattern-btn ${eyeStyle === "rounded" ? "active" : ""}`}
                  onClick={() => setEyeStyle("rounded")}
                >
                  Rounded
                </button>
                <button
                  className={`pattern-btn ${eyeStyle === "soft" ? "active" : ""}`}
                  onClick={() => setEyeStyle("soft")}
                >
                  Soft
                </button>
              </div>
            </div>

            {/* LOGO */}
            <div>
              <label className="input-label">Logo Upload (Optional)</label>

              <div
                className="upload-zone"
                onClick={() => document.getElementById("logo-input").click()}
              >
                <input
                  id="logo-input"
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
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <p>Change logo</p>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width="32"
                      height="32"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p>Click to upload logo</p>
                    <p>PNG, JPG up to 2MB</p>
                  </>
                )}
              </div>
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

      {/* PREVIEW */}
      <QRPreview
        value={phoneValue}
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
