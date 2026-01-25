"use client";
import React, { useEffect, useState } from "react";
import QRPreview2 from "../QRPreview2";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";

export default function PdfQR() {
  /* ================= CONTENT ================= */
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  /* ================= FILE VALIDATION ================= */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("PLEASE UPLOAD A FILE !");
      setFileUrl("");
      return;
    }

    setError("");
    setFileUrl(URL.createObjectURL(file));
  };

  const isFormValid = fileUrl !== "";

  /* ================= AUTH MODAL ================= */
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

  /* ================= SAVE QR ================= */
  const handleSaveQR = async () => {
    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: "File Required",
        text: "Please upload a file to generate QR.",
      });
      return;
    }

    try {
      const payload = {
        track: 0,
        qrtype: 17, // PDF / FILE QR
        file: qrSvg,
        content: {
          file_url: fileUrl,
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
        Swal.fire("Saved!", "PDF QR saved successfully.", "success");
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

  /* ================= LOGIN SUCCESS FIX ================= */
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
              <div className="card">
                <div className="">
                  <h3>PDF / File Upload Data</h3>
                </div>
                <div className="card-body px-0 pb-0">
                  <div className="input-group">
                    <label className="input-label">Upload PDF / File <RequiredStar/></label>
                    <input
                      type="file"
                      className="input"
                      accept=".pdf,.doc,.docx,.txt,.rtf,.ppt,.pptx,.xls,.xlsx" onChange={(e) => handleFileUpload(e)}
                    />
                    {error && (
                      <p style={{ color: "red", fontSize: 12, marginTop: "4px" }}>
                        {error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="card">
                <h3
                  style={{
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  Customization
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
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
                          id="qr-color"
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
                          id="bg-color"
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
                  <div className="input-group">
                    <label className="input-label">Pattern Style</label>
                    <div className="pattern-grid">
                      <button
                        className={`pattern-btn ${
                          pattern === "dots" ? "active" : ""
                        }`}
                        onClick={() => setPattern("dots")}
                      >
                        Dots
                      </button>
                      <button
                        className={`pattern-btn ${
                          pattern === "rounded" ? "active" : ""
                        }`}
                        onClick={() => setPattern("rounded")}
                      >
                        Rounded Dots
                      </button>
                      <button
                        className={`pattern-btn ${
                          pattern === "square" ? "active" : ""
                        }`}
                        onClick={() => setPattern("square")}
                      >
                        Squares
                      </button>
                      <button
                        className={`pattern-btn ${
                          pattern === "extra-rounded" ? "active" : ""
                        }`}
                        onClick={() => setPattern("extra-rounded")}
                      >
                        Rounded Squares
                      </button>
                      <button
                        className={`pattern-btn ${
                          pattern === "classy" ? "active" : ""
                        }`}
                        onClick={() => setPattern("classy")}
                      >
                        Pixel
                      </button>
                    </div>
                  </div>
                  <div className="input-group" style={{ alignItems: "baseline" }}>
                    <label className="input-label">Eye Style</label>
                    <div className="eye-style-grid ms-4">
                      <button
                        className={`pattern-btn ${
                          eyeStyle === "square" ? "active" : ""
                        }`}
                        onClick={() => setEyeStyle("square")}
                      >
                        Square
                      </button>
                      <button
                        className={`pattern-btn ${
                          eyeStyle === "rounded" ? "active" : ""
                        }`}
                        onClick={() => setEyeStyle("rounded")}
                      >
                        Rounded
                      </button>
                      <button
                        className={`pattern-btn ${
                          eyeStyle === "soft" ? "active" : ""
                        }`}
                        onClick={() => setEyeStyle("soft")}
                      >
                        Soft
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <label className="input-label">Logo Upload (Optional)</label>
                    <div
                      className="upload-zone"
                      onClick={() => document.getElementById("pdf-logo").click()}
                    >
                      <input
                        id="pdf-logo"
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
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
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
                  <div className="input-group">
                    <label className="input-label">
                      Size: <span id="size-value">512</span>x
                      <span id="size-value-2">512</span>px
                    </label>
                    <input
                      type="range"
                      className="slider"
                      min="90"
                      max="310"
                      step="10"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      id="size-slider"
                    />
                    {/* <span>{size}px</span> */}
                  </div>
                </div>
              </div>
            </div>

      <QRPreview2
        value={fileUrl}
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
