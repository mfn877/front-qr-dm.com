//src/components/qr-contents/BusinessCardQR.jsx
import React from 'react'
import { useState } from "react";
import QRPreview from "../QRPreview";
import { validatePhone } from "@/lib/phoneValidation";
import { validateEmail } from "@/lib/emailValidation";
import RequiredStar from "@/lib/starRequired";
export default function BusinessCardQR() {

  /* ================= CONTENT STATES ================= */
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [social, setSocial] = useState("");

  /* ================= VALIDATION ================= */
  // PHONE VALIDATION (from lib)
const phoneResult = validatePhone(phone);
const isValidPhone = phoneResult.isValid;

// EMAIL VALIDATION (LIB)
const emailResult = validateEmail(email);
const isValidEmail = emailResult.isValid; 
 
const urlRegex = /^https:\/\/[^\s]+\.[^\s]+$/;
const isValidWebsite = website === "" || urlRegex.test(website);

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);
  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  /* ================= QR VALUE ================= */
  /* ================= QR VALUE ================= */
const businessValue =
  name.trim() !== "" &&
  role.trim() !== "" &&
  phone.trim() !== "" &&
  email.trim() !== "" &&
  website.trim() !== "" &&
  social.trim() !== "" &&
  isValidPhone &&
  isValidEmail &&
  isValidWebsite
    ? `BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${role}
TEL:${phoneResult.cleanPhone}
EMAIL:${emaiResult.cleanPhone}
ADR:${address}
URL:${website}
NOTE:${social}
END:VCARD`
    : "";



  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="card">
          <h3>Content</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">Name <RequiredStar/></label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Title / Role <RequiredStar/></label>
              <input
                type="text"
                className="input"
                placeholder="Your title or role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone <RequiredStar/></label>
              <input
                type="text"
                className="input"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
{!isValidPhone && (
  <p style={{ color: "red", fontSize: 12 }}>
    Invalid phone number (use +91XXXXXXXXXX)
  </p>
)}

            </div>

            <div className="input-group">
              <label className="input-label">Email <RequiredStar/></label>
              <input
                type="email"
                className="input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isValidEmail && (
                <p style={{ color: "red", fontSize: 12 }}>Invalid email</p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Address</label>
              <textarea
                className="input"
                rows="2"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Website <RequiredStar/></label>
              <input
                type="url"
                className="input"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              {!isValidWebsite && (
                <p style={{ color: "red", fontSize: 12 }}>
                  Use https://example.com
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Social Media Links <RequiredStar/></label>
              <textarea
                className="input"
                rows="3"
                placeholder="Facebook, Instagram, LinkedIn URLs..."
                value={social}
                onChange={(e) => setSocial(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ================= CUSTOMIZATION ================= */}
        <div className="card">
          <h3>Customization</h3>

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

          <div className="input-group" style={{ alignItems: "baseline" }}>
            <label className="input-label">Eye Style</label>
            <div className="eye-style-grid ms-4">
              <button className={`pattern-btn ${eyeStyle === "square" ? "active" : ""}`} onClick={() => setEyeStyle("square")}>Square</button>
              <button className={`pattern-btn ${eyeStyle === "rounded" ? "active" : ""}`} onClick={() => setEyeStyle("rounded")}>Rounded</button>
              <button className={`pattern-btn ${eyeStyle === "soft" ? "active" : ""}`} onClick={() => setEyeStyle("soft")}>Soft</button>
            </div>
          </div>

          {/* ===== FIXED LOGO SECTION ===== */}
          <div>
            <label className="input-label">Logo Upload (Optional)</label>

            <div
              className="upload-zone"
              onClick={() => document.getElementById("biz-logo").click()}
            >
              <input
                id="biz-logo"
                type="file"
                hidden
                accept="image/png,image/jpeg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file || file.size > 2 * 1024 * 1024) return;
                  const reader = new FileReader();
                  reader.onload = () => setLogo(reader.result);
                  reader.readAsDataURL(file);
                }}
              />

              {logo ? (
                <img src={logo} alt="logo" style={{ maxWidth: "100%" }} />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p>Click to upload logo</p>
                  <p>PNG, JPG up to 2MB</p>
                </>
              )}
            </div>
          </div>

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

      <QRPreview
        value={businessValue}
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
