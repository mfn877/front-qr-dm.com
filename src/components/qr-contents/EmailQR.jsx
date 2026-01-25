"use client";
import React, { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
import { validateEmail } from "@/lib/emailValidation";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";

export default function EmailQR() {
  /* ======================
     CONTENT
  ======================= */
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const EMAIL_TOTAL_MAX = 254;
  const EMAIL_LOCAL_MAX = 64;
  const EMAIL_DOMAIN_MAX = 255;
  const MESSAGE_LIMIT = 160;



  /* ======================
     CUSTOMIZATION
  ======================= */
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  /* ======================
     EMAIL VALIDATION
  ======================= */
  const { isValid: isEmailValid, cleanEmail } = validateEmail(email);

  /* ======================
     EMAIL QR VALUE
  ======================= */
  const emailValue = isEmailValid
    ? `mailto:${cleanEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`
    : "";

  /* ======================
     AUTH MODAL
  ======================= */
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

  /* ======================
     SAVE QR
  ======================= */
  const handleSaveQR = async () => {
    if (!isEmailValid) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      const payload = {
        track: 0,
        qrtype: 5, // EMAIL QR
        file: qrSvg,
        content: {
          email: cleanEmail,
          subject,
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
          text: "Your Email QR has been saved successfully.",
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

  /* ======================
     LOGIN SUCCESS FIX
  ======================= */
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
        {/* CONTENT */}
        <div className="card">
          <h3>Email Data</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">
                Email Address <RequiredStar />
              </label>
              <input
                type="email"
                className="input"
                placeholder="name@example.com"
                value={email}
                maxLength={254}
               onChange={(e) => {
  let value = e.target.value;

  // total length check
  if (value.length > EMAIL_TOTAL_MAX) return;

  // split local and domain
  const parts = value.split("@");

  // local-part limit
  if (parts[0].length > EMAIL_LOCAL_MAX) return;

  // domain-part limit
  if (parts[1] && parts[1].length > EMAIL_DOMAIN_MAX) return;

  setEmail(value);
}}
              />

              {email !== "" && !isEmailValid && (
                <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  Please enter a valid email (example@domain.com)
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Subject</label>
              <input
                type="text"
                className="input"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Message</label>
          <textarea
          className="input"
          rows="4"
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

      {/* PREVIEW */}
      <QRPreview
        value={emailValue}
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
