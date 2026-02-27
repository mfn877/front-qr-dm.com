"use client";
import React, { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
import { validatePhone } from "@/lib/phoneValidation";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";
import PhoneField from "@/components/common/PhoneField";
import { callLoginModal } from "@/utils/authModal";

export default function WhatsAppQR() {
  /* ================= CONTENT ================= */
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const MAX_MESSAGE_LENGTH = 500;


  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [loading, setLoading] = useState(false);

  const [qrSvg, setQrSvg] = useState(null);

  /* ================= PHONE VALIDATION ================= */
  const { isValid, digitsOnly } = validatePhone(phone);

  /* ================= QR VALUE ================= */
  const whatsappValue =
    isValid && digitsOnly
      ? `https://wa.me/${digitsOnly}${message ? `?text=${encodeURIComponent(message)}` : ""
      }`
      : "";

  const isFormValid = isValid && digitsOnly;


  /* ================= SAVE QR ================= */
  const handleSaveQR = async () => {
    getToken() || callLoginModal("/qr-generator/whatsapp");
    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number for WhatsApp QR.",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        track: 0,
        qrtype: 9, // WHATSAPP QR
        file: qrSvg,
        content: {
          phone: digitsOnly,
          message,
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
          text: "Your WhatsApp QR has been saved successfully.",
          confirmButtonText: "OK",
        });
      } else if (res?.data?.status === "unauthenticated") {
        callLoginModal("/qr-generator/whatsapp");
      } else {
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      if (err.status === 401) {
        callLoginModal("/qr-generator/whatsapp");
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
        {/* ================= CONTENT ================= */}
        <div className="card">
          <h3>WhatsApp Data</h3>
          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">
                {/* <RequiredStar /> */}
              </label>
              <PhoneField
                label="Phone Number"
                required
                value={phone}
                onChange={setPhone}
              />

              {phone !== "" && !isValid && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  Please enter a valid phone number (e.g. +91XXXXXXXXXX)
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">
                Message
              </label>
              <textarea
                className="input"
                rows="4"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= MAX_MESSAGE_LENGTH) {
                    setMessage(value);
                  }
                }}
              />

              <p
                style={{
                  fontSize: "12px",
                  marginTop: "4px",
                  color: message.length >= MAX_MESSAGE_LENGTH ? "red" : "#666",
                  textAlign: "right",
                }}
              >
                {message.length} / {MAX_MESSAGE_LENGTH}
              </p>

            </div>
          </div>
        </div>

        {/* ================= CUSTOMIZATION ================= */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Customization</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
                onClick={() => document.getElementById("wa-logo-input").click()}
              >
                <input
                  id="wa-logo-input"
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

      {/* ================= QR PREVIEW ================= */}
      <QRPreview
        value={whatsappValue}
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
