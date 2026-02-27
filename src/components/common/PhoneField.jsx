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
  // const [country, setCountry] = useState("");

 
  // useEffect(() => {
  //   const cachedCountry = localStorage.getItem("country_code");

  //   if (cachedCountry) {
  //     setCountry(cachedCountry);
  //     return;
  //   }

  //   fetch("https://ipapi.co/json/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.country_code) {
  //         const country = data.country_code.toLowerCase();

  //         // setCountry(country);
  //         console.log("country", country);
  //         localStorage.setItem("country_code", 'us'); // cache only on success
  //       }
  //     })
  //     .catch(() => {
  //       // silent fail — do not cache anything
  //     });
  // }, []);


  return (
    <div className="input-group">
      <label className="input-label">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

<PhoneInput
  country="us"
  enableSearch
  className="phone-input"
  value={value}
  onChange={(val) => {
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
