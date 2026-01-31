"use client";
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import React, { useEffect, useState } from 'react'
import secureLocalStorage from "react-secure-storage";
import api from "@/services/api";

export default function page() {


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: null, text: "" });

  useEffect(() => {
    const user = secureLocalStorage.getItem("qr_user");

    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatusMessage({ type: null, text: "" });

    try {
      const payload = {
        name: fullName,
        email,
      };

      const { data } = await api.put("/update", payload, {
        headers: {
          Accept: "application/json",
        },
        maxBodyLength: Infinity,
      });

      if (data?.status_code === 1) {
        secureLocalStorage.setItem("qr_user", data.data);
        setStatusMessage({
          type: "success",
          text: data?.message || "Profile updated successfully.",
        });
      }



    } catch (error) {
      console.error("Profile update failed", error);
      const errorMessage = error?.response?.data?.message || "Unable to update profile. Please try again.";
      setStatusMessage({ type: "error", text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header2 />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card profile-card p-4">
              <h4 className="mb-4 fw-bold text-center">My Profile</h4>
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  {/* <img src="https://via.placeholder.com/120" className="profile-img mb-3" alt="Profile" /> */}
                  {/* <div>
                    <input type="file" className="form-control w-auto d-inline-block" />
                  </div> */}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                  <div className="input-group">
                    <label className="input-label form-label">Full Name</label>
                    <input
                      type="text"
                      className="input"
                      value={fullName}
                      placeholder="Enter your name"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label form-label">Email</label>
                    <input
                      type="email"
                      className="input"
                      value={email}
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </div>

                  <hr className="my-4" />

                  {/* <h5 className="mb-3 fw-semibold text-center">
                  Change Password
                </h5>

                  <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input type={showCurrent ? "text" : "password"} className="form-control" placeholder="Enter your Current Password" />
                 
                  <span
                       onClick={() => setShowCurrent(!showCurrent)}
                       style={{
                       color: showCurrent ? "#1A73E8" : "#1A73E8", // red when Hide, blue when Show
                       fontWeight: 500, cursor: "pointer",
                       }}
                    >
                      {showCurrent ? "Hide" : "Show"}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input type={showNew ? "text" : "password"} className="form-control" placeholder="Enter your New Password" />

                       <span
                       onClick={() => setShowNew(!showNew)}
                       style={{
                       color: showNew ? "#1A73E8" : "#1A73E8", // red when Hide, blue when Show
                       fontWeight: 500, cursor: "pointer",
                       }}
                    >
                      {showNew ? "Hide" : "Show"}
                    </span> 
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input type={showConfirm ? "text" : "password"} className="form-control" placeholder="Enter your Confirm Password" />
                 
                      <span
                       onClick={() => setShowConfirm(!showConfirm)}
                       style={{
                       color: showConfirm ? "#1A73E8" : "#1A73E8", // red when Hide, blue when Show
                       fontWeight: 500, cursor: "pointer",
                       }}
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </span>
                  </div>

 */}


                  {/* <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" placeholder="Enter your phone" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select className="form-select">
                      <option>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" placeholder="Enter your city" />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" rows="3" placeholder="Enter your address"></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label">About Me</label>
                    <textarea className="form-control" rows="3" placeholder="Write something about yourself"></textarea>
                  </div> */}

                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-dark px-5 py-2 rounded-pill"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
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
