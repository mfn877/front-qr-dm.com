//src/components/qr-contents/BusinessCardQR.jsx

"use client";
import React, { useEffect, useState } from "react";
import QRPreview2 from "../QRPreview2";
import { validatePhone } from "@/lib/phoneValidation";
import { validateEmail } from "@/lib/emailValidation";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken, isLoggedIn } from "@/utils/storage";
import { callLoginModal } from "@/utils/authModal";
import { useRouter } from "next/navigation";


export default function BusinessCardQR() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push(`/login?redirect=${encodeURIComponent("/qr-generator/business-card")}`);
    }
  }, [router]);
  const qrTypeID = 17;
  const [loading, setLoading] = useState(false);
  const [updateQRID, setUpdateQRID] = useState(1);
  const [businessCardURL, setBusinessCardURL] = useState("");
  /* ================= CONTENT STATES ================= */
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("+");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [links, setLinks] = useState("")
  const [newData, setNewData] = useState(0);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const addLink = () => {
    setLinks([...links, { type: "Website", url: "" }]);
  };

  const updateLink = (index, value) => {
    const updated = [...links];
    updated[index].url = value;
    setLinks(updated);
  };

  /* ================= VALIDATION ================= */
  const phoneResult = validatePhone(phone);
  const isValidPhone = phoneResult.isValid;

  const emailResult = validateEmail(email);
  const isValidEmail = emailResult.isValid;

  const urlRegex = /^https:\/\/[^\s]+\.[^\s]+$/;
  const isValidWebsite = website === "" || urlRegex.test(website);

  const isValidInstagram = instagram === "" || urlRegex.test(instagram);
  const isValidFacebook = facebook === "" || urlRegex.test(facebook);
  const isValidLinkedin = linkedin === "" || urlRegex.test(linkedin);


  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);
  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  const buildSocialLinksPayload = () => {
    const list = [];

    if (facebook) list.push({ name: "facebook", url: facebook });
    if (instagram) list.push({ name: "instagram", url: instagram });
    if (linkedin) list.push({ name: "linkedin", url: linkedin });
    if (website) list.push({ name: "website", url: website });

    return list;
  };

  const buildContentPayload = () => ({
    name,
    title: role,
    phone: phoneResult.cleanPhone,
    email: emailResult.cleanEmail,
    address,
    website,
    social_links: [
      instagram && { type: "instagram", url: instagram },
      facebook && { type: "facebook", url: facebook },
      linkedin && { type: "linkedin", url: linkedin },
    ].filter(Boolean),
  });
  


  const handleCreateQR = async () => {
    if (!isLoggedIn()) {
      callLoginModal("/qr-generator/business-card");
      return;
    }

    if (!name || !role || !phone || !email) {
      Swal.fire("Error", "Please fill all required fields.", "error");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        track: 1,
        qrtype: qrTypeID, // Business Card QR
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
        // console.log("Created Business Card QR:", res.data);
        setUpdateQRID(res.data?.data?.id); // 🔥 CRITICAL
        setBusinessCardURL("https://qr-dm.com/scan/business-card/" + res.data?.data?.qid); // if API returns QR URL
        setNewData(1);
        Swal.fire("Success", "QR Created", "success");
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



  const handleUpdateQR = async () => {
    if (updateQRID === 1) {
      await handleCreateQR(); // same pattern as MultiLink
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
        // setBusinessCardURL("https://qr-dm.com/scan/business-card/" + res.data?.data?.qid); // if API returns QR URL
        Swal.fire("Updated", "QR Updated Successfully", "success");
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




  const qrSize = `${size}x${size}`;

  /* ================= QR VALUE ================= */
  const businessValue =
    name.trim() !== "" &&
      role.trim() !== "" &&
      phone.trim() !== "" &&
      email.trim() !== "" &&
      website.trim() !== "" &&

      isValidPhone &&
      isValidEmail &&
      isValidWebsite
      ? `BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${role}
TEL:${phoneResult.cleanPhone}
EMAIL:${emailResult.cleanEmail}
ADR:${address}
URL:${website}

END:VCARD`
      : "";


  /* ================= SAVE QR ================= */
  const handleSaveQR = async () => {
    isLoggedIn() || callLoginModal("/qr-generator/business-card");
    await handleUpdateQR();
  };


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="card">
          <h3>Digital Business Card Data</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">Name <RequiredStar /></label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Title / Role <RequiredStar /></label>
              <input
                type="text"
                className="input"
                placeholder="Your title or role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone <RequiredStar /></label>
              <input
                type="text"
                className="input"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {!isValidPhone && (
                <p style={{ color: "red", fontSize: 12 }}>
                  Invalid phone number (use +XXXXXXXXXX)
                </p>
              )}

            </div>

            <div className="input-group">
              <label className="input-label">Email <RequiredStar /></label>
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
              <label className="input-label">Website <RequiredStar /></label>
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
              <label className="input-label">
                Social Media Links <RequiredStar />
              </label>
              <div className="input-group">
                <label className="input-label">Instagram </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://instagram.com/username"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                {!isValidInstagram && (
                  <p style={{ color: "red", fontSize: 12 }}>
                    Use https://instagram.com/username
                  </p>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Facebook </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://facebook.com/username"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
                {!isValidFacebook && (
                  <p style={{ color: "red", fontSize: 12 }}>
                    Use https://facebook.com/username
                  </p>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">LinkedIn </label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                {!isValidLinkedin && (
                  <p style={{ color: "red", fontSize: 12 }}>
                    Use https://linkedin.com/in/username
                  </p>
                )}
              </div>





            </div>
          </div>
        </div>

        {/* ================= CUSTOMIZATION ================= */}
        <div className="card">
          <h3>Customization</h3>
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

      <QRPreview2
        value={businessCardURL}
        qrColor={qrColor}
        bgColor={bgColor}
        size={size}
        pattern={pattern}
        eyeStyle={eyeStyle}
        logo={logo}
        onSave={handleSaveQR}
        onSvgReady={setQrSvg}
        updateQRID={updateQRID}
        newData={newData}
      />
    </>
  );
}
