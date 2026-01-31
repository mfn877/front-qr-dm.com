//src/components/qr-contents/MultiLinkQR.jsx
"use client";
import React, { useEffect, useState } from "react";
import QRPreview2 from "../QRPreview2";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken, isLoggedIn } from "@/utils/storage";
import { callLoginModal } from "@/utils/authModal";
import { useRouter } from "next/navigation";

export default function MultiLinkQR() {
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push(`/login?redirect=${encodeURIComponent("/qr-generator/multi-link")}`);
    }
  }, [router]);
  const qrTypeID = 16; // Multi-Link QR Type ID
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [multiLinkURL, setMultiLinkURL] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [updateQRID, setUpdateQRID] = useState(1);

  /* ================= CONTENT STATES ================= */
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [btn1Label, setBtn1Label] = useState("");
  const [btn1Url, setBtn1Url] = useState("");
  const [btn2Label, setBtn2Label] = useState("");
  const [btn2Url, setBtn2Url] = useState("");
  const [extraButtons, setExtraButtons] = useState([]);

  // ===== LIMITS =====
  const MAX_DESC_LENGTH = 160;        // description characters
  const MAX_QR_PAYLOAD = 900;         // safe QR data length (bytes)


  /* ================= VALIDATION ================= */
  const urlRegex = /^https:\/\/[^\s]+\.[^\s]+/;
  const isValidBtn1Url = btn1Url === "" || urlRegex.test(btn1Url);
  const isValidBtn2Url = btn2Url === "" || urlRegex.test(btn2Url);

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);
  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  const buildLinksPayload = () => {
    const baseLinks = [];

    if (btn1Label && btn1Url) {
      baseLinks.push({ label: btn1Label, url: btn1Url });
    }

    if (btn2Label && btn2Url) {
      baseLinks.push({ label: btn2Label, url: btn2Url });
    }

    extraButtons.forEach((btn) => {
      if (btn.label && btn.url) {
        baseLinks.push({ label: btn.label, url: btn.url });
      }
    });

    return baseLinks;
  };

  const qrSize = `${size}x${size}`;


  const addNewButton = () => {
    setExtraButtons((prev) => [
      ...prev,
      { label: "", url: "" }
    ]);
  };

  const removeLastButton = () => {
    setExtraButtons((prev) => {
      if (prev.length === 0) return prev; // safety
      return prev.slice(0, -1);
    });
  };

  /* ================= QR VALUE ================= */
  const multiLinkValue =
    title &&
      isValidBtn1Url &&
      isValidBtn2Url
      ? `https://yourdomain.com/multi?data=${encodeURIComponent(
        btoa(
          JSON.stringify({
            title,
            desc,
            bgColor,
            links: [
              btn1Label && btn1Url ? { label: btn1Label, url: btn1Url } : null,
              btn2Label && btn2Url ? { label: btn2Label, url: btn2Url } : null,
              ...extraButtons.filter(b => b.label && b.url)
            ].filter(Boolean),
          })
        )
      )}`
      : "";


  const qrByteSize = multiLinkValue
    ? new TextEncoder().encode(multiLinkValue).length
    : 0;

  const isQrTooLarge = qrByteSize > MAX_QR_PAYLOAD;

  const buildContentPayload = () => ({
    title,
    description: desc,
    links: buildLinksPayload(),
  });

  /* ================= FILE UPLOAD ================= */
  const handleCreateQR = async () => {
    if (!isLoggedIn()) {
      callLoginModal("/qr-generator/multi-link");
      return;
    }

    if (!title || title.trim() === "") {
      Swal.fire("Error", "Title is required to generate QR.", "error");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        track: 1,
        qrtype: qrTypeID, // 16
        file: qrSvg,
        content: buildContentPayload(),
        design: {
          qr_color: qrColor,
          bg_color: bgColor,
          size,
          pattern,
          eye_style: eyeStyle,
        },
      };

      const res = await api.post("/qr-data", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res?.data?.status_code === 1) {
        setUpdateQRID(res.data?.data?.id); // 🔥 critical
        setMultiLinkURL("https://qr-dm.com/scan/multi-links/" + res.data?.data?.qid); // if API returns QR URL
        setNewData(1);
        Swal.fire("Success", "Multi-Link QR Created", "success");
      } else {
        Swal.fire("Error", res?.data?.message || "Failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };



  const isFormValid = fileUrl !== "";

  /* ================= SAVE QR ================= */
  const handleUpdateQR = async () => {
    if (updateQRID === 1) {
      await handleCreateQR(); // EXACT SAME FLOW AS BUSINESS CARD
      return;
    }

    setLoading(true);

    try {
      const res = await api.put(
        `/qr-data/${updateQRID}`,
        { file: qrSvg },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.status_code === 1) {
        setNewData(0);
        Swal.fire("Updated", "Multi-Link QR Updated", "success");
      } else {
        Swal.fire("Error", res?.data?.message || "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };


  const handleSaveQR = async () => {
    isLoggedIn() || callLoginModal("/qr-generator/multi-link");
    await handleUpdateQR();
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="card">
          <div className="">
            <h3>Multi-Link QR Data</h3>
          </div>
          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">Page Title</label>
              <input type="text" className="input" placeholder="Enter page title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">
                Description (Optional)
                <span style={{ fontSize: 12, marginLeft: 6, color: "#666" }}>
                  {desc.length}/{MAX_DESC_LENGTH}
                </span>
              </label>

              <textarea
                className="input"
                rows="3"
                placeholder="Enter description..."
                value={desc}
                maxLength={MAX_DESC_LENGTH}
                onChange={(e) => setDesc(e.target.value)}
              />

              {desc.length === MAX_DESC_LENGTH && (
                <p style={{ color: "orange", fontSize: 12 }}>
                  Description limit reached
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Button 1 Label</label>
              <input type="text" className="input" placeholder="e.g. Visit Website" value={btn1Label} onChange={(e) => setBtn1Label(e.target.value)} />
            </div>

            <div className="input-group">
              <label className="input-label">Button 1 URL</label>
              <input type="url" className="input" placeholder="https://example.com" value={btn1Url} onChange={(e) => setBtn1Url(e.target.value)} />
              {!isValidBtn1Url && <p style={{ color: "red", fontSize: 12 }}>Invalid URL</p>}
            </div>
            {extraButtons.map((btn, index) => (
              <div key={index} style={{ position: "relative" }}>

                {/* LABEL + REMOVE (TOP RIGHT OF LABEL) */}
                <div className="input-group" style={{ position: "relative" }}>
                  <label className="input-label">
                    Button {index + 2} Label
                  </label>

                  {/* REMOVE BUTTON (FEATURE UNCHANGED) */}
                  <button
                    type="button"
                    className="btn btn-outline-danger remove-btn"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                    onClick={() =>
                      setExtraButtons(extraButtons.filter((_, i) => i !== index))
                    }
                  >
                    ✕
                  </button>

                  <input
                    type="text"
                    className="input"
                    placeholder="e.g. Visit Website"
                    value={btn.label}
                    onChange={(e) => {
                      const copy = [...extraButtons];
                      copy[index].label = e.target.value;
                      setExtraButtons(copy);
                    }}
                  />
                </div>

                {/* URL (NO REMOVE HERE) */}
                <div className="input-group">
                  <label className="input-label">
                    Button {index + 2} URL
                  </label>

                  <input
                    type="url"
                    className="input"
                    placeholder="https://example.com"
                    value={btn.url}
                    onChange={(e) => {
                      const copy = [...extraButtons];
                      copy[index].url = e.target.value;
                      setExtraButtons(copy);
                    }}
                  />
                </div>

              </div>
            ))}


            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addNewButton}
              >
                + Add Button
              </button>
            </div>
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
                onClick={() => document.getElementById("multi-logo").click()}
              >
                <input
                  id="multi-logo"
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
                  <img src={logo} alt="logo" style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
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

      <QRPreview2
        value={multiLinkURL}
        qrColor={qrColor}
        bgColor={bgColor}
        size={size}
        pattern={pattern}
        eyeStyle={eyeStyle}
        logo={logo}
        onSave={handleSaveQR}
        onSvgReady={setQrSvg}
        updateQRID={updateQRID}
        qrtypeID={qrTypeID}
        newData={newData}
      />
    </>
  );
}
