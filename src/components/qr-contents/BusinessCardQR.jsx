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
import PhoneField from "@/components/common/PhoneField";


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
  const [landline, setLandline] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [newData, setNewData] = useState(0);
  const [socialLinks, setSocialLinks] = useState([{ label: "", url: "" }]);

  /* ================= VALIDATION ================= */
  const phoneResult = validatePhone(phone);
  const isValidPhone = phoneResult.isValid;

  const landlineResult = validatePhone(landline);
  const isValidLandline = landlineResult.isValid;

  const emailResult = validateEmail(email);
  const isValidEmail = emailResult.isValid;

  const [isPhoneComplete, setIsPhoneComplete] = useState(false);


  const urlRegex = /^https:\/\/[^\s]+\.[^\s]+$/;
  const isValidWebsite = website === "" || urlRegex.test(website);
  const socialLinkValidation = socialLinks.map(
    (item) => item.url === "" || urlRegex.test(item.url)
  );


  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);
  const [pattern, setPattern] = useState("dots");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  const updateSocialLink = (index, field, value) => {
    setSocialLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, { label: "", url: "" }]);
  };

  const removeSocialLink = (index) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const buildContentPayload = () => ({
    name,
    title: role,
    phone: phoneResult.cleanPhone,
    landline: landlineResult.cleanPhone,
    email: emailResult.cleanEmail,
    address,
    website,
    social_links: socialLinks
      .filter((item, index) => item.url && socialLinkValidation[index])
      .map((item) => ({
        type: item.label.trim().toLowerCase() || "social",
        url: item.url.trim(),
      })),
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



  // const handleUpdateQR = async () => {
  //   if (updateQRID === 1) {
  //     await handleCreateQR(); // same pattern as MultiLink
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const res = await api.put(
  //       `/qr-data/${updateQRID}`,
  //       { file: qrSvg },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (res?.data?.status_code === 1) {
  //       setNewData(0);
  //       // setBusinessCardURL("https://qr-dm.com/scan/business-card/" + res.data?.data?.qid); // if API returns QR URL
  //       Swal.fire("Updated", "QR Updated Successfully", "success");
  //     } else {
  //       Swal.fire("Error", res?.data?.message || "Update failed", "error");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire("Error", "Something went wrong", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleUpdateQR = async () => {
  if (!updateQRID || updateQRID === 1) {
    await handleCreateQR();
    return;
  }

  setLoading(true);

  try {
    const payload = {
      track: 1,
      qrtype: qrTypeID,
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

    const res = await api.put(
      `/qr-data/${updateQRID}`,
      payload,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (res?.data?.status_code === 1) {
      setNewData(0);
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
  const canPreviewBusinessCard =
    name.trim() !== "" &&
    role.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    isValidPhone && 
    isValidLandline &&
    isValidEmail &&
    isValidWebsite;

  const businessValue = canPreviewBusinessCard
    ? `BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${role}
TEL:${phoneResult.cleanPhone}
TEL;TYPE=work,voice:${landlineResult.cleanPhone}
EMAIL:${emailResult.cleanEmail}
${address.trim() ? `ADR:${address}` : ""}
${website.trim() ? `URL:${website}` : ""}
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
              {/* <label className="input-label">Phone <RequiredStar /></label> */}
              <PhoneField
                label="Phone Number"
                required
                value={phone}
                onChange={setPhone}
              />

              {isPhoneComplete && !isValidPhone && (
                <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                  Enter a valid phone number.
                </p>
              )}

            </div>
              <div className="input-group">
              {/* <label className="input-label">Phone <RequiredStar /></label> */}
              <PhoneField
                label="Landline Number"
                value={landline}
                onChange={setLandline}
              />

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
              {email && !isValidEmail && (
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
              <label className="input-label">Website</label>
              <input
                type="url"
                className="input"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              {website && !isValidWebsite && (
                <p style={{ color: "red", fontSize: 12 }}>
                  Use https://example.com
                </p>
              )}

            </div>

            <div className="input-group">
              <label className="input-label">
                Social Media Links
              </label>
              {socialLinks.map((item, index) => (
                <div
                  key={`social-link-${index}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "0.5rem",
                    alignItems: "start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    className="input"
                    placeholder="Label (e.g. Instagram)"
                    value={item.label}
                    onChange={(e) => updateSocialLink(index, "label", e.target.value)}
                  />
                  <div style={{ position: "relative" }}>
                    <input
                      type="url"
                      className="input"
                      placeholder="https://instagram.com/username"
                      value={item.url}
                      onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                      style={index > 0 ? { paddingRight: 44 } : undefined}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 32,
                          height: 32,
                          border: "1px solid #d1d5db",
                          borderRadius: 6,
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                    )}
                    {!socialLinkValidation[index] && (
                      <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                        Use https://example.com
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSocialLink}
                className="btn btn-outline-primary"
                style={{ marginTop: "0.25rem", width: "fit-content" }}
              >
                + Add social media
              </button>





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
        qrTypeID={qrTypeID}
        loading={loading}
      />
    </>
  );
}
