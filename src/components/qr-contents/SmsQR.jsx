"use client";
import React, { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
// import { validatePhone } from "@/lib/phoneValidation";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";
import PhoneField from "@/components/common/PhoneField";
import { callLoginModal } from "@/utils/authModal";

export default function SmsQR() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  const MESSAGE_LIMIT = 300;


  /* ======================
     PHONE VALIDATION
  ======================= */
  // const { isValid, digitsOnly } = validatePhone(phone);

  /* ======================
     QR VALUE
  ======================= */
  // const smsValue =
  //   isValid && digitsOnly
  //     ? `sms:${digitsOnly}${
  //         message ? `?body=${encodeURIComponent(message)}` : ""
  //       }`
  //     : "";
  const smsValue = phone
    ? `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ""}`
    : "";


  /* ======================
     SAVE QR
  ======================= */
  const handleSaveQR = async () => {
    getToken() || callLoginModal("/qr-generator/sms");
    // if (!isValid || !digitsOnly) {
    if (!phone) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number.",
      });
      return;
    }

    try {
      const payload = {
        track: 0,
        qrtype: 4, // SMS QR
        file: qrSvg,
        content: {
          phone, // phone: digitsOnly,
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
          text: "Your SMS QR has been saved successfully.",
          confirmButtonText: "OK",
        }).then(() => router.push("/dashboard"));
      } else if (res?.data?.status === "unauthenticated") {
        callLoginModal("/qr-generator/sms");
      } else {
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      if (err.status === 401) {
        callLoginModal("/qr-generator/sms");
        return;
      }
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* CONTENT */}
        <div className="card">
          <h3>SMS Data</h3>

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


              {/* {phone !== "" && !isValid && (
                <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  Please enter a valid phone number (e.g. +91XXXXXXXXXX)
                </p>
              )} */}
            </div>

            <div className="input-group">
              <label className="input-label">
                Message
              </label>
              <textarea
                className="input"
                placeholder="Enter SMS message"
                value={message}
                onChange={(e) => {
                  if (e.target.value.length <= MESSAGE_LIMIT) {
                    setMessage(e.target.value);
                  }
                }}
              />

              <p
                style={{
                  fontSize: "12px",
                  textAlign: "right",
                  color: message.length === MESSAGE_LIMIT ? "red" : "#666",
                  marginTop: "4px",
                }}
              >
                {message.length}/{MESSAGE_LIMIT} characters
              </p>
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
                {["dots", "rounded", "square", "extra-rounded", "classy"].map((p) => (
                  <button
                    key={p}
                    className={`pattern-btn ${pattern === p ? "active" : ""}`}
                    onClick={() => setPattern(p)}
                  >
                    {p.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* EYE STYLE */}
            <div className="input-group" style={{ alignItems: "baseline" }}>
              <label className="input-label">Eye Style</label>
              <div className="eye-style-grid ms-4">
                {["square", "rounded", "soft"].map((e) => (
                  <button
                    key={e}
                    className={`pattern-btn ${eyeStyle === e ? "active" : ""}`}
                    onClick={() => setEyeStyle(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* LOGO */}
            <div>
              <label className="input-label">Logo Upload (Optional)</label>

              <div
                className="upload-zone"
                onClick={() => document.getElementById("sms-logo-input").click()}
              >
                <input
                  id="sms-logo-input"
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

      {/* PREVIEW */}
      <QRPreview
        value={smsValue}
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
