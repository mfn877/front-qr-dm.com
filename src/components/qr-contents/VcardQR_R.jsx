//src/components/qr-contents/VcardQR.jsx
"use client";
import React, { useState } from "react";
import QRPreview from "../QRPreview";
import { validatePhone } from "@/lib/phoneValidation";
import { validateEmail } from "@/lib/emailValidation";
import RequiredStar from "@/lib/starRequired"

export default function VcardQR() {
  /* ================= CONTENT STATES ================= */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState(""); 

  // ================= VALIDATION =================

 const nameRegex = /^[A-Za-z]{2,}$/;
 const phoneRegex = /^\+[1-9\s]{10,14}$/;
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidFirstName = nameRegex.test(firstName.trim());
const isValidLastName  = nameRegex.test(lastName.trim());
 
const { isValid: isPhoneValid, cleanPhone } = validatePhone(phone);
const { isValid: isEmailValid, cleanEmail } = validateEmail(email);

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  /* ================= VCard VALUE ================= */
  const canGenerateVCard  =
  isValidFirstName &&
  isValidLastName &&
  isPhoneValid &&
  isEmailValid
  
const vcardValue = canGenerateVCard
      ? `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${org}
TEL:${phone}
EMAIL:${email}
END:VCARD`
      : "";

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* ================= CONTENT ================= */}
        <div className="card">
          <h3>Content</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">First Name <RequiredStar/></label>
              <input
                type="text"
                className="input"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstName !== "" && !isValidFirstName && (
           <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
             Please Enter a Valid First Name !
           </p>
          )}

            </div>

            <div className="input-group">
              <label className="input-label">Last Name</label>
              <input
                type="text"
                className="input"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
             {lastName !== "" && !isValidLastName && (
           <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          Please Enter a Valid Last Name !
          </p>
        )}
 
            </div>

            <div className="input-group">
              <label className="input-label">Phone <RequiredStar/></label>
              <input
                type="tel"
                className="input"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
             {/* ❌ ERROR MESSAGE */}
           {phone !== "" && !isPhoneValid && (
  <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
    Please enter a valid phone number  (e.g. +91XXXXXXXXXX)
  </p>
)}

            </div>

            <div className="input-group">
              <label className="input-label">Email </label>
              <input
                type="email"
                className="input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email !== "" && !isEmailValid && (
  <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
    Please enter a valid email (example@domain.com)
  </p>
)}


            </div>

            <div className="input-group">
              <label className="input-label">Organization</label>
              <input
                type="text"
                className="input"
                placeholder="Company Name"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ================= CUSTOMIZATION ================= */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Customization</h3>

          {/* COLORS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
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
              onClick={() => document.getElementById("vcard-logo").click()}
            >
              <input
                id="vcard-logo"
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (file.size > 2 * 1024 * 1024) {
                    alert("Max 2MB allowed");
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

      {/* ================= PREVIEW ================= */}
      <QRPreview
        value={vcardValue}
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
