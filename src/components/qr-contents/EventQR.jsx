"use client";
import React, { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";
import { callLoginModal } from "@/utils/authModal";

export default function EventQR() {
  /* ================= CONTENT ================= */
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const DESCRIPTION_LIMIT = 50;


  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);
  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);
  const [loading, setLoading] = useState(false);
  /* ================= VALIDATION ================= */
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  const isEndAfterStart =
    startDate && endDate ? endDate > startDate : false;

  const isValid =
    title.trim() !== "" &&
    location.trim() !== "" &&
    start !== "" &&
    end !== "" &&
    isEndAfterStart;
  description.length <= DESCRIPTION_LIMIT;

  /* ================= EVENT QR VALUE ================= */
//   const eventValue = isValid
//     ? `https://calendar.google.com/calendar/render?action=TEMPLATE
// &text=${encodeURIComponent(title)}
// &dates=${start.replace(/[-:]/g, "")}/${end.replace(/[-:]/g, "")}
// &details=${encodeURIComponent(description)}
// &location=${encodeURIComponent(location)}`
//     : "";

const formatToICS = (dateStr) => {
  // "2025-06-15T14:30" → "20250615T143000"
  return dateStr.replace(/[-:]/g, "").replace("T", "T") + "00";
};

const eventValue = isValid
  ? [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DTSTART:${formatToICS(start)}`,
      `DTEND:${formatToICS(end)}`,
      `DESCRIPTION:${description}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
  : "";


  /* ================= SAVE QR ================= */
  const handleSaveQR = async () => {
    getToken() || callLoginModal("/qr-generator/event");
    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Invalid Event Details",
        text: "Please fill all required fields correctly.",
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        track: 0,
        qrtype: 13, // EVENT QR
        file: qrSvg,
        content: {
          title,
          location,
          start_datetime: start,
          end_datetime: end,
          description,
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
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "QR Saved!",
          text: "Your Event QR has been saved successfully.",
          confirmButtonText: "OK",
        });
      } else if (res?.data?.status === "unauthenticated") {
        setLoading(false);
        callLoginModal("/qr-generator/event");
      } else {
        setLoading(false);
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.status === 401) {
        callLoginModal("/qr-generator/event");
        return;
      }
      
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* ================= CONTENT ================= */}
        <div className="card">
          <div>
            <h3>Event QR Data</h3>
          </div>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">
                Event Title <RequiredStar />
              </label>
              <input
                type="text"
                className="input"
                placeholder="Event name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                Location <RequiredStar />
              </label>
              <input
                type="text"
                className="input"
                placeholder="Event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                Start Date & Time <RequiredStar />
              </label>
              <input
                type="datetime-local"
                className="input"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                End Date & Time <RequiredStar />
              </label>
              <input
                type="datetime-local"
                className="input"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
              {start && end && !isEndAfterStart && (
                <p style={{ color: "red", fontSize: 12 }}>
                  End date & time must be after start date & time
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea
                className="input"
                rows="4"
                placeholder="Event details"
                value={description}
                maxLength={DESCRIPTION_LIMIT}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

          <p style={{ fontSize: 12, color: description.length === DESCRIPTION_LIMIT ? "red" : "#666" }}>
  {description.length}/{DESCRIPTION_LIMIT} characters
</p>
        
          </div>
        </div>

        {/* ================= CUSTOMIZATION ================= */}
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

      {/* ================= QR PREVIEW ================= */}
      <QRPreview
        value={eventValue}
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
