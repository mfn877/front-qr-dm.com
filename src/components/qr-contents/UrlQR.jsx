//src/components/qr-contents/UrlQR.jsx
"use client";
import { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired"
import api from "@/lib/api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { isValidHttpsUrl } from "@/lib/urlValidation";


export default function UrlQR() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [qrSvg, setQrSvg] = useState(null);

 const MAX_URL_LENGTH = 500;
const MAX_QR_CONTENT_LENGTH = 450;
const MIN_QR_SIZE_FOR_LONG_TEXT = 250;

const isQrContentTooLong =
  text.length > MAX_QR_CONTENT_LENGTH && size < MIN_QR_SIZE_FOR_LONG_TEXT;



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


  const handleSaveQR = async () => {
    if (!isValidUrl || !text) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid URL before saving.",
      });
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        track: 0,
        qrtype: 1,
        file: qrSvg || null,
        content: {
          url: text,
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
          text: "Your QR code has been successfully saved to dashboard.",
          confirmButtonText: "OK",
        }).then(() => router.push("/dashboard"));

      } else if (res?.data?.status === "unauthenticated") {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login or register to save QR codes.",
          showDenyButton: true,
          confirmButtonText: "Login",
          denyButtonText: "Register",
        }).then((result) => {
          if (result.isConfirmed) {
            openAuthModal("login");
          } else if (result.isDenied) {
            openAuthModal("signup");
          }
        });
        return;
      }

      else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Unable to save QR. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while saving the QR.",
      });
    } finally {
      setLoading(false);
    }
  };


 const isValidUrl = isValidHttpsUrl(text);

    text.trim() === "" ||
    (() => {
      try {
        const url = new URL(text);
        return (
          (url.protocol === "http:" || url.protocol === "https:") &&
          url.hostname.includes(".") &&
          url.hostname.length > 3
        );
      } catch {
        return false;
      }
    })();

  useEffect(() => {
    const listener = (e) => {
      if (e.data === "LOGIN_SUCCESS") {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Logged In",
          text: "You have successfully logged in, you can now save QR codes.",
        });
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
          <h3>URL Data</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">Enter URL   <RequiredStar /></label>
              <input
                type="text"
                className="input"
                placeholder="https://example.com"
                value={text}
               onChange={(e) => {
    if (e.target.value.length <= MAX_URL_LENGTH) {
      setText(e.target.value);
    }
  }}
/>

<p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
  {text.length}/{MAX_URL_LENGTH} characters
</p>
 
 {isQrContentTooLong && (
  <p style={{ color: "orange", fontSize: 12, marginTop: 4 }}>
    QR may become unreadable. Increase size or shorten the URL.
  </p>
)}

              {!isValidUrl && text.length > 0 && (
                <p style={{ color: "red", fontSize: 12, margin: "4px" }}>
                     PLEASE ENTER A VALID URL !
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CUSTOMIZATION */}
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
         value={
    isValidUrl && !isQrContentTooLong
      ? text
      : ""
  }
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
