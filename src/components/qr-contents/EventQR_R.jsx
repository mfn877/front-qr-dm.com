//src/components/qr-contents/EventQR.jsx
import React from 'react'
import { useState } from "react";
import QRPreview from "../QRPreview";
import RequiredStar from "@/lib/starRequired";
export default function EventQR() {

     const [title, setTitle] = useState("");
     const [location, setLocation] = useState("");
     const [start, setStart] = useState("");
     const [end, setEnd] = useState("");
     const [description, setDescription] = useState("");
     const [bgColor, setBgColor] = useState("#FFFFFF");
     const [qrColor, setQrColor] = useState("#000000");
     const [size, setSize] = useState(200);
     const [pattern, setPattern] = useState("square");
     const [eyeStyle, setEyeStyle] = useState("square");
     const [logo, setLogo] = useState(null);

      /* ✅ VALIDATION */
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


 
/* ✅ EVENT QR VALUE (GOOGLE CALENDAR ADD EVENT) */
const eventValue = isValid
  ? `https://calendar.google.com/calendar/render?action=TEMPLATE
&text=${encodeURIComponent(title)}
&dates=${start.replace(/[-:]/g, "")}/${end.replace(/[-:]/g, "")}
&details=${encodeURIComponent(description)}
&location=${encodeURIComponent(location)}`
  : "";




    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="card">
                    <div className="">
                        <h3>Content</h3>
                    </div>
                    <div className="card-body px-0 pb-0">
                        <div className="input-group">
                            <label className="input-label">Event Title <RequiredStar/></label>
                            <input type="text" className="input" placeholder="Event name"   value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Location <RequiredStar/></label>
                            <input type="text" className="input" placeholder="Event location"  value={location}
                              onChange={(e) => setLocation(e.target.value)}
                
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Start Date & Time <RequiredStar/></label>
                            <input type="datetime-local" className="input"   value={start}
                              onChange={(e) => setStart(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">End Date & Time <RequiredStar/></label>
                            <input type="datetime-local" className="input"  value={end}
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
                            <textarea className="input" rows="4" placeholder="Event details"  value={description}
                              onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </div>
                       {!isValid && (
              <p style={{ color: "red", fontSize: 12 }}>
                Please fill all required fields
              </p> 
                       )}  
                    </div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        Customization
                    </h3>
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
                        <div className="">
                            <label className="input-label">Logo Upload (Optional)</label>
                            <div className="upload-zone"
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
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
                            <label className="input-label">Size: <span id="size-value">512</span>x<span
                                id="size-value-2">512</span>px</label>
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
            
            <QRPreview 
            
        value={eventValue}
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
