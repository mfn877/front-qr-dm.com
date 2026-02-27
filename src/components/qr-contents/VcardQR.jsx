"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRPreview from "../QRPreview";
import { validatePhone } from "@/lib/phoneValidation";
import { validateEmail } from "@/lib/emailValidation";
import RequiredStar from "@/lib/starRequired";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { getToken, isLoggedIn } from "@/utils/storage";
import PhoneField from "@/components/common/PhoneField";
import { callLoginModal } from "@/utils/authModal";

export default function VcardQR() {
  const router = useRouter();

  /* ================= CONTENT STATES ================= */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [phones, setPhones] = useState([{ type: "main", number: "" }]);
  const [emails, setEmails] = useState([""]);
  const [websites, setWebsites] = useState([""]);
  const [addresses, setAddresses] = useState([""]);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [qrName, setQrName] = useState("");
  const [loading, setLoading] = useState(false);
  const [phonType, setPhoneType] = useState(["main"]);


  /* ================= VALIDATION ================= */
  const nameRegex = /^[A-Za-z]{2,}$/;

  const isValidFirstName = nameRegex.test(firstName.trim());
  const isValidLastName = nameRegex.test(lastName.trim());

  // Validate each phone entry individually; blank entries are considered valid (optional)
  const phoneValidations = phones.map((p) =>
    p.number.trim() ? validatePhone(p.number) : { isValid: true, cleanPhone: "" }
  );
  const hasInvalidPhone = phones.some(
    (p, i) => p.number.trim() && !phoneValidations[i].isValid
  );
  const emailValidation = emails.map((item) => validateEmail(item));
  const hasInvalidEmail = emails.some(
    (item, index) => item.trim() && !emailValidation[index].isValid
  );

  /* ================= CUSTOMIZATION ================= */
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(310);

  const [pattern, setPattern] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [qrSvg, setQrSvg] = useState(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push(`/login?redirect=${encodeURIComponent("/qr-generator/business-card")}`);
    }
  }, [router]);

  /* ================= VCARD VALUE ================= */
  const canGenerateVCard =
    isValidFirstName && !hasInvalidPhone && !hasInvalidEmail;

  const phoneLines = phones
    .map((p, i) =>
      p.number.trim() && phoneValidations[i].isValid
        ? `TEL;TYPE=${p.type.toUpperCase()}:${phoneValidations[i].cleanPhone}`
        : ""
    )
    .filter(Boolean)
    .join("\n");

  const emailLines = emails
    .map((item, index) => {
      if (!item.trim() || !emailValidation[index].isValid) return "";
      return `EMAIL:${emailValidation[index].cleanEmail}`;
    })
    .filter(Boolean)
    .join("\n");

  const websiteLines = websites
    .map((item) => (item.trim() ? `URL:${item.trim()}` : ""))
    .filter(Boolean)
    .join("\n");

  const addressLines = addresses
    .map((item) => (item.trim() ? `ADR:;;${item.trim()};;;;` : ""))
    .filter(Boolean)
    .join("\n");

  const vcardValue = canGenerateVCard
    ? `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${CompanyName}
${phoneLines}
${emailLines}
${websiteLines}
${addressLines}
END:VCARD`
    : "";


  const updateField = (setter, index, value) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addField = (setter) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Phone helpers ── */
  const addPhone = ( type ) =>
    setPhones((prev) => [...prev, { type: type, number: "" }]);

  const removePhone = (index) => {
    setPhoneType((prev) => prev.filter((_, i) => i !== index));
    setPhones((prev) => prev.filter((_, i) => i !== index));
  }

  const updatePhoneNumber = (type, number) =>
    setPhones((prev) =>
      prev.map((p) => (p.type === type ? { ...p, number } : p))
    );

  const inputActionBtnStyle = {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    width: 28,
    height: 28,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    background: "#fff",
    lineHeight: 1,
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  /* ================= SAVE QR ================= */
  const handleSaveQR = async () => {
    getToken() || callLoginModal("/qr-generator/vcard");
    if (!canGenerateVCard) {
      Swal.fire({
        icon: "error",
        title: "Invalid Details",
        text: "Please fill all required vCard fields correctly.",
      });
      return;
    }

    try {
      setLoading(true);
      const primaryEmailIndex = emails.findIndex(
        (item, index) => item.trim() && emailValidation[index].isValid
      );
      const payload = {
        track: 0,
        qrtype: 6, // VCARD QR
        file: qrSvg,
        content: {
          first_name: firstName,
          last_name: lastName,
          phones: phones
            .filter((p, i) => p.number.trim() && phoneValidations[i].isValid)
            .map((p, i) => ({
              type: p.type,
              number: phoneValidations[phones.indexOf(p)].cleanPhone,
            })),
          email:
            primaryEmailIndex > -1
              ? emailValidation[primaryEmailIndex].cleanEmail
              : "",
          organization: CompanyName,
          websites,
          addresses,
          emails,
          qr_name: qrName,
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
          confirmButtonText: "OK",
        });
      } else if (res?.data?.status === "unauthenticated") {
        callLoginModal("/qr-generator/vcard");
      } else {
        Swal.fire("Error", "Unable to save QR.", "error");
      }
    } catch (err) {
      if (err.status === 401) {
        callLoginModal("/qr-generator/vcard");
        return;
      }
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* ================= CONTENT ================= */}
        <div className="card">
          <h3>vCard (Digital) Data</h3>

          <div className="card-body px-0 pb-0">
            <div className="input-group">
              <label className="input-label">
                Name <RequiredStar />
              </label>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                maxLength={30}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstName && !isValidFirstName && (
                <p style={{ color: "red", fontSize: 12 }}>
                  {firstName.length}//30 Please enter a valid first name!
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Last Name</label>
              <input
                type="text"
                className="input"
                placeholder="surname"
                value={lastName}
                maxLength={30}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastName && !isValidLastName && (
                <p style={{ color: "red", fontSize: 12 }}>
                  {lastName.length}/30 Please enter a valid last name!
                </p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">Corporate Information (optional)</label>
              <input
                type="text"
                className="input"
                placeholder="Company Name"
                value={CompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label"></label>
              <input
                type="text"
                className="input"
                placeholder="Job Title"
                value={JobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>



            <div className="input-group">
              <label className="input-label">Personal Information (optional)</label>

              {/* Upload Image */}
              <div className="input-group">
                <label className="input-label upload-image-box"></label>
                <input
                  type="file"
                  className="input"
                  accept="image/*"
                  onChange={(e) => console.log(e.target.files[0])}
                />
              </div>

              {/* <span className="upload-text">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 5 17 10" />
      <line x1="12" y1="5" x2="12" y2="15" />
    </svg>
    Upload Image
  </span> */}


              <input
                type="date"
                className="input"
                placeholder="mm.dd.yyyy"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />


            </div>

            <div className="form-group">
              <label className="input-label">
                Contact (optional)
              </label>
              <div className="">
                <select
                  className="form-select input"
                  style={{ flex: 1 }}
                  // value={phoneEntry.type}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    addPhone(e.target.value);
                    setPhoneType((prev) => [...prev, e.target.value])
                  }
                  }
                >
                  <option value="main">Main</option>
                  <option value="mobile">Mobile</option>
                  <option value="work">Work</option>
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                  <option value="fax">Fax</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="support">Support</option>
                  <option value="sales">Sales</option>
                  <option value="other">Other</option>
                </select>

              </div>
              {phonType.map((type, index) => (
                <div key={`phone-${index}`} style={{ marginBottom: "0.75rem" }}>

                  {/* Phone number input */}

                  <div key={`phone-${index}`} style={{ position: "relative", marginBottom: "1rem", width: "100%" }}>
                    <PhoneField
                      label={type}
                      onChange={(value) => updatePhoneNumber(type, value)}
                      
                    />
                    {index != 0 && <button
                      type="button"
                      style={{...inputActionBtnStyle, transform: "translateY(8%)"}}
                      onClick={() =>
                        removePhone(index)
                      }
                    > -
                    </button>}</div>
                  {/* Per-entry validation error — only shown after user types */}
                  {/* {phones[index].number.trim() && !phoneValidations[index].isValid && (
                    <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                      Please enter a valid phone number!
                    </p>
                  )} */}
                </div>
              ))}

              <div className="input-group">
                <label className="input-label me-3 ">Email</label>
                {emails.map((item, index) => (
                  <div key={`email-${index}`} style={{ position: "relative", marginBottom: "0.5rem", width: "100%" }}>

                    <input
                      type="email"
                      className="input"
                      placeholder="abc@example.com"
                      value={item}
                      maxLength={50}
                      onChange={(e) => updateField(setEmails, index, e.target.value)}
                    />
                    <button
                      type="button"
                      style={inputActionBtnStyle}
                      onClick={() =>
                        index === 0 ? addField(setEmails) : removeField(setEmails, index)
                      }
                    >
                      {index === 0 ? "+" : "-"}
                    </button>
                    {item && !emailValidation[index].isValid && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        Please enter a valid email!
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="input-group">
                <label className="input-label">Website</label>
                {websites.map((item, index) => (
                  <div key={`website-${index}`} style={{ position: "relative", marginBottom: "0.5rem", width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="https://example.com"
                      value={item}
                      maxLength={100}
                      style={{ paddingRight: 44, width: "100%", boxSizing: "border-box" }}
                      onChange={(e) => updateField(setWebsites, index, e.target.value)}
                    />
                    <button
                      type="button"
                      style={inputActionBtnStyle}
                      onClick={() =>
                        index === 0 ? addField(setWebsites) : removeField(setWebsites, index)
                      }
                    >
                      {index === 0 ? "+" : "-"}
                    </button>
                  </div>
                ))}
              </div>

              <div className="input-group">
                <label className="input-label">Address</label>
                {addresses.map((item, index) => (
                  <div key={`address-${index}`} style={{ position: "relative", marginBottom: "0.5rem", width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="enter address"
                      value={item}
                      maxLength={120}
                      style={{ paddingRight: 44, width: "100%", boxSizing: "border-box" }}
                      onChange={(e) => updateField(setAddresses, index, e.target.value)}
                    />
                    <button
                      type="button"
                      style={inputActionBtnStyle}
                      onClick={() =>
                        index === 0 ? addField(setAddresses) : removeField(setAddresses, index)
                      }
                    >
                      {index === 0 ? "+" : "-"}
                    </button>
                  </div>
                ))}
              </div>

              <div className="input-group">
                <label className="input-label">Name Your QR (optional)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="enter QR name"
                  value={qrName}
                  maxLength={50}
                  onChange={(e) => setQrName(e.target.value)}
                />
              </div>
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
        loading={loading}
      />
    </>
  );
}