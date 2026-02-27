"use client";
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import React, { useEffect, useState } from 'react'
import secureLocalStorage from "react-secure-storage";
import api from "@/services/api";
import PhoneField from '@/components/common/PhoneField';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { removeToken } from '@/utils/storage';
import { getNames } from "country-list";

export default function page() {

  const countries = getNames();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [country, setCountry] = useState("");


  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "" });
  const [hasChanges, setHasChanges] = useState(false); // 🔒 track form changes

  // 🔹 GET PROFILE (Axios integration)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");

        if (data?.status_code === 1) {
          const user = data.data;

          setFullName(user.name || "");
          setEmail(user.email || "");
          setPhone(user.phone || "");
          setDateOfBirth(user.dob || "");
          setGender(user.gender ? user.gender.toLowerCase() : "");
          setCity(user.city || "");
          setAddress(user.address || "");
          setAboutMe(user.about || "");
          setCountry(user.country || "");


          secureLocalStorage.setItem("qr_user", user);
          setHasChanges(false);
        } else {
          router.replace("/login");
          removeToken();
        }
      } catch (error) {
        console.error("Failed to load profile", error);
        removeToken();
        router.replace("/login");
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatusMessage({ type: null, text: "" });
    // add validation here
    if (!fullName || !email || !phone || !dateOfBirth || !gender || !country) {

      setStatusMessage({
        type: "error",
        text:
          "Please fill in all the required fields.",
      });
      Swal.fire("Error", "Please fill in all the required fields.", "error");
      setSaving(false);
      return
    }


    try {
      const payload = {
        name: fullName,
        email,
        phone,
        dob: dateOfBirth,
        gender,
        country,
        city,
        address,
        about: aboutMe,

      };

      const { data } = await api.put("/update", payload, {
        headers: {
          Accept: "application/json",
        },
        maxBodyLength: Infinity,
      });

      if (data?.status_code === 1) {
        secureLocalStorage.setItem("qr_user", data.data);
        setHasChanges(false);
        Swal.fire({
          title: "Success",
          text: data?.message || "Profile updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.back();
          }
        });
        secureLocalStorage.setItem("qr_user", data.data);
        setStatusMessage({
          type: "success",
          text: data?.message || "Profile updated successfully.",
        });
        setHasChanges(false);
      } else {
        setStatusMessage({
          type: "error",
          text:
            data?.message ||
            "Unable to update profile. Please try again.",
        });
        Swal.fire("Error", data?.message || "Unable to update profile. Please try again.", "error");
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Unable to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header2 />
      <div className="container py-5 profile-page">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card profile-card p-4">
              <h4 className="mb-4 fw-bold text-center profile-title">My Profile</h4>
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  {/* <img src="https://via.placeholder.com/120" className="profile-img mb-3" alt="Profile" /> */}
                  {/* <div>
                    <input type="file" className="form-control w-auto d-inline-block" />
                  </div> */}
                </div>
                <div className='row g-4'>

                  <div className="col-12 col-md-6">
                    <label className="input-label form-label">Full Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="input"
                      value={fullName}
                      placeholder="Enter your name"
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setHasChanges(true); // ✅ enable button
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="input-label form-label">Email <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      className="input"
                      value={email}
                      placeholder="Enter your email"
                      disabled
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setHasChanges(true); // ✅ enable button
                      }}
                    />
                  </div>


                  <div className="col-12 col-md-6">
                    <PhoneField
                      label="Phone"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e);
                        setHasChanges(true); // enable button
                      }}
                    /></div>

                  <div className="col-12 col-md-6">
                    <label className="input-label form-label">Date of Birth <span className="text-danger">*</span></label>
                    <input type="date" className="input"
                      value={dateOfBirth}

                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                        setHasChanges(true); // ✅ enable button
                      }} />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="input-label form-label">Gender <span className="text-danger">*</span></label>
                    <select className="input"
                      value={gender}

                      onChange={(e) => {
                        setGender(e.target.value);
                        setHasChanges(true);
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">
                      Country <span className="text-danger">*</span>
                    </label>

                    <select
                      className="form-select"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setHasChanges(true);
                      }}
                    >
                      <option value="">Select Country</option>

                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="input-label form-label">City (optional)</label>
                    <input type="text" className="input"
                      value={city}
                      placeholder="Enter your city" onChange={(e) => {
                        setCity(e.target.value);
                        setHasChanges(true);
                      }} />
                  </div>

                  <div className="col-12">
                    <label className="input-label form-label">Address (optional)</label>
                    <textarea className="input" rows="3" value={address} placeholder="Enter your address" onChange={(e) => {
                      setAddress(e.target.value);
                      setHasChanges(true); // ✅ enable button
                    }}></textarea>
                  </div>

                  <div className="col-12">
                    <label className="input-label form-label">About Me(optional)</label>
                    <textarea className="input" rows="3" value={aboutMe} placeholder="Write something about yourself" onChange={(e) => {
                      setAboutMe(e.target.value);
                      setHasChanges(true); // ✅ enable button
                    }}></textarea>
                  </div>

                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn px-5 py-2 rounded-pill btn-primary"
                    disabled={!hasChanges || saving}
                  >
                    {saving ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Saving</> : "Save Changes"}
                  </button>
                  {statusMessage.text && (
                    <p
                      className={`mt-3 ${statusMessage.type === "error" ? "text-danger" : "text-success"}`}
                    >
                      {statusMessage.text}
                    </p>
                  )}
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
      <Footer />

    </>
  )
}
