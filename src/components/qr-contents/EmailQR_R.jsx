//src/components/qr-contents/EmailQR.jsx
"use client";
import { useState } from "react";
import QRPreview from "../QRPreview";
import { validateEmail } from "@/lib/emailValidation";
import RequiredStar from "@/lib/starRequired";


export default function EmailQR() {
  // CONTENT
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // CUSTOMIZATION
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  // EMAIL VALIDATION
const { isValid: isEmailValid, cleanEmail } = validateEmail(email);

// ✅ EMAIL QR VALUE
  const emailValue =
  isEmailValid
    ? `mailto:${cleanEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    : "";


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* CONTENT */}
        <div className="card">
          <h3>Content</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">Email Address <RequiredStar/></label>
              <input
                type="email"
                className="input"
                placeholder="name@example.com"
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
              <label className="input-label">Subject </label>
              <input
                type="text"
                className="input"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Message </label>
              <textarea
                className="input"
                rows="4"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
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
                {["dots", "rounded", "square", "extra-rounded", "classy"].map((p) => (
                  <button
                    key={p}
                    className={`pattern-btn ${pattern === p ? "active" : ""}`}
                    onClick={() => setPattern(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* EYE STYLE */}
            <div className="input-group">
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
                onClick={() => document.getElementById("email-logo").click()}
              >
                <input
                  id="email-logo"
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
                    <img src={logo} alt="Logo" style={{ maxWidth: "100%" }} />
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

      {/* ✅ PREVIEW (FIXED) */}
      <QRPreview
        value={emailValue}
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
