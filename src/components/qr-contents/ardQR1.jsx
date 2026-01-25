"use client";
import React, { useEffect, useState } from "react";
import QRPreview from "../QRPreview";
import { validatePhone } from "@/lib/phoneValidation";
import { validateEmail } from "@/lib/emailValidation";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken } from "@/utils/storage";
import PhoneField from "@/components/common/PhoneField";


export default function VcardQR() {
  /* ================= CONTENT STATES ================= */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [websites, setWebsites] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);



  /* ================= VALIDATION ================= */
  const nameRegex = /^[A-Za-z]{2,}$/;

  const isValidFirstName = nameRegex.test(firstName.trim());
  const isValidLastName = nameRegex.test(lastName.trim());

  const { isValid: isPhoneValid, cleanPhone } = validatePhone(phone);
  const { isValid: isEmailValid, cleanEmail } = validateEmail(email);
  
  const jobTitleRegex = /^[A-Za-z .-]{2,50}$/;

  const isValidJobTitle =
  jobTitle.trim() === "" || jobTitleRegex.test(jobTitle.trim());
 

  const companyNameRegex = /^[A-Za-z0-9 &.-]{2,100}$/;

const isValidCompanyName =
  companyName.trim() === "" || companyNameRegex.test(companyName.trim());

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(200);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  const [cardColor, setCardColor] = useState("#FFFFFF");
  const [qrName, setQrName] = useState("");

  /* ================= VCARD VALUE ================= */
  const canGenerateVCard =
    isValidFirstName  && isPhoneValid ;

  const vcardValue = canGenerateVCard
    ? `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}

TEL:${cleanPhone}
EMAIL:${cleanEmail}
END:VCARD`
    : "";

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
    if (!canGenerateVCard) {
      Swal.fire({
        icon: "error",
        title: "Invalid Details",
        text: "Please fill all required vCard fields correctly.",
      });
      return;
    }

    try {
      const payload = {
        track: 0,
        qrtype: 6, // VCARD QR
        file: qrSvg,
        content: {
          first_name: firstName,
          last_name: lastName,
          phone: cleanPhone,
          email: cleanEmail,
          organization: org,
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
          text: "Your vCard QR has been saved successfully.",
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
        {/* ================= CONTENT ================= */}
        <div className="card">
          <h3>vCard (Digital) Data</h3>

          <div className="card-body px-0 pb-0">
         
          {/* Name */}
            <div className="input-group">
              <label className="input-label">
                Name <RequiredStar />
              </label>
              <input
                type="text"
                className="input"
                placeholder=" First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstName && !isValidFirstName && (
                <p style={{ color: "red", fontSize: 12 }}>
                  Please enter a valid first name!
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label"></label>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastName && !isValidLastName && (
                <p style={{ color: "red", fontSize: 12 }}>
                  Please enter a valid last name!
                </p>
              )}
            </div>


            {/* Corporate */}
       <div className="input-group">
  <label className="input-label">Corporate Information (optional)</label>
  <input
    type="text"
    className="input"
    placeholder="Company name"
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
  />
  {companyName && !isValidCompanyName && (
    <p style={{ color: "red", fontSize: 12 }}>
      Please enter a valid company name!
    </p>
  )}
</div>

<div className="input-group">
  <label className="input-label"></label>
  <input
    type="text"
    className="input"
    placeholder="Job Title"
    value={jobTitle}
    onChange={(e) => setJobTitle(e.target.value)}
  />
  {jobTitle && !isValidJobTitle && (
    <p style={{ color: "red", fontSize: 12 }}>
      Please enter a valid title!
    </p>
  )}
</div>


               <div className="input-group">
             <label className="input-label">Personal Information (optional)</label>
             
               {/* Image Upload Box */}
  <label
    htmlFor="imageUpload"
    style={{
      width: "100%",
    border: "1px solid #8b7cff",
    borderRadius: 6,
    padding: "12px",
    backgroundColor: "#f4f2ff",
    color: "#8b7cff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    }}
  >
     {/* Upload Icon */}
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
    ⬇️ Upload Image
  </label>

  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) =>  setImageFile(e.target.files?.[0])}
  />
</div>

           <div className="input-group">
             <label className="input-label">Date of Birth</label>
              <input
                type="date"
                className="input"
                placeholder="Date Of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
          </div>

            <div className="input-group">
              <label className="input-label">
               {/* Contact <RequiredStar /> */}
              </label>
            <PhoneField
             value={phone}
             onChange={(val) => setPhone(val)}
             required
            
            />

              {phone && !isPhoneValid && (
                <p style={{ color: "red", fontSize: 12 }}>
                  Please enter a valid phone number!
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="abc@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email && !isEmailValid && (
                <p style={{ color: "red", fontSize: 12 }}>
                  Please enter a valid email!
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Website</label>
              <input
                type="url"
                className="input"
                 placeholder="https://example.com"
                value={websites}
                onChange={(e) => setWebsites(e.target.value)}
              />
            </div>

            
            <div className="input-group">
              <label className="input-label">Address</label>
              <input
                type="text"
                className="input"
                 placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

              {/* vCard Design */}
            <div className="input-group">
              <label className="input-label">
                vCard Design <i>(optional)</i>
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} />
                <input className="input" value={cardColor} onChange={(e) => setCardColor(e.target.value)} />
              </div>
            </div>

            <div className="input-group">
              <input className="input" placeholder="Name your QR (optional)" value={qrName} onChange={(e) => setQrName(e.target.value)} />
            </div>
          </div>
        </div>

        
        {/* ================= CUSTOMIZATION ================= */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Customization</h3>

          {/* COLORS */}
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
              onClick={() => document.getElementById("vcard-logo").click()}
            >
              <input
                id="vcard-logo"
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (file.size > 2 * 1024 * 1024) {
                    alert("Max 2MB allowed");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => setLogo(reader.result);
                  reader.readAsDataURL(file);
                }}
              />

              {logo ? (
                <img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    
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

      {/* ================= PREVIEW ================= */}
      <QRPreview
        value={vcardValue}
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
