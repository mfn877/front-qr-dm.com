"use client";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({
  value,
  onChange,
  label = "Contact",
  required = false,
  error = "",
}) {
  const [country, setCountry] = useState("");

  // 🌍 Auto-detect country
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) {
          setCountry(data.country_code.toLowerCase());
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="input-group">
      <label className="input-label">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      <PhoneInput
        country={country}
        enableSearch
        value={value}
        onChange={(val) => {
          // ✅ Always send normalized value (+ included)
          const normalized = val ? `+${val}` : "";
          onChange(normalized);
        }}
        inputStyle={{
          width: "100%",
          height: "42px",
          fontSize: "14px",
        }}
        containerStyle={{ width: "100%" }}
      />

      {error && (
        <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}
