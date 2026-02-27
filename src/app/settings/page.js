//src/app/settings/page.js
"use client";
import Footer from '@/components/Footer'
import Header2 from '@/components/Header2'
import React, { useState } from 'react'
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import api from "@/lib/api"; // same api you use elsewhere
import Passwordbar from '@/components/passwordBar/passwordbar';
import { usePasswordValidator } from '@/utils/validator/password.services';

export default function page() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const {
    isValid: isPasswordValid,
    validations,
    percent,
    color,
    label,
  } = usePasswordValidator(newPassword);

  const [loading, setLoading] = useState(false);

  const EyeIcon = ({ visible }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {!visible && <path d="M4 4l16 16" strokeLinecap="round" />}
    </svg>
  );

  const passwordFieldStyles = {
    position: "relative",
  };

  const toggleButtonStyles = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    color: "#1A73E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };


  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    if (newPassword !== confirmPassword) {
      return Swal.fire("Error", "New passwords and confirm password do not match", "error");
    }
    if (!isPasswordValid) {
      Swal.fire({
        icon: "warning",
        title: "Password is not strong enough",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    try {
      setLoading(true);

      const user = secureLocalStorage.getItem("qr_user");

      const res = await api.post("change-password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
      const { status_code, message } = res?.data;
      if (status_code === 1) {
        Swal.fire(
          "Success",
          message,
          "success"
        );

      } else {
        Swal.fire(
          "Failed",
          message,
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Failed",
        error?.response?.data?.message || "Invalid current password",
        "error"
      );
    } finally {
      setLoading(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <Header2 />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card settings-card p-4">
              <h4 className="settings-title mb-4 text-center">Change Password</h4>
              <div className="section-box">
                {/* <h6 className="fw-bold mb-3">Change Password</h6> */}
                <form onSubmit={handlePasswordUpdate}>
                  <div>
                    <label className="form-label">Current Password</label>
                    <div style={passwordFieldStyles} className="mb-3">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={{ paddingRight: "40px" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        style={toggleButtonStyles}
                      >
                        <EyeIcon visible={showCurrentPassword} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">New Password</label>
                    <div style={passwordFieldStyles} className="mb-3">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ paddingRight: "40px" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={toggleButtonStyles}
                      >
                        <EyeIcon visible={showNewPassword} />
                      </button>
                    </div>
                  </div>


                  <div>
                    <label className="form-label">Confirm New Password</label>
                    <div style={passwordFieldStyles} className="mb-3">

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ paddingRight: "40px" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={toggleButtonStyles}
                      >
                        <EyeIcon visible={showConfirmPassword} />
                      </button>
                    </div>
                  </div>
                  <div className="col-12">{newPassword && <Passwordbar {...{ percent, color, label, validations }} />}</div>

                  <button type="submit" className="btn btn-primary px-4 rounded-pill" disabled={loading} >
                    {loading ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading</> : "Update Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
